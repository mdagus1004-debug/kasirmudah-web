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
