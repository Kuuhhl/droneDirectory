<template>
	<nav class="border-4 border-black bg-white">
		<div class="flex justify-between items-center p-3 max-md:flex-wrap">
			<!-- Left part: Logo and Navigation Links -->
			<div class="flex gap-5 items-center">
				<RouterLink to="/" class="text-2xl font-bold uppercase">DD</RouterLink>
				<RouterLink v-for="link in linksLeft" :key="link.text" :to="link.link">{{ link.text }}
				</RouterLink>
			</div>
			<!-- Right part: Right Links and Button -->
			<div class="flex items-center gap-5">
				<RouterLink v-for="link in linksRight" :key="link.text" :to="link.link">{{ link.text }}</RouterLink>
				<RouterLink :to="button.link" class="px-8 py-3 bg-black text-white rounded-md">{{ button.text }}</RouterLink>
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
