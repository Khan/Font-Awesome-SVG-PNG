var template =
  '<svg width="2000" height="2000" xmlns="http://www.w3.org/2000/svg">' +
  '<g transform="scale(1 -1) translate(0 -2000)">' +
  '<path d="{path}" fill="{color}" />' +
  '</g>' +
  '</svg>';

function getIconSvg(params) {
  var out = template.substr(0);
  Object.keys(params).forEach(function(key) {
    out = out.replace(new RegExp("{" + key + "}", 'g'), params[key]);
  });
  return out;
}

module.exports = getIconSvg;
