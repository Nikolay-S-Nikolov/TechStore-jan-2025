import Device from "../models/Device.js";

export default {
    create(formData, userId) {
        formData.owner = userId;
        return Device.create(formData);
    },
}