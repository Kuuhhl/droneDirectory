<template>
	<template v-if="step === 1">
		<Modal @closeWarning="closeWarning">
			<template v-slot:header>
				<div class="flex flex-col w-full">
					<h1 class="text-center text-3xl font-bold mb-4">Before you depart</h1>
					<p class="text-center text-lg text-gray-700">Before we proceed to navigation, please accept the following
						guidelines: </p>
				</div>
			</template>
			<template v-slot:content>
				<div class="flex flex-col md:flex-row justify-between gap-8 md:gap-16">
					<div class="guideline flex flex-col items-center text-center md:items-start md:text-left">
						<img src="/images/warnings/privacy.webp" alt="Image of a drone invading a person's privacy"
							class="aspect-square h-48 md:h-64 rounded-lg mb-4" />
						<div class="w-64">
							<h3 class="text-2xl font-semibold mb-2">Respect other's privacy</h3>
							<p class="text-sm text-gray-600 leading-6">
								We're sure you wouldn't like a drone buzzing outside your apartment window - keep it that way for others
								as well.
							</p>
						</div>
					</div>

					<div class="guideline flex flex-col items-center text-center md:items-start md:text-left">
						<img src="/images/warnings/airports.webp" alt="Image of a drone flying over an airport."
							class="aspect-square h-48 md:h-64 rounded-lg mb-4" />
						<div class="w-64">
							<h3 class="text-2xl font-semibold mb-2">Do not fly over restricted areas</h3>
							<p class="text-sm text-gray-600 leading-6">
								This especially includes airports, airfields, military bases, and other restricted areas.
							</p>
						</div>
					</div>

					<div class="guideline flex flex-col items-center text-center md:items-start md:text-left">
						<img src="/images/warnings/caa.png" alt="Civial Aviation Authority's Logo"
							class="aspect-square h-48 md:h-64 rounded-lg mb-4" />
						<div class="w-64">
							<h3 class="text-2xl font-semibold mb-2">Follow the CAA Regulations</h3>
							<p class="text-sm text-gray-600 leading-6">
								In order to legally fly drones in the UK, you have to follow the CAA's regulations. This can include
								applying for insurance and / or license before flying.
								<br />
								<a href="https://www.caa.co.uk/uk-regulations/" class="text-black underline">View
									Regulations</a>
							</p>
						</div>
					</div>
				</div>
			</template>
			<template v-slot:footer>
				<div class="flex flex-col md:flex-row gap-2.5 justify-between px-8">
					<button @click="acceptWarning"
						class="flex justify-center items-center px-6 py-5 w-full bg-black text-white rounded-md hover:bg-gray-800">
						Accept & Send Route to Phone
					</button>
					<a :href="`https://www.google.com/maps/dir/?api=1&destination=${encodeURI(props.coordinates['lat'] + ',' + props.coordinates['lng'])}&travelmode=driving`"
						class="flex justify-center items-center px-16 py-5 w-full text-black rounded-md border border-black hover:border-gray-400">
						Accept & View Route
					</a>
				</div>
			</template>
		</Modal>
	</template>
	<template v-if="step === 2">
		<Modal @closeWarning="closeWarning">
			<template v-slot:header>
				<div class="flex flex-col w-full">
					<h1 class="text-center text-3xl font-bold mb-4">Ready to fly?</h1>
					<p class="text-center text-lg text-gray-700">We will send the route to your phone via SMS.
						<br />
						Please make sure
						you have your phone with you.
					</p>
				</div>
			</template>

			<template v-slot:content>
				<div class="flex justify-center gap-1">
					<input type="text" v-model="countryCode" placeholder="+44" maxlength="4" required
						class="px-4 py-3 bg-white rounded-md border border-black border-solid focus:outline-none max-md:px-5 w-20">
					<input type="tel" v-model="phoneNumber" placeholder="Enter your phone number" pattern="\[0-9\]+" required
						class="px-4 py-3 bg-white rounded-md border border-black border-solid focus:outline-none max-md:px-5" />

				</div>
				<p v-if="phoneNumberError" class="text-red-500 mt-2 text-center">
					Please enter a valid phone number.
				</p>


			</template>


			<template v-slot:footer>
				<div class="flex gap-2.5 justify-between px-8">
					<button @click="submitPhoneNumber"
						class="flex justify-center items-center px-6 py-5 w-full bg-black text-white rounded-md hover:bg-gray-800">
						<FontAwesomeIcon :icon="['fas', 'paper-plane']" class="mr-2" />
						Send Route to Phone
					</button>
				</div>
			</template>
		</Modal>
	</template>
	<template v-if="step === 3">
		<Modal @closeWarning="closeWarning">
			<template v-slot:header>
				<div class="flex flex-col w-full">
					<h1 class="text-center text-3xl font-bold mb-4">Great views await you!</h1>
					<p class="text-center text-lg text-gray-700">We have sent the route to your phone. Please check your messages.
					</p>
				</div>
			</template>

			<template v-slot:content>
				<template>
				</template>
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
import { ref, computed } from 'vue'
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
	if (isPhoneNumberValid.value) {
		phoneNumberError.value = false
		step.value = 3
	} else {
		phoneNumberError.value = true
	}
}

const phoneNumber = ref('')
const countryCode = ref('+44')
const phoneNumberError = ref(false)
const isPhoneNumberValid = computed(() => {
	const prefixRegex = /^\+\d+$/
	const phoneNumberRegex = /^\d+$/
	return phoneNumberRegex.test(phoneNumber.value) && prefixRegex.test(countryCode.value)
})

</script>
