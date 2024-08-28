import { genereteToken } from "@/Methods/webtoken";
import prisma from "../db/db.config";
import { userLoginSchema } from "../validation";
import { setCookie } from "cookies-next";

export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
            // Validate request body using the schema
            const { error, value } = userLoginSchema.validate(req.body);

            if (error) {
                return res.status(400).json({ message: error.message });
            }

            // Destructure email and password from the validated value
            const { email, password } = value;



            // Check if user exists in the database with the given email and password
            const user = await prisma.user.findFirst({
                where: {
                    email: email,
                    password: password,
                }
            });
            if (!user) {
                return res.status(401).json({ error: "Invalid credentials" });
            }
            let token;
            // Check if the user has a token in the database
            if (!user.token) {
                // Generate a new token
                let payload = {
                    id: user.id,
                    email: user.email,
                }
                token = genereteToken(payload);
                // token = jwt.sign(
                //     { userId: findSuperAdmin.id, username: findSuperAdmin.username },
                //     process.env.JWT_SECRET_KEY,

                // );
                // Update user's token in the database
                await prisma.user.update({
                    where: { id: user.id },
                    data: { token: token },
                });
            } else {
                // Use the existing token
                token = user.token;
            }
            //setCookies when login
            // Set the token as an HttpOnly cookie to prevent access via JavaScript
            setCookie("token", `${token}`, {
                req,
                res,
                maxAge: 60 * 60 * 24,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
            });
            return res
                .status(200)
                .json({
                    message: "Login successful",
                    token: token,
                    id: user.id,
                    name: user.name,
                });


        } else {
            // Method not allowed
            return res.status(405).json({ message: "Method Not Allowed" });
        }
    } catch (error) {
        console.error("Error in login handler:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
