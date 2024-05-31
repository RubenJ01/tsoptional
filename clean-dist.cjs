const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist');

if (fs.existsSync(distPath)) {
  fs.readdirSync(distPath).forEach((file) => {
    const filePath = path.join(distPath, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      fs.rmdirSync(filePath, { recursive: true });
    } else {
      fs.unlinkSync(filePath);
    }
  });
}