<template>
	<div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40" @click="closeImage">
		<dialog class="flex flex-col items-center bg-zinc-100 max-w-full max-h-full h-3/4 w-3/4 overflow-y-scroll" open>
			<div class="absolute top-0 right-0 px-2">
				<button @click="closeImage" class="text-white text-3xl focus:outline-none">
					<FontAwesomeIcon icon="times" />
				</button>
			</div>
			<img :src="props.image" alt="Fullscreen Image" class="h-full w-full object-cover" />
		</dialog>
	</div>
</template>

<script setup props="props">
import { defineEmits, defineProps } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
library.add(faTimes)

const emit = defineEmits(['closeImage'])
const props = defineProps({
	image: String
})

const closeImage = () => {
	emit('closeImage')
}

// Event listener for the escape key press
window.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
		closeImage()
	}
})
</script>

