import { Schema, model } from "mongoose";

const deviceSchema = new Schema({
    brand: {
        type: String,
        required: [true, 'Brand field is required'],
        minLength: [2, 'The Brand should be at least 2 characters'],
    },
    model: {
        type: String,
        required: [true, 'Model field is required'],
        minLength: [5, 'The Model should be at least 5 characters'],
    },
    hardDisk: {
        type: String,
        required: [true, 'Hard Disk field is required'],
        minLength: [5, 'The Hard Disk should be at least 5 characters'],
    },
    screenSize: {
        type: String,
        required: [true, 'Screen Size field is required'],
        minLength: [1, 'The Screen Size should be at least 1 characters'],
    },
    ram: {
        type: String,
        required: [true, 'Ram field is required'],
        minLength: [2, 'The Ram should be at least 2 characters'],
    },
    operatingSystem: {
        type: String,
        required: [true, 'Operating System field is required'],
        minLength: [5, 'The Operating System should be at least 5 characters.'],
        maxLength: [20, 'The Operating System should be no longer than 20 characters.'],
    },
    cpu: {
        type: String,
        required: [true, 'CPU field is required'],
        minLength: [10, 'The CPU should be at least 10 characters.'],
        maxLength: [50, 'The CPU should be no longer than 50 characters.'],
    },
    gpu: {
        type: String,
        required: [true, 'GPU field is required'],
        minLength: [10, 'The GPU should be at least 10 characters.'],
        maxLength: [50, 'The GPU should be no longer than 50 characters.'],
    },
    price: {
        type: Number,
        required: [true, 'Price field is required'],

        validate: {
            validator: function (value) {
                return value > 0;
            },
            message: 'The Price should be positive number'
        },
    },
    color: {
        type: String,
        required: [true, 'Color field is required'],
        minLength: [2, 'The Color should be at least 2 characters.'],
        maxLength: [10, 'The Color should be no longer than 10 characters.'],
    },
    weight: {
        type: String,
        required: [true, 'Weight field is required'],
        minLength: [1, 'The Weight should be at least 1 characters long'],
    },
    image: {
        type: String,
        required: [true, 'Image field is required'],
        match: [/^https?:\/\/.+/, 'The Image should start with http:// or https://'],
    },
    preferredList: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Device = model('Device', deviceSchema);

export default Device;