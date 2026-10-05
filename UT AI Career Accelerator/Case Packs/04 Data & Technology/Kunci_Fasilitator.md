# Kunci Fasilitator — Stream 4: Data & Technology

> **Untuk fasilitator saja.** Angka dihitung dari dataset yang dihasilkan `../_scripts/generate_data.py`.

## Masalah Data yang Sengaja Disisipkan

| Masalah | Jumlah | Penanganan yang diharapkan |
|---|---|---|
| Baris duplikat persis (order_id sama) | 12 | Hapus → 500 baris unik |
| `kategori` kosong | 14 | Isi dari `data_produk_hpp.csv` berdasarkan nama produk |
| `kota` kosong | 9 | Biarkan sebagai "(tidak diketahui)"; jangan ditebak |
| Penulisan kota tidak seragam | jakarta, JAKARTA, "Jakarta " (spasi), bandung, Sby, Jogja, Yogya, Makasar | TRIM + PROPER + pemetaan alias (Sby→Surabaya, Jogja/Yogya→Yogyakarta, Makasar→Makassar) |
| qty negatif (retur) | 4 pesanan: ORD-26208, ORD-26211, ORD-26307, ORD-26475 | Pisahkan dari penjualan; boleh dianalisis terpisah |
| Outlier qty = 50 (kemungkinan salah input) | 1 pesanan: ORD-26303, Lampu Meja LED, Rp6.450.000 | Tandai dan keluarkan dari analisis utama, sebutkan di keterbatasan; idealnya dikonfirmasi ke admin |

Setelah pembersihan: **495 transaksi penjualan** yang valid.

## Angka Acuan (495 transaksi bersih)

- Total pendapatan: **Rp49.365.400** · Total laba kotor: **Rp22.278.400** · Margin kotor: **45,1%**

**Per produk (diurutkan berdasarkan laba kotor)**

| Produk | Qty | Pendapatan (Rp) | Laba kotor (Rp) | Margin | Porsi laba |
|---|---|---|---|---|---|
| Tas Laptop Kanvas | 61 | 10.368.750 | 4.390.750 | 42,3% | 19,7% |
| Totebag Batik | 118 | 7.367.750 | 3.827.750 | 52,0% | 17,2% |
| Notebook A5 Dotted | 168 | 5.663.000 | 3.311.000 | 58,5% | 14,9% |
| Tumbler Stainless 500ml | 97 | 8.143.500 | 3.099.500 | 38,1% | 13,9% |
| Set Pulpen Gel (5) | 164 | 4.435.200 | 2.467.200 | 55,6% | 11,1% |
| Lampu Meja LED | 69 | 8.520.450 | 2.241.450 | **26,3%** | 10,1% |
| Stiker Pack Nusantara | 156 | 2.234.250 | 1.610.250 | 72,1% | 7,2% |
| Mousepad Motif Tenun | 62 | 2.632.500 | 1.330.500 | 50,5% | 6,0% |

**Per blok jam (laba kotor)**

| Blok jam | Transaksi | Porsi laba |
|---|---|---|
| 00–05 | 10 | 1,0% |
| 06–10 | 77 | 15,0% |
| 11–13 | 88 | 18,2% |
| 14–18 | 107 | 20,3% |
| **19–22** | **201** | **43,3%** |
| 23 | 12 | 2,1% |

**Per kota (laba kotor, setelah penyeragaman):** Jakarta Rp6,51 jt · Bandung Rp4,60 jt · Yogyakarta Rp3,67 jt · Surabaya Rp3,05 jt · Medan Rp2,40 jt · Makassar Rp1,69 jt · (tidak diketahui) Rp0,36 jt.
*Tanpa penyeragaman, Jakarta terpecah menjadi 5 baris dan terlihat lebih kecil dari Bandung. Ini contoh bagus mengapa cleaning penting.*

**Diskon tanggal 25–31 (periode gajian):**

| Periode | Pesanan/hari | Rata-rata diskon | Laba kotor/pesanan | Laba kotor/hari |
|---|---|---|---|---|
| Tgl 1–24 | 2,67 | 2,8% | Rp47.982 | Rp127.952 |
| Tgl 25–31 | 2,85 | 9,0% | Rp34.715 | Rp98.804 |

Diskon besar di akhir bulan hanya sedikit menaikkan jumlah pesanan, tetapi **menurunkan laba per hari ±23%**.

## Tiga Insight yang Diharapkan

1. **Pendapatan ≠ laba.** Lampu Meja LED adalah produk ke-2 tertinggi dari sisi pendapatan tetapi margin terendah (26%). Tas Laptop, Totebag, dan Notebook menyumbang ±52% laba kotor.
2. **Jam 19.00–22.00 menyumbang ±43% laba kotor**, jadi ini waktu terbaik untuk iklan dan *flash sale*.
3. **Diskon akhir bulan tidak efektif**: volume naik sedikit, laba per hari turun.

Insight tambahan yang baik: Stiker Pack bermargin 72% tetapi bernilai kecil, cocok sebagai *add-on/bundling*. Hari dalam seminggu tidak menunjukkan pola yang kuat. Mahasiswa yang **tidak** memaksakan pola dari data acak layak dipuji.

## Rekomendasi yang Kuat (contoh)

- Prioritaskan stok & iklan Tas Laptop, Totebag, dan Notebook; tinjau harga/HPP Lampu Meja LED.
- Jadwalkan iklan pukul 19.00–22.00.
- Uji coba mengurangi diskon akhir bulan, atau ganti dengan bundling (mis. Notebook + Pulpen + Stiker).
- Perbaiki pencatatan: dropdown kota dan kategori di sistem, retur dicatat terpisah.

## Jebakan Umum dan Pertanyaan Pemandu

| Jebakan | Pertanyaan pemandu |
|---|---|
| Menempel CSV ke AI dan menyalin angka | "Kalau Anda hitung di spreadsheet, apakah hasilnya sama?" |
| Tidak menghapus duplikat/outlier | "Berapa baris sebelum dan sesudah cleaning?" |
| Menyimpulkan dari pendapatan saja | "Produk mana yang paling banyak meninggalkan uang untuk toko?" |
| Mengklaim sebab-akibat | "Apakah jam malam *menyebabkan* laba tinggi, atau hanya saat orang berbelanja?" |
| Grafik berlebihan/sulit dibaca | "Apa satu pesan dari grafik ini?" |
