import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, resolve, dirname } from 'node:path';
import { content, pageSlugs, renderDocument, escapeHTML } from '../lib/render.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const output=join(root,'docs');
assert.equal(pageSlugs.length+1,28);
assert.equal(content.pages.faqs.entries.length,16);
assert.equal(content.policies.length,9);
assert.equal(content.forms.commuter.fields.length,12);
let links=0;
for(const slug of ['home',...pageSlugs]) {
 const file=join(output,slug==='home'?'':slug,'index.html');
 const html=readFileSync(file,'utf8');
 assert.equal((html.match(/<main\b/g)||[]).length,1,`${slug}: one main landmark`);
 assert.equal((html.match(/<h1\b/g)||[]).length,1,`${slug}: one h1`);
 assert.equal((html.match(/<footer\b/g)||[]).length,1,`${slug}: one footer`);
 assert.equal(html,renderDocument(slug),`${slug}: prebuilt output matches source`);
 for(const [,href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if(/^(https?:|mailto:|tel:|data:)/.test(href)) continue;
  const [path,fragment]=href.split('#');
  const target=path?resolve(dirname(file),path):file;
  assert(existsSync(target),`${slug}: missing ${href}`);
  if(fragment && target.endsWith('.html')) {
   const dest=readFileSync(target,'utf8');
   assert(dest.includes(`id="${fragment}"`),`${slug}: missing anchor ${href}`);
  }
  links++;
 }
 const page=content.pages[slug];
 if(page) for(const b of page.blocks) {
  if(['p','h2','h3','notice'].includes(b.type)) assert(html.includes(escapeHTML(b.text)),`${slug}: content missing: ${b.text}`);
  if(b.type==='list') for(const item of b.items) assert(html.includes(escapeHTML(item)));
 }
}
console.log(`PASS: 28 pages, 16 FAQs, 9 policies, 12 commuter fields, ${links} local links/assets/anchors, unique landmarks and source/output parity.`);
