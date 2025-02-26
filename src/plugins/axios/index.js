import axios from 'axios'
import interceptors from './interceptors'
const apiUrl = import.meta.env.VITE_API_URL

const instance = axios.create({
  baseURL: apiUrl,
})

interceptors(instance)

export default instance
