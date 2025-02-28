module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked', // stricter type checking
    'plugin:@typescript-eslint/stylistic-type-checked',  // style rules for TypeScript
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',  // Add Prettier integration
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off', // Since you're using TypeScript
     'react/react-in-jsx-scope': 'off',
     '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
     '@typescript-eslint/explicit-function-return-type': 'off',
     '@typescript-eslint/explicit-module-boundary-types': 'off',
     '@typescript-eslint/no-explicit-any': 'warn',
     'no-console': ['warn', { allow: ['warn', 'error'] }],
     "import/order": [
         "error",
         {
           "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
           "newlines-between": "always",
           "alphabetize": { "order": "asc" }
         }
       ]
  },
}
