<template>
  <LoginRegister />
</template>
<script setup>
import LoginRegister from '../components/LoginRegister.vue'


import { useHead } from '@unhead/vue'
useHead({
  title: 'Login / Register - Drone Directory',
  meta: [
    {
      name: 'description',
      content: "Login or register to access your account."
    }
  ]
})

</script>
