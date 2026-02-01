const Property = require('../models/Property');

exports.createProperty = async (req, res) => {
  try {
    const property = await Property.create({ ...req.body, agent: req.user.id });
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getProperties = async (req, res) => {
  try {
    const { minPrice, maxPrice, city, type, status } = req.query;
    const query = {};
    if (minPrice) query.price = { $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };
    if (city) query.city = city;
    if (type) query.type = type;
    if (status) query.status = status;

    const properties = await Property.find(query).populate('agent', 'name');
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProperty = async (req, res) => {
  const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(property);
};

exports.deleteProperty = async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};