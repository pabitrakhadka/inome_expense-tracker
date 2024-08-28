// sortfun.js
import jwt from "jsonwebtoken";
import prisma from "./db/db.config";
import { getCookie } from "cookies-next"; // Import getCookie from cookies-next

export const isLogin = async (req) => {
    let token;

    // Retrieve the token from cookies using cookies-next
    token = getCookie('token', { req }); // Pass req to getCookie to access cookies on the server

    // Check if the Authorization header exists and starts with "Bearer"
    const { authorization } = req.headers;
    if (!token && authorization && authorization.startsWith("Bearer")) {
        // Extract the token from the Authorization header
        token = authorization.split(" ")[1];
    }

    // If no token is found, return an unauthorized response
    if (!token) {
        return { status: false, message: "Unauthorized User - No Token Provided" };
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Token=", token);
        console.log("Decoded=", decoded);

        // Find the user based on the decoded token's ID
        const user = await prisma.user.findFirst({
            where: { id: decoded.id },
        });

        // If no user is found, return an error response
        if (!user) {
            return { status: false, message: "Unauthorized User - User not found" };
        }

        // Attach the user data to the request object (optional, for further use)
        req.user = user;

        // Return success with the user data
        return { status: true, user };
    } catch (error) {
        console.error("Token verification failed:", error);
        return { status: false, message: "Unauthorized Access - Invalid Token" };
    }
};
