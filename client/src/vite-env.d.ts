/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string;
  // เพิ่ม env variables อื่น ๆ ตามต้องการ
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
