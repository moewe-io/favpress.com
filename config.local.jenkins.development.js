// Copy this file to config.local.js

// Target folder the plugin will be copied to, when using gulp watch
var deployTargetDir = 'C:\\PATH_TO_WORDPRESS\\wp-content\\plugins';

var placeholders = {
    '__RELEASE_CHANNEL__': 'development' // or 'stable'
};

module.exports.deployTargetDir = deployTargetDir;
module.exports.placeholders = placeholders;