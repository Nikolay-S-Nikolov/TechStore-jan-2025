import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import deviceService from "../services/deviceService.js";
import { isOwner } from "../middlewares/deviceMiddleware.js";

const deviceController = Router();

deviceController.get('/create', isAuth, (req, res) => {
    res.render('devices/create');
})

deviceController.post('/create', isAuth, async (req, res) => {
    const formData = req.body;
    const userId = req.user.id;
    try {
        await deviceService.create(formData, userId);
        res.redirect('/devices/catalog');
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('devices/create', { error: errorMessage, device: formData });
    }
})


deviceController.get('/catalog', async (req, res) => {
    const devices = await deviceService.getAll();
    res.render('devices/catalog', { devices });
})

deviceController.get('/:deviceId/details', async (req, res) => {
    const deviceId = req.params.deviceId;
    const userId = req.user?.id;
        try {
            const device = await deviceService.getOne(deviceId);
            const isCreator = device.owner.equals(userId);
            const isPrefered = device.preferredList.some(u => u.equals(req.user?.id));
            res.render('devices/details', { device, isCreator, isPrefered });
        } catch (err) {
            const errorMessage = getErrorMessage(err);
            res.status(400).render('404', { error: errorMessage });
        }
})

deviceController.get('/:deviceId/prefer', isAuth, async (req, res) => {
    const deviceId = req.params.deviceId;
    const userId = req.user.id;
    try {
        await deviceService.prefer(userId, deviceId);
        res.redirect(`/devices/${deviceId}/details`);
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('404', { error: errorMessage });
    }
})

deviceController.get('/:deviceId/edit', isAuth, isOwner, async (req, res) => {
    const deviceId = req.params.deviceId;
    try {
        const device = await deviceService.getOne(deviceId);
        res.render('devices/edit', { device });
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('404', { error: errorMessage });
    }
})


deviceController.post('/:deviceId/edit', isAuth, isOwner, async (req, res) => {
    const deviceId = req.params.deviceId;
    const formData = req.body;
    try {
        await deviceService.edit(deviceId, formData);
        res.redirect(`/devices/${deviceId}/details`);
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('devices/edit', { error: errorMessage, device: formData });
    }
})

deviceController.get('/:deviceId/delete', isAuth, isOwner, async (req, res) => {
    const deviceId = req.params.deviceId;
    try {
        await deviceService.delete(deviceId);
        res.redirect('/devices/catalog');
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('404', { error: errorMessage });
    }
})

export default deviceController;