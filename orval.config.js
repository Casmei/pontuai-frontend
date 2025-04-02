module.exports = {
    petstore: {
      output: {
        target: 'http/api.ts',
        override: {
          mutator: {
            path: './http/mutator.ts',
            name: 'customFetch'
          }
        }
      },
      input: 'http://localhost:3001/docs-yaml',
    },
  };