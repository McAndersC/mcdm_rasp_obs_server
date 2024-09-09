import mongoose, { Schema } from 'mongoose';
mongoose.set('runValidators', true);

const clientScheme = new Schema({
    name: { type: String },
    port: { type: String },
    ip: { type: String },
    created: { type: Date, default : new Date() },
});

export default mongoose.models.client || mongoose.model('client', clientScheme);