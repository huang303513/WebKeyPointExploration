
function createAjax() {
	let httpRequest;
	if (window.XMLHTTPRequest) {
		httpRequest = new XMLHttpRequest();
	}else if(window.ActiveXObject){
		httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
	}
	return httpRequest;
}

function get(url,params,config) {
	return new Promise((resolve,reject) =>{
		try {
			let httpRequest = new XMLHttpRequest();
			if (httpRequest) {
				let query;
				if (params instanceof String) {
					query = "?" + params;
				} else if(params instanceof Object){
					query = "?";
					for (let [key,value] of Object.entries(params)) {
						query = query + key + "=" + encodeURIComponent(value) + "&";
					}
					query= query.substring(0,query.length - 1);
				}
				httpRequest.onreadystatechange = function() {
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
				if (query) {
					url = url + query;
				} 
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

export {
	get
}

