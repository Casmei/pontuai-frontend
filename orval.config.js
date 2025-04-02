module.exports = {
    petstore: {
      output: {
        target: 'http/api.ts',
        client: 'fetch',
        httpClient: 'fetch',
        baseUrl: 'http://localhost:3001'
      },
      input: {
        target: './api.yaml',
      },
    },
  };