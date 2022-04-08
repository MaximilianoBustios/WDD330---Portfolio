import { getJSON } from './utilities.js';

export default class Quake {
    constructor() {
        this.baseUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2021-01-01';
        this._quakes = [];
    }

    async getEarthQuakesByRadius(position, radius = 100) {
        let url = new URL(this.baseUrl);
        url.searchParams.append("latitude", position.coords.latitude);
        url.searchParams.append("longitude", position.coords.longitude);
        url.searchParams.append("maxradiuskm", radius);
        this._quakes = await getJSON(url);
        return this._quakes;
    }

    getQuakeById(id) {
        return this._quakes.features.filter(item => item.id === id)[0];
      }
}