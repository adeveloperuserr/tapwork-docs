module.exports = {
  title: 'TAPWORK-DOCS',
  tagline: 'Documentation for TAPWORK project',
  url: 'https://yourwebsite.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onDuplicateRoutes: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'your-org', // Usually your GitHub org/user name.
  projectName: 'TAPWORK-DOCS', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'TAPWORK-DOCS',
      items: [
        { to: 'docs/intro', label: 'Docs', position: 'left' },
        { to: 'docs/getting-started', label: 'Getting Started', position: 'left' },
        { to: 'docs/guides/usage', label: 'Usage', position: 'left' },
        { to: 'docs/guides/api', label: 'API', position: 'left' },
        { href: 'https://github.com/your-org/TAPWORK-DOCS', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Intro', to: 'docs/intro' },
            { label: 'Getting Started', to: 'docs/getting-started' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'GitHub', href: 'https://github.com/your-org/TAPWORK-DOCS' },
          ],
        },
      ],
    },
    prism: {
      theme: require('prism-react-renderer/themes/dracula'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/your-org/TAPWORK-DOCS/edit/main/website/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/your-org/TAPWORK-DOCS/edit/main/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};