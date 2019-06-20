import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import actions from '~/store/actions'

const localVue = createLocalVue()

localVue.use(Vuex)

const store = new Vuex.Store({
  state: {
    favorites: [
      {
        id: 'Dd7FixvoKBw',
        snippet: {
          title: 'Hello 1a',
          description: 'this is a sample'
        }
      }
    ],
    currFavObj: {}
  },
  mutations: {
    SET_VID_LENGTH: (state, payload) => {
      // #destructuring
      const { totalSecs, length, id } = payload
      // #spread operator
      let newArr = [...state.favorites]
      // #map function
      newArr.map((fav, i) => {
        const { videoId } = fav.id
        // #es6 spread/rest operator
        id === videoId && newArr.splice(i, 1, { ...fav, totalSecs, length })
      })
      state.currFavObj = newArr[0]
      state.favorites = newArr
    }
  }
})

describe('setVidLength', () => {
  test('should set video length', async () => {
    const Obj = {
      id: 'Dd7FixvoKBw',
      length: '0:03:02',
      snippet: {
        title: 'Hello 1a',
        description: 'this is a sample'
      },
      totalSecs: '182'
    }

    jest.mock('axios')
    actions.setVidLength(store, 'Dd7FixvoKBw')
    console.log(store.commit)
    // expect(store.$commit).toHaveBeenCalledWith('SET_VID_LENGTH', Obj)
    console.log(store.state.favorites[0])
    expect(store.state.favorites[0]).toStrictEqual(Obj)
  })
})
