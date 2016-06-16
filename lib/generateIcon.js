var Promise = require("bluebird"),
  SVGO = require('svgo'),
  getIconSvg = require("./getIconSvg");

var svgo = new SVGO({
    removeViewBox: true,
    plugins: [
        {
            transformsWithOnePath: {
                width: 10,
                height: 10
            }
        }
    ]
});

function generateSvg(name, params) {
  return new Promise(function(resolve, reject) {
    svgo.optimize(getIconSvg(params), function(result) {
      resolve(/d="(.*?)"/.exec(result.data)[1]);
    });
  });
}

function generateIcon(params) {
  var name = params.id;
  var workChain = [
      generateSvg(name, params)
  ];
  return Promise.all(workChain).then(function (results) {
    return { id: name, color: params.color, path: results[0] };
  });
}

module.exports = generateIcon;
