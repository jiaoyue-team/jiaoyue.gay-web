const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

console.log('=== CHECKING index.html ===');

// 1. Check Images
let imgMatches = html.match(/<img[^>]*>/g) || [];
console.log(`Found ${imgMatches.length} images in index.html`);
imgMatches.forEach(m => {
    let src = (m.match(/src="([^"]+)"/) || [])[1];
    let hasWidth = m.includes('width=');
    let hasHeight = m.includes('height=');
    let hasAlt = m.includes('alt=');
    let hasOnerror = m.includes('onerror=');
    if (!hasWidth || !hasHeight) {
        console.warn(`[WARN] Image missing width/height: ${src}`);
    }
    if (!hasAlt) {
        console.warn(`[WARN] Image missing alt: ${src}`);
    }
});

// 2. Check local script and stylesheet files
let scripts = (html.match(/<script\s+src="([^"]+)"/g) || []).map(m => m.match(/src="([^"]+)"/)[1]);
console.log(`\nFound ${scripts.length} script tags:`);
scripts.forEach(s => {
    if (!s.startsWith('http')) {
        let path = s.split('?')[0];
        console.log(`  ${path}: ${fs.existsSync(path) ? 'EXISTS' : 'MISSING!'}`);
    }
});

let stylesheets = (html.match(/<link\s+[^>]*href="([^"]+)"/g) || []).map(m => m.match(/href="([^"]+)"/)[1]);
console.log(`\nFound ${stylesheets.length} link tags:`);
stylesheets.forEach(href => {
    if (href.endsWith('.css') && !href.startsWith('http')) {
        let path = href.split('?')[0];
        console.log(`  ${path}: ${fs.existsSync(path) ? 'EXISTS' : 'MISSING!'}`);
    }
});

// 3. Check translation keys in zh.js, zh-Hans.js, en.js, ja.js, ko.js
global.window = {};
require('./js/lang/zh.js');
require('./js/lang/zh-Hans.js');
require('./js/lang/en.js');
require('./js/lang/ja.js');
require('./js/lang/ko.js');

let dataTKeys = [...new Set((html.match(/data-t="([^"]+)"/g) || []).map(m => m.match(/data-t="([^"]+)"/)[1]))];
console.log(`\nFound ${dataTKeys.length} distinct data-t keys in index.html`);

['zh', 'zh-Hans', 'en', 'ja', 'ko'].forEach(lang => {
    let trans = window.translations[lang] || {};
    let missing = dataTKeys.filter(k => !(k in trans));
    if (missing.length > 0) {
        console.warn(`[WARN] Missing keys in ${lang}:`, missing);
    } else {
        console.log(`  ${lang}: All ${dataTKeys.length} keys present!`);
    }
});

console.log('\n=== CHECK COMPLETED ===');

