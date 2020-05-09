import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  // console.log('在auth.js里面的测试'+token)
  return Cookies.set(TokenKey, token)
  // return Cookies.set(TokenKey, "'"+token+"'")
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
