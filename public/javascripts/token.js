/**
 * Created by Yonghuai on 2016/7/26.
 */
var https = require('https');
var crypto = require('crypto');

var wxconfig = null;

setInterval(getTicket,7000000);

function getTicket (req, res, next){
    var req1 = https.get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx5dc38a8d7c795e9d&secret=46039f55d2886481b812473b0c6ac63b", function(result1) {
        result1.on('data',function (data) {
            var accessToken = JSON.parse(data.toString()).access_token;
            var req2 = https.get("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token="+accessToken+"&type=jsapi", function(result2) {
                result2.on('data',function (data) {
                    var jsapi_ticket = JSON.parse(data.toString()).ticket;
                    var date = new Date();
                    var time = date.getFullYear().toString()+date.getDate().toString()+date.getMilliseconds();
                    var content = 'jsapi_ticket='+jsapi_ticket+'&noncestr=Dch5jgGHfi4jGgdi&timestamp='+time+'&url=http://www.zuinengliao.com/';
                    var shasum = crypto.createHash('sha1');
                    shasum.update(content);
                    var signature = shasum.digest('hex');

                    wxconfig = {
                        timestamp:time,
                        nonceStr: 'Dch5jgGHfi4jGgdi',
                        signature: signature
                    }
                    if(res){
                        res.wxconfig = wxconfig;
                        next();
                    }

                });
            }).on('error', function(e) {
                console.log("Got error: " + e.message);
            });
            req2.end();
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
    req1.end();
}



var addToken = function (req, res, next) {
    if(!wxconfig) {
        getTicket(req, res, next)
    }else {
        res.wxconfig = wxconfig;
        next();
    };
}
module.exports = addToken;