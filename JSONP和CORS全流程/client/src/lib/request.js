//创建XMLHttpRequest对象的方法
function createAjax() {
	let httpRequest;
	if (typeof XMLHttpRequest != "undefined") {
		httpRequest = new XMLHttpRequest();
	}else if(typeof ActiveXObject != "undefined"){
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
function get(url,params) {
	return new Promise((resolve,reject) =>{
		try {
			let httpRequest = createAjax();
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
							let response = JSON.parse(httpRequest.responseText);
							resolve({err:{},data:response});
						}else{
							reject({err:{message:"请求出错"},data:{}})
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
				reject({err:{message:"没有AJAX环境"}})
			}
		} catch (error) {
			reject({})
		}
	});
}
/**
 * 自定义XMLHttpRequest的POST请求，返回一个Promise对象
 * @param 请求的地址 url 
 * @param 没用 params 
 * @param 没用 config 
 */
function post(url,params) {
	return new Promise((resolve,reject) =>{
		try {
			let httpRequest = createAjax();
			if (httpRequest) {
				httpRequest.onreadystatechange = function() {
					if (httpRequest.readyState === XMLHttpRequest.DONE) {
						if (httpRequest.status === 200) {
												//获取响应域
							console.log("========res headers=======",httpRequest.getAllResponseHeaders());
							console.log("========token=======",httpRequest.getResponseHeader("token"));
							let response = JSON.parse(httpRequest.responseText);
							resolve({data:response});
						}else{
							reject({err:{message:"请求出错"}})
						}
					} 
				}
				//让请求支持cookie信息的携带
				httpRequest.withCredentials = true;
				//post请求
				httpRequest.open('POST',url,true);
				// //添加自定义的请求头域
				// httpRequest.setRequestHeader('X-PINGOTHER', 'pingpong');
				// //设置body的类型
				// httpRequest.setRequestHeader('Content-Type', 'application/json');
				//post请求的请求体
				let body = JSON.stringify(params ? params : {});
				//发送请求
				httpRequest.send(body);
			} else {
				reject({err:{message:"没有AJAX环境"}})
			}
		} catch (error) {
			reject({})
		}
	});
}

export {
	get,post
}

