<template>
	<nav class="border-4 border-black bg-zinc-200 w-full fixed top-0 z-10">
		<div class="md:flex md:justify-between items-center p-3">
			<!-- Logo and Menu Toggle Button -->
			<div class="flex items-center justify-between w-full md:w-auto">
				<RouterLink to="/" class="text-2xl font-bold uppercase" @click="isMenuOpen = false">
					<img src="/logo.svg" class="h-10 w-10" alt="Logo" />
				</RouterLink>
				<button alt="Toggle Navbar" @click="toggleMenu" class="text-3xl md:hidden">
					<font-awesome-icon :icon="['fas', isMenuOpen ? 'fa-times' : 'fa-bars']" />
				</button>
			</div>

			<!-- Menu Items -->
			<div :class="{ 'flex-col md:flex-row': isMenuOpen, 'hidden': !isMenuOpen }"
				class="md:flex items-center gap-5 w-full md:w-auto md:justify-between">
				<div class="flex flex-col md:flex-row gap-3 md:gap-5 mt-3 md:mt-0">
					<RouterLink v-for="link in linksLeft" :key="link.text" :to="link.link" @click="isMenuOpen = false">
						{{ link.text }}
					</RouterLink>
				</div>
				<div class="flex flex-col md:flex-row md:items-center gap-3 md:gap-5 mt-3 md:mt-0">
					<RouterLink v-for="link in linksRight" :key="link.text" :to="link.link" @click="isMenuOpen = false">
						{{ link.text }}
					</RouterLink>
					<component :is="button.link ? 'RouterLink' : 'button'" :to="button.link || null"
						class="px-8 py-3 bg-black text-white rounded-md max-w-fit hover:bg-gray-800" @click="executeButtonAction">{{
					button.text }}
					</component>
				</div>
			</div>
		</div>
	</nav>
</template>
<script setup>
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { RouterLink } from 'vue-router'

library.add(faBars, faTimes)

const props = defineProps({
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
	}
})

const isMenuOpen = ref(false)

function toggleMenu() {
	isMenuOpen.value = !isMenuOpen.value
}

function executeButtonAction() {
	if (!props.button.link && props.button.function) {
		props.button.function()
	}
	isMenuOpen.value = false
}
</script>
