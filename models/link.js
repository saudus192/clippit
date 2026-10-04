import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true
        },
        shortUrl: {
            type: String,
            required: true,
            unique: true
        },
        // Reference to the User model to associate the link with a specific user. Let me explain this in detail. The userId field is defined as a reference to the User model using mongoose.Schema.Types.ObjectId. This means that each link document will have a userId field that stores the unique identifier of the user who created the link. By using the ref property, we establish a relationship between the Link model and the User model, allowing us to easily populate user information when querying links. This is particularly useful for applications where you want to track which user created which link, enabling features like user-specific link management and analytics.
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        clickCount: {
            type: Number,
            default: 0
        },
        expirationDate: {
            type: Date,
            default: null
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    }, { timestamps: true })

export default mongoose.models.Link || mongoose.model("Link", linkSchema)