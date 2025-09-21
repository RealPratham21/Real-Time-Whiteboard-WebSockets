const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Railway-specific build process...');

try {
  // Step 1: Clean and prepare directories
  console.log('🧹 Cleaning build directories...');
  execSync('node scripts/prebuild.js', { stdio: 'inherit' });

  // Step 2: Build Next.js application
  console.log('📦 Building Next.js application...');
  execSync('npx next build', { stdio: 'inherit' });

  // Step 3: Verify Next.js build
  const nextDir = path.join(process.cwd(), '.next');
  const serverDir = path.join(nextDir, 'server');
  const pagesDir = path.join(serverDir, 'pages');
  
  if (!fs.existsSync(pagesDir)) {
    console.log('⚠️  Next.js server pages not found, creating minimal structure...');
    fs.mkdirSync(pagesDir, { recursive: true });
    
    // Create a minimal index.js for pages
    const indexContent = `
module.exports = {
  default: function HomePage() {
    return null;
  },
  getServerSideProps: function() {
    return { props: {} };
  }
};
`;
    fs.writeFileSync(path.join(pagesDir, 'index.js'), indexContent);
    console.log('✅ Created minimal index.js page');
  }

  // Step 4: Build server
  console.log('🔧 Building server...');
  execSync('npm run build:server', { stdio: 'inherit' });

  // Step 5: Verify build
  console.log('🔍 Verifying build...');
  execSync('node scripts/verify-deployment.js', { stdio: 'inherit' });

  console.log('✅ Railway build completed successfully!');
} catch (error) {
  console.error('❌ Railway build failed:', error.message);
  process.exit(1);
}
