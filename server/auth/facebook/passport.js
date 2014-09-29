var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

globalAccessToken = null;

exports.setup = function (User, config) {
  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      globalAccessToken = accessToken;
      User.findOne({
        'facebook.id': profile.id
      },
      function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            role: 'user',
            username: profile.username,
            provider: 'facebook',
            facebook: profile._json,
            accessToken: accessToken
          });
          user.save(function(err) {
            if (err) done(err);
            return done(err, user);
          });
        } else {
          user.accessToken = accessToken;
          user.save(function(err) {
            return done(err, user);          
          })
        }
      })
    }
  ));
};