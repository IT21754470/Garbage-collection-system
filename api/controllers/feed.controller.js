import feed from "../models/feed.model.js";

export const CreatFeed = async (req, res, next) => {
  try {
    const {currentId, name, rate, Description } = req.body;
    const newUser = new feed({
      currentId,
      name,
      rate,
      Description,
    });

    await newUser.save();
    res.json("feed successful");
  } catch (error) {
    next(error);
  }
};

export const updatefeed = async (req, res, next) => {
  try {
    const updatefeed = await feed.findByIdAndUpdate(
      req.params.FeeddId,
      {
        $set: {
          name: req.body.name,
          rate: req.body.rate,
          Description: req.body.Description,
        },
      },
      { new: true }
    );
    res.status(200).json(updatefeed);
  } catch (error) {
    next(error);
  }
};

export const allgetfeed = async (req, res, next) => {
  try {
    const Feed = await feed.find();

    if (Feed.length > 0) {
      res.json({
        message: "Feed details retrieved successfully",
        Feed,
      });
    } else {
      return next(errorHandle(404, " Feed not fonud "));
    }
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};

export const deleteFeed = async (req, res, next) => {
 
    try {
      await feed.findByIdAndDelete(req.params.FeedId);
      res.status(200).json('shedul has been deleted');
    } catch (error) {
      next(error);
    }
  };