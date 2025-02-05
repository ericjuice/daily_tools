// ==UserScript==
// @name         ts converter
// @namespace    http://tampermonkey.net/
// @version      2025-02-05
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jd.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Your code here...
    // 创建悬浮卡片
    const createCard = (message, x, y) => {
        const card = document.createElement('div');
        card.style.padding = '10px';
        card.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        card.style.color = 'white';
        card.style.borderRadius = '5px';
        card.style.zIndex = '9999';
        card.style.transition = 'opacity 0.5s';
        card.innerText = message;

        document.getElementById('convert-timestamp').appendChild(card);

    };

    // 处理右键菜单
    document.addEventListener('contextmenu', (event) => {
        const selectedText = window.getSelection().toString().trim();
        if (selectedText && !isNaN(selectedText)) {
            event.preventDefault();

            // 创建自定义右键菜单
            const menu = document.createElement('div');
            menu.style.position = 'absolute';
            menu.style.left = `${event.pageX}px`;
            menu.style.top = `${event.pageY}px`;
            menu.style.backgroundColor = 'rgba(255, 255, 255, 0)';
            menu.style.zIndex = '9999';
            menu.innerHTML = `
            <div id="convert-timestamp" style="padding: 10px; background-color: rgba(255, 255, 255, 0.9); border: 1px solid #ccc; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);">
                <button id="convert-timestamp-close" style="cursor: pointer; padding: 5px 10px; background-color: #ff4d4d; color: white; border: none; border-radius: 5px; margin-bottom: 10px;">
                    点击关闭
                </button>
                <button id="convert-timestamp-text" style="cursor: pointer; padding: 5px 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px;">
                    点击转换时间戳
                </button>
            </div>
            `;

            document.body.appendChild(menu);

            // 点击转换
            document.getElementById('convert-timestamp-text').onclick = () => {
                const timestamp = parseInt(selectedText, 10);
                let date;

                // 根据数字长度判断单位
                if (selectedText.length === 10) {// 秒
                    date = new Date(timestamp * 1000);
                } else if (selectedText.length === 13) {// 毫秒
                    date = new Date(timestamp);
                } else {
                    createCard('无效的时间戳', event.pageX, event.pageY);
                    document.body.removeChild(menu);
                    return;
                }

                const formattedDate = date.toLocaleString();
                createCard(`结果: ${formattedDate}`, event.pageX, event.pageY);
            };

            menu.querySelector('#convert-timestamp-close').onclick = () => {
                document.body.removeChild(menu);
            }

        }
    });
})();
