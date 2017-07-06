import React from 'react'
import { storiesOf } from '@storybook/react'

import Store from './Store'
import Grid from '../src/index'
import ComplexDemo from './complexDemo'
import './index.scss'
const GridWrapper = Store(Grid)

const SIMPLE_DATA = [
  { key: 'key0', x: 2, y: 1, w: 10, h: 1 },
  { key: 'key1', x: 2, y: 3, w: 1, h: 2 },
  { key: 'key2', x: 11, y: 3, w: 1, h: 2 },
  { key: 'key3', x: 4, y: 3, w: 1, h: 1 },
  { key: 'key4', x: 6, y: 4, w: 2, h: 1 },
  { key: 'key5', x: 9, y: 3, w: 1, h: 1 },
  { key: 'key6', x: 4, y: 6, w: 6, h: 1 }
]

storiesOf('React GridBox', module)
  .add('Simple', () => (
    <GridWrapper layout={SIMPLE_DATA} cols={12} rowHeight={100}>
      {SIMPLE_DATA.map(el => (
        <div key={el.key} className='base' />
      ))}
    </GridWrapper>
  ))
  .add('Custom CSS', () => (
    <GridWrapper layout={SIMPLE_DATA} cols={12} rowHeight={100} activeClassName='active' resizeClassName='resize'>
      {SIMPLE_DATA.map(el => (
        <div key={el.key} className='card' />
      ))}
    </GridWrapper>
  ))
  .add('With CSS framework (SLDS)', () => (
    <ComplexDemo />
  ))
