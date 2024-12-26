import { type AxiosResponse } from 'axios'
import { api, url } from './base'
import bcrypt from 'bcryptjs'

interface Data {
  createdAt: string
  email: string
  avatar: string
  password: string
  id: string
  name: string
}

const comparePassword = (password: string, hashed: string) => bcrypt.compareSync(password, hashed)

export const getUsers: () => Promise<Data[]> = async () => {
  const result = await api.get(`${url}`)
  return result.data
}

export const registerUser: (email: string, password: string) => Promise<Data | null> = async (
  email: string,
  password: string,
) => {
  try {
    const response: AxiosResponse<Data> = await api.post(`${url}`, {
      email,
      password,
    })
    const result = response.data

    return result
  } catch (error) {
    console.error('Error posting user:', error)
    return null
  }
}

export const loginUser: (email: string, password: string) => Promise<Data | null> = async (
  email: string,
  password: string,
) => {
  try {
    const usersFetch = await getUsers()
    const findUser = usersFetch.find((user) => {
      const comparedPassword = comparePassword(password, user.password)

      return user.email === email && comparedPassword
    })

    if (findUser) {
      localStorage.setItem(
        'result',
        JSON.stringify({ avatar: findUser.avatar, email: findUser.email, id: findUser.id }),
      )
      return findUser
    }
    return null
  } catch (error) {
    console.log(error)
    return null
  }
}

export const updateUser: (
  id: string,
  email: string,
  password: string,
) => Promise<Data | null> = async (id: string, email: string, password: string) => {
  try {
    const result: AxiosResponse<Data> = await api
      .put(`${url}/${id}`, {
        email,
        password,
      })
      .then((res) => res)
    localStorage.setItem(
      'result',
      JSON.stringify({ id: result.data.id, email: result.data.email, avatar: result.data.avatar }),
    )
    return result.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const deleteUser: (id: string) => Promise<Data | null> = async (id: string) => {
  try {
    const result: AxiosResponse<Data> = await api.delete(`${url}/${id}`).then((res) => res)
    localStorage.removeItem('result')
    return result.data
  } catch (error) {
    console.log(error)
    return null
  }
}
