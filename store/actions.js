const cookieparser = process.server ? require('cookieparser') : undefined

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
  }
}
