// import multer from "multer";
//
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '_' + file.originalname)
//   }
// })
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