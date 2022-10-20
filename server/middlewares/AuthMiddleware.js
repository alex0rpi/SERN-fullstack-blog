const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const accessToken = req.header('accessToken');
  if (!accessToken) {
    return res.json({ error: 'Unauthorized, user not logged in.' });
  }
  try {
    // ##########################################################
    const validToken = jwt.verify(accessToken, 'importantsecret');
    // ##########################################################
    /*this is now a DE-CODED jwt token, and it contains the data we stored
    at the moment we "signed it". It is an object with the username and id.*/
    // ---------
    /*Now we can create an element accessible accross all our backend.
    A variable property inserted in the request object.*/
    // ##########################################################
    req.user = validToken; //{username: , id: }
    // ##########################################################
    if (validToken) {
      return next();
    }
  } catch (error) {
    return res.json({ error: error });
  }
};

module.exports = validateToken;
