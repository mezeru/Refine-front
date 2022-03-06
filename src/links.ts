import axios from "axios";

export const mapbox = axios.create({
    baseURL:"https://api.mapbox.com/styles/v1/mapbox"
})