<template>
<div class="login_bg">
    <bg-head></bg-head>
    <div class="login_middle">
        <el-row type="flex" class="row-bg" justify="center">
            <h3>
                <login-head></login-head>
            </h3>
        </el-row>
        <div class="login_mode">
            <el-form :model="formData" :rules="rules" ref="formData" class="demo-ruleForm">
            <div class="choice_login">
                <el-tabs v-model="activeName" @tab-click="handleClick">                    
                    <el-tab-pane label="手机登录" name="login_second">
                        <el-row type="flex" class="row-bg" justify="center">
                            <el-col>
                                <div class="normal_in">
                                    <el-form-item prop="Phone2">
                                        <!-- <i class="icon iconfont"><img src="http://montnets.facebac.com/montnet20170707/H5/videoplayer/bk11/static/img/administer.png" alt=""></i> -->
                                        <el-input  :maxlength="13"  type="tel" v-model="formData.Phone2" @keyup.enter.native="submitForm('formData')" auto-complete="off" placeholder="请输入手机号"></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg" justify="center">
                            <el-col>
                                <div class="normal_in">
                                    <el-form-item prop="imgCode" class="tx_box">
                                        <!-- <i class="icon iconfont"><img src="http://montnets.facebac.com/montnet20170707/H5/videoplayer/bk11/static/img/code.png" alt=""></i> -->
                                        <el-input  :maxlength="4"  type="tel" v-model="formData.imgCode" @keyup.enter.native="submitForm('formData')" auto-complete="off" placeholder="请输入图形验证码"></el-input>
                                        <div class="changeyzm" id="idcode"><img @click="_getImgCode" :src="regData.CodeImgUrl"></div>
                                    </el-form-item>
                                    <!-- <i class="icon iconfont icon-mima"></i>
                                    <input type="password" v-model="password" placeholder="图形验证码">
                                    <span>{{regData.passwordVal}}</span>
                                    <div class="changeyzm" id="idcode"></div> -->
                                </div>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg" justify="center">
                            <el-col>
                                <div class="normal_in">
                                    <el-form-item prop="code" class="yzm_box">
                                        <!-- <i class="icon iconfont"><img src="http://montnets.facebac.com/montnet20170707/H5/videoplayer/bk11/static/img/yanzhengma.png" alt=""></i> -->
                                        <el-input :maxlength="5" type="tel" v-model="formData.code" @keyup.enter.native="submitForm('formData')" auto-complete="off" placeholder="请输入手机验证码"></el-input>
                                        <p class="get_ma form-code">
                                            <span class="cur-p" v-show="regData.show"   @click="getCode()">获取验证码</span>
                                            <span class="col_9B" v-show="!regData.show">{{regData.count + '秒后重新获取'}}</span>
                                        </p>
                                    </el-form-item>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg fj_tip" justify="center">
                            <el-col class="inp_320">
                                <div class="clear">
                                    <div class="cur-p  col_9B">
                                        <router-link tag="div" class="cur-p  fl" to="/register">
                                            <span class="register-link col_9B to_re">注册帐号</span>
                                        </router-link>
                                        <router-link tag="div" class="cur-p  fr" to="/modifyPassword">
                                            <span class="register-link col_9B to_find">忘记密码?</span>
                                        </router-link>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="帐号登录" name="login_first">
                        <el-row type="flex" class="row-bg" justify="center">
                            <el-col class="inp_320">
                                <div class="normal_in">
                                    <el-form-item prop="Phone">
                                        <!-- <i class="icon iconfont"><img src="http://montnets.facebac.com/montnet20170707/H5/videoplayer/bk11/static/img/administer.png" alt=""></i> -->
                                        <el-input  :maxlength="11"  type="tel" v-model="formData.Phone" @keyup.enter.native="submitForm('formData')" auto-complete="off" placeholder="请输入手机号"></el-input>
                                    </el-form-item>

                                    <!-- <i class="icon iconfont icon-yonghu"></i>
                                    <input type="tel" v-model="Phone" placeholder="手机">
                                    <span>{{regData.PhoneVal}}</span> -->
                                </div>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg" justify="center">
                            <el-col class="inp_320">
                                <div class="normal_in">
                                    <el-form-item prop="password">
                                        <!-- <i class="icon iconfont"><img src="http://montnets.facebac.com/montnet20170707/H5/videoplayer/bk11/static/img/code.png" alt=""></i> -->
                                        <!-- <input type="password" name="txtPassword" style="display:none"> -->
                                        <input  type="password" style="display:none;width:0;height:0;">
                                        <el-input :maxlength="16" type="password" name="txtPassword" v-model="formData.password" @keyup.enter.native="submitForm('formData')" auto-complete="off" placeholder="请输入密码" autocomplete="new-password"></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                        </el-row>
                        
                        <el-row type="flex" class="row-bg" justify="center">
                            <el-col class="inp_320">
                                <div class="clear">
                                    <div  class="cur-p fl" >
                                        <!-- <input type="checkbox" v-model="formData.automatic"> -->
                                        <el-checkbox  v-model="formData.automatic"></el-checkbox>
                                        <span class="register-link col_9B" v-bind:class="{check_txt_active: formData.automatic }" >自动登录</span>
                                    </div>
                                    <div class="cur-p fr col_9B">
                                        <router-link tag="div" class="cur-p  fl" to="/register">
                                            <span class="register-link col_9B to_re">注册帐号</span>
                                        </router-link>
                                        <span class="line_r"></span>
                                        <router-link tag="div" class="cur-p  fr" to="/modifyPassword">
                                            <span class="register-link col_9B to_find">忘记密码?</span>
                                        </router-link>
                                    </div>
                                </div>

                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
                <div id="login_btn" class="login_btn" @click="submitForm('formData')">登录</div>

                <!-- <el-row class="mt20 mb20 share_model">
                    <el-col :span="8" class="te-c">
                        <div class="d-ib cur-p">
                            <span class="icon iconfont icon-qq1" :class="{ 'icon-qq33' : icon_qq}" @mouseleave="toggleClassQQ" @mouseenter="toggleClassQQ" @click="qqLogin"></span>
                            
                        </div>
                    </el-col>
                    <el-col :span="8" class="te-c">
                        <div class="d-ib cur-p"> -->


                             <!-- <span class="icon iconfont"  :class="{icon_weixin:'icon-weixin'}" @mousemove="shareHoverMove" @mouseenter="shareHoverEnter"></span> -->
                             <!-- <span class="icon iconfont"  :class="{ 'icon-weixin' : icon_weixin, 'icon-weixin3': !icon_weixin}" @mouseleave="toggleClass" @mouseenter="toggleClass"></span> -->
                            
                            <!-- <span class="icon iconfont icon-weixin-copy"  :class="{ 'icon-weixin33' : icon_weixin}" @mouseleave="toggleClassWX" @mouseenter="toggleClassWX" @click="weixinLogin"></span>
                        </div>
                    </el-col>
                    <el-col :span="8" class="te-c">
                        <div class="d-ib cur-p">
                            <span class="icon iconfont icon-weibo2" :class="{ 'icon-weibo33' : icon_weibo}" @mouseleave="toggleClassWB" @mouseenter="toggleClassWB" @click="weiboLogin"></span>
                        </div>
                    </el-col> -->

                    <!-- https://open.weixin.qq.com/connect/qrconnect?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
                    
                    https://open.weixin.qq.com/connect/qrconnect?appid=wx7bfe4c96b4b02fe9&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect

                    https://open.weixin.qq.com/connect/qrconnect?appid=wx8628eaef85e3a193&redirect_uri=http%3A%2F%2Fwww.douyu.com%2Fmember%2Foauth%2Fsignin%2Fweixin&state=b640372d9ba45de682bccf40dee1164d&scope=snsapi_login&response_type=code&approval_prompt=force -->
                
                <!-- </el-row>      -->
            </div>
            
            </el-form>
        </div>
    </div>
    <!-- <div class="fixed_footer"> -->
        <m-footer></m-footer>
    <!-- </div> -->
