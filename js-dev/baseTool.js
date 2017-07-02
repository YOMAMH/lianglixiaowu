/**
 * Created by renminghe on 2017/6/24.
 */
var SUCCESS_COLOR = "#38AF57";
var ERROR_COLOR = "#D8534F";
var BASENETTOOL = "";
function BaseNetTool() {

    // 获取数据
    this.getDate = getCategory;

    /**
     *  分页
     * @param data 请求返回的数据
     * @param dateUrl 请求地址
     * @param template 数据渲染模板
     */
    this.pagination = function (data, dateUrl, template, cb) {
        $('.M-box3').pagination({
            totalData: data ? data : 50,
            showData: 10,
            jump: true,
            coping: true,
            homePage: '首页',
            endPage: '末页',
            prevContent: '上页',
            nextContent: '下页'
        });

        // 分页按钮
        var index = 0;
        $('.M-box3').delegate('a', 'click', function () {
            switch ($(this).text()) {
                case '下页': {
                    index += 10;
                }
                    break;
                case '上页': {
                    index -= 10;
                }
                    break;
                case '末页': {
                    index = Math.floor(data / 10) * 10;
                }
                    break;
                case '首页': {
                    index = 0;
                }
                    break;
                case '跳转': {
                    index = ($('.M-box3').find('.active').text() - 1) * 10;
                }
                    break;
                default: {
                    index = ($(this).text() - 1) * 10;
                }
                    break;
            }
            getCategory(dateUrl, index, template, cb);
        })
    };

    /**
     * 添加数据
     * @param url 请求地址
     * @param method 请求方式
     * @param data 请求体
     * @param href 跳转地址
     * @param cb 回调函数
     */
    this.createDate = function (url, method, data, href, cb) {
        // 添加数据请求
        netWork(domain + url, method, data, function () {
            alertView("添加问题数据成功！", SUCCESS_COLOR);
            refView(href);
            cb();
        });
    };

    /**
     * 编辑问题
     * @param url 请求地址
     * @param data 请求体
     * @param href 跳转地址
     */
    this.update = function (url, method, data, href, cb) {
        // 修改数据请求
        netWork(domain + url, method, data, function () {
            alertView("修改问题数据成功！", SUCCESS_COLOR);
            refView("/lianglixiaowu/" + href);
            if(cb) cb();
        });
    };

    /**
     * 删除问题
     * @param url 请求地址
     * @param data 请求体
     * @param href 跳转地址
     */
    this.dropData = function (url, method, data, href) {
        if (confirm("确定删除该条数据吗?")) {
            // 删除数据请求
            netWork(domain + url, method, data, function () {
                alertView("删除问题数据成功！", SUCCESS_COLOR);
                refView(href);
            });
        }

    };


}

// 单例
BaseNetTool.sharedBaseNetTool = function () {
    if (!BASENETTOOL) {
        BASENETTOOL = new BaseNetTool();
    }
    return BASENETTOOL;

};

// 弹框提示
BaseNetTool.prototype.alertView = alertView;

// 刷新
BaseNetTool.prototype.refView = refView;

// 成功颜色
BaseNetTool.prototype.SUCCESS_COLOR = SUCCESS_COLOR;

// 失败颜色
BaseNetTool.prototype.ERROR_COLOR = ERROR_COLOR;

// 请求方式枚举
BaseNetTool.prototype.methodEnum = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
};

/**
 * 获取数据
 * @param url 请求地址
 * @param index 请求页数
 * @param templateView 视图渲染模板
 * @param cb 回调函数
 */
function getCategory(url, index, templateView, cb) {
    include("product-manager");
    $('.conver').show();
    if (!index) index = 1;
    netWork(domain + url + index, "GET", '', function (data) {
        $('.conver').hide();
        var html = template(templateView, data);
        $('.proContain').html(html);
        $('.proContain tr:odd').css("backgroundColor", "rgba(231, 231, 255, 0.66)");
        if (cb) cb(data);
    });
}

// 网络请求
function netWork(url, active, data, cb) {
    $.ajax({
        url: url,
        type: active,
        data: data,
        success: function (data) {
            if (data.code === 1) {
                $('.conver').hide();
                cb(data);
            } else {
                this.error(data);
            }
        },
        error: function (data) {
            $('.conver').hide();
            alertView("失败！" + data.msg, ERROR_COLOR);
        }
    });
}


// 弹出框
function alertView(text, color) {
    $('.hostInfoRequestResView').text(text)
        .css('backgroundColor', color).fadeIn(300);
    setTimeout(function () {
        $('.hostInfoRequestResView').text('')
            .css('backgroundColor', 'none').fadeOut(500);
    }, 2000);
}

// 刷新
function refView(href) {
    setTimeout(function () {
        location.href = href;
    }, 1500);
}


window.sharedBaseNetTool = BaseNetTool.sharedBaseNetTool();