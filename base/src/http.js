import axios from 'axios';
import { router } from './router';
import {Toast} from 'vant';

axios.defaults.timeout = 5000;
axios.defaults.baseURL ='';
let baseURL = "http://localhost:9999/sports"

//http request 拦截器
axios.interceptors.request.use(
	config => {
		const token = getCookie('auth_login_token'); // 注意使用的时候需要引入cookie方法，推荐js-cookie
		addCookie('auth_login_token',token,1)
		// config.data = JSON.stringify(config.data);
		// config.headers = {
		// 	'Content-Type':'application/x-www-form-urlencoded'
		// }
		if(token){
			config.params = {'token':token}
		}
		return config;
	},
	error => {
		return Promise.reject(err);
	}
);


//http response 拦截器
axios.interceptors.response.use(
	response => {
		if(response.data.code == "1"){
			router.push({
				name:"login",
				querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
			})
		} else if(response.data.code != "0"){
			Toast(response.data['msg']);
		}
		return response;
	},
	error => {
		return Promise.reject(error)
	}
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
	return new Promise((resolve,reject) => {
		axios.defaults.withCredentials = true;
		axios.get(baseURL + url,{params:params})
		.then(response => {
			resolve(response.data);
		})
		.catch(err => {
			reject(err)
		})
	})
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data = {}){
	return new Promise((resolve,reject) => {
		axios.defaults.withCredentials = true;
		axios.post(baseURL + url,data)
		.then(response => {
			resolve(response.data);
		},err => {
			reject(err)
		})
	})
 }

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
	return new Promise((resolve,reject) => {
		axios.defaults.withCredentials = true;
		axios.patch(baseURL + url,data)
		.then(response => {
			resolve(response.data);
		},err => {
			reject(err)
		})
	})
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
	return new Promise((resolve,reject) => {
		axios.defaults.withCredentials = true;
		axios.put(baseURL + url,data)
		.then(response => {
			resolve(response.data);
		},err => {
			reject(err)
		})
	})
}

export function setCookie(_name, _value, _date){
	// 设置的值，无论是什么类型的数据，都给他转为json对象
	var json = {
		"value":_value
	}	
	var str = JSON.stringify(json);	// 将json对象转为字符串  '{"value":_value}'
	str = encodeURIComponent(str);	// 编码，解决中文乱码
	// 设置cookie
	if( _date ){
		var dt = new Date();
		dt.setDate( dt.getDate()+_date );
		document.cookie = _name+"="+str+";expires="+dt.toGMTString()+";path=/";
	}else{
		document.cookie = _name+"="+str+";path=/";
	}
}

export function addCookie(_name, _value, _date){
	setCookie(_name, _value, _date);
}

// 根据cookie名称，删除该cookie
export function removeCookie(_name){
	setCookie(_name, "", -1);
}

// 根据cookie名称，获取该cookie的内容
export function getCookie(_name){
	var str = document.cookie;
	// str = "b={"value":_value}; bc=1; ac=1; dc=1; c=1";
	var arr = str.split("; ");
	// arr = ["b={"value":_value}", "bc=1", "ac=1", "dc=1", "c=1"];
	for(var i=0,l=arr.length; i<l; i++){
		var tmp = arr[i];	// "b={"value":_value}"
		var col = tmp.split("=");	// ["b", "{"value":_value}"]
		// if ( "b" == "b" )
		if( _name == col[0] ){//如果找到了cookie，则跳出函数，并将其结果返回	
			var decode = decodeURIComponent( col[1] );	//解码 "{"value":_value}"
			var obj = JSON.parse( decode );//将字符串转换为json对象
			return obj.value;
		}
	}
	return "";	// 如果没有这一行，如果找不到cookie，则返回undefined
}