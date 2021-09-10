/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1621472780073_5403'

  // add your middleware config here
  config.middleware = []

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }
  config.jwt = {
    secret: "lpwq1225"
  }
  config.mongoose = {
    url: 'mongodb://localhost:27017/xiaomi'
  }
  config.security = {
    csrf: false
  }
  config.oss = {
    client: {
      accessKeyId: 'LTAI5t8mE8GsnFurE4jBYQmW',
      accessKeySecret: 'mgJHZqnQUzRRwenSBkfwlHHWEwGzgM',
      bucket: 'lp-disk',
      endpoint: 'oss-cn-chengdu.aliyuncs.com',
      timeout: '60s',
    },
  }

  // 上传格式和大小限制
  config.multipart = {
    // fileSize: '50mb',
    fileSize: 1048576000,
    // mode: 'stream',
    mode: "file",
    fileExtensions: [
      // images
      '.jpg', '.jpeg', // image/jpeg
      '.png', // image/png, image/x-png
      '.gif', // image/gif
      '.bmp', // image/bmp
      '.wbmp', // image/vnd.wap.wbmp
      '.webp',
      '.tif',
      '.psd',
      // text
      '.svg',
      '.js', '.jsx',
      '.json',
      '.css', '.less',
      '.html', '.htm',
      '.xml',
      // tar
      '.zip',
      '.gz', '.tgz', '.gzip',
      // video
      '.mp3',
      '.mp4',
      '.avi',
    ],
  }
  //cors
  config.cors = {
    origin: "*",
    allowMethods: "GET, HEAD, PUT, POST, DELETE, PATCH",
    credentials: true
  }
  // io
  config.io = {
    init: {},
    namespace: {
      connectionMiddleware: ['auth']
    }
  }
  return {
    ...config,
    ...userConfig,
  }
}