// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    devtools: { enabled: true },
    devServer: {
        port: 3456,
    },
    // vite: {
        // optimizeDeps: {
        //     exclude: ["preact"],
        //     force: true,
        // },
    // },
});
