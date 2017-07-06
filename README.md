# React GridBox
Probably first Grid Layout System on React using [CSS Grid Layout](https://css-tricks.com/snippets/css/complete-guide-grid/).
[**[Demo](https://ku8ar.github.io/react-gridbox)**]
![Imgur](http://i.imgur.com/iKFBaT1.gif)

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Example Usage](#example-usage)
- [Props](#props)
- [Contribute](#contribute)
- [TODO List](#todo-list)

## Features
* Draggable boxes
* Resizable boxes
* Bounds checking for dragging and resizing
* Boxes may be added or removed without rebuilding grid
* Layout can be serialized and restored
* CSS Grid Layout

## Installation
Install the React GridBox [package](https://www.npmjs.org/package/react-gridbox) package using [npm](https://www.npmjs.com/):

```bash
npm i -s react-gridbox
```

## Example Usage
Use React GridBox like any other component. The following example below will produce a grid with store support (as react state) and three items:
```javascript
import React, { Component } from 'react'
import Grid from 'react-gridbox'

/* The style of the child should include the size to match the width and height imposed by the grid. */
const itemStyle = {
  height: '100%',
  width: '100%',
  border: '1px solid black'
}

class Example extends Component {
  state = {
    layout: [
      /* Each item should have the corresponding key in the grid render child. */
      { key: 'item0', x: 1, y: 1, w: 48, h: 1 },
      { key: 'item1', x: 10, y: 10, w: 10, h: 10 },
      { key: 'item2', x: 30, y: 10, w: 10, h: 10 },
    ]
  }
  onChange = (layout) =>
    this.setState({ layout })
  render() {
    return (
      <div style={{width: '100vw', height: '100vh'}}>
      {/* Grid automatically takes up the size of parent. */}
        <Grid layout={this.state.layout} onChange={this.onChange} cols={48} rowHeight={10}>
          <div key='item0' style={itemStyle} />
          <div key='item1' style={itemStyle} />
          <div key='item2' style={itemStyle} />
        </Grid>
      </div>
    )
  }
}
```

## Props
```javascript
// Grid Layout. Full mapping of grid items.
layout: Array = { key: Number | String, x: Number, y: Number, w: Number, h: Number }

// Callback which return result of drag&drop
onChange: (layout: Array) => void

// Number of columns
cols: Number

// Single row height (in PX)
rowHeight: Number

// Grid items. Important: each item should have the corresponding key in the layout
children: Array = { React.Node }

// DnD active item class name
activeClassName: String

// 'Move' div class name (default style has z-index = 1 and is stretched over the entire size of the grid item as transparent element)
moveClassName: String

// 'Resize' div class name (default style has z-index = 2 and 0.5 rem size)
resizeClassName: String

```

## Contribute
Yes, plizz.

## TODO List
- [x] Basic skeleton
- [x] DnD: Move, resize
- [ ] Read only mode
- [ ] Collision detection or z-layers
- [ ] Refactoring code, removing junk boilerplate
