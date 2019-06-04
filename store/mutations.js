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
  },
  REMOVE_FAV(state, payload) {
    state.favorites.map(fav => {
      fav.id.videoId === payload.id.videoId && state.favorites.splice(fav, 1)
      delete fav.fav
      delete fav.date
    })
  }
}
