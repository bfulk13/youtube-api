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
    return (state.favMainVid = payload)
  },
  ADD_FAV(state, payload) {
    payload.fav = true
    payload.date = new Date()
    state.favorites.unshift(payload)
    state.favMainVid = payload.id.videoId
  },
  REMOVE_FAV(state, payload) {
    let newArr = []
    state.favorites.forEach(vid => {
      const { videoId } = vid.id
      payload.id.videoId !== videoId && newArr.push(vid)
    })
    state.favMainVid = newArr[0].id.videoId
    state.favorites = newArr
  }
}
