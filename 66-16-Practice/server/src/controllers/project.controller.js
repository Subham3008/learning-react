
const projectModel = require("../models/project.model");
const APiError = require("../utils/apiError");
const { uploadToImagekit } = require("../utils/imagekit.helper");


const createProjectController = async (req, res) => {

  const {
    title,
    description,
    techStack,
    githubLink,
    liveLink,
  } = req.body;

  if (!title) {
    throw new APiError(400, "Title is required");
  }

  if (!description) {
    throw new APiError(400, "Description is required");
  }

  const projectData = {
    owner: req.user._id,
    title,
    description,
    techStack,
    githubLink,
    liveLink,
  };

  // Thumbnail Upload
  if (req.file) {
    const uploadedThumbnail = await uploadToImagekit(
      req.file,
      req.file.originalname,
      "/hack-sprint/projects"
    );

    projectData.thumbnail = {
      url: uploadedThumbnail.url,
      fileId: uploadedThumbnail.fileId,
    };
  }

  const project = await projectModel.create(projectData);

  return res.status(201).json({
    success: true,
    message: "Project created successfully",
    data: project,
  });
};

module.exports = {
  createProjectController,
};