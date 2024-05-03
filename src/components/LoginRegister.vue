<template>
    <div class="flex justify-center items-center py-10 bg-zinc-100">
        <div class="flex flex-col bg-white shadow-md rounded p-10 gap-5">
            <h1 v-if="props.message" class="text-center text-3xl font-bold">{{ props.message }}</h1>
            <div class="flex flex-col gap-5">
                <p class="text-center text-black text-xs">
                    Quick {{ isRegistering ? 'Sign Up' : 'Login' }}
                </p>
                <!-- Social Login Buttons -->
                <div class="flex justify-center">
                    <button @click="submitForm" :title="(isRegistering ? 'Sign Up ' : 'Log In ') + 'with Google'"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2">
                        <font-awesome-icon :icon="['fab', 'google']" />
                        <span class="hidden">Google</span>
                    </button>
                    <button @click="submitForm" :title="(isRegistering ? 'Sign Up ' : 'Log In ') + 'with Apple'"
                        class="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mx-2">
                        <font-awesome-icon :icon="['fab', 'apple']" />
                        <span class="hidden">Apple</span>
                    </button>
                    <button @click="submitForm" :title="(isRegistering ? 'Sign Up ' : 'Log In ') + 'with Facebook'"
                        class="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mx-2">
                        <font-awesome-icon :icon="['fab', 'facebook']" />
                        <span class="hidden">Facebook</span>
                    </button>
                </div>
            </div>
            <!-- Form -->
            <form @submit.prevent="submitForm" class="flex flex-col gap-5">
                <p class="text-center text-black text-xs">
                    or by Email
                </p>
                <div v-if="isRegistering">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="firstName">
                        First Name*
                    </label>
                    <input v-model="firstName" type="text" required minlength="3"
                        class="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="firstName" placeholder="John">
                </div>
                <div class="">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                        Email*
                    </label>
                    <input v-model="email" type="email" required
                        class="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email" placeholder="john.doe@gmail.com">
                </div>
                <div class="">
                    <div class="flex justify-between mb-2">
                        <label class="block text-gray-700 text-sm font-bold" for="password">
                            Password*
                        </label>
                        <button v-if="password.length > 0" @click="showPassword = !showPassword"
                            class="flex gap-1 items-center justify-center text-sm text-gray-700 font-bold opacity-50 hover:opacity-100 transition-opacity duration-200">
                            <FontAwesomeIcon :icon="showPassword ? 'eye' : 'eye-slash'" />
                            <span>
                                {{ showPassword ? 'Hide' : 'Show' }}</span>
                            <span v-if="showPassword" class="hidden">Hide Password</span>
                            <span v-else class="hidden">Show Password</span>
                        </button>
                        <!-- Forgot Password Button -->
                        <RouterLink v-if="password.length < 1 && !isRegistering" to="#"
                            class="text-sm text-black hover:text-gray-700">
                            Forgot Password?
                        </RouterLink>
                    </div>

                    <input v-model="password" :type="showPassword ? 'text' : 'password'" required
                        :minlength="isRegistering ? '6' : null"
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
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


library.add(faGoogle, faApple, faFacebook, faEye, faEyeSlash);

const props = defineProps({
    message: { type: String, default: '' }
})
const router = useRouter();
const { logIn } = useIsLoggedInStore();

const isRegistering = ref(false);
const firstName = ref('');
const email = ref('');
const password = ref('');
const showPassword = ref(false);


function submitForm() {
    logIn();

    const redirectPath = sessionStorage.getItem('redirectPath') || '/';

    sessionStorage.removeItem('redirectPath');

    router.push(redirectPath);
}

</script>
