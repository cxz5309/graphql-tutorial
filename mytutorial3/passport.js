const passport = require('passport');
const jwt = require('jsonwebtoken');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Op } = require('sequelize');
const env = require('./env');
const { User } = require('./src/models');

module.exports = (app) => {
  app.use(passport.initialize());

  passport.use(new GoogleStrategy({
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${env.DOMAIN}/api/auth/google/callback`,
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const providerId = profile?.id;
      const email = profile?._json?.email;
      const name = profile.displayName;
      const role = 'base_user';
      const department = 'dev';
      const about = '';
      if (!providerId) {
        next(null, false, { msg: 'providerId 검증 오류' });
      }
      if (await User.findOne({
        where: {
          providerId,
        },
      })) {
        next(null, false, { msg: '회원 탈퇴 후 14일 이전에는 동일 ID 사용이 불가능합니다.' });
      }
      let user = await User.findOne({ where: { providerId } });
      if (!user) {
        user = await User.create({
          providerId, email, name, role, department, about
        });
        console.log('유저가 없어 회원가입됩니다', user);
      } else {
        console.log('유저가 이미 있어 로그인합니다', user);
      }
      // refresh token 발급 (2주)
      const refreshToken = jwt.sign({ providerId }, env.JWT_SECRET_KEY, {
        expiresIn: '14d',
      });

      // access token 발급 (24시간)
      const accessToken = jwt.sign({ providerId }, env.JWT_SECRET_KEY, {
        expiresIn: '1h',
      });

      await User.update(
        { refreshToken },
        { where: { providerId: providerId.toString() } },
      );

      done(null, profile, {
        refreshToken,
        accessToken,
      });
    } catch (err) {
      return done(err);
    }
  }));
};
