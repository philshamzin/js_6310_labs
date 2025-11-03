'use strict';

// Ключ для сохранения состояния в localStorage
const STYLE_STATE_KEY = 'kai-custom-style-enabled';

// Функция для применения пользовательских стилей High Visibility
function applyCustomStyles() {
    // 1. Изменяем фон главной обертки страницы (getElementById)
    const pageWrapper = document.getElementById('page_wrapper');
    if (pageWrapper) {
        pageWrapper.style.backgroundColor = '#ffff00';
        pageWrapper.style.color = '#000000';
        pageWrapper.style.fontWeight = 'bold';
        pageWrapper.style.transition = 'all 0.3s ease';
    }

    // 2. Изменяем стили главного слайдера (querySelector)
    const mainSlider = document.querySelector('.main_slider_holder');
    if (mainSlider) {
        mainSlider.style.background = '#ffcc00';
        mainSlider.style.border = '5px solid #000000';
        mainSlider.style.borderRadius = '0';
        mainSlider.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.8)';
    }

    // 3. Изменяем все блоки новостей (querySelectorAll)
    const newsBoxes = document.querySelectorAll('.news_box');
    newsBoxes.forEach(box => {
        box.style.backgroundColor = '#ffff00';
        box.style.border = '4px solid #000000';
        box.style.borderRadius = '0';
        box.style.padding = '25px';
        box.style.marginBottom = '20px';
        box.style.color = '#000000';
        box.style.fontWeight = 'bold';
    });

    // 4. Изменяем стили ссылок в навигации (сложный селектор: класс + потомок)
    const navLinks = document.querySelectorAll('.box_links a, .main_menu a');
    navLinks.forEach(link => {
        link.style.color = '#000000';
        link.style.backgroundColor = '#ffff00';
        link.style.fontWeight = 'bold';
        link.style.textDecoration = 'underline';
        link.style.textDecorationThickness = '3px';
        link.style.padding = '5px 10px';
        link.style.border = '2px solid #000000';
        link.style.transition = 'background-color 0.2s ease';
    });

    // 5. Изменяем заголовки (querySelector с более сложным селектором)
    const headers = document.querySelectorAll('h1, h2, h3, .news_title');
    headers.forEach(header => {
        header.style.color = '#000000';
        header.style.textShadow = 'none';
        header.style.fontSize = '1.5em';
        header.style.fontWeight = '900';
        header.style.textTransform = 'uppercase';
        header.style.letterSpacing = '2px';
    });

    // 6. Используем parentElement для изменения родительского элемента
    const firstNewsBox = document.querySelector('.news_box');
    if (firstNewsBox && firstNewsBox.parentElement) {
        firstNewsBox.parentElement.style.backgroundColor = '#ffff00';
        firstNewsBox.parentElement.style.padding = '20px';
        firstNewsBox.parentElement.style.border = '3px solid #000000';
    }

    // 7. Используем children для изменения дочерних элементов
    const boxLinks = document.querySelector('.box_links');
    if (boxLinks && boxLinks.children) {
        Array.from(boxLinks.children).forEach(child => {
            child.style.margin = '8px';
            child.style.display = 'inline-block';
            child.style.fontWeight = 'bold';
        });
    }

    // 8. Дополнительные стили для улучшения контрастности
    const contentArea = document.querySelector('.content_area, #content');
    if (contentArea) {
        contentArea.style.backgroundColor = '#ffff00';
        contentArea.style.borderRadius = '0';
        contentArea.style.padding = '25px';
        contentArea.style.border = '4px solid #000000';
        contentArea.style.color = '#000000';
        contentArea.style.fontWeight = 'bold';
    }

    // 9. Изменяем все параграфы и текстовые элементы
    const textElements = document.querySelectorAll('p, span, div, li');
    textElements.forEach(element => {
        element.style.color = '#000000';
        element.style.fontWeight = 'bold';
    });

    // 10. Изменяем кнопки на сайте
    const buttons = document.querySelectorAll('button, .button, input[type="submit"]');
    buttons.forEach(button => {
        button.style.backgroundColor = '#000000';
        button.style.color = '#ffff00';
        button.style.border = '3px solid #000000';
        button.style.fontWeight = 'bold';
        button.style.padding = '10px 20px';
        button.style.fontSize = '16px';
    });

    console.log('High Visibility стили применены');
}

