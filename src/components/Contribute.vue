<template>
    <div class="flex flex-col justify-center items-center px-5 gap-10 py-10 bg-zinc-100">
        <div class="bg-white shadow-md rounded p-10 max-w-xs sm:max-w-sm md:max-w-xl xl:max-w-2xl">
            <!-- Location Form -->
            <form @submit.prevent="submitLocation" class="flex flex-col gap-5 justify-center items-center">
                <!-- step 1 -->
                <div v-if="step === 1" class="flex flex-col gap-5 justify-center items-center w-full">
                    <div class="flex flex-col w-full">
                        <h1 class="text-center text-3xl font-bold mb-4">Contribute a location</h1>
                        <p class="text-center text-lg text-gray-700">Share your favourite spot!
                        </p>
                    </div>
                    <div class="flex flex-col w-full">
                        <label for="location" class="block text-gray-700 text-sm font-bold">
                            Location
                        </label>
                        <div class="flex gap-5 justify-center items-center">
                            <vue-google-autocomplete id="location" ref="location" types="point_of_interest"
                                :country="['uk']"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                :class="{ 'border-red-500': inputLocationValid === false, 'border-green-500': inputLocationValid === true, 'border-black': inputLocationValid === null }"
                                v-model="inputLocationString" :placeholder="placeholder"
                                @placechanged="getAddressData"></vue-google-autocomplete>
                            <button
                                class="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hidden md:block"
                                :class="{ 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed': !inputLocationValid }"
                                :disabled="!inputLocationValid" @click="step++">
                                Continue
                            </button>
                        </div>
                    </div>
                    <div class="w-full flex flex-col items-start gap-2">
                        <span v-if="inputLocationValid === false" class="text-red-500 text-sm">
                            Please select a location that is further away from an airport.
                        </span>
                        <span v-if="inputLocationValid === true" class="text-green-500 text-sm">
                            Location found successfully.
                        </span>
                        <button
                            class="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline md:hidden"
                            :class="{ 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed': !inputLocationValid }"
                            :disabled="!inputLocationValid" @click="step++">
                            Continue
                        </button>
                    </div>

                </div>
                <!-- step 2 -->
                <div v-if="step === 2" class="flex flex-col gap-5 justify-center items-center w-full">
                    <div class="flex flex-col w-full gap-5">
                        <div>
                            <h1 class="text-center text-3xl font-bold mb-4">Time for some details</h1>
                            <p class="text-center text-lg text-gray-700">High-quality photos can attract more drone
                                enthusiasts to your amazing location. Make it shine!</p>
                        </div>

                        <div>
                            <label for="locationName" class="block text-gray-700 text-sm font-bold">
                                Location Name*
                            </label>
                            <input id="locationName" v-model="locationName" type="text"
                                :placeholder="inputLocationString.split(',')[0]" required
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                    </div>

                    <div class="flex flex-col w-full">
                        <label for="description" class="block text-gray-700 text-sm font-bold">
                            Description (optional)
                        </label>
                        <textarea id="description" v-model="description"
                            placeholder="This place is a bit rocky, so you should bring..." rows="3"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                    </div>
                    <div class="flex flex-col w-full">
                        <label for="fileUpload" class="block text-gray-700 text-sm font-bold">
                            Upload Photo(s)*
                        </label>
                        <div
                            class="flex flex-col justify-between items-center text-gray-500 hover:text-gray-600 transition duration-100 ease-in-out text-center">
                            <div id="fileUpload" @click="openFileDialog" @dragover.prevent="dragover"
                                @dragleave="dragleave" @drop.prevent="drop"
                                class="file-upload w-full text-sm border rounded leading-tight focus:outline-none focus:shadow-outline flex items-center justify-center cursor-pointer p-5"
                                :class="{ 'border-red-500': submitted && photos.length === 0 }">
                                <input ref="fileInput" type="file" @change="handleFileUpload" multiple hidden />
                                <div class="py-2 flex flex-col items-center justify-center gap-4">
                                    <FontAwesomeIcon icon="plus" class="text-2xl" />
                                    <span>Drag and drop images here or <br /><span class="underline">click</span> to
                                        select{{ photos.length > 0 ? " more" : "" }}.</span>
                                </div>
                            </div>
                            <div class="w-full">
                                <p v-if="submitted && photos.length === 0" class="text-red-500 text-sm mt-2 text-start">
                                    Please upload at least one photo.
                                </p>
                            </div>
                            <draggable class="flex flex-wrap gap-2 mt-2" :list="photos">
                                <div v-for="(src, index) in photos" :key="index" class="w-24 h-24 relative">
                                    <button @click.stop="removeImage(index)"
                                        class="absolute top-0 right-0 text-white p-1">
                                        <FontAwesomeIcon icon="times" title="Remove Image" />
                                    </button>
                                    <img :src="src" class="w-full h-full object-cover cursor-grab" />
                                </div>
                            </draggable>
                        </div>
                    </div>

                    <div class="flex flex-col w-full">
                        <label class="flex items-center">
                            <input type="checkbox" v-model="checkedRules" required
                                class="form-checkbox h-5 w-5 text-gray-600">
                            <span class="ml-2 text-gray-700 text-sm">I confirm the location is legal to fly drones in
                                according
                                to <a class="underline" href="https://www.caa.co.uk/uk-regulations/" target="_blank">CAA
                                    regulations</a>.*</span>
                        </label>
                    </div>
                    <div class="flex gap-2 justify-center">
                        <button class="px-2 rounded-md border border-black border-solid  hover:border-gray-400"
                            @click="step--" type="submit">
                            Go Back
                        </button>
                        <button class="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded" type="submit">
                            Submit
                        </button>
                    </div>
                </div>
                <!-- step 3 -->
                <div v-if="step === 3" class="flex flex-col gap-5 justify-center items-center w-full">
                    <div class="flex flex-col w-full">
                        <h1 class="text-center text-3xl font-bold mb-4">Submitted successfully</h1>
                        <p class="text-center text-lg text-gray-700">Thank you for contributing to our community!</p>
                    </div>

                    <div class="flex gap-2 justify-center">
                        <RouterLink class="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded" to="/">
                            Go Back To Home
                        </RouterLink>
                    </div>
                </div>

            </form>
        </div>

        <!-- Map -->
        <Map v-if="inputLocationLatitude && inputLocationLongitude" :key="mapKey" :markCenter="true" :demo="true"
            :zoomValue="10" :restriction="null" :center="{ lat: inputLocationLatitude, lng: inputLocationLongitude }"
            class="pointer-events-none bg-white" @locationValid="setInputLocationValid" />
    </div>
