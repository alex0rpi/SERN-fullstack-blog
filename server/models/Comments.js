module.exports = (sequelize, Datatypes) => {
  const Comments = sequelize.define('Comments', {
    commentBody: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    username: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });
  return Comments;
};

// Syntax below also works

// const Comments = (sequelize, Datatypes) => {
//   const Comments = sequelize.define('Comments', {
//     commentBody: {
//       type: Datatypes.STRING,
//       allowNull: false,
//     },
//   });
//   return Comments;
// };

// module.exports = Comments;
