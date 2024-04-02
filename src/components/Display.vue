<template>
	<div class="flex flex-col justify-center px-5 py-10 bg-zinc-100">
		<div class="flex flex-col items-center w-full">
			<div class="text-3xl text-center text-black">Recent Shots</div>
			<div class="mt-9 text-lg leading-6 text-center text-black">
				Take a look at our most recent drone shots!
			</div>
			<div class="grid grid-cols-3 gap-5 mt-20">
				<Image v-for="(droneShot, index) in props.droneShots" :key="index" :photo="droneShot.imagePath"
					:spotName="droneShot.locationName" :spotId="droneShot.locationId" class="w-full" :isLarge="false" />
			</div>
		</div>

		<div class="flex flex-col items-center justify-center mt-10">
			<RouterLink to="/gallery" class="px-14 py-6 bg-black text-white rounded-md">
				See More
			</RouterLink>
		</div>
	</div>
</template>

<script setup>
import { defineProps } from 'vue';
import Image from './Image.vue';
const props = defineProps(['droneShots']);
</script>
