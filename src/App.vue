<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useIsLoggedInStore } from '@/stores/isLoggedIn';
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const store = useIsLoggedInStore();
const route = useRoute();
const router = useRouter()

const defaultNavbarProps = {
  linksLeft: [{ text: 'Gallery', link: '/gallery' }],
  linksRight: [{ text: 'Add a location', link: '/contribute' }],
  button: { text: 'Launch Map', link: '/map' },
};

const navbarProps = computed(() => {
  let linksRight = [...defaultNavbarProps.linksRight];
  let button = { ...defaultNavbarProps.button };

  if (store.isLoggedIn) {
    linksRight.push({
      text: 'Log out', function: () => { store.logOut(); router.push('/') }
    })
  } else {
    linksRight.push({ text: 'Login / Sign Up', link: '/login' })
  }

  if (route.path.startsWith('/map')) {
    button = { text: 'Add a Location', link: '/contribute' };
    linksRight = linksRight.filter(link => link.text !== 'Add a location');
  }

  return {
    ...defaultNavbarProps,
    linksRight,
    button
  };
});
</script>

<template>
  <div class="flex flex-col gap-5">
    <header class="h-16 md:h-20">
      <Navbar :linksLeft="navbarProps.linksLeft" :linksRight="navbarProps.linksRight" :button="navbarProps.button" />
    </header>
    <main class="flex flex-col gap-5">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
