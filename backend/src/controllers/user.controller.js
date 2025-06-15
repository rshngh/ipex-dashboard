import { generateID } from "../utils/generateID.js";

export const userLoginController = (req, res) => {
  const { username, password } = req.body;
  try {
    if (username === "test" && password === "test123") {
      const userID = generateID();
      res
        .status(200)
        .json({ success: true, message: "Login successful", userID: userID });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log("Error in userLoginController.", error);
  }
};
