import React from 'react'
import { assert } from 'chai'
import { shallow, mount, render } from 'enzyme'
import ReactDOM from 'react-dom'
import App from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('test enzyme', () => {
  const wrapper = shallow(<App />)
  assert.strictEqual(wrapper.contains('HELLO'), true)
})
