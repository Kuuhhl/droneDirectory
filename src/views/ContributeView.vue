<template>
  <Contribute />
</template>
<script setup>
import Contribute from '../components/Contribute.vue'

import { useHead } from '@unhead/vue'
useHead({
  title: 'Contribute - Drone Directory',
  meta: [
    {
      name: 'description',
      content: "Help the community by submitting your favourite drone spot!"
    }
  ]
})

</script>
