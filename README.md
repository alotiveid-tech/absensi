# Alotive Absensi — deploy ke Netlify

## Akun
- Pegawai: `alifio` / `deandra`, `eja` / `widya`
- Owner: `aryasena` / `joddy`

## Cara deploy (disarankan, data tersinkron antar HP)
1. Upload isi folder ini ke repo GitHub baru.
2. Netlify → Add new site → Import from Git → pilih repo. Build command kosong, publish directory `.`.
3. Deploy. Data absen, objek, dan pengaturan disimpan di Netlify Blobs lewat `/api/state`.

Alternatif: `npm i -g netlify-cli` lalu `netlify deploy --prod` dari folder ini.

## Netlify Drop (drag folder)
Bisa, tapi Netlify Drop tidak menjalankan function. Aplikasi otomatis masuk "Mode lokal": data hanya tersimpan di browser masing-masing HP, jadi owner tidak melihat absen pegawai dari HP lain.

## Catatan
- Kamera butuh HTTPS (link Netlify sudah HTTPS).
- Pengenalan objek berjalan di HP (TensorFlow.js MobileNet, dimuat dari CDN saat scan pertama).
- Login dicek di sisi browser. Cocok untuk uji coba internal, belum aman untuk produksi.
