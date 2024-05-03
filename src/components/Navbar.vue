<template>
	<nav class="border-4 border-black bg-zinc-200 w-full fixed top-0 z-10">
		<div class="md:flex md:justify-between items-center p-3">
			<!-- Logo and Menu Toggle Button -->
			<div class="flex items-center justify-between w-full md:w-auto">
				<RouterLink to="/" class="text-xl font-semibold flex gap-2 items-center justify-center group"
					@click="isMenuOpen = false">
					<img src="/logo.svg"
						class="h-10 w-10 transition duration-100 transform group-hover:-translate-y-0.5 group-hover:scale-105"
						alt="Logo" />
					<span class="hidden md:inline">Drone Directory</span>
				</RouterLink>
				<button alt="Toggle Navbar" @click="toggleMenu" class="text-3xl md:hidden">
					<FontAwesomeIcon :icon="['fas', isMenuOpen ? 'fa-times' : 'fa-bars']" />
				</button>
			</div>

			<!-- Menu Items -->
			<div :class="{ 'flex-col md:flex-row': isMenuOpen, 'hidden': !isMenuOpen }"
				class="md:flex items-center gap-5 w-full md:w-auto md:justify-between">
				<div class="flex flex-col md:flex-row gap-3 md:gap-5 mt-3 md:mt-0">
					<RouterLink v-for="link in linksLeft" :key="link.text" :to="link.link" @click="isMenuOpen = false"
						class="relative group py-2 after:absolute after:bottom-0 after:left-0 after:bg-black after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 md:after:left-1/2 md:after:-translate-x-1/2">
						{{ link.text }}
					</RouterLink>
				</div>
				<div class="flex flex-col md:flex-row md:items-center gap-3 md:gap-5 mt-3 md:mt-0">
					<component v-for="item in props.linksRight" :key="item.text" :is="item.link ? 'RouterLink' : 'button'"
						:to="item.link || null" @click="item.link ? executeAction(item) : executeAction(item)"
						class="relative group py-2 after:absolute after:bottom-0 after:left-0 after:bg-black after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 md:after:left-1/2 md:after:-translate-x-1/2 cursor-pointer text-start">
						{{ item.text }}
					</component>
					<component :is="props.button.link ? 'RouterLink' : 'button'" :to="props.button.link || null"
						@click="props.button.link ? executeAction(props.button) : executeAction(props.button)"
						class="px-8 py-3 bg-black text-white rounded-md max-w-fit hover:bg-gray-800 cursor-pointer">
						{{ button.text }}
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

const executeAction = (item) => {
	isMenuOpen.value = false;
	if (item.function) {
		item.function();
	}
};
</script>
