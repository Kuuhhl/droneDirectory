<div align="center">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">
  <img src="https://img.shields.io/badge/Vue.js-3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white">
</div>

<br />
<p align="center">
  <img src="public/logo.png" alt="Logo" width="120" height="120" style="border-radius:15%;">

  <h3 align="center">Drone Directory</h3>
  <p align="center">A platform for finding and sharing the perfect drone spots in the British isles.</p>
</p>

<div align="center" style="display: flex; flex-direction: column;">
  <a href="https://dronedirectory.landmann.ph/">
    <img src="https://img.shields.io/badge/Launch-00358a?style=for-the-badge&logo=google-chrome&logoColor=white">
  </a>
</div>

# Note

When developing locally or running an instance using Docker, replace the Google Maps API key to your own one (create it [here](https://developers.google.com/maps)).
The key I am using in my [production instance](https://dronedirectory.landmann.ph) is only valid on my domain.

# Deploy using Docker

1. Navigate to the cloned repo
2. Run `docker build -t dronedirectory .`
3. Run `docker run -p 80:80 -d dronedirectory`

# Running locally (for development)

1. Install bun `npm install -g bun`
2. Navigate to the cloned repo and run `bun install`
3. Run `bun run dev` to start the development server.
