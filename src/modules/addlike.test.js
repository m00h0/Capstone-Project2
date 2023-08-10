import likeCounter from './addlike.js';

describe('test likes counter function', () => {
  test('calculate the number of likes for each meal item', async () => {
    const mealId = '53030';
    const nblike = await likeCounter(mealId);
    expect(nblike).toBe(1);
  });
});