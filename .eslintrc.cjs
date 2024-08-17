module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    '@nuxtjs/eslint-config-typescript'

    // 'plugin:vue/base',
    // 'plugin:vue/essential',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:prettier/recommended',
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    'no-template-curly-in-string': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',
    'no-useless-constructor': 0,
    'space-before-function-paren': 'off'
  },
  ignorePatterns: ['files/*', 'nuxt.config.ts', 'tailwind.config.js']
  // nuxt.config.ts
  // parser: '@typescript-eslint/parser',
}
