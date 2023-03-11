# **Review Project**

## New Feature

###     Client (front-end)
    1. config header (middleware)
        app.use((req, res, next) => {
            res.header("Access-Control-Allow-Credentials", true);
            next();
        });
    2. config xcross (middleware)
        app.use(
            cors({
                origin: "http://localhost:3000",
            })
        );
    3. to add cookie for request
        app.use(cookieParser());
    4. to parse JSON data sent in the request body
        app.use(Express.json());
    5. router
        app.use(path,router)

        //in router folder: file
        export const router=Express.Router()
        router.get(),router.post,...
    6. encrypt the password with
        import bcryptjs from "bcryptjs";

        //hash
        const hashedPass = await bcryptjs.hash(req.body.password, 3);

        //unhash
        const checkPass = await bcryptjs.compare(
                req.body.password,
                data[0].password
            );
    7. jwt for create token
        import jwt from "jsonwebtoken";
        const secretKey = "mySecretKey";

        // Generate a JWT token
        const payload = { username: "john.doe" };
        const token = jwt.sign(payload, secretKey);

        console.log(token);

        // Verify a JWT token
        try {
        const decoded = jwt.verify(token, secretKey);
        console.log(decoded);
        } catch (err) {
        console.error(err);
        }
    8. connect DB
        import mysql from "mysql";
        const db = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "123456",
            database: "social",
        });
        export default db;

        //connect to DB
        db.connect((err) => {
            if (err) return console.log("database error connection");
            console.log("connect to DB success!");
            app.listen(5000, () => console.log("API work"));
        });

        //query
            getLikes: (req, res) => {
            const sql = "SELECT userId from likes WHERE postId=?";
            db.query(sql, [req.query.postId], (err, data) => {
                if (err) res.status(500).json(err);
                res.status(200).json(data.map((like) => like.userId));
            });
        },

        
        
### Server (back-end)
    1. Start
        Init with 
            npx create-react-app my-app ./
            cd my-app
            npm start
    2. UseContext (for save data)
        //create Context
        export const AuthContext=createContext()   
        the scope is  
                <AuthContext.Provider value={{ currentUser, login }}>
                    {children}
                </AuthContext.Provider>
        get value by useContext(AuthContext)
    3. Axios for createRequest
        export const makeRequest = axios.create({
            baseURL: "...",
            moreOptions...
        })
    4. react-query (for auto fetching)
        const queryClient = new QueryClient();
        cover Layout in <QueryClientProvider client={queryClient}> 
            <Layout/>
        </QueryClientProvider>
        useQuery to call api
        useMutation for auto fetching:
            const mutation = useMutation(
            (liked) => {
                if (liked) return makeRequest.delete("/likes?postId=" + post.id);

                return makeRequest.post("/likes", {
                    id: post.id,
                });
            },
            {
            onSuccess: () => {
                queryCLient.invalidateQueries(["likes", post.id]);
            },
            }
        );
    5. react-router-dom for routing
        <Outlet/>
        createBrowserRouter
        router in app with 
        {
            return (
                <React.StrictMode>
                <RouterProvider router={router} />
                </React.StrictMode>
            );
        }
        







