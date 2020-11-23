import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => {
  if (newToken) {
    token = `bearer ${newToken}`
  } else {
    token = null
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = async (blogObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const update = async (id, blogObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, blogObject)
  return response.data
}

const deletePost = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const postComment = async (id, commentObject) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, commentObject)
  return response.data
}

export default {
  setToken,
  getAll,
  createNew,
  update,
  deletePost,
  postComment
}