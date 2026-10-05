const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa6");
const { applyTheme } = require("/root/.claude/skills/synced/3353822c-21c5-4d6d-8dd8-a8251c2c7e5f_74c9efee-f268-4e0e-afed-da15ce34a21a/pptx/scripts/apply_theme.js");

const OUT = process.argv[2] || "AI_Research_Accelerator_UT.pptx";

const THEME = {
  name: "Research Ink",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "1B1F24", lt1: "FFFFFF", dk2: "13343B", lt2: "EEF4F3",
    accent1: "F2A541", accent2: "2A9D8F", accent3: "E76F51", accent4: "264653",
    accent5: "8AB17D", accent6: "6C757D", hlink: "2A9D8F", folHlink: "264653",
  },
};
const HEX = THEME.colors;

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10 x 5.625
pres.title = "AI Research Accelerator — Universitas Terbuka";
pres.author = "IYKRA";
pres.company = "PT Pusat Inovasi Nusantara (IYKRA)";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;

const COPY = "© 2026 PT Pusat Inovasi Nusantara (IYKRA). Confidential and proprietary.";

// ---------------------------------------------------------------- layouts
pres.defineSlideMaster({
  title: "COVER",
  background: { color: C.text2 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", align: "left", x: 0.6, y: 1.35, w: 5.6, h: 1.5, fontSize: 40, bold: true, color: C.background1, valign: "bottom", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", align: "left", x: 0.6, y: 3.0, w: 5.6, h: 1.2, fontSize: 18, color: C.accent1, valign: "top", margin: 0 }, text: "" } },
    { text: { text: COPY, options: { x: 0.6, y: 5.1, w: 7, h: 0.3, fontSize: 10, color: C.background2, margin: 0 } } },
  ],
});

pres.defineSlideMaster({
  title: "SECTION",
  background: { color: C.text2 },
  objects: [
    { placeholder: { options: { name: "num", type: "body", align: "left", x: 0.6, y: 1.2, w: 3, h: 1.1, fontSize: 60, bold: true, color: C.accent1, fontFace: "Cambria", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", align: "left", x: 0.6, y: 2.35, w: 8.8, h: 0.9, fontSize: 36, bold: true, color: C.background1, margin: 0, valign: "top" }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", align: "left", x: 0.6, y: 3.3, w: 8.0, h: 0.9, fontSize: 18, color: C.background2, margin: 0, valign: "top" }, text: "" } },
    { text: { text: COPY, options: { x: 0.6, y: 5.1, w: 7, h: 0.3, fontSize: 10, color: C.background2, margin: 0 } } },
  ],
});

pres.defineSlideMaster({
  title: "CLOSING",
  background: { color: C.text2 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", align: "left", x: 0.6, y: 0.9, w: 8.8, h: 0.9, fontSize: 36, bold: true, color: C.background1, margin: 0, valign: "top" }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", align: "left", x: 0.6, y: 1.85, w: 8.8, h: 0.6, fontSize: 18, color: C.accent1, margin: 0, valign: "top" }, text: "" } },
    { text: { text: COPY, options: { x: 0.6, y: 5.1, w: 7, h: 0.3, fontSize: 10, color: C.background2, margin: 0 } } },
  ],
});

pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: C.background1 },
  slideNumber: { x: 9.0, y: 5.15, w: 0.5, h: 0.3, fontSize: 10, color: C.accent6, align: "right" },
  objects: [
    { placeholder: { options: { name: "kicker", type: "body", align: "left", x: 0.5, y: 0.22, w: 9, h: 0.3, fontSize: 11, bold: true, color: C.accent2, margin: 0, charSpacing: 1 }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", align: "left", x: 0.5, y: 0.5, w: 9, h: 0.65, fontSize: 30, bold: true, color: C.text2, margin: 0, valign: "top" }, text: "" } },
    { text: { text: COPY, options: { x: 0.5, y: 5.15, w: 7, h: 0.3, fontSize: 10, color: C.accent6, margin: 0 } } },
  ],
});

// ---------------------------------------------------------------- helpers
async function icon(name, hex, px = 256) {
  const Comp = fa[name];
  if (!Comp) throw new Error("missing icon " + name);
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { color: "#" + hex, size: px }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}
const shadow = () => ({ type: "outer", color: "000000", opacity: 0.12, blur: 6, offset: 2, angle: 90 });

async function iconCircle(slide, name, x, y, d, fill, iconHex, objectName) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { type: "none" }, objectName: objectName + " circle" });
  const pad = d * 0.25;
  slide.addImage({ data: await icon(name, iconHex), x: x + pad, y: y + pad, w: d - 2 * pad, h: d - 2 * pad, altText: objectName, objectName: objectName + " icon" });
}

function card(slide, x, y, w, h, objectName, fill = C.background2, withShadow = false) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.08, fill: { color: fill }, line: { type: "none" },
    shadow: withShadow ? shadow() : undefined, objectName,
  });
}

function txt(slide, text, opts) {
  slide.addText(text, { isTextBox: true, margin: 0, valign: "top", ...opts });
}

function content(section, kicker, title) {
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: section });
  s.addText(kicker, { placeholder: "kicker" });
  s.addText(title, { placeholder: "title" });
  return s;
}

function sectionSlide(section, num, title, body) {
  const s = pres.addSlide({ masterName: "SECTION", sectionTitle: section });
  s.addText(num, { placeholder: "num" });
  s.addText(title, { placeholder: "title" });
  s.addText(body, { placeholder: "body" });
  return s;
}

const SEC = ["Pembuka", "01 Tentang IYKRA", "02 Pendahuluan", "03 UT AI Research Accelerator", "04 Investasi"];

