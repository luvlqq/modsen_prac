import * as process from 'process';

export default () => ({
  jwt: {
    accessTokenSecret: process.env.ATSECRET,
    refreshTokenSecret: process.env.RTSECRET,
    accessTokenExpiresIn: process.env.ATEXPIREIN,
    refreshTokenExpiresIn: process.env.RTEXPIREIN,
  },
  application: {
    port: parseInt(process.env.PORT, 10),
  },
});
