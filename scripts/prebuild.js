const fs = require('fs');
const path = require('path');

// Ensure .next directory exists
const nextDir = path.join(process.cwd(), '.next');
if (!fs.existsSync(nextDir)) {
  fs.mkdirSync(nextDir, { recursive: true });
  console.log('✅ Created .next directory');
}

// Ensure .next/server directory exists
const serverDir = path.join(nextDir, 'server');
if (!fs.existsSync(serverDir)) {
  fs.mkdirSync(serverDir, { recursive: true });
  console.log('✅ Created .next/server directory');
}

// Ensure build directory exists
const buildDir = path.join(process.cwd(), 'build');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
  console.log('✅ Created build directory');
}

console.log('✅ Pre-build setup completed');
