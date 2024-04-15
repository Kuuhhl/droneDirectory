<script setup>
import { ref, onMounted } from 'vue';
import Map from '../components/Map.vue';
import Warning from '../components/Warning.vue';


import { useHead } from '@unhead/vue'
useHead({
  title: 'Map - Drone Directory',
  meta: [
    {
      name: 'description',
      content: "View our community curated map of the best drone spots in the British Isles!"
    }
  ]
})


const props = defineProps({
  id: {
    type: String,
    required: false,
  },
});

const isWarningOpened = ref(false);
const warningCoordinates = ref({});

const handleOpenWarning = (coordinates) => {
  warningCoordinates.value = coordinates;
  isWarningOpened.value = true;
};

const handleCloseWarning = () => {
  isWarningOpened.value = false;
};

</script>

<template>
  <Warning v-if="isWarningOpened" :coordinates="warningCoordinates" @closeWarning="handleCloseWarning" />
  <Map @openWarning="handleOpenWarning" :id="props.id" />
</template>
