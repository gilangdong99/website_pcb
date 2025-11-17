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

  showNotif(`✔ ${name} added`);
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
  if (cart.length === 0) return showNotif("Empty basket!");

  let nomorWA = "6285807254751";
  let pesanProduk = "";
  let totalHarga = 0;

  cart.forEach((item, i) => {
    pesanProduk += 
`🟩 *${i + 1}. ${item.name}*
Qty: ${item.qty}
Price: Rp ${(item.price * item.qty).toLocaleString()}
-----------------------\n`;
    totalHarga += item.price * item.qty;
  });

  let pesan = 
`*🛒 NEW ORDER — PT PUTRASEAN RUBBER INDUSTRI*

Hello, I would like to make an order:

${pesanProduk}
*💰 TOTAL PAYMENT:* Rp ${totalHarga.toLocaleString()}

Please fill in the following data:
👤 Name :  
📧 Email :
📍 Address :  
💳 Payment Method :  

Thank You🙏`;

  let url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
  window.open(url, "_blank");

  showNotif("✔ Order successfully sent via WhatsApp");
  cart = [];
  updateCart();
  toggleCart();
}


/* -----------------------------------------------------
   CHECKOUT EMAIL
----------------------------------------------------- */
function checkoutEmail() {
  if (cart.length === 0) return showNotif("Empty basket!");

  let emailTujuan = "gilangdong99@gmail.com";
  let pesanProduk = "";
  let totalHarga = 0;

  cart.forEach((item, i) => {
    pesanProduk += 
`------------------------------
${i + 1}. ${item.name}
Qty : ${item.qty}
Price: Rp ${(item.price * item.qty).toLocaleString()}
------------------------------

`;
    totalHarga += item.price * item.qty;
  });

  let subject = "🛒 New Order — PT Putrasean Rubber Industri";

  let body = 
`🛒 NEW ORDER — PT PUTRASEAN RUBBER INDUSTRI

Hello, I would like to make an order:

${pesanProduk}
💰 TOTAL PAYMENT: Rp ${totalHarga.toLocaleString()}

Please fill in the following data :
Name :
Address :
No. HP :
Payment Method :

Thank You.`;

  let mailtoUrl = `mailto:${emailTujuan}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  let win = window.open(mailtoUrl, "_blank");

  setTimeout(() => {
    if (!win || win.closed || typeof win.closed === "undefined") {
      showNotif("⚠ Can't open automatic email.");
    }
  }, 800);

  showNotif("✔ Email checkout successful!");

  cart = [];
  updateCart();
  toggleCart();
}


