/** Prefix a public-folder path with the build's base URL (e.g. GitHub Pages subpath). */
export const asset = (path: string) =>
  import.meta.env.BASE_URL.replace(/\/$/, '') + path
