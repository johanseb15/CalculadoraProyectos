import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    roles: { type: [String], default: ['user'] },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', userSchema);