// Функция для удаления пользовательских стилей
function removeCustomStyles() {
    const pageWrapper = document.getElementById('page_wrapper');
    if (pageWrapper) {
        pageWrapper.style.backgroundColor = '';
        pageWrapper.style.color = '';
        pageWrapper.style.fontWeight = '';
        pageWrapper.style.transition = '';
    }

    const mainSlider = document.querySelector('.main_slider_holder');
    if (mainSlider) {
        mainSlider.style.background = '';
        mainSlider.style.border = '';
        mainSlider.style.borderRadius = '';
        mainSlider.style.boxShadow = '';
    }

    const newsBoxes = document.querySelectorAll('.news_box');
    newsBoxes.forEach(box => {
        box.style.backgroundColor = '';
        box.style.border = '';
        box.style.borderRadius = '';
        box.style.padding = '';
        box.style.marginBottom = '';
        box.style.color = '';
        box.style.fontWeight = '';
    });

    const navLinks = document.querySelectorAll('.box_links a, .main_menu a');
    navLinks.forEach(link => {
        link.style.color = '';
        link.style.backgroundColor = '';
        link.style.fontWeight = '';
        link.style.textDecoration = '';
        link.style.textDecorationThickness = '';
        link.style.padding = '';
        link.style.border = '';
        link.style.transition = '';
    });

    const headers = document.querySelectorAll('h1, h2, h3, .news_title');
    headers.forEach(header => {
        header.style.color = '';
        header.style.textShadow = '';
        header.style.fontSize = '';
        header.style.fontWeight = '';
        header.style.textTransform = '';
        header.style.letterSpacing = '';
    });

    const firstNewsBox = document.querySelector('.news_box');
    if (firstNewsBox && firstNewsBox.parentElement) {
        firstNewsBox.parentElement.style.backgroundColor = '';
        firstNewsBox.parentElement.style.padding = '';
        firstNewsBox.parentElement.style.border = '';
    }

    const boxLinks = document.querySelector('.box_links');
    if (boxLinks && boxLinks.children) {
        Array.from(boxLinks.children).forEach(child => {
            child.style.margin = '';
            child.style.display = '';
            child.style.fontWeight = '';
        });
    }

    const contentArea = document.querySelector('.content_area, #content');
    if (contentArea) {
        contentArea.style.backgroundColor = '';
        contentArea.style.borderRadius = '';
        contentArea.style.padding = '';
        contentArea.style.border = '';
        contentArea.style.color = '';
        contentArea.style.fontWeight = '';
    }

    const textElements = document.querySelectorAll('p, span, div, li');
    textElements.forEach(element => {
        element.style.color = '';
        element.style.fontWeight = '';
    });

    const buttons = document.querySelectorAll('button, .button, input[type="submit"]');
    buttons.forEach(button => {
        button.style.backgroundColor = '';
        button.style.color = '';
        button.style.border = '';
        button.style.fontWeight = '';
        button.style.padding = '';
        button.style.fontSize = '';
    });

    console.log('High Visibility стили удалены');
}

// Функция для переключения стилей
function toggleStyles() {
    const currentState = localStorage.getItem(STYLE_STATE_KEY);
    const newState = currentState === 'enabled' ? 'disabled' : 'enabled';
    
    localStorage.setItem(STYLE_STATE_KEY, newState);
    
    if (newState === 'enabled') {
        applyCustomStyles();
    } else {
        removeCustomStyles();
    }
    
    updateButtonStatus(newState);
}

// Функция для обновления статуса кнопки
function updateButtonStatus(state) {
    const button = document.getElementById('style-toggle-btn');
    if (button) {
        if (state === 'enabled') {
            button.textContent = '⚠️ High Visibility: ВКЛ';
            button.style.backgroundColor = '#000000';
            button.style.color = '#ffff00';
            button.style.border = '3px solid #ffff00';
        } else {
            button.textContent = '⚠️ High Visibility: ВЫКЛ';
            button.style.backgroundColor = '#95a5a6';
            button.style.color = '#ffffff';
            button.style.border = '2px solid #7f8c8d';
        }
    }
}

// Функция для создания кнопки переключения
function createToggleButton() {
    // Проверяем, не создана ли уже кнопка
    if (document.getElementById('style-toggle-btn')) {
        console.log('Кнопка уже добавлена');
        return;
    }

    const buttonContainer = document.querySelector('.box_links');
    if (!buttonContainer) {
        console.log('Не найден контейнер для кнопок');
        return;
    }

    const button = document.createElement('div');
    button.id = 'style-toggle-btn';
    
    // Получаем текущее состояние из localStorage
    const currentState = localStorage.getItem(STYLE_STATE_KEY) || 'disabled';
    button.textContent = currentState === 'enabled' ? '⚠️ High Visibility: ВКЛ' : '⚠️ High Visibility: ВЫКЛ';
    button.title = 'Переключить High Visibility режим (для строительных сайтов)';
    
    // Стили для кнопки
    if (currentState === 'enabled') {
        Object.assign(button.style, {
            padding: '10px 20px',
            border: '3px solid #ffff00',
            backgroundColor: '#000000',
            color: '#ffff00',
            fontSize: '16px',
            cursor: 'pointer',
            margin: '5px',
            borderRadius: '0',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
            textAlign: 'center',
            float: 'left',
            transition: 'all 0.3s ease',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '1px'
        });
    } else {
        Object.assign(button.style, {
            padding: '10px 20px',
            border: '2px solid #7f8c8d',
            backgroundColor: '#95a5a6',
            color: '#ffffff',
            fontSize: '16px',
            cursor: 'pointer',
            margin: '5px',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            float: 'left',
            transition: 'all 0.3s ease',
            fontWeight: 'bold'
        });
    }
    
    // Эффекты при наведении
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.05)';
        button.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.4)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
        const currentState = localStorage.getItem(STYLE_STATE_KEY);
        if (currentState === 'enabled') {
            button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5)';
        } else {
            button.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
        }
    });
    
    // Обработчик клика
    button.addEventListener('click', toggleStyles);
    
    // Добавляем кнопку на страницу
    buttonContainer.appendChild(button);
    
    console.log('Кнопка переключения High Visibility добавлена');
}

// Функция инициализации
function initStyleSwitcher() {
    // Создаем кнопку
    createToggleButton();
    
    // Проверяем сохраненное состояние и применяем стили, если нужно
    const savedState = localStorage.getItem(STYLE_STATE_KEY);
    if (savedState === 'enabled') {
        applyCustomStyles();
        updateButtonStatus('enabled');
    }
    
    console.log('High Visibility Style Switcher инициализирован');
}

// Запуск при загрузке страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStyleSwitcher);
} else {
    initStyleSwitcher();
}
