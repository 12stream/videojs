<template>
    <div class="loginHead">
        <!-- 控制台 -->
        <img style="height:64px;" src="../../common/image/loginLogo.png"/>
    </div>
</template>

<script>
    import {DATA_URL,ERR_OK,getCookie,getLStorage,setLStorage} from 'api/config'
    import axios from 'axios'
    export default{
        data(){
            return {
                logoImg:'',
                logo_url:'http://yeepo.mvaas.cn/images/logo.png',
                logoC_url:'http://yeepo.mvaas.cn/images/logo_color.png'
                // logoC_url:require('../../common/image/logo_color.png')
            }
        },
        created(){
            this._isLogin()
            this.$nextTick(()=>{
                this.logoUrl()
            })
        },
        methods:{
            logoUrl(){
                this.logoImg = this.logo_url
                if(this.$route.path == '/login' || this.$route.path == '/setPhone'){
                    this.logoImg = this.logoC_url
                }else{
                    this.logoImg = this.logo_url
                }
            },
            _isLogin(){
                if(getCookie('admin') && getCookie('password') && getCookie('user_id')){
                    setLStorage('user_id', getCookie('user_id'))
                    setLStorage('admin', getCookie('admin'))
                    setLStorage('user_id', getCookie('user_id'))
                    console.log('getCookie',getCookie('name'))
                    console.log('已有登录信息')
                    this._login()
                    // this.$router.push({
                    //     path:'/index'
                    // })
                }
            },
            _login(){
                let url
                let formdata = new FormData()
                formdata.append('user_name',getCookie('admin'))
                formdata.append('password',getCookie('password'))
                url = DATA_URL + 'mwlive/user/user_login.do'
                axios({
                    method: 'post',
                    url: url,
                    data:formdata,
                    headers: {'Content-Type': 'multipart/form-data'}
                })
                .then((res)=>{
                    if(res.data.code == ERR_OK){
                        // console.log('校验',res)
                        // getLStorage('admin',res.data.data.mobile)
                        // getLStorage('user_id',res.data.data.id)
                        // 跳转
                        this.$router.push({
                            path:'/index'
                        })
                    }else{
                        // this._getImgCode()
                        this.$message({
                            message: '登录失败，请确认信息是否有误！',
                            type: 'error'
                        })
                        
                    }
                }) 
            }
        }
    }
</script>

<style scoped>
.loginHead{
   font-size: 24px;
   color: #333333;
   margin-bottom: 48px;
   font-family: PingFangSC;
   padding-top:187px;
}
</style>
