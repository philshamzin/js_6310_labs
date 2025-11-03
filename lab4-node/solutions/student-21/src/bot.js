import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { generateField, getRandomTetramino, getTetrisRules } from './utils/index.js';

// Состояния для конечного автомата
const States = {
  IDLE: 'idle',
  WAITING_RULES: 'waiting_rules',
  WAITING_FIELD: 'waiting_field',
  WAITING_TETRAMINO: 'waiting_tetramino'
};

// Хранилище состояний пользователей
const userStates = new Map();

// Функция для получения состояния пользователя
const getUserState = (userId) => {
  if (!userStates.has(userId)) {
    userStates.set(userId, States.IDLE);
  }
  return userStates.get(userId);
};

// Функция для установки состояния пользователя
const setUserState = (userId, state) => {
  userStates.set(userId, state);
};

// Функция запуска бота
const runBot = () => {
  dotenv.config();
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    console.error('Ошибка: TELEGRAM_BOT_TOKEN не найден в .env файле');
    process.exit(1);
  }

  const bot = new TelegramBot(token, { polling: true });

  console.log('🎮 TetrisBattle 2 Bot запущен...');

  // Обработка команды /start
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    
    setUserState(userId, States.IDLE);
    
    const welcomeMessage = `
🎮 Добро пожаловать в TetrisBattle 2!

Я - справочный бот для мультиплеерного Тетриса.

Доступные команды:
/rules - Правила игры
/field - Показать игровое поле
/next_tetramino - Получить случайное тетрамино
/help - Показать список команд
    `.trim();
    
    bot.sendMessage(chatId, welcomeMessage);
  });

  // Обработка команды /help
  bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    
    const helpMessage = `
📚 Доступные команды:

/rules - Узнать правила мультиплеерного Тетриса
/field - Отобразить пустое игровое поле
/next_tetramino - Получить случайное тетрамино
/start - Перезапустить бота
/help - Показать это сообщение
    `.trim();
    
    bot.sendMessage(chatId, helpMessage);
  });

  // Обработка команды /rules
  bot.onText(/\/rules/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    
    setUserState(userId, States.WAITING_RULES);
    
    try {
      const rules = getTetrisRules();
      bot.sendMessage(chatId, rules, { parse_mode: 'Markdown' });
      setUserState(userId, States.IDLE);
    } catch (error) {
      bot.sendMessage(chatId, '❌ Ошибка при получении правил. Попробуйте снова.');
      setUserState(userId, States.IDLE);
    }
  });

  // Обработка команды /field
  bot.onText(/\/field/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    
    setUserState(userId, States.WAITING_FIELD);
    
    try {
      const field = generateField();
      bot.sendMessage(chatId, `\`\`\`\n${field}\n\`\`\``, { parse_mode: 'Markdown' });
      setUserState(userId, States.IDLE);
    } catch (error) {
      bot.sendMessage(chatId, '❌ Ошибка при генерации поля. Попробуйте снова.');
      setUserState(userId, States.IDLE);
    }
  });

  // Обработка команды /next_tetramino
  bot.onText(/\/next_tetramino/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    
    setUserState(userId, States.WAITING_TETRAMINO);
    
    try {
      const tetramino = getRandomTetramino();
      const message = `
🎲 Ваше следующее тетрамино: *${tetramino.name}*

Форма:
\`\`\`
${tetramino.shape}
\`\`\`

Цвет: ${tetramino.color}
      `.trim();
      
      bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
      setUserState(userId, States.IDLE);
    } catch (error) {
      bot.sendMessage(chatId, '❌ Ошибка при генерации тетрамино. Попробуйте снова.');
      setUserState(userId, States.IDLE);
    }
  });

  // Обработка неизвестных команд
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    
    // Проверяем, что это не команда
    if (text && !text.startsWith('/')) {
      const state = getUserState(msg.from.id);
      
      if (state === States.IDLE) {
        bot.sendMessage(
          chatId, 
          'Используйте команды /help для списка доступных команд или /start для начала работы.'
        );
      }
    }
  });

  // Обработка ошибок polling
  bot.on('polling_error', (error) => {
    console.error('Polling error:', error.code, error.message);
  });
};

export default runBot;
