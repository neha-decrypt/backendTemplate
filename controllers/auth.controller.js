
class AuthController {
    constructor() { }

    register(req, res) {

    }

    login(req, res) {
        let userId = "123"
        req.session.userId = userId;
        res.json({ success: true });
    }

    logout(req, res) {

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
