var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));

const countColumn = 0;
const targetLineNumber = 2;

var Config = function(){
    return {
        host: 'http://localhost',
        port: '7777',
        route: 'resultPath',
        uri: '',
        resultPath: '',
        inputFile: 'root.html',
        outputFile: 'output.txt',
        isDebug: false,
        setHost: function(_host){ this.host = _host; },
        setPort: function(_port){ this.port = _port; },
        setInputResultPath: function(_path){ this.resultPath = _path; },
        setInputResultFilename: function(_fin){ this.inputFile = _fin; },
        setOutputFile: function(_fout){ this.outputFile = _fout; },
        setEnableDebugMode: function(isEnable){ this.isDebug = isEnable; },
        getURI: function(){
            return this.host + ':' + this.port + '/' + this.route + '/' + this.resultPath + '/' + this.inputFile;
        },
        getOutputFile: function(){ return this.outputFile; }
    };
};

console.log(argv);

var config = new Config();
argv.hasOwnProperty('d')?config.setEnableDebugMode(true):console.log('Disable debug mode...');
argv.hasOwnProperty('h')?config.setHost(argv.h):console.log('Using default host : ' + config.host);
argv.hasOwnProperty('p')?config.setPort(argv.p):console.log('Using default port : ' + config.port);
argv.hasOwnProperty('r')?config.setInputResultPath(argv.r):console.log('Using default path : ' + config.resultPath);
argv.hasOwnProperty('f')?config.setInputResultFilename(argv.f):console.log('Using default input file name : ' + config.inputFile);
argv.hasOwnProperty('o')?config.setOutputFile(argv.o):console.log('Using default output file name : ' + config.outputFile);

if(config.isDebug) console.log(config);

var uri = config.getURI();
if(config.isDebug) console.log('URI : ' + uri);

request({ uri: uri }, function(error, response, body){
    console.log('Starting...');

    if(error) { 
        if(config.isDebug) console.log('error: ' + error);
    } else {
        var lines = body.split('\n');
        var lineNumber = lines.length;
        var isFoundBody = false;
        var countLine = 0;
        var targetLine = 50;
        var isOutOfLimit = false;
        var spliter = '\t';
        var specialTableNumber = 2;
        var countSpecialTable = 1;
        var tableContent = '';
        var outputFileFormat = config.getOutputFile();
        var stream = fs.createWriteStream(outputFileFormat, { flags: 'a' });

        if(config.isDebug) console.log('Get special table#' + specialTableNumber);
    
        for(var li=0;li<lineNumber;li++){
            if(lines[li].indexOf('<table')>0){
                if(countSpecialTable==specialTableNumber){
                
                    var rowInTable = splitRow(lines[li]);
                    rowInTable = rowInTable.split('\n');

                    for(var ri=0;ri<rowInTable.length;ri++){
                        var $ = cheerio.load(rowInTable[ri]);
                        var curLineContent = '';
                        var countColumn = 0;

                        $('p').each(function(i,elem){
                            var text = $(this).html();
                            text = text.replace(/\<span\>/gi, '');
                            text = text.replace(/\<\/span\>/gi, '');
                            text = text.replace(/\&lt\;/gi, '<');
                            text = text.replace(/\&gt\;/gi, '>');

                            if(config.isDebug) console.log(text);

                            if(countColumn>0) curLineContent += spliter;
                            curLineContent += text;
                            countColumn++;
                        });

                        countColumn = 0;
                        curLineContent += '\n';
                        stream.write(curLineContent);
                        curLineContent = '';
                        countLine++;
                    }
                } else {
                    if(config.isDebug) console.log('Skip table#' + countSpecialTable);
                }
                countSpecialTable++;
            }
        }

        stream.end();
    }

    console.log('Finished');
});

function splitRow(tableStr) {
    return tableStr.replace(/\<tr/gi, '\n<tr');
}