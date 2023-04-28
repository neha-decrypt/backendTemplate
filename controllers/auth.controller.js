const jwt = require("jsonwebtoken")
const blacklistedTokens = new Set();
const User = require("./../models/User")
const { toChecksumAddress } = require("ethereumjs-util");

class AuthController {
    constructor() { }

    async login(req, res) {
        // let userId = "123"
        // req.session.userId = userId;
        // res.json({ success: true });
        console.log("bodyy", req.body)
        try {
            if (!req.body.walletAddress) {
                console.log("111")
                return res.json({ error: true, message: "wallet address required" });
            }

            if (!req.body.signature) {
                console.log("222")
                return res.json({ error: true, message: "signature required" });
            }
            // if (!validators.isValidSignature(req.body)) {
            //     return res.reply(messages.invalid('Data'));
            // }
            const user = await User.findOne(
                {
                    walletAddress: toChecksumAddress(req.body.walletAddress),
                }
            )
            if (!user) {
                try {
                    const user = new User({
                        walletAddress: toChecksumAddress(req.body.walletAddress?.toLowerCase()),
                        secondaryEmail: req.body.email ? req.body.email : ""
                    });
                    user.save().then((result) => {
                        const accessToken = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_AUTH_TOKEN_EXPIRY });

                        // Generate a refresh token with a longer expiration time (7 days)
                        const refreshToken = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY });

                        res.cookies('authToken', accessToken, time() + 86400, '/', '', true, false)
                        res.cookies('refreshToken', refreshToken, time() + 86400, '/', '', true, false)

                        return res.json({
                            error: false,
                            message: "Success",
                            data: {
                                auth: true,
                                accessToken,
                                walletAddress: result.walletAddress,
                                userId: result._id,
                                userType: result.role,
                                userData: result,
                                secondaryEmail: result.secondaryEmail
                            }

                        });
                    }).catch((error) => {
                        console.log("444")
                        return res.json({ error: true, message: error });
                    });

                } catch (regError) {
                    console.log("555")
                    return res.json({ error: true, message: regError });
                }
            } else {
                if (user) {

                    const accessToken = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_AUTH_TOKEN_EXPIRY });

                    // Generate a refresh token with a longer expiration time (7 days)
                    const refreshToken = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY });

                    res.cookies('authToken', accessToken, time() + 86400, '/', '', true, false)
                    res.cookies('refreshToken', refreshToken, time() + 86400, '/', '', true, false)

                    if (req.body.email) {
                        let data = await User.findOneAndUpdate({ walletAddress: user.walletAddress }, { $set: { secondaryEmail: req.body.email } })
                    }
                    return res.json({
                        error: false,
                        message: "Success",
                        data: {
                            auth: true,
                            token,
                            walletAddress: user.walletAddress,
                            userId: user._id,
                            userType: user.role,
                            userData: user,
                        }
                    });
                }
            }


        } catch (error) {
            console.log("666", error)
            return res.json({ error: true, message: error });;
        }
    }

    logout(req, res) {
        blacklistedTokens.add(req.body.token);
    }

    profile(req, res) {
        // retrieve session data from Redis and return user profile
        const userId = req.session.userId;
        console.log("user Id", userId)
        // retrieve user data from your database based on userId
        res.json({ id: userId });
    }


}
module.exports = AuthController;
