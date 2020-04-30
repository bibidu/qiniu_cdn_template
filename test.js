const { config, putFile } = require('.')

config({
  accessKey : '',
  secretKey: '',
})
putFile({
  workspaceName: 'r2rn-screenshot',
  distFilename: 'avatar1.gif',
  filepath: `/Users/mr.du/Desktop/avatar.gif`,
}).then(({ respBody: body, respInfo: res }) => {
  const { statusCode } = res
  if (statusCode === 200) {
    // { hash: 'FvL7USZ4jryylWMlUSiHVBHaWKj5', key: 'avatar1.gif' }
    console.log(body);
  }
})