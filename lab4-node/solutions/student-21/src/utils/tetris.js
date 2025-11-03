// Классические тетрамино
const TETRAMINOS = [
  {
    name: 'I-тетрамино',
    shape: `
████
    `.trim(),
    color: '🟦 Голубой',
    symbol: '█'
  },
  {
    name: 'O-тетрамино',
    shape: `
██
██
    `.trim(),
    color: '🟨 Желтый',
    symbol: '█'
  },
  {
    name: 'T-тетрамино',
    shape: `
 █ 
███
    `.trim(),
    color: '🟪 Фиолетовый',
    symbol: '█'
  },
  {
    name: 'S-тетрамино',
    shape: `
 ██
██ 
    `.trim(),
    color: '🟩 Зеленый',
    symbol: '█'
  },
  {
    name: 'Z-тетрамино',
    shape: `
██ 
 ██
    `.trim(),
    color: '🟥 Красный',
    symbol: '█'
  },
  {
    name: 'J-тетрамино',
    shape: `
█  
███
    `.trim(),
    color: '🟦 Синий',
    symbol: '█'
  },
  {
    name: 'L-тетрамино',
    shape: `
  █
███
    `.trim(),
    color: '🟧 Оранжевый',
    symbol: '█'
  }
];

// Правила мультиплеерного Тетриса
export const getTetrisRules = () => {
  return `
📜 *Правила TetrisBattle 2 - Мультиплеерный Тетрис*

🎯 *Цель игры:*
Очистить больше линий, чем ваш соперник, и продержаться дольше всех!

🎮 *Основные правила:*

1️⃣ *Игровое поле* - сетка 10×20 клеток
2️⃣ *Тетрамино* - падающие фигуры из 4 блоков
3️⃣ *Управление:*
   • ← → Перемещение влево/вправо
   • ↓ Ускорить падение
   • ↑ Поворот фигуры
   • Пробел - Мгновенное падение

4️⃣ *Очистка линий:*
   • Заполните горизонтальную линию полностью
   • Линия исчезает, верхние блоки опускаются
   • Очки начисляются за количество линий

5️⃣ *Мультиплеер особенности:*
   • При очистке 2+ линий, соперникам добавляются мусорные линии
   • Комбо-очистки дают больше мусора сопернику
   • Последний выживший игрок побеждает

6️⃣ *Проигрыш:*
   • Когда блоки достигают верха поля
   • Новое тетрамино не может быть размещено

⚡ *Типы тетрамино:*
I, O, T, S, Z, J, L (7 различных фигур)

🏆 *Система очков:*
• 1 линия = 100 очков
• 2 линии = 300 очков
• 3 линии = 500 очков
• 4 линии (Тетрис) = 800 очков

💡 *Совет:* Практикуйтесь размещать фигуры эффективно и создавайте комбо для атаки соперников!
  `.trim();
};

// Генерация пустого игрового поля
export const generateField = (width = 10, height = 20) => {
  if (width < 4 || width > 20) {
    throw new Error('Ширина поля должна быть от 4 до 20');
  }
  if (height < 10 || height > 30) {
    throw new Error('Высота поля должна быть от 10 до 30');
  }

  const field = [];
  const topBorder = '╔' + '═'.repeat(width) + '╗';
  const bottomBorder = '╚' + '═'.repeat(width) + '╝';

  field.push(topBorder);

  for (let i = 0; i < height; i++) {
    const row = '║' + '·'.repeat(width) + '║';
    field.push(row);
  }

  field.push(bottomBorder);

  return field.join('\n');
};

// Получение случайного тетрамино
export const getRandomTetramino = () => {
  if (!TETRAMINOS || TETRAMINOS.length === 0) {
    throw new Error('Список тетрамино пуст');
  }

  const randomIndex = Math.floor(Math.random() * TETRAMINOS.length);
  return { ...TETRAMINOS[randomIndex] };
};

// Получение всех доступных тетрамино
export const getAllTetraminos = () => {
  return TETRAMINOS.map(t => ({ ...t }));
};

// Валидация размеров поля
export const isValidFieldSize = (width, height) => {
  return width >= 4 && width <= 20 && height >= 10 && height <= 30;
};
