<template>

	<div class="relative group" v-touch:swipe.left="nextImage" v-touch:swipe.right="prevImage">
		<button @click="emit('clear')"
			class="absolute right-0 top-0 z-20 flex justify-center items-center w-12 h-12 text-xl p-2">
			<font-awesome-icon :icon="['fas', 'times']" class="w-4 text-white" />
		</button>
		<img :src="currentImageSource" class="w-full h-48 object-cover" />
		<div class="absolute inset-x-0 bottom-0 flex justify-between px-2 pb-2 text-xl text-white z-10">
			<button @click="prevImage" class="p-2">
				<font-awesome-icon :icon="['fas', 'chevron-left']" class="w-5" />
			</button>
			<div class="flex justify-center items-center gap-4">
				<div v-for="(source, index) in props.imageSources" :key="index" class="py-5 cursor-pointer"
					@click="setCurrentIndex(index)">
					<div class="h-1 w-10"
						:class="{ 'bg-white': currentIndex === index, 'bg-opacity-50': currentIndex !== index, 'bg-white opacity-50': currentIndex !== index }">
					</div>
				</div>
			</div>
			<button @click="nextImage" class="p-2">
				<font-awesome-icon :icon="['fas', 'chevron-right']" class="w-5" />
			</button>
		</div>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faChevronLeft, faChevronRight, faTimes)

const props = defineProps(['imageSources'])
const emit = defineEmits(['clear'])
const currentIndex = ref(0)

const currentImageSource = computed(() => {
	return `/src/assets/images/${props.imageSources[currentIndex.value]}`
})

function setCurrentIndex(index) {
	currentIndex.value = index
}

function nextImage() {
	if (currentIndex.value < props.imageSources.length - 1) {
		currentIndex.value++
	} else {
		currentIndex.value = 0
	}
}

function prevImage() {
	if (currentIndex.value > 0) {
		currentIndex.value--
	} else {
		currentIndex.value = props.imageSources.length - 1
	}
}
</script>
