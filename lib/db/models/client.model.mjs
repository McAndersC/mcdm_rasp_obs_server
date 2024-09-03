import mongoose, { Schema } from 'mongoose';
mongoose.set('runValidators', true);

const clientScheme = new Schema({
    name: { type: String,  required: true },
    port: { type: String,  required: true },
    ip: { type: String,  required: true },
    created: { type: Date, default : new Date() },
});

export default mongoose.models.client || mongoose.model('client', clientScheme);