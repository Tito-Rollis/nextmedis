import axios from 'axios'

export const url = 'https://676b4a2cbc36a202bb8477f5.mockapi.io/api/users'

export const api = axios.create({ baseURL: url, timeout: 30000 })
