import Cookie from 'js-cookie'
import index from '../index'

export function update_from_cookies () {
  let logged_in = Cookie.get('logged_in')
  if (logged_in && JSON.parse(logged_in)) {
    index.commit('logged_in', true)
  } else {
    index.commit('logged_in', false)
  }
}
