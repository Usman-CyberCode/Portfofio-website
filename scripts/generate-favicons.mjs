import sharp from "sharp";
import fs from "fs";

async function createFavicons() {
  const source = "public/images/profile.jpg";

  // Step 1: Extract square crop with face centered (520x520)
  // Optical center of face in 768x1024 photo: left = 124, top = 85
  const faceSquare = await sharp(source)
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

  // Resize face to 512 and apply circular mask
  const circularFace = await sharp(faceSquare)
    .resize(size, size, { fit: "cover" })
    .composite([{ input: circleMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  // Dark navy background with violet/blue accent border
  const navyBgSvg = Buffer.from(
    `<svg width="${size}" height="${size}">
      <circle cx="${radius}" cy="${radius}" r="${radius}" fill="#070c18"/>
      <circle cx="${radius}" cy="${radius}" r="${radius - 3}" fill="none" stroke="#6366f1" stroke-width="6" stroke-opacity="0.8"/>
    </svg>`
  );

  const masterIconBuffer = await sharp(navyBgSvg)
    .composite([{ input: circularFace, blend: "over" }])
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

  console.log("Favicons successfully created from profile.jpg!");
}

createFavicons().catch((err) => {
  console.error("Error creating favicons:", err);
  process.exit(1);
});

