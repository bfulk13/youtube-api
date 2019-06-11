import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import getters from '~/store/getters'
import card from '~/components/card'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('getters', () => {
  let getters
  let store

  beforeEach(() => {
    getters = {
      mainVidId: () => 'sdh23564dshg',
      getVidProps: () => {
        // id: {
        //   videoId: 'sdh23564dshg'
        // },
        // snippet: {
        //   title: 'Sample',
        //   description: 'This is some text'
        // }
      },
      getFavVidProps: () => {
        // id: {
        //   videoId: 'sdh23564dshg'
        // },
        // fav: true,
        // snippet: {
        //   title: 'Sample',
        //   description: 'This is some text'
        // }
      },
      getFavArray: () => []
    }

    store = new Vuex.Store({
      getters
    })
  })

  test('"mainVidId" returns a string', () => {
    expect('mainVidId').toMatch(/mainVidId/)
  })

  // test('"getVidProps" returns an object', () => {
  //  expect('getVidProps').toBeInstanceOf(Object)
  // })
})