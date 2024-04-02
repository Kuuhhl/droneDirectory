<template>
	<div class="flex flex-col justify-center items-center px-5 gap-5 py-10 bg-zinc-100">
		<div class="bg-white shadow-md rounded p-5">
			<!-- Location Form -->
			<form @submit.prevent="submitLocation" class="flex gap-5 justify-center items-center">
				<label class="block text-gray-700 text-sm font-bold" for="location">
					Location
				</label>
				<vue-google-autocomplete id="location" ref="location" types="point_of_interest"
					class="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					placeholder="Start typing" @placechanged="getAddressData"></vue-google-autocomplete>
				<button
					class="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="submit">
					Submit
				</button>
			</form>
		</div>
		<!-- Map -->
		<Map v-if="inputLocation" :key="mapKey" :markCenter="true" :demo="true" :zoomValue="10" :restriction="{}"
			:center="{ lat: inputLocation.latitude, lng: inputLocation.longitude }" class="pointer-events-none bg-white  " />


	</div>
</template>
<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import Map from './Map.vue'

export default {
	components: {
		VueGoogleAutocomplete,
		Map
	},
	data() {
		return {
			inputLocation: null
		}
	},
	methods: {
		submitLocation() {
			alert('Location submitted.');
		},
		getAddressData(addressData) {
			this.inputLocation = addressData;
		},
	},
	computed: {
		mapKey() {
			return `${this.inputLocation.latitude}-${this.inputLocation.longitude}`;
		}
	}
}
</script>
