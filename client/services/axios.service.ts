import axios from 'axios'

// const host = 'https://nest.fradotech.up.railway.app/api/v1'
const host = 'http://localhost:3000/api/v1'

export const axiosService = {
  get: async (
    endpoint: string,
    params?: Record<string, any>,
  ): Promise<Record<string, any>> => {
    try {
      const { data } = await axios.get(`${host}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('_accessToken')}`,
        },
        params,
      })

      return data
    } catch (error) {
      alert(error)
      return error
    }
  },

  post: async (
    endpoint: string,
    dataPost?: Record<string, Record<string, any>>,
    isCatch?: boolean,
  ): Promise<Record<string, any>> => {
    try {
      const { data } = await axios.post(`${host}${endpoint}`, dataPost, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('_accessToken')}`,
        },
      })

      return data
    } catch (error) {
      isCatch && alert(error)
      return error
    }
  },

  put: async (
    endpoint: string,
    dataPost?: Record<string, any>,
    isCatch?: boolean,
  ): Promise<Record<string, any>> => {
    try {
      const { data } = await axios.put(`${host}${endpoint}`, dataPost, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('_accessToken')}`,
        },
      })

      return data
    } catch (error) {
      isCatch && alert(error)
      return error
    }
  },

  delete: async (endpoint: string): Promise<Record<string, any>> => {
    try {
      const { data } = await axios.delete(`${host}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('_accessToken')}`,
        },
      })

      return data
    } catch (error) {
      alert(error)
      return error
    }
  },
}
