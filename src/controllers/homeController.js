import { Router } from "express";
import deviceService from "../services/deviceService.js";

const homeController = Router();

homeController.get('/', async (req, res) => {
    const devices = await deviceService.getLastTree();
    res.render('home', {devices});
})

homeController.get('/about', (req, res) => {
    res.render('about');
})


export default homeController;