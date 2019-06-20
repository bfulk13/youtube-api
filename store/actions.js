const cookieparser = process.server ? require('cookieparser') : undefined
import axios from 'axios'

// #actions with NUXT

export default {
  nuxtServerInit({ commit }, { req }) {
    let user = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
        console.log(err)
      }
    }
    commit('SET_USER', user)
  },
  async setVidLength({ commit }, id) {
    try {
      let res = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=contentDetails&key=${
          process.env.apiKey
        }`
      )
      // https://www.googleapis.com/youtube/v3/videos?id=Dd7FixvoKBw&t=4s&part=contentDetails&key=AIzaSyBIWrYjkvbuyZoWAYkJ6zXLuMv_-nkz4J0
      const { duration } = res.data.items[0].contentDetails
      let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)

      match = match.slice(1).map(function(x) {
        if (x != null) {
          return x.replace(/\D/, '')
        }
      })

      let hours = parseInt(match[0]) || 0
      let minutes = parseInt(match[1]) || 0
      let seconds = parseInt(match[2]) || 0

      let myObj = {}

      myObj.id = id
      myObj.totalSecs = hours * 3600 + minutes * 60 + seconds
      // #template literal string es6 feature
      myObj.length = `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${
        seconds < 10 ? '0' + seconds : seconds
      }`
      commit('SET_VID_LENGTH', myObj)
    } catch (err) {
      console.log(err)
    }
  }
}
