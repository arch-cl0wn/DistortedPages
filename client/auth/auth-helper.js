import { signout } from './api-auth.js'

const auth = {
  isAuthenticated() {
    if (typeof window == "undefined")
      return false

    if (localStorage.getItem('jwt'))
      return JSON.parse(localStorage.getItem('jwt'))
    else
      return false
  },
  authenticate(jwt, cb) {
    if (typeof window !== "undefined")
      localStorage.setItem('jwt', JSON.stringify(jwt))
    cb()
  },
  clearJWT(cb) {
    if (typeof window !== "undefined")
      localStorage.removeItem('jwt')
    cb()
    //optional
    signout().then((data) => {
      document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict"
    })
  }
}

export default auth
