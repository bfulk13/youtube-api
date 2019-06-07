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
  filterFavs: state => {
    return state.filterFavs
  },
  filterOrder: state => {
    return state.favorites
  }
}
