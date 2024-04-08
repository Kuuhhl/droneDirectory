<script setup>
import Map from './Map.vue'
</script>

<template>
	<div class="py-10 px-10 max-md:py-5 pl-20 bg-zinc-100 max-md:px-5">
		<div class="flex gap-10 max-md:flex-col max-md:gap-5">
			<div class="flex flex-col w-[41%] max-md:ml-0 max-md:w-full">
				<div class="flex flex-col self-stretch my-auto max-md:mt-5 max-md:max-w-full">
					<div class="text-2xl font-bold leading-8 text-black max-md:max-w-full">
						Explore the British Isles
					</div>
					<div class="mt-12 text-xl leading-7 text-black max-md:mt-5 max-md:max-w-full">
						Our Community finds the coolest places for your drone to grab
						amazing shots while you're here!
					</div>
					<div class="flex gap-5 mt-12 text-lg text-center max-md:flex-wrap max-md:mt-5">
						<div class="flex flex-col justify-center text-white">
							<RouterLink to="/map" class="justify-center px-14 py-6 bg-black rounded-md max-md:px-5">
								Launch Map
							</RouterLink>
						</div>
						<div class="flex flex-col justify-center text-black leading-[135%]">
							<RouterLink to="/gallery"
								class="justify-center px-12 py-6 rounded-md border border-black border-solid max-md:px-5">
								View Gallery
							</RouterLink>
						</div>
					</div>
				</div>
			</div>

			<div class="flex flex-col ml-5 w-[59%] max-md:ml-0 max-md:w-full">
				<RouterLink to="/map" class="relative group">
					<div class="max-w-full">
						<Map class="pointer-events-none grayscale brightness-50" :demo="true" />
					</div>
					<div
						class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex justify-center items-center opacity-90 group-hover:opacity-100 transition-opacity duration-300">
						<button class="z-50 text-white py-6 rounded-md px-12 border border-white border-solid max-md:px-5">
							Launch
							Map
						</button>
					</div>
				</RouterLink>
			</div>

		</div>
	</div>
</template>
