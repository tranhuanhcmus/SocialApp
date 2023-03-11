import Express from "express";
import UsersRouter from "./routes/users.js";
import CommentsRouter from "./routes/comments.js";
import LikesRouter from "./routes/likes.js";
import PostsRouter from "./routes/posts.js";
import AuthRouter from "./routes/auth.js";
import RelationshipsRouter from "./routes/relationships.js";
import db from "./connect.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
const app = Express();

// app.use(bodyParser);
// app.use(morgan);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../client/public/upload");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    return res.status(200).json(file.filename);
});

app.use(Express.json());
//routes
app.use("/api/users", UsersRouter);
app.use("/api/comments", CommentsRouter);
app.use("/api/likes", LikesRouter);
app.use("/api/posts", PostsRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/relationships", RelationshipsRouter);

//connect to DB

db.connect((err) => {
    if (err) return console.log("database error connection");
    console.log("connect to DB success!");
    app.listen(5000, () => console.log("API work"));
});