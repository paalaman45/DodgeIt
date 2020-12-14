import axios from 'axios';

const instance = axios.create({
    baseURL:'https://dodgeit-dc4ef-default-rtdb.firebaseio.com/'
});

export default instance;