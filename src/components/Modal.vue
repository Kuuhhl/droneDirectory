<template>
	<div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
		<div class="bg-zinc-100 max-w-6xl max-h-screen overflow-y-auto mx-5 xl:mx-auto rounded-lg shadow-lg">
			<div class="py-6 px-4 md:px-12 gap-5 flex flex-col">
				<header class="w-full">
					<div class="flex justify-end">
						<button
							class="flex justify-center items-center gap-2.5 px-4 py-2.5 text-lg text-black rounded-md border border-black mb-5 hover:border-gray-400"
							@click="closeWarning">
							<FontAwesomeIcon :icon="['fas', 'times']" />
							Close Popup
						</button>
					</div>
					<slot name="header">
						<h2 class="text-2xl md:text-4xl font-medium text-center">Before you depart</h2>
						<p class="mt-9 text-lg leading-7 text-center">
							Before we proceed to navigation, please accept the following guidelines:
						</p>
					</slot>
				</header>
				<main class="w-full">
					<slot name="content">
						<!-- Default guidelines content here -->
					</slot>
				</main>
				<footer class="w-full">
					<slot name="footer">
						<!-- Default footer content here -->
					</slot>
				</footer>
				<slot name="alternative">
					<div class="flex flex-col text-lg text-center w-full">
						<span class="font-extralight">or</span>
						<button class="hover:underline" @click="closeWarning">Go back to the map</button>
					</div>
				</slot>
			</div>
		</div>
	</div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { onMounted, onUnmounted } from 'vue'

library.add(faTimes)

const emit = defineEmits(['closeWarning'])

const closeWarning = () => {
	emit('closeWarning')
}

onMounted(() => {
	document.body.style.overflow = 'hidden'
})
onUnmounted(() => {
	document.body.style.overflow = 'auto'
}
)
</script>
