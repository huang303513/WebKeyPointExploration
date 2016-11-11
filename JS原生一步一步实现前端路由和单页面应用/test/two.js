/*
* @Author: huangchengdu
* @Date:   2016-11-11 14:58:20
* @Last Modified by:   huangchengdu
* @Last Modified time: 2016-11-11 16:04:34
*/

SPA_RESOLVE_INIT = function(transition) { 
	document.getElementById("content").innerHTML = '<p style="color:#F8C545;">当前异步渲染two'+ JSON.stringify(transition) +'</p>'
	console.log("首页回调" + JSON.stringify(transition))
}