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
          path: '../docs',
          routeBasePath: '/',            // servir las docs en la raíz del sitio
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          // si no tienes custom css, puedes quitar esta línea
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};