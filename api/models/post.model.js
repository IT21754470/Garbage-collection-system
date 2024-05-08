import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   content: {
      type: String,
      required: true,
   },
   image: {
      type: String,
      required: true,
   },
   finalDate: {
      type: Date,
      required: true,
   },
   time: {
      type: String,
      required: true,
   },
   location: {
      type: String,
      required: true,
   },
   status: {
      type: String,
      enum: ["active", "inactive", "finished"],
      default: "inactive",
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },
   responds: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Respond",
      },
   ],
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;