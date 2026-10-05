# Kamus Data — Toko Online "Rupa Nusa"

*Toko dan data fiktif.* Rupa Nusa menjual produk alat tulis, tas, dan peralatan meja bermotif Nusantara melalui marketplace.

## `data_transaksi_toko_online.csv`

| Kolom | Keterangan |
|---|---|
| `order_id` | Nomor pesanan |
| `tanggal` | Tanggal pesanan (YYYY-MM-DD), 1 April – 30 September 2026 |
| `jam` | Jam pesanan (HH:MM) |
| `produk` | Nama produk |
| `kategori` | Kategori produk |
| `qty` | Jumlah unit |
| `harga_satuan` | Harga jual per unit sebelum diskon (Rp) |
| `diskon_persen` | Diskon yang diberikan (%) |
| `total_bayar` | Nilai yang dibayar pelanggan (Rp) = qty × harga_satuan × (1 − diskon) |
| `kota` | Kota pengiriman |
| `metode_bayar` | Metode pembayaran |

## `data_produk_hpp.csv`

| Kolom | Keterangan |
|---|---|
| `produk` | Nama produk |
| `kategori` | Kategori produk |
| `harga_jual` | Harga jual normal (Rp) |
| `hpp_per_unit` | Harga pokok penjualan per unit (Rp): biaya beli/produksi barang |

**Laba kotor per transaksi** = `total_bayar` − (`qty` × `hpp_per_unit`).

## Catatan dari Admin Toko
> "Datanya saya ekspor apa adanya dari beberapa sumber. Mungkin ada yang dobel, ada yang kosong, dan penulisan kota tidak seragam. Retur kadang saya catat dengan qty minus."
