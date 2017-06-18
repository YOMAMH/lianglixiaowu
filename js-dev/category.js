/**
 * Created by renminghe on 2017/4/21.
 */
var SUCCESS_COLOR = "#38AF57";
var ERROR_COLOR = "#D8534F";
$(function () {
    // 获取类别管理数据与分页数据
    getCategory(pagination);
    
    // 添加问题
    addQuestions();
    
    // 编辑问题
    alterQuestions();
    
    // 删除问题
    dropQuestions();
});

// 获取类别管理数据与分页数据
function getCategory(cb, index) {
    $('.conver').show();
    if (!index) index = 1;
    netWork(domain + "/qa/types?page=" + index, "GET", '', function (data) {
        if (cb) cb(parseInt(data.data.total));
        $('.conver').hide();
        var html = template('categoryView', data.data);
        $('.proContain').html(html);
    });
}

// 分页
function pagination(data) {
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
        
        getCategory('', index);
    })
}

// 添加数据
function addQuestions() {
    $('#add-pic').on('click', function () {
        if ($(this).find('span').text() === "添加") {
            $(this).find('span').text("确认");
            $('.proContain').append('<tr><td></td>' +
                '<td><input type="text"></td>' +
                '<td><input type="text"></td>' +
                '<td></td>' +
                '<td></td></tr>>');
        } else {
            if ($('.proContain tr:last').children().eq(1).find('input').val() && $('.proContain tr:last').children().eq(2).find('input').val()) {
                var createArg = {
                    name: $.trim($('.proContain tr:last').children().eq(1).find('input').val()),
                    desc: $.trim($('.proContain tr:last').children().eq(2).find('input').val()),
                    icon: "http://www.baidu.com/xx.jpg"
                };
                
                // 添加数据请求
                netWork(domain + "/qa/types", "POST", createArg, function () {
                    alertView("添加问题数据成功！", SUCCESS_COLOR);
                    refView();
                });
            }
            $(this).find('span').text("添加");
            $('.proContain tr:last').remove();
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

// 编辑问题
function alterQuestions() {
    $('.proContain').delegate('a.edit-row', 'click', function () {
        var id = '';
        var title = '';
        var content = '';
        if ($(this).text() === "编辑") {
            $(this).text("确认");
            title = $(this).parents().parents().children().eq(1).text();
            content = $(this).parents().parents().children().eq(2).text();
            $(this).parents().parents().children().eq(1).html('<input type="text">').find('input').val(title);
            $(this).parents().parents().children().eq(2).html('<input type="text">').find('input').val(content);
            
            
        } else {
            $(this).text("编辑");
            id = $(this).parents().parents().children().eq(0).text();
            title = $(this).parents().parents().children().eq(1).find('input').val();
            content = $(this).parents().parents().children().eq(2).find('input').val();
            
            var createArg = {
                id: id,
                name: title,
                desc: content,
                icon: "http://www.baidu.com/xx.jpg"
            };
            // 修改数据请求
            netWork(domain + "/qa/types/" + createArg.id, "PUT", createArg, function () {
                alertView("修改问题数据成功！", SUCCESS_COLOR);
                refView();
            });
            
            $(this).parents().parents().children().eq(1).find('input').remove();
            $(this).parents().parents().children().eq(2).find('input').remove();
            $(this).parents().parents().children().eq(1).text(title);
            $(this).parents().parents().children().eq(2).text(content);
        }
    });
}

// 删除问题
function dropQuestions() {
    $('.proContain').delegate('a.delete-row', 'click', function () {
        if (confirm("确认删除该条数据吗？")) {
            var id = $(this).parents().parents().children().eq(0).find('input').val();
            var createArg = {
                id: id
            };
            // 删除数据请求
            netWork(domain + "/qa/types/" + createArg.id, "DELETE", createArg, function () {
                alertView("删除问题数据成功！", SUCCESS_COLOR);
                refView();
            });
        }
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
            alertView("失败！" +data.msg , ERROR_COLOR);
        }
    });
}

// 刷新
function refView() {
    setTimeout(function () {
        location.href = "/lianglixiaowu/category.html";
    },1500);
}
