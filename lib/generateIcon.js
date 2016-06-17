var Promise = require("bluebird"),
  SVGO = require('svgo'),
  getIconSvg = require("./getIconSvg");

var svgo = new SVGO({
    removeViewBox: true,
    plugins: [
        {
            transformsWithOnePath: {
                width: 100,
                height: 100,
                hcrop: true,
                vcenter: true,
            }
        }
    ]
});

function generateSvg(name, params) {
  return new Promise(function(resolve, reject) {
    svgo.optimize(getIconSvg(params), function(result) {
      resolve({
          path: /d="(.*?)"/.exec(result.data)[1],
          width: /width="(.*?)"/.exec(result.data)[1],
          height: /height="(.*?)"/.exec(result.data)[1],
      });
    });
  });
}

function generateIcon(params) {
  var name = params.id;
  var workChain = [
      generateSvg(name, params)
  ];
  return Promise.all(workChain).then(function (results) {
    return {
        id: name,
        path: results[0].path,
        width: results[0].width,
        height: results[0].height,
    };
  });
}

module.exports = generateIcon;
