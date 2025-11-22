/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'intro',
    'getting-started',

    {
      type: 'category',
      label: 'Project Overview',
      collapsed: true,
      items: [
        'planning/vision-context-scope',
        'planning/feasibility-dependencies',
      ],
    },

    {
      type: 'category',
      label: 'Guides',
      collapsed: true,
      items: [
        'guides/api',
        'guides/usage',
      ],
    },

    {
      type: 'category',
      label: 'Requirements',
      collapsed: true,
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

    {
      type: 'category',
      label: 'Architecture',
      collapsed: true,
      items: [
        'architecture/system-overview',
        'architecture/components',
        'architecture/data-architecture',
        'architecture/api-architecture',
        'architecture/process-flows',
        'architecture/deployment',
      ],
    },

    'CONTRIBUTING',
  ],
};

module.exports = sidebars;
