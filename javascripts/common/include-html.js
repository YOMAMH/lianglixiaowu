/**
 * Created by gzd on 2017/3/12.
 * 引用页面,例如引用footer,header等公共页面
 * 引用方式为固定写法: <div fragment="fragment/header.html">1</div>
 */
function include(id) {
    var includes = $("div[fragment]");
    for (var i = 0; i < includes.length; i++) {
        getData(i, function (data, index) {
            if (data) {
                $(includes[index]).html(data);
                $("#"+id).addClass("current").siblings().removeClass("current");
            }
        });
    }
    function getData(index,cb) {
        $.get(includes[i].getAttribute("fragment"), function (data) {
            cb(data, index);
        });
    }
};