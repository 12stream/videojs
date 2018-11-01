<template>
    <div class="login_bg">
        <div class="login_middle">
            <el-row type="flex" class="row-bg" justify="center">
                <h3>
                    <login-head></login-head>
                </h3>
            </el-row>
            <div class="login_mode">
                <h3 class="ml30" style="font-weight: normal;font-size:18px;">为了保障您的权益，请绑定您的手机</h3>
                <p class="ml30 col-999">绑定后，使用手机也登录到您的账号</p>
                <el-form :model="formData" :rules="rules" ref="formData" class="demo-ruleForm">
                <div class="choice_login">
                    <el-row type="flex" class="row-bg" justify="center">
                        <el-col :span="12">
                            <div class="normal_in">
                                <el-form-item prop="Phone2">
                                    <i class="icon iconfont"><img src="http://montnets.facebac.com/montnet20170707/H5/videoplayer/bk11/static/img/administer.png" alt=""></i>
                                    <el-input type="tel" v-model="formData.Phone2" @keyup.enter.native="submitForm('formData')" auto-complete="off" placeholder="请输入手机号"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg" justify="center">
                        <el-col :span="12">
                            <div class="normal_in">
                                <el-form-item prop="imgCode">
                                    <i class="icon iconfont"><img src="http://montnets.facebac.com/montnet20170707/H5/videoplayer/bk11/static/img/code.png" alt=""></i>
                                    <el-input type="tel" v-model="formData.imgCode" @keyup.enter.native="submitForm('formData')" auto-complete="off" placeholder="图形验证码"></el-input>
                                    <div class="changeyzm" id="idcode"><img @click="_getImgCode" :src="regData.CodeImgUrl"></div>
                                </el-form-item>
                                <!-- <i class="icon iconfont icon-mima"></i>
                                <input type="password" v-model="password" placeholder="图形验证码">
                                <span>{{regData.passwordVal}}</span>
                                <div class="changeyzm" id="idcode"></div> -->
                            </div>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg mb20" justify="center">
                        <el-col :span="12">
                            <div class="normal_in">
                                <el-form-item prop="code">
                                    <i class="icon iconfont"><img src="http://montnets.facebac.com/montnet20170707/H5/videoplayer/bk11/static/img/yanzhengma.png" alt=""></i>
                                    <el-input type="tel" v-model="formData.code" @keyup.enter.native="submitForm('formData')" auto-complete="off" placeholder="动态密码"></el-input>
                                    <p class="get_ma form-code">
                                        <span class="cur-p" v-show="regData.show" @click="getCode()">获取验证码</span>
                                        <span class="col-666" v-show="!regData.show">{{regData.count + '秒再获取'}}</span>
                                    </p>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <div id="login_btn" class="login_btn" @click="submitForm('formData')">绑定账号</div>
                    <div class="mb20 mt10 te-c">
                        <span class="col-999" @click="dialogVisible = true">绑定代表您已同意梦网云播</span>
                        <span class="clause register-link default-color cur-p" @click="dialogVisible = true">服务条款</span>
                    </div>
                </div>
                </el-form>
            </div>
        </div>
            <div v-show="dialogVisible" class="dialogVisible_bg">
                <div  class="dialogVisible te-l">
                    <h1 id="locked" onselectstart="return false;">梦网云播服务条款<span class="span cur-p"  @click="dialogVisible = false" href="javascript:void(0);">关闭</span></h1>
                        <div class="xieyi_innner">
                            <h3>用户协议</h3>
                            <p><strong>1、梦网云播使用协议的接受</strong></p>
                            <p>通过访问和/或使用本网站，您表示同意接受本协议的所有条件和条款。梦网云播（以下简称“梦网云播”）作为梦网云播的运营者依据本协议为您提供服务。如果您不愿接受本协议的全部条件和条款，请您不要访问或使用本网站。</p>
                            <p><strong>2、本协议的变更和修改</strong></p>
                            <p>梦网云播有权随时对本协议进行修改，并且一旦发生协议条款的变动，梦网云播将在相关页面上提示修改的内容；用户如果不同意本协议的修改，可以放弃使用或访问本网站或取消已经获得的服务；如果用户选择在本协议变更后继续访问或使用本网站，则视为用户已经接受本协议的修改。</p>
                            <p><strong>3、服务说明</strong></p>
                            <p>（1）梦网云播是一个向广大用户提供网络直播的服务平台，本身不直接生产内容。</p>
                            <p>（2）梦网云播运用自己的系统通过互联网向用户提供服务，除非另有明确规定，增强或强化目前服务的任何新功能，包括新产品以及新增加的服务，均无条件地适用本协议。</p>
                            <p>（3）梦网云播对网站服务不承担任何责任，公司不保证服务一定会满足用户的使用要求，也不保证服务不会被中断，对服务的及时性、安全性、准确性也不作担保。</p>
                            <p><strong>4、用户行为：</strong></p>
                            <p>4.1用户帐号、密码安全</p>
                            <p>用户一旦注册成功，便成为梦网云播的合法用户，将得到一个密码和帐号。用户应采取合理措施维护其密码和帐号的安全。用户对利用该密码和帐号所进行的一切活动负全部责任；由该等活动所导致的任何损失或损害由用户承担，梦网云播不承担任何责任。</p>
                            <p>用户的密码和帐号遭到未授权的使用或发生其他任何安全问题，用户可以立即通知梦网云播，并且用户在每次连线结束，应结束帐号使用，否则用户可能得不到梦网云播的安全保护。对于用户长时间未使用的帐号，梦网云播有权予以关闭。</p>    
                            <p>4.2用户应遵守以下法律及法规</p>
                            <p>用户同意遵守《中华人民共和国保守国家秘密法》、《中华人民共和国著作权法》、《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、《互联网电子公告服务管理规定》、《信息网络传播权保护条例》等有关计算机及互联网规定的法律、法规、实施办法。在任何情况下，梦网云播合理地认为用户的行为可能违反上述法律、法规，梦网云播可以在任何时候，不经事先通知终止向该用户提供服务。</p>
                            <p>梦网云播欢迎用户举报任何违反上述法律或侵犯他人权利的上传内容，一经发现违法或侵权的上传内容，梦网云播直播将无条件删除。</p>
                            <p>4.3用户申请提现平台规则制度</p>
                            <p>（1）平台单笔提现额度为最低2元（贰圆）到最高20000元（贰万圆）之间;</p>    
                            <p>（2）提现时，平台收取总提现金额10%的手续费,其中已包含第三方手续费；</p>
                            <p>（3）从申请提现时间起，3-5个工作日提现金额将会转入指定账户。</p>
                            <p>4.4禁止用户从事以下行为</p>
                            <p>（1）直播、录播、预约直播或传送包含任何反对宪法所确定的基本原则、危害国家安全、泄露国家秘密、颠覆国家政权、破坏国家统一、破坏民族团结、损害国家荣誉和利益、煽动民族仇恨、民族歧视、破坏民族团结、破坏国家宗教政策、宣扬邪教和封建迷信、淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪、侮辱或者诽谤他人，侵害他人合法权益的等法律、行政法规禁止的内容或其他另人反感的包括但不限于资讯、资料、文字、软件、音乐、照片、图形、视频、信息或其他资料（以下简称内容）。</p>
                            <p>（2）以任何方式危害未成年人。</p>
                            <p>（3）冒充任何人或机构，或以虚伪不实的方式谎称或使人误认为与任何人或任何机构有关。</p>
                            <p>（4）伪造标题或以其他方式操控识别资料，使人误认为该内容为梦网云播直播所传送。</p>
                            <p>（5）将无权传送的内容（例如内部资料、机密资料）进行直播、录播、预约直播或以其他方式传送。</p>
                            <p>（6）将侵犯任何人的专利、商标、著作权、商业秘密或其他专属权利之内容加以直播、录播、预约直播或以其他方式传送。</p>
                            <p>（7）将广告函件、促销资料、"垃圾邮件"等，加以直播、录播、预约直播或以其他方式传送。供前述目的使用的专用区域除外。</p>
                            <p>（8）将有关干扰、破坏或限制任何计算机软件、硬件或通讯设备功能的软件病毒或其他计算机代码、档案和程序之资料，加以直播、录播、预约直播或以其他方式传送。</p>
                            <p>（9）干扰或破坏本网站服务或与本网站服务相连的服务器和网络，或不遵守本网站使用之规定。</p>
                            <p>（10）故意或非故意违反任何相关的中国法律、法规、规章、条例等其他具有法律效力的规范。</p>
                            <p>4.4用户对经由本网站直播、录播、预约直播或评论传送的内容承担全部责任为</p>
                            <p>对于经由本网站而传送的内容，梦网云播不保证前述其合法性、正当性、准确性、完整性或品质。用户在接受本网站服务时，有可能会接触到令人不快、不适当或令人厌恶的内容。在任何情况下，梦网云播均不对任何内容承担任何责任，包括但不限于任何内容发生任何错误或纰漏以及衍生的任何损失或损害。梦网云播有权（但无义务）自行拒绝或删除经由本网站提供的任何内容。用户使用上述内容，应自行承担风险。梦网云播权利在下述情况下，对内容进行保存或披露：</p>
                            <p>（1）法律程序所规定；</p>
                            <p>（2）本服使用协议规定；</p>
                            <p>（3）被侵害的第三人提出权利主张；</p>
                            <p>（4）为保护梦网云播、其使用者及社会公众的权利、财产或人身安全；</p>
                            <p>（5）其他梦网云播认为有必要的情况。</p>
                            <p>4.5对用户信息的存储和限制</p>
                            <p>梦网云播不对用户所发起直播的删除或储存失败承担责任。对于免费用户，梦网云播仅保存其回放内容15天。梦网云播有权判断用户的行为是否符合本网站使用协议条款之规定，如果梦网云播认为用户违背了协议条款的规定，梦网云播有终止向其提供网站服务的权利。</p>
                            <p><strong>5、用户隐私权制度</strong></p>
                            <p>当用户注册梦网云播的服务时，用户须提供个人信息。梦网云播收集个人信息的目的是为用户提供尽可能多的个人化网上服务以及为广告商提供一个方便的途径来接触到适合的用户，并且可以发送具有相关性的内容和广告。在此过程中，广告商绝对不会接触到用户的个人信息。梦网云播不会在未经合法用户授权时，公开、编辑或透露其个人信息及保存在梦网云播中的非公开内容，除非有下列情况：</p>
                            <p>（1）有关法律规定或梦网云播合法服务程序规定；</p>
                            <p>在紧急情况下，为维护用户及公众的权益；</p>
                            <p>为维护梦网云播的商标权、专利权及其他任何合法权益；</p>
                            <p>（4）其他需要公开、编辑或透露个人信息的情况。</p>
                            <p><strong>在以下（包括但不限于）几种情况下，梦网云播有权使用用户的个人信息：</strong></p>
                            <p>（1）在进行促销或抽奖时，梦网云播可能会与赞助商共享用户的个人信息，在这些情况下梦网云播会在发送用户信息之前进行提示，并且用户可以通过不参与来终止传送过程。</p>
                            <p>（2）梦网云播可以将用户信息与第三方数据匹配。</p>
                            <p>（3）梦网云播会通过透露合计用户统计数据，向未来。 </p>
                            <p>（4）用户购买在梦网云播列出的商品或服务时，梦网云播获得的信息及用户提供的信息（例如用户的信用卡号和联系信息）会提供给商家，这些商家会进行数据收集操作，但梦网云播对商家的此种操作不负任何责任。</p>
                            <p>（5）梦网云播会向用户发送关于梦网云播不同产品和服务的信息或者梦网云播认为用户会感兴趣的其他产品和服务。如果用户不希望收到这样的邮件，只需在提供个人信息时或其他任何时候告知梦网云播即可。另外，梦网云播会竭尽全力保护用户的信息，但梦网云播不能确信或保证任何个人信息的安全性，用户须自己承担风险。</p>
                            <p><strong>6、关于用户在梦网云播发起直播的内容：</strong></p>
                            <p>（1）用户发起直播的内容是指用户在网站及移动客户端以自助形式发布的视频或其它任何形式的内容包括文字、图片、音频、信息、资料等。</p>
                            <p>（2）除非梦网云播收到相反通知，梦网云播将用户视为其在本网站上载或发布的内容的版权拥有人。用户在本网站上载或发布内容即视为其同意授予梦网云播所有上述内容的在全球范围内的免费、不可撤销的无限期的并且可转让的非独家使用权许可，梦网云播有权展示、散布及推广前述内容，有权对前述内容进行任何形式的复制、修改、出版、发行及以其他方式使用或者授权第三方进行复制、修改、出版、发行及以其他方式使用。</p>
                            <p>（3）因用户进行上述内容在本网站的上载或发布，而导致任何第三方提出索赔要求或衍生的任何损害或损失，由用户承担全部责任。</p>
                            <p><strong>7、关于第三方链接</strong></p>
                            <p>本网站服务可能会提供与其他国际互联网网站或资源进行链接。对于前述网站或资源是否可以利用，梦网云播承担担保责任。因使用或依赖上述网站或资源所生的损失或损害，梦网云播也不负担任何责任。</p>
                            <p><strong>8、梦网云播的知识产权及其他权利</strong></p>
                            <p>（1）梦网云播对网站服务及本网站所使用的软件所包含的受知识产权或其他法律保护的资料享有相应的权利；除用户依法享有之版权之内容之外，本网站的整体内容版权归梦网云播所有。</p>
                            <p>（2）经由本网站发起的直播及其它内容，受到著作权法、商标法、专利法或其他法律的保护；除该直播及其它内容上载的用户所享有的版权，未经梦网云播明示授权许可，其他用户不得进行修改、出租、散布或衍生其他作品。</p>
                            <p>（3）用户对本网站所使用的软件有非专属性使用权，但不得自行或许可任何第三方复制、修改、出售或衍生产品。</p>
                            <p>（4）本网站所有设计图样以及其他图样、产品及服务名称，均为梦网云播直播及/或其关联公司所享有的商标、标识。任何人不得使用、复制或用作其他用途。</p>
                            <p>（5）梦网云播对其专有内容、原创内容和其他通过授权取得的独占或则独家内容享有完全知识产权。未经梦网云播许可，任何单位和个人不得私自转载、传播和提供观看服务或者有其他侵犯梦网云播知识产权的行为。否则，将承担法律责任。</p>
                            <p><strong>9、免责声明</strong></p>
                            <p>（1）梦网云播对于任何自本网站而获得的他人的信息、内容或者广告宣传等任何资讯（以下统称“信息”），不保证真实、准确和完整性。如果任何单位或者个人通过上述“信息”而进行任何行为，须自行甄别真伪和谨慎预防风险，否则，无论何种原因，本网站不对任何非与本网站直接发生的交易和/或行为承担任何直接、间接、附带或衍生的损失和责任。</p>
                            <p>（2）梦网云播有权但无义务，改善或更正本网站任何部分之任何疏漏、错误。</p>
                            <p>（3）梦网云播不保证（包括但不限于）：</p>
                            <p class="p_kaitou"> a.本网站适合用户的使用要求；</p>
                            <p class="p_kaitou"> b.本网站不受干扰，及时、安全、可靠或不出现错误；</p>
                            <p class="p_kaitou"> c.用户经由本网站取得的任何产品、服务或其他材料符合用户的期望。</p>
                            <p>（4）用户使用经由本网站下载的或取得的任何资料，其风险自行负担；因该等使用导致用户电脑系统损坏或资料流失，用户应负完全责任；</p>
                            <p>（5）基于以下原因而造成的利润、商业信誉、资料损失或其他有形或无形损失，梦网云播不承担任何直接、间接、附带、衍生或惩罚性的赔偿：</p>
                            <p class="p_kaitou"> a.本网站使用或无法使用；</p>
                            <p class="p_kaitou"> b.经由本网站购买或取得的任何产品、资料或服务；</p>
                            <p class="p_kaitou"> c.用户资料遭到未授权的使用或修改；</p>
                            <p class="p_kaitou"> d.其他与本网站相关的事宜。</p>
                            <p>（6）用户在浏览互联网时自行判断使用本网站的搜索或检索目录。该搜索或检索目录可能会引导用户进入到被认为具有攻击性或不适当的网站，梦网云播没有义务查看检索目录所列网站的内容，因此，对其正确性、合法性、正当性不负任何责任。</p>
                            <p><strong>10、第三方责任</strong></p>
                            <p>由于用户经由本网站上载或发布内容、与本网站连线、违反本服务条款或侵害其他人的任何权利导致任何第三人提出权利主张，用户同意赔偿梦网云播及其分公司、关联公司、代理人或其他合作伙伴及员工，并使其免受损害。</p>
                            <p><strong>11、服务的终止</strong></p>
                            <p>梦网云播有权在任何时候，暂时或永久地终止本网站服务（或任何一部分），无论是否通知。梦网云播对本网站服务的终止对用户和任何第三人不承担任何责任。梦网云播有权基于任何理由，终止用户的帐号、密码或使用本服务，或删除、转移用户存储、发布在本服务的内容，梦网云播采取上述行为均不需通知，并且对用户和任何第三人不承担任何责任。</p>
                            <p><strong>12、通知</strong></p>
                            <p>梦网云播向用户发出的通知，采用电子邮件或页面公告的形式。本协议条款的修改或其他事项变更时，梦网云播将会以上述某一形式进行通知。</p>
                            <p><strong>13、法律的适用和管辖</strong></p>
                            <p>本使用协议的生效、履行、解释及争议的解决均适用中华人民共和国法律，与本协议有关的争议提交由梦网云播服务器所在地的法院管辖。本服务条款因与中华人民共和国现行法律相抵触而导致部分无效，不影响其他部分的效力。</p>
                        </div>
            </div>
        </div>
    <m-footer></m-footer>
    </div>
