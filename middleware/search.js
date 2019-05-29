import axios from 'axios'

export default async function({ params, store }) {
  let res = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${
      params.id
    }&key=${process.env.apiKey}`
  )
  console.log(1111, res)
  store.commit('GET_VIDS', res.data.items)
}
