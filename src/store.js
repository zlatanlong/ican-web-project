const STORAGE_KEY = 'todos-vuejs'
const LOGED_KEY = 'loged'// 用户是否登录的状态保存，保存登录用户的用户名

export default {
  debug: true,
  state: { // 状态库，将会被共享
    // 这里要注意 用的时候必须把state全拿走 不然检测不到里面数据的变化
    user: JSON.parse(window.localStorage.getItem(LOGED_KEY || '')), // 判断登录的用户名
    ifLogin: JSON.parse(window.localStorage.getItem(LOGED_KEY || '')) !== null
  },
  setIfLoginAction (newValue) {
    this.state.user = newValue
    this.state.ifLogin = true
    if (this.debug) console.log('登录状态改变为：', newValue)
    this.saveLogin(newValue)
  },
  clearIfLoginAction () {
    if (this.debug) console.log('清除登录状态')
    this.state.user = ''
    this.state.ifLogin = false
    this.saveLogin(null)
  },
  fetch () {
    return JSON.parse(window.localStorage.getItem(
      STORAGE_KEY || '[]'
    ))
  },
  save (items) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  },
  fetchLogin () {
    return JSON.parse(window.localStorage.getItem(
      LOGED_KEY || ''
    ))
  },
  saveLogin (un) {
    // 注销传 null
    window.localStorage.setItem(LOGED_KEY, JSON.stringify(un))
  }
}
