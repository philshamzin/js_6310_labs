'use strict'

// ===== ЗАДАНИЕ 1: Базовый класс Vehicle =====
class Vehicle {
    static vehicleCount = 0;

    constructor(make, model, year) {
        if (typeof make !== 'string' || make.trim() === '') {
            throw new Error('Марка должна быть непустой строкой');
        }
        if (typeof model !== 'string' || model.trim() === '') {
            throw new Error('Модель должна быть непустой строкой');
        }
        if (typeof year !== 'number' || !Number.isInteger(year) || year < 1900 || year > new Date().getFullYear()) {
            throw new Error('Год должен быть целым числом от 1900 до текущего года');
        }
        Vehicle.vehicleCount++;
        this.make = make;
        this.model = model;
        this._year = year;
    }

    displayInfo() {
        console.log(`Марка: ${this.make}, Модель: ${this.model}, Год: ${this.year}`);
    }

    get age() {
        return new Date().getFullYear() - this._year;
    }

    set year(newYear) {
        const currentYear = new Date().getFullYear();
        if (typeof newYear !== 'number' || !Number.isInteger(newYear) || newYear < 1900 || newYear > currentYear) {
            throw new Error('Год должен быть целым числом от 1900 до текущего года');
        }
        this._year = newYear;
    }

    get year() {
        return this._year;
    }

    static compareAge(vehicle1, vehicle2) {
        return Math.abs(vehicle1.age - vehicle2.age);
    }

    static getTotalVehicles() {
        return Vehicle.vehicleCount;
    }
}

// ===== ЗАДАНИЕ 2: Класс Car (наследуется от Vehicle) =====
class Car extends Vehicle {
    constructor(make, model, year, numDoors) {
        super(make, model, year);
        if (typeof numDoors !== 'number' || !Number.isInteger(numDoors) || numDoors < 0) {
            throw new Error('Количество дверей должно быть неотрицательным целым числом');
        }
        this.numDoors = numDoors;
    }

    displayInfo() {
        super.displayInfo();
        console.log(`Количество дверей: ${this.numDoors}`);
    }

    honk() {
        console.log('Beep beep!');
    }
}

// ===== ЗАДАНИЕ 3: Класс ElectricCar (наследуется от Car) =====
class ElectricCar extends Car {
    constructor(make, model, year, numDoors, batteryCapacity) {
        super(make, model, year, numDoors);
        if (typeof batteryCapacity !== 'number' || batteryCapacity < 0) {
            throw new Error('Емкость батареи должна быть неотрицательным числом');
        }
        this.batteryCapacity = batteryCapacity;
    }

    displayInfo() {
        super.displayInfo();
        console.log(`Емкость батареи: ${this.batteryCapacity} кВт·ч`);
    }

    calculateRange() {
        return this.batteryCapacity * 6;
    }
}

// ===== ЗАДАНИЕ 4: Каррирование =====
const createVehicleFactory = (vehicleType) => (make, model, year, ...additionalArgs) => {
    return new vehicleType(make, model, year, ...additionalArgs);
};

