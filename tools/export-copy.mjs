import { chromium } from 'playwright-core';
import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const proto=join(root,'design/prototypes');
const destination=join(root,'content/pages');
mkdirSync(destination,{recursive:true});
const browser=await chromium.launch({channel:'chrome'});
try {
  const page=await browser.newPage({reducedMotion:'reduce'});
  for(const file of readdirSync(proto).filter(file=>file.endsWith('.html'))) {
    await page.goto(pathToFileURL(join(proto,file)).href);
    const copy=await page.evaluate(()=>{
      const main=document.querySelector('main').cloneNode(true);
      main.querySelectorAll('.lightbox,noscript,.compare-cards').forEach(node=>node.remove());
      main.querySelectorAll('[data-summary-room],[data-summary-in],[data-summary-out],[data-summary-guests],[data-nights],[data-rate],[data-total],[data-summary-compact],[data-c]').forEach(node=>{
        const field=node.getAttribute('data-c')||node.getAttributeNames().find(name=>name.startsWith('data-')).slice(5);
        node.textContent='{{'+field+'}}';
      });
      const plain=node=>(node.textContent||'').replace(/\s+/g,' ').trim();
      const walk=node=>{
        if(node.nodeType===Node.TEXT_NODE)return node.textContent.replace(/\s+/g,' ');
        if(node.nodeType!==Node.ELEMENT_NODE)return '';
        const tag=node.tagName.toLowerCase();
        if(['script','style','input','textarea','svg'].includes(tag))return '';
        if(tag==='img')return node.alt?'\n\nImage alt: '+node.alt+'\n\n':'';
        if(/^h[1-6]$/.test(tag))return '\n\n'+'#'.repeat(Number(tag[1]))+' '+plain(node)+'\n\n';
        if(tag==='table')return '\n\n'+[...node.rows].map((row,index)=>'| '+[...row.cells].map(cell=>plain(cell).replaceAll('|','\\|')).join(' | ')+' |'+(index===0?'\n| '+[...row.cells].map(()=> '---').join(' | ')+' |':'')).join('\n')+'\n\n';
        if(tag==='select')return '\nOptions: '+[...node.options].map(option=>plain(option)).join(' / ')+'\n';
        if(tag==='button'){const image=node.querySelector('img');return image?'\n\nImage alt: '+image.alt+'\nControl: '+(node.getAttribute('aria-label')||node.getAttribute('data-caption')||plain(node))+'\n\n':'\nButton: '+plain(node)+'\n';}
        if(tag==='label')return '\nLabel: '+plain(node)+'\n';
        if(tag==='li')return '\n- '+plain(node);
        if(tag==='a'){if(node.querySelector('img,h2,h3'))return '\n\n'+[...node.childNodes].map(walk).join('')+'\nLink: '+node.getAttribute('href')+'\n\n';return '['+plain(node)+']('+node.getAttribute('href')+')';}
        const content=[...node.childNodes].map(walk).join('');
        if(tag==='em')return '*'+content.trim()+'*';
        if(tag==='strong')return '**'+content.trim()+'**';
        if(tag==='br')return '\n';
        if(tag==='b'||tag==='span')return content.trim()+' ';
        if(tag==='dt')return '\n'+plain(node)+': ';
        if(tag==='dd')return plain(node)+'\n';
        if(['p','section','article','figure','ul','ol','details','form','dl','div'].includes(tag))return '\n\n'+content.trim()+'\n\n';
        return content;
      };
      return {title:document.title,description:document.querySelector('meta[name="description"]').content,body:walk(main).replace(/[ \t]{2,}/g,' ').replace(/[ \t]+\n/g,'\n').replace(/\n{3,}/g,'\n\n').trim()};
    });
    const source=file.startsWith('room-')?'design/prototypes/pages/room.body.html':'design/prototypes/pages/'+file.replace('.html','.body.html');
    writeFileSync(join(destination,file.replace('.html','.md')),`---\ntitle: ${JSON.stringify(copy.title)}\ndescription: ${JSON.stringify(copy.description)}\nroute: ${file}\nsource: ${source}\n---\n\n${copy.body}\n`);
  }
} finally {await browser.close();}
const catalogue=JSON.parse(readFileSync(join(root,'content/room-data/rooms.json'),'utf8'));
console.log('Exported 16 page-copy files; catalogue rooms:',catalogue.property.roomsTotal);
