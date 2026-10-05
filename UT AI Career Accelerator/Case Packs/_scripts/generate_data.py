"""Generate the synthetic datasets used in the UT AI Career Accelerator case packs.

All data is fictional. Run from this folder: python3 generate_data.py
Fixed seeds keep the output (and the facilitator answer keys) reproducible.
"""
import csv
import datetime as dt
import random
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]


def write_csv(path, header, rows):
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(header)
        w.writerows(rows)


def daterange(start, end):
    d = start
    while d <= end:
        yield d
        d += dt.timedelta(days=1)


# ---------------------------------------------------------------- Stream 1
def stream1():
    rng = random.Random(101)
    produk = [  # nama, kategori, harga, rata2 qty/hari dine-in, takeaway, ojol
        ("Es Kopi Susu Senja", "Kopi", 18000, 22, 14, 16),
        ("Americano", "Kopi", 15000, 8, 5, 4),
        ("Kopi Tubruk", "Kopi", 10000, 9, 3, 1),
        ("Matcha Latte", "Non-Kopi", 22000, 6, 4, 5),
        ("Roti Bakar", "Makanan", 15000, 10, 3, 6),
    ]
    opening = dt.date(2026, 7, 1)  # kompetitor buka
    rows = []
    for d in daterange(dt.date(2026, 4, 1), dt.date(2026, 9, 30)):
        wd = d.weekday()
        weekend = wd >= 5
        for nama, kat, harga, di, ta, oj in produk:
            for kanal, base in (("Dine-in", di), ("Takeaway", ta), ("Ojol", oj)):
                mult = 1.0
                if kanal == "Dine-in":
                    mult *= 0.8 if weekend else 1.1
                    if d >= opening:
                        # pelanggan mahasiswa pindah ke kompetitor (wifi, colokan, buka lebih malam)
                        mult *= 0.62 if not weekend else 0.85
                if kanal == "Takeaway" and d >= opening and kat == "Kopi":
                    mult *= 0.85  # kompetitor promo kopi susu Rp12.000
                if kanal == "Ojol":
                    mult *= 1.15 if weekend else 1.0
                qty = max(0, round(rng.gauss(base * mult, base * mult * 0.18)))
                if qty:
                    rows.append([d.isoformat(), HARI[wd], nama, kat, kanal, qty, harga, qty * harga])
    out = ROOT / "01 Business & Professional"
    write_csv(out / "data_penjualan_kopi_senja.csv",
              ["tanggal", "hari", "produk", "kategori", "kanal", "qty", "harga_satuan", "pendapatan"], rows)


# ---------------------------------------------------------------- Stream 4
def stream4():
    rng = random.Random(404)
    produk = {  # nama: (kategori, harga, hpp, bobot)
        "Tumbler Stainless 500ml": ("Peralatan", 89000, 52000, 10),
        "Tas Laptop Kanvas": ("Tas", 175000, 98000, 6),
        "Totebag Batik": ("Tas", 65000, 30000, 12),
        "Notebook A5 Dotted": ("Alat Tulis", 35000, 14000, 16),
        "Set Pulpen Gel (5)": ("Alat Tulis", 28000, 12000, 14),
        "Lampu Meja LED": ("Peralatan", 129000, 91000, 7),
        "Stiker Pack Nusantara": ("Alat Tulis", 15000, 4000, 15),
        "Mousepad Motif Tenun": ("Peralatan", 45000, 21000, 9),
    }
    kota_variants = {
        "Jakarta": ["Jakarta", "Jakarta", "Jakarta", "jakarta", "JAKARTA", "Jakarta "],
        "Bandung": ["Bandung", "Bandung", "bandung"],
        "Surabaya": ["Surabaya", "Surabaya", "Sby"],
        "Yogyakarta": ["Yogyakarta", "Yogyakarta", "Jogja", "Yogya"],
        "Medan": ["Medan"],
        "Makassar": ["Makassar", "Makasar"],
    }
    kota_w = {"Jakarta": 30, "Bandung": 18, "Surabaya": 16, "Yogyakarta": 14, "Medan": 12, "Makassar": 10}
    metode = ["Transfer Bank", "E-Wallet", "E-Wallet", "COD", "Kartu Kredit"]
    names = list(produk)
    weights = [produk[n][3] for n in names]
    start = dt.date(2026, 4, 1)
    rows = []
    for i in range(500):
        d = start + dt.timedelta(days=rng.randrange(183))
        # jam ramai: 19-22, lalu 11-13
        hour = rng.choices(range(24), weights=[1, 1, 0, 0, 0, 0, 1, 2, 3, 4, 5, 7, 8, 7, 5, 4, 4, 5, 7, 11, 13, 12, 8, 3])[0]
        n = rng.choices(names, weights=weights)[0]
        kat, harga, _, _ = produk[n]
        qty = rng.choices([1, 2, 3, 4, 5], weights=[55, 25, 10, 6, 4])[0]
        # payday effect: diskon lebih sering tgl 25-31
        diskon = rng.choice([0, 0, 0, 5, 10]) if d.day < 25 else rng.choice([0, 10, 10, 15])
        total = round(qty * harga * (1 - diskon / 100))
        kota = rng.choices(list(kota_w), weights=list(kota_w.values()))[0]
        rows.append([f"ORD-{26000 + i}", d.isoformat(), f"{hour:02d}:{rng.randrange(60):02d}", n, kat, qty, harga,
                     diskon, total, rng.choice(kota_variants[kota]), rng.choice(metode)])
    rows.sort(key=lambda r: (r[1], r[2]))
    # kotor-kan data
    for r in rng.sample(rows, 14):
        r[4] = ""  # kategori kosong
    for r in rng.sample(rows, 9):
        r[9] = ""  # kota kosong
    for r in rng.sample(rows, 4):
        r[5] = -r[5]  # retur tercatat negatif
        r[8] = -r[8]
    r = rng.choice(rows)
    r[5], r[8] = 50, r[6] * 50  # outlier / salah input
    dups = [list(x) for x in rng.sample(rows, 12)]
    rows.extend(dups)
    rows.sort(key=lambda r: (r[1], r[2]))
    out = ROOT / "04 Data & Technology"
    write_csv(out / "data_transaksi_toko_online.csv",
              ["order_id", "tanggal", "jam", "produk", "kategori", "qty", "harga_satuan", "diskon_persen",
               "total_bayar", "kota", "metode_bayar"], rows)
    write_csv(out / "data_produk_hpp.csv", ["produk", "kategori", "harga_jual", "hpp_per_unit"],
              [[n, v[0], v[1], v[2]] for n, v in produk.items()])


