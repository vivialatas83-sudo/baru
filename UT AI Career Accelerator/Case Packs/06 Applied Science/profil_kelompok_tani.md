# Profil Kelompok Tani "Sri Rejeki"

*Kelompok tani dan data fiktif.*

- **Lokasi:** desa dataran rendah di Jawa Tengah, sawah irigasi teknis, 3 kali tanam setahun.
- **Anggota yang mencatat usaha tani:** 14 petani (P01–P14), luas garapan 0,25–1 ha.
- **Komoditas:** padi sawah.
- **Kekhawatiran ketua kelompok (Pak Slamet):**
  - Biaya pupuk terus naik dan kuota pupuk subsidi sering tidak cukup.
  - Sebagian anggota merasa tanahnya "makin keras" dan butuh pupuk makin banyak.
  - Beberapa anggota sudah mencoba pupuk organik (kotoran ternak yang dikomposkan) sejak MT1 2025, dan sebagian pernah menguji tanah dengan **PUTS (Perangkat Uji Tanah Sawah)** bersama penyuluh.
- **Pertanyaan Pak Slamet:** "Apakah kami bisa mengurangi pupuk kimia tanpa menurunkan panen? Apa kata penelitian, dan apa yang terlihat dari catatan kami sendiri?"

## Data Pendukung
`catatan_usaha_tani_sri_rejeki.csv`: 14 petani × 3 musim tanam (42 baris).

| Kolom | Keterangan |
|---|---|
| `musim_tanam` | MT1 2025 (Nov–Feb), MT2 2026 (Mar–Jun), MT3 2026 (Jul–Okt) |
| `luas_ha` | Luas garapan (ha) |
| `pakai_pupuk_organik` | Ya/Tidak |
| `pernah_uji_tanah_PUTS` | Ya/Tidak |
| `urea_kg_per_ha`, `npk_kg_per_ha` | Dosis pupuk kimia (kg/ha) |
| `pupuk_organik_kg_per_ha` | Dosis pupuk organik (kg/ha) |
| `hasil_gkp_ton_per_ha` | Hasil panen gabah kering panen (ton/ha) |
| `biaya_pupuk_rp_per_ha` | Perkiraan biaya pupuk (Rp/ha) dengan asumsi harga subsidi urea Rp2.250/kg, NPK Rp2.300/kg, organik Rp600/kg |
