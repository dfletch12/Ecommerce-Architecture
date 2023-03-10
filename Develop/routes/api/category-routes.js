const router = require("express").Router();
const { Category, Product } = require("../../models");
const { findByPk } = require("../../models/Category");

// The `/api/categories` endpoint

  // find all categories
  // be sure to include its associated Products
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: { 
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      }
    });
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err);
  }
});


  // find one category by its `id` value
  // be sure to include its associated Products
router.get("/:id", async (req, res) => {
  try {
    const singleCategory = await Category.findByPk(req.params.id, {
      include: { 
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      }
    });

    res.status(200).json(singleCategory);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory);    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
});

res.status(200).json(updateCategory);
} catch (err) {
res.status(400).json(err);
}
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
