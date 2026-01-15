/* ===== DATA PRODUK ===== */
const products = [
  {id:1,name:"Kopi Arabika",price:50000,img:"a.jpeg"},
  {id:2,name:"Kopi Robusta",price:45000,img:"v.jpeg"},
];

/* ===== KERANJANG ===== */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ===== RENDER PRODUK ===== */
function renderProducts(){
  const list = document.getElementById("product-list");
  list.innerHTML = "";
  products.forEach((p,i)=>{
    const div = document.createElement("div");
    div.className = "product-item";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>Rp ${p.price.toLocaleString()}</p>
      <button onclick="addToCart(${i})">Tambah ke Keranjang</button>
    `;
    list.appendChild(div);
  });
}
renderProducts();

/* ===== ADD TO CART ===== */
function addToCart(index){
  const item = products[index];
  const exist = cart.find(i=>i.id===item.id);
  if(exist){exist.qty++;} else {cart.push({...item, qty:1});}
  localStorage.setItem("cart",JSON.stringify(cart));
  renderCart();
  openCart();
}

/* ===== RENDER KERANJANG ===== */
function renderCart(){
  let html="", total=0, count=0;
  cart.forEach((i,x)=>{
    total += i.price*i.qty;
    count += i.qty;
    html += `
      <div class="cart-item">
        <span>${i.name} x ${i.qty}</span>
        <div class="cart-controls">
          <button onclick="updateQty(${x},-1)">−</button>
          <button onclick="updateQty(${x},1)">+</button>
          <button onclick="removeItem(${x})">Hapus</button>
        </div>
      </div>
    `;
  });
  document.getElementById("cartItems").innerHTML = html || "Keranjang kosong";
  document.getElementById("total").innerText = total.toLocaleString();
  document.getElementById("cart-count").innerText = count;
}
renderCart();

/* ===== UPDATE & REMOVE ITEM ===== */
function updateQty(index, change){
  cart[index].qty += change;
  if(cart[index].qty <= 0) cart.splice(index,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}
function removeItem(index){
  cart.splice(index,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

/* ===== SIDEBAR ===== */
const cartSidebar = document.getElementById("cartSidebar");
const overlay = document.getElementById("overlay");
document.querySelector(".cart-toggle").addEventListener("click", openCart);
document.querySelector(".cart-close").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

function openCart(){cartSidebar.classList.add("open");overlay.classList.add("active");}
function closeCart(){cartSidebar.classList.remove("open");overlay.classList.remove("active");}

/* ===== MODAL CHECKOUT ===== */
const checkoutModal = document.getElementById("checkoutModal");
document.querySelector(".modal-close").addEventListener("click", closeCheckoutModal);
function openCheckoutModal(){checkoutModal.classList.add("active");}
function closeCheckoutModal(){checkoutModal.classList.remove("active");}

/* ===== FORM CHECKOUT ===== */
const checkoutForm = document.getElementById("checkoutForm");
checkoutForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  const form = new FormData(checkoutForm);
  sendWhatsApp(form);
});
document.getElementById("emailBtn").addEventListener("click",()=>{
  const form = new FormData(checkoutForm);
  sendEmail(form);
});

/* ===== FUNCTION SEND WHATSAPP ===== */
function sendWhatsApp(form){
  if(cart.length===0){ alert("Keranjang kosong"); return; }
  const nama = form.get("nama"); const hp = "085807254751"; const alamat = form.get("alamat");
  if(!nama||!hp||!alamat){alert("Data belum lengkap");return;}
  let t=`Halo, saya ingin pesan:%0A%0A`;
  cart.forEach(i=>{t+=`${i.name} x ${i.qty} = Rp ${(i.price*i.qty).toLocaleString()}%0A`;});
  t+=`%0ATotal: Rp ${cart.reduce((a,b)=>a+b.price*b.qty,0).toLocaleString()}%0ANama: ${nama}%0AHP: ${hp}%0AAlamat: ${alamat}`;
  window.open(`https://wa.me/62${hp}?text=${t}`,'_blank');
  closeCheckoutModal(); closeCart();
}

/* ===== FUNCTION SEND EMAIL ===== */
function sendEmail(form){
  if(cart.length===0){ alert("Keranjang kosong"); return; }
  const nama = form.get("nama"); const email = form.get("email"); const alamat = form.get("alamat");
  if(!nama||!email||!alamat){alert("Data belum lengkap");return;}
  let t=`Halo, saya ingin pesan:%0A%0A`;
  cart.forEach(i=>{t+=`${i.name} x ${i.qty} = Rp ${(i.price*i.qty).toLocaleString()}%0A`;});
  t+=`%0ATotal: Rp ${cart.reduce((a,b)=>a+b.price*b.qty,0).toLocaleString()}%0ANama: ${nama}%0AEmail: ${email}%0AAlamat: ${alamat}`;
  window.open(`mailto:${email}?subject=Pesanan Kopi Nusantara&body=${t}`);
  closeCheckoutModal(); closeCart();
}

/* ===== HERO SLIDER ANIMASI ===== */
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
function showSlide(){
  slides.forEach(s=>s.classList.remove("active"));
  slides[slideIndex].classList.add("active");
  slideIndex = (slideIndex+1)%slides.length;
}
setInterval(showSlide,5000);

/* ===== DARK MODE TOGGLE ===== */
const darkToggle = document.getElementById("darkModeToggle");
darkToggle.addEventListener("click", ()=>{
  document.body.classList.toggle("dark");
});
