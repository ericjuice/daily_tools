// ==UserScript==
// @name         白嫖怪终结者：B站自动点赞
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  拯救up主：自动点赞脚本!
// @author       Ericjuice
// @match        https://www.bilibili.com/video/*
// @icon         https://www.bilibili.com/favicon.ico
// @grant        none
// @require  https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener("load", function(){;});
    //监听网页元素加载完毕时执行
    setTimeout(function(){

        //定时执行器，5秒后执行代码
        var toast = {
            init: function () {
                let style = document.createElement('style');
                // 把样式写进去
                style.innerText = `
            #liketoast{
                position: absolute;
                display: block;
                left: 50%;
                top: 50%;
                z-index: 9999;
                padding: 16px 8px;
                width: 120px;
                height: 25px;
                text-align: center;
                border-radius: 20px;
                color: rgb(255,255,255);
                background-color: rgba(36, 38, 190, 0.678);
                font-size: larger;
            }`
            var toastNode = document.createElement('div');
            toastNode.innerHTML = '<span class="text">默认提示</span>';//设置HTML模板
            toastNode.id = 'liketoast';//设置id，一个页面有且仅有一个toast
            document.head.appendChild(style);
            document.body.appendChild(toastNode);//添加到body下面
        },
        show: function (text) {
            var toastNode = document.getElementById('liketoast');//采集
            toastNode.querySelector('.text').innerHTML = text;//找到toast设置显示文本
            toastNode.style.display = 'block';//设置toast为显示状态
        },
        rmv: function () {
            var toastNode = document.getElementById('liketoast');
            if (toastNode) {
                toastNode.style.display = 'none';//移除toastDOM
                document.body.removeChild(toastNode);
            }
        }
    }

    toast.init();
    var btn=$("span.like.on");
    if ( btn.length<1)//没有点赞过
    {
        // $(".like").click();
        $("span.like").click();
        toast.show("点赞成功");
        setTimeout(toast.rmv, 1000);
    }
    else//点过了
    {
        toast.show("您已点赞");
        setTimeout(toast.rmv, 1000);
    }
}, 5000);
})();