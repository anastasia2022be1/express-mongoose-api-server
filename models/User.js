import mongoose from "mongoose";

const Schema = mongoose.Schema;

const albumSchema = new Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true }
}, { _id: false });

// Schema für Benutzer
const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    bands: [{ type: String }],
    instrument: { type: String },
    albums: [albumSchema],
    birthday: { type: Date, required: true },
    status: { type: String, default: "Standard", enum: ["Standard", "Student", "Premium"] },
    createdAt: { type: Date, default: Date.now },  // Поле с датой создания, значение по умолчанию - текущее время
    updatedAt: { type: Date, default: Date.now }   // Поле с датой обновления, значение по умолчанию - текущее время

},
    { timestamps: true }
);

// Modell für Benutzer
const User = mongoose.model("User", userSchema);

export default User;
