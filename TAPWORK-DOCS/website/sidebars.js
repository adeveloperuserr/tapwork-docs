module.exports = {
  docs: [
    'intro',
    'getting-started',
    {
      type: 'category',
      label: 'Requerimientos',
      collapsible: true,
      items: [
        'rf/intro',
        'rf/functional-requirements',
        'rf/non-functional-requirements',
        'rf/technical-requirements',
        'rf/infrastructure',
        'rf/integration',
        'rf/phases'
      ],
    },
    {
      type: 'category',
      label: 'Guías',
      items: [
        'guides/usage',
        'guides/api'
      ]
    }
  ],
};