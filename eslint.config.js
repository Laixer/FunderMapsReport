import js from '@eslint/js'
import ts from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import globals from 'globals'

export default ts.config(
  { ignores: ['dist/'] },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...vue.configs['flat/essential'],
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-empty-object-type': 'error',
      'no-prototype-builtins': 'error',
      'no-case-declarations': 'error',
      'no-self-assign': 'error',
      'vue/require-v-for-key': 'error',
      'vue/no-mutating-props': 'error',
      'vue/require-toggle-inside-transition': 'error',
      'vue/no-parsing-error': 'error',
    },
  },
)
