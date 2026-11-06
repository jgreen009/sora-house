import { chromium } from 'playwright-core';
import { mkdirSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const proto = join(root, 'design/prototypes');
const tmp = join(root, 'tools/.frames');
const requested = process.argv[2] && process.argv[2] !== 'all' ? process.argv[2].split(',') : null;
const vpTag = process.argv[3] || 'all';
const state = process.argv[4] || '';
const targets = readdirSync(proto).filter(file => file.endsWith('.html')).map(file => file.slice(0,-5));
if (requested?.some(name => !targets.includes(name))) throw new Error('Unknown page target');
const viewports = [{ tag: 'desktop', width: 1440, height: 900, dsf: 1 }, { tag: 'mobile', width: 390, height: 844, dsf: 2 }];
if (!['all', 'desktop', 'mobile'].includes(vpTag)) throw new Error('Unknown viewport');
if (!['', 'room-choice', 'review', 'stay-details', 'date-error', 'summary-expanded', 'rooms-filter', 'lightbox', 'menu'].includes(state)) throw new Error('Unknown interaction state');
mkdirSync(tmp, {recursive:true});
mkdirSync(join(proto, 'screenshots'), {recursive:true});
const browser = await chromium.launch({ channel: 'chrome' });
try {
  for (const vp of viewports.filter(vp => vpTag === 'all' || vp.tag === vpTag)) {
    const page = await browser.newPage({viewport:{width:vp.width,height:vp.height},deviceScaleFactor:vp.dsf,reducedMotion:'reduce'});
    for (const name of targets.filter(name => !requested || requested.includes(name))) {
      const dir = resolve(tmp, `${name}${state ? '-'+state : ''}-${vp.tag}`);
      if (!dir.startsWith(resolve(tmp) + '\\')) throw new Error('Capture target outside frame root');
      mkdirSync(dir,{recursive:true});
      for (const file of readdirSync(dir).filter(file => /^f\d+\.png$/.test(file) || file === 'capture.json')) unlinkSync(join(dir,file));
      await page.goto(pathToFileURL(join(proto,name+'.html')).href,{waitUntil:'load'});
      if (name === 'book') {
        if (['room-choice', 'review', 'stay-details', 'summary-expanded'].includes(state)) {
          await page.locator('#bk-guests').selectOption('3');
          await page.locator('[data-next]').first().click();
          await page.locator('[data-room="suite"]').click();
          if (['review', 'stay-details'].includes(state)) await page.locator('[data-next]').nth(1).click();
          if (state === 'stay-details') await page.locator('[data-next]').nth(2).click();
          if (state === 'summary-expanded') await page.locator('.summary-disclosure').evaluate(element => { element.open = true; });
        }
        if (state === 'date-error') {
          const arrival = await page.locator('#bk-arrival').inputValue();
          const yesterday = new Date(Date.parse(arrival) - 86400000).toISOString().slice(0, 10);
          await page.locator('#bk-arrival').fill(yesterday);
          await page.locator('[data-next]').first().click();
        }
      }
      if (name === 'gallery' && ['rooms-filter', 'lightbox'].includes(state)) {
        await page.locator('[data-filter="rooms"]').click();
        if (state === 'lightbox') await page.locator('[data-category]:visible').first().click();
      }
      if (name.startsWith('room-') && state === 'lightbox') await page.locator('[data-lightbox]').first().click();
      if (state === 'menu') await page.locator('.nav-toggle').click();
      await page.evaluate(async () => {
        await document.fonts.ready;
        document.querySelectorAll('img').forEach(img => { img.loading='eager'; });
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-in'));
        for(let y=0;y<document.body.scrollHeight;y+=innerHeight) { scrollTo({top:y,behavior:'instant'}); await new Promise(resolve=>setTimeout(resolve,30)); }
        scrollTo({top:0,behavior:'instant'});
      });
      const total=['lightbox', 'menu'].includes(state) ? vp.height : await page.evaluate(()=>Math.max(document.body.scrollHeight,document.documentElement.scrollHeight));
      const header=await page.locator('.site-header').evaluate(el=>Math.ceil(el.getBoundingClientRect().height));
      const frames=[];
      let y=0;
      while(true) {
        await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);
        await page.waitForTimeout(80);
        const actual=await page.evaluate(()=>scrollY);
        const file=`f${String(frames.length).padStart(3,'0')}.png`;
        await page.screenshot({path:join(dir,file)});
        frames.push({file,y:actual});
        if(actual+vp.height>=total) break;
        y=Math.min(actual+vp.height-header,total-vp.height);
      }
      writeFileSync(join(dir,'capture.json'),JSON.stringify({page:name,state,viewport:vp,total,header,frames},null,2));
      console.log('captured',name,state,vp.tag,frames.length);
    }
    await page.close();
  }
} finally { await browser.close(); }
