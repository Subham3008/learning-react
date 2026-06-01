const express = require("express")
const verifyJwt = require("../middleware/auth.middleware")
const { createProjectController, getMyProjectsController, getAllProjectsController, getSingleProjectController, deleteProjectController, updateProjectController } = require("../controllers/project.controller")
const upload = require("../middleware/multer.middleware")

const router = express.Router()

//create project controller--------->>
router.post("/create", verifyJwt, upload.single("thumbnail"), createProjectController)

//fetched My projects controller---------->>
router.get("/my-projects", verifyJwt, getMyProjectsController)

//fetched All projects controller---------->>
router.get("/", getAllProjectsController)

//get single project by Id----------->>
router.get("/:id", getSingleProjectController)

//delete project by Id----------->>
router.delete("/:id", verifyJwt, deleteProjectController)

//update project---------------->>
router.patch(
  "/update/:id",
  verifyJwt,
  upload.single("thumbnail"),
  updateProjectController
)

module.exports = router