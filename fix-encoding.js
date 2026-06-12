const fs = require('fs');
const path = require('path');

function getAllTsxFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  items.forEach(item => {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory() && !item.name.startsWith('.')) {
      files.push(...getAllTsxFiles(fullPath));
    } else if (item.isFile() && item.name.endsWith('.tsx')) {
      files.push(fullPath);
    }
  });

  return files;
}

const srcPath = path.join(__dirname, 'src');
const allTsxFiles = getAllTsxFiles(srcPath);

console.log(`Found ${allTsxFiles.length} .tsx files\n`);

let fixed = 0;
allTsxFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    fs.writeFileSync(file, content, 'utf8');
    fixed++;
    const relative = path.relative(__dirname, file);
    console.log(`✓ ${relative}`);
  } catch (err) {
    const relative = path.relative(__dirname, file);
    console.log(`✗ ${relative}`);
  }
});

console.log(`\n✅ Fixed encoding in ${fixed} files`);
