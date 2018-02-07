# PolyCSV
Convert output result in HTML file format from PolySpace to CSV

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=A8YE92K9QM7NA)

## Background
MATLAB:PolySpace using for automated static code analysis. It can export to HTML, MSWord, ..., etc. In case, you need to convert the output file to CSV file format to get content in special table, it may difficult because it has chuck/huge file size. PolyCSV will help you convert it into CSV file format.

PolyCSV was developed in JavaScript with some frameworks/packages that are provide in NodeJS (v6.11.4 with npm v5.6.0) including :
- [x] [Request](https://github.com/request/request) : is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.
- [x] [cheerio](https://github.com/cheeriojs/cheerio) : Fast, flexible & lean implementation of core jQuery designed specifically for the server.
- [x] [minimist](https://github.com/substack/minimist) : parse argument options.
- [x] [express](https://expressjs.com/) : Fast, unopinionated, minimalist web framework for Node.js.
- [x] [fs](https://nodejs.org/api/fs.html) : File system module in Node.js.
- [x] [path](https://nodejs.org/api/path.html) : The path module provides utilities for working with file and directory paths in Node.js.

All frameworks/packages above was convert to execution file(.exe) by using [pkg v4.3.0](https://github.com/zeit/pkg). It is command line interface enables you to package your Node.js project into an executable that can be run even on devices without Node.js installed.

## How does it work?

PolyCSV will fetch HTML content from `root.html`. It is default HTML file name. So, you need to provide server and move `root.html` file to same as your server environment/directory. But you have 2-ways to read the content :

#### Convert the data without Node.js

1. Run server-[YOUR_OS]. It will waiting/listening to access by `fetch.js`
   note: [YOUR_OS] is `win.exe` or `macos` or `linux`.

2. Open command line and type :
   ```
   $fetch-[YOUR_OS] -h [YOUR_HOST] -p [YOUR_PORT] -r [YOUR_PATH_TO_KEEP_root.html] -f root.html -o [OUTPUT_FILE]
   ```

   example :
   ```
   $fetch-win.exe -h http://localhost -p 7777 -r ./ -f root.html -o output.txt
   ```
   
   It will fetch the data in `<table>` tag in special table, this case is **the second table**. In each column will be split with `\t` and print out the data to text file format ( You can change the file format to `.csv`. When you open the file in MSExcel, you must set spliter to `\t` ).

3. Enjoy!!!

## Customize
   You can add your special feature/function by modified souce file in `src` and convert to `.exe` by yourself with command below :
   ```
   pkg [YOUR_JS_FILE] --options expose-gc
   ```
   
   But before you using above command, please install Node.js and frameworks/packages with command below first :
   ```
   (After installed Node.js)
   
   $npm install request --save
   $npm install cheerio --save
   $npm install minimist --save
   $npm install express --save
   ```

## Donation and Support
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=A8YE92K9QM7NA)

## License
MIT
