<template>
	<div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
		<dialog class="flex flex-col items-center py-6 pr-5 pl-12 bg-zinc-100 z-50 max-w-6xl" open>
			<!-- Slot for header -->
			<header class="w-full max-w-5xl">
				<div class="flex justify-end">
					<button
						class="flex items-center gap-2.5 self-end px-4 py-2.5 text-lg text-black rounded-md border border-black"
						@click="closeWarning">
						<font-awesome-icon :icon="['fas', 'times']" />
						Close Popup
					</button>
				</div>
				<slot name="header">
					<h2 class="mt-1.5 text-4xl font-medium text-center">Before you depart</h2>
					<p class="mt-9 text-lg leading-7 text-center">
						Before we proceed to navigation, please accept the following guidelines:
					</p>
				</slot>
			</header>

			<!-- Slot for main content -->
			<section class="mt-10 self-stretch">
				<slot name="content">
					<!-- Default guidelines content here -->
				</slot>
			</section>

			<!-- Slot for footer -->
			<footer class="mt-24 w-full">
				<slot name="footer">
					<!-- Default footer content here -->
				</slot>
			</footer>

			<!-- Slot for alternative action -->
			<slot name="alternative">
				<div class="flex flex-col mt-11 text-lg text-center w-full">
					<slot name="alternative">
						<span class="font-extralight">or</span>
						<button @click="closeWarning">
							Go back to the map
						</button>
					</slot>
				</div>
			</slot>
		</dialog>
	</div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
const emit = defineEmits(['closeWarning'])

const closeWarning = () => {
	emit('closeWarning')
}
</script>