// Автоматические тесты
function runTests() {
    console.log('Запуск тестов...');

    Vehicle.vehicleCount = 0;

    // ===== ТЕСТЫ ДЛЯ ЗАДАНИЯ 1 =====
    console.log('\n=== ТЕСТЫ ДЛЯ ЗАДАНИЯ 1: Базовый класс Vehicle ===');

    console.log('\n--- Тест 1.1: Создание Vehicle и основные методы ---');
    const vehicle = new Vehicle('Toyota', 'Camry', 2015);
    vehicle.displayInfo();
    console.log(`Возраст: ${vehicle.age} лет`);
    console.assert(vehicle.make === 'Toyota', 'Свойство make не соответствует');
    console.assert(vehicle.model === 'Camry', 'Свойство model не соответствует');
    console.assert(vehicle.year === 2015, 'Свойство year не соответствует');
    console.assert(vehicle.age > 0, 'Геттер age не работает');

    console.log('\n--- Тест 1.2: Геттер age ---');
    const testVehicle = new Vehicle('Test', 'Model', 2010);
    const expectedAge = new Date().getFullYear() - 2010;
    console.log(`Ожидаемый возраст: ${expectedAge}, Фактический: ${testVehicle.age}`);
    console.assert(testVehicle.age === expectedAge, 'Тест возраста провален');

    console.log('\n--- Тест 1.3: Сеттер года ---');
    const testVehicle2 = new Vehicle('Test', 'Car', 2010);
    console.log(`Изначальный год: ${testVehicle2.year}`);
    testVehicle2.year = 2015;
    testVehicle2.displayInfo();
    console.assert(testVehicle2.year === 2015, 'Сеттер года не изменил значение');

    console.log('\n--- Тест 1.4: Проверка сеттера на невалидный год ---');
    try {
        testVehicle2.year = new Date().getFullYear() + 1;
        console.log('Ошибка: сеттер не выбросил исключение для будущего года');
    } catch (error) {
        console.log('Ожидаемая ошибка при установке будущего года:', error.message);
    }

    console.log('\n--- Тест 1.5: Статический метод compareAge ---');
    const vehicle1 = new Vehicle('Brand1', 'Model1', 2015);
    const vehicle2 = new Vehicle('Brand2', 'Model2', 2020);
    const ageDifference = Vehicle.compareAge(vehicle1, vehicle2);
    console.log(`Разница в возрасте: ${ageDifference} лет`);
    console.assert(ageDifference === 5, 'Статический метод compareAge возвращает неверную разницу');

    console.log('\n--- Тест 1.6: Счетчик транспортных средств ---');
    console.log(`Общее количество созданных транспортных средств: ${Vehicle.getTotalVehicles()} шт`);
    console.assert(Vehicle.getTotalVehicles() === 5, 'Статический метод getTotalVehicles неверен');

    console.log('\n--- Тесты валидации для Vehicle ---');
    console.log('\n--- Тест 1.7: Тип марки - число ---');
    try {
        new Vehicle(1, 'Camry', 2015);
        console.log('Ошибка: конструктор не проверил тип марки');
    } catch (error) {
        console.log('Ожидаемая ошибка для типа марки:', error.message);
    }

    console.log('\n--- Тест 1.8: Пустая марка ---');
    try {
        new Vehicle('', 'Camry', 2015);
        console.log('Ошибка: конструктор не проверил пустую марку');
    } catch (error) {
        console.log('Ожидаемая ошибка для пустой марки:', error.message);
    }

    console.log('\n--- Тест 1.9: Тип модели - число ---');
    try {
        new Vehicle('Toyota', 1, 2015);
        console.log('Ошибка: конструктор не проверил тип модели');
    } catch (error) {
        console.log('Ожидаемая ошибка для типа модели:', error.message);
    }

    console.log('\n--- Тест 1.10: Пустая модель ---');
    try {
        new Vehicle('Toyota', '', 2015);
        console.log('Ошибка: конструктор не проверил пустую модель');
    } catch (error) {
        console.log('Ожидаемая ошибка для пустой модели:', error.message);
    }

    console.log('\n--- Тест 1.11: Тип года - строка ---');
    try {
        new Vehicle('Toyota', 'Camry', '2015');
        console.log('Ошибка: конструктор не проверил тип года');
    } catch (error) {
        console.log('Ожидаемая ошибка для типа года:', error.message);
    }

    console.log('\n--- Тест 1.12: Отсутствие года ---');
    try {
        new Vehicle('Toyota', 'Camry');
        console.log('Ошибка: конструктор не проверил отсутствие года');
    } catch (error) {
        console.log('Ожидаемая ошибка для отсутствия года:', error.message);
    }

    console.log('\n--- Тест 1.13: Дробный год ---');
    try {
        new Vehicle('Toyota', 'Camry', 2015.5);
        console.log('Ошибка: конструктор не проверил дробный год');
    } catch (error) {
        console.log('Ожидаемая ошибка для дробного года:', error.message);
    }

    console.log('\n--- Тест 1.14: Слишком старый год ---');
    try {
        new Vehicle('Toyota', 'Camry', 1);
        console.log('Ошибка: конструктор не проверил слишком старый год');
    } catch (error) {
        console.log('Ожидаемая ошибка для слишком старого года:', error.message);
    }

    console.log('\n--- Тест 1.15: Год в будущем ---');
    try {
        new Vehicle('Toyota', 'Camry', 2030);
        console.log('Ошибка: конструктор не проверил год в будущем');
    } catch (error) {
        console.log('Ожидаемая ошибка для года в будущем:', error.message);
    }

    // ===== ТЕСТЫ ДЛЯ ЗАДАНИЯ 2 =====
    console.log('\n=== ТЕСТЫ ДЛЯ ЗАДАНИЯ 2: Класс Car ===');

    console.log('\n--- Тест 2.1: Создание Car и основные методы ---');
    const car = new Car('Honda', 'Civic', 2018, 4);
    car.displayInfo();
    car.honk();
    console.assert(car.numDoors === 4, 'Свойство numDoors не соответствует');

    console.log('\n--- Тест 2.2: Наследование от Vehicle ---');
    console.log(`car instanceof Vehicle: ${car instanceof Vehicle}`);
    console.log(`car instanceof Car: ${car instanceof Car}`);
    console.assert(car instanceof Vehicle, 'Car не наследует от Vehicle');
    console.assert(car instanceof Car, 'Car не является экземпляром Car');
    console.assert(typeof car.age === 'number' && car.age > 0, 'Наследует геттер age: провален');

    console.log('\n--- Тесты валидации для Car ---');
    console.log('\n--- Тест 2.3: Тип количества дверей - строка ---');
    try {
        new Car('Honda', 'Civic', 2018, '4');
        console.log('Ошибка: конструктор не проверил тип количества дверей');
    } catch (error) {
        console.log('Ожидаемая ошибка для типа количества дверей:', error.message);
    }

    console.log('\n--- Тест 2.4: Дробное количество дверей ---');
    try {
        new Car('Honda', 'Civic', 2018, 4.5);
        console.log('Ошибка: конструктор не проверил дробное количество дверей');
    } catch (error) {
        console.log('Ожидаемая ошибка для дробного количества дверей:', error.message);
    }

    console.log('\n--- Тест 2.5: Нулевое количество дверей ---');
    try {
        new Car('Honda', 'Civic', 2018, 0);
        console.log('Нулевое количество дверей разрешено');
    } catch (error) {
        console.log('Ошибка: конструктор не разрешил нулевое количество дверей');
    }

    // ===== ТЕСТЫ ДЛЯ ЗАДАНИЯ 3 =====
    console.log('\n=== ТЕСТЫ ДЛЯ ЗАДАНИЯ 3: Класс ElectricCar ===');

    console.log('\n--- Тест 3.1: Создание ElectricCar и основные методы ---');
    const electricCar = new ElectricCar('Tesla', 'Model 3', 2020, 4, 75);
    electricCar.displayInfo();
    console.log(`Запас хода: ${electricCar.calculateRange()} км`);
    console.assert(electricCar.batteryCapacity === 75, 'Свойство batteryCapacity не соответствует');
    console.assert(electricCar.calculateRange() === 450, 'Расчет запаса хода неверен');

    console.log('\n--- Тест 3.2: Проверка формулы calculateRange ---');
    const expectedRange = 75 * 6;
    const actualRange = electricCar.calculateRange();
    console.log(`Ожидаемый запас хода: ${expectedRange} км, Фактический: ${actualRange} км`);
    console.assert(actualRange === expectedRange, 'Тест calculateRange провален');

    console.log('\n--- Тест 3.3: Наследование ---');
    console.log(`electricCar instanceof Car: ${electricCar instanceof Car}`);
    console.log(`electricCar instanceof Vehicle: ${electricCar instanceof Vehicle}`);
    console.log(`Наследует метод honk: ${typeof electricCar.honk === 'function'}`);
    console.assert(electricCar instanceof Car, 'ElectricCar не наследует от Car');
    console.assert(electricCar instanceof Vehicle, 'ElectricCar не наследует от Vehicle');
    console.assert(typeof electricCar.honk === 'function', 'Наследует метод honk: провален');
    electricCar.honk();

    console.log('\n--- Тесты валидации для ElectricCar ---');
    console.log('\n--- Тест 3.4: Тип емкости батареи - строка ---');
    try {
        new ElectricCar('Tesla', 'Model 3', 2020, 4, '75');
        console.log('Ошибка: конструктор не проверил тип емкости батареи');
    } catch (error) {
        console.log('Ожидаемая ошибка для типа емкости батареи:', error.message);
    }

    console.log('\n--- Тест 3.5: Дробная емкость батареи ---');
    try {
        new ElectricCar('Tesla', 'Model 3', 2020, 4, 75.5);
        console.log('Дробная емкость батареи разрешена');
    } catch (error) {
        console.log('Ошибка: конструктор не разрешил дробную емкость батареи');
    }

    console.log('\n--- Тест 3.6: Нулевая емкость батареи ---');
    try {
        new ElectricCar('Tesla', 'Model 3', 2020, 4, 0);
        console.log('Нулевая емкость батареи разрешена');
    } catch (error) {
        console.log('Ошибка: конструктор не разрешил нулевую емкость батареи');
    }

    console.log('\n--- Тест 3.7: Отсутствие емкости батареи ---');
    try {
        new ElectricCar('Tesla', 'Model 3', 2020, 4);
        console.log('Ошибка: конструктор не проверил отсутствие емкости батареи');
    } catch (error) {
        console.log('Ожидаемая ошибка для отсутствия емкости батареи:', error.message);
    }

    // Общий тест для сеттера года на будущее значение
    console.log('\n--- Общий тест: Сеттер года на будущее значение ---');
    const vehicle_1 = new Vehicle('Test', 'Model', 2020);
    try {
        vehicle_1.year = 2026;
        console.log('Ошибка: сеттер не выбросил исключение для будущего года');
    } catch (error) {
        console.log('Ожидаемая ошибка для будущего года в сеттере:', error.message);
    }

    // ===== ТЕСТЫ ДЛЯ ЗАДАНИЯ 4 =====
    console.log('\n=== ТЕСТЫ ДЛЯ ЗАДАНИЯ 4: Каррирование ===');

    console.log('\n--- Тест 4.1: Фабрика для Car ---');
    const createCarFactory = createVehicleFactory(Car);
    const myNewCar = createCarFactory('BMW', 'X5', 2022, 5);
    console.log('Создан новый автомобиль через фабрику:');
    myNewCar.displayInfo();

    console.log('\n--- Тест 4.2: Фабрика для ElectricCar ---');
    const createElectricCarFactory = createVehicleFactory(ElectricCar);
    const myNewElectricCar = createElectricCarFactory('Nissan', 'Leaf', 2021, 5, 40);
    console.log('Создан новый электромобиль через фабрику:');
    myNewElectricCar.displayInfo();
    console.log(`Запас хода: ${myNewElectricCar.calculateRange()} км`);

    console.log('\n--- Тест 4.3: Фабрика для Vehicle ---');
    const createVehicleFactory_1 = createVehicleFactory(Vehicle);
    const myNewVehicle = createVehicleFactory_1('Ford', 'Focus', 2019);
    console.log('Создан новый транспорт через фабрику:');
    myNewVehicle.displayInfo();

    // ===== ТЕСТЫ ДЛЯ ЗАДАНИЯ 5 =====
    console.log('\n=== ТЕСТЫ ДЛЯ ЗАДАНИЯ 5: Статические методы и свойства ===');
    console.log(`Всего создано транспортных средств: ${Vehicle.getTotalVehicles()} шт`);
    console.assert(Vehicle.getTotalVehicles() > 0, 'Счетчик транспортных средств не работает');

    console.log('\n✅ Все тесты пройдены!');
}

runTests();