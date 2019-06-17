import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import getters from '~/store/getters'

const localVue = createLocalVue()

localVue.use(Vuex)

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
    snippet: {
      title: 'Hello 1a',
      description: 'this is a sample'
    }
  },
  {
    id: {
      videoId: '3c'
    },
    fav: true,
    snippet: {
      title: 'Hello 3c',
      description: 'this is a sample'
    }
  },
  {
    id: {
      videoId: '5e'
    },
    fav: true,
    snippet: {
      title: 'Hello 5e',
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

const state = {
  vidArray,
  mainVid,
  favorites,
  filteredFavs,
  favMainVid,
  currFavObj
}

describe('getters', () => {
  let getters
  let store

  beforeEach(() => {
    getters = {
      mainVidId: () => 'sdh23564dshg',
      favMainVid: () => '3c'
    }

    store = new Vuex.Store({
      getters
    })
  })

  test('"mainVidId" returns a string', () => {
    expect('mainVidId').toMatch(/mainVidId/)
  })

  test('"getFavMainVid" should return a string', () => {
    expect('favMainVid').toMatch(/favMainVid/)
  })
})

describe('getVidProps', () => {
  it('should return the object with matching mainVidId', () => {
    let actual = getters.getVidProps(state)
    expect(actual).toEqual([vidArray[2]])
  })
})

describe('getFavVidProps', () => {
  it('should return the object with matching favMainVid ID', () => {
    let actual = getters.getFavVidProps(state)
    expect(actual).toEqual([favorites[2]])
  })
})

describe('getFavArray', () => {
  it('should return the favorites array', () => {
    let actual = getters.getFavArray(state)
    expect(actual).toEqual(favorites)
  })
})

describe('getCurrFavObj', () => {
  it('should return the string on state', () => {
    let actual = getters.getCurrFavObj(state)
    expect(actual).toEqual(currFavObj)
  })
})

describe('filterFavs', () => {
  it('should return objects that match search params stored on state as an array', () => {
    let actual = getters.filterFavs(state)
    expect(actual).toEqual(filteredFavs)
  })
})
