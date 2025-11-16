module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ms', 'zh', 'ta'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['matselamat.com'],
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
