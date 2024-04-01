<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const defaultNavbarProps = {
  linksLeft: [
    { text: 'Locations', link: '/locations' },
    { text: 'Gallery', link: '/gallery' }
  ],
  linksRight: [
    { text: 'Add a location', link: '/locations/contribute' },
    { text: 'Login / Sign Up', link: '/login' }
  ],
  button: { text: 'Launch Map', link: '/map' },
};
const route = useRoute();
const navbarProps = computed(() => {
  if (route.path.startsWith('/map')) {
    return {
      ...defaultNavbarProps,
      linksRight: [
        { text: 'Login / Sign Up', link: '/login' }
      ],
      button: { text: 'Add a Location', link: '/locations/contribute' },
    };
  }
  return defaultNavbarProps;
});
</script>

<template>
  <div class="flex flex-col gap-5">
    <header>
      <Navbar :linksLeft="navbarProps.linksLeft" :linksRight="navbarProps.linksRight" :button="navbarProps.button" />
    </header>
    <main>
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
