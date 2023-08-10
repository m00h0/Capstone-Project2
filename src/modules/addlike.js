import fetch from 'node-fetch';

const likeCounter = async (id) => {
  const data = await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/hDrSacZITyWBzd5bHHw1/likes/',
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err);
  let ml = '';

  data.forEach((meal) => {
    if (parseInt(id, 10) === parseInt(meal.item_id, 10)) {
      ml = meal;
    }
  });

  return ml.likes;
};

export default likeCounter;