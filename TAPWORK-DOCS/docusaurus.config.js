/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: 'TapWork Docs',
  url: 'https://adeveloperuserr.github.io',
  baseUrl: '/tapwork-docs/',
  organizationName: 'adeveloperuserr',
  projectName: 'tapwork-docs',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/styles/main.css'),
        },
      },
    ],
  ],
  themeConfig: {
     navbar: {
      title: 'TAPWORK Docs',
      items: [
        { to: '/intro', label: 'Introduction', position: 'left' },
        { to: '/getting-started', label: 'Getting Started', position: 'left' },
        { to: '/guides/api', label: 'API', position: 'left' },
        { to: '/guides/usage', label: 'Usage Guide', position: 'left' },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `© ${new Date().getFullYear()} TAPWORK-DOCS. All rights reserved.`,
    },
  },
};
