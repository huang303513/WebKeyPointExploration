<template>
	<div class="hello">
		<div>具体可以通过抓包软件或者google浏览器控制台查看整个流程</div>
		<ul>
			<li>
				<a @click="getRequest">
		              get的CORS请求测试
		        </a>
			</li>
			<li>
				<a @click="postRequest">
		              post的CORS请求测试
		        </a>
			</li>
		</ul>
        <p class="divStyle">服务器接收到get请求返回：{{serverDataget}}</p>
        <p class="divStyle">服务器接收到post请求返回：{{serverDatapost}}</p>
	</div>
</template>

<script>
	import {
		get,
		post
	} from '../lib/request.js';
	export default {
		name: 'cros',
		data() {
			return {
                serverDataget: '',
                serverDatapost: '',
			}
		},
		methods: {
			async getRequest() {
				let {
					err = {},
					data = {}
				} = await get('http://10.105.17.43/users', {
					"xx": 1,
                    "yy": 2,
                    "time": new Date().getTime(),
				}).catch(() => {
					this.serverDataget = "出错了";
				});
				this.serverDataget = JSON.stringify(err) + '   '+ JSON.stringify(data);
			},
			async postRequest() {
				let {
					err = {},
					data = {}
				} = await post('http://10.105.17.43/users', {
                    "name": 'huangchengdu',
                    "time": new Date().getTime(),
				}).catch(() => {
					this.serverDatapost = "出错了";
				});
				this.serverDatapost = JSON.stringify(err) + '   '+ JSON.stringify(data);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
	}
	
	li {
		display: inline-block;
		margin: 0 10px;
	}
	
	a {
		color: #42b983;
    }

    .divStyle {
		margin-top: 20px;
		margin-left: 20px;
		font-size: 1.5rem;
		display: block;
		width: 80%;
		border: 1px solid red;
	}
</style>
