import axios from 'axios'
export const instance = axios.create()

instance.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL_BASE
instance.defaults.headers.common['Authorization'] =
  `KakaoAK ${process.env.NEXT_PUBLIC_API_KEY}`
