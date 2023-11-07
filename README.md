# Bot Discord CTF

Bot Discord CTF adalah bot yang membantu mendapatkan informasi tentang event CTF (Capture The Flag) dari [ctftime.org](https://ctftime.org/). Bot ini menggunakan Discord.js, node-fetch, dan Cheerio.

## Perintah yang Tersedia

Bot ini memiliki 4 perintah:

### 1. `/ctf`

Perintah ini digunakan untuk mendapatkan informasi tentang event CTF. Cara menggunakan perintah ini:

```
/ctf [id_event]
```

- `[id_event]` adalah ID dari event CTF yang ingin dicari informasinya.

### 2. `/converttime`

Karna [ctftime.org](https://ctftime.org/) menggunakan format waktu UTC. Perintah membantu mengonversi waktu ke zona waktu GMT+7. Cara menggunakan perintah ini:

```
/converttime [time]
```

- `[time]` adalah waktu yang ingin dikonversi ke zona waktu GMT+7 dalam format UTC (contoh: "Fri, 10 Nov. 2023, 10:00 UTC").

### 3. `/countdown`

Perintah ini menghitung berapa lama lagi hingga event dimulai. Cara menggunakan perintah ini:

```
/countdown [event_time]
```

- `[event_time]` adalah waktu saat event dimulai.

### 3. `/ctftips`

Perintah memberikan tips dalam mengerjakan kategori ctf:

```
/countdown [category]
```

- `[category]` adalah nama kategori ctf.

## Contoh Penggunaan

Perintah `/ctf`

```
/ctf 12345
```

Perintah `/converttime`

```
/converttime time: Sat, 11 Nov. 2023, 05:00 UTC
```

Perintah `/countdown`

```
/countdown event_time: Friday, 10 Nov. 2023, 15:00
```
Perintah `/ctftips`

```
/ctftips category: stenography
```
