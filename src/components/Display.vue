<template>
	<div class="flex flex-col justify-center px-5 py-10 bg-zinc-100 gap-10">
		<div class="flex flex-col gap-5 items-center w-full">
			<div class="text-3xl text-center text-black">Recent Shots</div>
			<div class="text-lg leading-6 text-center text-black">
				Take a look at our most recent drone shots!
			</div>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
			<Image v-for="(droneShot, index) in props.droneShots" :key="index" :photo="droneShot.imagePath"
				:spotName="droneShot.locationName" :spotId="droneShot.locationId" class="w-full" :isLarge="false" />
		</div>

		<div class="flex flex-col items-center justify-center">
			<RouterLink to="/gallery" class="px-14 py-6 bg-black text-white rounded-md">
				Go to Gallery
			</RouterLink>
		</div>
	</div>
</template>

<script setup>
import { defineProps } from 'vue';
import Image from './Image.vue';
const props = defineProps(['droneShots']);
</script>
