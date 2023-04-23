import { Router } from "express"
import { Files } from "../../controllers/files"
import protect from "../../middlewares/auth/protect"
import multer from "multer"
import { v4 } from "uuid"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.cwd() + "/.." + "/uploads")
    },
    filename: function (req, file, cb) {
      const name = v4() + "." +  file.originalname.split(".").at(-1)
      cb(null, name)
    }
  })

  const upload = multer({ storage: storage })

const FilesRouter = Router()

FilesRouter
    .get("/download/:fileName",  Files.DownloadFile)
    .get("/:fileName", Files.GetFile)
    .post("/:owner", upload.array('file'), Files.Upload)

export default FilesRouter