</template>


<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import Map from './Map.vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faTimes, faPlus);


export default {
    components: {
        VueGoogleAutocomplete,
        Map,
        draggable: VueDraggableNext
        , FontAwesomeIcon
    },
    created() {
        if (this.$route.query.data) {
            const data = JSON.parse(atob(this.$route.query.data));
            this.step = data.step;
            this.inputLocationString = data.inputLocationString;
            this.placeholder = data.inputLocationString.split(",")[0];
            this.locationName = data.inputLocationString.split(",")[0];
            this.inputLocationLatitude = data.inputLocationLatitude;
            this.inputLocationLongitude = data.inputLocationLongitude;
        }
    },
    data() {
        return {
            step: 1,
            inputLocation: null,
            inputLocationString: "",
            inputLocationLatitude: 0,
            inputLocationLongitude: 0,
            inputLocationValid: null,
            placeholder: 'Start typing',
            locationName: "",
            description: "",
            photos: [],
            checkedRules: false,
            submitted: false
        }
    },
    watch: {
        step(newStep) {
            this.updateURL()
        },
        inputLocationString(newVal) {
            this.placeholder = newVal.split(",")[0];
            this.updateURL()
        }
        ,
        inputLocationLatitude(newVal) {
            this.updateURL()
        },
        inputLocationLongitude(newVal) {
            this.updateURL()
        }

    },

    methods: {
        updateURL() {
            const data = {
                step: this.step,
                inputLocationLatitude: this.inputLocationLatitude,
                inputLocationLongitude: this.inputLocationLongitude,
                inputLocationString: this.inputLocationString,
            };
            const query = btoa(JSON.stringify(data));
            this.$router.push({ name: "contribute", query: { data: query } });
        },
        submitLocation() {
            if (this.photos.length < 1) {
                this.submitted = true;
                return;
            }
            this.step++;
        },
        getAddressData(addressData, placeResultData) {
            this.inputLocationLatitude = addressData.latitude;
            this.inputLocationLongitude = addressData.longitude;
            this.inputLocationString = placeResultData.formatted_address;
            this.locationName = this.inputLocationString.split(",")[0];
            document.getElementById('location').value = "";
        },
        setInputLocationValid(value) {
            this.inputLocationValid = value;
        },
        handleFileUpload(event) {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.photos.push(e.target.result);
                };
                reader.readAsDataURL(files[i]);
            }
        },
        removeImage(index) {
            this.photos.splice(index, 1);
        },
        submitForm() {
            alert('Form submitted')
        },
        dragover() {
            document.getElementById('fileUpload').classList.add('active');
        },
        dragleave() {
            document.getElementById('fileUpload').classList.remove('active');
        },
        drop(e) {
            document.getElementById('fileUpload').classList.remove('active');

            const files = e.dataTransfer.files;
            this.handleFileUpload({ target: { files } });
        },
        openFileDialog() {
            this.$refs.fileInput.click();
        }

    },
    computed: {
        mapKey() {
            return `${this.inputLocationLatitude}-${this.inputLocationLongitude}`;
        }
    }
}
</script>
