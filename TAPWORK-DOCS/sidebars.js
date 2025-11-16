/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'intro',
    'getting-started',

    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/api',
        'guides/usage',
      ],
    },

    {
      type: 'category',
      label: 'Requirements',
      collapsed: false,
      items: [
        'rf/intro',
        'rf/functional-requirements',
        'rf/non-functional-requirements',
        'rf/technical-requirements',
        'rf/infrastructure',
        'rf/integration',
        'rf/phases',
      ],
    },

    'CONTRIBUTING',
  ],
};

module.exports = sidebars;
