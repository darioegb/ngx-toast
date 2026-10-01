import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const config: Config = {
  title: 'ngx-toastf',
  tagline:
    'A lightweight, standalone-first toast notification library for Angular',
  url: 'https://darioegb.github.io',
  baseUrl: '/ngx-toast/',
  organizationName: 'darioegb',
  projectName: 'ngx-toast',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    localeConfigs: {
      en: { label: 'English', direction: 'ltr' },
      es: { label: 'Español', direction: 'ltr' },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/darioegb/ngx-toast/tree/main/docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
    },
    navbar: {
      title: 'ngx-toastf',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://www.npmjs.com/package/ngx-toastf',
          label: 'npm',
          position: 'right',
        },
        {
          href: 'https://github.com/darioegb/ngx-toast',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Introduction', to: '/' },
            { label: 'Installation', to: '/installation' },
            { label: 'Configuration', to: '/configuration' },
          ],
        },
        {
          title: 'Guides',
          items: [
            { label: 'Positions', to: '/guides/positions' },
            { label: 'Styling', to: '/guides/styling' },
          ],
        },
        {
          title: 'Links',
          items: [
            {
              label: 'npm package',
              href: 'https://www.npmjs.com/package/ngx-toastf',
            },
            { label: 'GitHub', href: 'https://github.com/darioegb/ngx-toast' },
            {
              label: 'Stackblitz Example',
              href: 'https://stackblitz.com/edit/ngx-toastf-example',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Dario Gonzalez. Released under the MIT License.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['typescript', 'bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
}

export default config