</div>
</template>

<script>
    import LoginHead from 'components/header/loginHead'
    import BgHead from 'components/header/bgHead'
    import {ERR_OK,DATA_URL,setCookie,getCookie,removeCookie,setLStorage,getLStorage,delLStorage,DEFAULT_IMGICON,setSNumber,SETUSERICON,LOGINURI,setCookies,changeDateType} from 'api/config'
    import {getNewTime,axiosData} from 'api/http'
    import md5 from 'js-md5'
    import axios from 'axios'
    import mFooter from 'components/header/footer'
    const TIME_COUNT = 60

    export default{
        data(){
            let PhoneExp = /^[18][34567890]\d{9}$/
            var checkAge = (rule, value, callback) => {
                if (this.activeName == 'login_first' && !value) {
                    return callback(new Error('手机号码不能为空'));
                }
                setTimeout(() => {
                    if (this.activeName == 'login_first' && !PhoneExp.test(value)) {
                        callback(new Error('请输入正确的手机号码'))
                    } else {
                        // console.log(this.isTrue.phone1)
                        this._isLogin()
                        setTimeout(()=>{
                            if(this.isTrue.phone1){
                                callback(new Error('该手机号不存在，请先注册'))
                            }else{
                                callback()
                            }
                        },500)
                    }
                }, 1000)
            };

            var validatePass = (rule, value, callback) => {
                let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
                // let regExp =  /^([0-9]|[a-zA-Z]){6,16}$/

                // let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/ || /^[8][0][0][8][0][0]\d$/
                if (this.activeName == 'login_first' && !value) {
                    callback(new Error('请输入密码'))
                } else {
                    // if (this.activeName == 'login_first' && !regExp.test(value) || value != 800800) {
                    if (this.activeName == 'login_first' && !regExp.test(value)) {
                        if(this.activeName == 'login_first' && value == 800800){
                            callback()
                        }else{
                            callback(new Error('字母+数字组成，长度为6~16位'))
                        }
                    }
                    callback()
                }
            }
            var checkAge2 = (rule, value, callback) => {
                if (this.activeName == 'login_second' && !value) {
                    return callback(new Error('手机号码不能为空'))
                }
                // setTimeout(() => {
                    if (this.activeName == 'login_second' && !PhoneExp.test(value)) {
                        callback(new Error('请输入正确的手机号码'))
                    } else {
                        this._isLogin()
                        setTimeout(()=>{
                            if(this.isTrue.phone1){
                                callback(new Error('手机不存在'))
                            }else{
                                callback()
                            }
                        },500)
                    }
                // }, 1000);
            };
            var validateCode = (rule, value, callback) => {
                let codeNumber = /^\d{5,6}$/ || 65656
                if (this.activeName == 'login_second' && value === '') {
                    callback(new Error('请输入验证码'))
                } else {
                    if (this.activeName == 'login_second' && !codeNumber.test(value)) {
                        callback(new Error('验证码错误'))
                    }
                    callback()
                }
            }
            var validateImgCode = (rule, value, callback) => {
                if (this.activeName == 'login_second' && value === '') {
                    callback(new Error('请输入图形验证码'))
                } else {
                    if (this.activeName == 'login_second' && value.length !== 4) {
                        callback(new Error('图形验证码错误'))
                    }
                    callback()
                }
            }
            return {
                formData:{
                    Phone:'',
                    automatic:false,
                    Phone2:'',
                    password:'',
                    code:'',
                    imgCode:''
                },
                rules: {
                    Phone: [
                        { validator: checkAge, trigger: 'blur' }
                    ],
                    Phone2: [
                        { validator: checkAge2, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    code:[
                        { validator: validateCode, trigger: 'blur' }
                    ],
                    imgCode:[
                        { validator: validateImgCode, trigger: 'blur' }
                    ]
                },
                qualify:'',
                activeName: 'login_second',
                regData:{
                    show : true,   //默认是停止的，但界面加载之后会变成false
                    count:'',
                    CodeImgUrl:'http://mwlivetest.facebac.com/api/mwlive/user/user_code_vue.do'
                },
                icon_weixin:false,
                icon_qq:false,
                icon_weibo:false,
                setCodeVal:'',
                isTrue:{
                    phone1:false,
                    phone2:false,
                },
                isWindows:false,
                isSafri:false,
                isEdge : false,
            }
        },
        created(){
            this.autoLogin(true)
            if(!getLStorage('code_key')){
                this.setCodeVal = this.setCode()
                setLStorage('code_key',this.setCodeVal)
            }
            console.log(getLStorage("userId"));
            // console.log(getLStorage('code_key'))
            this._getImgCode()
            //授权并绑定手机
            this.isLogin()
            // windows safri
            this.isWindow()
            this.checkSafri()
            // this.checkIE()
            this.checkWindow()
            this.isWebLiveTo()
        },
        methods:{
            isWebLiveTo(){
                console.log(this.$route.query.weblive)
                if(getCookie('admin') && getCookie('password') && getCookie('user_id')){
                    console.log(this.$route.query.weblive)
                    // if(getCookie('user_id') != this.$route.query.weblive){
                        removeCookie('user_id')
                        removeCookie('admin')
                        removeCookie('password')
                        delLStorage('user_id')
                        delLStorage('iconImg')
                        delLStorage('code_key')
                    // }
                }
            },
            isWindow(){
                var sUserAgent = navigator.userAgent;
                var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
                var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
                if (isMac){
                    this.isWindows = false
                    return "Mac";
                }else{
                    this.isWindows = true
                }
            },
            checkWindow(){
                console.log('isWindow',this.isWindows,'isSafri',this.isSafri)
                if(this.isWindows && this.isSafri){
                    var isWindowIsSafri = setTimeout(function(){
                        var body = document.getElementById("app")
                        document.getElementById("app").innerHTML = "不支持 Windows 的 Safari 浏览器，请使用其它浏览器！";
                        document.getElementById("app").style.padding="30px";
                        document.getElementById("app").style.fontSize="30px";
                        document.getElementById("app").style.textAlign="center";
                        clearTimeout(isWindowIsSafri)
                    },1000)
                }
            },
            checkSafri(){
                var ua = window.navigator.userAgent;  
                var isIE = window.ActiveXObject != undefined && ua.indexOf("MSIE") != -1;  
                var isFirefox = ua.indexOf("Firefox") != -1;  
                var isOpera = window.opr != undefined;  
                var isChrome = ua.indexOf("Chrome") && window.chrome;  
                var isSafari = ua.indexOf("Safari") != -1 && ua.indexOf("Version") != -1;  
                if (isSafari) {
                    this.isSafri = true
                    return "Safari"
                }
            },
            checkIE(){
                 if (!!window.ActiveXObject || "ActiveXObject" in window) {
                    var isEdge = setTimeout(function(){
                        var body = document.getElementById("app")
                        document.getElementById("app").innerHTML = "不支持IE浏览器，请使用其它浏览器！";
                        document.getElementById("app").style.padding="30px";
                        document.getElementById("app").style.fontSize="30px";
                        document.getElementById("app").style.textAlign="center";
                        clearTimeout(isEdge)
                    },1000)  
                }
            },
            isLogin(){
                //授权并绑定手机
                if(this.$route.query.user_id && this.$route.query.user_name && this.$route.query.user_icon_url){
                    setLStorage('iconImg',this.$route.query.user_icon_url)
                    setLStorage('admin',this.$route.query.user_name)
                    setLStorage('user_id',this.$route.query.user_id)
                    // 跳转
                    this.$router.push({
                        path:'/index'
                    })
                }
            },
            setCode(){
                var s = [];
                var hexDigits = "0123456789abcdef";
                for (var i = 0; i < 36; i++) {
                    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                }
                s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
                s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
                s[8] = s[13] = s[18] = s[23] = "-";

                var uuid = s.join("");
                return uuid
            },
            autoLogin(type){
                console.log(getCookie("flag"),getCookie("mid"))
                if(getCookie("flag") == 'true' && getCookie("mid")){
                    this._login(type)
                }
                // 自动登录
                if(getCookie("22eb4d3820015070")&& getCookie("d4c0e137f9de3dfc")){
                    this._login(type,getCookie("22eb4d3820015070"),getCookie("d4c0e137f9de3dfc"))
                }
            },
            _getImgCode(){
                var time = getNewTime()
                let setCode = this.setCode()
                // this.regData.CodeImgUrl = 'http://mwlivetest.facebac.com/api/mwlive/user/user_code_vue.do?time=' + time + '&code_key=' + getLStorage('code_key')
                this.regData.CodeImgUrl = DATA_URL + 'mwlive/user/user_code_vue.do?time=' + time + '&code_key=' + setCode
                setLStorage('code_key',setCode)
                // let formdata = new FormData()
                // formdata.append('time', time)
                // axios({
                //     method: 'post',
                //     url: DATA_URL + 'mwlive/user/user_code.do',
                //     data:formdata,
                //     xhrFields: {
                //         withCredentials: true
                //     },
                //     crossDomain: true,
                //     // headers: {'Content-Type': 'multipart/form-data'}
                // })

                // .catch(function(err){
                //     console.log(err);
                // })
            },
            _isLogin(){
                
                // let url = DATA_URL + 'mwlive/user/user_login.do'
                // let formdata = new FormData()
                // formdata.append('user_name','')
                // formdata.append('password','')
                // axios({
                //     method: 'post',
                //     url: url,
                //     data:formdata,
                //     headers: {'Content-Type': 'multipart/form-data'}
                // })
                // .then((res)=>{
                //     console.log(res)
                //     if(res.data.code == '412'){}
                // })

                let phone
                if(this.activeName == 'login_first'){
                    phone = this.formData.Phone
                }else{
                    phone = this.formData.Phone2
                }
                axios.get(DATA_URL + 'mwlive/user/user_exist_check.do',{
                    params:{
                        mobile:phone
                    }
                }).then((response) => {
                    if(response.data.code == ERR_OK){
                        // console.log('200',response.data.code)
                        this.isTrue.phone1 = false
                        this.isTrue.phone2 = false
                    }else{
                        // console.log('404',response.data.code)
                        if(this.activeName == 'login_first'){
                            this.isTrue.phone1 = true
                        }else{
                            this.isTrue.phone2 = true
                        }
                        // this.isTrue.phone1
                    }
                })
            },
            weixinLogin(){
                let url = 'https://open.weixin.qq.com/connect/qrconnect?appid=wx7bfe4c96b4b02fe9&redirect_uri=' + LOGINURI.weixinUrl+ '&response_type=code&scope=snsapi_login&state=123#wechat_redirect'
                window.location.href = url
                // window.open(url)
            },
            weiboLogin(){
                console.log(LOGINURI.weiboUrl)
                let url = 'https://api.weibo.com/oauth2/authorize?client_id=222242021&redirect_uri=' + LOGINURI.weiboUrl
                window.location.href = url
            },
            qqLogin(){
                let url = 'https://graph.qq.com/oauth2.0/show?which=Login&display=pc&response_type=code&client_id=101445413&redirect_uri=' + LOGINURI.QQUrl + '&state=123'
                window.location.href = url
            },
            setCookie(name,value){
                // var d = new Date();
                // d.setTime(d.getTime() + hours * 3600 * 1000);
                // document.cookie = name + '=' + value + '; expires=' + d.toGMTString();
                var d = new Date()
                d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000)
                document.cookie = name + '=' + value + '; expires=' + d.toGMTString()
                // console.log('cookie',value)
            },
            getCookie(name){
                var arr = document.cookie.split('; ');
                for(var i = 0; i < arr.length; i++){
                    var temp = arr[i].split('=');
                    if(temp[0] == name){
                        return temp[1]
                    }
                }
                return '';
            },
            removeCookie(name){
                // var d = new Date();
                // d.setTime(d.getTime() - 10000);
                // document.cookie = email + '=1; expires=' + d.toGMTString();
                var exp = new Date()
                exp.setTime(exp.getTime() - 1)
                var cval=document.cookie
                if(cval!=null)
                document.cookie= name + "="+cval+";expires="+exp.toGMTString()
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.activeName == 'login_second'){
                            let that = this
                            let data = {
                                'code_key': getLStorage('code_key'),
                                'code': this.formData.imgCode
                            }
                            let url = DATA_URL + 'mwlive/user/user_code_check_vue.do'

                            axios({
                                method: 'post',
                                url: DATA_URL + 'mwlive/user/user_code_check_vue.do',
                                params: data,
                                headers: {
                                    "Content-Type":"application/json;charset=utf-8"
                                },
                                withCredentials : true
                            }).then((res)=>{
                                    if(res.data.code != ERR_OK){
                                        console.log('axiosData, user_code_check_vue')
                                        that.$message({
                                            showClose: true,
                                            message: '图形验证码错误',
                                            type: 'error'
                                        })
                                        console.log(that)
                                        // that.tipsMessage('图形验证码错误！','error')
                                        that._getImgCode()
                                        return false
                                    }else{
                                        console.log('axiosData, _login')
                                        that._login()
                                    }
                            }).catch((err)=>{
                                console.log(err);
                            })
                            return false;
                            // axiosData(data, url).then(res => {
                                // if(res.data.code != ERR_OK){
                                //     console.log('axiosData, user_code_check_vue')
                                //     that.$message({
                                //         message: '图形验证码错误',
                                //         type: 'error'
                                //     })
                                //     that._getImgCode()
                                //     return false
                                // }else{
                                //     console.log('axiosData, _login')
                                //     that._login()
                                // }
                            // }).catch((err)=>{
                            //     console.log(err)
                            // })
                            this._login()
                            return false;
                            //ie9

                            var url=DATA_URL + 'mwlive/user/user_code_check.do';
                            let formdata = new FormData()
                            formdata.append('code_key', getLStorage('code_key'))
                            formdata.append('code', this.formData.imgCode)
                            // axios.defaults.withCredentials=true
                            axios({
                                method: 'post',
                                url: DATA_URL + 'mwlive/user/user_code_check_vue.do',
                                data:formdata,
                                // headers: {'Content-Type': 'multipart/form-data'},
                                // xhrFields:{withCredentials:true},
                                // crossDomain: true,
                                headers: {
                                    "Content-Type":"application/json;charset=utf-8"
                                },
                                withCredentials : true
                            })
                            .then((response) => {
                                if(response.data.code != ERR_OK){
                                    this.$message({
                                        showClose: true,
                                        message: '图形验证码错误',
                                        type: 'error'
                                    })
                                    // this.tipsMessage('图形验证码错误！','error')
                                    this._getImgCode()
                                    return false
                                }else{
                                    this._login()
                                }
                            }).catch(function(err){
                                console.log(err);
                            })
                            return false
                        }
                        this._login()
                    }
                })
            },
            // 登录
            _login(type,a,b){
                // 登录日期比对修改增加版本号
                if(!window.localStorage.getItem("version")){
                    window.localStorage.clear();
                    window.localStorage.setItem('version',"2.0");
                }
                let that = this
                let data = {}
                let url
                let formdata = new FormData()
                var isAutoFlag=0;
                //跟app获取token区分开来
                formdata.append('pc',1)
                //  formdata.append('pv',1)
                //  formdata.append('v',1)'
                if(type){
                    formdata.append('flag',1)
                    formdata.append('token',getCookie("token"))
                    formdata.append('user_name',b)
                    formdata.append('password',a)
                    // IE9
                    url = DATA_URL + 'mwlive/user/user_login.do'
                    isAutoFlag=1;
                }else if(this.activeName == 'login_first'){
                    formdata.append('user_name',this.formData.Phone)
                    formdata.append('password',md5(this.formData.password))
                    formdata.append('flag',this.formData.automatic ? 1:0)
                    isAutoFlag=1;
                    // IE9
                    url = DATA_URL + 'mwlive/user/user_login.do'
                    data = {
                        'user_name':this.formData.Phone,
                        'password':md5(this.formData.password),
                        'flag':this.formData.automatic ? 1:0
                    }
                }else{
                    formdata.append('mobile',this.formData.Phone2)
                    formdata.append('sm_code',this.formData.code)
                    url = DATA_URL + 'mwlive/user/user_login_bysm.do'
                    // IE9
                    url = DATA_URL + 'mwlive/user/user_login_bysm.do'
                    data = {
                        'mobile':this.formData.Phone2,
                        'sm_code':this.formData.code
                    }
                }
                axiosData(formdata,url).then(res => {
                    if(res.data.code == ERR_OK){
                        console.log("token:"+res.data.data.token);
                        console.log(res.data.data.token);
                        removeCookie("token");
                        setCookies("token", res.data.data.token, 7)
                     
                        // 自动登录
                        if(that.formData.automatic == 1&&isAutoFlag){
                            //密码
                            setCookies("22eb4d3820015070",md5(this.formData.password),7)
                            //手机
                            setCookies("d4c0e137f9de3dfc", this.formData.Phone, 7)
                        }
                        setLStorage('user_id',res.data.data.id)
                        if(res.data.data.user_title == null && res.data.data.user_icon_id == null || res.data.data.user_title == "" && res.data.data.user_icon_id == ""){
                            //设置空用户名
                            that.editUserInfo(true,true)
                        }else if(res.data.data.user_title == null || res.data.data.user_title == ""){
                            that.editUserInfo(true,false)
                        }else if(res.data.data.user_icon_id == null || res.data.data.user_icon_id == ""){
                            that.editUserInfo(false,false)
                        }else{
                            //  sessionStorage
                            setLStorage('admin',res.data.data.user_title)
                            setLStorage('mobile',res.data.data.mobile)
                            setLStorage('iconImg',res.data.data.user_icon_url)
                            setLStorage("userId", res.data.data.id)
                            setLStorage("showId", res.data.data.show_id)
                            setLStorage("22eb4d3820015070",md5(this.formData.password),7)
                            //手机
                            setLStorage("d4c0e137f9de3dfc", this.formData.Phone, 7)
                            setCookies("admin", res.data.data.user_title)
                            setCookies("userId", res.data.data.id)
                            // 1-认证中;2-认证失败;3-认证成功
                            if(res.data.data.qualify == 0 || res.data.data.qualify == 2){
                                // 判断用户是否当日首次登陆                                
                                var last_login_Date = localStorage.getItem(res.data.data.id);                            
                                // 已经登陆过，判断是否当日首次
                                var a = last_login_Date;
                                var b = changeDateType(new Date()); 
                                if(last_login_Date){                                                               
                                    if( last_login_Date == changeDateType(new Date())){
                                        // 判断实名状态
                                        that.$router.push({
                                            path:'/index'
                                        })                                                                           
                                    }
                                    // 今天没有登陆过，之前登陆过，判断实名
                                    if(a < b){
                                        
                                        //未认证弹屏
                                        localStorage.setItem(res.data.data.id,changeDateType(new Date()));   
                                        that.$router.push({
                                            path:'/index?qualify='+res.data.data.qualify
                                        });                                                
                                    }
                                }else{
                                    //没有登陆过
                                    that.$router.push({
                                        path:'/index?qualify='+res.data.data.qualify
                                    })                        
                                    localStorage.setItem(res.data.data.id,changeDateType(new Date()));                                    
                                }                                    
                            }else{
                                that.$router.push({
                                    path:'/index?qualify='+res.data.data.qualify
                                })
                            }

                            
                        }
                    }else{
                        that._getImgCode()
                        if(that.activeName == 'login_second'){
                            that.$message({
                                showClose: true,
                                message: '您输入的验证码错误！',
                                type: 'error'
                            })
                        }else{
                            console.log('axios,error')
                            that.$message({
                                showClose: true,
                                message: '您输入的手机号或密码错误！',
                                type: 'error'
                            })
                        }
                    }
                }).catch((err)=>{
                    that.$message({
                        showClose: true,
                        message: '登录失败，请稍后再试！',
                        type: 'error'
                    })
                    console.log(err)
                })
                
            },
            editUserInfo(nameType,imgType){
                let url
                let formdata = new FormData()
                formdata.append('id',getLStorage('user_id'))
                if(nameType && imgType){
                    formdata.append('user_title','M' + setSNumber())
                    formdata.append('user_icon_id',SETUSERICON)
                }
                if(nameType && !imgType){
                    formdata.append('user_title','M' + setSNumber())
                }
                if(!nameType && !imgType){
                    formdata.append('user_icon_id',SETUSERICON)
                }
                url = DATA_URL + 'mwlive/user/edit_userinfo.do'
                axios({
                    method: 'post',
                    url: url,
                    data:formdata,
                    headers: {'Content-Type': 'multipart/form-data'}
                })
                .then((res)=>{
                    if(res.data.code == ERR_OK){
                        console.log('edit_userinfo ',res)
                        this.$router.push({
                            path:'/index'
                        })
                        this._getUserInfo()
                    }
                }).catch((err)=>{
                    console.log('设置失败',err)
                })
            },
            _getUserInfo(){
                let url = DATA_URL + 'mwlive/user/get_userinfo.do'
                let formdata = new FormData()
                formdata.append('id',getLStorage('user_id'))
                axios({
                    method: 'post',
                    url: url,
                    data:formdata,
                    headers: {'Content-Type': 'multipart/form-data'}
                })
                .then((res)=>{
                    if(res.data.code == ERR_OK){
                        console.log('edit_userinfo ',res)
                        setLStorage('user_id',res.data.data.id)
                        setLStorage('admin',res.data.data.user_title)
                        setLStorage('iconImg',res.data.data.user_icon_url)
                        setTimeout(function(){
                            // 跳转
                            this.$router.push({
                                path:'/index'
                            })
                        }, 400)
                    }
                }).catch((err)=>{
                    console.log('设置失败',err)
                })
            },
            _isFlag(user_id){
                // this.setCookie('name',this.formData.Phone)
                // this.setCookie('password',md5(this.formData.password))              
                setCookie('admin',this.formData.Phone)
                // setCookie('password',md5(this.formData.password))
            },
            getCode(){
                let PhoneExp = /^[18][34567890]\d{9}$/
                if(this.formData.Phone2 == '' || !PhoneExp.test(this.formData.Phone2)){
                    this.$message({
                        showClose: true,
                        message: '请输入正确的手机！',
                        type: 'error'
                    });
                    return false
                }
                // 获取验证码
                var data = {
                    mobile:this.formData.Phone2,
                    oper_time:getNewTime(),
                    // type:"MWSPY"
                }
                axios({
                    method: 'post',
                    url: DATA_URL + 'mwlive/user/user_login_getsm.do',
                    params: data,
                    headers: {
                        "Content-Type":"application/json;charset=utf-8"
                    }
                })
                .then((response)=>{
                    console.log('user_edit_getsm',response)
                    if(response.data.code == ERR_OK){
                        this.$message({
                        showClose: true,
                        message: '发送成功',
                        type: 'info'
                        });
                        console.log(response)
                    }
                    // else if(response.data.code == 404 && response.data.msg == 'mobile format error'){
                    //     this.$message({
                    //         showClose: true,
                    //         message: '请输入正确的手机！',
                    //         type: 'error'
                    //     });
                    //     return false
                    // }
                    else{
                        this.$message({
                            showClose: true,
                            message: '请输入正确的手机号码',
                            type: 'error'
                        });
                        return false
                    }
                }).catch((err)=>{
                    console.log('err');
                })
                if (!this.regData.timer) {
                    this.regData.count = TIME_COUNT;
                    this.regData.show = false;
                    this.timer = setInterval(() => {
                        if (this.regData.count > 0 && this.regData.count <= TIME_COUNT) {
                            this.regData.count--;
                            console.log(this.count);
                        } else {
                            this.regData.show = true;
                            clearInterval(this.timer);
                            this.regData.timer = null;
                        }
                    }, 1000)
                }
            },
            handleClick(tab, event) {
                // console.log(tab, event)
            },
            // shareHoverMove(){
            //     this.icon_weixin = this.icon_weixin
            // },
            // shareHoverEnter(){
            //     this.icon_weixin = !this.icon_weixin
            // },
            toggleClassWX(){
                this.icon_weixin = !this.icon_weixin
            },
            toggleClassQQ(){
                this.icon_qq = !this.icon_qq
            },
            toggleClassWB(){
                this.icon_weibo = !this.icon_weibo
            }

            // RegPhone(){
            //     if(!(/^[1|8][3|4|5|7|8|9|0][0-9]\d{4,8}$/.test(this.Phone))) {
            //         this.regData.PhoneVal = '请输入正确手机格式'
            //         return false
            //     }else{
            //         this.regData.PhoneVal = null
            //         return true
            //     }
            // },
            // RegPassword(){
            //     if(!(/^([0-9]|[a-zA-Z]){6,16}$/.test(this.password))){
            //         this.regData.passwordVal = '请输入密码'
            //         return false
            //     }else{
            //         this.regData.passwordVal = null
            //         return true
            //     }
            // },
            // submit(){
            //     if(!this.RegPhone()) return
            //     if(!this.RegPassword()) return

            //     axios.get(DATA_URL + 'mwlive/user/user_login.do',{
            //         params:{
            //             user_name:this.Phone,
            //             password:md5(this.password)
            //         }
            //     }).then((response) => {
            //         console.log(response.data.code);
            //         if(response.data.code == ERR_OK){
            //             setLStorage("admin", response.data.data.mobile)
            //             setLStorage("user_id", response.data.data.id)
            //             this.$message({
            //                 showClose: true,
            //                 message: '登录成功',
            //                 type: 'success'
            //             });
            //             this.$router.push({
            //                 path:'/main'
            //             })
            //         }else{
            //             this.$message({
            //                 showClose: true,
            //                 message: '账号或密码错误！',
            //                 type: 'warning'
            //             });
            //         }
            //     }).catch(function(err){
            //         console.log(err);
            //     })
            // }
        },
        components:{
            LoginHead,
            BgHead,
            mFooter
        }
  }
