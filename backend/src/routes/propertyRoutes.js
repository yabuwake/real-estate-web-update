router.delete('/:id', protect, deleteProperty);
const express = require('express');
const router = express.Router();
const {
  createProperty,
  getProperties,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController');

const { protect } = require('../middleware/auth'); 


router.get('/', getProperties);


router.post('/', protect, createProperty);
router.put('/:id', protect, updateProperty);
router.delete('/:id', protect, deleteProperty);

module.exports = router;