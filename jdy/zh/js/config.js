/*
 * @Author: yst
 * @Date:2018-06-23 09:45:48
 * @description 设置全局变量
 */
//测试环境配置
var config={
	liveID:"",
	liveUrl:"",
	isLive:true,
	payUrl:"http://mwh5test.facebac.com",
	curUrl: "http://vboforetest.facebac.com/H520/",
	// lhServerUrl:"http://mwlivetest.facebac.com/21",
	lhServerUrl:"http://192.169.2.63:5012/21",
	lhServerUrl2:"http://mwlivetest.facebac.com",
	myServerUrl:'http://vboforetest.facebac.com',
	disServerUrlNew:"http://mwlivetest.facebac.com:9882",
	/*微信授权*/
	wxImpower:"http://vboforetest.facebac.com/H520/",
	weibolink:'https://api.weibo.com/oauth2/authorize?client_id=3772866193&redirect_uri=http://mwlivetest.facebac.com/20/api/mwlive/user/user_wb_third_login.do&state=wap',
	qqlink:'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101445413&redirect_uri=http://mwlivetest.facebac.com/20/api/mwlive/user/user_qq_third_login.do&state=wap',
	wxShare:'http://mwh5test.facebac.com/mwh5/api/mwh5/feature/getWechat.do',	
	vboServer:'http://vboppitest.facebac.com/api/',
	vboApi:'http://vboforetest.facebac.com/api/',
	mwlivedev:'http://mwlivetest.facebac.com/21/api/',
	serverUrlNew:'http://vboforetest.facebac.com',
	authorizedAppid:'wxafef3c2c04a55c2f',//v播appid
	version:'2.1.0',
	// payMoney: 0.01
};


// 开发环境地址
// var config={
// 	liveID:"",
// 	liveUrl:"",
// 	isLive:true,
// 	payUrl:"http://mwh5dev.mvaas.cn",
// 	curUrl: "http://vboforedev.mvaas.cn/H520/",
// 	lhServerUrl:"http://mwlivedev.mvaas.cn/21",
// 	lhServerUrl2:"http://mwlivedev.mvaas.cn",
// 	myServerUrl:'http://vboforedev.mvaas.cn',
// 	disServerUrlNew:"http://mwlivetest.facebac.com:9882",
// 	/*微信授权*/
// 	wxImpower:"http://vboforedev.mvaas.cn/H520/",
// 	weibolink:'https://api.weibo.com/oauth2/authorize?client_id=3772866193&redirect_uri=http%3a%2f%2fmwlivedev.mvaas.cn%2f20%2fapi%2fmwlive%2fuser%2fuser_wb_third_login.do&state=wap',
// 	qqlink:'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101445413&redirect_uri=http%3a%2f%2fmwlivedev.mvaas.cn%2f20%2fapi%2fmwlive%2fuser%2fuser_qq_third_login.do&state=wap',
// 	wxShare:'http://mwh5test.facebac.com/mwh5/api/mwh5/feature/getWechat.do',	
// 	payMoney: 0.01,
// 	vboServer:'http://vboppidev.mvaas.cn/api/',
// 	vboApi:'http://vboforedev.mvaas.cn/api/',
// 	mwlivedev:'http://mwlivedev.mvaas.cn/21/api/',
// 	serverUrlNew:'http://vboforedev.mvaas.cn',
// 	authorizedAppid:'wxafef3c2c04a55c2f',//v播appid
// 	version:'2.1.0'
// };


/*正式环境地址*/
// var config={
// 	liveID:"",
// 	liveUrl:"",
// 	isLive:true,
// 	payUrl:"http://mwh5.mvaas.cn",
// 	curUrl: "http://vbofore.yeepo.cn/H520/",
// 	lhServerUrl:"http://mwlive.mvaas.cn/21",
// 	lhServerUrl2:"http://mwlive.mvaas.cn",  
// 	myServerUrl:'http://vbofore.yeepo.cn',
// 	disServerUrlNew:"http://mwlb.mvaas.cn:9161",
// 	/*微信授权*/
// 	wxImpower:"http://vbofore.yeepo.cn/H520/",
// 	weibolink:'https://api.weibo.com/oauth2/authorize?client_id=222242021&redirect_uri=http://mwlive.mvaas.cn/20/api/mwlive/user/user_wb_third_login.do&state=wap',
// 	qqlink:'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101445413&redirect_uri=http://mwlive.mvaas.cn/20/api/mwlive/user/user_qq_third_login.do&state=wap',
// 	wxShare:'http://mwh5.facebac.com/mwh5/api/mwh5/feature/getWechat.do',
// 	vboServer:'http://vboppi.yeepo.cn/api/',
// 	vboApi:'http://vbofore.yeepo.cn/api/',
// 	mwlivedev:'http://mwlive.mvaas.cn/21/api/',
// 	serverUrlNew:'http://vbofore.yeepo.cn',
// 	authorizedAppid:'wx7ea3b81267df32a4',//v播appid
// 	version:'2.1.0'
// };

