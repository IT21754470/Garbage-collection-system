import Respond from "../models/respond.model.js";

export const createRespond = async (req, res) => {
   const { value, post, user } = req.body;

   try {
      if (value === undefined) {
         return res.status(400).json({ error: "Value is required" });
      }

      const existingRespond = await Respond.findOne({ post, user });
      if (existingRespond) {
         return res.status(400).json({ error: "Respond already exists" });
      }

      const newRespond = new Respond({
         value,
         user: user._id,
         post,
      });

      await newRespond.save();

      res.status(201).json("Respond created successfully");
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating respond" });
   }
}

export const getResponds = async (req, res) => {
   try {
      const responds = await Respond.find().populate("user", "name email");
      res.status(200).json(responds);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching responds" });
   }
}

export const getRespondsByPost = async (req, res) => {
   try {
      const responds = await Respond.find({ post: req.params.id }).populate("user", "name email");
      res.status(200).json(responds);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching responds" });
   }
}

export const getRespond = async (req, res) => {
   try {
      const respond = await Respond.findById(req.params.id).populate("user", "name email");
      res.status(200).json(respond);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching respond" });
   }
}

export const updateRespond = async (req, res) => {
   try {
      const { value } = req.body;
      const updatedRespond = await Respond.findByIdAndUpdate(
         req.params.id,
         { value },
         { new: true }
      );

      res.status(200).json(updatedRespond);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating respond" });
   }
}

export const deleteRespond = async (req, res) => {
   try {
      const respond = await Respond.findById(req.params.id);
      if (!respond) {
         return res.status(404).json({ error: "Respond not found" });
      }

      await respond.remove();
      res.status(200).json("Respond deleted successfully");
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error deleting respond" });
   }
}

