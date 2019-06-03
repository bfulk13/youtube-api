export default {
  mainVidId: state => {
    return state.mainVid
  },
  getVidProps: state => {
    return state.vidArray.filter(vid => {
      return vid.id.videoId.includes(state.mainVid)
    })
  },
  getFavArray: state => {
    return state.favorites
  },
  getFavMainVid: state => {
    return state.getFavMainVid
  }
}
