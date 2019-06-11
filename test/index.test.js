import { mount } from '@vue/test-utils'
import index from '~/pages/index'

describe('index', () => {
  // mount the component and you have the wrapper
  const wrapper = mount(index)

  // check for the existence of elements
  it('has a button', () => {
    expect(wrapper.contains('button')).toBe(true)
  })

  it('has two input elements', () => {
    expect(wrapper.contains('input')).toBe(true)
  })

  it('renders a div', () => {
    const $route = { path: '/' }
    const wrapper = mount(index, {
      mocks: {
        $route
      }
    })
    expect(wrapper.vm.$route.path).toBe($route.path)
  })

  // jest.useFakeTimers()
  // it('calls the callback after 1.5 seconds', () => {
  //   const callback = jest.fn()


  //   // At this point in time, the callback should not have been called yet
  //   expect(callback).not.toBeCalled()

  //   // Fast-forward until all timers have been executed
  //   jest.advanceTimersByTime(1500)

  //   // Now our callback should have been called!
  //   expect(callback).toBeCalled()
  //   expect(callback.mock.calls.length).toBe(1)
  // })
})
