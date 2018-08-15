const STORAGE_KEY = 'todos-vuejs'
const LOGED_KEY = 'loged'

export default {
  fetch () {
    return JSON.parse(window.localStorage.getItem(
      STORAGE_KEY || '[]'
    ))
  },
  save (items) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  },
  fetchLogd () {
    return JSON.parse(window.localStorage.getItem(
      LOGED_KEY || ''
    ))
  },
  saveLoged (un) {
    window.localStorage.setItem(LOGED_KEY, JSON.stringify(un))
  }
}
