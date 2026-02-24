const fs = require('fs');
const path = require('path');

// Fix permissions for binaries in node_modules/.bin
const binDir = path.join(__dirname, 'node_modules', '.bin');

if (fs.existsSync(binDir)) {
  fs.readdirSync(binDir).forEach(file => {
    const filePath = path.join(binDir, file);
    try {
      fs.chmodSync(filePath, 0o755);
    } catch (err) {
      // Ignore errors on Windows
    }
  });
  console.log('Fixed permissions on binaries');
}
