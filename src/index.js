import './style.css';
import {
  fetchDataBaseApi, fetchDataInvolvementApi, addLike, display, like,
} from './modules/function.js';

display();
like();
fetchDataBaseApi();
fetchDataInvolvementApi();
addLike();