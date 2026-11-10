document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if(this.getAttribute('href') === '#') {
                e.preventDefault();
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    const btnTransaksi = document.querySelector('.btn-primary');
    if (btnTransaksi) {
        btnTransaksi.addEventListener('click', () => {
            alert('Fitur Kasir (POS) akan segera dibuka di sini!');
        });
    }
});

// --- LOGIKA HALAMAN POS (KASIR) ---
const daftarProduk = [
    { id: 1, nama: 'Kopi Hitam', harga: 10000 },
    { id: 2, nama: 'Es Teh Manis', harga: 8000 },
    { id: 3, nama: 'Roti Bakar', harga: 15000 },
    { id: 4, nama: 'Nasi Goreng', harga: 20000 },
    { id: 5, nama: 'Air Mineral', harga: 5000 }
];

let keranjang = [];
const productListEl = document.getElementById('product-list');
const cartItemsEl = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');
const btnCheckout = document.getElementById('btn-checkout');

// Tampilkan Produk
if (productListEl) {
    daftarProduk.forEach(produk => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-name">${produk.nama}</div>
            <div class="product-price">Rp ${produk.harga.toLocaleString('id-ID')}</div>
        `;
        card.onclick = () => tambahKeKeranjang(produk);
        productListEl.appendChild(card);
    });
}

function tambahKeKeranjang(produk) {
    const barangAda = keranjang.find(item => item.id === produk.id);
    if (barangAda) {
        barangAda.qty += 1;
    } else {
        keranjang.push({ ...produk, qty: 1 });
    }
    renderKeranjang();
}

function renderKeranjang() {
    if (!cartItemsEl) return;
    cartItemsEl.innerHTML = '';
    let total = 0;
    
    if (keranjang.length === 0) {
        cartItemsEl.innerHTML = '<p style="color: var(--text-muted); text-align: center; margin-top: 20px;">Belum ada barang</p>';
    } else {
        keranjang.forEach((item, index) => {
            total += item.harga * item.qty;
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <div>${item.nama} <br><small style="color:var(--text-muted)">${item.qty} x Rp ${item.harga.toLocaleString('id-ID')}</small></div>
                <div style="display:flex; align-items:center;">
                    <strong>Rp ${(item.harga * item.qty).toLocaleString('id-ID')}</strong>
                    <button onclick="hapusDariKeranjang(${index})" style="margin-left:10px; background:none; border:none; color:red; cursor:pointer;">❌</button>
                </div>
            `;
            cartItemsEl.appendChild(itemEl);
        });
    }
    totalPriceEl.innerText = `Rp ${total.toLocaleString('id-ID')}`;
}

window.hapusDariKeranjang = (index) => {
    keranjang.splice(index, 1);
    renderKeranjang();
};

if (btnCheckout) {
    btnCheckout.onclick = () => {
        if (keranjang.length === 0) return alert('Keranjang masih kosong!');
        alert('Pembayaran Berhasil! Total: ' + totalPriceEl.innerText);
        keranjang = [];
        renderKeranjang();
    };
}
