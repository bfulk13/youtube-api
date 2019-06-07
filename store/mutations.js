export default {
  SET_USER(state, user) {
    state.user = user
  },
  SET_VIDS(state, payload) {
    state.vidArray = payload
  },
  SET_FAV_VIDS(state, payload) {
    state.favorites = payload
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
    const { totalSecs, length, id } = payload
    let newArr = [...state.favorites]
    newArr.map((fav, i) => {
      const { videoId } = fav.id
      id === videoId && newArr.splice(i, 1, { ...fav, totalSecs, length })
    })
    state.currFavObj = newArr[0]
    return (state.favorites = newArr)
  },
  REMOVE_FAV(state, payload) {
    let newArr = []
    delete payload.fav
    state.favorites.forEach(vid => {
      const { videoId } = vid.id
      payload.id.videoId !== videoId && newArr.push(vid)
    })
    newArr.length > 0
      ? (state.favMainVid = newArr[0].id.videoId)
      : (state.favMainVid = '')
    state.favorites = newArr
    return newArr
  },
  FILTER_FAVS(state, payload) {
    try {
      let newArr = []
      state.favorites.filter(vid => {
        const { title, description } = vid.snippet
        const { videoId } = vid.id
        let lowerT = title.toLowerCase()
        let lowerD = description.toLowerCase()
        let lowerV = videoId.toLowerCase()
        lowerT.includes(payload) && newArr.push(vid)
        lowerD.includes(payload) && newArr.push(vid)
        lowerV.includes(payload) && newArr.push(vid)
      })
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
