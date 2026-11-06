import {chromium} from 'playwright-core';
import {writeFileSync} from 'node:fs';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const browser=await chromium.launch({channel:'chrome'});const results=[];
try {
  for(const width of [1440,390]) {
    const context=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width===390?2:1,reducedMotion:'reduce'});
    const page=await context.newPage();
    for(const route of ['index','book','room-suite']) {
      await page.goto('http://127.0.0.1:4173/design/prototypes/'+route+'.html');
      await page.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img[src]').forEach(img=>{img.loading='eager';});});
      await page.waitForFunction(()=>[...document.querySelectorAll('img[src]')].every(img=>img.complete&&img.naturalWidth>0),undefined,{timeout:15000});
      const metrics=await page.evaluate(()=>{
        const entries=performance.getEntriesByType('resource');const nav=performance.getEntriesByType('navigation')[0];const photos=entries.filter(entry=>entry.name.includes('/photography/web/'));
        return {loadEventEndMs:Math.round(nav.loadEventEnd),resourceTransferBytes:entries.reduce((n,entry)=>n+entry.transferSize,0),photoTransferBytes:photos.reduce((n,entry)=>n+entry.transferSize,0),photoRequests:photos.length,remoteRequests:entries.filter(entry=>!entry.name.startsWith(location.origin)).map(entry=>entry.name),brokenImages:[...document.querySelectorAll('img[src]')].filter(img=>!img.naturalWidth).length,heroSource:document.querySelector('.hero__media img')?.currentSrc.split('/').at(-1)||null,roomChoiceSources:[...document.querySelectorAll('.room-option img')].map(img=>img.currentSrc.split('/').at(-1))};
      });results.push({route,width,...metrics});
    }
    await context.close();
  }
} finally {await browser.close();}
writeFileSync(join(root,'docs/visual-qa/local-performance-2026-10-30.json'),JSON.stringify({scope:'Local HTTP asset-delivery measurements with all page images eagerly loaded; not field Web Vitals or production network performance.',results},null,2));
console.log(JSON.stringify(results,null,2));
