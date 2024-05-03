<template>
    <div class="flex flex-wrap gap-10">
        <div class="flex flex-col bg-zinc-100 max-w-[600px] mx-5 shadow-md">
            <Carousel :imageSources="props.droneSpot.image_sources" @clear="emit('clear')" />
            <div class="flex flex-col p-4 w-full">
                <div class="flex justify-between text-black">
                    <div>
                        <div class="text-xl">{{ props.droneSpot.visitors }} Visits</div>
                        <div :class="{ 'mt-2 text-2xl font-medium': true, 'max-w-48': store.isLoggedIn }">{{
                props.droneSpot.name }}</div>
                    </div>
                    <div v-if="store.isLoggedIn" class="flex justify-center items-center my-auto text-base">
                        <button @click="openWarning(props.droneSpot.coordinates)"
                            class="flex items-center justify-center px-4 py-3 rounded-md border border-black border-solid hover:border-gray-400">
                            <font-awesome-icon :icon="['fas', 'route']" class="w-6" />
                            <span class="ml-2">Navigate there</span>
                        </button>
                    </div>
                </div>
                <div class="mt-4 text-base" v-for="(comment, index) in props.droneSpot.comments.slice(0, 1)"
                    :key="index">
                    {{ comment.comment }} <br />~ {{ comment.name }}
                </div>
                <div class="mt-4 text-base" v-if="props.droneSpot.comments.length === 0">No comments yet</div>
                <div v-if="showMoreComments" class="mt-4 text-base"
                    v-for="(comment, index) in props.droneSpot.comments.slice(1)" :key="index">
                    {{ comment.comment }} <br />~ {{ comment.name }}
                </div>
                <div class="flex flex-col text-center justify-center gap-2.5">
                    <button v-if="!showMoreComments && props.droneSpot.comments.length > 1"
                        @click="showMoreComments = true" class="mt-4 text-xs underline">Read all Comments</button>
                    <button v-if="showMoreComments" @click="showMoreComments = false"
                        class="mt-4 text-xs underline">Show
                        less</button>
                    <div v-if="!store.isLoggedIn">
                        <span>You've been here? </span>
                        <RouterLink to="/login?message=Log+in+to+comment" class="mt-4 text-xs underline">Log In
                        </RouterLink>
                        <span> to add a comment!</span>
                    </div>
                    <div v-if="store.isLoggedIn">
                        <RouterLink to="#" class="mt-4 text-xs underline">Add a comment</RouterLink>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row px-4 mt-16 text-base gap-2.5"
                    :class="{ 'justify-between': store.isLoggedIn, 'justify-center': !store.isLoggedIn }">
                    <button v-if="store.isLoggedIn"
                        class="px-4 py-3 bg-black rounded-md text-white flex items-center justify-center hover:bg-gray-800"
                        @click="toggleWantToGo">
                        <font-awesome-icon v-if="!props.droneSpot.want_to_go" :icon="['fas', 'heart']" class="w-6" />
                        <font-awesome-icon v-if="props.droneSpot.want_to_go" :icon="['fas', 'heart-broken']"
                            class="w-6" />
                        <span v-if="props.droneSpot.want_to_go" class="ml-2">Don't want to Go</span>
                        <span v-if="!props.droneSpot.want_to_go" class="ml-2">Want to Go</span>
                    </button>
                    <button v-if="store.isLoggedIn"
                        class="px-4 py-3 rounded-md border border-black border-solid flex items-center justify-center hover:border-gray-400"
                        @click="toggleVisited">
                        <font-awesome-icon v-if="!props.droneSpot.visited" :icon="['fas', 'check']" class="w-6" />
                        <font-awesome-icon v-if="props.droneSpot.visited" :icon="['fas', 'xmark']" class="w-6" />
                        <span v-if="!props.droneSpot.visited" class="ml-2">Mark as Visited</span>
                        <span v-if="props.droneSpot.visited" class="ml-2">Unmark as Visited</span>
                    </button>
                    <button @click="openWarning(props.droneSpot.coordinates)" v-if="!store.isLoggedIn"
                        class="flex items-center justify-center px-4 py-3 rounded-md border border-black border-solid hover:border-gray-400">
                        <font-awesome-icon :icon="['fas', 'route']" class="w-6" />
                        <span class="ml-2">Navigate me there</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { defineProps, defineEmits } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRoute, faHeart, faCheck, faHeartBroken, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useIsLoggedInStore } from '@/stores/isLoggedIn';

import Carousel from './Carousel.vue';

library.add(faRoute, faHeart, faCheck, faHeartBroken, faXmark);

const props = defineProps(['droneSpot']);
const emit = defineEmits(['clear', 'openWarning']);

const store = useIsLoggedInStore();


const showMoreComments = ref(false);

const openWarning = coordinates => {
    emit('openWarning', coordinates);
};

const toggleWantToGo = () => {
    props.droneSpot.want_to_go = !props.droneSpot.want_to_go;
};

const toggleVisited = () => {
    props.droneSpot.visited = !props.droneSpot.visited;
    props.droneSpot.visitors = props.droneSpot.visited ? props.droneSpot.visitors + 1 : props.droneSpot.visitors - 1;
};
</script>
