const CategoryModal = require("../models/CategoryBlog");

exports.createCategoryBlog = async (req, res) => {
  try {
    const { name, status } = req.body;

    if (!name || status === undefined) {
      return res.status(400).json({
        success: false,
        message: "Category name and status are required",
      });
    }

    // Generate slug from name
    const slug = name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");

    // Check duplicate category
    const existingCategoryBlog = await CategoryModal.findOne({
      $or: [{ name }, { slug }],
    });

    if (existingCategoryBlog) {
      return res.status(409).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await CategoryModal.create({
      name,
      slug,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating Category",
      error: error.message,
    });
  }
};

exports.getCategoryBlog = async (req, res) => {
  const data = await CategoryModal.find();
  res.json({
    data: data,
    message: "Category list fetched successfully!",
  });
};

exports.updateCategoryBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

    const category = await CategoryModal.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Update name and slug
    if (name) {
      category.name = name;

      category.slug = name
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-")     // Replace spaces with -
        .replace(/-+/g, "-");     // Remove multiple dashes
    }

    // Update status
    if (typeof status !== "undefined") {
      category.status = status;
    }

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating Category",
      error: error.message,
    });
  }
};

exports.deleteCategoryBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await CategoryModal.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting Category",
      error: error.message,
    });
  }
};