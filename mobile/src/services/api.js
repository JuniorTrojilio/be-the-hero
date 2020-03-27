import axios from 'axios'

const api = axios.create({
    baseURL : 'HTTP://192.168.1.18:3333'
})

export default api