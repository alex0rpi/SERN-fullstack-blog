module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    // Write here the structure for our table with each field/column
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  // associate Posts table with their respective comments table: ONE post to ONE many comments.
  // and we specify it here in the Post model, which is the ONE which can be related to many.
  Posts.associate = (models) => {
    // models is an argument that has access to all created models so far.
    Posts.hasMany(models.Comments, {
      // configuration object for this association.
      onDelete: 'cascade', // a post deletion means also the deletion of all associated comments.
    });
    Posts.hasMany(models.Likes, {
      onDelete: 'cascade',
    });
  };

  return Posts;
};
