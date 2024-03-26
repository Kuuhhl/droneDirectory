<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { GoogleMap, Marker, Circle } from 'vue3-google-map';

// Initialize a ref for airports data
const airports = ref([]);
const googleMapRef = ref(null);
const center = ref({ lat: 52.6369, lng: -1.1398 });
const locationFound = ref(false);
const zoomValue = ref(6);
const visibleAirports = ref([]);

onMounted(async () => {
  const data = await import('../data/uk_airports.json');
  airports.value = data.default;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        center.value = { lat: position.coords.latitude, lng: position.coords.longitude };
        locationFound.value = true;
        zoomValue.value = 8;
      },
      () => console.error("Geolocation access was denied or not available.")
    );
  }
});
watch(googleMapRef, async (newVal, oldVal) => {
  // Ensure the map is loaded before trying to access bounds
  if (newVal && newVal !== oldVal) {
    await nextTick(); // Wait for the next DOM update
    updateVisibleAirports();
  }
}, { immediate: true });

const updateVisibleAirports = () => {
  const bounds = googleMapRef.value?.getBounds();
  if (bounds) {
    visibleAirports.value = airports.value.filter(airport => {
      const { lat, lng } = airport.coordinates;
      return bounds.contains({ lat, lng });
    });
  }
};
const markerOptions = airport => ({
  title: `${airport.name} - No Fly Zone`,
  position: { lat: airport.coordinates[0], lng: airport.coordinates[1] },
  icon: {
    path: "M 341.68032,435.72254 C 341.20649,434.97913 318.35103,391.06654 290.89042,338.13903 C 263.42982,285.2115 240.5353,241.47293 240.01371,240.9422 C 239.40475,240.3226 224.87159,254.16767 199.40456,279.62871 C 162.19988,316.82465 159.74472,319.4955 159.75908,322.75711 C 159.76748,324.66943 161.29656,338.73427 163.157,354.01232 L 166.53962,381.79058 L 150.46254,397.93832 L 134.38546,414.08604 L 115.72849,378.57029 L 97.071547,343.05455 L 61.95992,324.72348 C 42.648539,314.6414 26.838515,306.16398 26.826552,305.88476 C 26.814586,305.60554 33.905134,298.28717 42.583321,289.6217 L 58.361846,273.86631 L 89.312123,277.62282 L 120.2624,281.37935 L 160.35096,241.3056 C 191.61286,210.05523 200.13431,201.01341 199.05345,200.23976 C 198.29113,199.69412 153.64225,176.03495 99.833713,147.66383 L 2,96.079986 L 22.204074,75.875926 L 42.408158,55.671865 L 163.17031,87.675347 L 283.93249,119.67882 L 339.1518,64.569475 C 377.85615,25.942215 395.70632,8.7904897 398.8355,7.2211495 C 401.71737,5.7758285 405.77566,4.8204267 410.28434,4.525862 C 419.1547,3.9463348 425.75568,6.5390314 431.62708,12.908736 C 437.08313,18.827845 438.85127,23.292794 438.82691,31.089953 C 438.7893,43.133211 439.47031,42.318501 377.46076,104.50395 L 321.56672,160.55652 L 345.71016,253.81214 C 358.98905,305.10272 372.74731,358.28843 376.28406,372.00258 L 382.71451,396.9374 L 362.62817,417.00581 C 347.70391,431.91672 342.32043,436.72684 341.68032,435.72254 z ",
    scale: 0.03,
    fillColor: '#000000',
    fillOpacity: 1,
    strokeColor: '#000000',
    strokeWeight: 0.5
  }
});

const circleOptions = airport => ({
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  center: { lat: airport.coordinates[0], lng: airport.coordinates[1] },
  radius: 5000, // 5km radius
});

const currentLocationMarkerOptions = {
  icon: {
    path: 'M -1,0 A 1,1 0 0 0 1,0 A 1,1 0 0 0 -1,0',
    scale: 10,
    fillColor: '#5384ED',
    fillOpacity: 1,
    strokeColor: '#ffffff',
    strokeWeight: 2
  }
};
</script>

<template>
  <GoogleMap api-key="AIzaSyD1uFtiEOeXq5pzdiKT3QHzSFpe6L2v1lo" style="width: 100%; height: 80vh" :center="center"
    :ref="googleMapRef" :zoom="zoomValue" :options="{
    streetViewControl: false,
    restriction: {
      latLngBounds: { north: 61.0, south: 49.0, west: -10.0, east: 2.0 },
      strictBounds: true
    }
  }
    ">
    <Marker v-for="airport in visibleAirports" :key="airport.id" :options="markerOptions(airport)" />
    <Circle v-for="airport in visibleAirports" :key="airport.id" :options="circleOptions(airport)" />
    <Marker v-if="locationFound" :options="{ position: center, ...currentLocationMarkerOptions }" />
  </GoogleMap>
</template>
