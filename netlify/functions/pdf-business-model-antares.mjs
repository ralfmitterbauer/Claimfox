import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'

function resolveBaseUrl() {
  return (
    process.env.URL ||
    process.env.DEPLOY_PRIME_URL ||
    process.env.NETLIFY_URL ||
    ''
  ).replace(/\/$/, '')
}

export async function handler(event) {
  try {
    const rawLang = event.queryStringParameters?.lang || 'de'
    const lang = rawLang === 'en' ? 'en' : 'de'
    const baseUrl = resolveBaseUrl()
    if (!baseUrl) {
      throw new Error('Base URL not available for PDF rendering.')
    }
    const targetUrl = `${baseUrl}/business-model-antares?print=1&lang=${encodeURIComponent(
      lang
    )}`

    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      defaultViewport: chromium.defaultViewport
    })

    let pdfBuffer
    try {
      const page = await browser.newPage()
      await page.emulateMediaType('print')
      await page.goto(targetUrl, { waitUntil: ['load', 'networkidle0'] })
      await page.evaluate(() => document.fonts?.ready)
      pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
        margin: { top: '0cm', right: '0cm', bottom: '0cm', left: '0cm' }
      })
    } finally {
      await browser.close()
    }

    const buffer = Buffer.from(pdfBuffer)
    if (buffer.length === 0) {
      throw new Error('PDF buffer is empty')
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="insurfox-antares-business-model-${lang}.pdf"`,
        'Content-Length': buffer.length.toString()
      },
      isBase64Encoded: true,
      body: buffer.toString('base64')
    }
  } catch (error) {
    console.error('PDF render failed', error)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ error: 'PDF render failed' })
    }
  }
}
