import mutations from '~/store/mutations'

test('"SET_USER" is no longer null', () => {
  const state = {
    user: null
  }
  mutations.SET_USER(state)
  expect(state.user).not.toBe(null)
})

let vids = [
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
  },
  {
    id: '6f',
    snippet: {
      title: 'Hello 6f',
      description: 'this is a sample'
    }
  },
  {
    id: '7g',
    snippet: {
      title: 'Hello 7g',
      description: 'this is a sample'
    }
  },
  {
    id: '8h',
    snippet: {
      title: 'Hello 8h',
      description: 'this is a sample'
    }
  },
  {
    id: '9i',
    snippet: {
      title: 'Hello 9i',
      description: 'this is a sample'
    }
  },
  {
    id: '10j',
    snippet: {
      title: 'Hello 10j',
      description: 'this is a sample'
    }
  }
]
let id = '23456fdsg'
let vid = {
  id: {
    videoId: '1a'
  },
  snippet: {
    title: 'Hello 1a',
    description: 'this is a sample'
  }
}

test('"SET_MAIN_VID" returns a string', () => {
  const state = {
    mainVid: ''
  }
  mutations.SET_MAIN_VID(state, id)
  expect(state.mainVid).toBeTruthy()
})

test('"SET_FAV_MAIN_VID" returns an object', () => {
  const state = {
    favMainVid: ''
  }
  mutations.SET_FAV_MAIN_VID(state, vid)
  expect(state.favMainVid).toBeInstanceOf(Object)
})

test('"ADD_FAV" adds vid to the favorites array', () => {
  const state = {
    favorites: []
  }
  mutations.ADD_FAV(state, vid)
  expect(state.favorites).toContain(vid)
})

test('"REMOVE_FAV" removes vid from favorites array', () => {
  const state = {
    favorites: [
      {
        id: {
          videoId: '1a'
        },
        snippet: {
          title: 'Hello 1a',
          description: 'this is a sample'
        }
      }
    ]
  }
  mutations.REMOVE_FAV(state, vid)
  expect(state.favorites).not.toContain(vid)
})

test('"FILTER_FAVS" returns vids from favArray containing search param', () => {
  const state = {
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
    filteredFavs: [
      {
        id: '2b',
        snippet: {
          title: 'Hello 2b',
          description: 'this is a sample'
        }
      }
    ]
  }
  const payload = '2b'
  mutations.FILTER_FAVS(state, payload)
  expect(state.filteredFavs).toContainEqual(state.favorites[1])
})

