export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-01-31'

// Both values are public (they ship to the browser and are in sanity.config.ts).
// The fallbacks let CI build when the secrets are unset or empty.
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'fxz10xl7'
