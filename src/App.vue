<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const defaultNavbarProps = {
  linksLeft: [
    { text: 'Gallery', link: '/gallery' }
  ],
  linksRight: [
    { text: 'Add a location', link: '/contribute' },
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
      button: { text: 'Add a Location', link: '/contribute' },
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
    <main class="flex flex-col gap-5">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
