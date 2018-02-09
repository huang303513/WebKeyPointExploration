//创建XMLHttpRequest对象的方法
function createAjax() {
	let httpRequest;
	if (window.XMLHTTPRequest) {
		httpRequest = new XMLHttpRequest();
	}else if(window.ActiveXObject){
		httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
	}
	return httpRequest;
}
/**
 * 创建get请求。返回一个promise对象
 * @param 请求地址 url 
 * @param 请求参数，可以使字符串或者对象 params 
 * @param 配置，这里暂时没有实现 config 
 */
function get(url,params,config) {
	return new Promise((resolve,reject) =>{
		try {
			let httpRequest = new XMLHttpRequest();
			if (httpRequest) {
				let query;
				//拼接get请求的query部分
				if (params instanceof String) {
					query = "?" + params;
				} else if(params instanceof Object){
					query = "?";
					for (let [key,value] of Object.entries(params)) {
						query = query + key + "=" + encodeURIComponent(value) + "&";
					}
					query= query.substring(0,query.length - 1);
				}
				//处理网络返回
				httpRequest.onreadystatechange = function() {
					//网络请求完成
					if (httpRequest.readyState === XMLHttpRequest.DONE) {
						//请求成功
						if (httpRequest.status === 200) {
							// console.log(httpRequest.responseText);
							let response = JSON.parse(httpRequest.responseText);
							resolve({err:null,data:response});
						}else{
							reject({err:{message:"请求出错"},data:null})
						}
					} 
				}
				//把query添加到url后面
				if (query) {
					url = url + query;
				} 
				//发送请求
				httpRequest.open('GET',url,true);
				httpRequest.send();
			} else {
				reject({err:{message:"没有AJAX环境"},data:null})
			}
		} catch (error) {
			reject({err:error,data:null})
		}
	});
}
/**
 * 自定义XMLHttpRequest的POST请求，返回一个Promise对象
 * @param 请求的地址 url 
 * @param 没用 params 
 * @param 没用 config 
 */
function post(url,params,config) {
	return new Promise((resolve,reject) =>{
		try {
			let httpRequest = new XMLHttpRequest();
			//让请求支持cookie信息的携带
			httpRequest.withCredentials = true;
			if (httpRequest) {
				httpRequest.onreadystatechange = function() {
					//获取响应域
					console.log("========cookie=======",httpRequest.getAllResponseHeaders(),httpRequest.getResponseHeader("token"));
					if (httpRequest.readyState === XMLHttpRequest.DONE) {
						if (httpRequest.status === 200) {
							console.log(httpRequest.responseText);
							let response = JSON.parse(httpRequest.responseText);
							resolve({err:null,data:response});
						}else{
							reject({err:{message:"请求出错"},data:null})
						}
					} 
				}
				//post请求
				httpRequest.open('POST',url,true);
				//添加自定义的请求头域
				httpRequest.setRequestHeader('X-PINGOTHER', 'pingpong');
				//设置body的类型为xml
				httpRequest.setRequestHeader('Content-Type', 'application/xml');
				//post请求的请求体
				let body = '<?xml version="1.0"?><person><name>Arun</name></person>';
				//发送请求
				httpRequest.send(body);
			} else {
				reject({err:{message:"没有AJAX环境"},data:null})
			}
		} catch (error) {
			reject({err:error,data:null})
		}
	});
}

export {
	get,post
}

