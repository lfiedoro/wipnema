import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.internationalshowtimes.com/v4',
    headers: {
        Authorization: "Token token=fcuXruYxzbguozqM7O7wg2sneFGBF0LD"
    }
});
