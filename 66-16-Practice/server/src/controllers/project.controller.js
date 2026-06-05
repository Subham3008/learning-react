const storageInstance = require("../config/imagekit");
const projectModel = require("../models/project.model");
const APiError = require("../utils/apiError");
const { uploadToImagekit } = require("../utils/imagekit.helper");
const mongoose = require("mongoose")

// create controller--------->>
const createProjectController = async (req, res) => {

  const {
    title,
    description,
    techStack,
    githubLink,
    liveLink,
  } = req.body;

  if (!title?.trim()) {
    throw new APiError(400, "Title is required");
  }

  if (!description?.trim()) {
    throw new APiError(400, "Description is required");
  }

  const projectData = {
    owner: req.user._id,
    title: title.trim(),
    description: description.trim(),
    githubLink,
    liveLink,
  };

  if (techStack) {
    projectData.techStack = Array.isArray(techStack)
      ? techStack
      : techStack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
  }

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
    throw new APiError(401, "Unauthorized access");
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

//fetched single project by id---------->>
const getSingleProjectController = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new APiError(400, "Invalid project id");
  }

  const project = await projectModel.findByIdAndUpdate(
    id,                     // Kaunsa document update karna hai
    { $inc: { views: 1 } },   // Kya update karna hai  or $inc: iska matlab value increase karo
    { returnDocument: 'after' }              // Update ka behavior / update hone ke badd wale data ko dikhate ha
  );

  if (!project) {
    throw new APiError(404, "Project not found");
  }

  return res.status(200).json({
    success: true,
    message: "Project fetched successfully",
    data: project,
  });
};

//delete project by id------->>
const deleteProjectController = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new APiError(400, "Invalid project id");
  }

  const project = await projectModel.findById(id);

  if (!project) {
    throw new APiError(404, "Project not found");
  }

  if (project.owner.toString() !== userId.toString()) {
    throw new APiError(
      403,
      "You are not authorized to delete this project"
    );
  }

  await project.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });
};

//update own project by id--------------->>
const updateProjectController = async (req, res) => {
  const { id } = req.params
  const userId = req.user._id

  //---------Validation part------------------>>
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new APiError(400, "Invalid project id");
  }

  const project = await projectModel.findById(id)

  if (!project) {
    throw new APiError(404, "Project not found");
  }

  if (project.owner.toString() !== userId.toString()) {
    throw new APiError(403, "You are not authorized to update this project");
  }

  //-------------update features implement------------>>
  const updateData = {}
  const { title, description, techStack, githubLink, liveLink } = req.body

  if (title) updateData.title = title
  if (description) updateData.description = description;
  if (githubLink) updateData.githubLink = githubLink;
  if (liveLink) updateData.liveLink = liveLink

  if (techStack) {
    updateData.techStack = Array.isArray(techStack)
      ? techStack
      : techStack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
  }

  if (req.file) {

    // Purani image delete karo
    if (project.thumbnail?.fileId) {
      await storageInstance.deleteFile(project.thumbnail.fileId)
    }

    // Nayi image upload karo
    const uploadedThumbnail = await uploadToImagekit(
      req.file,
      req.file.originalname,
      "/hack-sprint/projects"
    )

    updateData.thumbnail = {
      url: uploadedThumbnail.url,
      fileId: uploadedThumbnail.fileId,
    }
  }

  const updatedProject = await projectModel.findByIdAndUpdate(
    id,
    updateData,
    { returnDocument: 'after' }
  )

  return res.status(200).json({
    success: true,
    message: "Project updated successfully",
    data: updatedProject,
  });

}

module.exports = {
  createProjectController,
  getMyProjectsController,
  getAllProjectsController,
  getSingleProjectController,
  deleteProjectController,
  updateProjectController,
};