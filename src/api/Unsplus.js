import axios from "axios";
const random=()=>{
    const apiBuckets= [process.env.REACT_APP_API_KEY,
         process.env.REACT_APP_API_KEY1, 
         process.env.REACT_APP_API_KEY2,
         process.env.REACT_APP_API_KEY3,
         process.env.REACT_APP_API_KEY4,
        ];
    let appiKey= apiBuckets[Math.floor(Math.random()*apiBuckets.length)];
    return appiKey;
}
export default axios.create({
    baseURL: 'https://api.unsplash.com/',
    headers: {
        // Authorization: `Client-ID ${process.env.REACT_APP_API_KEY}`
        Authorization: `Client-ID ${random()}`
    }
})