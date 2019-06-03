export default {
  SET_USER(state, user) {
    state.user = user
  },
  GET_VIDS(state, payload) {
    state.vidArray = payload
  },
  SET_MAIN_VID(state, payload) {
    state.mainVid = payload
  },
  SET_MAIN_FAV_VID(state, payload){
    state.favMainVid = payload
  },
  ADD_FAV(state, payload) {
    state.favorites.unshift(payload)
    state.favorites.forEach(fav => {
      fav.fav = true
    })
  },
  REMOVE_FAV(state, payload) {
    state.favorites.map(fav => {
      fav.id.videoId === payload.id.videoId && state.favorites.splice(fav, 1)
      delete fav.fav
    })
  }
}
