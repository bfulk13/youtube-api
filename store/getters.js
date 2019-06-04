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
    return state.FavMainVid
  }
  // sortTitle: state => {
  //   state.favorites.length > 0 &&
  //     state.favorites.snippet.title.sort((a, b) => {
  //       let titleA = a.title.toLowerCase()
  //       let titleB = b.title.toLowerCase()
  //       if (titleA < titleB) return -1
  //       if (titleB < titleA) return 1
  //       return 0
  //     })
  // },
  // sortDateNew: state => {
  //   state.favorites.length > 0 && state.favorites.date.sort((a, b) => a - b)
  // },
  // sortDateOld: state => {
  //   state.favorites.length > 0 && state.favorites.date.sort((a, b) => b - a)
  // },
  // sortLengthShort: state => {
  //   state.favorites.length > 0 && state.favorites.length.sort((a, b) => a - b)
  // },
  // sortLengthLong: state => {
  //   state.favorites.length > 0 && state.favorites.length.sort((a, b) => b - a)
  // }
}
