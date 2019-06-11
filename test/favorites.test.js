import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import favorites from '~/pages/favorites'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('favorites', () => {
  let store = {}
  const wrapper = shallowMount(favorites, {
    localVue,
    store
  });

  it('renders a div', () => {
    const $route = { path: '/favorites' }
    const wrapper = shallowMount(favorites, {
      store,
      localVue,
      mocks: {
        $route
      }
    })
    expect(wrapper.vm.$route.path).toBe($route.path)
  })
})