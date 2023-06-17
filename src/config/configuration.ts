import * as process from 'process';

export default () => ({
  jwt: {
    accessTokenSecret: process.env.ATSECRET,
    refreshTokenSecret: process.env.RTSECRET,
    accessTokenExpiresIn: 60 * 15,
    refreshTokenExpiresIn: '999d',
  },
  application: {
    port: parseInt(process.env.PORT, 10),
  },
});
