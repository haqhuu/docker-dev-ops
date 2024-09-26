const User = require("../models/userModel")
const bcrypt = require("bcryptjs")


exports.signUp = async (req, res) => {
    try {
        const { username, password } = req.body
        const hashPassword = await bcrypt.hash(password, 12)
        const newUser = await User.create({
            username: username,
            password: hashPassword
        })
        res.status(200).json({
            status: "success",
            user: newUser
        })
    } catch (e) {
        res.status(400).json({
            status: "fail"
        })
    }
}


exports.signIn = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({
            username
        })
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found"
            })
        }
        const isCorrect = await bcrypt.compare(password, user.password)
        if (!isCorrect) {
            res.status(200).json({
                status: "fail",
                message: "username or Password not correct"
            })
        } else {
            res.status(200).json({
                status: "success",
            })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({
            status: "fail"
        })
    }
}