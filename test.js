var OAuth = require('oauth');

var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  'gfwAFD7PkmEh20UFgrhgX2KQo',
  'OaqKOxPEWhaRCosLb936l0N8KNbij15BfJOMINVpLuJ73AJ2zk',
  '1.0A',
  null,
  'HMAC-SHA1'
);

console.log('ok');

oauth.get(
  'https://api.twitter.com/1.1/trends/place.json?id=23424977',
  '731779661735190528-UadTm5RJ4cZ6K4AaWHWwFb7TAcAOSbm', //test user token
  'GDWsIR2e0xW7EvGqxB9UYbcWmRQrqCm5G4sVoEC61Baqb', //test user secret            
  function (e, data, res) {
    if (e) console.error(e);
    console.log(require('util').inspect(data));
    done();
  });    
