<template>
  <Hero />
  <Display :droneShots="droneShots" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Hero from '../components/Hero.vue'
import Display from '../components/Display.vue'

const droneShots = ref([]);

onMounted(async () => {
  const droneSpotsData = await import('../data/drone_spots.json');
  droneShots.value = droneSpotsData.default.flatMap((spot) =>
    spot.image_sources.map((imagePath) => ({
      imagePath,
      location: spot.name
    }))
  );
  droneShots.value = droneShots.value.slice(0, 3);
  console.log(droneShots.value)
})
</script>
