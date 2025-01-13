import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  root: './', // Keep the default root for frontend
  envDir: '../', // Specify the directory where the .env file is located
  server: {
    open: true,
    proxy: {
			"/api": {
				target: "http://localhost:5000",
			},
		},
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
