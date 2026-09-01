import { useEffect } from 'react'

const DEFAULT_TITLE = 'PrepPilot — AI-Powered Interview Preparation & Resume Analysis'
const DEFAULT_DESC =
  'Prepare for your next job interview with AI. Upload your resume, analyze any job description, pinpoint skill gaps, and get personalized technical and HR interview questions in seconds.'
const DEFAULT_URL = 'https://preppilot.ai'
const DEFAULT_IMAGE = 'https://preppilot.ai/preppilot-logo.svg'

/**
 * Reusable zero-dependency SEO manager.
 * Updates document.title, canonical URL, meta description, robots directives,
 * Open Graph, Twitter Cards, and injects Schema.org JSON-LD scripts.
 */
export default function SEO({
  title,
  description = DEFAULT_DESC,
  canonical,
  noIndex = false,
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  schema = null,
}) {
  const fullTitle = title
    ? `${title} | PrepPilot`
    : DEFAULT_TITLE

  useEffect(() => {
    // 1. Title
    document.title = fullTitle

    // Helper to get or create a tag
    const setMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attrName, attrValue)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // 2. Meta description
    setMetaTag('name', 'description', description)

    // 3. Robots meta tag
    setMetaTag(
      'name',
      'robots',
      noIndex
        ? 'noindex, nofollow'
        : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    )

    // 4. Canonical URL
    const currentCanonical = canonical || `${DEFAULT_URL}${window.location.pathname}`
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', currentCanonical)

    // 5. Open Graph tags
    setMetaTag('property', 'og:title', fullTitle)
    setMetaTag('property', 'og:description', description)
    setMetaTag('property', 'og:url', currentCanonical)
    setMetaTag('property', 'og:type', ogType)
    setMetaTag('property', 'og:image', ogImage)
    setMetaTag('property', 'og:site_name', 'PrepPilot')

    // 6. Twitter Card tags
    setMetaTag('name', 'twitter:card', 'summary_large_image')
    setMetaTag('name', 'twitter:title', fullTitle)
    setMetaTag('name', 'twitter:description', description)
    setMetaTag('name', 'twitter:image', ogImage)

    // 7. Schema.org JSON-LD Structured Data
    let schemaScript = document.getElementById('preppilot-schema')
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script')
        schemaScript.id = 'preppilot-schema'
        schemaScript.type = 'application/ld+json'
        document.head.appendChild(schemaScript)
      }
      schemaScript.textContent = JSON.stringify(schema)
    } else if (schemaScript) {
      schemaScript.remove()
    }

    return () => {
      // Clean up dynamic schema when unmounting if needed
      const el = document.getElementById('preppilot-schema')
      if (el) el.remove()
    }
  }, [fullTitle, description, canonical, noIndex, ogType, ogImage, schema])

  return null
}

