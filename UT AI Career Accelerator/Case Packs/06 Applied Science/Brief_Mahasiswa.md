# Case Brief — Stream 6: Applied Science

## "Mengurangi Pupuk Kimia Tanpa Mengurangi Panen"

*Kelompok tani dan data dalam case ini fiktif. Referensi ilmiah yang Anda gunakan harus nyata dan terverifikasi.*

### Situasi

Kelompok Tani Sri Rejeki menghadapi biaya pupuk yang naik dan kuota subsidi yang terbatas. Ketuanya, **Pak Slamet**, bertanya: *"Apakah kami bisa mengurangi pupuk kimia tanpa menurunkan panen? Apa kata penelitian, dan apa yang terlihat dari catatan kami sendiri?"*

Tim Anda berperan sebagai **asisten peneliti/penyuluh muda** yang diminta menyusun **ringkasan bukti (*evidence summary*)** dan rekomendasi awal.

### Materi yang Anda Terima

| File | Isi |
|---|---|
| `catatan_usaha_tani_sri_rejeki.csv` | Catatan 14 petani × 3 musim: dosis pupuk, penggunaan pupuk organik, uji tanah, hasil panen, biaya |
| `profil_kelompok_tani.md` | Kondisi kelompok dan pertanyaan Pak Slamet |
| `contoh_output_AI.md` | Jawaban AI berisi referensi, untuk dilatih validasinya |

### Tugas per Langkah

| Langkah | Yang harus dilakukan | Tools yang disarankan |
|---|---|---|
| 1 · Problem | Rumuskan pertanyaan riset yang dapat dijawab dengan format **PICO** sederhana: *Population* (petani padi sawah), *Intervention* (mis. pupuk organik/pemupukan berbasis uji tanah), *Comparison* (pemupukan kimia biasa), *Outcome* (hasil panen, biaya) | AI chatbot |
| 2 · Context | Kondisi lokal, kebutuhan petani, batasan biaya dan ketersediaan pupuk organik | AI chatbot |
| 3 · AI | (a) Cari 5–8 referensi (jurnal, publikasi kementerian/lembaga riset pertanian, FAO) dengan Perplexity dan Google Scholar. (b) Unggah PDF yang bisa diakses ke NotebookLM, rangkum temuan, metode, dan lokasi. (c) Buat **tabel perbandingan temuan**. (d) Olah data kelompok tani: rata-rata hasil, dosis urea, dan biaya per kelompok (organik vs tidak, PUTS vs tidak) | Perplexity, Google Scholar, NotebookLM, Sheets |
| 4 · Validate | **Pastikan setiap referensi benar-benar ada** (cek judul, penulis, DOI/tautan). Periksa `contoh_output_AI.md`. Bedakan bukti kuat (uji lapangan multi-lokasi, tinjauan sistematis) dan bukti lemah (satu percobaan kecil, artikel populer) | Checklist VALID |
| 5 · Improve | Identifikasi pola dan **kesenjangan bukti**. Apa yang tidak bisa disimpulkan dari data 14 petani? | AI chatbot |
| 6 · Output | *Evidence summary* 1 halaman | Dokumen |

### Format Output (*Evidence Summary* 1 Halaman)

1. **Pertanyaan (PICO).**
2. **Tabel temuan**: referensi, lokasi, metode, temuan utama, kekuatan bukti.
3. **Apa yang terlihat dari data kelompok** (dengan angka) dan keterbatasannya.
4. **Kesimpulan & rekomendasi awal** untuk Pak Slamet, dalam bahasa yang mudah dipahami petani.
5. **Keterbatasan** dan **pernyataan penggunaan AI**, termasuk hasil validasi `contoh_output_AI.md`.

### Petunjuk

- AI sering mengarang referensi yang terlihat meyakinkan. Satu referensi palsu dapat merusak kredibilitas seluruh laporan.
- Data 14 petani bukan eksperimen: petani yang memakai pupuk organik mungkin berbeda dalam banyak hal lain.
