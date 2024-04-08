<template>
	<div class="px-5">
		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			<Image v-for="(photo, index) in shuffledAllImages" :key="index" :photo="photo.image" :spotName="photo.spotName"
				:spotId="photo.spotId" :isLarge="isLargeImage(index)" />
		</div>
	</div>
</template>

<script setup>
import droneSpots from '../data/drone_spots.json';
import seedrandom from 'seedrandom';
import Image from './Image.vue';

const isLargeImage = (index) => {
	// Making every 3rd and 4th image larger for a dynamic look.
	return index % 4 === 0 || index % 4 === 1;
};

const aggregateImages = () => {
	let allImages = [];
	droneSpots.forEach(spot => {
		spot.image_sources.forEach(image => {
			allImages.push({ image, spotName: spot.name, spotId: spot.id });
		});
	});
	return allImages;
};
const shuffleArray = (array) => {
	const shuffledArray = [...array]; // Create a copy of the original array

	// Create a deterministic random number generator with the provided seed
	const rng = seedrandom('Seed');

	// Fisher-Yates shuffle algorithm
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}

	return shuffledArray;
}
const allImages = aggregateImages();
const shuffledAllImages = shuffleArray(allImages);
</script>
