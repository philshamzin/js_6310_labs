import { describe, test, expect, jest, beforeEach } from '@jest/globals';

const mockSendMessage = jest.fn();
const mockOnText = jest.fn();
const mockTelegramBotConstructor = jest.fn(() => ({
  onText: mockOnText,
  sendMessage: mockSendMessage,
}));

jest.unstable_mockModule('node-telegram-bot-api', () => ({
  default: mockTelegramBotConstructor,
}));

jest.unstable_mockModule('../src/utils/index.js', () => ({
  getRandomTetromino: jest.fn(() => 'Фигура T:\n```\nTTT\n T \n```'),
  getTetrisRules: jest.fn(() => 'Правила "Multiplayer Tetris Battle"'),
  generateField: jest.fn(() => 'Пустое поле для игры (10x20):'),
}));

describe('Telegram Bot Logic', () => {
  let runBot;

  beforeEach(async () => {
    mockSendMessage.mockClear();
    mockOnText.mockClear();
    mockTelegramBotConstructor.mockClear();
    
    const botModule = await import('../src/bot.js');
    runBot = botModule.default;
  });

  test('Bot should run and register command handlers', () => {
    runBot();
    
    expect(mockTelegramBotConstructor).toHaveBeenCalledTimes(1);
    expect(mockOnText).toHaveBeenCalledTimes(4);
    expect(mockOnText).toHaveBeenCalledWith(/\/start/, expect.any(Function));
    expect(mockOnText).toHaveBeenCalledWith(/\/rules/, expect.any(Function));
    expect(mockOnText).toHaveBeenCalledWith(/\/field/, expect.any(Function));
    expect(mockOnText).toHaveBeenCalledWith(/\/next_tetramino/, expect.any(Function));
  });

  test('should send a welcome message on /start', () => {
    runBot();
    const startCallback = mockOnText.mock.calls.find(call => call[0].toString() === '/\\/start/')[1];
    const msg = { chat: { id: 123 } };
    startCallback(msg);
    expect(mockSendMessage).toHaveBeenCalledWith(123, 'Привет! Я бот-справочник для игры в мультиплеерный Тетрис. Используй команды /rules, /field, /next_tetramino.');
  });
  
  test('should send rules on /rules', () => {
    runBot();
    const rulesCallback = mockOnText.mock.calls.find(call => call[0].toString() === '/\\/rules/')[1];
    const msg = { chat: { id: 123 } };
    rulesCallback(msg);
    expect(mockSendMessage).toHaveBeenCalledWith(123, 'Правила "Multiplayer Tetris Battle"', { parse_mode: 'Markdown' });
  });

  test('should send field on /field', () => {
    runBot();
    const fieldCallback = mockOnText.mock.calls.find(call => call[0].toString() === '/\\/field/')[1];
    const msg = { chat: { id: 123 } };
    fieldCallback(msg);
    expect(mockSendMessage).toHaveBeenCalledWith(123, 'Пустое поле для игры (10x20):', { parse_mode: 'Markdown' });
  });

  test('should send a random tetromino on /next_tetramino', () => {
    runBot();
    const tetrominoCallback = mockOnText.mock.calls.find(call => call[0].toString() === '/\\/next_tetramino/')[1];
    const msg = { chat: { id: 123 } };
    tetrominoCallback(msg);
    expect(mockSendMessage).toHaveBeenCalledWith(123, 'Фигура T:\n```\nTTT\n T \n```', { parse_mode: 'Markdown' });
  });
});
