var express = require('express');
var app = express();
var client_id = 'xqe9jzWVhLJqQcaFPMkh'; /* 네이버 개발자 센터에서 클라이언트 아이디로 교체 */
var client_secret = 'qEMURUqPPA';  /* 네이버 개발자 센터에서 시크릿 키로 교체 */
var state = "RANDOM_STATE";
var redirectURI = encodeURI("http://localhost:9090/api/naverLogin");  /* 네이버 개발자 센터에서 콜백 url로 교체 */
var api_url = "";
//app.get('/naverLogin', function (req, res) {
//나중에 로그인한 결과를 받는 공간
app.get('/naverLogin', function (req, res) {
  api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
   res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
   res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
 });
 app.get('/callback', function (req, res) {
    code = req.query.code;
    state = req.query.state;
    api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
     + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
    var request = require('request');
    var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
     };
    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
        res.end(body);
      } else {
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
      }
    });
  });
 app.listen(3000, function () {
    //127.0.0.1 대신 localhost
   console.log('http://localhost:9090/api/naverLogin app listening on port 3000!');
 });