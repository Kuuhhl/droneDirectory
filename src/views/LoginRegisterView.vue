<template>
  <LoginRegister :message="props.message" />
</template>

<script setup>
import { ref } from 'vue'
import LoginRegister from '../components/LoginRegister.vue'
import { useHead } from '@unhead/vue'

const props = defineProps({
  message: {
    type: String,
    default: ''
  }
})

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
