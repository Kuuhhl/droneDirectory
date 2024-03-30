<template>
	<div class="flex flex-col bg-zinc-100 max-w-[604px] mx-auto">
		<div class="pt-2 pb-6 w-full bg-zinc-600">
			<div class="flex justify-end">
				<button @click="() => emit('clear')" class="flex justify-center w-8 h-8 bg-zinc-700 rounded-full">
					<font-awesome-icon :icon="faTimes" class="w-4 text-white" />
				</button>
			</div>
			<!-- Carousel Arrows -->
			<div class="flex justify-between px-2 mt-14 text-xl text-white">
				<font-awesome-icon :icon="faChevronLeft" class="w-5" />
				<div class="my-auto">Carousel</div>
				<font-awesome-icon :icon="faChevronRight" class="w-5" />
			</div>
			<!-- Carousel Indicators -->
			<div class="flex justify-center px-4 mt-16 gap-4">
				<div class="h-1 bg-neutral-400 w-10"></div>
				<div class="h-1 bg-white w-10"></div>
				<div class="h-1 bg-neutral-400 w-10"></div>
			</div>
		</div>
		<div class="flex flex-col p-4 w-full">
			<div class="flex justify-between text-black">
				<div>
					<div class="text-xl">11 Visits</div>
					<div class="mt-2 text-2xl font-medium">Location</div>
				</div>
				<div class="flex justify-center my-auto text-base">
					<div class="flex items-center px-4 py-3 rounded-md border">
						<!-- Replace Navigate icon with FontAwesome -->
						<font-awesome-icon icon="faMapMarkerAlt" class="w-6" />
						<span class="ml-2">Navigate</span>
					</div>
				</div>
			</div>
			<div class="mt-4 text-xl">Emilio</div>
			<div class="mt-4 text-base">
				I went there on my trip to Wales, and the landscape is breathtaking!
				<br>I recommend you bring good shoes though as the terrain...
			</div>
			<div class="mt-4 text-xs">Read all Reviews</div>
			<div class="flex justify-between px-4 mt-16 text-base">
				<div class="px-6 py-3 bg-black rounded-md text-white flex items-center">
					<!-- Replace Want to Go icon with FontAwesome -->
					<font-awesome-icon icon="faHeart" class="w-6" />
					<span class="ml-2">Want to Go</span>
				</div>
				<div class="px-4 py-3 rounded-md border flex items-center">
					<!-- Replace Mark as Visited icon with FontAwesome -->
					<font-awesome-icon icon="faCheck" class="w-6" />
					<span class="ml-2">Mark as Visited</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps(['droneSpot'])
const emit = defineEmits(['clear'])
</script>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons'
export default {
	components: {
		FontAwesomeIcon
	},
	data() {
		return {
			faChevronLeft,
			faChevronRight
			, faTimes
		}
	}
}

</script>
