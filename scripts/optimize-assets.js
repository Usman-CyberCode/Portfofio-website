const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeAssets() {
  console.log('--- Starting Asset Optimization & Favicon Generation ---');

  const rootDir = process.cwd();
  const profileSrc = path.join(rootDir, 'public/images/profile.jpg');
  const creativeArtSrc = path.join(rootDir, 'public/images/creative-art.jpg');

  // Read buffers into memory so files are never locked
  const profileBuffer = fs.readFileSync(profileSrc);
  const creativeArtBuffer = fs.readFileSync(creativeArtSrc);

  // 1. Generate Favicon with User's Photo
  console.log('1. Generating User Photo Favicons...');
  const size = 512;
  const radius = size / 2;

  // Extract square focusing on Usman's face from 768x1024
  const squareFaceBuffer = await sharp(profileBuffer)
    .extract({ left: 100, top: 35, width: 568, height: 568 })
    .resize(size, size)
    .toBuffer();

  // Clean circular mask
  const circleMask = Buffer.from(
    `<svg width="${size}" height="${size}">
       <circle cx="${radius}" cy="${radius}" r="${radius}" fill="white"/>
     </svg>`
  );

  // Elegant purple accent border ring matching the portfolio theme
  const ringSvg = Buffer.from(
    `<svg width="${size}" height="${size}">
       <circle cx="${radius}" cy="${radius}" r="${radius - 6}" fill="none" stroke="#a855f7" stroke-width="12" opacity="0.9"/>
     </svg>`
  );

  const circularFace = await sharp(squareFaceBuffer)
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const finalFavicon512 = await sharp(circularFace)
    .composite([{ input: ringSvg, blend: 'over' }])
    .png()
    .toBuffer();

  // Write Next.js App Router icon
  const appIconPath = path.join(rootDir, 'src/app/icon.png');
  await sharp(finalFavicon512)
    .resize(192, 192)
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(appIconPath);
  console.log('✓ Saved src/app/icon.png');

  // Write public/favicon.png
  await sharp(finalFavicon512)
    .resize(64, 64)
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(path.join(rootDir, 'public/favicon.png'));
  console.log('✓ Saved public/favicon.png');

  // Write public/favicon.ico
  await sharp(finalFavicon512)
    .resize(32, 32)
    .png({ quality: 90 })
    .toFile(path.join(rootDir, 'public/favicon.ico'));
  console.log('✓ Saved public/favicon.ico');

  // Write public/apple-icon.png
  await sharp(finalFavicon512)
    .resize(180, 180)
    .png({ quality: 95 })
    .toFile(path.join(rootDir, 'public/apple-icon.png'));
  console.log('✓ Saved public/apple-icon.png');

  // 2. Compress Profile Image
  console.log('\n2. Compressing Profile Image...');
  console.log(`Original profile.jpg: ${(profileBuffer.length / 1024).toFixed(1)} KB`);

  // WebP version (ultra lightweight & crisp)
  const profileWebp = await sharp(profileBuffer)
    .resize({ width: 768, height: 1024, fit: 'inside' })
    .webp({ quality: 85, effort: 6 })
    .toBuffer();
  fs.writeFileSync(path.join(rootDir, 'public/images/profile.webp'), profileWebp);

  // Optimized compressed JPG version
  const profileJpg = await sharp(profileBuffer)
    .resize({ width: 768, height: 1024, fit: 'inside' })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toBuffer();
  fs.writeFileSync(profileSrc, profileJpg);

  console.log(`✓ Optimized profile.jpg: ${(profileJpg.length / 1024).toFixed(1)} KB (down from ${(profileBuffer.length / 1024).toFixed(1)} KB)`);
  console.log(`✓ Generated profile.webp: ${(profileWebp.length / 1024).toFixed(1)} KB`);

  // 3. Compress Creative Art Image
  console.log('\n3. Compressing Creative Art Card...');
  console.log(`Original creative-art.jpg: ${(creativeArtBuffer.length / 1024).toFixed(1)} KB`);

  // WebP version
  const artWebp = await sharp(creativeArtBuffer)
    .resize(800, 800, { fit: 'cover' })
    .webp({ quality: 80, effort: 6 })
    .toBuffer();
  fs.writeFileSync(path.join(rootDir, 'public/images/creative-art.webp'), artWebp);

  // Optimized JPG version
  const artJpg = await sharp(creativeArtBuffer)
    .resize(800, 800, { fit: 'cover' })
    .jpeg({ quality: 80, mozjpeg: true, progressive: true })
    .toBuffer();
  fs.writeFileSync(creativeArtSrc, artJpg);

  console.log(`✓ Optimized creative-art.jpg: ${(artJpg.length / 1024).toFixed(1)} KB (down from ${(creativeArtBuffer.length / 1024).toFixed(1)} KB)`);
  console.log(`✓ Generated creative-art.webp: ${(artWebp.length / 1024).toFixed(1)} KB`);

  console.log('\n--- Asset Optimization & Favicon Generation Complete! ---');
}

optimizeAssets().catch(err => {
  console.error('Error optimizing assets:', err);
  process.exit(1);
});
