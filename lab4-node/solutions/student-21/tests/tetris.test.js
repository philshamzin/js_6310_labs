import { describe, test, expect } from '@jest/globals';
import { getRandomTetromino, getTetrisRules, generateField } from '../src/utils/index.js';

describe('Tetris Utils Module', () => {
  
  describe('getRandomTetromino', () => {
    test('should return a non-empty string', () => {
      const result = getRandomTetromino();
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    test('should return a string containing figure details', () => {
      const result = getRandomTetromino();
      expect(result).toMatch(/Фигура [IOTSZLJ]:\n```\n(.|\n)+\n```/);
    });

    test('should contain Фигура word', () => {
      const result = getRandomTetromino();
      expect(result).toContain('Фигура');
    });

    test('should return different tetrominos on multiple calls', () => {
      const results = new Set();
      for (let i = 0; i < 50; i++) {
        results.add(getRandomTetromino());
      }
      expect(results.size).toBeGreaterThan(1);
    });

    test('should contain markdown code blocks', () => {
      const result = getRandomTetromino();
      expect(result).toContain('```');
    });

    test('should return valid tetromino types I, O, T, L, J, S, Z', () => {
      const validTypes = ['I', 'O', 'T', 'L', 'J', 'S', 'Z'];
      const result = getRandomTetromino();
      const hasValidType = validTypes.some(type => result.includes(`Фигура ${type}:`));
      expect(hasValidType).toBe(true);
    });
  });

  describe('getTetrisRules', () => {
    test('should return rules as a string', () => {
      const rules = getTetrisRules();
      expect(typeof rules).toBe('string');
      expect(rules.length).toBeGreaterThan(100);
    });

    test('should contain key game information', () => {
      const rules = getTetrisRules();
      expect(rules).toContain('Правила');
      expect(rules).toContain('Tetris');
    });

    test('should contain multiplayer mechanics', () => {
      const rules = getTetrisRules();
      expect(rules).toContain('мусор');
      expect(rules).toContain('атак');
    });

    test('should contain scoring information', () => {
      const rules = getTetrisRules();
      expect(rules).toContain('double');
      expect(rules).toContain('triple');
      expect(rules).toContain('tetris');
    });

    test('should contain defense mechanics', () => {
      const rules = getTetrisRules();
      expect(rules).toContain('защит');
      expect(rules).toContain('очеред');
    });

    test('should contain target selection info', () => {
      const rules = getTetrisRules();
      expect(rules).toContain('цел');
      expect(rules).toContain('игрок');
    });

    test('should mention tetromino types', () => {
      const rules = getTetrisRules();
      expect(rules).toContain('I, O, T, L, J, S, Z');
    });
  });

  describe('generateField', () => {
    test('should return field as a string', () => {
      const field = generateField();
      expect(typeof field).toBe('string');
      expect(field.length).toBeGreaterThan(0);
    });

    test('should contain field title', () => {
      const field = generateField();
      expect(field).toContain('Пустое поле');
      expect(field).toContain('10x20');
    });

    test('should contain field borders', () => {
      const field = generateField();
      expect(field).toContain('|');
      expect(field).toContain('-');
    });

    test('should contain empty cells', () => {
      const field = generateField();
      expect(field).toContain('.');
    });

    test('should contain markdown code blocks', () => {
      const field = generateField();
      expect(field).toContain('```');
    });

    test('should have multiple rows', () => {
      const field = generateField();
      const lines = field.split('\n');
      expect(lines.length).toBeGreaterThan(20);
    });

    test('should have field rows with correct format', () => {
      const field = generateField();
      expect(field).toContain('|..........|');
    });

    test('should have bottom border', () => {
      const field = generateField();
      expect(field).toContain('------------');
    });
  });

  describe('Utils exports', () => {
    test('should export all required functions', () => {
      expect(typeof getRandomTetromino).toBe('function');
      expect(typeof getTetrisRules).toBe('function');
      expect(typeof generateField).toBe('function');
    });
  });
});
