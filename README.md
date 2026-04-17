# Endpoint yang tersedia
# Nama: Owen Benedict Lukman
# NIM : 535250067

A. Gacha
1. Endpoint 1
    ENDPOINT: POST /api/gacha/create
    URL: http://localhost:5000/api/gacha/create

  Endpoint yang bertujuan untuk memasukkan data "Prize" baru ke dalam database gachaPrizes.
  Note:
    Masukkan raw data json dalam dynamic value berupa
      {
        "name": string, (Nama dari prize)
        "quota": number, (Kuota dari prize)
      }

2. Endpoint 2
    ENDPOINT: GET /api/gacha/create
    URL: http://localhost:5000/api/gacha/prizes

  Endpoint yang bertujuan untuk mendapatkan informasi mengenai isi database dalam gachaPrizes.

3. Endpoint 3
    ENDPOINT: POST /api/gacha/roll
    URL: http://localhost:5000/api/gacha/roll

  Endpoint yang bertujuan untuk melakukan gacha dan menginfokan hasil dari gacha dalam akun user, setiap user memiliki kesempatan sebanyak 5 kali sehari untuk melakukan gacha.
  Note:
    Masukkan raw data json dalam dynamic value berupa
      {
        userId: string (Id dari user yang sudah dibuat)
      }

4. Endpoint 4
    ENDPOINT: GET /api/gacha/winners
    URL: http://localhost:5000/api/gacha/winners

  Endpoint yang bertujuan untuk mengecek siapa saja yang sudah mendapatkan hadiah gacha. Output berupa list dari userId, nama dari user yang sudah disensor, hadiah yang dimenangkan, dan waktu saat mendapatkan hadiah.

5. Endpoint 5
    ENDPOINT: GET /api/gacha/:userId
    URL: http://localhost:5000/api/gacha/:userId

  Endpoint yang bertujuan untuk mengecek log history dari user yang melakukan gacha (Hanya log history dari user yang diminta yang akan muncul).
  Note:
    Pada URL, ":userId" harus diganti dengan userID yang ingin dilihat.

B. Users
1. Endpoint 6
    ENDPOINT: GET /api/users/
    URL: http://localhost:5000/api/users/

  Endpoint yang berfungsi untuk mendapatkan list dari users yang tersedia dalam database.

2. Endpoint 7
    ENDPOINT: POST /api/users/
    URL: http://localhost:5000/api/users/

  Endpoint yang berfungsi untuk membuat user baru dalam database.
  Note: 
    Masukkan raw data json dalam dynamic value berupa
      {
        "email": string, (email dari user)
        "full_name": string, (nama lengkap dari user)
        "password": string, (password dari user yang terdiri dari minimal kombinasi 8 karakter),
        "confirm_password": string (berisi data yang memastikan bahwa password yang diketikkan sudah sesuai dengan apa yang diinginkan user)
      }    

3. Endpoint 8
    ENDPOINT: GET /api/users/:id
    URL: http://localhost:5000/api/users/:id

  Endpoint yang berfungsi untuk mengecek detail dari akun user (Hanya user yang Id nya ditulis yang akan muncul).
  Note:
    Pada URL, ":Id" harus diganti dengan userID yang ingin dilihat.

4. Endpoint 9
    ENDPOINT: PUT /api/users/:id
    URL: http://localhost:5000/api/users/:id

  Endpoint yang berfungsi untuk meng-update user.
  Note: 
    Masukkan raw data json dalam dynamic value untuk mengubah user berupa
      {
        "email": string, (email untuk memastikan database user)
        "fullName": string (nama user untuk meng-update)
      }

5. Endpoint 10
    Method: DELETE /api/users/:id
    URL: http://localhost:5000/api/users/:id

  Endpoint yang berfungsi untuk menghapus data user dari dalam database.