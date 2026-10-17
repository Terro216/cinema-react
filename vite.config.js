import { defineConfig, transformWithEsbuild } from 'vite'

export default defineConfig({
  plugins: [{
    name: 'original-jsx-files',
    async transform(code, id) {
      if (id.includes('/src/') && id.endsWith('.js')) {
        return transformWithEsbuild(code, id, { loader: 'jsx', jsx: 'automatic' })
      }
    },
  }],
  css: { preprocessorOptions: { scss: { silenceDeprecations: ['import', 'global-builtin', 'legacy-js-api'] } } },
  build: { target: 'es2020' },
  server: { host: '127.0.0.1' },
  preview: { host: '127.0.0.1' },
})
