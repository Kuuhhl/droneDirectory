<template>
	<div class="flex flex-col bg-zinc-100 max-w-[600px] mx-5">
		<Carousel :imageSources="props.droneSpot.image_sources" @clear="emit('clear')" />
		<div class="flex flex-col p-4 w-full">
			<div class="flex justify-between text-black">
				<div>
					<div class="text-xl">{{ props.droneSpot.visitors }} Visits</div>
					<div class="mt-2 text-2xl font-medium">{{ props.droneSpot.name }}</div>
				</div>
				<div class="flex justify-center my-auto text-base">
					<button @click="openWarning(props.droneSpot.coordinates)"
						class="flex items-center px-4 py-3 rounded-md border">
						<font-awesome-icon :icon="['fas', 'route']" class="w-6" />
						<span class="ml-2">Navigate</span>
					</button>
				</div>
			</div>
			<template v-if="props.droneSpot.comments.length > 0">
				<div class="mt-4 text-base">
					{{ props.droneSpot.comments[0].comment }} <br />~ {{ props.droneSpot.comments[0].name }}</div>
				<routerLink to="#" class="mt-4 text-xs">Read all Reviews</routerLink>
			</template>
			<div class="flex justify-between px-4 mt-16 text-base">
				<button class="px-4 py-3 bg-black rounded-md text-white flex items-center" @click="toggleWantToGo">
					<font-awesome-icon v-if="!props.droneSpot.want_to_go" :icon="['fas', 'heart']" class="w-6" />
					<font-awesome-icon v-if="props.droneSpot.want_to_go" :icon="['fas', 'heart-broken']" class="w-6" />
					<span v-if="props.droneSpot.want_to_go" class="ml-2">Don't want to Go</span>
					<span v-if="!props.droneSpot.want_to_go" class="ml-2">Want to Go</span>
				</button>
				<button class="px-4 py-3 rounded-md border flex items-center" @click="toggleVisited">
					<font-awesome-icon v-if="!props.droneSpot.visited" :icon="['fas', 'check']" class="w-6" />
					<font-awesome-icon v-if="props.droneSpot.visited" :icon="['fas', 'xmark']" class="w-6" />
					<span v-if="!props.droneSpot.visited" class="ml-2">Mark as Visited</span>
					<span v-if="props.droneSpot.visited" class="ml-2">Unmark as Visited</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRoute, faHeart, faCheck, faHeartBroken, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Carousel from './Carousel.vue'

library.add(faRoute, faHeart, faCheck, faHeartBroken, faXmark)

const props = defineProps(['droneSpot'])
const emit = defineEmits(['clear', 'openWarning'])

const openWarning = coordinates => {
	emit('openWarning', coordinates)
}
const toggleWantToGo = () => {
	props.droneSpot.want_to_go = !props.droneSpot.want_to_go
}
const toggleVisited = () => {
	props.droneSpot.visited = !props.droneSpot.visited
	props.droneSpot.visitors = props.droneSpot.visited ? props.droneSpot.visitors + 1 : props.droneSpot.visitors - 1
}

</script>
