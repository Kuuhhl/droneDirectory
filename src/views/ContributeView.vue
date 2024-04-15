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
  ],
  script: [
    {
      src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD1uFtiEOeXq5pzdiKT3QHzSFpe6L2v1lo&libraries=places"
    }
  ]
})

</script>
