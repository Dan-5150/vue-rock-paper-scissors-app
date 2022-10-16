module.exports = {
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    quotes: [
      'warn',
      'single',
      {
        // Single quotes
        avoidEscape: true, // Allow double quotes if single quote would have required escaping
        allowTemplateLiterals: true, // Template literals are also OK
      },
    ],
    indent: [
      // Indenting by 2 spaces
      'warn',
      2,
      {
        SwitchCase: 1, // Indent case statements
        ignoredNodes: ['CallExpression > ObjectExpression', 'TemplateLiteral'],
      },
    ],
    semi: ['warn', 'never'], // No semicolons
    'comma-dangle': [
      // Commas at the end of lines
      'warn',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
  },
};
