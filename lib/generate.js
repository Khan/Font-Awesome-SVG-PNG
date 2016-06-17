var Promise = require("bluebird"),
  getGlyphs = require("./getGlyphs"),
  generateIcon = require("./generateIcon");

function generate(argv, callback) {
  return getGlyphs().then(function (glyphs) {
    var iconConfigs = glyphs.map(function (glyph) {
      return {
          id: glyph.id,
          path: glyph.data.d
      };
    });

    return Promise.map(iconConfigs, generateIcon, {concurrency: 1}).then(function (done) {
        var paths = {};
        done.sort(function(a, b) {
            return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
        }).forEach(function(doneItem) {
            var id = doneItem.id.replace(/[_-](\w)/g, function(all, letter) {
                return letter.toUpperCase();
            });
            paths[id] = {
                path: doneItem.path,
                width: +parseFloat(doneItem.width).toFixed(3),
                height: +parseFloat(doneItem.height).toFixed(3),
            };
        });
        console.log(JSON.stringify(paths, null, "    "));
    }).nodeify(callback);
  });
}

module.exports = generate;
