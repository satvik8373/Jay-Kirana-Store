// Quick test script to verify SEO files are accessible
// Run with: node test-seo-files.js

const http = require('http');

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

const files = [
  { path: '/robots.txt', contentType: 'text/plain' },
  { path: '/sitemap.xml', contentType: 'application/xml' },
  { path: '/manifest.json', contentType: 'application/json' }
];

console.log('🧪 Testing SEO Files Accessibility\n');
console.log(`Base URL: ${BASE_URL}\n`);

let allPassed = true;

files.forEach(file => {
  const url = `${BASE_URL}${file.path}`;
  
  http.get(url, (res) => {
    const status = res.statusCode;
    const contentType = res.headers['content-type'];
    
    if (status === 200) {
      console.log(`✅ ${file.path}`);
      console.log(`   Status: ${status}`);
      console.log(`   Content-Type: ${contentType}`);
      
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`   Size: ${data.length} bytes`);
        console.log('');
      });
    } else {
      console.log(`❌ ${file.path}`);
      console.log(`   Status: ${status} (Expected 200)`);
      console.log('');
      allPassed = false;
    }
  }).on('error', (err) => {
    console.log(`❌ ${file.path}`);
    console.log(`   Error: ${err.message}`);
    console.log('');
    allPassed = false;
  });
});

setTimeout(() => {
  if (allPassed) {
    console.log('🎉 All SEO files are accessible!\n');
    console.log('Next steps:');
    console.log('1. Deploy your website');
    console.log('2. Test on production: https://jaykirana.in/sitemap.xml');
    console.log('3. Submit to Google Search Console');
  } else {
    console.log('⚠️  Some files are not accessible.');
    console.log('Make sure the development server is running: npm run dev');
  }
}, 2000);
