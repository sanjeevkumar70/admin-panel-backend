const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { getCategoryBlog, createCategoryBlog, updateCategoryBlog, deleteCategoryBlog } = require("../controllers/category-blog.controller");

router.get("/category-blog", getCategoryBlog);
router.post("/category-blog", auth(["admin"]), createCategoryBlog);
router.put("/category-blog/:id", auth(["admin"]), updateCategoryBlog);
router.delete("/category-blog/:id", auth(["admin"]), deleteCategoryBlog)


module.exports = router;
