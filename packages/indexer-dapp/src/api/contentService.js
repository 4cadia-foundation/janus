import axios from 'axios'

function contentService (contentName) {
  return axios.get(`./static/content/${contentName}.json`)
}

export default contentService
