// Volar configuration for better Vue TypeScript support
module.exports = {
  // Enable take over mode for better performance
  vueCompilerOptions: {
    target: 3.3,
    strictTemplates: true,
    experimentalRuntimeMode: 'runtime-dom'
  },
  // TypeScript configuration
  typescript: {
    // Use project's TypeScript version
    typescript: require('typescript')
  },
  // Plugin configuration
  plugins: [
    // Enable Vue language features
    '@vue/language-core'
  ]
};