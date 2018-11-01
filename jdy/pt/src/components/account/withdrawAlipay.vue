<template>
    <div class="withdraw my_list" style="height:667px;">
        <div class="pd10 live-top bg-fff">支付宝提现</div>
        <div v-if="!isbinding" class="form_title">绑定支付宝账号</div>
        <div class="bg-fff info_content">
            <div v-if="!isbinding" >
                <el-form  label-width="95px" :rules="rules" ref="withdrawForm"  :model="withdrawForm">
                    <el-form-item label="支付宝账号 : " prop="account">
                        <el-input class="my_input"  v-model="withdrawForm.account" placeholder="收款人支付宝账号"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名 : " prop="name">
                        <el-input class="my_input" v-model="withdrawForm.name"  placeholder="请输入收款人姓名 "></el-input>
                    </el-form-item>
                    <div class="btn">
                        <el-form-item class="btn">
                            <el-button class="blue_btn" type="primary" @click="binding('withdrawForm')" :disabled="disabled">确定</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>

            <div v-if="isbinding" style="margin-top:49px">
                <span class="col_4FF" @click="isbinding = false" >重新绑定</span>
                <el-form label-width="95px" :rules="rules2" ref="withdrawForm2"  :model="withdrawForm2">
                    <el-form-item label="可提现金额 :  " prop="ifAmount">
                        <el-input class="my_input" :disabled="true"  v-model="withdrawForm2.ifAmount" ></el-input>
                    </el-form-item>
                    <el-form-item label="提现金额 : " prop="amount">
                        <el-input class="my_input" v-model="withdrawForm2.amount"  placeholder="请输入提现金额 " :maxlength="7"></el-input>
                    </el-form-item>
                    <el-form-item label="支付宝账号 :  " prop="account2">
                        <el-input class="my_input" :disabled="true" v-model="withdrawForm2.account2"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="姓名 :  " prop="name2">
                        <el-input class="my_input"  :disabled="true" v-model="withdrawForm2.name2"></el-input>
                    </el-form-item>
                    <div class="btn">
                        <el-form-item class="btn">
                            <el-button class="blue_btn" type="primary" @click="withdraw('withdrawForm2')" :disabled="disWithdraw">确定</el-button>
                        </el-form-item>
                    </div>
                </el-form>        
            </div>
        </div>
        <div class="tips">
            <p>温馨提示：</p>
            <p>1、请正确填写，以确保收到钱款。</p>
            <p>2、提现1-3个工作日到账。</p>
            <p>3、支持查看所有历史提现记录，到提现记录中查看。</p>
            <p>4、若提现未到账或有其他疑问可致电客服热线。</p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {ERR_OK,DATA_URL,getLStorage,GIFT_URL,PROJET_URL,MW_Live_API_URL} from 'api/config'
    import {submitMoney} from 'api/http'
    export default{
        data() {
            let  regEmail = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            let PhoneExp = /^[1][345789]\d{9}$/
            var validateAccount = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入支付宝账号'));
                } else if (!PhoneExp.test(value)) {
                    if(!regEmail.test(value)){
                        callback(new Error('信息填写有误，核对后重新填写!'));
                    }else{
                         callback();
                    }
                }else{
                    callback();
                }
            };
            
            var regName =/^[\u4e00-\u9fa5]{2,4}$/;
            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入姓名'));
                }else if(!regName.test(value)){
                    callback(new Error('信息填写有误，核对后重新填写'));
                } else {
                    callback();
                }
            };

            var validateAmount = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('提现金额不能为空'));
                }
                
                setTimeout(() => {
                    if (!/^[0-9]+([.]{1}[0-9]{1})?$/.test(value)) {
                        callback(new Error('请输入数字'));
                    }else {
                        if (value < 20) {
                            callback(new Error('金额低于20元，无法提现'));
                        } else if( value >this.withdrawForm2.ifAmount){
                            callback('可提现金额不足');
                        }else{
                            callback();
                        }
                    }
                },500);
            };
            return{
                withdrawForm: {
                    account:'',
                    name: '',
                },
                withdrawForm2:{
                    ifAmount:'',
                    amount:'',
                    account2:'',
                    name2:''  
                },
                disabled:false,
                disWithdraw:false,
                rules: {
                    account: [
                        { validator: validateAccount, trigger: 'blur' }
                    ],
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ]
                },
                rules2: {
                    amount: [
                        { validator: validateAmount, trigger: 'blur' }
                    ]
                   
                },
                isbinding:false,
             }
        },
        created(){
            this.getBalance()
            this.ifbinding()
        },
        methods: {
            // 查询是否有绑定记录
            ifbinding(){
                let _this = this
                let url = MW_Live_API_URL + '/mwcurrency/getCardInfo.action'
                let formdata = new FormData()
                formdata.append('userId',getLStorage('user_id'))
                formdata.append('type','1')
                axios({
                    method: 'post',
                    url: url,
                    data:formdata,
                })
                .then((res)=>{
                    if(res.data.resultCode == "01"){
                        if(res.data.params.type =='1'){
                           _this.withdrawForm2.account2 =  res.data.params.cardNo
                           _this.withdrawForm2.name2 =  res.data.params.name
                           _this.isbinding = true
                        }else{
                            _this.isbinding = false
                        }
                    }
                    
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 获取可提现余额
            getBalance(){
                let _this = this
                let url = MW_Live_API_URL + '/mwcurrency/getCurrencyBalance.action'
                let formdata = new FormData()
                formdata.append('userId',getLStorage('user_id'))
                axios({
                    method: 'post',
                    url: url,
                    data:formdata,
                })
                .then((res)=>{
                    if(res.data.resultCode == "01"){
                        if(res.data.params.currencyBalanceRMB ==null){
                            _this.withdrawForm2.ifAmount=0;
                        }
                       else{
                           _this.withdrawForm2.ifAmount =  res.data.params.currencyBalanceRMB
                       } 
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 绑定账号
            binding(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.isbinding = true
                        this.withdrawForm2.account2 = this.withdrawForm.account
                        this.withdrawForm2.name2 = this.withdrawForm.name
                        this.sendBindInfo();
                    } else {
                       
                    }
                });
            },
            //提交绑定给后台
            sendBindInfo(){
                let _this = this
                let url = MW_Live_API_URL + '/mwcurrency/updateCardInfo.action'
                let formdata = new FormData()
                formdata.append('userId',getLStorage('user_id'))
                formdata.append('type',"1")
                formdata.append('name',this.withdrawForm.name)
                formdata.append('cardNo',this.withdrawForm.account)
                axios({
                    method: 'post',
                    url: url,
                    data:formdata,
                })
                .then((res)=>{
                    console.log(res);
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 提现
            withdraw(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let _this = this
                        let url = MW_Live_API_URL + '/mwcurrency/addAmountCash.action'
                        let formdata = new FormData()
                        formdata.append('userId',getLStorage('user_id'))
                        formdata.append('type','1')
                        formdata.append('amount',_this.withdrawForm2.amount)
                        formdata.append('name',_this.withdrawForm2.name2)
                        formdata.append('cardNo',_this.withdrawForm2.account2)  //账号
                        axios({
                            method: 'post',
                            url: url,
                            data:formdata,
                        })
                        .then((res)=>{
                            if(res.data.resultCode == '01'){
                                _this.successMessage("提现成功")
                                this.getBalance()
                                this.$refs[formName].resetFields();
                            }else{

                            }
                           
                        }).catch((err)=>{
                            console.log(err)
                        })
                    } else {
                       
                    }
                });
            },
            successMessage(message,type) {
                this.$message({
                    showClose:true,
                    message: message,
                    type: type || 'success'
                });
            },
           
        }
    }
    
</script>


<style scoped>
.withdraw .info_content{
    text-align: center;
    padding-left: 215px; 
    width: 395px;
    position: relative;
} 
.form_title{
    font-size: 18px;
    text-align: center;
    font-weight: 600;
    padding:28px 0 21px 0;
}
.tips{  
    text-align-last: left;
    margin-left: 310px;
    color: #9B9B9B;
    padding-top: 45px;
    line-height: 30px;

}
.withdraw .el-form-item__content .blue_btn {
    width:300px;
    height: 46px;
    line-height:46px;
    margin-top: 16px ;
    font-size:16px;
}
.withdraw .col_4FF{
    position: absolute;
    top: 131px;
    right: -67px;
    cursor: pointer;
    z-index: 999;
}
</style>
<style>
.withdraw .el-form-item {
    margin-bottom: 20px;
}
.withdraw .el-form-item__content{
    width: auto;
}
</style>

