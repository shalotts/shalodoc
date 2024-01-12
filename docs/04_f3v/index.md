---
parent: F3V
title: Install
---

Requires bun. Install dependencies with cli `bun install`

## Auto install

... Not Ready

## Manual install

Create `vite.config.ts`
```typescript
import { defineConfig } from 'vite';
import type { UserConfig } from 'vite';
import { defaultViteF3vConfig } from 'f3v';
import { defu } from 'defu';
import UnoCSS from 'unocss/vite';
import { vavite } from 'vavite';
import vue from '@vitejs/plugin-vue';
import ssr from 'vike/plugin';
import path from "node:path";
import url from 'node:url';

const root = path.dirname(url.fileURLToPath(import.meta.url));

const myConfig = {
    plugins: [
        vavite({
            handlerEntry: '/handler.ts',
            serveClientAssetsInDev: true,
        }),
        ssr(),
        vue({
            include: [/\.vue$/, /\.md$/],
        }),
        UnoCSS(),
    ],
    resolve: {
        dedupe: ['vue'],
        alias: [
            {
                find: '~/',
                replacement: `${ root }/`,
            },
            {
                find: '~/app/',
                replacement: `${ root }/app/`,
            },
            {
                find: '#root',
                replacement: `${ root }/src/`,
            },
        ],
    },
} satisfies UserConfig

export default defineConfig(defu(defaultViteF3vConfig, myConfig));
```

Create `sha.config.ts` file in root directory.

```typescript
import { defineConfig, defaultConfig, listen } from 'f3v'
import { join } from 'node:path'
import { defu } from 'defu'
import type { IAppConfig } from 'f3v';

const shalottsConfig = await defaultConfig();

const myConfig = {
    mode: 'server',
} satisfies Omit<IAppConfig, 'listen'>

export default defineConfig(defu(shalottsConfig, myConfig));
```
Create `handler.ts` for vavite (its connect vite middleware with fastify app)

```typescript
import { IncomingMessage, ServerResponse } from 'node:http';
import { AppModule, HttpModule } from 'f3v';
import config from './sha.config.ts';

const http = new HttpModule(config.fastifyInstanceOptions);
const FastifyInstance = await http.createServer();
const $sha = new AppModule(FastifyInstance, config);
await $sha.create();

let fastifyReadyPromise: PromiseLike<void> | undefined = $sha.app.ready();
export default async function handler(request: IncomingMessage, reply: ServerResponse) {
    if (fastifyReadyPromise) {
        await fastifyReadyPromise;
        fastifyReadyPromise = undefined;
    }

    $sha.app.server.emit('request', request, reply);
}
```

After that you can create file structure like [Vike routing](https://vike.dev/filesystem-routing).

```text
root_dir/
├─ pages/
├─ +config.h.ts
├─ index/
│  ├── +Page.vue
```
For config file `+config.h.ts` you can use f3v render functions or config vike-vue
```typescript
import type { Config } from 'vike/types'
import client from './client.ts' // use for browser scripts
export default {
  onRenderHtml: 'import:f3v/renderer/onRenderHtml:default',
  onRenderClient: 'import:f3v/renderer/onRenderClient:default',
  client,
  passToClient: ['pageProps', 'urlPathname', 'is404', 'urlParsed'],
  meta: {
    title: {
      // Make `title` value available on both the server and client
      env: {
        server: true,
        client: true,
      },
    },
    description: {
      // Make `description` value available only on the server-side
      env: { server: true },
    },
  },
} satisfies Config;
```