require('dotenv').config()
const { notarize } = require('electron-notarize')

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;  
  if (electronPlatformName !== 'darwin') {
    return
  }

  console.log("TODO, NOT YET FINISHED in build/notarize.js")
  const appName = context.packager.appInfo.productFilename

//   return await notarize({
//     appBundleId: 'com.jemonjam.shush',
//     appPath: `${appOutDir}/${appName}.app`,
//     appleId: process.env.APPLEID,
//     appleIdPassword: process.env.APPLEIDPASS,
//   })
}