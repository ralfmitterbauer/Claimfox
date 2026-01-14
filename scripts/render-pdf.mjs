import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import puppeteer from 'puppeteer'

const distDir = path.resolve('dist')
const outputPdf = path.join(distDir, 'cv_rm.pdf')
const outputPng = path.join(distDir, 'preview.png')
const cvPath = path.resolve('cv.html')

await fs.mkdir(distDir, { recursive: true })

const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()

await page.emulateMediaType('print')
await page.goto(pathToFileURL(cvPath).href, { waitUntil: ['load', 'networkidle0'] })

await page.pdf({
  path: outputPdf,
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: '0cm', right: '0cm', bottom: '0cm', left: '0cm' }
})

await page.screenshot({ path: outputPng, fullPage: true })

await browser.close()
