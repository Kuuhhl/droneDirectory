<template>
	<nav class="border-4 border-black bg-white">
		<div class="md:flex md:justify-between items-center p-3">
			<!-- Logo and Menu Toggle Button -->
			<div class="flex items-center justify-between w-full md:w-auto">
				<RouterLink to="/" class="text-2xl font-bold uppercase">DD</RouterLink>
				<button @click="isMenuOpen = !isMenuOpen" class="text-3xl md:hidden">
					<font-awesome-icon :icon="['fas', 'fa-bars']"></font-awesome-icon>
				</button>
			</div>

			<!-- Menu Items -->
			<div :class="{ 'flex-col md:flex-row': isMenuOpen, 'hidden': !isMenuOpen }"
				class="md:flex items-center gap-5 w-full md:w-auto md:justify-between">
				<div class="flex flex-col md:flex-row gap-3 md:gap-5 mt-3 md:mt-0">
					<RouterLink v-for="link in linksLeft" :key="link.text" :to="link.link">{{ link.text }}
					</RouterLink>
				</div>
				<div class="flex flex-col md:flex-row md:items-center gap-3 md:gap-5 mt-3 md:mt-0">
					<RouterLink v-for="link in linksRight" :key="link.text" :to="link.link">{{ link.text }}</RouterLink>
					<RouterLink :to="button.link" class="px-8 py-3 bg-black text-white rounded-md max-w-fit">{{ button.text }}
					</RouterLink>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	props: {
		linksLeft: {
			type: Array,
			required: true
		},
		linksRight: {
			type: Array,
			required: true
		},
		button: {
			type: Object,
			required: true
		},
	},
	data() {
		return {
			isMenuOpen: false
		}
	}
}
</script>
<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faBars)


</script>
