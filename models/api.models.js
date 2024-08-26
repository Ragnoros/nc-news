const fs = require('fs')


exports.selectApi = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./endpoints.json', "utf8", (err, data) => {
          if (err) {
            reject(err);
          }
          const parsedData = JSON.parse(data);
          resolve(parsedData);
        });
      });
}