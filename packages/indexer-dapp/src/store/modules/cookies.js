import Cookie from 'js-cookie'
import index from '../index'

export function updateFromCookies () {
  let loggedIn = Cookie.get('logged_in')
  if (loggedIn && JSON.parse(loggedIn)) {
    index.commit('logged_in', true)
  } else {
    index.commit('logged_in', false)
  }
}
