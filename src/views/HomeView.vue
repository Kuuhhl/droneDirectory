<template>
  <Hero />
  <Display :droneShots="droneShots" />
</template>

<script setup>
import { useHead } from '@unhead/vue'
import { ref, onMounted } from 'vue'
import seedrandom from 'seedrandom'
import Hero from '../components/Hero.vue'
import Display from '../components/Display.vue'

useHead(
  {
    title: 'Home - Drone Directory'
    ,
    meta: [
      {
        name: 'description',
        content: "Discover and share the best spots for drone photography in the British Isles."
      }
    ]
  }
)

const droneShots = ref([]);

function shuffleArray(array) {
  const shuffledArray = [...array]; // Create a copy of the original array

  // Create a deterministic random number generator with the provided seed
  const rng = seedrandom('seed');

  // Fisher-Yates shuffle algorithm
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}
onMounted(async () => {
  const droneSpotsData = await import('../data/drone_spots.json');
  droneShots.value = droneSpotsData.default.flatMap((spot) =>
    spot.image_sources.map((imagePath) => ({
      imagePath,
      locationName: spot.name,
      locationId: spot.id
    }))
  );
  droneShots.value = shuffleArray(droneShots.value);
  droneShots.value = droneShots.value.slice(0, 3);
})
</script>
