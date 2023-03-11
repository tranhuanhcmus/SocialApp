import db from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";
const controller = {
    getPosts: (req, res) => {
        const token = req.cookies.accessToken;

        if (!token) return res.status(401).json("not logged in");

        jwt.verify(token, "secretkey", (err, userInfo) => {
            if (err) return res.status(403).json("token is not valid");

            const sql =
                "select p.*,u.id as userId, name,profilePic from posts as p join users as u on (u.id=p.userId)   left join relationships as r on (p.userId=r.followedUserId) where r.followerUserId=? or p.userId=? order by p.createAt DESC";
            db.query(sql, [userInfo.id, userInfo.id], (err, data) => {
                if (err) res.status(500).json(err);
                res.status(200).json(data);
            });
        });
    },
    addPost: (req, res) => {
        const token = req.cookies.accessToken;

        if (!token) return res.status(401).json("not logged in");

        jwt.verify(token, "secretkey", (err, userInfo) => {
            if (err) return res.status(403).json("token is not valid");

            const sql =
                "insert into posts (`desc`,`img`,`createAt`,`userId`) values (?)";

            const values = [
                req.body.desc,
                req.body.img,
                moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                userInfo.id,
            ];
            db.query(sql, [values], (err, data) => {
                if (err) res.status(500).json(err);
                res.status(200).json("post is added");
            });
        });
    },
};

export default controller;