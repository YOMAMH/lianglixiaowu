/**
 * Created by renminghe on 2017/6/24.
 */
$(function () {

    // 获取产品系列管理数据
    sharedBaseNetTool.getDate("/p_series?index=", 1, "productTypeView", function (data) {
        sharedBaseNetTool.pagination(data.data.length, "/p_series?index=", "productTypeView", "");
    });

    // 添加产品
    addProductionType();

    // 删除产品
    dropProductionType();

    // 修改产品
    updateProductionType();
});

// 添加产品
function addProductionType() {

    // 确认
    $(".modal .btnContext .btn.btn-success").on("click", function () {
        var name = $.trim($(".modal .modal-content input:eq(0)").val());
        var desc = $.trim($(".modal .modal-content input:eq(1)").val());

        if (name && desc) {
            $(".modal .btnContext .btn.btn-success").attr("disabled", "disabled");
            var queryBody = {
                name: name,
                desc: desc
            };
            sharedBaseNetTool.createDate("/p_series", sharedBaseNetTool.methodEnum.PUT, queryBody,
                "series.html", function () {
                $(".modal.fade.bs-example-modal-lg.in").click();
            });
        } else {
            sharedBaseNetTool.alertView("请填写完成内容", sharedBaseNetTool.ERROR_COLOR);
        }

    });

    // 取消
    $(".modal .btnContext .btn.btn-warning").on("click", function () {
        $(".modal.fade.bs-example-modal-lg.in").click();
    });
}

// 删除产品
function dropProductionType() {
    $(".contentView").delegate('button.btn.btn-danger.deleteBtn', 'click', function () {
        var productSeriesId = $(this).parent().parent().children().eq(0).text();
        sharedBaseNetTool.dropData("/p_series?productSeriesId=" + productSeriesId, sharedBaseNetTool.methodEnum.DELETE, '', "series.html");
    });
}

// 变更产品
function updateProductionType() {
    var productSeriesId = "";
    var name = "";
    var desc = "";
    $(".contentView").delegate('button.btn.btn-default.changeBtn', 'click', function () {
        productSeriesId = $(this).parent().parent().children().eq(0).text();
        name = $(this).parent().parent().children().eq(1).text();
        desc = $(this).parent().parent().children().eq(2).text();
        $(".modal-content div:eq(0) input").val(name);
        $(".modal-content div:eq(1) input").val(desc);
    });

    // 确定
    $(".modal .btnContext .btn.btn-success").on("click", function () {
        name = $(this).parent().parent().children().eq(1).text();
        desc = $(this).parent().parent().children().eq(2).text();
        var queryBody = {
            productSeriesId: productSeriesId,
            name: name,
            desc: desc
        };
        sharedBaseNetTool.update("/p_series", sharedBaseNetTool.methodEnum.POST, queryBody, "series.html");
    });
}