# ---------------------------------------------------------------- Stream 5
def stream5():
    rng = random.Random(505)
    rows = []
    for i in range(1, 61):
        usia = rng.choices(range(18, 27), weights=[8, 14, 16, 15, 12, 10, 8, 6, 5])[0]
        status = rng.choices(["Mahasiswa penuh waktu", "Mahasiswa sambil bekerja"], weights=[55, 45])[0]
        platform = rng.choices(["TikTok", "Instagram", "YouTube", "X/Twitter"], weights=[40, 35, 15, 10])[0]
        jam = rng.choices(["06-09", "12-14", "19-22", "22-01"], weights=[8, 17, 45, 30])[0]
        ngemil = rng.choices(["Selalu", "Sering", "Kadang", "Jarang"], weights=[25, 40, 25, 10])[0]
        budget = rng.choices(["< Rp25.000", "Rp25.000-50.000", "Rp50.000-100.000", "> Rp100.000"], weights=[20, 42, 28, 10])[0]
        faktor = rng.choices(["Harga", "Rasa", "Kesehatan/gizi", "Kemasan praktis", "Rekomendasi teman/influencer"],
                             weights=[30, 28, 18, 10, 14])[0]
        konten = rng.choices(["Video lucu/relatable", "Review jujur", "Tips belajar/produktivitas", "Promo/diskon",
                              "Behind the scenes UMKM"], weights=[30, 24, 16, 20, 10])[0]
        sehat = rng.choices([1, 2, 3, 4, 5], weights=[5, 10, 25, 35, 25])[0]
        rows.append([f"R{i:02d}", usia, status, platform, jam, ngemil, budget, faktor, konten, sehat])
    write_csv(ROOT / "05 Communication & Creative" / "survei_audiens_mahasiswa.csv",
              ["id", "usia", "status", "platform_utama", "jam_aktif_medsos", "ngemil_saat_belajar",
               "budget_jajan_per_minggu", "faktor_utama_beli_snack", "konten_paling_disukai",
               "minat_snack_sehat_1sd5"], rows)


