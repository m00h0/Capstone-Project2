import { commentsCounter } from './commentsCounter.js';

describe('test comments counter function', () => {
  test('calculate the number of comments for each meal item', async () => {
    const mealId = "53061";
    const nbComments = await commentsCounter(mealId);
    expect(nbComments).toHaveLength(2);
  });
});
