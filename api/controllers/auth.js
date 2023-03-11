import db from "../connect.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const controller = {
    register: async(req, res) => {
        //check user
        let q = "select * from users where username = ?";

        db.query(q, [req.body.username], async(err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length != 0)
                return res.status(409).json("Account already exists!");

            //hash password
            const hashedPass = await bcryptjs.hash(req.body.password, 3);
            let q =
                "insert into users(`username`,`email`,`password`,`name`) value(?)";
            const values = [
                req.body.username,
                req.body.email,
                hashedPass,
                req.body.name,
            ];
            db.query(q, [values], (err, data) => {
                if (err) return res.status(500).json(err);
                res.status(200).json("account was added");
            });
        });
    },
    login: async(req, res) => {
        //check user
        let q = "select * from users where username = ?";

        db.query(q, [req.body.username], async(err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length == 0) return res.status(409).json("Account not exists!");

            const checkPass = await bcryptjs.compare(
                req.body.password,
                data[0].password
            );
            if (!checkPass) return res.status(400).json("Wrong password");

            const token = jwt.sign({ id: data[0].id }, "secretkey");
            const { password, ...others } = data[0];
            res
                .cookie("accessToken", token, {
                    httpOnly: true,
                })
                .status(200)
                .json(others);
        });
    },
    logout: (req, res) => {
        res.clearCookie("accessToken", {
            secure: true,
            sameSite: "none",
        });
        return res.status(200).json("user has been logged out!");
    },
};

export default controller;