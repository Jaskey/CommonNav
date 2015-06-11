/**
 * 往body插入一个导航栏,position=fixed
 * 导航的目录项由html中拥有nav属性的结点决定。
 *
 * 其中nav属性决定导航项的显示, id决定导航的位置
 */
function navbox() {

    /**
     *     返回页面中所有可以导航目录数组
     *     name来源于 nav属性， id来自于结点id
     *     格式诸如：
     *     var aDirectory = [
             {name: "概览", id: "overview"},
             {name: "模块1", id: "module1"},
             {name: "模块2", id: "module2"},
             {name: "模块3", id: "module3"},
             {name: "模块4", id: "moudle4"}
           ];
     */

    var _buildDir=function(){
        var aDirectory=[];
        $('[nav]').each(function(i,e){
            var dir={
                name:$(e).attr('nav'),
                id: $(e).attr('id')
            };
            aDirectory.push(dir);
        });

        return aDirectory;
    }

    /**
     * 返回到指定高度
     * @param nTop
     * @private
     */
    var _fBackTop = function (nTop) {
        $("html,body").animate({scrollTop: nTop + "px"}, 200);
    };

    /**
     * 从aDirectory对应的模块中找出当前应该染色的的模块ID
     * @returns {*|.data.id|id|jQuery.fn.linkbutton.defaults.id|swfZoomDetection._attributes.id|.submitdata.id}
     * @private
     */
    var _findCurModuleId = function (aDirectory) {
        var nScrollTop = parseFloat($(window).scrollTop());
        var nWinHeight = parseFloat($(window).height());
        var nCurId = aDirectory[aDirectory.length - 1].id;
        $.each(aDirectory, function (i, oDirectory) {
            if ($("#" + oDirectory.id).length > 0) {
                var nModuleTop = parseFloat($("#" + oDirectory.id).offset().top);
                if (nModuleTop > nScrollTop && nModuleTop < (nScrollTop + nWinHeight) && nModuleTop < parseFloat($("#" + nCurId).offset().top)) {
                    nCurId = oDirectory.id;
                }
            }
        });
        return nCurId;
    };

    /**
     * highlight导航目录中对应的项
     */

    var _highlightCurrent=function(aDirectory){
        var nCurId = _findCurModuleId(aDirectory);
        $("#moduleNav").find("ul.directory li a").removeClass("current");
        $("#moduleNav").find("ul.directory li a[data-target=" + nCurId + "]").addClass("current");
    }

    /*END 闭包私有方法*/


    var aDirectory = _buildDir();//构建目录树的对象

    /* START: 渲染HTML */
    var html = [];
    html.push("<div id='moduleNav' class='module-nav'>");
    html.push("    <ul class='directory'>");
    $.each(aDirectory, function (i, oDirectory) {
        html.push("        <li><a data-target='" + oDirectory.id + "'>" + oDirectory.name + "</a></li>");
    });
    html.push("    </ul>");
    html.push("    <div class='backtop'><span>返回顶部</span></div>");
    html.push("</div>");
    $("body").append(html.join(''));
    /* END: 渲染HTML */

    _highlightCurrent(aDirectory);//初始化染色


    /* START: 绑定事件 */
    // 绑定导航目录项点击事件
    $("#moduleNav ul.directory li a").off('click').on('click', function () {
        var id = $(this).attr("data-target");
        if ($("#" + id).length > 0) {
            var nTargetTop = $("#" + id).offset().top - 20;
            _fBackTop(nTargetTop);
        }
    });


    // 绑定返回顶部事件
    $("#moduleNav").find(".backtop").on('click', function () {
        _fBackTop(0);
    });


    // 当页面滚动时，将导航控件移动到适当位置
    $(window).scroll(function () {
        // 如果当前视窗滚动到某个模块，highlight导航目录中对应的项
        _highlightCurrent(aDirectory);
    });
    /* END: 绑定事件 */
}