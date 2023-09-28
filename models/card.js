import mongoose, { version } from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: { value: true, message: "Поле является обязательным" },
      minlength: [2, "Минимальная длина 2 символа"],
      maxlength: [30, "Максимальная длина 30 символов"],
    },
    link: {
      type: String,
      required: { value: true, message: "Поле является обязательным" },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: { value: true, message: "Поле является обязательным" },
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

export default mongoose.model("card", cardSchema);
