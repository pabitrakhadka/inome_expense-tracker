import { isLogin } from "../sortfun";

export default async function handler(req, res) {
    try {
        if (req.method === "GET") {
            console.log("helo");
            console.log("req data=", req);
            const loginResult = await isLogin(req);
            console.log("hii");
            if (!loginResult.status) {
                return res.status(401).json({ status: false, message: loginResult.message });
            } else {
                return res.status(200).json({ status: true, message: "Get datas", data: loginResult.user });
            }
        } else {
            return res.status(405).json({ status: false, message: "Method not allowed" });
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}
