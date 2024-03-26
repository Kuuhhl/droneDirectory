<template>
  <header>
    <Navbar :linksLeft=linksLeft :button=button :linksRight=linksRight />
  </header>
  <main>
    <Hero />
    <Display :droneShots="droneShots" />
  </main>
</template>

<script setup>
import Display from '../components/Display.vue'
import Navbar from '../components/Navbar.vue'
import Hero from '../components/Hero.vue'

const droneShots = [
  {
    location: 'The Beach',
    imagePath: 'https://picsum.photos/200'
  },
  {
    location: 'The Mountains',
    imagePath: 'https://picsum.photos/200'
  },
  {
    location: 'The City',
    imagePath: 'https://picsum.photos/200'
  },
]


const linksLeft = [
  {
    text: 'Locations',
    link: '/locations',
  },
  {
    text: 'Gallery',
    link: '/gallery',
  }
]
const linksRight = [
  {
    text: 'Add a location',
    link: '/locations/contribute',
  },
  {
    text: 'Login / Sign Up',
    link: '/login',
  }
]

const button = {
  text: 'Launch Map',
  link: '/map',
}

</script>
