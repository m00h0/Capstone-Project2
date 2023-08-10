import fetch from 'node-fetch';

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

const mealsCounter = async () => {
  const data = await fetchDataBaseApi();
  return data.meals;
};

export default mealsCounter;