<template>
	<div class="hello">
		<ul>
			<li>
				<a @click="getRequest">
	              get请求
	        </a>
			</li>
		</ul>
	</div>
</template>

<script>
import {get} from '../XMLHttpRequest/request.js';
	export default {
		name: 'HelloWorld',
		data() {
			return {
				
			}
		},
		methods:{
			async getRequest(){
				console.log("=========1111======");
				let {err,data} = await get('http://127.0.0.1:5389/').catch((err) =>{
					console.log("出错了",err);
				});
				console.log(err,data);
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
