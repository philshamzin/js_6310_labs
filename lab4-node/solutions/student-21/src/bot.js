import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { getRandomTetromino, getTetrisRules, generateField } from './utils/index.js';

dotenv.config();
const token = process.env.TELEGRAM_BOT_TOKEN;

const runBot = () => {
  const bot = new TelegramBot(token, { polling: true });

  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет! Я бот-справочник для игры в мультиплеерный Тетрис. Используй команды /rules, /field, /next_tetramino.');
  });

  bot.onText(/\/rules/, (msg) => {
    const chatId = msg.chat.id;
    const rules = getTetrisRules();
    bot.sendMessage(chatId, rules, { parse_mode: 'Markdown' });
  });

  bot.onText(/\/field/, (msg) => {
    const chatId = msg.chat.id;
    const field = generateField();
    bot.sendMessage(chatId, field, { parse_mode: 'Markdown' });
  });

  bot.onText(/\/next_tetramino/, (msg) => {
    const chatId = msg.chat.id;
    const tetromino = getRandomTetromino();
    bot.sendMessage(chatId, tetromino, { parse_mode: 'Markdown' });
  });

  console.log('🎮 Бот "TetrisBattle 2" запущен...');
};

export default runBot;