</template>

<script>
    import LoginHead from 'components/header/loginHead'
    import {ERR_OK,DATA_URL,setCookie,getCookie,removeCookie,setLStorage,getLStorage,DEFAULT_IMGICON,setSNumber,SETUSERICON,GetQueryString} from 'api/config'
    import {getNewTime} from 'api/http'
    import md5 from 'js-md5'
    import axios from 'axios'
    import mFooter from 'components/header/footer'
    const TIME_COUNT = 60

    export default{
        data(){
            let PhoneExp = /^[18][34567890]\d{9}$/
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
                        callback(new Error('请输入正确的验证码!'))
                    }
                    callback()
                }
            }
            var validateImgCode = (rule, value, callback) => {
                if (this.activeName == 'login_second' && value === '') {
                    callback(new Error('请输入图形验证码'))
                } else {
                    if (this.activeName == 'login_second' && value.length !== 4) {
                        callback(new Error('请输入正确的图形验证码!'))
                    }
                    callback()
                }
            }
            return {
                formData:{
                    automatic:false,
                    Phone2:'',
                    code:'',
                    imgCode:''
                },
                rules: {
                    Phone2: [
                        { validator: checkAge2, trigger: 'blur' }
                    ],
                    code:[
                        { validator: validateCode, trigger: 'blur' }
                    ],
                    imgCode:[
                        { validator: validateImgCode, trigger: 'blur' }
                    ]
                },
                activeName: 'login_second',
                regData:{
                    show : true,   //默认是停止的，但界面加载之后会变成false
                    count:'',
                    CodeImgUrl:'http://mwlivetest.facebac.com/api/mwlive/user/user_code_vue.do'
                },
                icon_weixin:false,
                setCodeVal:'',
                isTrue:{
                    phone1:false,
                    phone2:false,
                },
                dialogVisible:false
            }
        },
        created(){
            // this._isLogin()
            if(!getLStorage('code_key')){
                this.setCodeVal = this.setCode()
                setLStorage('code_key',this.setCodeVal)
            }
            // console.log(getLStorage('code_key'))
            this._getImgCode()
            setTimeout(() => {
                console.log(this.$route.query.id,this.$route.query.user_icon_url,this.$route.query.user_name)
            }, 1000);
        },
        methods:{
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
            _getImgCode(){
                var time = getNewTime()
                let setCode = this.setCode()
                this.regData.CodeImgUrl = DATA_URL + 'mwlive/user/user_code_vue.do?time=' + time + '&code_key=' + setCode
                // this.regData.CodeImgUrl = 'http://sa25he.natappfree.cc/montnets-project-mwlive/api/mwlive/user/user_code_vue.do?time=' + time + '&code_key=' + setCode

                setLStorage('code_key',setCode)
            
            },
            _isLogin(){
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
            
            setCookie(name,value){
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
                            var url=DATA_URL + 'mwlive/user/user_code_check.do';
                            let formdata = new FormData()
                            formdata.append('code_key', getLStorage('code_key'))
                            formdata.append('code', this.formData.imgCode)
                            axios({
                                method: 'post',
                                url: DATA_URL + 'mwlive/user/user_code_check_vue.do',
                                data:formdata,
                                headers: {
                                    "Content-Type":"application/json;charset=utf-8"
                                },
                                withCredentials : true
                            })
                            .then((response) => {
                                if(response.data.code != ERR_OK){
                                    this.$message({
                                        message: '图形验证码错误',
                                        type: 'error'
                                    })
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
            _login(){
                let url
                let formdata = new FormData()
                console.log(this.$router.query)
                formdata.append('mobile',this.formData.Phone2)
                formdata.append('password','71b596cb42ee254f7416043d184fc970')
                formdata.append('sm_code',this.formData.code)
                formdata.append('type',this.$route.query.type)
                formdata.append('user_icon_url',this.$route.query.user_icon_url)
                formdata.append('third_id',this.$route.query.third_id)
                formdata.append('user_name',this.$route.query.user_name)
                url = DATA_URL + 'mwlive/user/third_user_reg.do'
                axios({
                    method: 'post',
                    url: url,
                    data:formdata,
                    headers: {'Content-Type': 'multipart/form-data'}
                })
                .then((res)=>{
                    console.log('setPhone ',res)
                    if(res.data.code == ERR_OK){
                        setLStorage('iconImg',res.data.data.user_icon_url)
                        setLStorage('admin',res.data.data.user_name)
                        setLStorage('user_id',res.data.data.id)
                        // 跳转
                        this.$router.push({
                            path:'/index'
                        })
                    }else{
                        this.$message({
                           showClose: true,
                           message: '绑定失败',
                           type: 'error'
                       })
                    }


//                     if(res.data.code == ERR_OK){
//                         if(this.formData.automatic == 1){
//                             this._isFlag()
//                             setCookie('user_id',res.data.data.id)
//                         }
// //                        this.$message({
// //                            showClose: true,
// //                            message: '登录成功！',
// //                            type: 'success'
// //                        })
//                         // setLStorage('admin',res.data.data.mobile)
//                         setLStorage('user_id',res.data.data.id)
//                         if(res.data.data.user_title == null && res.data.data.user_icon_id == null || res.data.data.user_title == "" && res.data.data.user_icon_id == ""){
//                             //设置空用户名
//                             this.editUserInfo(true,true)
//                         }else if(res.data.data.user_title == null || res.data.data.user_title == ""){
//                             this.editUserInfo(true,false)
//                         }else if(res.data.data.user_icon_id == null || res.data.data.user_icon_id == ""){
//                             this.editUserInfo(false,false)
//                         }else{
//                             setLStorage('admin',res.data.data.user_title)
//                             setLStorage('iconImg',res.data.data.user_icon_url)
//                             // 跳转
//                             this.$router.push({
//                                 path:'/index'
//                             })
//                         }
                        
//                         // if(res.data.data.user_icon_url !== null){
//                         //     setLStorage('iconImg',res.data.data.user_icon_url)
//                         // }else{
//                         //     setLStorage('iconImg',DEFAULT_IMGICON)
//                         //     // 跳转
//                         //     this.$router.push({
//                         //         path:'/index'
//                         //     })
//                         // }
//                     }else{
//                         this._getImgCode()
//                         if(this.activeName == 'login_second'){
//                             this.$message({
//                                 showClose: true,
//                                 message: '您输入的验证码错误！',
//                                 type: 'error'
//                             })
//                         }else{
//                             this.$message({
//                                 showClose: true,
//                                 message: '您输入的手机号或密码错误！',
//                                 type: 'error'
//                             })
//                         }
//                     }
                }).catch((err)=>{
                    this.$message({
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
                setCookie('password',md5(this.formData.password))
                console.log('_isFlag')
            },
            getCode(){
                let PhoneExp = /^[18][34567890]\d{9}$/
                if(this.formData.Phone2 == '' && !PhoneExp.test(this.formData.Phone2)){
                    this.$message({
                        showClose: true,
                        message: '请输入正确的手机！',
                        type: 'error'
                    });
                    return false
                }
                // 获取短信验证码
                axios.get(DATA_URL + 'mwlive/user/user_reg_getsm.do',{
                    params:{
                        mobile:this.formData.Phone2,
                        oper_time:getNewTime()
                    }
                })
                .then((response)=>{
                    console.log('user_edit_getsm',response)
                    if(response.data.code == ERR_OK){
                        this.$message('发送成功')
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
                    else if(response.data.code == 410){
                        this.$message({
                            showClose: true,
                            message: '用户已存在',
                            type: 'error'
                        });
                    }else{
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
           
            toggleClass(){
                this.icon_weixin = !this.icon_weixin
            }

        },
        components:{
            LoginHead,
            mFooter

        }
  }
</script>

<style scoped>
html,body{
    height: 100%
}
.login_bg{
    padding: 0;
    /* position: absolute;
    left:0;
    top:0; */
    width: 100%;
    height:100%;
    /* background: url("../../common/image/body_bg.jpg") no-repeat center; */
    background: url("http://montnets.facebac.com/montnet20170707/H5/videoplayer/bk11/static/img/body_bg.jpg") no-repeat center;
    background-attachment: fixed;
    background-size: cover;
    font-family: "Microsoft Yahei";
    
}
.login_middle{
    width:430px;
    height: auto;
    /* position: absolute; */
    /* top:43%; */
    /* top:187px;
    left:50%;
    transform:translate(-50%,0%); */
}

.login_mode{
    padding: 24px;
    background-color: #ffffff;
    border-radius: 6px;
    /* height: 406px; */
    position: relative;
}
.login-sub{
    font-size: 16px;
    width: 98%;
    height: 46px;
    line-height: 46px;
    margin-top:52px;
}
.register-link{
    cursor: pointer
}
.normal_in {
    width: 100%;
    height: 40px;
    /* border: 1px solid #dddddd; */
    margin-top: 25px;
    position: relative;
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
    width: 100px;
    height: 35px;
    position: absolute;
    right: 3px;
    top: 3px;
    /* background-color: #00b0fe; */
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
    width: 310px;
    margin: 0 auto;
    height: 42px;
    text-align: center;
    line-height: 42px;
    background-color: #58cafd;
    border-radius: 2px;
    color: #ffffff;
    font-size: 20px;
    /* letter-spacing: 5px; */
    /* position: absolute;
    bottom: 90px;
    left: 0;
    right: 0; */
    cursor: pointer;
}
.login_btn:hover{
    background-color: #5FAEFF;
}
.login_btn:active{
    background-color: #0068D2;
}
.get_ma {
    width: 100px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background-color: #58cafd;
    color: #ffffff;
    font-size: 14px;
    position: absolute;
    right: 3px;
    top: 3px;
    border: none;
    letter-spacing: 2px;
    cursor: pointer;
}
.share_model .icon{
    font-size: 50px;
    transition: all .5s;
}
.share_model P{
    color:#a6a6a6;
}
.icon-weixin,.icon-iconfont17,.icon-weibo{
    color:#a6a6a6;
}
/* .icon-weixin3{
    color:#52b837;
} */
.icon-weixin33{
    color:#52b837;
}

#locked{
    position: relative;
    display: block;
    margin: 0;
    padding: 0;
    font-size: 13px;
    height: 42px;
    line-height: 42px;
    padding-left: 20px;
    font-family: Arial;
    background: #00b0fe;
    font-weight: normal;
    font-weight: 800;
    color: #FFF;
}
#locked span {
    position: absolute;
    display: block;
    right: 0px;
    top: 0px;
    width: 42px;
    height: 42px;
    display: inline-block;
    color: #ffffff;
    opacity: 0.6;
}
.dialogVisible_bg{
    position: fixed;
    z-index: 99;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
}
.dialogVisible{
    position: fixed;
    width: 1000px;
    height: 620px;
    background: #fff;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
}
.xieyi_innner{
    overflow: auto;
    padding: 0 70px;
    height: 575px;
    margin: 0 auto;
}
.xieyi_innner h3{
    border-bottom: 1px solid #efefef;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    margin: 1.33em 0;
}
.xieyi_innner p{
    line-height: 30px;
    font-size: 16px;
    margin: 1em 0;
}
.xieyi_innner .p_kaitou{
    text-indent: 2em;
}
</style>
<style>
.choice_login .el-tabs__header{
    border-bottom:1px solid #edeff0;
}
.choice_login .el-tabs__nav{
 
    padding-bottom:26px;
}
.choice_login .el-tabs__active-bar{
    background-color: #ffffff;
    bottom:-4px;
}
.choice_login .el-tabs__item{
    /* width:50%; */
    font-size:18px;
    text-align:center;
  
}
.choice_login .el-tabs__item:last-child{
    border-right:none;
}
.choice_login .el-col-12{
    width:86%;
}
.login_mode .el-input__inner{
    /* padding-left: 55px; */
    height: 40px;
}


/* .login_middle .el-tabs__item.is-active{
    color: #00b0fe !important;
} */
</style>
