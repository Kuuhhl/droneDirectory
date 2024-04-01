<template>
	<div class="flex flex-col justify-center px-5 py-10 bg-zinc-100">
		<div class="flex flex-col items-center w-full">
			<div class="text-3xl text-center text-black">Recent Shots</div>
			<div class="mt-9 text-lg leading-6 text-center text-black">
				Take a look at our most recent drone shots!
			</div>
			<!-- container with grid setup -->
			<div class="grid grid-cols-3 gap-5 mt-20">
				<!-- card, using object-fill for image and setting aspect ratio -->
				<div class="w-full" v-for="(droneShot, index) in droneShots" :key="index">
					<img :src="`/src/assets/images/${droneShot.imagePath}`" :alt="'Drone shot at ' + droneShot.location"
						class="w-full h-auto aspect-square object-cover">
				</div>
			</div>
		</div>

		<div class="flex flex-col items-center justify-center mt-10">
			<RouterLink to="/gallery" class="px-14 py-6 bg-black text-white rounded-md">
				See More
			</RouterLink>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		droneShots: {
			type: Array,
			required: true
		}
	}
}
</script>

