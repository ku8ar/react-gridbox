import React, { Component } from 'react'
import PropTypes from 'prop-types'

const decorator = (Comp) =>
  class StoreWrapper extends Component {
    static propTypes = {
      layout: PropTypes.array
    }
    constructor (props) {
      super(props)
      this.state = {
        layout: props.layout
      }
    }
    onChange = (layout) => this.setState({ layout })
    render () {
      return (
        <Comp {...this.props} {...this.state} onChange={this.onChange} />
      )
    }
  }

export default decorator
