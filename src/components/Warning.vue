<template>
	<template v-if="step === 1">
		<Modal @closeWarning="closeWarning">
			<template v-slot:header>
				<h2 class="mt-1.5 text-4xl font-medium text-center">Before you depart</h2>
				<p class="mt-9 text-lg leading-7 text-center">
					Before we proceed to navigation, please accept the following guidelines:
				</p>
			</template>

			<template v-slot:content>
				<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 justify-center justify-items-center">
					<div class="guideline">
						<div class="bg-black aspect-square h-80"></div>
						<h3 class="mt-10 text-2xl leading-8">Respect other’s privacy</h3>
						<p class="mt-9 text-sm leading-5">
							We’re sure you wouldn’t like a drone buzzing outside your apartment window - keep it that way for others
							as well.
						</p>
					</div>
					<div class="guideline">
						<div class="bg-black aspect-square h-80"></div>
						<h3 class="mt-10 text-2xl leading-8">Do not fly over restricted areas</h3>
						<p class="mt-8 text-sm leading-5">
							This especially includes airports, airfields, military bases, and other restricted areas.
						</p>
					</div>
					<div class="guideline">
						<div class="bg-black aspect-square h-80"></div>
						<h3 class="mt-10 text-2xl leading-8">Follow the CAA Regulations</h3>
						<p class="mt-8 text-sm leading-5">
							In order to legally fly drones in the UK, you have to follow the CAA’s regulations. This can include
							applying for insurance and / or license before flying.
							<a href="https://www.caa.co.uk/uk-regulations/" class="underline">View Regulations</a>
						</p>
					</div>
				</div>
			</template>

			<template v-slot:footer>
				<div class="flex flex-col md:flex-row gap-2.5 justify-between px-8">
					<button @click="acceptWarning"
						class="flex justify-center items-center px-6 py-5 w-full bg-black text-white rounded-md">
						Accept & Send Route to Phone
					</button>
					<a :href="`https://www.google.com/maps/dir/?api=1&destination=${encodeURI(props.coordinates['lat'] + ',' + props.coordinates['lng'])}&travelmode=driving`"
						class="flex justify-center items-center px-16 py-5 w-full text-black rounded-md border border-black">
						Accept & View Route
					</a>
				</div>
			</template>
		</Modal>
	</template>
	<template v-if="step === 2">
		<Modal @closeWarning="closeWarning">
			<template v-slot:header>
				<h2 class="mt-1.5 text-4xl font-medium text-center">Ready to get started?</h2>
				<p class="mt-9 text-lg leading-7 text-center">
					We will send the route to your phone via SMS. Please make sure you have your phone with you.
				</p>
			</template>
			<template v-slot:content>
				<div
					class="flex gap-2.5 justify-center mt-12 whitespace-nowrap text-black text-opacity-50 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
					<div class="flex flex-col justify-center">
						<div
							class="justify-center items-start px-2.5 py-6 bg-white rounded-md border border-black border-solid max-md:pr-5">
							+44
						</div>
					</div>
					<div class="flex flex-col justify-center">
						<div
							class="justify-center items-start p-6 bg-white rounded-md border border-black border-solid max-md:px-5">
							1830181193
						</div>
					</div>
				</div>
			</template>
			<template v-slot:footer>
				<div class="flex gap-2.5 justify-between px-8">
					<button @click="submitPhoneNumber"
						class="flex justify-center items-center px-6 py-5 w-full bg-black text-white rounded-md">
						<font-awesome-icon :icon="['fas', 'paper-plane']" class="mr-2"></font-awesome-icon>
						Send Route to Phone
					</button>
				</div>
			</template>
		</Modal>
	</template>
	<template v-if="step === 3">
		<Modal @closeWarning="closeWarning">
			<template v-slot:header>
				<h2 class="mt-1.5 text-4xl font-medium text-center">Route Sent!</h2>
				<p class="mt-9 text-lg leading-7 text-center">
					We have sent the route to your phone. Please check your messages.
				</p>
			</template>
			<template v-slot:content>
				<div
					class="flex gap-2.5 justify-center mt-12 whitespace-nowrap text-black text-opacity-50 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
					<div class="flex flex-col justify-center">
						<div
							class="justify-center items-start px-2.5 py-6 bg-white rounded-md border border-black border-solid max-md:pr-5">
							+44
						</div>
					</div>
					<div class="flex flex-col justify-center">
						<div
							class="justify-center items-start p-6 bg-white rounded-md border border-black border-solid max-md:px-5">
							1830181193
						</div>
					</div>
				</div>
			</template>
			<template v-slot:footer>
				<div class="flex gap-2.5 justify-between px-8">
					<button @click="closeWarning"
						class="flex justify-center items-center px-6 py-5 w-full bg-black text-white rounded-md">
						<font-awesome-icon :icon="['fas', 'check']" class="mr-2"></font-awesome-icon>
						Back to Map
					</button>
				</div>
			</template>
			<template v-slot:alternative>
				<template>
				</template>
			</template>
		</Modal>
	</template>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPaperPlane, faCheck } from '@fortawesome/free-solid-svg-icons'

import Modal from './Modal.vue'
import { ref } from 'vue'
library.add(faPaperPlane, faCheck)
const emit = defineEmits(['closeWarning'])
const props = defineProps({
	coordinates: {
		type: Object,
		required: true
	}
});
const step = ref(1)

const closeWarning = () => {
	emit('closeWarning')
}

const acceptWarning = () => {
	step.value = 2
}
const submitPhoneNumber = () => {
	step.value = 3
}
</script>
