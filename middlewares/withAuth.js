import jwt from "jsonwebtoken";
import User from "../models/User";

const withAuth = (handler) => {
  return async (req, res) => {
    const { authentication } = req.headers;
    if (authentication == "Bearer null") {
      return res.status(401).send({ error: "You must be logged in." });
    } else {
      try {
        const token = authentication.replace("Bearer ", "");
        await jwt.verify(token, "BE_SMART", async (err, payload) => {
          if (err) {
            return res.status(401).send({ error: "You must be logged in." });
          }
          const { userId } = payload;
          const user = await User.findById(userId);
          req.user = user;
        });
        return handler(req, res);
      } catch (error) {
        return res.status(401).json({
          error: "You must be logged in.",
        });
      }
    }
  };
};

export default withAuth;
