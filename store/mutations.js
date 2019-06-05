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
    state.currFavObj = payload
  },
  SET_VID_LENGTH(state, payload) {
    const { totalSecs, length, id } = payload
    let newArr = [...state.favorites]
    newArr.map((fav, i) => {
      const { videoId } = fav.id
      id === videoId && newArr.splice(i, 1, { ...fav, totalSecs, length })
    })
    return (state.favorites = newArr)
  },
  REMOVE_FAV(state, payload) {
    let newArr = []
    state.favorites.forEach(vid => {
      const { videoId } = vid.id
      payload.id.videoId !== videoId && newArr.push(vid)
    })
    newArr.length > 0
      ? (state.favMainVid = newArr[0].id.videoId)
      : (state.favMainVid = '')
    state.favorites = newArr
  }
}
