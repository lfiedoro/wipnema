import axios from 'axios';

export default axios.create({
    baseURL: 'https://api-cinemaapp.herokuapp.com/',
});
