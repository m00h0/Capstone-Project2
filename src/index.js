import './style.css';
import {
  display,
  addComment,
  closePopup,
  like,
  showPopup,
} from './modules/function.js';

document.addEventListener('DOMContentLoaded', async () => {
  await display();
});

document.querySelector('.add-comments').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = document.querySelector('.add-comments');
  const username = form.elements.username.value;
  const comment = form.elements.comment.value;
  const closestParent = form.closest('.modal');
  const mealId = closestParent.getAttribute('data-id');
  form.reset();
  addComment(username, comment, mealId);
});

document.querySelector('.meals').addEventListener('click', (e) => {
  const ele = e.target.parentNode.parentNode.parentNode;
  like(ele);
  showPopup(e.target);
});

document.querySelector('.close-popup').addEventListener('click', () => {
  closePopup();
});

document.querySelector('.mobile-nav').addEventListener('click', () => {
  document.querySelector('.header').classList.toggle('mobile-menu');
});
