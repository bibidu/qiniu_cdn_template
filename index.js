const qiniu = require('qiniu')

const baseConfig = {}

exports.config = (config) => {
  Object.assign(baseConfig, config)
}
exports.putFile = (fileConfig = {}) => {
  const { workspaceName, filepath, distFilename } = fileConfig
  if (!workspaceName || !filepath || !distFilename) {
    throw 'lack of workspaceName or filepath or distFilename'
  }
  const putPolicy = new qiniu.rs.PutPolicy({
    scope: workspaceName,
  });
  const uploadToken = putPolicy.uploadToken(
    new qiniu.auth.digest.Mac(baseConfig.accessKey, baseConfig.secretKey)
  );
  const formUploader = new qiniu.form_up.FormUploader(
    new qiniu.conf.Config()
  );
  const putExtra = new qiniu.form_up.PutExtra();
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, distFilename, filepath, putExtra, (respErr, respBody, respInfo) => {
      if (respErr) {
        reject(respErr);
      }
      resolve({ respBody, respInfo })
    });
  })
}