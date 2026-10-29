import sharp from "sharp";
import fs from "fs";

async function createDarkHeroFavicons() {
  const source = "public/images/profile.jpg";

  // Step 1: Extract square crop with face centered (520x520)
  // Optical center of face in 768x1024 photo: left = 124, top = 85
  const rawFace = await sharp(source)
    .extract({ left: 124, top: 85, width: 520, height: 520 })
    .toBuffer();

  const size = 512;
  const radius = size / 2;

  // Mask for circular crop
  const circleMask = Buffer.from(
    `<svg width="${size}" height="${size}">
      <circle cx="${radius}" cy="${radius}" r="${radius - 6}" fill="#fff"/>
    </svg>`
  );

  // Apply Hero Section's exact aesthetic:
  // 1. Grayscale
  // 2. High contrast (125%) & slightly deepened brightness (95%)
  // 3. Circular mask
  const heroGradedFace = await sharp(rawFace)
    .resize(size, size, { fit: "cover" })
    .grayscale()
    .linear(1.25, -28) // contrast 1.25 and deep black floor
    .composite([
      { input: circleMask, blend: "dest-in" },
    ])
    .png()
    .toBuffer();

  // Dark background (#090812) with subtle vignette and crisp specular ring like Hero
  const heroBackgroundWithRims = Buffer.from(
    `<svg width="${size}" height="${size}">
      <defs>
        <!-- Radial gradient for deep studio background -->
        <radialGradient id="darkBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#141122"/>
          <stop offset="65%" stop-color="#090812"/>
          <stop offset="100%" stop-color="#050508"/>
        </radialGradient>
        <!-- Subtle bottom shadow vignette -->
        <linearGradient id="vignette" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#000" stop-opacity="0"/>
          <stop offset="60%" stop-color="#000" stop-opacity="0.1"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.6"/>
        </linearGradient>
      </defs>
      <!-- Base circle -->
      <circle cx="${radius}" cy="${radius}" r="${radius}" fill="url(#darkBg)"/>
      <!-- Inner subtle specular border -->
      <circle cx="${radius}" cy="${radius}" r="${radius - 4}" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="4"/>
      <!-- Subtle violet accent rim -->
      <circle cx="${radius}" cy="${radius}" r="${radius - 1}" fill="none" stroke="rgba(147,51,234,0.4)" stroke-width="2"/>
    </svg>`
  );

  const bottomVignetteSvg = Buffer.from(
    `<svg width="${size}" height="${size}">
      <defs>
        <linearGradient id="vignette" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#000" stop-opacity="0"/>
          <stop offset="55%" stop-color="#000" stop-opacity="0.05"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.55"/>
        </linearGradient>
      </defs>
      <circle cx="${radius}" cy="${radius}" r="${radius - 6}" fill="url(#vignette)"/>
    </svg>`
  );

  const masterIconBuffer = await sharp(heroBackgroundWithRims)
    .composite([
      { input: heroGradedFace, blend: "over" },
      { input: bottomVignetteSvg, blend: "over" },
    ])
    .png()
    .toBuffer();

  // Write master icons to public/
  await sharp(masterIconBuffer).resize(512, 512).png().toFile("public/icon-512.png");
  await sharp(masterIconBuffer).resize(192, 192).png().toFile("public/icon.png");
  await sharp(masterIconBuffer).resize(180, 180).png().toFile("public/apple-icon.png");
  await sharp(masterIconBuffer).resize(32, 32).png().toFile("public/favicon.png");
  await sharp(masterIconBuffer).resize(16, 16).png().toFile("public/favicon-16.png");

  // Create multi-size ICO file (16, 32, 48)
  const png16 = await sharp(masterIconBuffer).resize(16, 16).png().toBuffer();
  const png32 = await sharp(masterIconBuffer).resize(32, 32).png().toBuffer();
  const png48 = await sharp(masterIconBuffer).resize(48, 48).png().toBuffer();

  const images = [
    { width: 16, height: 16, data: png16 },
    { width: 32, height: 32, data: png32 },
    { width: 48, height: 48, data: png48 },
  ];

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + 16 * images.length;
  const dirEntries = [];
  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width === 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height === 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color palette count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(img.data.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    dirEntries.push(entry);
    offset += img.data.length;
  }

  const icoBuffer = Buffer.concat([
    header,
    ...dirEntries,
    ...images.map((img) => img.data),
  ]);

  fs.writeFileSync("public/favicon.ico", icoBuffer);
  fs.writeFileSync("src/app/favicon.ico", icoBuffer);

  console.log("Dark themed Hero-matched favicon successfully generated!");
}

createDarkHeroFavicons().catch((err) => {
  console.error("Error creating dark hero favicons:", err);
  process.exit(1);
});
