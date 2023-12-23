const { User } = require('../db/models');

async function getUser(req, res, next) {
  if (req.session.user_id) {
    // console.log(req.session.user_id.user_id);
    const user = await User.findByPk(req.session.user_id);
    res.locals.user = user;
  }
  // const user = await User.findByPk(req.session.user_id);
  // res.locals.user = user;
  next();
}

module.exports = getUser;