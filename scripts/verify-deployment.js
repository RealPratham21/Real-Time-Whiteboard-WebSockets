const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying deployment readiness...');

// Check if Next.js build exists
const nextBuildPath = path.join(process.cwd(), '.next');
if (fs.existsSync(nextBuildPath)) {
  console.log('✅ .next directory exists');
  
  // List contents of .next directory
  const nextContents = fs.readdirSync(nextBuildPath);
  console.log(`📁 .next contents: ${nextContents.join(', ')}`);
  
  const serverPath = path.join(nextBuildPath, 'server');
  if (fs.existsSync(serverPath)) {
    console.log('✅ .next/server directory exists');
    
    const serverContents = fs.readdirSync(serverPath);
    console.log(`📁 .next/server contents: ${serverContents.join(', ')}`);
    
    const pagesPath = path.join(serverPath, 'pages');
    if (fs.existsSync(pagesPath)) {
      console.log('✅ .next/server/pages directory exists');
      
      const pagesContents = fs.readdirSync(pagesPath);
      console.log(`📁 .next/server/pages contents: ${pagesContents.join(', ')}`);
      
      const indexPath = path.join(pagesPath, 'index.js');
      if (fs.existsSync(indexPath)) {
        console.log('✅ index.js page exists');
      } else {
        console.log('❌ index.js page missing');
      }
    } else {
      console.log('❌ .next/server/pages directory missing');
    }
  } else {
    console.log('❌ .next/server directory missing');
  }
} else {
  console.log('❌ .next directory missing');
}

// Check if server build exists
const serverBuildPath = path.join(process.cwd(), 'build', 'index.js');
if (fs.existsSync(serverBuildPath)) {
  console.log('✅ Server build (build/index.js) exists');
} else {
  console.log('❌ Server build missing');
}

// Check package.json
const packagePath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packagePath)) {
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  console.log(`✅ Package: ${pkg.name}@${pkg.version}`);
  console.log(`✅ Start command: ${pkg.scripts.start}`);
  console.log(`✅ Build command: ${pkg.scripts.build}`);
} else {
  console.log('❌ package.json missing');
}

console.log('🔍 Verification complete');
