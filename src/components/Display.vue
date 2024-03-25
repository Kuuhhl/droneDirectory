<template>
	<div class="flex flex-col justify-center px-5 pt-20 bg-zinc-100">
		<div class="flex flex-col items-center w-full ">
			<div class="text-3xl text-center text-black">Recent Shots</div>
			<div class="mt-9 text-lg leading-6 text-center text-black">
				Take a look at our most recent drone shots!
			</div>
			<!-- container -->
			<div class="flex flex-wrap justify-center gap-5 mt-20">
				<!-- card -->
				<img :src="droneShot.imagePath" :alt="'Drone shot at ' + droneShot.location"
					v-for="(droneShot, index) in droneShots" :key="index">
			</div>
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
