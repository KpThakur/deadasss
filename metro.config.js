const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 * 
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};
module.exports = mergeConfig(getDefaultConfig(__dirname), config);
// const blacklist = require('metro-config/src/defaults/blacklist');
// module.exports = {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false,
//       },
//     }),
//   },
//   resolver: {
//     blacklistRE: blacklist([
//       /ios\/Pods\/JitsiMeetSDK\/Frameworks\/JitsiMeet.framework\/assets\/node_modules\/react-native\/.*/,
//     ]),
//   },
// };
