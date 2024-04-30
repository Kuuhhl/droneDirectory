<template>
	<div class="flex justify-center items-center py-10 bg-zinc-100">
		<div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<p class="text-center text-black text-xs mb-4">
				Quick {{ isRegistering ? 'Sign Up' : 'Login' }}
			</p>
			<!-- Social Login Buttons -->
			<div class="flex justify-center mt-4 mb-4">
				<button @click="submitForm" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2">
					<font-awesome-icon :icon="['fab', 'google']" />
					<span class="hidden">Google</span>
				</button>
				<button @click="submitForm" class="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mx-2">
					<font-awesome-icon :icon="['fab', 'apple']" />
					<span class="hidden">Apple</span>
				</button>
				<button @click="submitForm" class="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mx-2">
					<font-awesome-icon :icon="['fab', 'facebook']" />
					<span class="hidden">Facebook</span>
				</button>
			</div>
			<p class="text-center text-black text-xs mb-4">
				or by Email
			</p>
			<!-- Form -->
			<form @submit.prevent="submitForm" class="mb-4">
				<div v-if="isRegistering">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="firstName">
						First Name*
					</label>
					<input v-model="firstName" type="text" required minlength="3"
						class="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="firstName" placeholder="John">
				</div>
				<div class="mb-4">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="email">
						Email*
					</label>
					<input v-model="email" type="email" required
						class="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						id="email" placeholder="john.doe@gmail.com">
				</div>
				<div class="mb-6">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="password">
						Password*
					</label>
					<input v-model="password" type="password" required minlength="6"
						class="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						id="password" placeholder="******************">
				</div>
				<div class="flex items-center justify-center">
					<button
						class="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit">
						{{ isRegistering ? 'Sign up' : 'Login' }}
					</button>
				</div>
			</form>
			<!-- Toggle Button -->
			<div class="text-center">
				<button @click="isRegistering = !isRegistering" class="text-sm text-black hover:text-gray-700">
					{{ isRegistering ? 'Already have an account?' : 'No account yet?' }}
				</button>
			</div>
		</div>
	</div>
</template>


<script setup>
import { ref, computed } from 'vue';
import { useIsLoggedInStore } from '@/stores/isLoggedIn';
import { useRouter, useRoute } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faGoogle, faApple, faFacebook } from '@fortawesome/free-brands-svg-icons';

library.add(faGoogle, faApple, faFacebook);

const router = useRouter();
const { logIn } = useIsLoggedInStore();

const isRegistering = ref(false);
const firstName = ref('');
const email = ref('');
const password = ref('');


function submitForm() {
  logIn();

  const redirectPath = sessionStorage.getItem('redirectPath') || '/';
  
  sessionStorage.removeItem('redirectPath');

  router.push(redirectPath);
}

</script>
