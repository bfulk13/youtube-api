import { shallowMount } from '@vue/test-utils'
import _id from '~/pages/search/_id'


describe('_id', () => {

  it('renders with search param', () => {
    const $route = { path: '/some/path' }
    const wrapper = shallowMount(_id, {
      mocks: {
        $route
      }
    })
    expect(wrapper.vm.$route.path).toBe($route.path)
  })
})
