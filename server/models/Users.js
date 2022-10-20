// module, has an exports property
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Likes, { onDelete: 'cascade' });
    Users.hasMany(models.Posts, { onDelete: 'cascade' }); // this creates the UserId field (column) in the Posts table.
  };

  return Users;
};
