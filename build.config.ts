import "dotenv/config";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { type BuildOptions, build, context } from "esbuild";

import {
  ToCopy,
  AliasResolver,
  onRebuild,
  resolveEnvironment,
  type BuildHandlerParams,
} from "./config/plugins";

import { getFiles } from "./config/utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isProductionMode = process.env.NODE_ENV === "production";
const STATICS = process.env.IARES_UI_STATICS as string;
const PROTOCOL = process.env.PROTOCOL;
const PORT = process?.env?.PORT ? +process.env.PORT : 3000;
const HOST = process?.env?.HOST ? process.env.HOST : "localhost";
const SOURCES = await getFiles(["./src/frontend/**/*.{js,jsx,ts,tsx,mdx}"]);

const TLS_KEY = process.env.TLS_KEY;
const TLS_CERT = process.env.TLS_CERT;
const CERT_PATH = join(__dirname, process.env.CERT_PATH as string);
const KEYPEM = join(`${CERT_PATH}/${TLS_KEY}`);
const CERTPEM = join(`${CERT_PATH}/${TLS_CERT}`);

const TLS = {
  keyfile: KEYPEM,
  certfile: CERTPEM,
};
const TLS_OPTIONS = PROTOCOL === "https" && TLS;

const config: BuildOptions = {
  bundle: true,
  write: true,
  keepNames: true,
  define: {
    "process.env.ENVIRONMENT": JSON.stringify(process.env.NODE_ENV),
    "process.env.PORT": JSON.stringify(PORT),
    "process.env.HOST": JSON.stringify(HOST),
    "process.env.PROTOCOL": JSON.stringify(PROTOCOL),
  },
  entryPoints: [...SOURCES],
  outdir: "./dist/src",
  tsconfig: "./tsconfig.json",
  supported: { "dynamic-import": true },
  platform: "browser",
  format: "esm",
  external: [
    "http",
    "canvas",
    "global-jsdom",
    "global-jsdom/register",
    "bun:test",
  ],
  treeShaking: isProductionMode,
  sourcemap: isProductionMode ? true : "both",
  minify: isProductionMode,
  target: isProductionMode ? ["ES2022"] : ["ESNEXT"],
  plugins: [
    AliasResolver,
    resolveEnvironment({
      environment: process.env.NODE_ENV,
    }),
    ToCopy({
      sources: [{ origin: "./static", destiny: "./dist" }],
    }),
    /*ToCopy({
      sources: [
        {
          origin: resolve(__dirname, STATICS),
          destiny: resolve(__dirname, "./dist/assets/libs/iares-ui"),
        },
      ],
    }),*/
    onRebuild((buildParams: BuildHandlerParams) => {
      const { buildVersion } = buildParams;

      if (!isProductionMode) {
        const serverMessage = `DEV Server: ${PROTOCOL}://${HOST}:${PORT}`;
        const buildMessage = `Build: ${buildVersion}`;
        console.log(serverMessage);
        console.log(buildMessage);
        return;
      }
      console.log("-----------------");
      console.log("[ 😎 Build done! ]");
      console.log("-----------------");
      console.log("");
    }),
  ],
  loader: {
    ".js": "js",
    ".jsx": "jsx",
    ".ts": "ts",
    ".tsx": "tsx",
    ".png": "dataurl",
    ".jpg": "file",
    ".jpeg": "file",
    ".svg": "text",
  },
};

try {
  if (!isProductionMode) {
    const ctx = await context(config);
    await ctx.serve({
      port: PORT,
      host: HOST,
      servedir: "./dist",
      ...TLS_OPTIONS,
    });
    ctx.watch();
  } else {
    build(config);
    process.exit(0);
  }
} catch (error) {
  console.log(error);
  process.exit(1);
}
