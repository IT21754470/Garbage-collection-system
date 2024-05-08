import mongoose from "mongoose";

const respondSchema = new mongoose.Schema({
   value: {
      type: Boolean,
      required: true,
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },
   post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
   },
}, { timestamps: true });

const Respond = mongoose.model("Respond", respondSchema);

export default Respond;