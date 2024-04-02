<template>
	<div class="gallery">
		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			<Image v-for="(photo, index) in shuffledAllImages" :key="index" :photo="photo.image" :spotName="photo.spotName"
				:spotId="photo.spotId" :isLarge="isLargeImage(index)" />
		</div>
	</div>
</template>

<script setup>
import droneSpots from '../data/drone_spots.json';
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

const shuffleImages = (images) => {
	const shuffled = [...images];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // swap elements
	}
	return shuffled;
};

const allImages = aggregateImages();
const shuffledAllImages = shuffleImages(allImages);
</script>

