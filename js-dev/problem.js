/**
 * Created by renminghe on 2017/4/1.
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
});

// 获取类别管理数据与分页数据
function getCategory(cb, index) {
    $('.conver').show();
    if (!index) index = 1;
    $.ajax({
        url: domain + "/qa/0/questions?page=" + index,
        type: "GET",
        success: function (data) {
            if (data.code === 1) {
                if (cb) cb(parseInt(data.data.total));
                $('.conver').hide();
                var html = template('proView', data.data);
                $('.proContain').html(html);
            } else {
                this.error();
            }
        },
        error: function () {
            $('.conver').hide();
            alertView("添加问题数据失败！", ERROR_COLOR);
        }
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
                '<td><input type="text"></td>' +
                '<td></td>' +
                '<td></td></tr>>');
        } else {
            if ($('.proContain tr:last').children().eq(1).find('input').val() && $('.proContain tr:last').children().eq(2).find('input').val() && $('.proContain tr:last').children().eq(3).find('input').val()) {
                var createArg = {
                    title: $.trim($('.proContain tr:last').children().eq(1).find('input').val()),
                    content: $.trim($('.proContain tr:last').children().eq(3).find('input').val()),
                    type: $.trim($('.proContain tr:last').children().eq(2).find('input').val())
                };

                // 添加数据请求
                $.ajax({
                    url: domain + "/qa/" + createArg['type'] + "/questions",
                    type: "POST",
                    data: createArg,
                    success: function (data) {
                        if (data.code === 1) {
                            $('.conver').hide();
                            alertView("添加问题数据成功！", SUCCESS_COLOR);
                            refView();
                        } else {
                            this.error();
                        }
                    },
                    error: function (data) {
                        $('.conver').hide();
                        alertView(data.msg, ERROR_COLOR);
                    }
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
        var title = '';
        var content = '';
        var typeId = '';
        var id = '';
        if ($(this).text() === "编辑") {
            $(this).text("确认");
            title = $(this).parents().parents().children().eq(1).text();
            content = $(this).parents().parents().children().eq(3).text();
            $(this).parents().parents().children().eq(1).html('<input type="text">').find('input').val(title);
            $(this).parents().parents().children().eq(3).html('<input type="text">').find('input').val(content);
        } else {
            $(this).text("编辑");

            title = $(this).parents().parents().children().eq(1).find('input').val();
            content = $(this).parents().parents().children().eq(3).find('input').val();
            typeId = $(this).parents().parents().children().eq(2).text();
            id = $(this).parents().parents().children().eq(0).text();
            console.log(typeId);
            console.log(id);
            if (title && id) {
                $.ajax({
                    url: domain + "/qa/" + typeId + "/questions/" + id,
                    type: "PUT",
                    data: {title: title, content: content},
                    success: function (data) {
                        if (data.code === 1) {
                            $('.conver').hide();
                            $(this).parents().parents().children().eq(1).find('input').remove();
                            $(this).parents().parents().children().eq(3).find('input').remove();
                            $(this).parents().parents().children().eq(1).text(title);
                            $(this).parents().parents().children().eq(3).text(content);
                            alertView(data.msg, SUCCESS_COLOR);
                            refView();
                        } else {
                            this.error();
                        }
                    },
                    error: function (data) {
                        $('.conver').hide();
                        alertView(data.msg, ERROR_COLOR);
                    }
                });

            } else {
                alertView("请填写完整信息", ERROR_COLOR);
            }

        }
    });
}

// 刷新
function refView() {
    setTimeout(function () {
        location.href = "/lianglixiaowu/problem.html";
    }, 1500);
}