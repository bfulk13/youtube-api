import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import mutations from '~/store/mutations';

const localVue = createLocalVue()

localVue.use(Vuex)

const user = null
const vidArray = [
  {
    id: {
      videoId: '1a'
    },
    snippet: {
      title: 'Hello 1a',
      description: 'this is a sample'
    }
  },
  {
    id: {
      videoId: '2b'
    },
    snippet: {
      title: 'Hello 2b',
      description: 'this is a sample'
    }
  },
  {
    id: {
      videoId: '3c'
    },
    snippet: {
      title: 'Hello 3c',
      description: 'this is a sample'
    }
  },
  {
    id: {
      videoId: '4d'
    },
    snippet: {
      title: 'Hello 4d',
      description: 'this is a sample'
    }
  },
  {
    id: {
      videoId: '5e'
    },
    snippet: {
      title: 'Hello 5e',
      description: 'this is a sample'
    }
  }
]
const mainVid = '3c'
const favorites = [
  {
    id: {
      videoId: '1a'
    },
    fav: true,
    totalSecs: 248,
    snippet: {
      title: 'dude, Hello 1a',
      description: 'this is a sample'
    }
  },
  {
    id: {
      videoId: '3c'
    },
    fav: true,
    totalSecs: 55,
    snippet: {
      title: 'ah, Hello 3c',
      description: 'this is a sample'
    }
  },
  {
    id: {
      videoId: '5e'
    },
    fav: true,
    totalSecs: 1014,
    snippet: {
      title: 'bro, Hello 5e',
      description: 'this is a sample'
    }
  }
]
const filteredFavs = [
  {
    id: {
      videoId: '1a'
    },
    fav: true,
    snippet: {
      title: 'Hello 1a',
      description: 'this is a sample'
    }
  }
]
const favMainVid = '5e'
const currFavObj = {
  id: {
    videoId: '5e'
  },
  fav: true,
  snippet: {
    title: 'Hello 5e',
    description: 'this is a sample'
  }
}
const vid = {
  id: {
    videoId: '2b'
  },
  snippet: {
    title: 'Hello 2b',
    description: 'this is a sample'
  }
}

const state = {
  user,
  vidArray,
  mainVid,
  favorites,
  filteredFavs,
  favMainVid,
  currFavObj
}

test('"SET_USER" user is no longer null', () => {
  mutations.SET_USER(state)
  expect(state.user).not.toBe(null)
})

test('"SET_MAIN_VID" returns a string', () => {
  mutations.SET_MAIN_VID(state, '3c')
  expect(state.mainVid).toBe('3c')
})

test('"SET_FAV_MAIN_VID" returns a string', () => {
  mutations.SET_FAV_MAIN_VID(state, '5e')
  expect(state.favMainVid).toBe('5e')
})

test('"ADD_FAV" adds vid to the favorites array', () => {
  mutations.ADD_FAV(state, vid)
  expect(state.favorites).toContain(vid)
})

test('"REMOVE_FAV" removes vid from favorites array', () => {
  mutations.REMOVE_FAV(state, vid)
  expect(state.favorites).not.toContain(vid)
})

test('"FILTER_FAVS" returns vids from favArray containing search param', () => {
  const payload = '3c'
  mutations.FILTER_FAVS(state, payload)
  expect(state.filteredFavs).toContainEqual(state.favorites[1])
})

describe('mutations', () => {
  let mutations
  let store

  beforeEach(() => {
    mutations = {
      SET_USER(state, user) {
        state.user = user
      },
      SET_VIDS(state, payload) {
        state.vidArray = payload
      },
      SET_MAIN_VID(state, payload) {
        state.mainVid = payload
      },
      SET_FAV_MAIN_VID(state, payload) {
        state.favMainVid = payload
      },
      ADD_FAV(state, payload) {
        payload.fav = true
        payload.date = new Date()
        state.favorites.unshift(payload)
        state.favMainVid = payload.id.videoId
      },
      SET_VID_LENGTH(state, payload) {
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
        return (state.favorites = newArr)
      },
      REMOVE_FAV(state, payload) {
        let newArr = []
        delete payload.fav
        state.favorites.forEach(vid => {
          // #arrow function as callback for `forEach` higher order function
          const { videoId } = vid.id
          payload.id.videoId !== videoId && newArr.push(vid)
        })
        // #ternary
        newArr.length > 0
          ? (state.favMainVid = newArr[0].id.videoId)
          : (state.favMainVid = '')
        state.favorites = newArr
        state.filteredFavs = newArr
        return newArr
      },
      FILTER_FAVS(state, payload) {
        // #try/catch block
        try {
          let newArr = []
          // #filter method
          state.favorites.filter(vid => {
            // #destructuring
            const { title, description } = vid.snippet
            const { videoId } = vid.id
            // #block scope variables
            let lowerT = title.toLowerCase()
            let lowerD = description.toLowerCase()
            let lowerV = videoId.toLowerCase()
            // #es7 feature, `Array.prototype.includes()`
            lowerT.includes(payload) && newArr.push(vid)
            lowerD.includes(payload) && newArr.push(vid)
            lowerV.includes(payload) && newArr.push(vid)
          })
          // #es6 spread operator combined with Set
          let removeDuplicates = [...new Set(newArr)]
          removeDuplicates.length > 0
            ? (state.filteredFavs = removeDuplicates)
            : alert('No favorites match your search!')
          removeDuplicates.length > 0 &&
            ((state.favMainVid = removeDuplicates[0].id.videoId),
            (state.currFavObj = removeDuplicates[0]))
        } catch (err) {
          console.log(err)
        }
        // #es9 --> could use a `Promise.prototype.finally()` here for cleaning up, which would run in the try/catch block regardless of error
      },
      ORDER_BY_TITLE(state) {
        const { favorites } = state
        favorites.length > 0 &&
          favorites.sort((a, b) => {
            let titleA = a.snippet.title.toLowerCase()
            let titleB = b.snippet.title.toLowerCase()
            if (titleA < titleB) return -1
            if (titleB < titleA) return 1
            return 0
          })
        state.favorites = favorites
      },
      ORDER_BY_DATE(state) {
        const { favorites } = state
        favorites.length > 0 &&
          favorites.sort((a, b) => {
            let dateA = a.date
            let dateB = b.date
            dateA > dateB ? -1 : 1
          })
        state.favorites = favorites
      },
      ORDER_LENGTH_SHORT(state) {
        const { favorites } = state
        favorites.length > 0 &&
          favorites.sort((a, b) => {
            let x = a.totalSecs
            let y = b.totalSecs
            if (x < y) return -1
            if (y < x) return 1
            return 0
          })
        state.favorites = favorites
      },
      ORDER_LENGTH_LONG(state) {
        const { favorites } = state
        favorites.length > 0 &&
          favorites.sort((a, b) => {
            let x = a.totalSecs
            let y = b.totalSecs
            if (x > y) return -1
            if (y > x) return 1
            return 0
          })
        state.favorites = favorites
      }
    }
  },
  store = new Vuex.Store({
    mutations
  })
})

  test('"ORDER_BY_TITLE" returns favArray alphabetically ordered by title', () => {
    const titleOne = {
    id: {
      videoId: '3c'
    },
    fav: true,
    totalSecs: 55,
    snippet: {
      title: 'ah, Hello 3c',
      description: 'this is a sample'
    }
    }
    const actual = mutations.ORDER_BY_TITLE(state)
    expect(actual).toEqual(titleOne)
  })
}