</script>

<style scoped>
html,body{
    height: 100%;
    max-height: 100%;
    max-height: 500px;
    overflow:auto;
}
.login_bg .line_r{
    border-right:1px solid #D8D8D8;
    height: 12px;
    margin-top:4px;
    display: inline-block;
}
.login_bg{
    padding: 0;
    /* position: absolute;
    left:0;
    top:0; */
    width: 100%;
    height:100%;
    /* overflow: hidden; */
    /* background: url("http://montnets.facebac.com/montnet20170707/H5/videoplayer/bk11/static/img/body_bg.jpg") no-repeat center; */
    background-attachment: fixed;
    background-size: cover;
    font-family: "PingFangSC";

}
.login_middle{
    text-align: center;
    margin:0 auto;
    height: auto;
    width:430px;
    /* position: absolute;
    top:187px;
    left:50%; */
    /* transform:translate(-50%,0%);
    -ms-transform:translate(-50%,0%); 
    -moz-transform:translate(-50%,0%); 
    -webkit-transform:translate(-50%,0%); 
    -o-transform:translate(-50%,0%); 	 */
}
.register-link{
    cursor: pointer;
}

.normal_in i {
    display: inline-block;
    width: 45px;
    height: 100%;
    line-height: 40px;
    border-right: 1px solid #dddddd;
    text-align: center;
    position: absolute;
    z-index: 1;
    left: 0;
}
.normal_in i img{
    vertical-align: middle;
}
.normal_in input {
    position: absolute;
    top: 0;
    left: 60px;
    width: 250px;
    height: 38px;
    border: none;
    line-height: 40px;
    float: right;
    outline: none;
    font-size: 14px;
    letter-spacing: 2px;
    font-family: "Arial";
    color: #666;
}
/* .normal_in span{
    position:absolute;
    top:48px;
    left:18px;
    color:#ff3c3c;
} */
.normal_in .changeyzm{
    float: right;
    width: 99px;
    height: 37px;
    position: absolute;
    right: 3px;
    top: -8px;
    border: 1px solid #E5E5E5;
    /* background-color: #00b0fe; */
}
.normal_in .changeyzm img{
    width:99px;
    height: 37px;
    /* width:100%; */
}
.cur-p input{
    vertical-align: middle;
    margin-top: 0px;
}
.cur-p span{
    font-size: 14px;
}
.regist {
    width:410px;
    /* position: absolute;
    bottom: 0;
    left: 0; */
    height: 68px;
    line-height: 68px;
    text-align: center;
    background-color: #f1f2f4;
    color: #000000;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    margin-left: -24px;
}
.regist span {
    color: #00b0fe;
    font-size: 14px;
}
.login_btn {
    display: block;
    width: 320px;
    margin: 30px auto 0 auto;
    height: 48px;
    text-align: center;
    line-height: 48px;
    background-color: #2B6CFF;
    border-radius: 5px;
    color: #ffffff;
    font-size: 18px;
    letter-spacing: 5px;
    cursor: pointer;
}
.login_btn:hover{
    background-color: #5FAEFF;
}
.login_btn:active{
    background-color: #0068D2;
}
.share_model {
    width:320px;
    margin:30px auto 0 auto;
}
.share_model .icon{
    font-size: 37px;
    transition: all .5s;
}
.share_model P{
    color:#a6a6a6;
}
.icon-weixin-copy,.icon-qq1,.icon-weibo2{
    color:#e5e5e5;
}
.icon-weixin33{
    color:#7ED321;
}
.icon-qq33{
    color:#2B6CFF;
}
.icon-weibo33{
    color:#F5A623;
}
.to_re{
    padding-right:10px;
}
.to_find{
    margin-left:10px;
}


