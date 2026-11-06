import { readFileSync, writeFileSync } from 'node:fs';
const p = 'tools/build-prototype.mjs';
let s = readFileSync(p, 'utf8');
s = s.replace(`<body class="\${page}">`, `<body class="\${page} \${headerClass}">`);
s = s.replace(`const layout = ({ title, description, body, current = '', page = '' }) =>`, `const layout = ({ title, description, body, current = '', page = '', header = 'solid' }) =>`);
s = s.replace(`  const html = roomTemplate`, `  const html = roomTemplate`);
s = s.replace(`    current: 'rooms',
    page: 'page-room',`, `    current: 'rooms',
    page: 'page-room',
    header: 'solid',`);
s = s.replace(`  writeFileSync(join(protoDir, key + '.html'), layout({ ...m, body }), 'utf8');`, `  writeFileSync(join(protoDir, key + '.html'), layout({ ...m, body }), 'utf8');`);
s = s.replace(`<body class="\${page} \${headerClass}">`, `<body class="\${page} \${header === 'transparent' ? 'header-transparent' : 'header-solid'}">`);
writeFileSync(p, s);
console.log('patched');
