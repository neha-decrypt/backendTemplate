
const verifytoken = async (req, res, next) => {
    console.log("here we are")
    // if (blacklistedTokens.has(token)) {
    //     res.json({ error: true, message: "Token is already used" })
    // }
    next()
}

// middleware.verifyUserToken = (req, res, next) => {
//     try {
//         var token = req.headers.authorization;
//         if (!token) {
//             return res.reply(messages.unauthorized());
//         }
//         token = token.replace("Bearer ", "");
//         jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
//             if (err !== null) {
//                 return res.reply(messages.unauthorized());
//             }
//             if (decoded.role === "user" || decoded.role === "admin") {
//                 console.log("User ID", decoded.id)
//                 User.findOne({ _id: mongoose.Types.ObjectId(decoded.id) }, function (err, userData) {
//                     if (err) {
//                         return res.reply(messages.unauthorized());
//                     } else {
//                         if (!userData) return res.reply(messages.not_found("User Account"));
//                         if (userData.status == 0) {
//                             return res.reply(messages.blocked("User"));
//                         } else {
//                             req.userId = decoded.id ? decoded.id : '';
//                             req.role = decoded.role ? decoded.role : '';
//                             req.name = decoded.name ? decoded.name : '';
//                             req.email = decoded.email ? decoded.email : '';
//                             next();
//                         }
//                     }
//                 });
//             } else {
//                 return res.reply(messages.unauthorized());
//             }
//         });
//     } catch (error) {
//         return res.reply(messages.server_error());
//     }
// };


module.exports = { verifytoken }