# ---------------------------------------------------------------- Stream 2
def stream2():
    rng = random.Random(202)
    layanan = ["Perekaman/cetak KTP-el", "Kartu Keluarga (perubahan)", "Akta Kematian", "Pindah Datang",
               "Aktivasi IKD", "Surat Keterangan Domisili"]
    kendala = [
        ("Tidak punya smartphone", "Akses perangkat"),
        ("Tidak bisa membuat akun/email", "Literasi digital"),
        ("Lupa password / OTP tidak masuk", "Literasi digital"),
        ("Unggah foto dokumen gagal", "Literasi digital"),
        ("Antrean online penuh, harus datang subuh", "Proses layanan"),
        ("Disuruh kembali karena berkas kurang", "Informasi persyaratan"),
        ("Tidak tahu persyaratan", "Informasi persyaratan"),
        ("Sulit berjalan/naik tangga ke loket lantai 2", "Aksesibilitas fisik"),
        ("Petugas bicara terlalu cepat", "Pelayanan petugas"),
        ("Anak/kerabat bekerja, tidak ada pendamping", "Akses perangkat"),
    ]
    kw = [12, 10, 8, 6, 9, 7, 6, 5, 3, 4]
    kanal = ["Kotak saran", "WhatsApp kelurahan", "Langsung ke loket", "Musrenbang RW"]
    rows = []
    for i in range(1, 41):
        d = dt.date(2026, 7, 1) + dt.timedelta(days=rng.randrange(92))
        usia = rng.choices(["60-64", "65-69", "70-74", "75+"], weights=[35, 30, 20, 15])[0]
        k, cat = rng.choices(kendala, weights=kw)[0]
        rows.append([f"K-{i:03d}", d.isoformat(), f"RW {rng.randint(1, 9):02d}", usia, rng.choice(["L", "P"]),
                     rng.choice(layanan), k, cat, rng.choice(kanal),
                     rng.choices(["Selesai", "Belum selesai", "Dirujuk ke Disdukcapil"], weights=[45, 35, 20])[0]])
    rows.sort(key=lambda r: r[1])
    write_csv(ROOT / "02 Public, Legal & Social" / "rekap_keluhan_warga_lansia.csv",
              ["id_keluhan", "tanggal", "rw", "kelompok_usia", "jenis_kelamin", "layanan", "keluhan",
               "kategori_kendala", "kanal_pengaduan", "status"], rows)


# ---------------------------------------------------------------- Stream 3
def stream3():
    rng = random.Random(303)
    subs = ["konsep_pecahan", "pecahan_senilai", "membandingkan", "penjumlahan_beda_penyebut", "soal_cerita"]
    base = [80, 68, 60, 45, 40]
    rows = []
    for i in range(1, 29):
        ability = rng.gauss(0, 15)
        scores = [max(0, min(100, round((b + ability + rng.gauss(0, 10)) / 20) * 20)) for b in base]
        rows.append([f"S{i:02d}"] + scores + [rng.choices(["Ya", "Tidak"], weights=[30, 70])[0]])
    write_csv(ROOT / "03 Education" / "hasil_diagnostik_kelas5.csv",
              ["siswa"] + subs + ["akses_hp_di_rumah"], rows)


# ---------------------------------------------------------------- Stream 6
def stream6():
    rng = random.Random(606)
    rows = []
    musim = ["MT1 2025 (Nov-Feb)", "MT2 2026 (Mar-Jun)", "MT3 2026 (Jul-Okt)"]
    for p in range(1, 15):
        luas = rng.choice([0.25, 0.3, 0.5, 0.5, 0.75, 1.0])
        organik = p % 3 == 0 or p in (4, 11)  # sebagian petani sudah mulai pakai pupuk organik
        uji_tanah = p in (3, 6, 9, 11, 12)
        for m in musim:
            urea = rng.gauss(250 if not organik else 190, 25)
            if uji_tanah:
                urea -= 30
            npk = rng.gauss(250, 30) if not organik else rng.gauss(200, 25)
            org = rng.gauss(2000, 300) if organik else 0
            hasil = 5.6 + rng.gauss(0, 0.45) - (0.25 if m.startswith("MT3") else 0)
            if organik and m != musim[0]:
                hasil += 0.15
            if urea > 270:
                hasil -= 0.1  # pemupukan N berlebih tidak menambah hasil
            biaya = (urea * 2250 + npk * 2300) / 1000 + org * 0.6 / 1000  # ribu Rp/ha, harga pupuk subsidi
            rows.append([f"P{p:02d}", m, luas, "Ya" if organik else "Tidak", "Ya" if uji_tanah else "Tidak",
                         round(urea), round(npk), round(org), round(hasil, 2), int(round(biaya * 1000, -3))])
    write_csv(ROOT / "06 Applied Science" / "catatan_usaha_tani_sri_rejeki.csv",
              ["petani", "musim_tanam", "luas_ha", "pakai_pupuk_organik", "pernah_uji_tanah_PUTS",
               "urea_kg_per_ha", "npk_kg_per_ha", "pupuk_organik_kg_per_ha", "hasil_gkp_ton_per_ha",
               "biaya_pupuk_rp_per_ha"], rows)


if __name__ == "__main__":
    for fn in (stream1, stream2, stream3, stream4, stream5, stream6):
        fn()
    print("done")
