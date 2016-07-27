/**
 * Created by Yonghuai on 2016/7/27.
 */
var http = require('http');
var search = function (req, res, next) {
    var code = req.query.code;

    var opt = {
        host:'tiaoma.cnaidc.com',
        port:'80',
        method:'POST',
        path:'/jbestd.asp?ean='+code,
        headers:{

        }
    }
    var info = '';
    var request = http.request(opt, function(responce) {
        responce.on('data',function (d) {
            info += d;
        }).on('end', function() {
            var price = JSON.parse(info.toString()).price;
            price?res.end('ok'):res.end('fail');
            // return null;
        });
    }).on('error', function(e) {
        console.log(e);
        return null;
    });
    request.end();
}

module.exports = search;