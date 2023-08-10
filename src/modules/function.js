const fetchDataBaseApi = async (mealId = 0) => {
  let path = '';
  if (mealId === 0) {
    path = 'https://www.themealdb.com/api/json/v1/1/search.php?f=f';
  } else {
    path = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  }
  const data = await fetch(path)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err);
  return data;
};

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

const fetchDataInvolvementApi = async () => {
  const data = await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/hDrSacZITyWBzd5bHHw1/likes/',
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err);

  return data;
};

const closePopup = () => {
  document.querySelector('.modal').classList.remove('showModal');
};

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

const addComment = async (username, comment, mealId) => {
  await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/hDrSacZITyWBzd5bHHw1/comments/',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        item_id: mealId,
        username,
        comment,
      }),
    },
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err);

  const comments = await getComment(mealId);
  document.querySelector(
    '.nb-comment',
  ).textContent = `${comments.length} comments`;
  const cmtContainer = document.querySelector('.list-comment');
  cmtContainer.innerHTML = '';
  comments.forEach((comment) => {
    const cmt = document.createElement('p');
    cmt.setAttribute('class', 'comment-item');
    cmt.textContent = `${comment.creation_date} ${comment.username}: ${comment.comment}`;
    cmtContainer.appendChild(cmt);
  });
};

const showPopup = async (ele) => {
  if (ele.matches('.meal-btn')) {
    const mealId = ele.parentNode.getAttribute('data-id');
    const modal = document.querySelector('.modal');
    modal.classList.add('showModal');
    modal.setAttribute('data-id', mealId);
    const data = await fetchDataBaseApi(mealId);
    const meal = data.meals[0];
    document.querySelector('.meal-details-img').src = `${meal.strMealThumb}`;
    document.querySelector(
      '.meal-detail-title',
    ).textContent = `${meal.strMeal}`;

    const arr = [];

    Object.keys(meal).forEach((key) => {
      if (key.startsWith('strIngredient')) {
        if (meal[key] !== '') {
          arr.push(meal[key]);
        }
      }
    });

    const ingredientList = document.querySelector('.ingredents-list');
    ingredientList.innerHTML = '';
    arr.forEach((ingredient) => {
      const ingred = `
      <ion-icon class="ingredent-icon" name="restaurant-outline"></ion-icon><span class="ingredent-text">${ingredient}</span>
    `;
      const li = document.createElement('li');
      li.setAttribute('class', 'ingredients--item');
      li.innerHTML = ingred;
      ingredientList.appendChild(li);
    });

    const comments = await getComment(mealId);
    if (comments !== '') {
      document.querySelector(
        '.nb-comment',
      ).textContent = `${comments.length} comments`;
      const cmtContainer = document.querySelector('.list-comment');
      cmtContainer.innerHTML = '';
      comments.forEach((comment) => {
        const cmt = document.createElement('p');
        cmt.setAttribute('class', 'comment-item');
        cmt.textContent = `${comment.creation_date} ${comment.username}: ${comment.comment}`;
        cmtContainer.appendChild(cmt);
      });
    }
  }
};

const addLike = async (ele) => {
  await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/hDrSacZITyWBzd5bHHw1/likes/',
  )
    .then((res) => res.json())
    .then((data) => {
      data.forEach((meal) => {
        if (
          parseInt(ele.getAttribute('data-id'), 10)
          === parseInt(meal.item_id, 10)
        ) {
          const nbLike = ele.getElementsByClassName('meal-likes')[0];
          nbLike.textContent = meal.likes;
        }
      });
    })
    .catch((err) => err);
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
    .then((data) => data)
    .catch((err) => err);

  await addLike(ele);
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
                    <ion-icon class="meal-icon" name="heart-outline"></ion-icon><span class='meal-likes'>${nLike}</span>
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

export {
  display, addComment, closePopup, like, showPopup, likeCounter,
};
