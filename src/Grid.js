import React, { Component, PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { DragSource, DropTarget, DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

const MOVE = 'MOVE'
const RESIZE = 'RESIZE'

// @TODO: Create HOC for MOVE and RESIZE comp.
@DragSource(MOVE, {
  beginDrag (props, monitor, component) {
    return {
      key: props.itemKey,
      clientX: props.clientX,
      clientY: props.clientY,
      itemX: props.x,
      itemY: props.y,
      itemH: props.h,
      itemW: props.w
    }
  }
}, (connect, monitor) => ({
  connectDragSource: connect.dragSource()
}))
class Mover extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    connectDragSource: PropTypes.func
  }
  render () {
    const { connectDragSource, className } = this.props
    return connectDragSource(
      <div className={className} style={{
        zIndex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        cursor: 'move'
      }} />
    )
  }
}

@DragSource(RESIZE, {
  beginDrag (props, monitor, component) {
    return {
      key: props.itemKey,
      clientX: props.clientX,
      clientY: props.clientY,
      itemX: props.x,
      itemY: props.y,
      itemH: props.h,
      itemW: props.w
    }
  }
}, (connect, monitor) => ({
  connectDragSource: connect.dragSource()
}))
class Resizer extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    connectDragSource: PropTypes.func
  }
  render () {
    const { connectDragSource, className } = this.props
    return connectDragSource(
      <div className={className} style={{
        zIndex: 2,
        position: 'absolute',
        width: '1rem',
        height: '1rem',
        bottom: 0,
        right: 0,
        cursor: 'se-resize'
      }} />
    )
  }
}

@DragDropContext(HTML5Backend)
@DropTarget([MOVE, RESIZE], {
  hover (props, monitor, component) {
    const dropType = monitor.getItemType()

    const { key, clientX, clientY, itemX, itemY, itemH, itemW } = monitor.getItem()
    const { cols, rowHeight } = props
    // @TODO: poor perf
    const { left, width, top, height } = ReactDOM.findDOMNode(component.ref).getBoundingClientRect()
    const { x, y } = monitor.getClientOffset()

    // matrix X, Y - We must calculate here, cause every new row change matrix (@TODO: memoize)
    const itemWidth = width / cols
    let xMatrix = []
    for (let w = left; w <= left + width; w = w + itemWidth) {
      xMatrix.push(w)
    }
    let yMatrix = []
    for (let h = top; h <= top + height; h = h + rowHeight) {
      yMatrix.push(h)
    }
    // find X, Y
    let startX = xMatrix.findIndex(el => el > clientX)
    let actualX = xMatrix.findIndex(el => el > x)
    if (x > xMatrix[xMatrix.length - 1]) actualX = xMatrix.length
    const diffX = actualX - startX
    let startY = yMatrix.findIndex(el => el > clientY)
    let actualY = yMatrix.findIndex(el => el > y)
    if (y > yMatrix[yMatrix.length - 1]) actualY = yMatrix.length
    const diffY = actualY - startY
    if (dropType === MOVE) {
      let newX = itemX + diffX
      if (newX < 1) newX = 1
      if (newX + itemW - 1 > cols) newX = itemX
      let newY = itemY + diffY
      if (newY < 1) newY = 1
      // change state
      if (diffX || diffY) {
        monitor.getItem().itemX = newX // i know, but this is the fastest way...
        monitor.getItem().clientX = x
        monitor.getItem().itemY = newY
        monitor.getItem().clientY = y
        component.handleChangePosition(key, newX, newY, itemW, itemH)
      }
    }
    if (dropType === RESIZE) {
      let newW = itemW + diffX
      if (newW < 1) newW = 1
      if (newW + itemX > cols + 1) newW = itemW
      let newH = itemH + diffY
      if (newH < 1) newH = 1
      // change state
      if (diffX || diffY) {
        monitor.getItem().itemW = newW
        monitor.getItem().clientX = x
        monitor.getItem().itemH = newH
        monitor.getItem().clientY = y
        component.handleChangePosition(key, itemX, itemY, newW, newH)
      }
    }
  }
}, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  dragItemKey: monitor.getItem() ? monitor.getItem().key : null
}))
export default class extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.node),
    layout: PropTypes.array,
    rowHeight: PropTypes.number,
    cols: PropTypes.number,
    onChange: PropTypes.func,
    connectDropTarget: PropTypes.func,
    activeClassName: PropTypes.string,
    moveClassName: PropTypes.string,
    resizeClassName: PropTypes.string,
    dragItemKey: PropTypes.any
  }
  static defaultProps = {
    children: [],
    layout: {},
    cols: 12,
    rowHeight: 100
  }
  state = {
    clientX: 0,
    clientY: 0
  }
  setRef = (ref) => {
    this.ref = ref
  }
  handleChangePosition = (key, x, y, w, h) =>
    !this.props.layout.find(l => // @TODO: add broad phase
      l.key !== key && l.x < x + w && l.x + l.w > x && l.y < y + h && l.h + l.y > y
    ) && this.props.onChange([...this.props.layout].map(l =>
      l.key === key ? { ...l, x, y, w, h } : l))
  setStartPosition = (e) =>
    this.setState({ clientX: e.clientX, clientY: e.clientY })
  render () {
    const { className, children, layout, rowHeight, cols, activeClassName, dragItemKey,
      moveClassName, resizeClassName } = this.props
    const { connectDropTarget } = this.props
    // @TODO: slow
    const rows = layout.reduce((acc, el) =>
      el.y + el.h > acc ? el.y + el.h : acc, 0)
    return connectDropTarget(
      <div className={className} style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, ${1 / cols * 100}%)`, // 100 - to percentage
        gridTemplateRows: `repeat(${rows}, ${rowHeight}px)`
      }} ref={this.setRef} onMouseDown={this.setStartPosition}>
        {children.map(child => {
          const itemLayout = layout.find(l => l.key === child.key)
          return (
            <div key={child.key} className={
              cn({
                [activeClassName]: dragItemKey === child.key
              })
            } style={{
              position: 'relative',
              gridColumn: `${itemLayout.x} / ${itemLayout.w + itemLayout.x}`,
              gridRow: `${itemLayout.y} / ${itemLayout.h + itemLayout.y}`
            }}>
              <Mover itemKey={child.key} {...this.state} {...itemLayout}
                className={moveClassName} key={`move_${child.key}`} />
              {child}
              <Resizer itemKey={child.key} {...this.state} {...itemLayout}
                className={resizeClassName} key={`resize_${child.key}`} />
            </div>
          )
        }
        )}
      </div>
    )
  }
}
