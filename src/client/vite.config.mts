import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import autoprefixer from 'autoprefixer'

const __dirname = import.meta.dirname
// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    base: '/',
    build: {
      outDir: './build/client',
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({}), // add options if needed
        ],
      },
    },
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: 'src/client/',
          replacement: `${path.resolve(__dirname)}/`,
        },
      ],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss'],
    },
    server: {
      port: 3000,
      proxy: {
        // https://vitejs.dev/config/server-options.html
      },
    },
  }
})
