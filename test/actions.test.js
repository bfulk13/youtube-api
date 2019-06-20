import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import actions from '~/store/actions'
import mutations from '~/store/mutations'

const localVue = createLocalVue()

localVue.use(Vuex)

const store = new Vuex.Store({
  state: {
    favorites: [
      {
        id: {
          videoId: 'Dd7FixvoKBw'
        },
        snippet: {
          title: 'Hello 1a',
          description: 'this is a sample'
        }
      }
    ],
    currFavObj: {}
  },
  mutations: mutations,
  actions: actions
})

describe('setVidLength', () => {
  test('should set video length', async () => {
    const Obj = {
      id: {
        videoId: 'Dd7FixvoKBw'
      },
      length: '0:03:02',
      snippet: {
        title: 'Hello 1a',
        description: 'this is a sample'
      },
      totalSecs: 182
    }

    jest.mock('axios')

    await actions.setVidLength(store, 'Dd7FixvoKBw')

    expect(store.state.favorites[0]).toStrictEqual(Obj)
  })
})
