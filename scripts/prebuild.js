const fs = require('fs');
const path = require('path');

console.log('🔧 Starting pre-build setup...');

// Clean any existing build artifacts
const nextDir = path.join(process.cwd(), '.next');
if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log('🧹 Cleaned existing .next directory');
}

const buildDir = path.join(process.cwd(), 'build');
if (fs.existsSync(buildDir)) {
  fs.rmSync(buildDir, { recursive: true, force: true });
  console.log('🧹 Cleaned existing build directory');
}

// Create fresh directories
fs.mkdirSync(nextDir, { recursive: true });
console.log('✅ Created fresh .next directory');

fs.mkdirSync(buildDir, { recursive: true });
console.log('✅ Created fresh build directory');

console.log('✅ Pre-build setup completed');
