import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default [
  {
    ignores: [
      'dist/**/*'
    ]
  },
  {
    files: ['**/*.js', '**/*.vue'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        $: true,
        chrome: true
      }
    },
    rules: js.configs.recommended.rules
  },
  ...pluginVue.configs['flat/recommended']
]
