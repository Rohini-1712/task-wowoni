const fs = require('fs');

fs.readFile("sample.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    const finalData = new Set();
    const dataList = data.split('\n');
    dataList.forEach(element => {
        let newElement = element.split(' ');
        console.log(newElement)
        finalData.add('* ' + newElement.splice(1))
    });
    console.log(finalData.values());
    
  });