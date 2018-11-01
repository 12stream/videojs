<template>
    <div class="withdraw withdraw_2 my_list" style="min-height:668px;">
        <div class="pd10 live-top bg-fff">银行卡提现</div>
        <div class="tab_btn">
          <div class="info_content">
            <el-form label-width="90px">
              <el-form-item label="">
                <el-button  class="border_btn"  :class="{blue_btn:personage==true}"   type="button" @click="changeTab('personage')">个人提现</el-button>
                <el-button  class="btn_right border_btn" :class="{blue_btn:company==true}"   type="button"  @click="changeTab('company')">企业提现</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <!-- 个人账号 -->
        <div class="bg-fff info_content">
            <div  v-show="personage">
                <el-form  v-show="!isbinding"  label-width="95px" :rules="bangding_personal_rules" ref="bangding_personal"  :model="bangding_personal">
                    <el-form-item label="姓名 :" prop="name">
                        <el-input class="my_input"  v-model="bangding_personal.name" placeholder="收款人姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="卡号 : " prop="cardNo">
                        <el-input class="my_input" v-model="bangding_personal.cardNo"  placeholder="收款人储蓄卡号 " :maxlength="19"></el-input>
                    </el-form-item>
                    <el-form-item label="银行 : " prop="bank">
                        <el-select v-model="bangding_personal.bank" placeholder="请选择开户银行" class="my_select">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div class="btn">
                        <el-form-item class="btn">
                            <el-button class="blue_btn" type="primary" @click="bindingPerson('bangding_personal')" >确定</el-button>
                        </el-form-item>
                    </div>
                </el-form>
                <!-- 个人提现 -->
                <div v-show="isbinding">
                    <span class="col_4FF" @click="re_bangding()" >重新绑定</span>
                    <el-form label-width="95px" :rules="tixian_personal_rules" ref="tixian_personal"  :model="tixian_personal">
                        <el-form-item label="可提现金额 :  " prop="ifAmount">
                            <el-input class="my_input" :disabled="true"  v-model="tixian_personal.ifAmount" ></el-input>
                        </el-form-item>
                        <el-form-item label="提现金额 : " prop="amount">
                            <el-input class="my_input" v-model="tixian_personal.amount"  placeholder="请输入提现金额 " :maxlength="7"></el-input>
                        </el-form-item>

                        <el-form-item label="姓名 :  " prop="name">
                            <el-input class="my_input"  :disabled="true" v-model="tixian_personal.name"></el-input>
                        </el-form-item>
                        <el-form-item label="卡号 : " prop="cardNo">
                            <el-input class="my_input" :disabled="true" v-model="tixian_personal.cardNo" :maxlength="19"></el-input>
                        </el-form-item>
                        <el-form-item label="银行 : " prop="bank">
                            <el-input class="my_input" :disabled="true" v-model="tixian_personal.bank"></el-input>
                        </el-form-item>
                        <div class="btn">
                            <el-form-item class="btn">
                                <el-button class="blue_btn" type="button" @click="withdraw('tixian_personal')" >确定</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
            </div>

            <!-- 对公账号绑定 -->
            <div v-show="company">
                <!-- 企业绑定 -->
                <div v-show="!isbinding2">
                    <el-form  label-width="95px" :rules="rules_binding_company" ref="binding_company"  :model="binding_company">
                        <el-form-item label="法人 : " prop="legalPerson">
                            <el-input class="my_input"  v-model="binding_company.legalPerson" placeholder="收款人法人姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="卡号 : " prop="cardNo">
                            <el-input class="my_input" v-model="binding_company.cardNo"  placeholder="企业开户行账号 " :minlength="11" :maxlength="21"></el-input>
                        </el-form-item>
                        <el-form-item label="银行 : " prop="bank">
                            <el-select v-model="binding_company.bank" placeholder="请选择开户银行" class="my_select">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="税号 : " prop="ird">
                            <el-input class="my_input" v-model="binding_company.ird"  placeholder="请输入企业税号 "></el-input>
                        </el-form-item>
                        <el-form-item label="地址 :" prop="address">
                            <el-input class="my_input" v-model="binding_company.address"  placeholder="请输入企业地址 "></el-input>
                        </el-form-item>
                        <el-form-item label="电话 : " prop="phone">
                            <el-input class="my_input" v-model="binding_company.phone"  placeholder="请输入联系电话 "></el-input>
                        </el-form-item>
                        <div class="btn">
                            <el-form-item class="btn">
                                <el-button class="blue_btn" type="primary" @click="bindingCompany('binding_company')" :disabled="disabled">确定</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>

                <!-- 企业提现 -->
                <div  v-show="isbinding2">
                    <span class="col_4FF" @click="re_bangding2()" >重新绑定</span>
                    <el-form label-width="95px" :rules="Company_tixian_rules" ref="Company_tixian"  :model="Company_tixian">
                        <el-form-item label="可提现金额 :  " prop="ifAmount">
                            <el-input class="my_input" :disabled="true"   v-model="tixian_personal.ifAmount" ></el-input>
                        </el-form-item>
                        <el-form-item label="提现金额 : " prop="amount">
                            <el-input class="my_input"  v-model="Company_tixian.amount"  placeholder="请输入提现金额 " :maxlength="7"></el-input>
                        </el-form-item>
                        <el-form-item label="法人 : ">
                            <el-input class="my_input" :disabled="true"  v-model="Company_tixian.legalPerson" placeholder="收款人法人姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="卡号 : " >
                            <el-input class="my_input" :disabled="true"  v-model="Company_tixian.cardNo"  placeholder="企业开户行账号 " :minlength="11" :maxlength="21"></el-input>
                        </el-form-item>
                        <el-form-item label="银行 : " >
                            <el-input class="my_input"  :disabled="true" v-model="Company_tixian.bank" ></el-input>
                        </el-form-item>
                        <el-form-item label="税号 : " >
                            <el-input class="my_input" :disabled="true"  v-model="Company_tixian.ird"  placeholder="请输入企业税号 "></el-input>
                        </el-form-item>
                        <el-form-item label="地址 :" >
                            <el-input class="my_input" :disabled="true" v-model="Company_tixian.address"  placeholder="请输入企业地址 "></el-input>
                        </el-form-item>
                        <el-form-item label="电话 : " >
                            <el-input class="my_input"   :disabled="true" v-model="Company_tixian.phone"  placeholder="请输入联系电话 "></el-input>
                        </el-form-item>
                        <div class="btn">
                            <el-form-item class="btn">
                                <el-button class="blue_btn" type="primary" @click="subCompany('Company_tixian')" :disabled="disabled">确定</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>

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
            var pattern = /^([1-9]{1})(\d{14}|\d{18})$/
            var validateAccount = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入支付宝账号'));
                }else{
                    callback();
                }
            };

            var regName =/^[\u4e00-\u9fa5]{2,4}$/;
            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写姓名'));
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
                        } else if( value >this.tixian_personal.ifAmount){
                            callback('可提现金额不足');
                        }else{
                            callback();
                        }
                    }
                },500);
            };
            var validateAmount2 = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('提现金额不能为空'));
                }

                setTimeout(() => {
                    if (!/^[0-9]+([.]{1}[0-9]{1})?$/.test(value)) {
                        callback(new Error('请输入数字'));
                    }else {
                        if (value < 20) {
                            callback(new Error('金额低于20元，无法提现'));
                        } else if( value >this.tixian_personal.ifAmount){
                            callback('可提现金额不足');
                        }else{
                            callback();
                        }
                    }
                },500);
            };
            // var patternCardNo = /^([1-9]{1})(\d{15}|\d{16}|\d{17}|\d{18})$/
            var patternCardNo = /^([1-9]{1})(\d{10,20})$/
            var validateCardNo = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写银行卡号'));
                }else if(!patternCardNo.test(value)){
                    callback(new Error('信息填写有误，核对后重新填写'));
                } else {
                    callback();
                }
            };


            // 企业提现验证
            var patternLegalPerson = /^[\u4e00-\u9fa5]{2,4}$/
            var valLegalPerson  = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写法人'));
                }else if(!patternLegalPerson.test(value)){
                    callback(new Error('信息填写有误，核对后重新填写'));
                } else {
                    callback();
                }
            };
            var valcardNo  = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写银行卡号'));
                }else if(!patternCardNo.test(value)){
                    callback(new Error('信息填写有误，核对后重新填写'));
                } else {
                    callback();
                }
            };
            var  checkTax = /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/
            var valIrd  = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写税号'));
                }else if(!checkTax.test(value)){
                    callback(new Error('税号填写有误，核对后重新填写'));
                } else {
                    callback();
                }
            };
            var valAddress  = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写地址'));
                }else{
                    callback();
                }
            };
            var valBank  = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择开户行'));
                }else {
                    callback();
                }
            };
            // var checkTel = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/g
            var valPhone  = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写电话'));
                }else {
                    callback();
                }

            };

            return{
                // 个人账号
                bangding_personal: {
                    name:'',
                    cardNo:'',
                    bank:'',
                },
                binding_company:{
                    amount:'',
                    legalPerson:'',
                    cardNo:'',
                    bank:'',
                    ird:'',
                    address:'',
                    phone:'' ,
                },
                // 个人提现数据
                tixian_personal:{
                   ifAmount:'',
                    amount:'',

                },
                // 公司提现数据
                Company_tixian:{
                    ifAmount:'',
                    amount:'',
                    legalPerson:'',
                    cardNo:'',
                    bank:'',
                    ird:'',
                    address:'',
                    phone:'' ,
                },
                disabled:false,
                disWithdraw:false,
                bangding_personal_rules: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    cardNo: [
                        { validator: validateCardNo,trigger: 'blur' },
                    ],
                    bank:[
                        {required: true, message: '请选择开户行', trigger: 'blur'}
                    ]
                },
                // 验证绑定信息
                rules_binding_company: {
                    legalPerson: [
                        { validator: valLegalPerson, trigger: 'blur' }
                    ],
                    cardNo: [
                        { validator: valcardNo,trigger: 'blur' },
                    ],
                    bank:[
                        { validator: valBank,trigger: 'blur' },
                    ],
                    ird:[
                        {validator: valIrd,trigger: 'blur' },
                    ],
                    address:[
                        {validator:valAddress,trigger: 'blur' },
                    ],
                    phone:[
                       { validator: valPhone,trigger: 'blur' },
                    ]
                },
                Company_tixian_rules:{
                    amount: [
                        { validator: validateAmount2, trigger: 'blur' }
                    ]
                },
                tixian_personal_rules:{
                    amount: [
                        { validator: validateAmount, trigger: 'blur' }
                    ]
                },
                isbinding:false,
                isbinding2:false,
                TAB_prosonal:'',
                TAB_company:'',
                personage:true,
                company:false,
                tab:false,
                options: [
                    {
                        value: '中国银行',
                        label: '中国银行'
                    }, {
                        value: '中信银行',
                        label: '中信银行'
                    }, {
                        value: '浦发银行',
                        label: '浦发银行'
                    }, {
                        value: '广发银行',
                        label: '广发银行'
                    }, {
                        value: '中国工商银行',
                        label: '中国工商银行'
                    },{
                        value: '中国建设银行',
                        label: '中国建设银行'
                    },{
                        value: '中国农业银行',
                        label: '中国农业银行'
                    },{
                        value: '中国光大银行',
                        label: '中国光大银行'
                    }
                ],
                value: ''


            }
        },
        created(){
            this.getBalance()
            this.ifbinding()
        },
        methods: {
            re_bangding(){
                this.isbinding = false
            },
            re_bangding2(){
                this.isbinding2 = false
                this.binding_company.legalPerson = '',
                this.binding_company.cardNo = '';
                this.binding_company.bank = '';
                this.binding_company.ird = '';
                this.binding_company.address = '';
                this.binding_company.phone = '';
            },
            ifbinding(){
                let _this = this
                let url = MW_Live_API_URL + '/mwcurrency/getCardInfo.action'
                let formdata = new FormData()
                formdata.append('userId',getLStorage('user_id'))
                formdata.append('type','2')
                axios({
                    method: 'post',
                    url: url,
                    data:formdata,
                })
                .then((res)=>{
                    if(res.data.resultCode == "01"){
                        // 个人账户
                        _this.tixian_personal.cardNo =  res.data.params.cardNo
                        _this.tixian_personal.name =  res.data.params.name
                        _this.tixian_personal.bank =  res.data.params.bankOpen
                        _this.isbinding = true
                        _this.TAB_prosonal= true
                    }
                    _this.ifbinding2()
                }).catch((err)=>{
                    console.log(err)
                })
            },
            ifbinding2(){
                let _this = this
                let url = MW_Live_API_URL + '/mwcurrency/getCardInfo.action'
                let formdata = new FormData()
                formdata.append('userId',getLStorage('user_id'))
                formdata.append('type','3')
                axios({
                    method: 'post',
                    url: url,
                    data:formdata,
                })
                .then((res)=>{
                    if(res.data.resultCode == "01"){
                        _this.binding_company.legalPerson =  _this.Company_tixian.legalPerson =  res.data.params.name
                        _this.binding_company.cardNo = _this.Company_tixian.cardNo =  res.data.params.cardNo
                        _this.Company_tixian.ird = _this.binding_company.ird =  res.data.params.dutyNo
                        _this.Company_tixian.address = _this.binding_company.address =  res.data.params.address
                        _this.Company_tixian.phone = _this.binding_company.phone =  res.data.params.phone
                        _this.Company_tixian.bank  = _this.binding_company.bank =  res.data.params.bankOpen
                        _this.isbinding2 = true
                        _this.TAB_company = true
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
                        if(res.data.params.currencyBalanceRMB==null){
                            _this.tixian_personal.ifAmount =  0;
                        }
                       else{
                           _this.tixian_personal.ifAmount =  res.data.params.currencyBalanceRMB
                       }

                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            //提交绑定给后台
            sendBindInfo(no,name,cardNo,bankOpen,dutyNo,address,phone){
              //  debugger
                let _this = this
                let url = MW_Live_API_URL + '/mwcurrency/updateCardInfo.action'
                let formdata = new FormData()
                formdata.append('userId',getLStorage('user_id'))
                formdata.append('type',no)
                formdata.append('name',name)
                formdata.append('cardNo',cardNo)
                formdata.append('bankOpen',bankOpen)
                formdata.append('dutyNo',dutyNo)
                formdata.append('address',address)
                formdata.append('phone',phone)
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
            // 绑定个人账号
            bindingPerson(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.isbinding = true
                        // 把个人绑定数据绑定到个人提现
                        this.tixian_personal.name = this.bangding_personal.name
                        this.tixian_personal.cardNo = this.bangding_personal.cardNo
                        this.tixian_personal.bank = this.bangding_personal.bank
                        this.sendBindInfo("2",this.bangding_personal.name,this.bangding_personal.cardNo,this.bangding_personal.bank,"","","");
                    } else {

                    }
                });
            },
            bindingCompany(formName){
                var _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.Company_tixian.legalPerson = _this.binding_company.legalPerson
                        _this.Company_tixian.cardNo =_this.binding_company.cardNo
                        _this.Company_tixian.ird = _this.binding_company.ird
                        _this.Company_tixian.address =  _this.binding_company.address
                        _this.Company_tixian.bank   =_this.binding_company.bank
                        _this.Company_tixian.phone =_this.binding_company.phone
                        _this.isbinding2 = true
                        this.sendBindInfo("3",_this.binding_company.legalPerson,_this.binding_company.cardNo,_this.binding_company.bank, _this.binding_company.ird,_this.binding_company.address,_this.binding_company.phone);
                    } else {

                    }
                });
            },
            // 个人提现
            withdraw(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let _this = this
                        let url = MW_Live_API_URL + '/mwcurrency/addAmountCash.action'
                        let formdata = new FormData()
                        formdata.append('userId',getLStorage('user_id'))
                        formdata.append('type','2')//1支付宝,2个人账户,3企业账户
                        formdata.append('amount',_this.tixian_personal.amount)
                        formdata.append('name',_this.tixian_personal.name)
                        formdata.append('cardNo',_this.tixian_personal.cardNo)
                        formdata.append('bankOpen',_this.tixian_personal.bank)
                        axios({
                            method: 'post',
                            url: url,
                            data:formdata,
                        })
                        .then((res)=>{
                            if(res.data.resultCode == '01'){
                                _this.successMessage("提现成功")
                                this.getBalance()
                            }else{
                                _this.successMessage("提现失败","error")
                            }

                        }).catch((err)=>{
                            console.log(err)
                        })
                    } else {

                    }
                });
            },
            // 企业提现
            subCompany(formName){
                 this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let _this = this
                        let url = MW_Live_API_URL + '/mwcurrency/addAmountCash.action'
                        let formdata = new FormData()
                        formdata.append('userId',getLStorage('user_id'))
                        formdata.append('type','3')//1支付宝,2个人账户,3企业账户
                        formdata.append('amount',_this.Company_tixian.amount)
                        formdata.append('name',_this.binding_company.legalPerson)
                        formdata.append('cardNo',_this.binding_company.cardNo)
                        formdata.append('dutyNo',_this.binding_company.ird)
                        formdata.append('address',_this.binding_company.address)
                        formdata.append('phone',_this.binding_company.phone)
                        formdata.append('bankOpen',_this.binding_company.bank)
                        axios({
                            method: 'post',
                            url: url,
                            data:formdata,
                        })
                        .then((res)=>{
                            if(res.data.resultCode == '01'){
                                _this.successMessage("提现成功")
                                this.getBalance()
                            }else{
                                 _this.successMessage("提现失败","error")
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
            changeTab(type){
                if(type == 'personage'){
                    this.personage = true
                    this.company = false
                    if(this.TAB_prosonal){
                        this.isbinding = true
                    }

                }else{
                    this.personage = false
                    this.company = true
                    if(this.TAB_company==true) {
                        this.isbinding2 = true
                    }
                }
            }

        }
    }

</script>


<style scoped>
.withdraw .info_content{
    text-align: center;
    padding-left: 215px;
    width: 397px;
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
    margin-top: 10px ;
    font-size:16px;
}
.withdraw .tab_btn {
    /*margin:50px 0 20px 305px;*/
    margin:50px 0 20px 0;
}

.withdraw .tab_btn  .border_btn.el-button{
    width:140px;
    height:40px;
    line-height: 40px;
    background-color: #fff!important;
    color:#333333;
    border:1px solid #D9D9D9;

}
.withdraw .tab_btn .blue_btn.el-button {
    background-color: #2B6CFF!important;
    color: #fff!important;
    border: none!important;
    margin-left: 5px;
}
.btn_right{
 margin-left:15px!important;
}
.withdraw .my_select{
    position: relative;
    left:0px;

}
.withdraw_2 .info_content .col_4FF{
    position: absolute;
    top: 130px;
    left: 600px;
    width: 100px;
    cursor: pointer;

}
</style>
<style>
.withdraw .el-form-item {
    margin-bottom: 20px;
}
.withdraw .my_select.el-select .el-input__inner{
    width:300px;
    height:40px;
    border-radius: 2px;
    font-family: "Microsoft YaHei" ! important;
}
.withdraw .my_select.el-select .el-input__inner{
    background-color:#fff;
}
.withdraw .my_select.el-select .el-input__inner::-webkit-input-placeholder{
    color:#333333;
}
.withdraw .my_select.el-select .el-input__inner::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#333333;
}
.withdraw .my_select.el-select .el-input__inner:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#333333;
}
.withdraw .my_select.el-select .el-input__inner:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color:#333333;
}
.withdraw .el-form-item__content{
    width: auto;
}
</style>

