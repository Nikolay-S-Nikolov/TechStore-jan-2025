import deviceService from "../services/deviceService.js";

export async function isOwner(req, res, next) {
    const deviceId = req.params.deviceId;

        try {
        const device = await deviceService.getOne(deviceId);

        if (!device.owner?.equals(req.user.id)) {
            return res.status(401).render('404', { error: 'Only creator can do this action!'});
        }
        
        next();

    } catch (err) {
        return res.status(401).render('404', { error: 'No such recipe!' });
    }
}