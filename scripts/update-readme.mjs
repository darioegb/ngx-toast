import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const packageJson = require('../projects/ngx-toastf/package.json')
const versionsConfig = require('../config/versions.json')

const newVersion = packageJson.version

// Prereleases (e.g. 2.0.0-next.1) are internal validation steps on the `next`
// dist-tag, not something users should pick from the compatibility table -
// only record a version once it ships on `latest`.
if (newVersion.includes('-')) {
  process.exit(0)
}

const angularVersion = versionsConfig.angularCompatibility
// Separator dash counts differ slightly between the English and Spanish
// tables (column widths follow "to" vs "a"), so match either.
const tableHeader = /(\| ngx-toastf \| Angular\s*\|\n\|[-\s]+\|[-\s]+\|\n)/

function addCompatibilityRow(filePath, angularRange) {
  if (!existsSync(filePath)) {
    return
  }
  const content = readFileSync(filePath, 'utf8')
  if (content.includes(`| ${newVersion} `) || !tableHeader.test(content)) {
    return
  }
  const updatedContent = content.replace(
    tableHeader,
    `$1| ${newVersion}             | ${angularRange} |\n`,
  )
  writeFileSync(filePath, updatedContent)
}

addCompatibilityRow('./README.md', angularVersion)
addCompatibilityRow('./docs/docs/intro.md', angularVersion)
// Keep the Spanish docs table in sync too, translating "to" -> "a".
addCompatibilityRow(
  './docs/i18n/es/docusaurus-plugin-content-docs/current/intro.md',
  angularVersion.replace(' to ', ' a '),
)
