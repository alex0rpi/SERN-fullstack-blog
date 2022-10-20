const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');

// Middlewares ---- ↓ enable json parsing ↓ ----
app.use(express.json());
app.use(cors());

// Routes
const postRoutes = require('./routes/postsRoutes');
app.use('/api/posts', postRoutes);
const commentsRoutes = require('./routes/commentsRoutes');
app.use('/api/comments', commentsRoutes);

db.sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server running on port 5000');
  });
});
