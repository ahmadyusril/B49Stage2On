// import * as multer from 'multer';
// import { Request, Response, NextFunction } from "express";  

// export const UploadFileMiddleware = (fieldName: string) => {
//     const storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, 'src/uploads');
//         },
//         filename: function (req, file, cb) {
//             const uniqueSuffix = Date.now();
//             cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
//         },
//     });

//     const UploadFile = multer({ storage: storage });
//     return (req: Request, res: Response, next: NextFunction) => {
//         UploadFile.single(fieldName)(req, res, function (error: any) {
//             if (error) {
//                 return res.status(400).json({ error: error.message });
//             }

//             res.locals.filename = req.file.filename;
//             next();
//         });
//     };
// };

import * as multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads/"); // Menyimpan file di direktori './public/image'
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Menetapkan nama file
  },
});

const UploadFileMiddleware = multer({ storage: storage });

export default UploadFileMiddleware;