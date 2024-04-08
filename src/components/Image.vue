<template>
	<div :class="{ 'row-span-2 col-span-2': props.isLarge, 'row-span-1 col-span-1': !props.isLarge }"
		class="relative group">
		<img :src="props.photo" :alt="`Image of ${props.spotName}`" class="w-full h-full object-cover">
		<div
			class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-5">
			<span class="text-white font-bold">{{ props.spotName }}</span>
			<RouterLink :to="`/map/${props.spotId}`" class="text-white underline">View on Map</RouterLink>
			<button @click="showFullscreen()" class="text-white underline">Open Fullscreen</button>
			<FullscreenImage @closeImage="handleCloseImage" v-if="isFullscreen" :image="props.photo" />
		</div>
	</div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import FullscreenImage from './FullscreenImage.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faMapMarkerAlt);
const props = defineProps({
	photo: String,
	spotName: String,
	spotId: String,
	isLarge: Boolean
});
const isFullscreen = ref(false);

const showFullscreen = () => {
	isFullscreen.value = true;
};
const handleCloseImage = () => {
	isFullscreen.value = false;
};
</script>
