module.exports = {
  title: 'TAPWORK Documentation',
  tagline: 'Comprehensive documentation for TAPWORK project',
  url: 'https://yourwebsite.com', // Your website URL
  baseUrl: '/TAPWORK-DOCS/', // Base URL for your project
  onBrokenLinks: 'throw',
  onDuplicateRoutes: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'your-org', // Your GitHub org/user name
  projectName: 'TAPWORK-DOCS', // Your repo name
  themeConfig: {
    navbar: {
      title: 'TAPWORK',
      items: [
        {to: 'docs/intro', label: 'Documentation', position: 'left'},
        {to: 'docs/functional-requirements', label: 'Functional Requirements', position: 'left'},
        {to: 'docs/non-functional-requirements', label: 'Non-Functional Requirements', position: 'left'},
        {to: 'docs/technical-requirements', label: 'Technical Requirements', position: 'left'},
        {to: 'docs/infrastructure', label: 'Infrastructure', position: 'left'},
        {to: 'docs/integration', label: 'Integration', position: 'left'},
        {to: 'docs/phases', label: 'Project Phases', position: 'left'},
        {to: 'https://github.com/your-org/TAPWORK-DOCS', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Functional Requirements', to: 'docs/functional-requirements'},
            {label: 'Non-Functional Requirements', to: 'docs/non-functional-requirements'},
            {label: 'Technical Requirements', to: 'docs/technical-requirements'},
            {label: 'Infrastructure', to: 'docs/infrastructure'},
            {label: 'Integration', to: 'docs/integration'},
            {label: 'Project Phases', to: 'docs/phases'},
          ],
        },
      ],
    },
    prism: {
      theme: require('prism-react-renderer/themes/dracula'),
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/your-org/TAPWORK-DOCS/edit/main/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/your-org/TAPWORK-DOCS/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};