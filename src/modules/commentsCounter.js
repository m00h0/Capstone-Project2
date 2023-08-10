import fetch from 'node-fetch';

const getComment = async (mealId) => {
  const data = await fetch(
    `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/hDrSacZITyWBzd5bHHw1/comments?item_id=${mealId}`,
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        return '';
      }
      return data;
    })
    .catch((err) => err);
  return data;
};

const commentsCounter = async (mealId) => {
  const data = await getComment(mealId);
  return data;
};

export { getComment, commentsCounter };