</style>
<style>
.default-bg .login_bg{
    background-color: #FBFDFF;
    min-width: 600px;
}
.choice_login .el-tabs__header{
    border-bottom:none;
}
.choice_login .el-tabs__nav{
    width:186px;
    margin:0 auto;
    padding-bottom:26px;
    float:none;
}
.choice_login .el-tabs__active-bar{
    background-color: #ffffff;
}
.choice_login .el-tabs__nav{
    background-color: #fff;
}
.choice_login .el-tabs__item{
    font-size:18px;
    text-align:center;
    color:#333333;
    font-weight:600;
    padding:0 20px;
    height: 25px;
    line-height:30px;

}
.choice_login .el-tabs__item{
    border-bottom:none!important;
}
.choice_login .el-tabs__item:last-child{
    border-right:none;
}
.choice_login .el-col-12{
    width:86%;
}

.login_model{
    margin:0 auto;
}
.login_mode .el-tab-pane{
    /* min-height: 216px; */
}
.el-form-item.yzm_box {

}
.login_middle .el-tabs__item.is-active{
    color: #2B6CFF !important;
    box-shadow: none!important; 
}

.login_middle .el-form-item__error{
    left:auto;
    right:0;
    color:#FF467F;
    top:35%;
}

.tx_box .el-form-item__error{
    right:108px;
}
.fj_tip{
    margin-top:-3px;
}
</style>
