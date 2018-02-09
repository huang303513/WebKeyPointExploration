<template>
	<div class="hello">
		<ul>
			<li>
				<a @click="getRequest">
		              get请求
		        </a>
			</li>
			<li>
				<a @click="postRequest">
		              post请求
		        </a>
			</li>
		</ul>
	</div>
</template>

<script>
	import {
		get,
		post
	} from '../XMLHttpRequest/request.js';
	export default {
		name: 'HelloWorld',
		data() {
			return {
	
			}
		},
		methods: {
			async getRequest() {
				let {
					err,
					data
				} = await get('http://127.0.0.1:5389', {
					"xx": 1,
					"yy": 2
				}).catch((err) => {
					console.log("出错了", err);
				});
				console.log(err, data);
			},
			async postRequest() {
				let {
					err,
					data
				} = await post('http://127.0.0.1:5389', {
					"xx": 1,
					"yy": 2
				}).catch((err) => {
					console.log("出错了", err);
				});
				console.log(err, data);
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
</style>
