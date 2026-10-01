import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    'installation',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/standalone',
        {
          type: 'doc',
          id: 'getting-started/module',
          label: 'NgModule App (deprecated)',
        },
      ],
    },
    'configuration',
    {
      type: 'category',
      label: 'Guides',
      items: ['guides/positions', 'guides/styling', 'guides/accessibility'],
    },
    {
      type: 'category',
      label: 'Migration',
      items: ['migration/v1-to-v2'],
    },
  ],
}

export default sidebars
