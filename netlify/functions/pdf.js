const DOCRAPTOR_URL = 'https://api.docraptor.com/docs'

function getRequiredEnv(name) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing env var: ${name}`)
  }
  return value
}

function buildDocUrl(origin, route, lang) {
  const normalizedRoute = route.startsWith('/') ? route : `/${route}`
  const url = new URL(normalizedRoute, origin)
  url.searchParams.set('print', '1')
  if (lang) {
    url.searchParams.set('lang', lang)
  }
  return url.toString()
}

exports.handler = async (event) => {
  try {
    const apiKey = getRequiredEnv('DOCRAPTOR_API_KEY')
    const siteOrigin = getRequiredEnv('SITE_ORIGIN')
    const route = event.queryStringParameters?.route || '/business-model-antares-test'
    const lang = event.queryStringParameters?.lang || 'de'
    const filename = event.queryStringParameters?.filename
    const testMode = process.env.DOCRAPTOR_TEST_MODE === 'true'

    const documentUrl = buildDocUrl(siteOrigin, route, lang)
    const authToken = Buffer.from(`${apiKey}:`).toString('base64')

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
        'Content-Disposition': `attachment; filename="${filename || `insurfox-antares-business-model-${lang}.pdf`}"`
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
