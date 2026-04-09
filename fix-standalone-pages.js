const fs = require('fs');
const path = require('path');
const root = path.join(process.cwd(), 'src', 'app', 'pages');
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.isFile() && p.endsWith('.ts')) {
      let text = fs.readFileSync(p, 'utf8');
      if (!text.includes('@Component({')) continue;
      let updated = text;
      if (!/standalone\s*:/m.test(updated)) {
        updated = updated.replace(/(selector:\s*['"][^'"]+['"],\s*\n)/, '$1  standalone: true,\n');
      }
      if (/styleUrl\s*:/m.test(updated)) {
        updated = updated.replace(/styleUrl\s*:/g, 'styleUrls:');
      }
      if (updated !== text) {
        fs.writeFileSync(p, updated, 'utf8');
        console.log('Updated', p);
      }
    }
  }
}
walk(root);
