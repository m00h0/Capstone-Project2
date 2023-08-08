const fetchDataBaseApi = async () => {
  const data = await fetch(
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood',
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log(err);
    });
  return data;
};
const fetchDataInvolvementApi = async () => {
  const data = await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/hDrSacZITyWBzd5bHHw1/likes/',
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log(err);
    });
  return data;
};
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
const display = async () => {
  const data = await fetchDataBaseApi();
  const data2 = await fetchDataInvolvementApi();
  const { meals } = data;
  meals.forEach((meal) => {
    let nLike = '';
    data2.forEach((item) => {
      if (parseInt(item.item_id, 10) === parseInt(meal.idMeal, 10)) {
        nLike = item.likes;
      }
    });
    const mealel = `
                  <div class="img-container">
                      <img class="meal-img" src="${meal.strMealThumb}" alt="meal">
                  </div>
                  <div class="meal-text">
                      <p class="meal-title">${meal.strMeal}</p>
                      <div class="meal-icon-container">
                          <ion-icon class="meal-icon" name="heart-outline"></ion-icon><span class='meal-likes'>${nLike} Likes</span>
                      </div>
                  </div>
                  <a class="meal-btn" href="#" alt="comment button">Comment</a>
            `;
    const mealItem = document.createElement('div');
    mealItem.setAttribute('class', 'meal--item');
    mealItem.setAttribute('data-id', meal.idMeal);
    mealItem.innerHTML = mealel;
    document.querySelector('.meals').appendChild(mealItem);
  });
};
const like = async (ele) => {
  const idItem = ele.getAttribute('data-id');
  await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/hDrSacZITyWBzd5bHHw1/likes/',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        likes: 5,
        item_id: idItem,
      }),
    },
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  await addLike(ele);
};
document.addEventListener('DOMContentLoaded', async () => {
  await display();
});
document.querySelector('.meals').addEventListener('click', (e) => {
  const ele = e.target.parentNode.parentNode.parentNode;
  like(ele);
});

export {
  fetchDataBaseApi, fetchDataInvolvementApi, addLike, display, like,
};