export default {
  mainVidId: state => {
    return state.mainVid
  },
  getVidProps: state => {
    return state.vidArray.filter(vid => {
      return vid.id.videoId.includes(state.mainVid)
    })
  },
  getFavVidProps: state => {
    return state.favorites.filter(fav => {
      return fav.id.videoId.includes(state.FavMainVid)
    })
  },
  getFavArray: state => {
    return state.favorites
  },
  getFavMainVid: state => {
    return state.favMainVid
  },
  getCurrFavObj: state => {
    return state.currFavObj
  },
  sortTitle: state => {
    return state.sortTitle
  },
  sortDateNew: state => {
    return state.sortDateNew
  },
  sortDateOld: state => {
    return state.sortDateOld
  },
  sortLengthShort: state => {
    return state.sortLengthShort
  },
  sortLengthLong: state => {
    return state.sortLengthLong
  }
}
