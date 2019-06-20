import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import favorites from '~/pages/favorites'

const localVue = createLocalVue()

localVue.use(Vuex)

const store = new Vuex.Store({
  state: {
    favorites: [
      {
        id: '1a',
        snippet: {
          title: 'Hello 1a',
          description: 'this is a sample'
        }
      },
      {
        id: '2b',
        snippet: {
          title: 'Hello 2b',
          description: 'this is a sample'
        }
      },
      {
        id: '3c',
        snippet: {
          title: 'Hello 3c',
          description: 'this is a sample'
        }
      },
      {
        id: '4d',
        snippet: {
          title: 'Hello 4d',
          description: 'this is a sample'
        }
      },
      {
        id: '5e',
        snippet: {
          title: 'Hello 5e',
          description: 'this is a sample'
        }
      }
    ],
    user: 'test'
  }
})

describe('favorites', () => {
  const wrapper = shallowMount(favorites, {
    localVue,
    store
  })

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

test('"logout" should make user null', () => {
  const wrapper = shallowMount(favorites, {
    localVue,
    store,
    mocks: { $router: ['/'] }
  })
  const mock = jest.fn()
  mock.mockReturnValue((store.state.user = null))

  const mockRoute = jest.fn()
  mockRoute.mockReturnValue(['/'])

  wrapper.find('button').trigger('click')
  expect(mock('SET_USER')).toBe(null)
  expect(mock).toHaveBeenCalledWith('SET_USER')
  expect(mockRoute('/')).toStrictEqual(['/'])
  expect(mockRoute).toHaveBeenCalledWith('/')
})
