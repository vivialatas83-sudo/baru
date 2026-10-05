# Case Packs — Phase 2: AI Career Application

Paket case untuk enam stream Phase 2 (Live Session 1 & 2). Setiap paket berisi materi yang dibagikan ke mahasiswa dan kunci khusus fasilitator. Semua organisasi, orang, dan data bersifat **fiktif**. Regulasi dan referensi ilmiah yang dirujuk mahasiswa harus nyata dan diverifikasi.

Lihat juga: [Rencana Pembelajaran](../Lesson_Plans.md) (alur sesi, rubrik, Lembar Kerja Case, Checklist VALID).

## Isi

| Stream | Case | Materi mahasiswa | Output |
|---|---|---|---|
| [01 Business & Professional](01%20Business%20%26%20Professional/) | Kopi Senja kehilangan pelanggan setelah kompetitor buka | Data penjualan harian 6 bulan (CSV), 20 ulasan pelanggan, profil kompetitor | Business recommendation brief |
| [02 Public, Legal & Social](02%20Public%2C%20Legal%20%26%20Social/) | Layanan adminduk online menyulitkan warga lansia | Rekap 40 keluhan (CSV), profil kelurahan, contoh output AI untuk divalidasi | Policy/service brief |
| [03 Education](03%20Education/) | Materi pecahan untuk kelas 5 yang beragam, tanpa proyektor | Hasil diagnostik 28 siswa (CSV), profil kelas, sumber materi | Paket mini pembelajaran |
| [04 Data & Technology](04%20Data%20%26%20Technology/) | Produk & waktu paling menguntungkan di toko online | Transaksi ±510 baris yang belum bersih (CSV), data HPP, kamus data | Insight report 3 slide |
| [05 Communication & Creative](05%20Communication%20%26%20Creative/) | Social media campaign TEMPEKU untuk mahasiswa | Brand brief, survei 60 mahasiswa (CSV) | Konsep campaign + 3 post + 1 video |
| [06 Applied Science](06%20Applied%20Science/) | Mengurangi pupuk kimia tanpa mengurangi panen | Catatan usaha tani 14 petani × 3 musim (CSV), profil kelompok, contoh output AI | Evidence summary |

## Struktur Setiap Folder

| File | Untuk | Keterangan |
|---|---|---|
| `Brief_Mahasiswa.md` | Mahasiswa | Situasi, materi, tugas per langkah (Problem → Output), format output, petunjuk |
| File data (`.csv`, `.md`) | Mahasiswa | Bahan kerja case |
| `Kunci_Fasilitator.md` | **Fasilitator saja** | Angka acuan, diagnosis/jawaban yang diharapkan, contoh rekomendasi kuat dan lemah, jebakan umum, pertanyaan pemandu |

> Saat membagikan materi ke mahasiswa, **jangan sertakan `Kunci_Fasilitator.md`**.

## Fitur Latihan Validasi

Beberapa case sengaja berisi "jebakan" yang melatih tahap **4 · Validate**:
- **Stream 2 & 6:** `contoh_output_AI.md` memuat satu regulasi/referensi **fiktif** yang meniru *hallucination* AI. Kuncinya ada di `Kunci_Fasilitator.md`.
- **Stream 4:** data sengaja kotor (duplikat, nilai kosong, penulisan kota tidak seragam, retur negatif, outlier).
- **Stream 1, 3, 4, 6:** angka/kunci jawaban harus dihitung ulang di spreadsheet karena AI sering salah hitung.
- **Stream 5:** brand brief memuat daftar klaim terlarang yang sering dilanggar copy buatan AI.

## Persiapan Fasilitator

1. Baca `Brief_Mahasiswa.md` dan `Kunci_Fasilitator.md` stream Anda; kerjakan case sekali sendiri dengan AI.
2. **Stream 2:** cek ulang status regulasi nyata di peraturan.go.id. **Stream 6:** kurasi 5–8 referensi nyata sebagai pembanding (lihat kunci).
3. Siapkan folder bersama per kelompok berisi materi mahasiswa + template Lembar Kerja Case.

## Membuat Ulang Data

Dataset CSV dihasilkan oleh [`_scripts/generate_data.py`](_scripts/generate_data.py) dengan *seed* tetap, sehingga angka di kunci fasilitator selalu cocok. Jika data diubah, hitung ulang angka acuan di setiap `Kunci_Fasilitator.md`.

```bash
cd "_scripts" && python3 generate_data.py
```

Catatan: file yang ditulis manual (`ulasan_pelanggan.csv`, profil, brief, dan contoh output AI) tidak dihasilkan oleh skrip.
