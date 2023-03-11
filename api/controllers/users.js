import db from "../connect.js";

const controller = {
    getUsers: (req, res) => {
        const sql = "select * from users";
        db.query(sql, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    },
    getUser: (req, res) => {
        const userId = req.params.userId;

        const sql = "select * from users WHERE id=?";
        db.query(sql, [userId], (err, data) => {
            if (err) return res.status(500).json(err);
            const { password, ...others } = data[0];
            return res.status(200).json(others);
        });
    },
};

export default controller;