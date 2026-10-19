const path = require('path');
const sharp = require('sharp');
const pptxgen = require('pptxgenjs');

const OUT_DIR = '/Users/Shenhan/HansProject/CreateOS-Stripe-Hackathon/vault/13 Pitch Deck/Slides';
const BG_PATH = path.join(OUT_DIR, 'Slide 02 - Problem.background.png');
const PREVIEW_PATH = path.join(OUT_DIR, 'Slide 02 - Problem.preview.png');
const PPTX_PATH = path.join(OUT_DIR, 'Slide 02 - Problem.pptx');
const W = 1920;
const H = 1080;

function svg(includeCopy = false) {
  const copy = includeCopy ? `
    <text x="1430" y="92" class="eyebrow">THE PROBLEM</text>
    <text x="1824" y="92" text-anchor="end" class="slideNo">02 / 14</text>
    <text x="1430" y="278" class="headline">Small businesses</text>
    <text x="1430" y="346" class="headline">run on chat</text>
    <text x="1430" y="414" class="headline">and spreadsheets.</text>
    <text x="1430" y="505" class="subline">Automation breaks on edge cases.</text>
    <text x="1430" y="542" class="subline">AI agents can’t be trusted with money.</text>
    <text x="1430" y="704" class="label">01  LATE PAYMENTS</text>
    <text x="1430" y="775" class="label">02  MANUAL MISTAKES</text>
    <text x="1430" y="846" class="label">03  RISKY AI ACCESS</text>
    <text x="1430" y="962" class="tinyMono">THE MANUAL LOOP / 30-ROOM KOS</text>
  ` : '';

  return `
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="grain" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.58" numOctaves="3" seed="17" result="noise"/>
        <feColorMatrix in="noise" type="saturate" values="0"/>
        <feComponentTransfer><feFuncA type="table" tableValues="0 0.10"/></feComponentTransfer>
      </filter>
      <filter id="shadow" x="-30%" y="-30%" width="160%" height="180%">
        <feDropShadow dx="8" dy="15" stdDeviation="12" flood-color="#001F3F" flood-opacity="0.20"/>
      </filter>
      <filter id="smallShadow" x="-30%" y="-30%" width="160%" height="180%">
        <feDropShadow dx="4" dy="8" stdDeviation="5" flood-color="#001F3F" flood-opacity="0.18"/>
      </filter>
      <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.4" fill="#001F3F" fill-opacity="0.12"/>
      </pattern>
      <style>
        .eyebrow { font-family: Arial, sans-serif; font-size: 20px; font-weight: 700; letter-spacing: 3px; fill: #001F3F; }
        .slideNo { font-family: 'Courier New', monospace; font-size: 16px; letter-spacing: 2px; fill: #001F3F; opacity: 0.68; }
        .headline { font-family: Arial, sans-serif; font-size: 61px; font-weight: 800; letter-spacing: -2px; fill: #001F3F; }
        .subline { font-family: Arial, sans-serif; font-size: 24px; fill: #001F3F; opacity: 0.75; }
        .label { font-family: 'Courier New', monospace; font-size: 16px; font-weight: 700; letter-spacing: 1.7px; fill: #001F3F; }
        .tinyMono { font-family: 'Courier New', monospace; font-size: 13px; letter-spacing: 1.5px; fill: #001F3F; opacity: 0.72; }
        .mono { font-family: 'Courier New', monospace; font-size: 15px; letter-spacing: 1px; fill: #001F3F; }
        .monoLight { font-family: 'Courier New', monospace; font-size: 15px; letter-spacing: 1px; fill: #F6F7ED; }
        .smallMono { font-family: 'Courier New', monospace; font-size: 11px; letter-spacing: 1px; fill: #001F3F; opacity: 0.74; }
        .smallMonoLight { font-family: 'Courier New', monospace; font-size: 11px; letter-spacing: 1px; fill: #F6F7ED; opacity: 0.90; }
        .body { font-family: Arial, sans-serif; font-size: 15px; fill: #001F3F; }
        .hand { font-family: 'Comic Sans MS', Arial, sans-serif; font-size: 18px; fill: #001F3F; }
        .routeLabel { font-family: 'Courier New', monospace; font-size: 12px; letter-spacing: 1.3px; fill: #F6F7ED; opacity: 0.95; }
      </style>
    </defs>

    <rect width="${W}" height="${H}" fill="#F6F7ED"/>
    <rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.20"/>
    <rect x="84" y="116" width="1220" height="858" fill="url(#dots)" opacity="0.32"/>
    <path d="M84 116 L1284 101 L1304 974 L78 987 Z" fill="none" stroke="#001F3F" stroke-opacity="0.14" stroke-width="2"/>
    <path d="M86 121 L1281 106" stroke="#C6FF33" stroke-width="5" stroke-opacity="0.88"/>
    <text x="42" y="1034" font-family="Arial, sans-serif" font-size="500" font-weight="900" fill="#001F3F" opacity="0.035">02</text>

    <!-- hero concept: one operational conveyor, not detached cards -->
    <g transform="translate(92 236) rotate(-2)" filter="url(#shadow)">
      <!-- raised conveyor body -->
      <path d="M48 154 L134 52 L1078 52 L1194 154 L1182 624 L1070 716 L72 716 L0 624 Z" fill="#001F3F"/>
      <path d="M79 183 L153 86 L1054 86 L1148 176 L1138 584 L1049 655 L92 655 L42 590 Z" fill="#00545F"/>
      <!-- belt rails -->
      <path d="M68 222 L1114 226 M52 572 L1118 574" fill="none" stroke="#F6F7ED" stroke-opacity="0.20" stroke-width="3"/>
      <path d="M118 130 L1054 130 L1128 190" fill="none" stroke="#C6FF33" stroke-width="6" stroke-linecap="round"/>
      <path d="M78 618 L1060 620" fill="none" stroke="#C6FF33" stroke-opacity="0.35" stroke-width="4"/>

      <!-- vertical ribs make it feel like a machine/system -->
      <path d="M154 110 L145 636 M316 104 L309 642 M478 100 L471 644 M640 98 L635 646 M802 96 L799 648 M964 98 L961 650" stroke="#F6F7ED" stroke-opacity="0.12" stroke-width="3"/>
      <circle cx="154" cy="110" r="7" fill="#C6FF33"/><circle cx="316" cy="104" r="7" fill="#C6FF33"/><circle cx="478" cy="100" r="7" fill="#C6FF33"/><circle cx="640" cy="98" r="7" fill="#C6FF33"/><circle cx="802" cy="96" r="7" fill="#C6FF33"/><circle cx="964" cy="98" r="7" fill="#C6FF33"/>

      <!-- one ribbon is the workflow -->
      <path d="M92 503 C205 444 249 514 319 448 C385 386 340 290 425 244 C512 197 590 246 624 324 C659 405 616 491 700 536 C790 584 857 511 909 438 C963 361 968 280 1082 273" fill="none" stroke="#DBE64C" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M92 503 C205 444 249 514 319 448 C385 386 340 290 425 244" fill="none" stroke="#C6FF33" stroke-width="10" stroke-linecap="round"/>
      <path d="M909 438 C963 361 968 280 1082 273" fill="none" stroke="#7D39EB" stroke-width="10" stroke-linecap="round" stroke-dasharray="10 17"/>
      <path d="M98 519 C202 463 247 531 325 465" fill="none" stroke="#FFFFFF" stroke-opacity="0.22" stroke-width="3"/>

      <!-- input: hand-written chat slips into belt -->
      <g transform="translate(74 154) rotate(-7)" filter="url(#smallShadow)">
        <path d="M0 22 L22 0 L306 13 L324 31 L310 181 L284 198 L17 184 L0 164 Z" fill="#FFFFFF"/>
        <text x="22" y="43" class="mono" font-weight="700">TENANT CHAT / 09:42</text>
        <path d="M20 62 L286 73" stroke="#001F3F" stroke-opacity="0.20" stroke-width="2"/>
        <text x="24" y="103" class="hand">udah transfer kak?</text>
        <path d="M24 110 Q134 95 278 107" fill="none" stroke="#C6FF33" stroke-width="17" stroke-opacity="0.78"/>
        <text x="42" y="145" class="hand">bayar minggu depan ya</text>
        <text x="23" y="174" class="smallMono">2 unread / 4 days late</text>
      </g>

      <!-- transformation: ledger sits on top of belt -->
      <g transform="translate(365 146) rotate(4)" filter="url(#smallShadow)">
        <path d="M0 18 L22 0 L398 14 L414 31 L401 264 L376 280 L14 266 L0 246 Z" fill="#FFFFFF"/>
        <text x="24" y="45" class="mono" font-weight="700">RENT_LEDGER.XLSX</text>
        <text x="322" y="46" class="smallMono">OCT 18</text>
        <path d="M23 62 L383 74" stroke="#001F3F" stroke-opacity="0.20" stroke-width="2"/>
        <g stroke="#001F3F" stroke-opacity="0.16" stroke-width="1.5">
          <path d="M23 101 L385 113 M21 137 L383 149 M19 173 L381 185 M17 209 L379 221"/>
          <path d="M88 65 L82 238 M209 69 L203 242 M306 72 L300 245"/>
        </g>
        <text x="28" y="89" class="smallMono">ROOM</text><text x="104" y="91" class="smallMono">TENANT</text><text x="221" y="94" class="smallMono">DUE</text><text x="319" y="96" class="smallMono">STATUS</text>
        <text x="29" y="124" class="body">A-01</text><text x="104" y="126" class="body">Mira</text><text x="221" y="129" class="body">12 OCT</text><text x="319" y="131" class="body">OVERDUE</text>
        <text x="27" y="160" class="body">A-02</text><text x="102" y="162" class="body">Dito</text><text x="219" y="165" class="body">12 OCT</text><text x="317" y="167" class="body">PARTIAL</text>
        <text x="25" y="196" class="body">A-03</text><text x="100" y="198" class="body">Rani</text><text x="217" y="201" class="body">12 OCT</text><text x="315" y="203" class="body">PAID</text>
        <path d="M18 116 L368 127 M16 152 L366 163" stroke="#7D39EB" stroke-width="7" stroke-opacity="0.74"/>
        <text x="24" y="249" class="smallMono">3 rows need a human decision</text>
      </g>

      <!-- failure: duplicate receipt jams the belt -->
      <g transform="translate(655 424) rotate(-8)" filter="url(#smallShadow)">
        <path d="M28 12 L306 28 L290 246 L10 231 Z" fill="#DBE64C" opacity="0.76"/>
        <path d="M0 19 L21 0 L312 15 L327 33 L314 250 L291 266 L16 250 L0 229 Z" fill="#FFFFFF"/>
        <text x="24" y="46" class="mono" font-weight="700">PAYMENT RECEIPT</text>
        <text x="24" y="74" class="smallMono">TENANT / A-02 / DITO</text>
        <path d="M23 91 L289 103" stroke="#001F3F" stroke-opacity="0.20" stroke-width="2"/>
        <text x="25" y="132" class="body">Rp 1.250.000</text><text x="219" y="134" class="smallMono">09:13</text>
        <text x="25" y="166" class="body">Rp 1.250.000</text><text x="219" y="168" class="smallMono">09:16</text>
        <path d="M18 194 L294 121" stroke="#7D39EB" stroke-width="8" stroke-opacity="0.82"/>
        <text x="25" y="223" class="mono" font-weight="700" fill="#7D39EB">DUPLICATE?</text>
      </g>

      <!-- jam indicator: physical interruption -->
      <g transform="translate(878 286)">
        <path d="M0 0 L76 0 M0 32 L76 32" stroke="#7D39EB" stroke-width="12" stroke-linecap="round"/>
        <path d="M40 -12 L16 44 M62 -12 L38 44" stroke="#F6F7ED" stroke-width="4" stroke-linecap="round"/>
        <circle cx="38" cy="16" r="44" fill="none" stroke="#7D39EB" stroke-width="5" stroke-dasharray="4 10"/>
      </g>

      <!-- endpoint: exception is attached to the belt -->
      <g transform="translate(898 118) rotate(7)" filter="url(#smallShadow)">
        <path d="M0 20 L25 0 L246 12 L265 29 L252 163 L225 178 L17 164 L0 143 Z" fill="#7D39EB"/>
        <text x="24" y="51" class="monoLight" font-weight="700">EXCEPTION</text>
        <text x="24" y="84" class="smallMonoLight">who can touch money?</text>
        <path d="M24 104 L222 116" stroke="#FFFFFF" stroke-opacity="0.58" stroke-width="3"/>
        <path d="M209 30 L239 59 L209 88" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M239 59 H252" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
      </g>

      <!-- route captions are on the machine, with dark backing -->
      <rect x="63" y="665" width="1006" height="40" rx="3" fill="#001F3F" fill-opacity="0.72"/>
      <text x="88" y="691" class="routeLabel">01 / ASK AGAIN</text>
      <text x="375" y="691" class="routeLabel">02 / CHECK BY HAND</text>
      <text x="688" y="691" class="routeLabel">03 / DUPLICATE PAYMENT</text>
      <text x="965" y="691" class="routeLabel">04 / STOP</text>
      <text x="75" y="752" class="smallMonoLight">A 30-ROOM BUSINESS / ONE EXCEPTION BREAKS THE FLOW</text>
    </g>

    <!-- text zone -->
    <path d="M1350 118 L1350 968" stroke="#001F3F" stroke-opacity="0.16" stroke-width="2"/>
    <circle cx="1350" cy="118" r="5" fill="#C6FF33"/>
    ${copy}
  </svg>`;
}

