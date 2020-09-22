module.exports = {
    /* config options here */
    async redirects() {
        return [
          {
            source: '/',
            destination: '/categories',
            permanent: true,
          },
        ]
      },
      api: {
        externalResolver: true,
      },
      devIndicators: {
        autoPrerender: false,
      },
  }