// #closures --> all modules(in nuxt) are closures and present an interface that hides its state and implementation which almost completely eliminates the use of global variables, mitigating one of JavaScript's worst features
export default {
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
    console.log({payload})
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
