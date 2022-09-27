/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_ENV: string
  readonly VITE_BASE_PATH: string
  readonly VITE_DOCS_PATH : string
  readonly VITE_LINGJIE_SHELL_PATH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}