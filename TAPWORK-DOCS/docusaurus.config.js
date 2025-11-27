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
  
  markdown: {
    mermaid: true,
  },
  
  themes: ['@docusaurus/theme-mermaid'],
  
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
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
    
    navbar: {
      title: 'TAPWORK Docs',
    },
    
    footer: {
      style: 'dark',
      copyright: `© ${new Date().getFullYear()} TAPWORK-DOCS. All rights reserved.`,
    },
  },
};