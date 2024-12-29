module.exports = {
  env: {
    browser: true,
    jest: true,
    commonjs: true,
    es2021: true
  },
  extends: ['standard'],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {}
}
