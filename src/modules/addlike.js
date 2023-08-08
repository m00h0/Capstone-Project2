const addLike = async (ele) => {
  await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/hDrSacZITyWBzd5bHHw1/likes/',
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((meal) => {
        if (parseInt(ele.getAttribute('data-id'), 10) === parseInt(meal.item_id, 10)) {
          const nbLike = ele.getElementsByClassName('meal-likes')[0];
          nbLike.textContent = `${meal.likes} Likes`;
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

addLike();