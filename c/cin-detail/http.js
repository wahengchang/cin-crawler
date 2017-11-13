var request = require('request')
var writeFile = require('../../lib/file').writeFile
var MVAuthorization = require('../../temp/s.json').MVAuthorization
//Set the cookie instead of setting into header
var cookie = request.cookie('B=0n8a8bpcavld3&b=4&d=DQY8dVxpYEPVM6V.zKINr0DLmbimlWAD3Qg-&s=hd&i=aVldTnw7DYF9J34urce9; AO=u=1; F=a=T1sUPkQMvSBIfF4wsm9UEqyyt8heLfr9nNs4KOVdZESQtVA_sqb8_4cAsD01FwmpQeALNAE-&b=jpR7&d=AuMfXG89vJYZkERUYKCNkmYSV6W5fqvjYag2oxYoGfk-; PH=l=zh-Hant-TW&i=tw&fn=x2vaV3p8vAhx3edwvC9CZGLU; SSL=v=1&s=iCCT9g8dckyLcffHl21aWZtjx3vcrzwq1oFd.PViYNxinBhsyIpXDXU6gPeZAFxPOZdoiaClK3SL49_sEg.XBw--&kv=0; T=z=LY9rYBLskwYB3Onz5ekaDnnMDI1BjY3NjdOMk8xNDc-&a=YAE&sk=DAAvpmUPUhAbru&ks=EAApwxs20RmTZGOQg3wgsZbwg--~F&kt=EAAyCkTr4lmzyOU15VfI.lm2Q--~H&ku=FAAMEUCIQDEKAc3vdTLIZbB8hwAhzeohL5LrEMuU_rR.Qr04hl1oQIgX.Xk59bFKKrGVoPPG1BJF7zkbCjIZM8VKsTrDTHYGwU-&d=c2wBTnpVeUFURXdNVEE1TlRnMk16QS0BYQFZQUUBZwFLMzdLQk1KQTZYWURPRzZIUUFBR0s0TFhYQQFhYwFBRDJucldMagFvawFaVzAtAXRpcAFLN0tCRkEBc2MBZGVza3RvcF93ZWIBZnMBQnFuYWxKMVlyOVczAXp6AUxZOXJZQkE3RQ--&af=QXdBQjFDQXpBQlJSQ3FBQjVoJnRzPTE0ODc5MTg2MDMmcHM9cEdseng1NzZ4WlFBeVZTUU1YWkJXUS0t; Y=v=1&n=2liakc7kmes5i&l=jm_0k2_ki4ht/o&p=m29vvtw513000100&iz=115&r=87&lg=zh-Hant-TW&intl=tw; YLS=v=1&p=1&n=1; YP=v=AwAAY&d=AEgAMEUCIQClt_nWx99YBsGto87h4G2XTva_SL.fy2wTMV2cecTTwgIgewUnh8ztWTo_wj_6PUGKlQhRXrMnrQi68u797YG1_4gA; ucs=lnct=1488331963; XSRF-TOKEN=eyJpdiI6IkM5ZFpIeFJjQTNpNG1WaW1KZlZ4RkE9PSIsInZhbHVlIjoiVjNTOWJwY2I3dTE4Q29XRU5BV013dFJsRldYcGFveUwyN3E3TjFLcG55NzNyWWkyaVB3b2lURkpNMFZUVGk3TmFiZjBDNEx6dEdBZHB1K205SkFDcVE9PSIsIm1hYyI6IjQ0YTEzZjhkOTkyNjk5YWYyODkzMGQ3YzlhZTc3MzI0N2VjZjEyYmUxOTUyNTY2ZGFhNzk0NTczMzExMWY1MDkifQ%3D%3D; m_s=eyJpdiI6InVOTjZBYlc3VEZBXC9hdmg5UW4wbEhnPT0iLCJ2YWx1ZSI6Ijg0SitPc0FDc0NLZTJLQTh0c0VhM3ViaGZSTXpkMTVXSWJ6NzBLd2lFSHdzWGNlNkxnMjlLN2piTThVa3RRZ3VoQ0tHRXltVEpRUkNoWmsxY2dEb1dRPT0iLCJtYWMiOiIyNmQxZWViNzk4N2VhMWRmNDYwN2UxM2QzNGRkMjUwNmNjOTZiYjJkYzgyZDE1Y2QwNmJjZTk0NWFmOTU0M2JlIn0%3D');


// Set the headers for the request
var headers = {
    'Content-Type': 'application/json',
    // 'Cookie': cookie,
    'MV-Authorization': MVAuthorization
};
// Configure the request
var options = {
    url: 'https://tw.movies.yahoo.com/api/v1/ez/all_cinemas/',
    method: 'GET',
    headers: headers
};

// Start the request
request(options, function (error, response, body) {
    console.log('response.statusCode: ', response.statusCode)
    
    if (!error && response.statusCode === 200) {
        // Print out the response body
        // cb(null, {status: 0, statusDsc: "success", data: body});
        console.log('body: ', body)
        writeFile('./temp/data/cin-list.json', body)
    } else {
        // cb(error, {status: 2, statusDsc: JSON.stringify(error)});
        console.log('error: ', error)
    }
});