import Device from "../models/Device.js";

export default {
    create(formData, userId) {
        formData.owner = userId;
        return Device.create(formData);
    },

    getAll(filter = {}) {
        let query = {};

        if (filter.owner) {
            query.owner = filter.owner;
        }
        
        if (filter.preferredList) {
            query.preferredList = filter.preferredList;
        }

        return Device.find(query);
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

    edit(deviceId, formData) {
        const opt = { runValidators: true }
        const updatedDevice = Device.findByIdAndUpdate(deviceId, formData, opt);
        return updatedDevice;
    },

    delete(deviceId) {
        return Device.findByIdAndDelete(deviceId);
    },

    getLastTree() {
        return Device.find().sort('-_id').limit(3);
    },
}