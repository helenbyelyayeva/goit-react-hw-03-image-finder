
import axios from 'axios';

export const fetchImages = async (im, page) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${im}&page=${page}&key=34999882-fa357dcb5108de4c3df8b432d&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};
