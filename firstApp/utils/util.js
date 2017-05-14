function convertStarsToArray(stars) {
    var array = [];
    if (stars === 50) {
        array = [1, 1, 1, 1, 1];
    } else if (stars === 45) {
        array = [1, 1, 1, 1, 0.5];
    } else if (stars === 40) {
        array = [1, 1, 1, 1, 0];
    } else if (stars === 35) {
        array = [1, 1, 1, 0.5, 0];
    } else if (stars === 30) {
        array = [1, 1, 1, 0, 0];
    } else if (stars === 25) {
        array = [1, 1, 0.5, 0, 0];
    } else if (stars === 20) {
        array = [1, 1, 0, 0, 0];
    } else if (stars === 15) {
        array = [1, 0.5, 0, 0, 0];
    } else if (stars === 10) {
        array = [1, 0, 0, 0, 0];
    } else if (stars === 5) {
        array = [0.5, 0, 0, 0, 0];
    } else if (stars === 0) {
        array = [0, 0, 0, 0, 0];
    }
    return array;
}


function http(url, callback) {
    wx.request({
        url: url,
        method: 'GET',
        header: {
            'Content-Type': 'application/xml'
        },
        success: function(res) {
            callback(res.data);
        },
        fail: function(error) {
            console.log(error);
        }
    })
}



function convertToCastString(casts) {
    var castsjoin = "";
    for (var idx in casts) {
        castsjoin = castsjoin + casts[idx].name + " / ";
    }
    return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
    var castsArray = []
    for (var idx in casts) {
        var cast = {
            img: casts[idx].avatars ? casts[idx].avatars.large : "",
            name: casts[idx].name
        }
        castsArray.push(cast);
    }
    return castsArray;
}

function getRandomColor () {
  let rgb = []
  for (let i = 0 ; i < 3; ++i){
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}



module.exports = {
    convertStarsToArray: convertStarsToArray,
    http: http,
    convertToCastString: convertToCastString,
    convertToCastInfos: convertToCastInfos,
    getRandomColor: getRandomColor
}