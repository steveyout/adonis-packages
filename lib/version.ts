import path from 'node:path'
import { promises as fsp } from 'node:fs'
import hasha from 'hasha'
import { rootDir, distFile } from './utils.js'
import { build } from './modules.js'

export async function version () {
  await build()

  const pkgFile = path.resolve(rootDir, 'npm/package.json')
  const pkg = JSON.parse(await fsp.readFile(pkgFile, 'utf8'))

  const hash = hasha(await fsp.readFile(distFile, 'utf8')).substr(0, 6)

  pkg.version = pkg.version.split('-')[0] + '-' + hash

  await fsp.writeFile(pkgFile, JSON.stringify(pkg, null, 2))
}
