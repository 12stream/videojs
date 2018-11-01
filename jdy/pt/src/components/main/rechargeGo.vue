<template>
    <div class="recharge">
        <div class="pd10 live-top bg-fff">充值信息</div>
        <div class="bg-fff info-content pd20 pb30">
            <div style="width:460px">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px">
                <div>
                    <el-form-item prop="money" label="请输入充值金额:">
                        <el-input v-model="ruleForm.money" placeholder="请输入充值金额" :maxlength="7"></el-input>
                        <!-- <div v-show="isNumber" class="el-form-item__error">请输入数字金额</div> -->
                    </el-form-item>
                </div>
                <div>
                    <el-form-item prop="resource" label="请选择充值方式:">
                       <div class="choice_pay">
                            <el-radio class="radio" v-model="ruleForm.resource" label="2">微信</el-radio>
                            <el-radio class="radio" v-model="ruleForm.resource" label="1">支付宝</el-radio>
                       </div>
                    </el-form-item>
                </div>
                <div class="rechatge">
                    <el-form-item class="rechatge-button">
                        <el-button type="primary" @click="submitForm('ruleForm')" :disabled="disabled">下一步</el-button>
                    </el-form-item>
                </div>
                <p class="tishi" style="margin-left:25px">
                    温馨提示：<br>
                    1.支持微信，支付宝支付，线下银行付款等方式充值。<br>
                    2.支付成功后，可在账户总览中查看最新余额。<br>
                    3.充值成功的金额不支持提现。<br>
                    4.支持查看所有历史充值记录，点击进入查询。<br>
                    5.若充值未到账或有其他疑问可致电客服热线
                </p>
            </el-form>
            </div>
        
            <el-dialog
            title="微信支付"
            :visible.sync="dialogVisible"
            :show-close="false"
            size="tiny">
            <div class="te-c">
                <img :src="wechatImg" alt="">
                <p>
                    金额: {{ruleForm.money}} 元
                </p>
            </div>
            <span slot="footer" class="dialog-footer te-c">
                <el-button @click="dialogVisible = false">取消支付</el-button>
                <el-button type="primary" @click="aplipaysucess">支付完成</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {ERR_OK,DATA_URL,getLStorage} from 'api/config'
    import {submitMoney} from 'api/http'
    export default{
        data() {
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入正确的金额'))
                }
                setTimeout(() => {
                    let MoneyExp = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
                    if (!MoneyExp.test(value)) {
                        callback(new Error('请输入正确的金额'))
                    } else {
                        this.disabled = false
                        callback()
                    }
                }, 1000);
            };
            return {
                wechatImg:'',
                disabled:false,
                isNumber:false,
                dialogVisible:false,
                ruleForm: {
                    user_id:getLStorage('user_id'),
                    money: '',
                    resource: ''
                },
                rules: {
                    validateMoney:false,
                    validateType:false,
                    moneyTipe:'',
                    money: [
                        {validator: checkAge,trigger: 'blur' },
                    ],
                    resource: [
                        { required: true, message: '请选择充值方式', trigger: 'change' }
                    ]
                }
            }
        },
        created(){
         
        },
        methods: {
            aplipaysucess(){
                this.$message({
                    showClose:true,
                    type: 'success',
                    message: '付款成功可到充值记录查询'
                });
                this.dialogVisible = false
            },
            submitForm(formName) {
                this.disabled = true
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.disabled = true
                        let url = 'http://10.10.212.73:8081/montnets-project-mwlive/api/manage/finance/topup.do?user_id=1177720833017757098&to_type=1&money=1 ' 
                        // let formdata = new FormData()
                        // formdata.append('user_id',getLStorage('user_id'))
                        // formdata.append('to_type',this.ruleForm.resource)
                        // formdata.append('money',this.ruleForm.money)
                        // axios({
                        //     method: 'post',
                        //     url: url,
                        //     data:formdata,
                        //     headers: {'Content-Type': 'multipart/form-data'}
                        // })
                        
                        let data = {
                            'user_id': getLStorage('user_id'),
                            'to_type': this.ruleForm.resource,
                            'money': this.ruleForm.money,
                        }
                        // axios({
                        //     method: 'post',
                        //     url: url,
                        //     params: data,
                        //     headers: {
                        //         "Content-Type":"application/json;charset=utf-8"
                        //     }
                        // }).then((res) => {
                        //     console.log(res.data)
                        //     if(this.ruleForm.resource == 1){
                        //         //暂不支持IE浏览器
                        //         // if (!!window.ActiveXObject || "ActiveXObject" in window){
                        //         //     this.$confirm('暂不支持IE浏览器支付，请更换浏览器，如Firefox或Chrome', '提示', {
                        //         //         type: 'error'
                        //         //     })
                        //         //     this.disabled = false;
                        //         //     return false;
                        //         // }
                        //         var url = res.data.payUrl.replace(/&amp/g, "&")
                        //         console.log(url)
                        //         window.location.href=url
                        //         // window.open(url)
                        //         // this.openTips()
                        //     }else{
                        //         this.dialogVisible = true
                        //         this.wechatImg = res.data.payUrl
                        //     }
                        //     this.disabled = false
                        // })
                        // .catch(function(err){
                        //     console.log(err);
                        // })
                    } else {
                        this.disabled = false
                        console.log('error submit!!')
                        return false;
                    }
                });
                
                return false
                let url = DATA_URL + 'manage/finance/topup.do'
                // let url1 = 'http://mwlivetest.facebac.com/api/manage/finance/topup.do'
                let formdata = new FormData()
                formdata.append('user_id',getLStorage('user_id'))
                formdata.append('to_type',this.ruleForm.resource)
                formdata.append('money',this.ruleForm.money)
                axios({
                    method: 'get',
                    url: url1,
                    data:formdata,
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then((res) => {
                    this.openTips()
                    console.log(res)
                    this.form_data = res.data
                    // let newData = this.form_data.replace(/&amp/g,"&")
                    // window.location.href = url
                    window.open('http://mwlivetest.facebac.com/api/manage/finance/topup.do')
                })
                .catch(function(err){
                    console.log(err);
                })
            },
            // Alipay(url){
            //     console.log('payUrl')
            //     window.open(url)
            // },
            // wechatAayment(url){
            //     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         type: 'warning'
            //     }).then(() => {
            //         this.$message({
            //             type: 'success',
            //             message: '删除成功!'
            //         });
            //     }).catch(() => {
            //         this.$message({
            //             type: 'info',
            //             message: '已取消删除'
            //         });          
            //     });
            // },
            openTips() {
                this.$confirm('充值中', '提示', {
                    confirmButtonText: '支付完成',
                    cancelButtonText: '取消支付',
                    customClass:'delMessageBox',
                    type: 'info'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '付款成功可到充值记录查询'
                    });
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '取消支付'
                    // });          
                });
            },
            // handleClose(done) {
            //     this.$confirm('确认关闭？')
            //     .then(_ => {
            //         done();
            //     })
            //     .catch(_ => {});
            // }
        }
    }
    
</script>
<style>
    .recharge .pay_in_way{
        display: block;
        float: none;
    }
    .rechatge .el-form-item__content{
        margin-left:10px!important;
    }
    .recharge .el-form-item__content{
        margin-left: 25px !important;
        display: block !important;
    }
   .recharge  .el-input__inner{
        width: 250px !important;
        background-color: #f1f5f9;
    }
    .recharge .choice_pay{
        display: block;
    }
</style>

<style scoped>
.recharge{
    padding: 22px;
    background-color: #c2c8ce;
}

.live-top{
    border-top-left-radius: 5px;
    border-top-right-radius: 5px; 
    padding-left: 20px;
}
.info-content{
    padding:50px 70px;
    min-height:535px;
    line-height: 30px;
    font-size: 14px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px; 
}

.in_money{
    display: block;
    float: none !important;
}

.rechatge-button .el-button{
    width: 170px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #58cafd;
    border: none;
    margin-left: 0px !important;
    padding: 0 !important;
    font-size: 16px;
}
.tishi{
    margin-top: 10px;
    line-height: 28px;
    color: #a5a5a5;
}

</style>
