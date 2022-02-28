const hexToRgb = hex =>
  hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))

var getColor = function() {
    var hex = document.getElementById("color_picker").value
    rgb = hexToRgb(hex)
    
    console.log("color " + rgb[0] + "," + rgb[1] + "," + rgb[2])

    if (selectedObject != null) {
        for (var i=2; i<selectedObject.vert.length; i+=5) {
            selectedObject.vert[i] = rgb[0]/255
            selectedObject.vert[i+1] = rgb[1]/255
            selectedObject.vert[i+2] = rgb[2]/255
        }
    }
    renderAll()
}

var help = function() {
    window.alert(
        `
        Petunjuk umum:
        1. Tentukan warna yang ingin digunakan.
        2. Ikuti petunjuk setiap bentuknya.
        3. Untuk mengubah posisi titik, drag titik tersebut ke posisi yang diinginkan.
        4. Untuk mengubah warna, tekan salah satu titik pada bentuk yang ingin diubah warnanya, kemudian ubah warnanya sesuai dengan keinginan.

        Petunjuk (Line):
        1. Tekan 2 titik pada posisi yang diinginkan. Kedua titik akan terhubung menjadi sebuah garis.

        Petunjuk (Square):
        1. Tekan salah satu titik yang diinginkan (disarankan ditengah canvas).
        2. Titik tersebut akan menjadi titik tengah dari sebuah persegi inisiasi.
        3. Untuk mengubah ukuran persegi atau membuat persegi panjang, drag salah satu titik pada posisi yang diinginkan.

        Petunjuk (Polygon):
        1. Sebelum menekan tombol Polygon, tentukan jumlah titik yang akan dibuat (minimal 3).
        2. Tekan titik pada posisi yang diinginkan sebanyak nilai yang sudah ditentukan.

        Petunjuk (File Handling):
        1. Untuk meng-export canvas menjadi sebuah file external, tentukan terlebih dahulu nama file yang ingin di-export, kemudian tekan tombol Export.
        2. Untuk meng-import file yang sudah ada, pilih file yang ingin di-import, kemudian tekan tombol Import.
        `)
}