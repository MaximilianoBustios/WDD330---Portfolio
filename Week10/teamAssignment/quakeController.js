import { getLocation } from './utilities.js';
import Quake from './quake.js';
import QuakesView from './quakeView.js';

// Quake controller
export default class QuakesController {
    constructor(parent, position = null) {
        this.parent = parent;
        this.parentElement = null;
        this.position = position || {
            lat: 0,
            lon: 0
        };
        this.quakes = new Quake();
        this.quakesView = new QuakesView();
        this.radius = 100;
    }

    async init() {
        this.parentElement = document.querySelector(this.parent);
        await this.initPos();
        this.getQuakesByRadius();
    }

    async initPos() {
        if (this.position.lat === 0) {
            try {
                const location = await getLocation()
                this.position = location;
                console.log(this.position);
            } catch (error) {
                console.log(error);
            }
        }
    }

    async getQuakesByRadius() {
        this.parentElement.innerHTML = 'Loading...';
        const quakeList = await this.quakes.getEarthQuakesByRadius(
            this.position,
            this.radius
        );
        this.quakesView.renderQuakeList(quakeList, this.parentElement);
        this.parentElement.addEventListener('touchend', e => {
            this.getQuakeDetails(e.target.dataset.id);
        });
    }
    async getQuakeDetails(quakeId) {
        const quake = this.quakes.getQuakeById(quakeId);
        this.quakesView.renderQuake(quake, this.parentElement);
    }
}