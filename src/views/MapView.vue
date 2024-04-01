<script setup>
import { ref, nextTick, onMounted, computed, watch, watchEffect } from 'vue';
import { CustomControl, GoogleMap, InfoWindow, Marker, MarkerCluster, Circle } from 'vue3-google-map';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import DroneSpotInfo from '../components/DroneSpotInfo.vue';
import Warning from '../components/Warning.vue';

// Initialize a ref for airports data
const airports = ref([]);
const droneSpots = ref([]);
const googleMapRef = ref(null);
const center = ref({ lat: 52.6369, lng: -1.1398 });
const locationFound = ref(false);
const zoomValue = ref(6);
const mapBounds = ref(null)
const selectedDroneSpot = ref(null);
const isWarningOpened = ref(false);
const warningCoordinates = ref({});

library.add(faLocationCrosshairs);

const handleOpenWarning = (coordinates) => {
  warningCoordinates.value = coordinates;
  isWarningOpened.value = true;
};

const handleCloseWarning = () => {
  isWarningOpened.value = false;
};

watchEffect(() => {
  if (selectedDroneSpot.value && googleMapRef.value && googleMapRef.value.map) {
    nextTick(() => {
      googleMapRef.value.map.setCenter(googleMapRef.value.map.getCenter());
    });
  }
});

const showDroneSpotInfo = (name) => {
  const spot = droneSpots.value.find(droneSpot => droneSpot.name === name);
  if (spot) {
    selectedDroneSpot.value = spot;

  }
  else {
    console.error(`Drone spot with name ${name} not found.`);
  }
};

function isAirportVisible(airport) {
  // Expand bounds by roughly 0.45 degrees to include airports within 50km of the map boundaries
  const bufferLat = 0.45; // Latitude buffer
  const bufferLng = 0.45; // Longitude buffer, simplification for example purposes

  if (!mapBounds.value) return false;

  const lat = airport.coordinates[0];
  const lng = airport.coordinates[1];

  const visible = (
    lat >= mapBounds.value.south - bufferLat && lat <= mapBounds.value.north + bufferLat &&
    lng >= mapBounds.value.west - bufferLng && lng <= mapBounds.value.east + bufferLng
  );
  return visible;
}


const visibleAirports = computed(
  () => {
    const visible = airports.value.filter(airport => isAirportVisible(airport));
    return visible;
  }
)

onMounted(async () => {
  const airportsData = await import('../data/uk_airports.json');
  airports.value = airportsData.default;

  const droneSpotsData = await import('../data/drone_spots.json');
  droneSpots.value = droneSpotsData.default;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        locationFound.value = true;
        center.value = { lat: position.coords.latitude, lng: position.coords.longitude };
        zoomValue.value = 8;
      },
      () => console.error("Geolocation access was denied or not available.")
    );
  }
});

const updateBounds = () => {
  const bounds = googleMapRef.value?.map?.getBounds();
  if (bounds) {
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    mapBounds.value = {
      north: ne.lat(),
      east: ne.lng(),
      south: sw.lat(),
      west: sw.lng()
    };
  }
};

watch(() => googleMapRef.value?.ready, (ready) => {
  if (!ready) return
  googleMapRef.value.map.addListener('bounds_changed', updateBounds);
  googleMapRef.value.map.addListener('zoom_changed', () => zoomValue.value = googleMapRef.value.map.getZoom());
})

const airportMarkerOptions = airport => ({
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

const droneSpotMarkerOptions = droneSpot => ({
  position: { lat: droneSpot.coordinates['lat'], lng: droneSpot.coordinates['lng'] },
  icon: {
    path: "M8.293 4.293A1 1 0 0 1 9 4h6a1 1 0 0 1 .707.293L17.414 6H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.586l1.707-1.707zM9.414 6L7.707 7.707A1 1 0 0 1 7 8H4v10h16V8h-3a1 1 0 0 1-.707-.293L14.586 6H9.414zM12 10.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-4 2a4 4 0 1 1 8 0 4 4 0 0 1-8 0z",
    scale: 2,
    fillColor: '#0047AB',
    fillOpacity: 1,
    strokeColor: '#0047AB',
    strokeWeight: 0.5,
  },
});

const circleOptions = airport => ({
  strokeColor: '#FF0000',
  strokeOpacity: 0.1,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.2,
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
  <Warning v-if="isWarningOpened" :coordinates="warningCoordinates" @closeWarning="handleCloseWarning" />

  <Navbar :linksLeft=linksLeft :button=button :linksRight=linksRight />
  <GoogleMap api-key="AIzaSyD1uFtiEOeXq5pzdiKT3QHzSFpe6L2v1lo" style="width: 100%; height: 90vh" :center="center"
    ref="googleMapRef" :zoom="zoomValue" :streetViewControl="false" :restriction="{
    latLngBounds: {
      north: 61.0, south:
        49.0, west: -10.0, east: 2.0
    }, strictBounds: true
  }
    " gestureHandling="greedy">
    <template v-if="zoomValue >= 12">
      <Marker v-for="        airport        in        visibleAirports        " :key="airport.id"
        :options="airportMarkerOptions(airport)">
        <InfoWindow :options="{ content: airport.name }" />
      </Marker>
    </template>
    <template v-if="zoomValue >= 12">
      <Circle v-for="        airport        in        visibleAirports        " :key="airport.id"
        :options="circleOptions(airport)" />
    </template>
    <Marker v-if="locationFound" :options="{ position: center, ...currentLocationMarkerOptions }" />
    <MarkerCluster>
      <Marker @click="showDroneSpotInfo(droneSpot.name)" v-for=" droneSpot  in   droneSpots  " :key="droneSpot.id"
        :options="droneSpotMarkerOptions(droneSpot)" />
    </MarkerCluster>
    <CustomControl position="RIGHT_CENTER">
      <DroneSpotInfo v-if="selectedDroneSpot" :droneSpot="selectedDroneSpot" @clear="selectedDroneSpot = null"
        @openWarning="handleOpenWarning" />
    </CustomControl>
  </GoogleMap>
</template>
