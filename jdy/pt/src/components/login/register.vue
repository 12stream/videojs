<template>
    <div class="register">
        <bg-head></bg-head>
        <div class="login_middle">
            <el-row type="flex" class="row-bg" justify="center">
                <h3>
                    <login-head></login-head>
                </h3>
            </el-row>

            <div class="login_mode">
                <h3 class="look_title">注册</h3>
                <router-link tag="div" class="cur-p in_text posi_ab" to="/login">
                    已有账号，<span class="register-link col-666">马上登录</span>
                </router-link>
            <el-form :model="formData" :rules="rules" ref="formData" class="demo-ruleForm">
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col>
                        <div class="normal_in">
                            <el-form-item prop="Phone">
                                <!-- <i class="icon iconfont"><img src="http://montnets.facebac.com/montnet20170707/H5/videoplayer/bk11/static/img/administer.png" alt=""></i> -->
                                <el-input :maxlength="11"  @keyup.enter.native="submitForm('formData')" type="tel"  v-model="formData.Phone" auto-complete="off" placeholder="请输入手机号"></el-input>
                                <!-- <div v-show="isPhone" class="el-form-item__error">用户已存在，请输入新的手机！</div> -->
                                <!-- <input type="tel" v-model="formData.Phone" placeholder="手机">
                                <span class="register_prompt">{{regData.PhoneVal}}</span> -->
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col>
                        <div class="normal_in">
                            <el-form-item prop="password">
                                <!-- <i class="icon iconfont"><img src="http://montnets.facebac.com/montnet20170707/H5/videoplayer/bk11/static/img/code.png" alt=""></i> -->
                                <el-input :maxlength="16" @keyup.enter.native="submitForm('formData')"  type="password" v-model="formData.password" auto-complete="off" placeholder="请输入密码"></el-input>
                                <!-- <input type="password" v-model="formData.password" placeholder="密码"> -->
                            </el-form-item>
                            <!-- <span class="register_prompt">{{regData.passwordVal}}</span> -->
                        </div>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col>
                        <div class="normal_in">
                            <el-form-item prop="ConfirmPassword">
                                <!-- <i class="icon iconfont"><img src="http://montnets.facebac.com/montnet20170707/H5/videoplayer/bk11/static/img/code.png" alt=""></i> -->
                                <el-input :maxlength="16" @keyup.enter.native="submitForm('formData')"  type="password" v-model="formData.ConfirmPassword" auto-complete="off" placeholder="请再次输入密码"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg mb10" justify="center">
                    <el-col>
                        <div class="normal_in">
                            <el-form-item prop="code" class="yzm_box">
                                <!-- <i class="icon iconfont"><img src="http://montnets.facebac.com/montnet20170707/H5/videoplayer/bk11/static/img/yanzhengma.png" alt=""></i> -->
                                <el-input :maxlength="5" @keyup.enter.native="submitForm('formData')"  type="tel" v-model="formData.code" auto-complete="off" placeholder="请输入手机验证码"></el-input>
                                <p class="get_ma form-code">
                                    <span class="cur-p" v-show="regData.show" @click="getCode">获取验证码</span>
                                    <span class="col-666" v-show="!regData.show">{{regData.count + '秒后重新获取'}}</span>
                                </p>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col>
                        <div class="login-sub but-col col-fff te-c cur-p" @click="submitForm('formData')">注册</div>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg fuwu_tiaokuan" justify="center">
                    <el-col>
                        <div class="normal_in clear fj_text">
                            <el-form-item prop="type">
                                <!-- <el-checkbox-group class="fl" v-model="formData.type"> -->
                                    <!-- <el-checkbox label="注册即同意相关" v-model="formData.type" name="type"></el-checkbox> -->
                                <!-- </el-checkbox-group> -->
                                <span>注册即同意相关</span>
                                <span class="clause register-link col-666  cur-p" @click="dialogVisible = true">服务条款</span>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <!-- <el-row class="mt20 mb20 share_model">
                    <el-col :span="8" class="te-c">
                        <div class="d-ib cur-p">
                            <span class="icon iconfont icon-qq1" :class="{ 'icon-qq33' : icon_qq}" @mouseleave="toggleClassQQ" @mouseenter="toggleClassQQ" @click="qqLogin"></span>
                            
                        </div>
                    </el-col>
                    <el-col :span="8" class="te-c">
                        <div class="d-ib cur-p">
                            <span class="icon iconfont icon-weixin-copy"  :class="{ 'icon-weixin33' : icon_weixin}" @mouseleave="toggleClassWX" @mouseenter="toggleClassWX" @click="weixinLogin"></span>
                        </div>
                    </el-col>
                    <el-col :span="8" class="te-c">
                        <div class="d-ib cur-p">
                            <span class="icon iconfont icon-weibo2" :class="{ 'icon-weibo33' : icon_weibo}" @mouseleave="toggleClassWB" @mouseenter="toggleClassWB" @click="weiboLogin"></span>
                        </div>
                    </el-col>

                </el-row> -->
            </el-form>
            </div>
        </div>
        <div v-show="dialogVisible" class="dialogVisible_bg">
            <div  class="dialogVisible te-l">
            <h1 id="locked" onselectstart="return false;">梦网云播服务条款<span class="span cur-p"  @click="dialogVisible = false" href="javascript:void(0);">关闭</span></h1>
                <div class="xieyi_innner">
                        <h3>用户协议</h3>
                        <p><strong>【总则】</strong></p>
                    <p>
                    		尊敬的用户，您好！欢迎您使用梦网云播软件及服务！<br />
                            使用梦网云播软件（以下统称"本软件"）及服务，您应当阅读并遵守本协议，否则您无权下载、安装或使用本软件及相关服务。<br />
                            您的下载、安装、使用、登录等行为即视为您已阅读并同意本协议的约束。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款，以及开通或使用某项服务的单独协议。<br />
                            如果您未满18周岁，请在法定监护人的陪同下阅读本协议，并特别注意未成年人使用条款。<br />
                    </p>
                    		<h4>一、用户行为规范</h4>
                    <p>
                    		1.1 凡是下载、浏览和发布内容的用户均为梦网云播用户(以下统称"用户")。<br />
							1.2 用户享有言论自由的权利。<br />
                            1.3 用户需遵守《中华人民共和国保守国家秘密法》、《中华人民共和国著作权法》、《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、《互联网电子公告服务管理规定》、《信息网络传播权保护条例》等相关法律、法规和实施办法。如果用户行为可能违反上述法律、法规，梦网云播可以在任何时候，不经事先通知终止向该用户提供服务。<br />
                            1.4内容审核标准<br />
                            严重违规行为（A类违规）<br />
                            严重违规行为是指严重违反国家相关法律法规的行为。在视频直播中若出现以下行为，将构成严重违规，包括但不限于：<br />
							(1) 发表反党反政府的言论，或做出侮辱诋毁党和国家的行为，如：
                            <span>违反宪法确定的基本原则的；</span>
                            <span>危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</span>
                            <span>损害国家荣誉和利益的；</span>
                            <span>煽动民族仇恨、民族歧视，破坏民族团结的；</span>
                            <span>破坏国家宗教政策，宣扬邪教和封建迷信的；</span>
                            <span>散布谣言，扰乱社会秩序，破坏社会稳定的；</span>
                            <span>散布暴力、恐怖或者教唆犯罪的；</span>
                            <span>煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的；</span>
                            <span>其他可能引起或已经引起不良影响的政治话题</span>
                            (2) 进行具有性挑逗性质的表演。如表演脱衣舞等。<br />
							(3) 与他人进行互相性挑逗形式的表演。如相互抚摸敏感部位、进行能让人产生性幻想的动作、在床上以任何抚摸形式进行表演等。<br />
                            (4) 展示具有性特征的身体敏感部位。如展示女性胸部、男女性臀部、男女大腿内侧及生殖器官、穿透视装等。<br />
                            (5) 展示枪支刀具、进行高危表演。如晃动刀具、枪支、高仿真枪支、表演具有高度危险性的节目等。<br />
                            (6) 表演危害他人人身安全的节目。如：殴打他人、以枪支刀具威胁他人等。<br />
                            (7) 传播毒品。如展示毒品样品、表演及传授毒品吸食或注射方式、讲解毒品制作过程等。<br />
                            (8) 宣传传销机构、哄骗用户加入传销组织、或本人组织传销。<br />
                            (9) 表演危害自身安全的节目，如自杀、自残。<br />
                            (10) 进行其他类涉政、涉黄、违法、侵权、或威胁生命健康的表演。<br />

                            一般违规行为（B类违规）<br>
                            一般违规行为是指违反国家相关法律法规，但在程度上相对轻微的违规行为。在视频直播中若出现以下行为，将造成一般违规，包括但不限于：<br>
                            (1) 在直播间发表或播放低俗言论、持续模仿各种带有性挑逗的声音。<br>
                            (2) 通过模仿色情动作或进行自我抚摸、并企图暴露敏感部位等引起性挑逗的行为。<br>
                            (3) 持续爆粗口、谩骂，或演唱带有黄色、擦边、粗口、暴力等违禁歌曲。<br>
                            (4) 穿戴或展示浴袍、内衣裤等非公众场合衣物；cos类妆容低俗、不雅；酒后直播表现耍酒疯、酣睡等醉态；或使用性用品作为表演道具，使用道具模仿带有低俗等动作。<br>
                            (5) 穿着过于暴露，男性赤裸上身，女性着透视装、肉色紧身内衣、三点式露脐泳装，着过于暴露服装，或长时间将镜头聚焦于某敏感部位、通过拉扯或使用道具引起观众对敏感部位的注意等。<br>
                            (6) 躺在床上直播。<br>
                            (7) 身着带有中华人民共和国（包含港澳台）国家行政机关人员军衔的工作制服进行直播。包括警服、军服、工商制服、检察院制服、法院制服、城管制服、路政制服等。<br>
                            (8) 在直播镜头前抽烟。<br>
                            (9) 在进行视频直播时播放录制的电影、电视剧等未经版权许可的视频。<br>
                            (10) 直播过程中玩整人游戏，包括但不限于拉丝、坐气球、机震、打屁股、抖胸抖臀等性暗示动作。<br>
                            (11) 直播过程中表演低俗舞蹈动作，包括但不限于：<br>
                            <span>对着镜头撅屁股、展示裆部；</span>
                            <span>撩上衣、裙子；</span>
                            <span>揉胸、揉臀、性感性舔嘴唇；</span>
                            <span>模拟性爱动作；</span>
                            <span>用臀部画圆；</span>
                            <span>聚焦敏感部位。</span>
                            (12) 户外直播违规行为，包括但不限于：<br>
                            <span>进入涉黄场所，包括但不限于洗浴中心，夜店等容易产生低俗氛围或违法的场所；</span>
                            <span>进入任何涉赌场所；</span>
                            <span>进入任何涉毒场所；</span>
                            <span>进入任何涉暴涉恐场所；</span>
                            <span>以恶心低俗的妆容进行直播，如将内衣裤套在头上、将各类液体涂抹于脸上（如鸡蛋洗头）等无下限的装扮，以及在脸上涂写过度低俗的涂鸦等；</span>
                            <span>直播任何暴力血腥、暴力、恶心等引起观众视听不适的内容，如虐待动物、自虐、酗酒、吃各种令人不适的物品（如袜子、烟灰、活物、死物）等行为；</span>
                            <span>进入坟地进行故意破坏、污损他人坟墓或者毁坏、丢弃他人尸骨等侮辱死者的行为；</span>
                            <span>捕捉、虐待、杀戮、食用、或者售卖受国家法律保护的野生动植物。</span>
                    </p>
                    		<h4>二、用户隐私保护</h4>
                    <p>
                            2.1 用户的个人信息受到保护，不接受任何个人或单位的查询。国家机关依法查询除外，用户的个人设置公开除外。<br />
                            2.2 梦网云播不对外公开或向第三方提供单个用户的注册资料及用户在使用网络服务存储在本网站的非公开内容，但下列情况除外：<br />
                            (1) 事先获得用户的明确授权；<br />
                            (2) 根据有关的法律法规要求；<br />
                            (3) 按照相关政府主管部门的要求；<br />
                            (4) 该第三方同意承担与梦网云播同等的保护用户隐私的责任；<br />
                            (5) 在不透露单个用户隐私资料的前提下，梦网云播有权对整个用户数据库进行分析并对用户数据库进行商业上的利用；<br />
                            (6) 本软件包含问题咨询功能，在您提交联系方式的同时我们还会收集您的手机型号等相关信息。您咨询中所填写的联系方式，只会用于我们的客服与您沟通与反馈，除征得用户明确同意和法律明确规定外，梦网云播不会向任何第三方提供用户上传信息。您的信息不会被用于出售，出借或交换。<br />
                    </p>
                    		<h4>三、法律责任及免责</h4>
                    <p>
                            3.1 梦网云播发布的内容仅代表作者观点，与本团队无关。对于用户言论的真实性引发的全部责任，由用户自行承担，本团队不承担任何责任。<br />
                            3.2 用户之间因使用梦网云播而产生或可能产生的任何纠纷和/或损失，由用户自行解决并承担相应的责任，与本团队无关。<br />
                            3.3 用户在梦网云播上发布的内容，本团队有权转载或引用。<br />
                            3.4 用户在任何时间段在梦网云播上发表的任何内容的著作财产权，用户许可本团队在全世界范围内免费地、永久性地、不可撤销地、可分许可地和非独家地使用的权利，包括但不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及《著作权法》规定的由著作权人享有的其他著作财产权利。并且，用户许可本团队有权利就任何主体侵权而单独提起诉讼，并获得全部赔偿。<br />
                            3.5 本团队郑重提醒用户，若出现下列情况任意一种或几种，将承担包括被关闭全部或者部分权限、被暂停或被禁止使用的后果，情节严重的，还将承担相应的法律责任。<br />
                            (1) 使用不雅或不恰当昵称；<br />
                            (2) 发布含有猥亵、色情、人身攻击和反政府言论等非法或侵权言论的；<br />
                            (3) 从事非法商业活动；<br />
                            (4) 假冒管理人员或破坏管理人员形象；<br />
                            (5) 使用非法软件进行刷内容、违规发布内容的行为；<br />
                            (6) 其他本团队认为不恰当的情况。<br />
                            3.6 凡内容出现以下情况之一，本团队管理人员有权不提前通知作者直接删除，并依照有关规定作相应处罚。情节严重者，本团队管理人员有权对其做出关闭部分权限、暂停直至禁止使用。<br />
                            (1) 发表含有本协议第7条禁止发布、传播内容的文章；<br />
                            (2) 发表无意义的灌水内容；<br />
                            (3) 同一内容多次出现的；<br />
                            (4) 违反本协议第8条的规定，发布广告的；<br />
                            (5) 内容包含有严重影响用户浏览的内容或格式的；<br />
                            (6) 其他本团队认为不恰当的情况。<br />
                            3.7 用户违反本《协议》或相关的服务条款的规定，导致或产生的任何第三方主张的任何索赔、要求或损失，包括合理的律师费，用户同意赔偿梦网云播与合作公司、关联公司，并使之免受损害。<br />
                    </p>
                    		<h4>四、用户注意事项</h4>
                    <p>
                            4.1 为改善、优化相应服务，本服务可能会对您的昵称、头像以及在本软件中的相关操作信息等信息进行使用。<br />
                            4.2 您在使用本服务某一特定服务时，可能还需同意单独的协议、规则等，您在使用该项服务前请仔细阅读前述相关协议、规则。<br />
                            4.3 梦网云播有权在本服务中或通过本服务向您展现各种信息，包括但不限于广告信息、新闻信息及宣传信息等，该信息可能以系统消息或弹出窗口等形式出现。<br />
                            4.4 您可以选择不向梦网云播提供您的某些信息，或者根据产品设置取消梦网云播收集某些信息，但因此可能会导致相关服务功能无法实现。<br />
                            4.5 为了增进用户体验、完善服务内容，梦网云播将不断努力开发新的服务，并为您不时提供软件更新（这些更新可能会采取软件替换、修改、功能强化、版本升级等形式）。本软件可能为您默认开启自动升级、更新等功能，您可以在软件设置中自行选择是否需要开启此功能。<br />
                            4.6 为了改善用户体验，并保证服务的安全性和功能的一致性，梦网云播有权不经向您特别通知而对软件进行更新，或者对软件的部分功能效果进行改变或限制。<br />
                            4.7 本软件新版本发布后，旧版本的软件可能无法使用。梦网云播不保证旧版本软件继续可用及相应的客户服务，请您随时核对并下载最新版本。<br />
                    </p>
                    		<h4>五、知识产权声明</h4>
                    <p>
                            5.1 梦网云播是本软件的知识产权权利人。本软件的著作权、商标权、专利权、商业秘密等知识产权，以及与本软件相关的所有信息内容（包括但不限于文字、图片、音频、视频、图表、界面设计、版面框架、有关数据或电子文档等）均受中华人民共和国法律法规和相应的国际条约保护，梦网云播依法享有上述相关知识产权，但相关权利人依照法律规定应享有的权利除外。<br />
							5.2 未经梦网云播相关权利人书面同意，您不得为任何商业或非商业目的自行或许可任何第三方实施、利用、转让上述知识产权。<br />
                    </p>
                    		<h4>六、其他事项</h4>
                    <p>
                            6.1 您使用本软件或本服务即视为您已阅读并同意受本协议的约束。<br />
                            6.2 以上各项条款内容的最终解释权及修改权归梦网云播公司所有。<br />
                            6.3 本《协议》所定的任何条款的部分或全部无效者，不影响其它条款的效力。<br />
                            6.4 本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不包括冲突法）。<br />
                            6.5 若您和梦网云播之间发生任何纠纷或争议，首先应友好协商解决；协商不成的，您同意将纠纷或争议提交本协议签订地有管辖权的人民法院管辖。<br />
                            6.6 本《协议》的版权梦网云播所有，梦网云播保留一切解释和修改权利。<br />
                    </p>
                            <h4>七、费用</h4>
                    <p>
                            7.1 梦网云播为预付费服务，您应按照本协议约定的价格体系支付相应服务费用，前述服务费用将在后台页面上公示。您预付费用后，我们将开始提供相关服务；与此同时，您应经常查询账户余额变化情况，提前做好充值准备。若您的预付费用使用完毕未及时充值或余额不足，我们有权不经通知随时中止所有提供服务和/或技术支持，对于由此造成的任何后果您应自行承担。<br />
                            7.2 梦网云播服务价格为：观看每人每分0.05元。更多计费方式请联系梦网云播官方客服。<br />
                            7.3 梦网云播可能根据实际需要对收费服务的收费标准、方式等进行修改和变更，梦网云播也可能会对部分免费服务开始收费。前述修改、变更或开始收费前，梦网云播将在相应服务页面进行通知或公告。

                    </p>
                </div>
                
            </div>
        </div>
        <m-footer></m-footer>
    </div> 
