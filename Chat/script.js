document.addEventListener("DOMContentLoaded", () => {
    loadMessages();
    loadUsername();
    monitorTyping();
    listenForUpdates(); // Додаємо слухача подій
});

let autoReload = false;
let isTyping = false;

function saveUsername() {
    const username = document.getElementById('username').value.trim();
    if (!username) return;
    sessionStorage.setItem('chatUsername', username);
    autoReload = true;
    startAutoReload();
}

function sendMessage() {
    const username = sessionStorage.getItem('chatUsername');
    const message = document.getElementById('message').value.trim();
    if (!username || !message) return;

    if (message === '/Dell') {
        clearMessages();
        return;
    }

    saveMessage(username, message);
    notifyOtherTabs(); // Сповіщаємо інші вкладки про зміну
}

function saveMessage(username, message) {
    let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.push({ username, message });
    localStorage.setItem('chatMessages', JSON.stringify(messages));

    notifyOtherTabs(); // Сповіщаємо інші пристрої
}

function loadMessages() {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = ''; // Очищуємо перед завантаженням нових

    let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.forEach(({ username, message }) => {
        const div = document.createElement('div');
        div.className = `message ${username === 'User1' ? 'user1' : 'user2'}`;
        div.textContent = `${username}: ${message}`;
        chatBox.appendChild(div);
    });

    chatBox.scrollTop = chatBox.scrollHeight;
}

function loadUsername() {
    const savedUsername = sessionStorage.getItem('chatUsername');
    if (savedUsername) {
        document.getElementById('username').value = savedUsername;
        autoReload = true;
        startAutoReload();
    }
}

function startAutoReload() {
    setInterval(() => {
        if (!isTyping) {
            loadMessages(); // Оновлюємо тільки повідомлення, а не перезавантажуємо сторінку
        }
    }, 5000);
}

function monitorTyping() {
    const messageInput = document.getElementById('message');
    messageInput.addEventListener('input', () => {
        isTyping = messageInput.value.trim().length > 0;
    });
}

function clearMessages() {
    localStorage.removeItem('chatMessages');
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = '';
    notifyOtherTabs(); // Очищаємо повідомлення і на інших пристроях
}

// Функція для сповіщення інших вкладок
function notifyOtherTabs() {
    localStorage.setItem('chatUpdate', Date.now());
}

// Слухач подій для отримання оновлень
function listenForUpdates() {
    window.addEventListener('storage', (event) => {
        if (event.key === 'chatUpdate') {
            loadMessages(); // Завантажуємо нові повідомлення при зміні localStorage
        }
    });
}
