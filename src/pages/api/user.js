import prisma from "../../../db/db.config.js";
import { userSchema, userLoginSchema } from "../validation/index.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      let { email, password } = req.query;
      const data = ({ email, password } = req.query);
      // Handle login when both email and password are provided in query
      if (email && password) {
        // Validate the login data
        const { error, value } = userLoginSchema.validate(data);
        if (error) {
          console.log("errpr");
          return res.status(400).json({ message: error.message });
        } else {
          // Check if the user exists
          const checkUser = await prisma.user.findFirst({
            where: {
              email: email,
              password: password, // You should consider hashing passwords
            },
          });

          if (checkUser) {
            return res.status(200).json({
              status: true,
              message: "Login Successful",
              data: value,
            });
          } else {
            return res
              .status(401)
              .json({ status: false, message: "Invalid email or password" });
          }
        }
      }

      // Handle registration if no email and password in query
      const { error, value } = userSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ message: error.message });
      } else {
        const { name, email, phone, password } = req.body;

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

          if (saveUserData) {
            return res
              .status(200)
              .json({ message: "Registration Successful", data: value });
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
    return res.status(200).json({ message: "Get Method" });
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
