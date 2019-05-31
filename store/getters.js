export default {
  mainVidId: state => {
    return state.mainVid
  },
  getVidProps: state => {
    return state.vidArray.filter(vid => {
      vid.id.videoId.includes(state.mainVid) && vid
    })
  }
}
