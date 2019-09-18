export default class LocalStorage {
  static existsItem (item) {
    return localStorage.getItem(item) !== null
  }
  static setItem (key, value) {
    return localStorage.setItem(key, value)
  }
  static getItem (item) {
    return localStorage.getItem(item)
  }
}
