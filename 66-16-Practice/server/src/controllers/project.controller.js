
const projectModel = require("../models/project.model");
const APiError = require("../utils/apiError");
const { uploadToImagekit } = require("../utils/imagekit.helper");

// create controller--------->>
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


//fetched My projects--------->>
const getMyProjectsController = async (req, res) => {

  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized access");
  }

  const projects = await projectModel.find({ owner: userId }).sort({ createdAt: -1 })

  return res.status(200).json({
    success: true,
    message: projects.length
      ? "My projects fetched successfully"
      : "No projects found",
    count: projects.length,
    data: projects,
  });
}

//fetched all projects---------->>
const getAllProjectsController = async (req, res) => {
  const projects = await projectModel
    .find()
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: projects.length
      ? "Projects fetched successfully"
      : "No projects found",
    count: projects.length,
    data: projects,
  });
};

module.exports = {
  createProjectController,
  getMyProjectsController,
  getAllProjectsController,
};