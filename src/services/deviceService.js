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
}