const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const pptxgen = require('pptxgenjs');

const OUT_DIR = '/Users/Shenhan/HansProject/CreateOS-Stripe-Hackathon/vault/13 Pitch Deck/Slides';
const BG_PATH = path.join(OUT_DIR, 'Slide 01 - Cover.background.png');
const PREVIEW_PATH = path.join(OUT_DIR, 'Slide 01 - Cover.preview.png');
const PPTX_PATH = path.join(OUT_DIR, 'Slide 01 - Cover.pptx');

const W = 1920;
const H = 1080;

function backgroundSvg(includeCopy = false) {
  const copy = includeCopy ? `
    <text x="96" y="104" class="eyebrow">AI AGENTS FOR BUSINESS OPERATIONS</text>
    <text x="96" y="826" class="wordmark">REEVE</text>
    <text x="96" y="902" class="tagline">Your operations, <tspan class="serif">run on your behalf.</tspan></text>
    <text x="96" y="1010" class="footer">CREATEOS × STRIPE PROJECTS HACKATHON · 17 OCT 2026</text>
    <text x="1824" y="104" text-anchor="end" class="slideNo">01 / 14</text>
  ` : '';

  return `
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mesh" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#D6FB00"/>
        <stop offset="0.34" stop-color="#C6FF33"/>
        <stop offset="0.68" stop-color="#00545F"/>
        <stop offset="1" stop-color="#001F3F"/>
      </linearGradient>
      <radialGradient id="limeGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="#D6FB00" stop-opacity="0.32"/>
        <stop offset="0.35" stop-color="#C6FF33" stop-opacity="0.15"/>
        <stop offset="1" stop-color="#D6FB00" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="tealGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="#00545F" stop-opacity="0.58"/>
        <stop offset="1" stop-color="#001F3F" stop-opacity="0"/>
      </radialGradient>
      <filter id="blur-hero" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="48"/>
      </filter>
      <filter id="blur-soft" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="18"/>
      </filter>
      <style>
        .eyebrow { font-family: 'Arial', sans-serif; font-size: 22px; font-weight: 700; letter-spacing: 3px; fill: #C6FF33; }
        .wordmark { font-family: 'Arial', sans-serif; font-size: 82px; font-weight: 900; letter-spacing: -3px; fill: #FFFFFF; }
        .tagline { font-family: 'Arial', sans-serif; font-size: 36px; font-weight: 400; fill: #FFFFFF; }
        .serif { font-family: 'Cambria', serif; font-style: italic; fill: #D6FB00; }
        .footer, .slideNo { font-family: 'Courier New', monospace; font-size: 16px; letter-spacing: 2px; fill: #FFFFFF; opacity: 0.68; }
      </style>
    </defs>

    <rect width="${W}" height="${H}" fill="#000000"/>
    <ellipse cx="1420" cy="500" rx="760" ry="680" fill="url(#tealGlow)" opacity="0.78"/>
    <ellipse cx="1370" cy="420" rx="460" ry="410" fill="url(#limeGlow)" opacity="0.65"/>

    <g opacity="0.48" filter="url(#blur-hero)">
      <text x="1125" y="900" font-family="Arial, sans-serif" font-size="1120" font-weight="900" fill="url(#mesh)">R</text>
    </g>
    <g opacity="0.28" filter="url(#blur-soft)">
      <text x="1125" y="900" font-family="Arial, sans-serif" font-size="1120" font-weight="900" fill="url(#mesh)">R</text>
    </g>
    <text x="1125" y="900" font-family="Arial, sans-serif" font-size="1120" font-weight="900" fill="none" stroke="#C6FF33" stroke-opacity="0.09" stroke-width="4">R</text>

    <g transform="translate(1450 548)">
      <ellipse rx="244" ry="112" transform="rotate(-20)" fill="none" stroke="#C6FF33" stroke-opacity="0.32" stroke-width="2"/>
      <ellipse rx="208" ry="94" transform="rotate(54)" fill="none" stroke="#7D39EB" stroke-opacity="0.30" stroke-width="2"/>
      <circle cx="205" cy="-74" r="8" fill="#C6FF33"/>
      <circle cx="-146" cy="-128" r="8" fill="#7D39EB"/>
      <circle cx="0" cy="0" r="21" fill="#FFFFFF"/>
      <rect x="-8" y="16" width="16" height="48" rx="8" fill="#FFFFFF"/>
      <circle cx="0" cy="0" r="7" fill="#001F3F"/>
    </g>

    <path d="M 90 680 C 490 610, 720 730, 980 620" fill="none" stroke="#FFFFFF" stroke-opacity="0.06" stroke-width="2"/>
    ${copy}
  </svg>`;
}

