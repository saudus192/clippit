import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true },
        image: { type: String },
        provider: { type: String, required: true }, // "google" | "github"
        providerAccountId: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);