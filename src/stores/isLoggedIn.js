import { ref } from 'vue'
import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useIsLoggedInStore = defineStore('isLoggedIn', () => {
  const isLoggedIn = ref(Cookies.get('isLoggedIn') === 'true' || false)

  function logIn() {
    isLoggedIn.value = true
    Cookies.set('isLoggedIn', 'true', {sameSite: 'strict'})
  }

  function logOut() {
    isLoggedIn.value = false
    Cookies.set('isLoggedIn', 'false', {sameSite: 'strict'})
  }

  return { isLoggedIn, logIn, logOut }
})
