import { defineConfig } from 'vite'
import { ConfigEnv, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig(({ command }: ConfigEnv): UserConfig => {
  const proxyTarget = command === 'serve'
  ? 'http://localhost:5000'  // Development target
  : 'https://sound-atlas.onrender.com'  // Production target


  return {
  root: './', // Keep the default root for frontend
  envDir: '../', // Specify the directory where the .env file is located
  server: {
    open: true,
    proxy: {
			"/api": {
				// target: "http://localhost:5000",
        target: proxyTarget,
        changeOrigin: true,
			},
		},
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}})
