import { chromium } from 'playwright-core';
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const tmp=join(root,'tools/.frames');
const targets=process.argv.slice(2);
const browser=await chromium.launch({channel:'chrome'});
try {
  const page=await browser.newPage();
  for(const dir of readdirSync(tmp).filter(dir=>!targets.length || targets.includes(dir))) {
    const src=join(tmp,dir);
    if(!existsSync(join(src,'capture.json'))) { console.log('skip legacy frames without offsets',dir); continue; }
    const info=JSON.parse(readFileSync(join(src,'capture.json'),'utf8'));
    const frames=info.frames.map(frame=>({...frame,data:'data:image/png;base64,'+readFileSync(join(src,frame.file)).toString('base64')}));
    const data=await page.evaluate(async ({info,frames})=>{
      const scale=info.viewport.dsf;
      const canvas=document.createElement('canvas');
      canvas.width=info.viewport.width*scale; canvas.height=info.total*scale;
      const ctx=canvas.getContext('2d');
      if(!ctx) throw new Error('Canvas unavailable');
      for(let i=0;i<frames.length;i++) {
        const img=new Image(); img.src=frames[i].data;
        await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject;});
        const cut=i===0?0:info.header*scale;
        ctx.drawImage(img,0,cut,img.width,img.height-cut,0,frames[i].y*scale+cut,img.width,img.height-cut);
      }
      return canvas.toDataURL('image/png').split(',')[1];
    },{info,frames});
    const dst=join(root,'design/prototypes/screenshots',dir+'.png');
    writeFileSync(dst,Buffer.from(data,'base64'));
    console.log('stitched',dir);
  }
} finally { await browser.close(); }
