import fs from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import puppeteer from 'puppeteer'

const distDir = path.resolve('dist')
const pdfDir = path.join(distDir, 'pdfs')
const port = Number(process.env.PDF_RENDER_PORT || 4173)

async function fileExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

function getContentType(filePath) {
  const ext = path.extname(filePath)
  switch (ext) {
    case '.html':
      return 'text/html; charset=utf-8'
    case '.js':
      return 'application/javascript; charset=utf-8'
    case '.css':
      return 'text/css; charset=utf-8'
    case '.json':
      return 'application/json; charset=utf-8'
    case '.png':
      return 'image/png'
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.svg':
      return 'image/svg+xml'
    case '.woff':
      return 'font/woff'
    case '.woff2':
      return 'font/woff2'
    default:
      return 'application/octet-stream'
  }
}

async function startServer() {
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url || '/', `http://127.0.0.1:${port}`)
    const pathname = url.pathname === '/' ? '/index.html' : url.pathname
    const filePath = path.join(distDir, pathname)

    if (await fileExists(filePath)) {
      const data = await fs.readFile(filePath)
      res.writeHead(200, { 'Content-Type': getContentType(filePath) })
      res.end(data)
      return
    }

    const fallback = path.join(distDir, 'index.html')
    const data = await fs.readFile(fallback)
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(data)
  })

  await new Promise((resolve) => server.listen(port, resolve))
  return server
}

async function renderPdf(lang) {
  const targetUrl = `http://127.0.0.1:${port}/business-model-antares?print=1&lang=${lang}`
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--disable-crashpad', '--disable-crash-reporter', '--noerrdialogs']
  })

  try {
    const page = await browser.newPage()
    await page.emulateMediaType('print')
    await page.goto(targetUrl, { waitUntil: ['load', 'networkidle0'] })
    await page.evaluate(() => document.fonts?.ready).catch(() => {})

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '0cm', right: '0cm', bottom: '0cm', left: '0cm' }
    })

    const outputPath = path.join(
      pdfDir,
      `insurfox-antares-business-model-${lang}.pdf`
    )
    if (!pdfBuffer || pdfBuffer.length === 0) {
      throw new Error(`PDF render failed for ${lang}: empty buffer`)
    }
    await fs.writeFile(outputPath, pdfBuffer)
    const stats = await fs.stat(outputPath)
    console.log(`[pdf] wrote ${outputPath} (${stats.size} bytes)`)
  } finally {
    await browser.close()
  }
}

await fs.mkdir(pdfDir, { recursive: true })

const server = await startServer()
try {
  await renderPdf('de')
  await renderPdf('en')
} finally {
  await new Promise((resolve) => server.close(resolve))
}
