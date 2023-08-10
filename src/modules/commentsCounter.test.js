
import { commentsCounter } from "./commentsCounter";

describe("test comments counter function", () => {
  test("calculate the number of comments for each meal item", async () => {
    const mealId = "52835";
    const nbComments = await commentsCounter(mealId);
    expect(nbComments).toHaveLength(14);
  });
});
