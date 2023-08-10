import likeCounter from './addlike.js';

describe('test likes counter function', () => {
  test('calculate the number of likes for each meal item', async () => {
    const mealId = '52835';
    const nblike = await likeCounter(mealId);
    expect(nblike).toBe(3);
  });
});