/**
 * Created by gzd on 2017/3/19.
 * <tr>
 <td>
 xyd001
 </td>
 <td>
 咨询类
 </td>
 <td class="hidden-xs">
 这是一个咨询类的问题，包括。。。。
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
        data:10,
        beforeSend: function(request) {
            var token=document.cookie.split(";")[0].split("=")[1];
            request.setRequestHeader("x-auth-token", token);
        },
        success : function(data) {
            if (data.code == 1) {
                include("me-manager");
                var entities = data.data.entities;
                for(var i = 0; i < entities.length; i++){
                    var $tr = $("<tr><td>"+entities[i].id+"</td><td>"+entities[i].name+"</td>"
                    +"<td class='hidden-xs'>"+entities[i].desc+"</td><td ><a class'edit-row' href='#'>编辑</a></td>"+
                        "<td><a class='delete-row' href='#'>删除</a></td></tr>");
                    $("#question-type-list").append($tr);
                    $(".dataTables_empty").remove();
                }
                
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