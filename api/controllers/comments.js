import db from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";
const controller = {
    getComments: (req, res) => {
        const sql =
            "select c.*,u.id as userId, name,profilePic from comments as c join users as u on (u.id=c.userId) where c.postId=? order by c.createAt DESC";
        db.query(sql, [req.query.postId], (err, data) => {
            if (err) res.status(500).json(err);
            res.status(200).json(data);
        });
    },
    addComment: (req, res) => {
        const token = req.cookies.accessToken;

        if (!token) return res.status(401).json("not logged in");

        jwt.verify(token, "secretkey", (err, userInfo) => {
            if (err) return res.status(403).json("token is not valid");

            const sql =
                "insert into comments (`desc`,`createAt`,`userId`,`postId`) values (?)";

            const values = [
                req.body.desc,

                moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                userInfo.id,
                req.body.postId,
            ];
            db.query(sql, [values], (err, data) => {
                if (err) res.status(500).json(err);
                res.status(200).json("comments is added");
            });
        });
    },
};

export default controller;