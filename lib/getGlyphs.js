var Promise = require("bluebird"),
  getIconList = require("./getIconList"),
  getFontData = require("./getFontData");

function getGlyphs() {
  return Promise.all([getIconList(), getFontData()]).spread(function (icons, fontData) {

    return icons.map(function (icon) {
      var data = fontData[icon.unicodeDec];
      if (!data) {
        console.error("NOT FOUND:", icon.id);
        return;
      }
      return {
        id: icon.id,
        unicodeHex: icon.unicodeHex,
        unicodeDec: icon.unicodeDec,
        data: data.data
      }
    }).filter(function (icon) {
        return !!icon;
    });

  });
}

module.exports = getGlyphs;
