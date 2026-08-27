const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Add preconnects
if (!html.includes('<link rel="preconnect"')) {
    html = html.replace(
        '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome',
        '<link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n    <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>\n    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome'
    );
}

// Fix images
html = html.replace(/<img([^>]*)>/g, (match, p1) => {
    let attrs = p1;
    
    // Skip if already has width
    if (attrs.includes('width=')) return match;

    if (attrs.includes('id="about-avatar"')) {
        return `<img${attrs} width="256" height="256" fetchpriority="high">`;
    }

    let lazy = attrs.includes('loading=') ? '' : ' loading="lazy"';
    let width = '';
    let height = '';

    if (attrs.includes('w-24 h-24')) {
        width = '96'; height = '96';
    } else if (attrs.includes('w-40 h-40')) {
        width = '160'; height = '160';
    } else if (attrs.includes('w-45 h-45')) {
        width = '180'; height = '180'; 
    } else if (attrs.includes('w-full h-full')) {
        width = '400'; height = '250'; 
    }

    let sizeAttrs = (width && height) ? ` width="${width}" height="${height}"` : '';
    
    return `<img${attrs}${lazy}${sizeAttrs}>`;
});

fs.writeFileSync('index.html', html);
console.log('Optimized index.html');
