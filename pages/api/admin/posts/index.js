import dbConnect from "../../../../utils/dbConnect";
import Post from "../../../../models/Post";
import withAuth from "../../../../middlewares/withAuth";

const handler = async (req, res) => {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const post = await Post.create(req.body);
        res.status(201).json({ success: true, data: post });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
    case "DELETE":
      const { id } = req.body;
      try {
        Post.deleteOne({ _id: id }, (err) => {
          if (err) {
            res.status(503).send({ message: "something went wrong!" });
          } else {
            res
              .status(200)
              .json({ success: true, msg: "Post Deleted successfully!" });
          }
        });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};

export default withAuth(handler);
