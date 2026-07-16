const fs = require('fs');
const path = require('path');

const dir = 'c:\\\\Users\\\\ACER\\\\Downloads\\\\Le Reve';

const files = [
  'index.html',
  'about.html',
  'architectural_designing.html',
  'contact.html',
  'Contractors.html',
  'Interior Designing.html',
  'Project Management.html',
  'Services.html',
  'ext-gallery.html',
  'int-gallery.html',
  'gallery.html'
];

const ids = [
  'navbar',
  'scroll-progress',
  'back-top',
  'navToggle',
  'mobileMenu',
  'mobileClose'
];

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  
  const missing = [];
  ids.forEach(id => {
    if (!content.includes(`id="${id}"`) && !content.includes(`id='${id}'`)) {
      missing.push(id);
    }
  });
  
  if (missing.length > 0) {
    console.log(`${file} is missing elements: ${missing.join(', ')}`);
  } else {
    console.log(`${file} is fully complete!`);
  }
});
