import axios from 'axios'

export default async function({ params, store }) {
  try {
    let searchStr = params.id ? params.id : 'funny'
    let res = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=viewCount&maxResults=10&q=${searchStr}&key=${
        process.env.apiKey
      }`
    )
    store.commit('SET_VIDS', res.data.items)
    store.commit('SET_MAIN_VID', res.data.items[0].id.videoId)
  } catch (err) {
    console.log(err)
  }
}
