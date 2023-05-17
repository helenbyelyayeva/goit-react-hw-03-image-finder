
import axios from 'axios';

export const fetchImages = async (im, page) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${im}&page=${page}&key=34999882-fa357dcb5108de4c3df8b432d&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};
// function fetchImage(query, page) {
//     return fetch(
//       `https://pixabay.com/api/?q=${query}&page=${page}&key=34999882-fa357dcb5108de4c3df8b432d&image_type=photo&orientation=horizontal&per_page=12`
//     ).then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(new Error(`Here is not...${query}`));
//     });
//   }
  
//   const api = { fetchImage };
//   export default api;