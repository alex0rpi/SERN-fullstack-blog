const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');

// Middlewares ---- ↓ enable json parsing ↓ ----
app.use(express.json());

app.use(cors()); //we're using a proxy in our client frontend so in theory it is not necessary.

// Routes
const postRoutes = require('./routes/postsRoutes');
app.use('/api/posts', postRoutes);
const commentsRoutes = require('./routes/commentsRoutes');
app.use('/api/comments', commentsRoutes);
const usersRoutes = require('./routes/usersRoutes');
app.use('/api/auth', usersRoutes);
const likesRoutes = require('./routes/likesRoutes');
app.use('/api/like', likesRoutes);

db.sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server running on port 5000');
  });
});
