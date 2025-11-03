import { describe, test, expect } from '@jest/globals';
import {
  getTetrisRules,
  generateField,
  getRandomTetramino,
  getAllTetraminos,
  isValidFieldSize
} from '../src/utils/index.js';

describe('Tetris Utils Module', () => {
  
  describe('getTetrisRules', () => {
    test('should return rules as a string', () => {
      const rules = getTetrisRules();
      expect(typeof rules).toBe('string');
      expect(rules.length).toBeGreaterThan(100);
    });

    test('should contain key game information', () => {
      const rules = getTetrisRules();
      expect(rules).toContain('Правила');
      expect(rules).toContain('Тетрис');
      expect(rules).toContain('10×20');
    });

    test('should mention all tetramino types', () => {
      const rules = getTetrisRules();
      expect(rules).toContain('I, O, T, S, Z, J, L');
    });
  });

  describe('generateField', () => {
    test('should generate field with default size 10x20', () => {
      const field = generateField();
      expect(typeof field).toBe('string');
      const lines = field.split('\n');
      expect(lines.length).toBe(22); // 20 rows + top and bottom borders
    });

    test('should generate field with custom size', () => {
      const field = generateField(8, 15);
      const lines = field.split('\n');
      expect(lines.length).toBe(17); // 15 rows + 2 borders
    });

    test('should contain borders', () => {
      const field = generateField();
      expect(field).toContain('╔');
      expect(field).toContain('╗');
      expect(field).toContain('╚');
      expect(field).toContain('╝');
      expect(field).toContain('║');
    });

    test('should throw error for invalid width', () => {
      expect(() => generateField(2, 20)).toThrow('Ширина поля должна быть от 4 до 20');
      expect(() => generateField(25, 20)).toThrow('Ширина поля должна быть от 4 до 20');
    });

    test('should throw error for invalid height', () => {
      expect(() => generateField(10, 5)).toThrow('Высота поля должна быть от 10 до 30');
      expect(() => generateField(10, 35)).toThrow('Высота поля должна быть от 10 до 30');
    });

    test('should generate field with correct width', () => {
      const field = generateField(10, 20);
      const lines = field.split('\n');
      // Проверяем длину первой строки (граница)
      expect(lines[0].length).toBe(12); // ╔ + 10 символов + ╗
    });
  });

  describe('getRandomTetramino', () => {
    test('should return a tetramino object', () => {
      const tetramino = getRandomTetramino();
      expect(tetramino).toHaveProperty('name');
      expect(tetramino).toHaveProperty('shape');
      expect(tetramino).toHaveProperty('color');
      expect(tetramino).toHaveProperty('symbol');
    });

    test('should return valid tetramino names', () => {
      const validNames = [
        'I-тетрамино',
        'O-тетрамино',
        'T-тетрамино',
        'S-тетрамино',
        'Z-тетрамино',
        'J-тетрамино',
        'L-тетрамино'
      ];
      
      const tetramino = getRandomTetramino();
      expect(validNames).toContain(tetramino.name);
    });

    test('should return tetramino with shape string', () => {
      const tetramino = getRandomTetramino();
      expect(typeof tetramino.shape).toBe('string');
      expect(tetramino.shape.length).toBeGreaterThan(0);
    });

    test('should return tetramino with color', () => {
      const tetramino = getRandomTetramino();
      expect(typeof tetramino.color).toBe('string');
      expect(tetramino.color.length).toBeGreaterThan(0);
    });

    test('should return different tetraminos on multiple calls', () => {
      const tetraminos = new Set();
      for (let i = 0; i < 50; i++) {
        tetraminos.add(getRandomTetramino().name);
      }
      // С 50 вызовами должно быть хотя бы 3 разных тетрамино
      expect(tetraminos.size).toBeGreaterThanOrEqual(3);
    });
  });

  describe('getAllTetraminos', () => {
    test('should return array of 7 tetraminos', () => {
      const tetraminos = getAllTetraminos();
      expect(Array.isArray(tetraminos)).toBe(true);
      expect(tetraminos.length).toBe(7);
    });

    test('should return tetraminos with all required properties', () => {
      const tetraminos = getAllTetraminos();
      tetraminos.forEach(tetramino => {
        expect(tetramino).toHaveProperty('name');
        expect(tetramino).toHaveProperty('shape');
        expect(tetramino).toHaveProperty('color');
        expect(tetramino).toHaveProperty('symbol');
      });
    });

    test('should return copies of tetraminos', () => {
      const tetraminos1 = getAllTetraminos();
      const tetraminos2 = getAllTetraminos();
      
      tetraminos1[0].name = 'Modified';
      expect(tetraminos2[0].name).not.toBe('Modified');
    });
  });

  describe('isValidFieldSize', () => {
    test('should return true for valid sizes', () => {
      expect(isValidFieldSize(10, 20)).toBe(true);
      expect(isValidFieldSize(4, 10)).toBe(true);
      expect(isValidFieldSize(20, 30)).toBe(true);
      expect(isValidFieldSize(8, 15)).toBe(true);
    });

    test('should return false for invalid width', () => {
      expect(isValidFieldSize(3, 20)).toBe(false);
      expect(isValidFieldSize(21, 20)).toBe(false);
      expect(isValidFieldSize(0, 20)).toBe(false);
    });

    test('should return false for invalid height', () => {
      expect(isValidFieldSize(10, 9)).toBe(false);
      expect(isValidFieldSize(10, 31)).toBe(false);
      expect(isValidFieldSize(10, 0)).toBe(false);
    });

    test('should return false for both invalid dimensions', () => {
      expect(isValidFieldSize(2, 5)).toBe(false);
      expect(isValidFieldSize(25, 35)).toBe(false);
    });
  });
});
