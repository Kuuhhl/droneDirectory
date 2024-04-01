<script setup>
import { ref } from 'vue';
import Map from '../components/Map.vue';
import Warning from '../components/Warning.vue';

const props = defineProps({
  id: {
    type: String,
    required: false,
  },
});

// Initialize a ref for airports data
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
