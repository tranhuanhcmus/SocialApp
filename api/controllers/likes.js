import db from "../connect.js";
import jwt from "jsonwebtoken";

const controller = {
    getLikes: (req, res) => {
        const sql = "SELECT userId from likes WHERE postId=?";
        db.query(sql, [req.query.postId], (err, data) => {
            if (err) res.status(500).json(err);
            res.status(200).json(data.map((like) => like.userId));
        });
    },
    addLike: (req, res) => {
        const token = req.cookies.accessToken;

        if (!token) return res.status(401).json("not logged in");

        jwt.verify(token, "secretkey", (err, userInfo) => {
            if (err) return res.status(403).json("token is not valid");

            const sql = "insert into likes (`userId`,`postId`) values (?)";

            const values = [userInfo.id, req.body.id];
            db.query(sql, [values], (err, data) => {
                if (err) res.status(500).json(err);
                res.status(200).json("post has been liked");
            });
        });
    },
    deleteLike: (req, res) => {
        const token = req.cookies.accessToken;

        if (!token) return res.status(401).json("not logged in");

        jwt.verify(token, "secretkey", (err, userInfo) => {
            if (err) return res.status(403).json("token is not valid");

            const sql = "DELETE from likes WHERE `userId`=? AND `postId`=?";

            db.query(sql, [userInfo.id, req.query.postId], (err, data) => {
                if (err) res.status(500).json(err);
                res.status(200).json("post has been disliked");
            });
        });
    },
};

export default controller;