import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const folder = process.argv[2] || 'docs';
const root = resolve(folder);
const port = Number(process.env.PORT || 3000);
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.jpg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml', '.txt':'text/plain; charset=utf-8' };
try { await stat(root); } catch { console.error(`Missing ${folder}/. Build the site first.`); process.exit(1); }
http.createServer(async (req,res)=>{
  try {
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let file=resolve(root,'.'+pathname);
    if(file!==root && !file.startsWith(root+sep)) { res.writeHead(403); res.end('Forbidden'); return; }
    if((await stat(file)).isDirectory()) file=resolve(file,'index.html');
    const bytes=await readFile(file);
    res.writeHead(200,{'Content-Type':mime[extname(file)] || 'application/octet-stream','X-Content-Type-Options':'nosniff'});
    res.end(bytes);
  } catch {
    res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'}); res.end('Page not found');
  }
}).listen(port,'127.0.0.1',()=>console.log(`Pool Up preview: http://localhost:${port}`));
