import db from "../connect.js";
import jwt from "jsonwebtoken";
const controller = {
    getRelationships: (req, res) => {
        const sql =
            "SELECT followerUserId FROM relationships WHERE followedUserId=?";
        db.query(sql, [req.query.followedUserId], (err, data) => {
            if (err) res.status(500).json(err);
            res
                .status(200)
                .json(data.map((relationship) => relationship.followerUserId));
        });
    },
    addRelationship: (req, res) => {
        const token = req.cookies.accessToken;

        if (!token) return res.status(401).json("not logged in");

        jwt.verify(token, "secretkey", (err, userInfo) => {
            if (err) return res.status(403).json("token is not valid");

            const sql =
                "insert into relationships (`followerUserId`,`followedUserId`) values (?)";

            const values = [userInfo.id, req.body.userId];
            db.query(sql, [values], (err, data) => {
                if (err) res.status(500).json(err);
                res.status(200).json("post has been liked");
            });
        });
    },
    deleteRelationship: (req, res) => {
        const token = req.cookies.accessToken;

        if (!token) return res.status(401).json("not logged in");

        jwt.verify(token, "secretkey", (err, userInfo) => {
            if (err) return res.status(403).json("token is not valid");

            const sql =
                "DELETE from relationships WHERE `followerUserId`=? AND `followedUserId`=?";

            db.query(sql, [userInfo.id, req.query.userId], (err, data) => {
                if (err) res.status(500).json(err);
                res.status(200).json("post has been disliked");
            });
        });
    },
};

export default controller;