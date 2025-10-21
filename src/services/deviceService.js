import Device from "../models/Device.js";

export default {
    create(formData, userId) {
        formData.owner = userId;
        return Device.create(formData);
    },

    getAll() {
        return Device.find();
    },

    getOne(deviceId) {
        return Device.findById(deviceId);
    },

    async prefer(userId, deviceId) {
        const device = await Device.findById(deviceId);
        if (!device) {
            throw new Error('No such device');
        }

        if (device.owner.equals(userId)) {
            throw new Error('Creators can not prefer their device');
        }

        if (device.preferredList.some(id => id.equals(userId))) {
            throw new Error('You have already prefer this device');
        }

        device.preferredList.push(userId);
        await device.save();
        return device;
    },
}