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

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if querySelectorAll('.mobile-dropdown-toggle') is inside a script with src
  // We can search for <script src="..." followed by querySelectorAll before the closing </script>
  const badScriptRegex = /<script\s+src="[^"]+"[^>]*>[\s\S]*?querySelectorAll[\s\S]*?<\/script>/g;
  
  if (badScriptRegex.test(content)) {
    console.log(`Found broken script tag in ${file}! Fixing it...`);
    
    // Let's restore the <script src="..."></script> tag and move the custom code to a separate inline script tag
    content = content.replace(/(<script\s+src="[^"]+"[^>]*>)([\s\S]*?)(<\/script>)/g, (match, openTag, innerContent, closeTag) => {
      if (innerContent.includes('querySelectorAll')) {
        // It has inline code inside a src script tag. Split them!
        return `${openTag}${closeTag}\n<script>\n${innerContent}\n${closeTag}`;
      }
      return match;
    });
    
    fs.writeFileSync(filePath, content);
  } else {
    console.log(`${file} has no broken script tags.`);
  }
});
