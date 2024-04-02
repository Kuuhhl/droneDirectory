<template>
	<div class="flex justify-center items-center py-20 bg-zinc-100">
		<div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<p class="text-center text-black text-xs mb-4">
				quick {{ isRegistering ? 'sign up' : 'login' }}
			</p>
			<!-- Social Login Buttons -->
			<div class="flex justify-center mt-4 mb-4">
				<button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2">
					<font-awesome-icon :icon="['fab', 'google']" />
					<span class="hidden">Google</span>
				</button>
				<button class="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mx-2">
					<font-awesome-icon :icon="['fab', 'apple']" />
					<span class="hidden">Apple</span>
				</button>
				<button class="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mx-2">
					<font-awesome-icon :icon="['fab', 'facebook']" />
					<span class="hidden">Facebook</span>
				</button>
			</div>
			<p class="text-center text-black text-xs mb-4">
				or by email
			</p>
			<!-- Form -->
			<form @submit.prevent="validateForm" class="mb-4">
				<div v-if="isRegistering">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="username">
						Username
					</label>
					<input v-model="username" type="text" required minlength="3"
						class="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="username" placeholder="Username">
				</div>
				<div class="mb-4">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="email">
						Email
					</label>
					<input v-model="email" type="email" required
						class="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						id="email" placeholder="Email">
				</div>
				<div class="mb-6">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="password">
						Password
					</label>
					<input v-model="password" type="password" required minlength="6"
						class="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						id="password" placeholder="******************">
				</div>
				<div class="flex items-center justify-between">
					<button
						class="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit">
						{{ isRegistering ? 'Sign up' : 'Login' }}
					</button>
				</div>
			</form>
			<!-- Toggle Button -->
			<div>
				<button @click="isRegistering = !isRegistering" class="text-sm text-black hover:text-gray-700">
					{{ isRegistering ? 'Already have an account?' : 'No account yet?' }}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isRegistering: false, // false for login, true for register
			username: '',
			email: '',
			password: '',
		}
	},
	methods: {
		validateForm() {
			// This is where form submission logic would go
			alert(`Submitting form for ${this.isRegistering ? 'registration' : 'login'}.`);
		}
	}
}
</script>
<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faGoogle, faApple, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faGoogle, faApple, faFacebook);
</script>