</template>

<script>
    import BgHead from 'components/header/bgHead'
    import LoginHead from 'components/header/loginHead'
    import {DATA_URL, ERR_OK,LOGINURI,getLStorage} from 'api/config'
    import {getNewTime} from 'api/http'
    import axios from 'axios'
    import md5 from 'js-md5'
    import mFooter from 'components/header/footer'

    const TIME_COUNT = 60;

    export default{
        data(){
            let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
            var checkAge = (rule, value, callback) => {
                let PhoneExp = /^[18][34567890]\d{9}$/
                if (!value) {
                    return callback(new Error('手机号码不能为空'));
                }

                setTimeout(() => {
                    if (!PhoneExp.test(value)) {
                        callback(new Error('请输入正确的手机号码'))
                    } else {
                        this._isLogin()
                        setTimeout(()=>{
                            if(this.isPhone){
                                callback(new Error('该手机号已注册，请直接登录'))
                            }else{
                                // this.isPhone = false
                                callback()
                            }
                        },500)
                    }
                }, 1000)
                // setTimeout(() => {
                //     if (!PhoneExp.test(value)) {
                //         callback(new Error('请输入正确的手机号码'))
                //     } else {
                //         // if (value.length < 6) {
                //         //     callback(new Error('不能低于6位'))
                //         // } else {
                //             this.isPhone = false
                //             callback()
                //         // }
                //     }
                // }, 1000);
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (!regExp.test(value)) {
                        callback(new Error('字母+数字组成，长度为6~16位'))
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入确认密码'));
                } else if (value !== this.formData.password) {
                    callback(new Error('两次输入密码不一致'));
                } else {
                    callback();
                }
            };
            var validateCode = (rule, value, callback) => {
                let codeNumber = /^\d{5,6}$/
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else {
                    if (!codeNumber.test(value)) {
                        callback(new Error('请输入正确的验证码'));
                    }
                    callback();
                }
            };
            // var validateType = (rule, value, callback) => {
            //     if (!value) {
            //         callback(new Error('请阅读并同意相关服务条款!'));
            //     } 
            //     callback();
            // };
            return {
                // ruleForm: {
                //     Phone: '',
                //     password: '',
                //     ConfirmPassword: '',
                //     code:''
                // },
                rules: {
                    Phone: [
                        { validator: checkAge, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    ConfirmPassword: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    code:[
                        { validator: validateCode, trigger: 'blur' }
                    ],
                    // type: [
                    //     { validator:validateType, trigger: 'blur' }
                    // ]
                },
                formData:{
                    Phone:'',
                    password:'',
                    ConfirmPassword:'',
                    code:'',
                    type:true
                },
                dialogVisible:false,
                regData:{
                    PhoneVal:'',
                    passwordVal:'',
                    ConfirmPasswordVal:'',
                    codedVal:'',
                    show : true,   //默认是停止的，但界面加载之后会变成false
                    count:'',
                    timer:null
                },
                isPhone:false,
                icon_weixin:false,
                icon_qq:false,
                icon_weibo:false,
                id:getLStorage('user_id')
            }
        },
        created(){
            // var params = {
            //     user_id:this.id,
            //     type:1
            // }
            // $.ajax({
            //     type: "POST",
            //     timeout: 120000, //超时时间设置，单位毫秒
            //     async: false,
            //     url: DATA_URL + "manage/finance/app_surplus.do",
            //     data: params,
            //     dataType: "json",
            //     success: function(data) {
            //         console.log(data)
            //     }
            // })
        },
        methods:{
            _isLogin(){
                let phone
                phone = this.formData.Phone
                axios.get(DATA_URL + 'mwlive/user/user_exist_check.do',{
                    params:{
                        mobile:phone
                    }
                }).then((response) => {
                    if(response.data.code == ERR_OK){
                        console.log('200',response.data.code)
                        this.isPhone = true
                    }else{
                        console.log('404',response.data.code)
                        this.isPhone = false
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
            toggleClassWX(){
                this.icon_weixin = !this.icon_weixin
            },
            toggleClassQQ(){
                this.icon_qq = !this.icon_qq
            },
            toggleClassWB(){
                this.icon_weibo = !this.icon_weibo
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.isPhone = false
                        axios.get(DATA_URL + 'mwlive/user/user_reg.do',{
                            params:{
                                mobile:this.formData.Phone,
                                password:md5(this.formData.password),
                                sm_code:this.formData.code,
                                pc:'1'
                            }
                        }).then((response) => {
                            if(response.data.code == ERR_OK){
                                this.$message({
                                    message: '注册成功！',
                                    type: 'success'
                                })
                                console.log(response)
                                // 跳转
                                this.$router.push({
                                    path:'/login'
                                })
                            }else if(response.data.code == 410){
                                this.$message({
                                    message: '验证码错误！',
                                    type: 'error'
                                })
                                return false
                            }else{
                                this.$message({
                                    message: '注册信息不正确！',
                                    type: 'error'
                                })
                                return false
                            }
                        }).catch(function(err){
                            console.log(err);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            getCode(){
                let PhoneExp = /^[18][34567890]\d{9}$/
                if(this.formData.Phone == '' || !PhoneExp.test(this.formData.Phone)){
                    this.$message({
                        showClose: true,
                        message: '请输入正确的手机！',
                        type: 'error'
                    });
                    return false
                }
                // 获取验证码
                let newTime = getNewTime()
                var data = {
                    mobile:this.formData.Phone,
                    oper_time:newTime,
                 //   type:"MWSPY"
                }
                axios({
                    method: 'post',
                    url: DATA_URL + 'mwlive/user/user_reg_getsm.do',
                    params: data,
                })
                
                .then((response)=>{
                    if(response.data.code == ERR_OK){
                        this.$message('短信验证码发送成功')
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
                    }else{
                        this.isPhone = true
                        this.$message({
                            showClose: true,
                            message: '该手机号已注册，请直接登录！',
                            type: 'warning'
                        });
                        return false
                    }
                }).catch((err)=>{
                    this.$message({
                        showClose: true,
                        message: '暂时无法注册！',
                        type: 'warning'
                    });
                     return false
                })      
                
               
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
        },
        computed:{
        },
        components:{
            LoginHead,
            BgHead,
            mFooter
        },
        destroyed() {
            clearInterval(this.timer)
        }
  }
</script>
<style scoped>
html,body{
    height: 100%
}
.register{
    /* position: fixed;
    top: 0%;
    left: 0%; */
    width:100%;
    height: 100%;
    padding:0px;
    text-align:center;


}
.fuwu_tiaokuan .normal_in{
    margin-top: 0;
}
.login_middle {
    width: 430px;
    height: auto;
    margin: 0 auto;
    /* position: absolute; */
    /* left: 50%; */
 
    /* top:43%; */
    /* margin-top: 187px; */
 
}
.register .login_mode{
    padding-bottom:12px;
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
.normal_in .register_prompt{
    position:absolute;
    top:48px;
    left:18px;
    color:#ff3c3c;
}
.cur-p input{
    vertical-align: middle;
    margin-top: 0px;
}
.clause{
    color: #00b0fe
}
.register-link{
    font-size: 12px;
}
.look_title{
    font-size: 18px;
    color: #333333;
    text-align: center;
    height: 40px;
    font-weight: 600;
    display: inline-block;
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
    max-width:1000px;
    width: 80%;
    height: 620px;
    background: #fff;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%,-50%);
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
    margin: 15px 0;
}
.xieyi_innner p{
    line-height: 30px;
    font-size: 16px;
    /* margin: 1em 0; */
}
.xieyi_innner .p_kaitou{
    text-indent: 2em;
}
h4{
    margin:10px 0;
    font-size:16px;
}
.regist {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 68px;
    line-height: 68px;
    text-align: center;
    background-color: #f1f2f4;
    color: #000000;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
}
.regist span {
    color: #00b0fe;
    font-size: 14px;
}
.posi_ab{
    position: absolute;
    right: 53px;
    top:44px;
    font-size: 12px;
    color:#C1C1C1;
}
.login_mode .fj_text span{
    color:#39393A;
    font-size:14px;
}
.login_mode .fj_text .register-link,.register-link{
    color:#2B6CFF;
}
.share_model {
    width:320px;
    margin:-3px auto 0 auto;
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
</style>
<style>
.login_mode .el-col-12{
    width:86%;
}
.fuwu_tiaokuan .el-form-item__error{
    top: 70% !important; 
}
</style>
