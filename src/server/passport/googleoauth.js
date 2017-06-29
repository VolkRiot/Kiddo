var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var gcal = require('google-calendar');

// Configure the Google strategy for use by Passport.js.
//
// OAuth 2-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Google API on the user's behalf,
// along with the user's profile. The function must invoke `cb` with a user
// object, which will be set at `req.user` in route handlers after
// authentication.
module.exports = function(){

passport.use(new GoogleStrategy({
  clientID: '161301570635-fv4tliniaqa4atpj2ldelicb7qlo7of4.apps.googleusercontent.com',
  clientSecret: 'aLp3Uh7OOs_E6aw8ulayB5jX',
  callbackURL: 'http://localhost:3000/auth/google/callback',
  accessType: 'offline'
}, (accessToken, refreshToken, profile, cb) => {
  // Extract the minimal profile information we need from the profile object
  // provided by Google
  //Find out token expiration/how to refresh
  console.log(accessToken);
  console.log(refreshToken);
  console.log(profile.displayName);
  var google_calendar = new gcal.GoogleCalendar(accessToken);
  google_calendar.calendarList.list(function(err, calendarList) {
      console.log(calendarList);
  });
  cb(null, null);
}));
// used to serialize the user for the session
passport.serializeUser((user, cb) => {
  cb(null, user);
});
// used to deserialize the user
passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

}