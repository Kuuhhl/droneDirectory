<template>
	<div class="flex flex-col justify-center items-center px-5 gap-10 py-10 bg-zinc-100">
		<div class="bg-white shadow-md rounded p-5">
			<!-- Location Form -->
			<form @submit.prevent="submitLocation" class="flex flex-col gap-5 justify-center items-center">
				<div class="flex gap-5 justify-center items-center w-full">
					<label class="block text-gray-700 text-sm font-bold" for="location">
						Location
					</label>
					<vue-google-autocomplete id="location" ref="location" types="point_of_interest" :country="['uk']"
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						:class="{ 'border-red-500': inputLocationValid === false, 'border-green-500': inputLocationValid === true, 'border-black': inputLocationValid === null }"
						v-model="inputLocationString" :placeholder="placeholder"
						@placechanged="getAddressData"></vue-google-autocomplete>
					<button
						class="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						:class="{ 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed': !inputLocationValid }" type="submit"
						:disabled="!inputLocationValid">
						Submit
					</button>
				</div>
				<span v-if="inputLocationValid === false" class="text-red-500 text-sm">
					Please select a location that is further away from an airport.
				</span>
				<span v-if="inputLocationValid === true" class="text-green-500 text-sm">
					Location found successfully.
				</span>
			</form>
		</div>

		<!-- Map -->
		<Map v-if="inputLocation" :key="mapKey" :markCenter="true" :demo="true" :zoomValue="10" :restriction="null"
			:center="{ lat: inputLocation.latitude, lng: inputLocation.longitude }" class="pointer-events-none bg-white"
			@locationValid="setInputLocationValid" />
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
			inputLocation: null,
			inputLocationString: "",
			inputLocationValid: null,
			placeholder: "Start typing"
		}
	},
	methods: {
		submitLocation() {
			alert(`Location ${this.inputLocationString} submitted.`);
		},
		getAddressData(addressData, placeResultData) {
			this.inputLocation = addressData;
			this.inputLocationString = placeResultData.formatted_address;
			this.placeholder = placeResultData.formatted_address;
			document.getElementById('location').value = "";
		},
		setInputLocationValid(value) {
			this.inputLocationValid = value;
		}
	},
	computed: {
		mapKey() {
			return `${this.inputLocation.latitude}-${this.inputLocation.longitude}`;
		}
	}
}
</script>

