/* -----------------------------------------------------
   KERANJANG BELANJA (DENGAN QTY)
----------------------------------------------------- */
let cart = [];

// ----------- NOTIFIKASI MODERN ----------
function showNotif(msg) {
  const notif = document.createElement("div");
  notif.className = "notif-box";
  notif.innerText = msg;
  document.body.appendChild(notif);

  setTimeout(() => {
    notif.style.opacity = "1";
    notif.style.transform = "translateY(0)";
  }, 10);

  setTimeout(() => {
    notif.style.opacity = "0";
    notif.style.transform = "translateY(-20px)";
    setTimeout(() => notif.remove(), 300);
  }, 1800);
}

// ----------- TAMBAH PRODUK ----------
function addToCart(name, price) {
  let item = cart.find(p => p.name === name);

  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  showNotif(`✔ ${name} ditambahkan`);
  updateCart();
}

// ----------- UPDATE KERANJANG ----------
function updateCart() {
  let list = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    list += `
      <div class="cart-item">
        <div class="item-name">${item.name}</div>

        <div class="qty-box">
          <button class="qty-btn" onclick="changeQty(${index}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
        </div>

        <div class="item-price">Rp ${(item.price * item.qty).toLocaleString()}</div>
      </div>
    `;
  });

  document.getElementById("cartItems").innerHTML = list;
  document.getElementById("total").innerText = total.toLocaleString();
}

// ----------- UBAH QTY (+ / −) ----------
function changeQty(index, value) {
  cart[index].qty += value;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}

// ----------- BUKA/TUTUP KERANJANG ----------
function toggleCart() {
  const box = document.getElementById("cartBox");

  if (box.style.display === "block") {
    box.style.opacity = "0";
    box.style.transform = "translateY(20px)";
    setTimeout(() => (box.style.display = "none"), 200);
  } else {
    box.style.display = "block";
    setTimeout(() => {
      box.style.opacity = "1";
      box.style.transform = "translateY(0)";
    }, 10);
  }
}

/* -----------------------------------------------------
   CHECKOUT WHATSAPP
----------------------------------------------------- */
function checkout() {
  if (cart.length === 0) return showNotif("Keranjang kosong!");

  let nomorWA = "6281326469250";
  let pesanProduk = "";
  let totalHarga = 0;

  cart.forEach((item, i) => {
    pesanProduk += `${i + 1}. ${item.name} x${item.qty} - Rp ${(item.price * item.qty).toLocaleString()}\n`;
    totalHarga += item.price * item.qty;
  });

  let pesan = 
`Halo, saya ingin melakukan pemesanan:

${pesanProduk}
Total: Rp ${totalHarga.toLocaleString()}

Nama:
Email:
Alamat:
Metode Pembayaran:`;

  let url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
  window.open(url, "_blank");

  showNotif("✔ Pesanan dikirim via WhatsApp");
  cart = [];
  updateCart();
  toggleCart();
}

/* -----------------------------------------------------
   CHECKOUT EMAIL
----------------------------------------------------- */
function checkoutEmail() {
  if (cart.length === 0) return showNotif("Keranjang kosong!");

  let emailTujuan = "gilangdong99@gmail.com";
  let pesanProduk = "";
  let totalHarga = 0;

  cart.forEach((item, i) => {
    pesanProduk += `${i + 1}. ${item.name} x${item.qty} - Rp ${(item.price * item.qty).toLocaleString()}\n`;
    totalHarga += item.price * item.qty;
  });

  let subject = "Pemesanan Produk - PT Putrasean Rubber Industri";
  let body =
`Halo, saya ingin melakukan pemesanan:

${pesanProduk}
Total: Rp ${totalHarga.toLocaleString()}

Nama:
Alamat:
No. HP:
Metode Pembayaran:

Terima kasih.`;

  let mailtoUrl = `mailto:${emailTujuan}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  let win = window.open(mailtoUrl, "_blank");

  setTimeout(() => {
    if (!win || win.closed || typeof win.closed === "undefined") {
      showNotif("⚠ Tidak bisa membuka email otomatis.");
    }
  }, 800);

  showNotif("✔ Checkout Email berhasil!");

  cart = [];
  updateCart();
  toggleCart();
}
