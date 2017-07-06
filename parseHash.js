/*
    说明：解析url参数配置
    返回值：如[ie: "utf-8", f: "8", rsv_bp: "1", ch: "11", tn: "98012088_5_dg"…]
    调用：parseUrl(window.location.href);
*/

var parseUrl = function(url) {
    if (!url) {return;}

    var str = url.split("?")[1];

    if (!str) {return;}

    var	items = str.split("&");
    var arr, name, value;
    var reArr = [];

    for (var i = 0; i < items.length; i++) {
        arr = items[i].split("=");
        name = decodeURIComponent(arr[0]);
        value = decodeURIComponent(arr[1]);
        reArr[name] = value;
    }

    return reArr;
}

