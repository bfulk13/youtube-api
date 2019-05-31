export default {
  SET_USER(state, user) {
    state.user = user
  },
  GET_VIDS(state, payload){
    state.vidArray = payload
  },
  SET_MAIN_VID(state, payload){
    state.mainVid = payload
  }
}