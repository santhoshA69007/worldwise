import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Existing configuration (e.g., https settings)
    port: 3000, // Add the port configuration here
  }

  
 
  
})
