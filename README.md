Font Awesome SVG Paths (Khan Academy)
====================

A fork of:
https://github.com/encharm/Font-Awesome-SVG-PNG

Modified to support a specific workflow we have at Khan Academy (converting our existing, custom, FontAwesome to be a JSON file of SVG paths that we can feed into a custom React component).

How to use:

```
git clone git@github.com:Khan/Font-Awesome-SVG-Paths.git
cd Font-Awesome-SVG-Paths/

npm install
rm -rf node_modules/font-awesome/
git clone git@github.com:Khan/Font-Awesome.git node_modules/font-awesome

Then run:
./font-awesome-svg-paths.js > paths.json
```

The end result will be a `paths.json` file with all the SVG paths listed by name.

## License
- Font-Awesome-SVG-PNG is licensed under the MIT license
