import Post from "../models/post.model.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Respond from "../models/respond.model.js";
import User from "../models/user.model.js";



const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'api/uploads/');
   },
   filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const rand = Math.floor(Math.random() * 900000) + 100000;
      cb(null, Date.now() + '_' + rand + ext);
   }
});

const upload = multer({
   storage: storage,
   fileFilter: function (req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
         return cb(new Error('Only image files are allowed!'));
      }
      cb(null, true);
   }
}).fields([
   { name: 'image', maxCount: 1 },
]);


export const createPost = async (req, res) => {
   try {
      upload(req, res, async (err) => {
         if (err) {
            return res.status(400).json({ error: err.message });
         }
         const { title, content, finalDate, user, time, location } = req.body;
         if (!title || !content || !finalDate || !time || !location || !user) {
            const filePath = req.files.image[0].path;
            fs.unlinkSync(filePath);
            return res.status(400).json({ error: "Title and content are required" });
         }

         const image = req.files.image[0].filename;
         if (err) {
            return res.status(500).json({ error: true, message: "Error uploading image:" + err.message });
         }

         const newPost = new Post({
            title,
            content,
            time,
            location,
            image,
            finalDate,
            user: user,
         });

         await newPost.save();

         res.status(201).json("Post created successfully");
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating post" });
   }
};

export const getPosts = async (req, res) => {
   try {

      if (req.params.slug === "all") {
         const posts = await Post.find();
         let responds = [];
         let user = {};
         for (let post of posts) {
            responds = await Respond.find({ post: post._id });
            user = await User.findById(post.user);
            post.responds = responds;
            post.user = user;
         }
         res.status(200).json(posts);
      } else {

         const posts = await Post.find({ status: req.params.slug });

         let responds = [];
         for (let post of posts) {
            responds = await Respond.find({ post: post._id });
            post.responds = responds;
         }
         res.status(200).json(posts);
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching posts" });
   }
}

export const getPostsByUser = async (req, res) => {
   try {
      const posts = await Post.find({ user: req.params.id });
      res.status(200).json(posts);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching posts" });
   }
}

export const getPost = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id).populate("user", "name email");
      res.status(200).json(post);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching post" });
   }
}

export const updateState = async (req, res) => {
   try {
      const { status } = req.body;
      const updatedPost = await Post.findByIdAndUpdate(
         req.params.id,
         { status },
         { new: true }
      );

      res.status(200).json(updatedPost);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating post" });
   }
}

export const updatePost = async (req, res) => {
   try {
      upload(req, res, async (err) => {
         const { title, content, finalDate, time, location } = req.body;

         if (!title || !content || !finalDate || !time || !location) {
            return res.status(400).json({ error: "All fields required" });
         }

         if (err) {
            return res.status(500).json({ error: true, message: "Error uploading image:" + err.message });
         }

         const image = req.files.image != undefined && req.files.image[0] != undefined ? req.files.image[0].filename : null;

         if (image) {
            const post = await Post.findById(req.params.id);
            try {
               fs.unlinkSync('api/uploads/' + post.image);
            } catch (ignore) { }
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
               title,
               content,
               time,
               location,
               image,
               status: "inactive",
               finalDate,
            }, { new: true });
            return res.status(200).json(updatedPost);
         } else {

            const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
               title,
               time,
               location,
               content,
               status: "inactive",
               finalDate,
            }, { new: true });
            return res.status(200).json(updatedPost);
         }

      });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating post" });
   }
}

export const deletePost = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);
      if (!post) {
         return res.status(404).json({ error: "Post not found" });
      }
      try {
         fs.unlinkSync('api/uploads/' + post.image);
      } catch (ignore) { }
      await post.deleteOne();
      res.status(200).json("Post deleted successfully");
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error deleting post" });
   }
}