const User = require("../models/userModel");
const { isTokenValid } = require("../utils/validation");

const userAuth = async (req, res, next) => {
        try {
                const { token } = req.cookies;
                if (!token) {
                        return res
                                .status(500)
                                .json({ success: false, error: "Session Expired, Please login again" });
                }
                const { _id } = await isTokenValid(token);

                const user = await User.findById(_id);
                if (!user) {
                        return res.status(500).json({ success: false, error: "User not found" });
                }

                req.user = user;
                next();
        } catch (err) {
                res.cookie("token", "", {
                        expires: new Date(0),
                        httpOnly: true,
                        path: "/",
                });
                return res.status(500).json({ success: false, error: err.message });
        }
};

module.exports = {
        userAuth,
};