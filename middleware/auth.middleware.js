
const verifytoken = async (req, res, next) => {
    console.log("here we are")
    next()
}



module.exports = { verifytoken }