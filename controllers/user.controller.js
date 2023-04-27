const UserController = async () => {
    const login = async (req, res) => {
        console.log("hereee")
        return res.status(200).send({ "hello": "data" });
    }

}

module.exports = { UserController }