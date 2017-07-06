/* eslint max-len: ['error', 200] */
/* eslint react/self-closing-comp: 0 */
import React from 'react'
import Store from './Store'
import Grid from '../src/index'
const GridWrapper = Store(Grid)

const LAYOUT = [
  { key: 'menu', x: 1, y: 1, w: 48, h: 4 },
  { key: 'header', x: 2, y: 6, w: 46, h: 7 },
  { key: 'breadcrumbs', x: 2, y: 15, w: 14, h: 2 },
  { key: 'card', x: 2, y: 18, w: 29, h: 12 },
  { key: 'radio', x: 32, y: 18, w: 5, h: 12 },
  { key: 'notify', x: 16, y: 34, w: 18, h: 14 },
  { key: 'input', x: 37, y: 18, w: 11, h: 6 },
  { key: 'input2', x: 37, y: 25, w: 11, h: 6 },
]

const Wrapper = () => (
  <GridWrapper layout={LAYOUT} cols={48} rowHeight={10} activeClassName='active' resizeClassName='resize'>
    <div key={'header'} className='base slds-page-header'>
      <div className='slds-media'>
        <div className='slds-media__body'>
          <h1 className='slds-page-header__title slds-truncate slds-align-middle'>Welcome To GridBox</h1>
          <p className='slds-text-body_small slds-line-height_reset'>Feel free</p>
        </div>
      </div>
    </div>
    <nav key='breadcrumbs' role='navigation' aria-label='Breadcrumbs'>
      <ol className='slds-breadcrumb slds-list_horizontal slds-wrap'>
        <li className='slds-breadcrumb__item slds-text-title_caps'><a href='javascript:void(0);'>Parent Entity</a></li>
        <li className='slds-breadcrumb__item slds-text-title_caps'><a href='javascript:void(0);'>Parent Record Name</a></li>
      </ol>
    </nav>
    <div key={'menu'} className='slds-context-bar'>
      <div className='slds-context-bar__primary slds-context-bar__item_divider-right'>
        <div className='slds-context-bar__item slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_click slds-no-hover slds-context-bar__item_divider-right'>
          <div className='slds-context-bar__icon-action slds-context-bar__item_divider-right'>
            <button className='slds-button slds-icon-waffle_container slds-context-bar__button' title='Description of the icon when needed'>
              <span className='slds-icon-waffle'>
                <span className='slds-r1'></span>
                <span className='slds-r2'></span>
                <span className='slds-r3'></span>
                <span className='slds-r4'></span>
                <span className='slds-r5'></span>
                <span className='slds-r6'></span>
                <span className='slds-r7'></span>
                <span className='slds-r8'></span>
                <span className='slds-r9'></span>
              </span>
              <span className='slds-assistive-text'>Open App Launcher</span>
            </button>
          </div>
          <span className='slds-context-bar__label-action slds-context-bar__app-name'>
            <span className='slds-truncate' title='App Name'>App Name</span>
          </span>
        </div>
      </div>
      <nav className='slds-context-bar__secondary' role='navigation'>
        <ul className='slds-grid'>
          <li className='slds-context-bar__item slds-context-bar__item_divider-right'>
            <a href='javascript:void(0);' className='slds-context-bar__label-action' title='Home'>
              <span className='slds-truncate' title='Home'>Home</span>
            </a>
          </li>
          <li className='slds-context-bar__item slds-context-bar__item_divider-right'>
            <a className='slds-context-bar__label-action' title='Menu Item 0'>
              <span className='slds-truncate' title='Menu Item'>Menu Item 0</span>
            </a>
          </li>
          <li className='slds-context-bar__item slds-context-bar__item_divider-right'>
            <a className='slds-context-bar__label-action' title='Menu Item 1'>
              <span className='slds-truncate' title='Menu Item'>Menu Item 1</span>
            </a>
          </li>
          <li className='slds-context-bar__item slds-context-bar__item_divider-right'>
            <a className='slds-context-bar__label-action' title='Menu Item 2'>
              <span className='slds-truncate' title='Menu Item'>Menu Item 2</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <article key='card' className='base slds-card'>
      <div className='slds-card__header slds-grid'>
        <header className='slds-media slds-media_center slds-has-flexi-truncate'>
          <div className='slds-media__figure'>
            <span className='slds-icon_container slds-icon-standard-contact' title='description of icon when needed'>
              <svg className='slds-icon slds-icon_small' aria-hidden='true'>
                <use xmlnsXlink='http://www.w3.org/1999/xlink' xlinkHref='/assets/icons/standard-sprite/svg/symbols.svg#contact'></use>
              </svg>
            </span>
          </div>
          <div className='slds-media__body'>
            <h2>
              <a href='javascript:void(0);' className='slds-card__header-link slds-truncate' title='[object Object]'>
                <span className='slds-text-heading_small'>Card Header</span>
              </a>
            </h2>
          </div>
        </header>
        <div className='slds-no-flex'>
          <button className='slds-button slds-button_neutral'>New</button>
        </div>
      </div>
      <div className='slds-card__body slds-card__body_inner'>Card Body (custom goes in here)</div>
      <footer className='slds-card__footer'>Card Footer</footer>
    </article>
    <fieldset key='radio' className='slds-form-element'>
      <legend className='slds-form-element__legend slds-form-element__label'>Radio Group Label</legend>
      <div className='slds-form-element__control'>
        <span className='slds-radio'>
          <input type='radio' id='radio-1' name='options' value='on' />
          <label className='slds-radio__label'>
            <span className='slds-radio_faux'></span>
            <span className='slds-form-element__label'>Radio Label One</span>
          </label>
        </span>
        <span className='slds-radio'>
          <input type='radio' id='radio-2' name='options' value='on' />
          <label className='slds-radio__label'>
            <span className='slds-radio_faux'></span>
            <span className='slds-form-element__label'>Radio Label Two</span>
          </label>
        </span>
      </div>
    </fieldset>
    <div key='notify' className='base slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_info' role='alert'>
      <span className='slds-assistive-text'>info</span>
      <span className='slds-icon_container slds-icon-utility-user slds-m-right_x-small' title='Description of icon when needed'>
        <svg className='slds-icon slds-icon_x-small' aria-hidden='true'>
          <use xmlnsXlink='http://www.w3.org/1999/xlink' xlinkHref='/assets/icons/utility-sprite/svg/symbols.svg#user'></use>
        </svg>
      </span>
      <h2>Logged in as John Smith (johnsmith@acme.com). <a href='javascript:void(0);'>Log out</a></h2>
      <button className='slds-button slds-button_icon slds-notify__close slds-button_icon-inverse' title='Close'>
        <svg className='slds-button__icon' aria-hidden='true'>
          <use xmlnsXlink='http://www.w3.org/1999/xlink' xlinkHref='/assets/icons/utility-sprite/svg/symbols.svg#close'></use>
        </svg>
        <span className='slds-assistive-text'>Close</span>
      </button>
    </div>
    <div key='input' className='slds-form-element'>
      <label className='slds-form-element__label'>Input Label</label>
      <div className='slds-form-element__control'>
        <input type='text' id='text-input-id-1' className='slds-input' placeholder='Placeholder Text' />
      </div>
    </div>
    <div key='input2' className='slds-form-element'>
      <label className='slds-form-element__label'>Input Label</label>
      <div className='slds-form-element__control'>
        <input type='text' id='text-input-id-1' className='slds-input' placeholder='Placeholder Text' />
      </div>
    </div>
  </GridWrapper>
)

export default Wrapper
