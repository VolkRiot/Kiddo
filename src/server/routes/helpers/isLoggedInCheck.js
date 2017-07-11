// route middleware helpers 
module.exports = {

  // Used when want to hit an express route but redirect if user is not logged in
  isLoggedIn: function (req, res, next) {

      // if user is authenticated in the session, carry on
      if (req.isAuthenticated())
          next();

      // if they aren't redirect them to the home page
      res.status(300).redirect('/')
  },
  // Used to verify that the user exists or otherwise send error
  isUser: function (req, res, next) {

    if(!req.user) {
      res.status(500).send({ user: false })

    } else {
      next();
    }
  },
  // Use this if redirect is not preferable like for front-end api calls to verify auth.
  isAuthenticated: function () {

    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(500).send({ authenticated: false})
    }
  }

}
