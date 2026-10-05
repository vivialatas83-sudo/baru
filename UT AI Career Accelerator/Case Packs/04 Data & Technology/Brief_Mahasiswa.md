# Case Brief — Stream 4: Data & Technology

## "Produk dan Waktu Paling Menguntungkan"

*Toko dan data dalam case ini fiktif.*

### Situasi

**Rupa Nusa** adalah toko online kecil yang menjual alat tulis, tas, dan peralatan meja bermotif Nusantara. Manajernya, **Mas Fajar**, ingin memutuskan:
- produk mana yang perlu diprioritaskan stok dan iklannya, dan
- kapan waktu terbaik menjalankan iklan dan promo.

Ia memberi tim Anda, sebagai analis data junior, data transaksi 6 bulan. Datanya **belum bersih**.

### Materi yang Anda Terima

| File | Isi |
|---|---|
| `data_transaksi_toko_online.csv` | ±510 baris transaksi, April–September 2026 |
| `data_produk_hpp.csv` | Harga jual dan HPP untuk 8 produk |
| `kamus_data.md` | Penjelasan kolom dan catatan admin |

### Tugas per Langkah

| Langkah | Yang harus dilakukan | Tools yang disarankan |
|---|---|---|
| 1 · Problem | Rumuskan 2–3 pertanyaan bisnis yang bisa dijawab dengan data ini | AI chatbot |
| 2 · Context | Siapa pengguna insight? Keputusan apa yang akan diambil? Apa arti "menguntungkan": pendapatan atau laba? | AI chatbot |
| 3 · AI | (a) *Data cleaning*: minta AI menjelaskan cara menemukan duplikat, nilai kosong, nilai aneh, dan menyeragamkan teks. **Lakukan pembersihan di spreadsheet** dan catat setiap langkah. (b) Gabungkan HPP (VLOOKUP/XLOOKUP) dan hitung laba kotor. (c) Pivot per produk, per blok jam, per hari, per kota. (d) Buat grafik | Sheets/Excel, AI chatbot |
| 4 · Validate | Cocokkan angka AI dengan hitungan Anda. Ingat: **korelasi bukan kausalitas**; 6 bulan data mungkin tidak mewakili musim lain | Checklist VALID |
| 5 · Improve | Sederhanakan visual; ubah temuan teknis menjadi bahasa yang dipahami Mas Fajar | AI chatbot |
| 6 · Output | *Insight report* 3 slide | Sheets + Canva/Slides |

### Format Output (*Insight Report* 3 Slide)

1. **Pertanyaan & data**: pertanyaan bisnis, langkah pembersihan data (berapa baris dibuang/diubah dan mengapa).
2. **Temuan**: 3 insight utama, masing-masing dengan 1 grafik dan angka.
3. **Rekomendasi**: 2–3 tindakan untuk Mas Fajar + keterbatasan analisis.
4. **Pernyataan penggunaan AI** (boleh di catatan slide).

### Petunjuk

- Jangan langsung menempelkan seluruh CSV ke chatbot dan memercayai jawabannya. AI sering salah menghitung data berukuran besar. Gunakan AI untuk **merancang langkah dan rumus**, lalu hitung di spreadsheet.
- Produk dengan pendapatan tertinggi belum tentu paling menguntungkan.
