const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes'); 

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB Connected'));


const seedAdmin = async () => {
  const User = require('./models/User');
  const exists = await User.findOne({ email: 'yabuwake84@gmail.com' });
  if (!exists) {
    await User.create({
      name: 'Admin',
      email: 'yabuwake84@gmail.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('Admin created: yabuwake84@gmail.com / admin123');
  }
};
seedAdmin();

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));