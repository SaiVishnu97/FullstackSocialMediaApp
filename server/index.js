import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import multer from 'multer'
import helmet from 'helmet'
import path from 'path'
import mongoose from 'mongoose'
import { fileURLToPath } from 'url'
import { register } from './Controllers/auth.js'
import authRoutes from './Routes/auth.js'
import userRoutes from './Routes/users.js'
import postRoutes from './Routes/posts.js'
import { createPost } from './Controllers/posts.js'
import { verifyToken } from './middleware/auth.js'
import { posts,users } from './data/index.js'
import User from './models/user.js'
import Post from './models/Post.js'

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

console.log(__dirname,__filename);

dotenv.config();
const app=express();
app.use(bodyParser.json({limit:"30mb",extended: true}));
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}));
app.use(morgan('common'));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}));
app.use(cors());
app.use('/assets',express.static(path.join(__dirname,'public/assets')));

const storage =multer.diskStorage({

    destination:(req,file,cb)=>
    {
        cb(null,"public/assets");
    },
    filename: (req,file,cb)=>{
        cb(null,file.originalname);
    }
});

const upload=multer({storage});

app.post('/auth/register',upload.single('picture'),register);
app.post('/posts',verifyToken,upload.single('picture'),createPost);

app.use('/auth',authRoutes);
app.use('/users',userRoutes);
app.use('/posts',postRoutes);

const connectDB=async()=>{
    try{
       const connectobj= await mongoose.connect(process.env.MONGO_URI);
      // console.log(await User.find());
       if((await User.find()).length===0)
           User.insertMany(users);
       if((await Post.find()).length===0)
           Post.insertMany(posts);
       console.log(`Connected to MongoDB at ${connectobj.connection.host}:${connectobj.connection.port}`);
    }
    catch(err){
        console.log(err);
    }
}
connectDB();

app.listen(process.env.PORT,()=>console.log("Server started listening on PORT:",process.env.PORT));