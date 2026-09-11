import { mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { pageSlugs, renderDocument, render404, makeContext, site } from '../lib/render.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const output=join(root,'docs');
await rm(output,{recursive:true,force:true});
await mkdir(output,{recursive:true});
await cp(join(root,'public/assets'),join(output,'assets'),{recursive:true});
for(const slug of ['home',...pageSlugs]) {
 const directory=slug==='home'?output:join(output,slug);
 await mkdir(directory,{recursive:true});
 await writeFile(join(directory,'index.html'),renderDocument(slug));
}
await writeFile(join(output,'.nojekyll'),'');
await writeFile(join(output,'robots.txt'),`User-agent: *\nDisallow: ${site.preview?'/':''}\n`);
await writeFile(join(output,'404.html'),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | Pool Up</title></head><body><h1>That page is not here.</h1><p>Use your browser's Back button to return to Pool Up.</p></body></html>`);
console.log(`Built ${pageSlugs.length+1} static pages in docs/. No packages or backend required.`);
