// frontend/sanity/schemaTypes/PortableTextComponents.tsx
// Used by Sanity Studio for in-editor preview rendering only.
// The production rendering is handled by ArticleContent.tsx.

import AudioPlayer from './AudioPlayer'

export const portableTextComponents = {
  types: {
    audio: AudioPlayer,
  },
}