function makeNoise() {
  const data = Buffer.alloc(W * H * 4);
  let seed = 0x1a2b3c4d;
  for (let i = 0; i < W * H; i += 1) {
    seed = (1664525 * seed + 1013904223) >>> 0;
    const n = (seed >>> 24) & 0xff;
    const p = i * 4;
    data[p] = n;
    data[p + 1] = n;
    data[p + 2] = n;
    data[p + 3] = 15;
  }
  return sharp(data, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
}

async function buildImages() {
  const base = await sharp(Buffer.from(backgroundSvg(false))).png().toBuffer();
  const noise = await makeNoise();
  await sharp(base)
    .composite([{ input: noise, blend: 'overlay' }])
    .png()
    .toFile(BG_PATH);

  const previewSvg = Buffer.from(backgroundSvg(true));
  const previewBase = await sharp(previewSvg).png().toBuffer();
  await sharp(previewBase)
    .composite([{ input: noise, blend: 'overlay' }])
    .png()
    .toFile(PREVIEW_PATH);
}

async function buildPptx() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'CreateOS';
  pptx.company = 'CreateOS';
  pptx.subject = 'Reeve pitch deck';
  pptx.title = 'Reeve — Cover';
  pptx.lang = 'en-US';
  pptx.theme = {
    headFontFace: 'Inter Tight',
    bodyFontFace: 'Arial',
    lang: 'en-US',
  };

  const slide = pptx.addSlide();
  slide.background = { color: '000000' };
  slide.addImage({ path: BG_PATH, x: 0, y: 0, w: 13.333, h: 7.5 });

  slide.addText('AI AGENTS FOR BUSINESS OPERATIONS', {
    x: 0.667, y: 0.38, w: 5.5, h: 0.22,
    fontFace: 'Courier New', fontSize: 9.5, bold: true, color: 'C6FF33',
    charSpacing: 2.4, margin: 0, isTextBox: true, breakLine: false,
  });
  slide.addText('01 / 14', {
    x: 11.72, y: 0.38, w: 0.95, h: 0.22,
    fontFace: 'Courier New', fontSize: 9.5, color: 'FFFFFF',
    charSpacing: 1.6, align: 'right', margin: 0, isTextBox: true,
  });

  slide.addText('REEVE', {
    x: 0.667, y: 5.63, w: 4.2, h: 0.65,
    fontFace: 'Inter Tight', fontSize: 42, bold: true, color: 'FFFFFF',
    charSpacing: -1.6, margin: 0, isTextBox: true,
  });
  slide.addText([
    { text: 'Your operations, ', options: { color: 'FFFFFF', fontFace: 'Arial' } },
    { text: 'run on your behalf.', options: { color: 'D6FB00', fontFace: 'Cambria', italic: true } },
  ], {
    x: 0.667, y: 6.27, w: 6.1, h: 0.38,
    fontSize: 18, margin: 0, breakLine: false, isTextBox: true,
  });
  slide.addText('CREATEOS × STRIPE PROJECTS HACKATHON · 17 OCT 2026', {
    x: 0.667, y: 7.02, w: 6.6, h: 0.18,
    fontFace: 'Courier New', fontSize: 8.2, color: 'FFFFFF', transparency: 32,
    charSpacing: 1.2, margin: 0, isTextBox: true,
  });

  slide.addNotes('Hi, we\'re [team]. This is Reeve. A reeve was the official who ran an estate on the owner\'s behalf. Reeve does the same for small businesses: AI agents that run your SOPs, and that you can actually trust with your money.');
  await pptx.writeFile({ fileName: PPTX_PATH });
}

(async () => {
  await buildImages();
  await buildPptx();
  console.log(`Created ${PPTX_PATH}`);
  console.log(`Created ${PREVIEW_PATH}`);
})();
