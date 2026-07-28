const fs = require('fs');
const path = require('path');

const directory = 'c:/Users/ACER/Downloads/Le Reve';
const files = [
  'index.html',
  'about.html',
  'Services.html',
  'architectural_designing.html',
  'Project Management.html',
  'Interior Designing.html',
  'Contractors.html',
  'gallery.html',
  'int-gallery.html',
  'ext-gallery.html',
  'contact.html'
];

files.forEach(filename => {
  const filePath = path.join(directory, filename);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Match and replace ".footer-brand img" or "#footer .footer-brand img" height: 56px
  const genericFooterLogoRegex = /(\.footer-brand img|#footer \.footer-brand img)\s*\{\s*height:\s*\d+px;/gi;

  let modified = false;
  if (genericFooterLogoRegex.test(content)) {
    content = content.replace(genericFooterLogoRegex, '$1 { height: 90px;');
    modified = true;
    console.log(`Increased footer logo size to 90px in ${filename}`);
  } else {
    console.log(`WARNING: Footer logo CSS rule not matched in ${filename}`);
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log('All footer logo sizes updated successfully.');
