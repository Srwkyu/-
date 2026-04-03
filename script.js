// Функции для работы с корзиной
function addToCart() {
    const quantity = document.getElementById('quantity').value;
    alert(`Товар добавлен в корзину! Количество: ${quantity}`);
    // Здесь будет реальная логика добавления в корзину
}

function increaseQty() {
    const input = document.querySelector('.item-quantity input');
    input.value = parseInt(input.value) + 1;
}

function decreaseQty() {
    const input = document.querySelector('.item-quantity input');
    if (input.value > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

// Обработка форм входа
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (email && password) {
                localStorage.setItem('userEmail', email);
                localStorage.setItem('isLoggedIn', 'true');
                alert('Успешный вход!');
                window.location.href = 'profile.html';
            }
        });
    }

    // Обработка формы регистрации
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('Пароли не совпадают!');
                return;
            }

            if (password.length < 8) {
                alert('Пароль должен быть минимум 8 символов!');
                return;
            }

            localStorage.setItem('userName', firstName + ' ' + lastName);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('isLoggedIn', 'true');
            alert('Регистрация успешна!');
            window.location.href = 'profile.html';
        });
    }

    // Обработка формы оформления заказа
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Спасибо за ваш заказ! Номер заказа: #12346');
            window.location.href = 'profile.html';
        });
    }

    // Обновление профиля
    const profileForm = document.querySelector('.profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Данные профиля обновлены!');
        });
    }

    // Инициализация данных профиля если пользователь залогинен
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    if (userName && userEmail) {
        const profileH3 = document.querySelector('.profile-card h3');
        const profileP = document.querySelector('.profile-card p');
        if (profileH3) profileH3.textContent = userName;
        if (profileP) profileP.textContent = userEmail;
    }
});

// Функция для удаления товара из корзины
function removeFromCart(button) {
    button.closest('.cart-item').style.opacity = '0.5';
    button.disabled = true;
    alert('Товар удален из корзины');
    button.closest('.cart-item').remove();
}

// Обновление общей суммы в корзине
function updateCartTotal() {
    const items = document.querySelectorAll('.cart-item');
    let total = 0;
    items.forEach(item => {
        const price = parseFloat(item.querySelector('.item-price').textContent);
        const qty = parseInt(item.querySelector('.item-quantity input').value);
        total += price * qty;
    });
}

// Фильтрация товаров по категориям
function filterProducts(category) {
    const items = document.querySelectorAll('.product-card');
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Поиск товаров
function searchProducts(query) {
    const items = document.querySelectorAll('.product-card h4');
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        const parent = item.closest('.product-card');
        if (text.includes(query.toLowerCase())) {
            parent.style.display = 'block';
        } else {
            parent.style.display = 'none';
        }
    });
}

// Добавление товара в избранное
function addToFavorite(button) {
    button.classList.toggle('active');
    if (button.classList.contains('active')) {
        button.textContent = '❤️ В избранном';
        alert('Товар добавлен в избранное!');
    } else {
        button.textContent = '❤️ Добавить в избранное';
        alert('Товар удален из избранного!');
    }
}

// Отправка сообщения в поддержку
function sendSupportMessage(message) {
    if (message.trim()) {
        alert('Спасибо! Ваше сообщение отправлено в службу поддержки.');
    }
}

// Вспомогательная функция для проверки авторизации
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn && window.location.pathname.includes('profile.html')) {
        alert('Пожалуйста, войдите в аккаунт!');
        window.location.href = 'login.html';
    }
}