import mealsCounter from './mealsCounter.js';

describe('test meals counter function', () => {
  test('calculate the number of meals in home page', async () => {
    const meals = await mealsCounter();
    expect(meals).toHaveLength(16);
  });
});