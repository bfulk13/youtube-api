import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import mutations from '~/store/mutations'

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
      title: 'ahoy, Hello 3c',
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
const filteredFavs = []
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

describe('mutations', () => {
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

  test('"SET_VID_LENGTH" adds length property where ID matches', () => {
    const myObj = {
      id: '2b',
      totalSecs: 380,
      length: '0:03:20'
    }
    mutations.SET_VID_LENGTH(state, myObj)
    expect(state.currFavObj.length).toBe('0:03:20')
  })

  test('"REMOVE_FAV" removes vid from favorites array', () => {
    mutations.REMOVE_FAV(state, vid)
    expect(state.favorites).not.toContain(vid)
  })

  test('"FILTER_FAVS" returns vids from favArray containing search param', () => {
    const payload = '5e'
    const item = {
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
    mutations.FILTER_FAVS(state, payload)
    expect(state.filteredFavs).toContainEqual(item)
  })
})

describe('mutations', () => {
  let mutations
  let store

  beforeEach(
    () => {
      mutations = {
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
    (store = new Vuex.Store({
      mutations
    }))
  )

  test('"ORDER_BY_TITLE" returns favorites alphabetically ordered by title', () => {
    const titleOne = {
      id: {
        videoId: '3c'
      },
      fav: true,
      totalSecs: 55,
      snippet: {
        title: 'ahoy, Hello 3c',
        description: 'this is a sample'
      }
    }
    const state = {
      favorites: [
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
            title: 'ahoy, Hello 3c',
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
      ],
      filteredFavs: []
    }
    mutations.ORDER_BY_TITLE(state)
    expect(state.favorites[0]).toStrictEqual(titleOne)
  })

  test('"ORDER_BY_DATE" returns favorites ordered by recent date', () => {
    const titleOne = {
      id: {
        videoId: '1a'
      },
      date: '2019-06-13T20:49:40.385Z',
      fav: true,
      totalSecs: 248,
      snippet: {
        title: 'dude, Hello 1a',
        description: 'this is a sample'
      }
    }
    const state = {
      favorites: [
        {
          id: {
            videoId: '1a'
          },
          date: '2019-06-13T20:49:40.385Z',
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
          date: '2019-06-11T20:49:40.385Z',
          fav: true,
          totalSecs: 55,
          snippet: {
            title: 'ahoy, Hello 3c',
            description: 'this is a sample'
          }
        },
        {
          id: {
            videoId: '5e'
          },
          date: '2019-06-12T20:49:40.385Z',
          fav: true,
          totalSecs: 1014,
          snippet: {
            title: 'bro, Hello 5e',
            description: 'this is a sample'
          }
        }
      ],
      filteredFavs: []
    }

    mutations.ORDER_BY_DATE(state)
    expect(state.favorites[0]).toStrictEqual(titleOne)
  })

  test('"ORDER_LENGTH_SHORT" returns favorites ordered short to long', () => {
    const titleOne = {
      id: {
        videoId: '3c'
      },
      date: '2019-06-11T20:49:40.385Z',
      fav: true,
      totalSecs: 55,
      snippet: {
        title: 'ahoy, Hello 3c',
        description: 'this is a sample'
      }
    }
    const state = {
      favorites: [
        {
          id: {
            videoId: '1a'
          },
          date: '2019-06-13T20:49:40.385Z',
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
          date: '2019-06-11T20:49:40.385Z',
          fav: true,
          totalSecs: 55,
          snippet: {
            title: 'ahoy, Hello 3c',
            description: 'this is a sample'
          }
        },
        {
          id: {
            videoId: '5e'
          },
          date: '2019-06-12T20:49:40.385Z',
          fav: true,
          totalSecs: 1014,
          snippet: {
            title: 'bro, Hello 5e',
            description: 'this is a sample'
          }
        }
      ],
      filteredFavs: []
    }

    mutations.ORDER_LENGTH_SHORT(state)
    expect(state.favorites[0]).toStrictEqual(titleOne)
  })

  test('"ORDER_LENGTH_LONG" returns favorites ordered long to short', () => {
    const titleOne = {
      id: {
        videoId: '5e'
      },
      date: '2019-06-12T20:49:40.385Z',
      fav: true,
      totalSecs: 1014,
      snippet: {
        title: 'bro, Hello 5e',
        description: 'this is a sample'
      }
    }
    const state = {
      favorites: [
        {
          id: {
            videoId: '1a'
          },
          date: '2019-06-13T20:49:40.385Z',
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
          date: '2019-06-11T20:49:40.385Z',
          fav: true,
          totalSecs: 55,
          snippet: {
            title: 'ahoy, Hello 3c',
            description: 'this is a sample'
          }
        },
        {
          id: {
            videoId: '5e'
          },
          date: '2019-06-12T20:49:40.385Z',
          fav: true,
          totalSecs: 1014,
          snippet: {
            title: 'bro, Hello 5e',
            description: 'this is a sample'
          }
        }
      ],
      filteredFavs: []
    }

    mutations.ORDER_LENGTH_LONG(state)
    expect(state.favorites).toBeInstanceOf(Array)
    expect(state.favorites[0]).toStrictEqual(titleOne)
  })
})
