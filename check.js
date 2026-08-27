const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let matches = html.match(/<img[^>]*>/g);
console.log(`Found ${matches ? matches.length : 0} images`);
matches.forEach(m => {
    if(!m.includes('width=')) {
        console.log('Missed:', m.substring(0, 50));
    }
});
