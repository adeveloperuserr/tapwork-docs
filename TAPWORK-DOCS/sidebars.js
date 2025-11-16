/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'intro',
    'getting-started',
    {
      type: 'category',
      label: 'Requirements',
      items: [
        'rf/functional-requirements',
        'rf/non-functional-requirements',
        'rf/technical-requirements',
        'rf/infrastructure',
        'rf/integration',
        'rf/phases',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: ['guides/guide-1'],
    },
  ],
};

module.exports = sidebars;
