module.exports = (sequelize, Datatypes) => {
  const Likes = sequelize.define('Likes');
  return Likes;
};
// !Parece que no hace falta definir columnas.
// *Sólo habrá una columna de ids para cada like, el id de cada like.
/* things we need:
   -id of the post to which a like corresponds
   -the id of the user who did the like.
   */

// We will associate posts to likes.
// But also associate users each one to its likes.
