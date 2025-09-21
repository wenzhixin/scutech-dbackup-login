import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: () => ({
    name: 'Scutech DBackup Login',
    permissions: ['storage']
  }),
  srcDir: 'src',
  outDir: 'output',
  modules: ['@wxt-dev/module-vue'],
  imports: {
    eslintrc: {
      enabled: 9
    }
  }
})
