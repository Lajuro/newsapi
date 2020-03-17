const request = require('request');
const apiKey = 'eea4ff4e66b248758125da53003de1b1';

const news = (country, callback) => {
    const url = `http://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
    request({url, json: true}, (error, {body}) => {
        if (error) {
            return callback('Unable to connect to news API!', undefined);
        } else {
            callback(undefined, body);
        }
    });
}

module.exports = news;