/**
 * Created by gzd on 2017/3/18.
 * <tr>
 <td>
 xyd001
 </td>
 <td>
 咨询类问题1
 </td>
 <td>
 咨询类
 </td>
 <td class="hidden-xs">
 这是一个XX类的问题，包括。。。。
 </td>
 <td >
 <a class="edit-row" href="#">编辑</a>
 </td>
 <td >
 <a class="delete-row" href="#">删除</a>
 </td>
 </tr>
 */
(function () {
    $.ajax({
        type : "get",
        url : domain+"/qa/types",
        //async: false,
        beforeSend: function(request) {
            var token=document.cookie.split(";")[0].split("=")[1];
            request.setRequestHeader("x-auth-token", token);
        },
        success : function(data) {
            if (data.code == 1) {
                include("me-manager");

                return;
            }
            if (data.code == 10){
                window.location.href="login.html";
                return;
            }
            alert(data.msg)
        }
    });
})();