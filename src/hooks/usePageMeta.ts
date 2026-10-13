import { useEffect } from 'react'

const SUFFIX = 'Manara'

/** Production origin used for canonical and Open Graph URLs. */
export const SITE_URL = 'https://manara.sa'

export interface PageMetaOptions {
  /** Absolute canonical URL. Defaults to SITE_URL + current pathname. */
  canonical?: string
  /** Absolute social preview image URL (Open Graph / Twitter). */
  image?: string
  imageAlt?: string
  /** Open Graph object type, e.g. "website" or "article". */
  type?: string
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function removeMeta(attribute: 'name' | 'property', key: string) {
  document.head.querySelector(`meta[${attribute}="${key}"]`)?.remove()
}

function upsertLink(rel: string, href: string) {
  let tag = document.head.querySelector(`link[rel="${rel}"]`)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
}

/**
 * Sets unique document metadata for the active route: title, description,
 * canonical URL, Open Graph and Twitter cards.
 */
export function usePageMeta(title: string, description?: string, options: PageMetaOptions = {}) {
  const { canonical, image, imageAlt, type = 'website' } = options

  useEffect(() => {
    const fullTitle = `${title} — ${SUFFIX}`
    document.title = fullTitle

    const canonicalUrl = canonical ?? `${SITE_URL}${window.location.pathname}`

    upsertLink('canonical', canonicalUrl)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:site_name', SUFFIX)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)

    if (description) {
      upsertMeta('name', 'description', description)
      upsertMeta('property', 'og:description', description)
      upsertMeta('name', 'twitter:description', description)
    } else {
      removeMeta('name', 'description')
      removeMeta('property', 'og:description')
      removeMeta('name', 'twitter:description')
    }

    if (image) {
      upsertMeta('property', 'og:image', image)
      upsertMeta('name', 'twitter:image', image)
      if (imageAlt) {
        upsertMeta('property', 'og:image:alt', imageAlt)
        upsertMeta('name', 'twitter:image:alt', imageAlt)
      }
    } else {
      removeMeta('property', 'og:image')
      removeMeta('name', 'twitter:image')
      removeMeta('property', 'og:image:alt')
      removeMeta('name', 'twitter:image:alt')
    }
  }, [title, description, canonical, image, imageAlt, type])
}
