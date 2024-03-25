import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), vue()],
  site: "https://kuuhhl.github.io",
  base: "droneDirectory",
});