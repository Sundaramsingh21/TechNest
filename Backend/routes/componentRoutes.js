import express from "express"
import { addComponent ,CompInfo,listComponent ,removecomponent, updateprice, updateStock} from "../controllers/componentController.js"
import multer from "multer"
import fs from "fs";
import path from "path";

const componentRouter = express.Router();

//Image Storage Engine

// const storage = multer.diskStorage({
//     destination: "uploads",
//     filename:(req,file,cb)=>{
//         return cb(null,`${Date.now()}${file.originalname}`)
//     }
// })
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(process.cwd(), "uploads");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({storage:storage})

componentRouter.post("/add",upload.single("image"),addComponent)
componentRouter.get("/list",listComponent);
componentRouter.post("/remove",removecomponent);
componentRouter.post("/update",updateprice);
componentRouter.post("/update/stock",updateStock);
componentRouter.post("/compInfo",CompInfo)

export default componentRouter;
