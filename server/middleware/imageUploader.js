import multer from 'multer'
// const upload = multer({dest: 'public/uploads/'})
//
// const path = 'public/uploads/'
//
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path);
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
//     // 1234544-4545454.jpeg
//     cb(null, uniqueName)
//   }
// });
//
// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
//       cb(null, true)
//     } else {
//       cb(null, false)
//       return cb(new Error('Only .png, .jpg, .mp4 and .jpeg format allowed!'))
//     }
//   }
// })

// module.exports.send = (req, res, next) => {
//   return upload.single('image')(req, res, () => {
//     if (!req.file)
//       return res.json({message: "Invalid file type"})
//     next()
//   })
// }

// export const MulterService = (req, res, next) => {
//   return upload.single('image')(req, res, () => {
//     if (!req.file)
//       return res.json({message: "Invalid file type"})
//     next()
//   })
// }


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${file.originalname}`;
    // 1234544-4545454.jpeg
    cb(null, uniqueName);
  },
});

export const MulterService = multer({
  storage,
  limits: {fileSize: 1000000 * 2},
}).single('image');