(async () => {
  // ============================================================ 1 Cover
  pres.addSection({ title: SEC[0] });
  let s = pres.addSlide({ masterName: "COVER", sectionTitle: SEC[0] });
  s.addText("AI Research Accelerator", { placeholder: "title" });
  s.addText([
    { text: "Dari Literasi AI menuju Dampak Riset", options: { bold: true, breakLine: true } },
    { text: "Riset akademik dengan Claude Code, Zotero, Scite, dan Flourish", options: { fontSize: 16, color: C.background1, breakLine: true } },
    { text: "Untuk dosen, peneliti, dan mahasiswa pascasarjana Universitas Terbuka · Oktober 2026", options: { fontSize: 14, color: C.background2 } },
  ], { placeholder: "body" });
  // motif: research icons in circles
  const coverIcons = [["FaMagnifyingGlass", 7.15, 1.0], ["FaBookOpen", 8.35, 1.75], ["FaChartColumn", 7.15, 2.5], ["FaPenNib", 8.35, 3.25]];
  for (const [n, x, y] of coverIcons) await iconCircle(s, n, x, y, 1.0, C.accent1, HEX.dk2, "Cover motif " + n);
  s.addNotes("Pembukaan. Program ini adalah kelanjutan dari UT AI Career Accelerator, kini difokuskan pada riset akademik. Peserta belajar memakai Claude Code sebagai agen riset yang terhubung ke Zotero (pustaka), Scite (literatur dan konteks sitasi), dan Flourish (visualisasi) melalui MCP, secara produktif, terverifikasi, dan sesuai etika riset.");

  // ============================================================ 2 Agenda
  s = content(SEC[0], "DAFTAR ISI", "Agenda");
  const agenda = [
    ["01", "Tentang IYKRA", "Kapabilitas dan pengalaman kami dalam AI dan pengembangan talenta"],
    ["02", "Pendahuluan", "AI mengubah cara riset dilakukan, dan kesiapan peneliti tertinggal"],
    ["03", "UT AI Research Accelerator", "Program dari literasi AI hingga output riset siap publikasi"],
    ["04", "Investasi", "Skema implementasi dan cakupan program"],
  ];
  agenda.forEach(([n, t, d], i) => {
    const x = 0.5 + (i % 2) * 4.6, y = 1.45 + Math.floor(i / 2) * 1.75;
    card(s, x, y, 4.4, 1.5, "Agenda card " + n);
    txt(s, n, { x: x + 0.25, y: y + 0.25, w: 0.9, h: 0.7, fontSize: 32, bold: true, color: C.accent2, fontFace: "Cambria" });
    txt(s, t, { x: x + 1.25, y: y + 0.25, w: 2.95, h: 0.4, fontSize: 18, bold: true, color: C.text2 });
    txt(s, d, { x: x + 1.25, y: y + 0.68, w: 2.95, h: 0.7, fontSize: 14, color: C.text1 });
  });
  s.addNotes("Struktur deck mengikuti proposal UT AI Career Accelerator agar mudah dibandingkan.");

  // ============================================================ 3 Section 01
  pres.addSection({ title: SEC[1] });
  sectionSlide(SEC[1], "01", "Tentang IYKRA", "Data, AI, dan pengembangan talenta, selalu dimulai dari kapabilitas manusia");

  // ============================================================ 4 About
  s = content(SEC[1], "01 · TENTANG IYKRA", "9 Tahun Membangun Talenta Data dan AI");
  txt(s, "IYKRA adalah mitra solusi data, AI, dan teknologi yang membantu organisasi mengubah data menjadi insight, solusi digital, dan dampak bisnis yang terukur.", { x: 0.5, y: 1.4, w: 4.2, h: 1.1, fontSize: 15, color: C.text1 });
  const caps = ["Business & AI Advisory", "Data & AI Solution Delivery", "People & Capability Development", "Managed Service & Talent Support", "AI Product Innovation"];
  caps.forEach((c, i) => {
    const y = 2.6 + i * 0.47;
    s.addShape(pres.shapes.OVAL, { x: 0.5, y: y + 0.1, w: 0.18, h: 0.18, fill: { color: C.accent2 }, line: { type: "none" }, objectName: "Capability dot " + (i + 1) });
    txt(s, c, { x: 0.85, y, w: 3.9, h: 0.38, fontSize: 14, color: C.text1, valign: "middle" });
  });
  const stats = [["9+", "Tahun beroperasi"], ["90+", "Klien enterprise"], ["150+", "Proyek"], ["4.500+", "Talenta dikembangkan"]];
  stats.forEach(([v, l], i) => {
    const x = 5.1 + (i % 2) * 2.25, y = 1.4 + Math.floor(i / 2) * 1.8;
    card(s, x, y, 2.05, 1.6, "Stat card " + l);
    txt(s, v, { x: x + 0.2, y: y + 0.25, w: 1.7, h: 0.75, fontSize: 36, bold: true, color: C.text2, fontFace: "Cambria" });
    txt(s, l, { x: x + 0.2, y: y + 1.0, w: 1.7, h: 0.45, fontSize: 14, color: C.text1 });
  });
  s.addNotes("Angka diambil dari proposal UT AI Career Accelerator (Januari 2026). Perbarui jika ada data terbaru.");

  // ============================================================ 5 Section 02
  pres.addSection({ title: SEC[2] });
  sectionSlide(SEC[2], "02", "Pendahuluan", "AI sudah masuk ke setiap tahap riset, tetapi kesiapan peneliti belum mengikuti");

  // ============================================================ 6 Adoption chart
  s = content(SEC[2], "02 · PENDAHULUAN", "Adopsi AI di Kalangan Peneliti Melonjak");
  s.addChart(pres.charts.BAR, [
    { name: "2024", labels: ["Menggunakan AI", "AI untuk riset & publikasi"], values: [57, 45] },
    { name: "2025", labels: ["Menggunakan AI", "AI untuk riset & publikasi"], values: [84, 62] },
  ], {
    x: 0.5, y: 1.35, w: 5.0, h: 3.55, barDir: "col", barGapWidthPct: 60,
    chartColors: [HEX.accent6, HEX.accent2],
    showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: '0"%"', dataLabelFontSize: 12, dataLabelColor: HEX.dk1,
    dataLabelFontFace: "+mn-lt",
    showLegend: true, legendPos: "b", legendFontSize: 12, legendFontFace: "+mn-lt", legendColor: HEX.dk1,
    catAxisLabelColor: HEX.dk1, catAxisLabelFontSize: 12, catAxisLabelFontFace: "+mn-lt",
    valAxisHidden: true, valAxisMaxVal: 100, valAxisMinVal: 0,
    valGridLine: { style: "none" }, catGridLine: { style: "none" },
    showTitle: true, title: "Persentase peneliti (survei global)", titleFontSize: 13, titleColor: HEX.dk2, titleFontFace: "+mn-lt",
    objectName: "Chart AI adoption 2024 vs 2025",
  });
  card(s, 5.85, 1.35, 3.65, 1.65, "Callout efficiency");
  txt(s, "85%", { x: 6.1, y: 1.5, w: 3.2, h: 0.7, fontSize: 36, bold: true, color: C.accent2, fontFace: "Cambria" });
  txt(s, "peneliti merasa AI meningkatkan efisiensi kerja mereka", { x: 6.1, y: 2.2, w: 3.2, h: 0.7, fontSize: 14, color: C.text1 });
  card(s, 5.85, 3.2, 3.65, 1.7, "Callout specialised tools");
  txt(s, "25%", { x: 6.1, y: 3.35, w: 3.2, h: 0.7, fontSize: 36, bold: true, color: C.accent1, fontFace: "Cambria" });
  txt(s, "yang pernah mencoba tools AI khusus riset; 80% masih memakai chatbot umum", { x: 6.1, y: 4.05, w: 3.2, h: 0.8, fontSize: 14, color: C.text1 });
  s.addNotes("Sumber: Wiley ExplanAItions 2025, survei 2.430 peneliti (Agustus 2025). Penggunaan AI naik dari 57% (2024) ke 84% (2025); penggunaan untuk tugas riset dan publikasi naik dari 45% ke 62%. 85% merasa lebih efisien. 80% memakai tools umum seperti ChatGPT, hanya 25% pernah mencoba tools khusus riset.");

  // ============================================================ 7 Readiness gap
  s = content(SEC[2], "02 · PENDAHULUAN", "Adopsi Cepat, Kesiapan Tertinggal");
  const gaps = [
    ["64%", "khawatir soal akurasi dan hallucination AI", C.accent3, "FaTriangleExclamation"],
    ["58%", "khawatir soal privasi dan keamanan data", C.accent3, "FaLock"],
    ["57%", "menyebut kurangnya pedoman dan pelatihan sebagai hambatan utama", C.accent1, "FaChalkboardUser"],
    ["55%", "sitasi buatan GPT-3.5 terbukti fiktif (GPT-4: 18%)", C.accent1, "FaFileCircleXmark"],
  ];
  for (let i = 0; i < gaps.length; i++) {
    const [v, l, col, ic] = gaps[i];
    const x = 0.5 + i * 2.3;
    card(s, x, 1.4, 2.1, 2.55, "Gap card " + (i + 1));
    await iconCircle(s, ic, x + 0.2, 1.6, 0.6, col, "FFFFFF", "Gap " + (i + 1));
    txt(s, v, { x: x + 0.2, y: 2.3, w: 1.75, h: 0.65, fontSize: 32, bold: true, color: C.text2, fontFace: "Cambria" });
    txt(s, l, { x: x + 0.2, y: 2.95, w: 1.75, h: 0.95, fontSize: 14, color: C.text1 });
  }
  txt(s, [
    { text: "Artinya: ", options: { bold: true, color: C.text2 } },
    { text: "kebutuhannya bukan sekadar akses ke AI, melainkan kemampuan memakai AI secara benar, terverifikasi, dan sesuai etika riset.", options: { color: C.text1 } },
  ], { x: 0.5, y: 4.15, w: 9, h: 0.6, fontSize: 15 });
  txt(s, "Sumber: Wiley ExplanAItions 2025; Walters & Wilder (2023), Scientific Reports", { x: 0.5, y: 4.8, w: 9, h: 0.28, fontSize: 10, color: C.accent6 });
  s.addNotes("Wiley ExplanAItions 2025: kekhawatiran akurasi/hallucination naik dari 51% ke 64%, privasi dan keamanan dari 47% ke 58%; 57% menyebut kurangnya pedoman dan pelatihan. Walters & Wilder (2023), 'Fabrication and errors in the bibliographic citations generated by ChatGPT', Scientific Reports: 55% sitasi GPT-3.5 dan 18% sitasi GPT-4 fiktif.");

  // ============================================================ 8 Framework
  s = content(SEC[2], "02 · PENDAHULUAN", "Dari Pengguna AI menjadi Peneliti AI-Ready");
  const fw = [
    ["01", "UNDERSTAND", "Memahami cara kerja AI, batasannya, dan kebijakan penggunaannya dalam riset", "FaBrain"],
    ["02", "APPLY", "Menggunakan tools AI yang tepat di setiap tahap riset", "FaScrewdriverWrench"],
    ["03", "VERIFY", "Memvalidasi sumber, data, dan hasil analisis dari AI", "FaListCheck"],
    ["04", "PUBLISH", "Menghasilkan output riset yang transparan dan siap publikasi", "FaFileSignature"],
  ];
  for (let i = 0; i < fw.length; i++) {
    const [n, t, d, ic] = fw[i];
    const x = 0.5 + i * 2.3;
    card(s, x, 1.45, 2.1, 3.3, "Framework card " + t, C.background2);
    await iconCircle(s, ic, x + 0.2, 1.65, 0.7, C.text2, HEX.accent1, "Framework " + t);
    txt(s, n, { x: x + 1.1, y: 1.75, w: 0.8, h: 0.5, fontSize: 24, bold: true, color: C.accent2, fontFace: "Cambria", align: "right" });
    txt(s, t, { x: x + 0.2, y: 2.55, w: 1.75, h: 0.4, fontSize: 17, bold: true, color: C.text2 });
    txt(s, d, { x: x + 0.2, y: 3.0, w: 1.75, h: 1.6, fontSize: 14, color: C.text1 });
  }
  s.addNotes("Kerangka ini paralel dengan Understand–Apply–Solve–Reflect pada program karier, disesuaikan untuk siklus riset. Tahap VERIFY sengaja dibuat eksplisit karena risiko terbesar AI dalam riset adalah sumber dan angka yang tidak terverifikasi.");

  // ============================================================ 9 Section 03
  pres.addSection({ title: SEC[3] });
  sectionSlide(SEC[3], "03", "UT AI Research Accelerator", "Program dari literasi AI hingga output riset yang siap publikasi");

  // ============================================================ 10 Overview
  s = content(SEC[3], "03 · PROGRAM OVERVIEW", "Lima Komponen Program");
  const comps = [
    ["01", "Research AI Readiness Assessment", "Mengukur baseline pengetahuan, penggunaan, dan pemahaman integritas riset terkait AI", "FaClipboardCheck"],
    ["02", "AI Research Foundations", "Fondasi AI untuk riset dan setup Claude Code dengan Zotero, Scite, dan Flourish", "FaBookOpen"],
    ["03", "AI-Assisted Research Clinic", "Menerapkan research AI stack pada proyek riset peserta, dari pertanyaan hingga draf", "FaFlask"],
    ["04", "Research Output & Integrity", "Mengubah hasil kerja menjadi output riset yang transparan dan siap publikasi", "FaFileSignature"],
    ["05", "Program Reporting", "Laporan partisipasi, perkembangan kemampuan, dan output riset untuk UT", "FaChartLine"],
  ];
  for (let i = 0; i < comps.length; i++) {
    const [n, t, d, ic] = comps[i];
    const y = 1.35 + i * 0.73;
    await iconCircle(s, ic, 0.5, y + 0.05, 0.55, i === 4 ? C.accent6 : C.accent2, "FFFFFF", "Component " + n);
    txt(s, n, { x: 1.25, y: y + 0.1, w: 0.5, h: 0.45, fontSize: 18, bold: true, color: C.accent1, fontFace: "Cambria" });
    txt(s, t, { x: 1.8, y: y + 0.12, w: 3.2, h: 0.45, fontSize: 16, bold: true, color: C.text2 });
    txt(s, d, { x: 5.05, y: y + 0.05, w: 4.45, h: 0.6, fontSize: 14, color: C.text1, valign: "middle" });
  }
  s.addNotes("Strukturnya sejajar dengan program karier: assessment, fondasi, aplikasi, output, reporting. Bedanya, aplikasi dilakukan pada proyek riset nyata milik peserta.");

  // ============================================================ Research AI stack
  s = content(SEC[3], "03 · RESEARCH AI STACK", "Claude Code sebagai Pusat Alur Riset");
  const hub = { x: 3.6, y: 2.15, w: 2.8, h: 1.35 };
  const spokes = [
    ["Scite", "Cari literatur dan cek konteks sitasi: mendukung atau membantah", "FaQuoteRight", 0.5, 1.35],
    ["Zotero", "Kelola pustaka, PDF, dan format sitasi", "FaBookBookmark", 6.7, 1.35],
    ["Flourish", "Visualisasi interaktif yang siap dipublikasikan", "FaChartPie", 0.5, 3.65],
    ["Python / R", "Analisis data yang dijalankan dan diperiksa ulang", "FaCode", 6.7, 3.65],
  ];
  for (const [t, d, ic, x, y] of spokes) {
    const cx = x < 3 ? x + 2.8 : x, cy = y + 0.55;
    const hx = x < 3 ? hub.x : hub.x + hub.w, hy = hub.y + hub.h / 2;
    s.addShape(pres.shapes.LINE, { x: Math.min(cx, hx), y: Math.min(cy, hy), w: Math.abs(hx - cx), h: Math.abs(hy - cy), flipV: (cy > hy) !== (cx > hx), line: { color: C.accent6, width: 1.25, dashType: "dash" }, objectName: "Connector " + t });
  }
  for (const [t, d, ic, x, y] of spokes) {
    card(s, x, y, 2.8, 1.1, "Stack card " + t, C.background1, true);
    await iconCircle(s, ic, x + 0.15, y + 0.2, 0.6, C.accent2, "FFFFFF", "Stack " + t);
    txt(s, t, { x: x + 0.9, y: y + 0.12, w: 1.8, h: 0.3, fontSize: 15, bold: true, color: C.text2 });
    txt(s, d, { x: x + 0.9, y: y + 0.42, w: 1.8, h: 0.65, fontSize: 12, color: C.text1 });
  }
  card(s, hub.x, hub.y, hub.w, hub.h, "Hub Claude Code", C.text2);
  await iconCircle(s, "FaTerminal", hub.x + 0.2, hub.y + 0.35, 0.65, C.accent1, HEX.dk2, "Hub icon");
  txt(s, "Claude Code", { x: hub.x + 1.0, y: hub.y + 0.28, w: 1.7, h: 0.4, fontSize: 18, bold: true, color: C.background1 });
  txt(s, "Agen riset, terhubung via MCP", { x: hub.x + 1.0, y: hub.y + 0.68, w: 1.7, h: 0.55, fontSize: 12, color: C.background2 });
  txt(s, [
    { text: "Pendukung sesuai kebutuhan: ", options: { bold: true, color: C.text2 } },
    { text: "Undermind, Semantic Scholar, NotebookLM, Quarto, GitHub", options: { color: C.text1 } },
  ], { x: 3.6, y: 3.75, w: 2.8, h: 1.0, fontSize: 12, align: "center" });
  s.addNotes("Claude Code adalah agen AI dari Anthropic yang bekerja langsung dengan file, menjalankan kode, dan terhubung ke tools lain melalui Model Context Protocol (MCP). Scite dan Flourish menyediakan connector MCP resmi untuk Claude (Scite membutuhkan langganan premium). Zotero terhubung melalui server MCP open-source yang memakai API lokal Zotero 7 atau Zotero Web API. Tools pendukung dipilih sesuai bidang dan lisensi UT.");

  // ============================================================ Why Claude Code
  s = content(SEC[3], "03 · RESEARCH AI STACK", "Mengapa Claude Code untuk Riset");
  const why = [
    ["Bekerja dengan file lokal", "Membaca PDF, dataset, dan draf di folder proyek peneliti", "FaFolderOpen"],
    ["Terhubung ke tools riset", "Scite, Zotero, dan Flourish dipanggil langsung lewat MCP", "FaPlug"],
    ["Alur kerja dapat diulang", "Skrip analisis dan perintah tersimpan sehingga hasil bisa direproduksi", "FaArrowsRotate"],
    ["Jejak kerja dapat diaudit", "Setiap langkah tercatat, memudahkan pernyataan penggunaan AI", "FaClipboardList"],
  ];
  for (let i = 0; i < why.length; i++) {
    const [t, d, ic] = why[i];
    const x = 0.5 + (i % 2) * 4.6, y = 1.4 + Math.floor(i / 2) * 1.6;
    card(s, x, y, 4.4, 1.4, "Why card " + (i + 1));
    await iconCircle(s, ic, x + 0.25, y + 0.35, 0.7, C.text2, HEX.accent1, "Why " + (i + 1));
    txt(s, t, { x: x + 1.15, y: y + 0.22, w: 3.05, h: 0.4, fontSize: 16, bold: true, color: C.text2 });
    txt(s, d, { x: x + 1.15, y: y + 0.65, w: 3.05, h: 0.65, fontSize: 14, color: C.text1 });
  }
  txt(s, "Peserta tidak perlu latar belakang pemrograman: Claude Code tersedia di terminal, aplikasi desktop, dan web.", { x: 0.5, y: 4.65, w: 9, h: 0.35, fontSize: 14, color: C.accent6 });
  s.addNotes("Pembeda utama dari chatbot biasa: Claude Code bekerja di dalam folder proyek riset, menjalankan analisis yang bisa diulang, dan meninggalkan jejak kerja yang mendukung transparansi. Tekankan bahwa peserta non-programmer tetap bisa memakainya dengan instruksi bahasa sehari-hari.");

  // ============================================================ 11 Participants
  s = content(SEC[3], "03 · PESERTA", "Tiga Jalur Peserta");
  const tracks = [
    ["Dosen & Peneliti", "FaChalkboardUser", "Hibah, publikasi jurnal, dan pengabdian masyarakat", "Draf artikel atau proposal hibah"],
    ["Mahasiswa Pascasarjana", "FaUserGraduate", "Tesis dan disertasi: tinjauan pustaka, metode, dan analisis", "Bab tinjauan pustaka atau rancangan metode"],
    ["Mahasiswa Tugas Akhir S1", "FaGraduationCap", "Karya ilmiah dan tugas akhir program", "Proposal penelitian yang lebih kuat"],
  ];
  for (let i = 0; i < tracks.length; i++) {
    const [t, ic, f, o] = tracks[i];
    const x = 0.5 + i * 3.07;
    card(s, x, 1.4, 2.87, 3.45, "Track card " + t, C.background1, true);
    await iconCircle(s, ic, x + 0.25, 1.6, 0.7, C.accent1, HEX.dk2, "Track " + t);
    txt(s, t, { x: x + 0.25, y: 2.4, w: 2.4, h: 0.65, fontSize: 17, bold: true, color: C.text2 });
    txt(s, "Fokus", { x: x + 0.25, y: 3.1, w: 2.4, h: 0.25, fontSize: 11, bold: true, color: C.accent2 });
    txt(s, f, { x: x + 0.25, y: 3.35, w: 2.4, h: 0.65, fontSize: 14, color: C.text1 });
    txt(s, "Output", { x: x + 0.25, y: 4.02, w: 2.4, h: 0.25, fontSize: 11, bold: true, color: C.accent2 });
    txt(s, o, { x: x + 0.25, y: 4.27, w: 2.4, h: 0.5, fontSize: 14, color: C.text1 });
  }
  s.addNotes("Materi inti sama untuk semua jalur; kasus, contoh, dan output disesuaikan per jalur. Komposisi peserta per jalur dikonfirmasi bersama UT.");

  // ============================================================ 12 Learning model
  s = content(SEC[3], "03 · LEARNING MODEL", "Fleksibel, Terstruktur, Berbasis Proyek Riset");
  const lm = [
    ["ASYNCHRONOUS", "Self-paced Learning", ["Video & bahan bacaan", "Latihan dengan tools AI", "Kuis pemahaman"], "FaLaptop"],
    ["LIVE", "Interactive Workshop", ["Demo alur riset dengan AI", "Praktik terpandu", "Diskusi & tanya jawab"], "FaUsers"],
    ["CLINIC", "Research Mentoring", ["Kelompok kecil per bidang", "Review proyek peserta", "Umpan balik dari mentor"], "FaComments"],
  ];
  for (let i = 0; i < lm.length; i++) {
    const [k, t, items, ic] = lm[i];
    const x = 0.5 + i * 3.07;
    card(s, x, 1.4, 2.87, 2.75, "Model card " + k);
    await iconCircle(s, ic, x + 0.25, 1.6, 0.6, C.text2, HEX.accent1, "Model " + k);
    txt(s, k, { x: x + 1.0, y: 1.62, w: 1.7, h: 0.25, fontSize: 11, bold: true, color: C.accent2 });
    txt(s, t, { x: x + 1.0, y: 1.87, w: 1.75, h: 0.4, fontSize: 16, bold: true, color: C.text2 });
    txt(s, items.map((it, j) => ({ text: it, options: { bullet: true, breakLine: j < items.length - 1 } })), { x: x + 0.25, y: 2.45, w: 2.45, h: 1.6, fontSize: 14, color: C.text1, paraSpaceAfter: 4 });
  }
  const tags = [["BERBASIS PROYEK NYATA", "Peserta bekerja pada riset mereka sendiri"], ["SESUAI ETIKA RISET", "Selaras dengan kebijakan penerbit dan integritas akademik"]];
  tags.forEach(([k, d], i) => {
    const x = 0.5 + i * 4.6;
    txt(s, k, { x, y: 4.35, w: 4.4, h: 0.25, fontSize: 11, bold: true, color: C.accent2 });
    txt(s, d, { x, y: 4.6, w: 4.4, h: 0.35, fontSize: 14, color: C.text1 });
  });
  s.addNotes("Research clinic adalah pembeda utama dari kursus AI umum: peserta membawa proyek riset sendiri dan mendapat umpan balik langsung.");

  // ============================================================ 13 Assessment
  s = content(SEC[3], "03 · ASSESSMENT", "Research AI Readiness Assessment");
  const stages = [["BASELINE", "Kondisi awal sebelum program"], ["CHECKPOINT", "Perkembangan setelah fondasi"], ["ENDLINE", "Perubahan dibanding baseline"]];
  stages.forEach(([t, d], i) => {
    const y = 1.4 + i * 1.18;
    s.addShape(pres.shapes.OVAL, { x: 0.5, y, w: 0.6, h: 0.6, fill: { color: C.accent2 }, line: { type: "none" }, objectName: "Stage dot " + t });
    txt(s, String(i + 1), { x: 0.5, y, w: 0.6, h: 0.6, fontSize: 18, bold: true, color: C.background1, align: "center", valign: "middle" });
    txt(s, t, { x: 1.25, y: y + 0.02, w: 2.3, h: 0.3, fontSize: 15, bold: true, color: C.text2 });
    txt(s, d, { x: 1.25, y: y + 0.33, w: 2.3, h: 0.6, fontSize: 14, color: C.text1 });
  });
  const qs = [
    ["AI Knowledge", "Manakah cara paling tepat memverifikasi referensi yang disarankan AI?"],
    ["AI Usage in Research", "Dalam 30 hari terakhir, seberapa sering Anda memakai AI untuk mencari atau merangkum literatur?"],
    ["Research Integrity", "Apakah Anda tahu kebijakan jurnal target Anda tentang pengungkapan penggunaan AI?"],
    ["AI Application", "Anda perlu meninjau 20 artikel. Alur penggunaan AI mana yang paling tepat?"],
  ];
  qs.forEach(([t, q], i) => {
    const x = 3.8 + (i % 2) * 2.9, y = 1.4 + Math.floor(i / 2) * 1.8;
    card(s, x, y, 2.7, 1.6, "Question card " + t);
    txt(s, t, { x: x + 0.2, y: y + 0.15, w: 2.3, h: 0.3, fontSize: 13, bold: true, color: C.accent2 });
    txt(s, q, { x: x + 0.2, y: y + 0.48, w: 2.3, h: 1.05, fontSize: 14, color: C.text1 });
  });
  s.addNotes("Contoh butir untuk empat dimensi. Butir pengetahuan dan aplikasi disusun dalam dua versi paralel untuk baseline dan endline.");

  // ============================================================ 14 Phase 1
  s = content(SEC[3], "03 · PHASE 1 · ±6 JAM · ASYNCHRONOUS", "AI Research Foundations");
  const mods = [
    ["AI & LLM untuk Riset", "Cara kerja, kemampuan, batasan, hallucination", "FaBrain"],
    ["Integritas & Kebijakan AI", "Disclosure, plagiarisme, kebijakan penerbit, data responden", "FaScaleBalanced"],
    ["Prompting & Alur Kerja Agen", "Instruksi bertahap, konteks proyek, perintah yang dapat dipakai ulang", "FaListOl"],
    ["Setup Claude Code & MCP", "Instalasi, lalu koneksi ke Zotero, Scite, dan Flourish", "FaPlug"],
  ];
  for (let i = 0; i < mods.length; i++) {
    const [t, d, ic] = mods[i];
    const x = 0.5 + (i % 2) * 4.6, y = 1.4 + Math.floor(i / 2) * 1.5;
    card(s, x, y, 4.4, 1.3, "Module card " + t);
    await iconCircle(s, ic, x + 0.25, y + 0.3, 0.7, C.accent2, "FFFFFF", "Module " + t);
    txt(s, `0${i + 1}  ${t}`, { x: x + 1.15, y: y + 0.2, w: 3.1, h: 0.4, fontSize: 16, bold: true, color: C.text2 });
    txt(s, d, { x: x + 1.15, y: y + 0.62, w: 3.1, h: 0.6, fontSize: 14, color: C.text1 });
  }
  txt(s, [
    { text: "Learning output: ", options: { bold: true, color: C.text2 } },
    { text: "peserta memakai AI untuk riset secara efektif, kritis, dan sesuai etika akademik.", options: { color: C.text1 } },
  ], { x: 0.5, y: 4.5, w: 9, h: 0.45, fontSize: 15 });
  s.addNotes("Fase 1 menyamakan fondasi. Modul integritas ditempatkan di awal, sebelum toolkit, agar praktik yang benar terbentuk sejak awal.");

  // ============================================================ 15 Phase 2 workflow
  s = content(SEC[3], "03 · PHASE 2 · ±6 JAM · LIVE + CLINIC", "AI-Assisted Research Clinic");
  const steps = [
    ["QUESTION", "Merumuskan pertanyaan dan celah riset"],
    ["LITERATURE", "Menelusuri dan memetakan literatur"],
    ["METHOD", "Merancang metode dan instrumen"],
    ["ANALYZE", "Mengolah data kuantitatif dan kualitatif"],
    ["VERIFY", "Memeriksa sumber, hasil, dan bias"],
    ["WRITE", "Menyusun draf dan pernyataan penggunaan AI"],
  ];
  steps.forEach(([t, d], i) => {
    const x = 0.5 + (i % 3) * 3.07, y = 1.4 + Math.floor(i / 3) * 1.55;
    const isVerify = t === "VERIFY";
    card(s, x, y, 2.87, 1.35, "Step card " + t, isVerify ? C.text2 : C.background2);
    txt(s, String(i + 1), { x: x + 0.2, y: y + 0.15, w: 0.5, h: 0.55, fontSize: 28, bold: true, color: C.accent1, fontFace: "Cambria" });
    txt(s, t, { x: x + 0.75, y: y + 0.22, w: 1.95, h: 0.35, fontSize: 16, bold: true, color: isVerify ? C.background1 : C.text2 });
    txt(s, d, { x: x + 0.2, y: y + 0.72, w: 2.5, h: 0.6, fontSize: 14, color: isVerify ? C.background2 : C.text1 });
  });
  txt(s, [
    { text: "Output: ", options: { bold: true, color: C.text2 } },
    { text: "setiap peserta memajukan satu proyek riset nyata dengan bantuan AI yang terdokumentasi dan terverifikasi.", options: { color: C.text1 } },
  ], { x: 0.5, y: 4.55, w: 9, h: 0.45, fontSize: 15 });
  s.addNotes("Dua sesi live (alur riset dan demo) ditambah clinic kelompok kecil per bidang. Tahap VERIFY disorot karena di sinilah AI paling sering menyesatkan.");

  // ============================================================ 16 Tools table
  s = content(SEC[3], "03 · PHASE 2 · TOOLKIT", "Tools per Tahap Riset dan Apa yang Diverifikasi");
  const head = (t) => ({ text: t, options: { bold: true, color: C.background1, fill: { color: C.text2 }, fontSize: 14 } });
  const cell = (t, bold) => ({ text: t, options: { fontSize: 14, color: C.text1, bold: !!bold } });
  const rows = [
    [head("Tahap"), head("Contoh tools"), head("Wajib diverifikasi")],
    [cell("Literatur", 1), cell("Scite via MCP, Undermind, Semantic Scholar"), cell("Sumber ada; konteks sitasi mendukung atau membantah")],
    [cell("Pustaka & sitasi", 1), cell("Zotero via MCP"), cell("Metadata lengkap dan format sitasi benar")],
    [cell("Analisis data", 1), cell("Claude Code menjalankan Python/R"), cell("Kode dibaca ulang, hasil direproduksi")],
    [cell("Visualisasi", 1), cell("Flourish via MCP"), cell("Angka di grafik sesuai data sumber")],
    [cell("Penulisan", 1), cell("Claude Code + Markdown/Quarto"), cell("Orisinalitas, sitasi dari Zotero, disclosure")],
  ];
  s.addTable(rows, {
    x: 0.5, y: 1.4, w: 9, colW: [1.9, 3.5, 3.6], rowH: 0.5,
    border: { type: "solid", pt: 0.75, color: HEX.lt2 }, fill: { color: HEX.lt1 }, valign: "middle", margin: 0.08,
    objectName: "Tools table",
  });
  txt(s, "Tools dapat disesuaikan dengan langganan dan lisensi yang dimiliki UT.", { x: 0.5, y: 4.75, w: 9, h: 0.3, fontSize: 12, color: C.accent6 });
  s.addNotes("Inti stack: Claude Code + Scite + Zotero + Flourish; tools lain ditambahkan sesuai bidang. Smart Citations Scite menunjukkan apakah sebuah paper dikutip untuk mendukung atau membantah, sehingga verifikasi bukan sekadar mengecek keberadaan sumber. Prinsipnya: AI boleh mempercepat setiap tahap, tetapi kolom kanan selalu dikerjakan oleh peneliti.");

  // ============================================================ 17 Case example
  s = content(SEC[3], "03 · CASE EXAMPLE", "Tinjauan Pustaka Sistematis dengan AI");
  card(s, 0.5, 1.4, 3.1, 3.5, "Case problem panel", C.text2);
  txt(s, "PROBLEM", { x: 0.75, y: 1.6, w: 2.6, h: 0.3, fontSize: 12, bold: true, color: C.accent1 });
  txt(s, "Seorang dosen ingin memetakan riset tentang pembelajaran jarak jauh di Indonesia periode 2020–2025.", { x: 0.75, y: 1.95, w: 2.6, h: 1.6, fontSize: 16, color: C.background1 });
  txt(s, "Output: draf tinjauan pustaka dengan diagram PRISMA dan pernyataan penggunaan AI", { x: 0.75, y: 3.7, w: 2.6, h: 1.0, fontSize: 14, color: C.background2 });
  const cs = [
    ["TELUSURI", "Claude Code mencari via Scite, ditambah Garuda"],
    ["SIMPAN", "Artikel terpilih masuk koleksi Zotero"],
    ["SARING", "AI membantu screening; peneliti memutuskan"],
    ["EKSTRAKSI", "Claude Code menyusun tabel temuan"],
    ["VISUALISASI", "Tren dan peta temuan dibuat di Flourish"],
    ["SINTESIS", "Draf bersitasi Zotero, PRISMA, disclosure"],
  ];
  cs.forEach(([t, d], i) => {
    const x = 3.85 + (i % 2) * 2.85, y = 1.4 + Math.floor(i / 2) * 1.2;
    s.addShape(pres.shapes.OVAL, { x, y: y + 0.05, w: 0.5, h: 0.5, fill: { color: C.accent2 }, line: { type: "none" }, objectName: "Case step dot " + (i + 1) });
    txt(s, String(i + 1), { x, y: y + 0.05, w: 0.5, h: 0.5, fontSize: 16, bold: true, color: C.background1, align: "center", valign: "middle" });
    txt(s, t, { x: x + 0.65, y: y + 0.05, w: 2.0, h: 0.3, fontSize: 15, bold: true, color: C.text2 });
    txt(s, d, { x: x + 0.65, y: y + 0.38, w: 2.0, h: 0.75, fontSize: 14, color: C.text1 });
  });
  s.addNotes("Contoh kasus untuk clinic, seluruhnya dijalankan dari satu folder proyek di Claude Code. Verifikasi dilakukan di setiap langkah: cek DOI dan Smart Citations Scite, baca ulang sampel artikel, dan cocokkan angka grafik dengan tabel. Keputusan inklusi dan interpretasi tetap milik peneliti.");

  // ============================================================ 18 Phase 3
  s = content(SEC[3], "03 · PHASE 3 · ±2 JAM · ASYNC + KONSULTASI", "Research Output & Integrity");
  const outs = [
    ["Research Output", "Draf artikel, proposal hibah, atau bab tesis", "FaFileLines"],
    ["AI Disclosure & Log", "Pernyataan dan catatan penggunaan AI", "FaFileSignature"],
    ["Data & Privacy Plan", "Pengelolaan data riset dan data responden", "FaDatabase"],
    ["90-Day Research Roadmap", "Target jurnal, hibah, dan linimasa", "FaRoute"],
  ];
  for (let i = 0; i < outs.length; i++) {
    const [t, d, ic] = outs[i];
    const x = 0.5 + i * 2.3;
    card(s, x, 1.4, 2.1, 2.75, "Output card " + t, C.background1, true);
    await iconCircle(s, ic, x + 0.2, 1.6, 0.65, C.accent1, HEX.dk2, "Output " + t);
    txt(s, t, { x: x + 0.2, y: 2.4, w: 1.75, h: 0.7, fontSize: 16, bold: true, color: C.text2 });
    txt(s, d, { x: x + 0.2, y: 3.1, w: 1.75, h: 0.95, fontSize: 14, color: C.text1 });
  }
  txt(s, [
    { text: "Outcome: ", options: { bold: true, color: C.text2 } },
    { text: "peserta menghasilkan output riset nyata dan mampu menjelaskan secara transparan bagaimana AI dipakai.", options: { color: C.text1 } },
  ], { x: 0.5, y: 4.4, w: 9, h: 0.55, fontSize: 15 });
  s.addNotes("Fase 3 setara dengan Career Preparation pada program karier: mengubah pengalaman menjadi output yang bernilai, di sini berupa output riset dan dokumen integritas.");

  // ============================================================ 19 Guardrails
  s = content(SEC[3], "03 · INTEGRITAS RISET", "AI Membantu, Peneliti Bertanggung Jawab");
  const gr = [
    ["AI bukan penulis", "Sejalan dengan posisi COPE dan kebijakan penerbit besar", "FaUserCheck"],
    ["Ungkapkan penggunaan AI", "Sesuai ketentuan jurnal atau lembaga pemberi hibah", "FaBullhorn"],
    ["Verifikasi sumber dan angka", "Tidak ada referensi atau hasil yang dipakai tanpa dicek", "FaMagnifyingGlass"],
    ["Lindungi data responden", "Tidak mengunggah data identitas ke tools AI publik", "FaShieldHalved"],
  ];
  for (let i = 0; i < gr.length; i++) {
    const [t, d, ic] = gr[i];
    const x = 0.5 + (i % 2) * 4.6, y = 1.4 + Math.floor(i / 2) * 1.6;
    await iconCircle(s, ic, x, y + 0.1, 0.75, C.text2, HEX.accent1, "Guardrail " + (i + 1));
    txt(s, t, { x: x + 0.95, y: y + 0.1, w: 3.4, h: 0.4, fontSize: 17, bold: true, color: C.text2 });
    txt(s, d, { x: x + 0.95, y: y + 0.52, w: 3.4, h: 0.75, fontSize: 14, color: C.text1 });
  }
  s.addNotes("COPE Position Statement 'Authorship and AI tools' (2023): AI tidak dapat dicantumkan sebagai penulis; penggunaan AI harus diungkapkan. Penerbit besar seperti Springer Nature dan Elsevier menerapkan prinsip serupa. Cek kebijakan terbaru jurnal target sebelum sesi.");

  // ============================================================ 20 Reporting
  s = content(SEC[3], "03 · PROGRAM REPORTING", "Visibilitas Penuh untuk UT");
  const rep = [
    ["Partisipasi", "Registrasi, kehadiran, dan penyelesaian per jalur", "FaUsers"],
    ["Readiness", "Perubahan skor baseline ke endline per dimensi", "FaChartLine"],
    ["Output Riset", "Jumlah draf artikel, proposal hibah, dan bab tesis", "FaFileLines"],
    ["Integritas", "Kelengkapan disclosure dan log penggunaan AI", "FaScaleBalanced"],
  ];
  for (let i = 0; i < rep.length; i++) {
    const [t, d, ic] = rep[i];
    const x = 0.5 + i * 2.3;
    card(s, x, 1.4, 2.1, 2.3, "Report card " + t);
    await iconCircle(s, ic, x + 0.2, 1.6, 0.6, C.accent2, "FFFFFF", "Report " + t);
    txt(s, t, { x: x + 0.2, y: 2.35, w: 1.75, h: 0.4, fontSize: 16, bold: true, color: C.text2 });
    txt(s, d, { x: x + 0.2, y: 2.75, w: 1.75, h: 0.9, fontSize: 14, color: C.text1 });
  }
  const tl = [["Laporan awal", "Profil peserta & baseline"], ["Laporan progres", "Penyelesaian & checkpoint"], ["Laporan akhir", "Endline, output & rekomendasi"]];
  s.addShape(pres.shapes.LINE, { x: 0.62, y: 4.0, w: 8.0, h: 0, line: { color: C.accent6, width: 1.5 }, objectName: "Timeline line" });
  tl.forEach(([t, d], i) => {
    const x = 0.5 + i * 3.07;
    s.addShape(pres.shapes.OVAL, { x, y: 3.88, w: 0.24, h: 0.24, fill: { color: C.accent1 }, line: { type: "none" }, objectName: "Timeline dot " + (i + 1) });
    txt(s, t, { x, y: 4.22, w: 2.8, h: 0.3, fontSize: 14, bold: true, color: C.text2 });
    txt(s, d, { x, y: 4.52, w: 2.8, h: 0.45, fontSize: 14, color: C.text1 });
  });
  s.addNotes("Format dan frekuensi laporan dapat diselaraskan dengan kebutuhan LPPM UT.");

  // ============================================================ 21 Section 04
  pres.addSection({ title: SEC[4] });
  sectionSlide(SEC[4], "04", "Investasi", "Skema implementasi dan cakupan program");

  // ============================================================ 22 Investment
  s = content(SEC[4], "04 · INVESTASI", "Program Investment");
  txt(s, "Investasi program ditanggung oleh Universitas Terbuka sebagai bagian dari inisiatif penguatan kapasitas riset berbasis AI.", { x: 0.5, y: 1.4, w: 5.2, h: 0.8, fontSize: 15, color: C.text1 });
  txt(s, "INVESTMENT INCLUDES", { x: 0.5, y: 2.35, w: 5.2, h: 0.3, fontSize: 12, bold: true, color: C.accent2 });
  const inc = ["Desain program dan konten", "Async learning dan live workshop", "Research clinic dan mentoring", "Panduan setup Claude Code, Zotero, Scite, Flourish", "Assessment dan dukungan output riset", "Program reporting"];
  txt(s, inc.map((t, j) => ({ text: t, options: { bullet: true, breakLine: j < inc.length - 1 } })), { x: 0.5, y: 2.7, w: 5.2, h: 2.3, fontSize: 14, color: C.text1, paraSpaceAfter: 4 });
  card(s, 6.0, 1.4, 3.5, 3.55, "Investment panel", C.text2);
  txt(s, "UT AI RESEARCH ACCELERATOR", { x: 6.25, y: 1.6, w: 3.0, h: 0.3, fontSize: 12, bold: true, color: C.accent1 });
  txt(s, "Cakupan program", { x: 6.25, y: 2.0, w: 3.0, h: 0.3, fontSize: 14, color: C.background2 });
  txt(s, "Hingga 300 peserta", { x: 6.25, y: 2.3, w: 3.0, h: 0.5, fontSize: 24, bold: true, color: C.background1, fontFace: "Cambria" });
  txt(s, "dosen, peneliti, dan mahasiswa pascasarjana", { x: 6.25, y: 2.8, w: 3.0, h: 0.6, fontSize: 14, color: C.background2 });
  txt(s, "Nilai investasi", { x: 6.25, y: 3.55, w: 3.0, h: 0.3, fontSize: 14, color: C.background2 });
  txt(s, "Disusun setelah konfirmasi jumlah peserta dan cakupan", { x: 6.25, y: 3.85, w: 3.0, h: 0.9, fontSize: 15, bold: true, color: C.background1 });
  s.addNotes("Usulan cakupan 300 peserta adalah asumsi awal untuk diskusi; research clinic membutuhkan kelompok kecil sehingga skalanya lebih kecil dari program karier (1.000 mahasiswa). Nilai investasi sengaja belum dicantumkan. Catatan biaya: langganan Claude dan Scite Premium belum termasuk dan perlu diputuskan (disediakan UT atau oleh peserta); Zotero dan akun Flourish dasar gratis.");

  // ============================================================ 23 Next steps
  s = pres.addSlide({ masterName: "CLOSING", sectionTitle: SEC[4] });
  s.addText("Langkah Selanjutnya", { placeholder: "title" });
  s.addText("Mari mulai dari pilot yang terukur", { placeholder: "body" });
  const ns = [["Diskusi kebutuhan", "Prioritas bidang riset UT"], ["Konfirmasi cakupan", "Jumlah peserta dan jadwal"], ["Pilot batch", "±50 peserta, 1 siklus"], ["Skala penuh", "Berdasarkan hasil pilot"]];
  ns.forEach(([t, d], i) => {
    const x = 0.6 + i * 2.25;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 2.8, w: 2.05, h: 1.95, rectRadius: 0.08, fill: { color: C.accent4 }, line: { type: "none" }, objectName: "Next step card " + (i + 1) });
    txt(s, `0${i + 1}`, { x: x + 0.2, y: 3.0, w: 1.7, h: 0.5, fontSize: 24, bold: true, color: C.accent1, fontFace: "Cambria" });
    txt(s, t, { x: x + 0.2, y: 3.55, w: 1.7, h: 0.6, fontSize: 16, bold: true, color: C.background1 });
    txt(s, d, { x: x + 0.2, y: 4.15, w: 1.7, h: 0.5, fontSize: 14, color: C.background2 });
  });
  s.addNotes("Penutup. Usulkan pilot kecil terlebih dahulu untuk menguji materi dan mengukur dampak sebelum skala penuh.");

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("wrote", OUT);
})().catch((e) => { console.error(e); process.exit(1); });
