<script setup>
import Gallery from '../components/Gallery.vue'
import { useHead } from '@unhead/vue'
useHead({
  title: 'Gallery - Drone Directory',
  meta: [
    {
      name: 'description',
      content: "View the latest drone shots from our users."
    }
  ]
})

</script>
<template>
  <Gallery />
</template>
