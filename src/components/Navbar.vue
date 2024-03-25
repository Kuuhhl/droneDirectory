<template>
	<nav class="border-4 border-black bg-white">
		<div class="flex justify-between items-center p-3 max-md:flex-wrap">
			<!-- Left part: Logo and Navigation Links -->
			<div class="flex gap-5 items-center">
				<a class="text-2xl font-bold uppercase">DD</a>
				<a v-for="link in linksLeft" :key="link.text" :href="link.link">{{ link.text }}</a>
			</div>
			<!-- Right part: Right Links and Button -->
			<div class="flex items-center gap-5">
				<a v-for="link in linksRight" :key="link.text" :href="link.link">{{ link.text }}</a>
				<a :href="button.link" class="px-8 py-3 bg-black text-white rounded-md">{{ button.text }}</a>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	props: {
		linksLeft: {
			type: Array,
			required: true
		},
		linksRight: {
			type: Array,
			required: true
		},
		button: {
			type: Object,
			required: true
		},
	}
}
</script>
