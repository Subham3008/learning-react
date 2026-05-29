const userModel = require("../models/user.model")
const Profile = require("../models/profile.model")
const APiError = require("../utils/apiError")
const mongoose = require("mongoose")
const { uploadToImagekit } = require("../utils/imagekit.helper")

//get current user profile
const getCurrentUserProfileController = async (req, res) => {

  // assuming auth middleware adds req.user
  const userId = req.user._id


  //---populate kam hota ha doo model ko ek sath jorna and ek model ke user id basis par dura model se data dhundna
  // find profile + populate user
  const profile = await Profile.findOne({
    user: userId
  }).populate({
    path: "user",
    select: "-passwordHash -refreshTokenHash"
  })


  if (!profile) {
    throw new APiError(404, "Profile not found.")
  }

  return res.status(200).json({
    success: true,
    profile
  })

}

//update profile
const updateProfileController = async (req, res) => {
  let { headline, bio, techStack, socialLinks, skills, location } = req.body;

  let updateData = {};
  if (headline !== undefined) updateData.headline = headline;
  if (bio !== undefined) updateData.bio = bio;
  if (location !== undefined) updateData.location = location;
  if (socialLinks !== undefined) updateData.socialLinks = socialLinks;


  //skills->>
  if (skills !== undefined) {
    if (!Array.isArray(skills)) {
      throw new APiError(400, "Skill must be an array");
    }
    //filter(Boolean) removes falsy value from an array
    let Skills = [
      ...new Set(skills.filter(Boolean).map((skill) => skill.trim()).filter(Boolean)),
    ];
    updateData.skills = Skills;
    console.log("skills", Skills);
  }

  //tech stack------->>
  if (techStack !== undefined) {
    if (!Array.isArray(techStack)) {
      throw new APiError(400, "techStack must be an array");
    }
    //filter(Boolean) removes falsy value from an array
    let TechStack = [
      ...new Set(techStack.filter(Boolean).map((ts) => ts.trim()).filter(Boolean)),
    ];
    updateData.techStack = TechStack
    console.log("TechStack", TechStack);
  }

  // profile picture upload
  if (req.files?.profilePicture) {

    const profilePictureFile = req.files.profilePicture[0];

    const uploadedProfilePicture = await uploadToImagekit(
      profilePictureFile,
      profilePictureFile.originalname,
      "/hack-sprint/profile-pictures"
    );

    updateData.profilePicture = {
      url: uploadedProfilePicture.url,
      fileId: uploadedProfilePicture.fileId,
    };
  }

  // banner upload
  if (req.files?.banner) {

    const bannerFile = req.files.banner[0];

    const uploadedBanner = await uploadToImagekit(
      bannerFile,
      bannerFile.originalname,
      "/hack-sprint/banners"
    );

    updateData.banner = {
      url: uploadedBanner.url,
      fileId: uploadedBanner.fileId,
    };
  }

  //update profile
  const profile = await Profile.findOneAndUpdate(
    { user: req.user._id },
    updateData,
    {
      new: true,
      runValidators: true,
    },
  ).populate("user", "name , email");

  if (!profile) {
    throw new APiError(404, "Profile not found");
  }

  return res.status(200).json({
    message: "Profile updated successfully",
    success: true,
  });
};

//search profile
const searchProfileController = async (req, res) => {
  const { name } = req.query

  if (!name) {
    throw new APiError(400, "Name query is required")
  }

  //find user by name
  const users = await userModel.find({
    name: {
      $regex: name,
      $options: "i",
    }
  }).select("_id")

  // extract user ids
  const userIds = users.map((user) => user._id)

  //find profile
  const profiles = await Profile.find({
    user: {
      $in: userIds
    }
  }).populate({
    path: "user",
    select: "name email avatar"
  })

  return res.status(200).json({
    success: true,
    count: profiles.length,
    profiles,
  })


}

//get sigle profile
const getSingleProfileController = async (req, res) => {

  const { id } = req.params

  // validate mongo id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new APiError(400, "Invalid profile id")
  }

  const profile = await Profile.findById(id)
    .select("-__v")
    .populate({
      path: "user",
      select: "name email avatar"
    })

  if (!profile) {
    throw new APiError(404, "Profile not found")
  }

  return res.status(200).json({
    success: true,
    profile,
  })

}

module.exports = {
  getCurrentUserProfileController,
  updateProfileController,
  searchProfileController,
  getSingleProfileController,

}