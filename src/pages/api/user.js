import prisma from "../db/db.config.js";
import { userSchema, userLoginSchema } from "../validation/index.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {




      // Handle registration if no email and password in query
      const { error, value } = userSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ message: error.message });
      } else {
        const { name, email, phone, password } = value;

        // Check if the user already exists
        const checkUser = await prisma.user.findUnique({
          where: { email: email },
        });

        if (!checkUser) {
          // Create a new user


          const saveUserData = await prisma.user.create({
            data: {
              name: name,
              email: email,
              phone: phone,
              password: password,
            },
          });

          const updateBalance = await prisma.balance.create({
            data: {
              userId: saveUserData.id,
              balance: 0
            }
          });

          if (saveUserData) {
            return res
              .status(200)
              .json({ message: "Registration Successful", data: { value, updateBalance } });
          } else {
            return res
              .status(401)
              .json({ status: false, message: "Error in registration" });
          }
        } else {
          return res.status(409).json({
            status: false,
            message: "Email is already registered",
          });
        }
      }
    } catch (error) {
      console.error("error", error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", data: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const { userId } = req.query;
      if (userId) {
        const user = await prisma.user.findFirst({
          where: {
            id: parseInt(userId)
          }
        });
        if (user) {
          return res.status(200).json({ status: true, message: "User Data", user });
        } else {
          return res.status(404).json({ message: "No User Found!" }); // Use 404 for not found
        }
      } else {
        return res.status(400).json({ message: "User ID is required" }); // Handle missing userId
      }
    } catch (error) {
      console.error("Error in get user handler:", error); // Log the error for debugging
      return res.status(500).json({ message: "Internal Server Error" }); // Use 500 for server error
    }
  } else if (req.method === "PUT") {
    try {

    } catch (error) {

    }
  } else if (req.method === "DELETE") {
    try {
      const userId = req.query;
      const deactiveUser = await prisma.user.update({
        where: {
          id: userId
        }, data: {
          active: false,
          token: null
        }
      });
      if (deactiveUser) {
        return res.status(200).json({ message: "Log out Successful" });
      } else {
        return res.status(404).json({ message: "Error Lou out !" });
      }

    } catch (error) {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  }
  else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
