const DOCRAPTOR_URL = 'https://api.docraptor.com/docs'

function getRequiredEnv(name) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing env var: ${name}`)
  }
  return value
}

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'GET') {
      return {
        statusCode: 405,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ error: 'Method Not Allowed' })
      }
    }

    const deck = event.queryStringParameters?.deck || 'enterprise-leads'
    const lang = event.queryStringParameters?.lang === 'en' ? 'en' : 'de'
    const filename = event.queryStringParameters?.filename
    const testMode = process.env.DOCRAPTOR_TEST_MODE === 'true'

    const origin = process.env.SITE_ORIGIN || 'https://claimfox.app'
    const documentUrl = new URL(`/${deck}-print.${lang}.html`, origin).toString()

    if (event.queryStringParameters?.debug === '1') {
      const response = await fetch(documentUrl, { redirect: 'follow' })
      const contentType = response.headers.get('content-type')
      const text = await response.text()
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          ok: response.ok && contentType && contentType.includes('text/html'),
          document_url: documentUrl,
          status: response.status,
          content_type: contentType,
          first_300_chars: text.slice(0, 300),
          redirected: response.url !== documentUrl,
          final_fetch_url: response.url
        })
      }
    }

    const apiKey = getRequiredEnv('DOCRAPTOR_API_KEY')
    const authToken = Buffer.from(`${apiKey}:`).toString('base64')

    console.log('FINAL DocRaptor document_url =', documentUrl)

    const response = await fetch(DOCRAPTOR_URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        document_type: 'pdf',
        document_url: documentUrl,
        test: testMode
      })
    })

    if (!response.ok) {
      const message = await response.text()
      return {
        statusCode: response.status,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          error: 'DocRaptor request failed',
          status: response.status,
          message
        })
      }
    }

    const arrayBuffer = await response.arrayBuffer()
    const pdfBuffer = Buffer.from(arrayBuffer)

    if (pdfBuffer.length === 0) {
      throw new Error('DocRaptor returned an empty PDF')
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename || `insurfox-business-plan-${lang}.pdf`}"`
      },
      body: pdfBuffer.toString('base64'),
      isBase64Encoded: true
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        error: 'PDF render failed',
        message: error.message
      })
    }
  }
}
