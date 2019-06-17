import { mount, shallowMount } from '@vue/test-utils'
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

  test('mounts properly', () => {
    const wrapper = shallowMount(index)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('calls checkForm on submit', () => {
    const wrapper = shallowMount(index)
    const checkFormMock = jest.fn()
    wrapper.setMethods({
      checkForm: checkFormMock
    })
    wrapper.find('form').trigger('submit')
    expect(checkFormMock).toHaveBeenCalled()
  })
})