function noiseBuffer() {
  const data = Buffer.alloc(W * H * 4);
  let seed = 0x49e25ab1;
  for (let i = 0; i < W * H; i += 1) {
    seed = (1664525 * seed + 1013904223) >>> 0;
    const n = (seed >>> 24) & 0xff;
    const p = i * 4;
    data[p] = n; data[p + 1] = n; data[p + 2] = n; data[p + 3] = 12;
  }
  return sharp(data, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
}

async function buildImages() {
  const noise = await noiseBuffer();
  const background = await sharp(Buffer.from(svg(false))).png().toBuffer();
  const preview = await sharp(Buffer.from(svg(true))).png().toBuffer();
  await sharp(background).composite([{ input: noise, blend: 'overlay' }]).png().toFile(BG_PATH);
  await sharp(preview).composite([{ input: noise, blend: 'overlay' }]).png().toFile(PREVIEW_PATH);
}

async function buildPptx() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'CreateOS';
  pptx.company = 'CreateOS';
  pptx.subject = 'Reeve pitch deck';
  pptx.title = 'Reeve — Problem';
  pptx.lang = 'en-US';
  pptx.theme = { headFontFace: 'Inter Tight', bodyFontFace: 'Arial', lang: 'en-US' };
  const slide = pptx.addSlide();
  slide.background = { color: 'F6F7ED' };
  slide.addImage({ path: BG_PATH, x: 0, y: 0, w: 13.333, h: 7.5 });
  slide.addText('THE PROBLEM', { x: 0.667, y: 0.29, w: 2.0, h: 0.2, fontFace: 'Courier New', fontSize: 9.5, bold: true, color: '001F3F', charSpacing: 2.1, margin: 0, isTextBox: true });
  slide.addText('02 / 14', { x: 11.72, y: 0.29, w: 0.95, h: 0.2, fontFace: 'Courier New', fontSize: 9.5, color: '001F3F', transparency: 30, charSpacing: 1.6, align: 'right', margin: 0, isTextBox: true });
  slide.addText('Small businesses\nrun on chat\nand spreadsheets.', { x: 9.93, y: 1.86, w: 2.82, h: 1.48, fontFace: 'Inter Tight', fontSize: 27.5, bold: true, color: '001F3F', breakLine: false, fit: 'shrink', margin: 0, isTextBox: true });
  slide.addText('Automation breaks on edge cases.\nAI agents can’t be trusted with money.', { x: 9.93, y: 3.57, w: 2.86, h: 0.52, fontFace: 'Arial', fontSize: 13.4, color: '001F3F', transparency: 20, breakLine: false, fit: 'shrink', margin: 0, isTextBox: true });
  ['01  LATE PAYMENTS', '02  MANUAL MISTAKES', '03  RISKY AI ACCESS'].forEach((label, index) => {
    const y = 4.85 + index * 0.50;
    slide.addText(label, { x: 9.93, y, w: 2.7, h: 0.18, fontFace: 'Courier New', fontSize: 9.0, bold: true, color: '001F3F', charSpacing: 1.0, margin: 0, isTextBox: true });
    slide.addShape(pptx.ShapeType.line, { x: 9.93, y: y + 0.28, w: 2.66, h: 0, line: { color: index === 1 ? '7D39EB' : 'C6FF33', width: 2, transparency: 15 } });
  });
  slide.addText('THE MANUAL LOOP / 30-ROOM KOS', { x: 9.93, y: 6.72, w: 2.82, h: 0.15, fontFace: 'Courier New', fontSize: 7.4, color: '001F3F', transparency: 18, charSpacing: 0.9, margin: 0, isTextBox: true });
  slide.addNotes('Take a 30-room boarding house. Rent arrives through WhatsApp, gets copied into a spreadsheet, then breaks when a tenant pays partially or twice. The manual loop stops at an exception. AI agents could help, but today they act with broad credentials and no proof.');
  await pptx.writeFile({ fileName: PPTX_PATH });
}

(async () => {
  await buildImages();
  await buildPptx();
  console.log(`Created ${PPTX_PATH}`);
  console.log(`Created ${PREVIEW_PATH}`);
})();
