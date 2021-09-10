'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  oss: {
    enable: true,
    package: 'egg-oss',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  io: {
    enable: true,
    package: 'egg-socket.io',
  },
}
