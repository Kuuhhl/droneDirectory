<template>
	<footer class="bg-zinc-100 mt-20">
		<div class="flex flex-col justify-center items-center px-5 pt-10 pb-5">
			<!-- About Section -->
			<div class="text-center">
				<div class="text-2xl text-black mb-2">About Us</div>
				<p class="text-black text-lg">
					Capturing the world from above. Dedicated to providing stunning drone imagery.
				</p>
			</div>
			<!-- Contact Info -->
			<div class="mt-10 text-center">
				<div class="text-xl text-black mb-1">Contact Us</div>
				<p class="text-black">Email: contact@droneimagery.com</p>
				<p class="text-black">Phone: (123) 456-7890</p>
			</div>
			<!-- Social Media Links -->
			<div class="flex gap-5 mt-5">
				<a href="#" class="text-black text-lg">
					<FontAwesomeIcon icon={facebook} />
				</a>
				<a href="#" class="text-black text-lg">
					<FontAwesomeIcon icon={instagram} />
				</a>
				<a href="#" class="text-black text-lg">
					<FontAwesomeIcon icon={twitter} />
				</a>
			</div>
		</div>
	</footer>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

</script>
