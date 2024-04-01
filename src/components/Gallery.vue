<template>
	<div class="gallery">
		<div v-for="spot in droneSpots" :key="spot.name" class="mb-10">
			<div class="gallery-panel grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				<div v-for="(photo, index) in shuffledImages(spot.image_sources)" :key="index"
					:class="{ 'row-span-2 col-span-2': isLargeImage(index), 'row-span-1 col-span-1': !isLargeImage(index) }"
					class="relative group">
					<img :src="'/src/assets/images/' + photo" :alt="`Image of ${spot.name}`" class="w-full h-full object-cover">
					<div
						class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-5">
						<span class="text-white font-bold">{{ spot.name }}</span>
						<RouterLink :to="`/map/${spot.id}`" class="text-white underline">Go to Location</RouterLink>

					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import droneSpots from '../data/drone_spots.json';

const isLargeImage = (index) => {
	// Making every 3rd and 4th image larger for a dynamic look.
	return index % 4 === 0 || index % 4 === 1;
};

// Function to shuffle images to scramble their order
const shuffledImages = (images) => {
	const shuffled = [...images];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // swap elements
	}
	return shuffled;
};
</script>
