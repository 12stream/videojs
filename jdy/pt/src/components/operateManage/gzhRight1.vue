<template>
    <div class="my_list securitySet">
        <div class="bg-fff col-333 info-content">
            <h2 style="margin: 56px auto;text-align: center;font-size: 18px;">公众号第三方授权须知</h2>
            <p class="tishi">
                1.公众号必须是已认证的服务号。<br>
                2.公众号授权之后我们系统会默认开通模板消息并且设置行业为：“IT科技/互联网|电子商务，IT科技/IT软件与服务”,并添加“收到回复通知”模板。请勿删除该模板<br>
                3.如您已经授权过,现在需要绑定给多个论坛的，到达授权页面点“继续使用”即可！<br>
                <span>4.特别注意事项：如果公众号已经使用模板消息，可能会影响到之前的业务系统。如果在一个月内修改过公众号模板消息的"所在行业"，可能会导致模板ID设置不成功，无法成功授权绑定</span><br>
                <span>5.请默认授权所有权限，否则导致无法进入系统，无法准确判断是否关注等异常</span>
            </p>
            <div class="next-btn" @click="goStep()">点击这里继续授权</div>
        </div>
    </div>
</template>
<script>
import { setCookie, getCookie, removeCookie ,getCookies} from "../../api/config";
export default {
  name: "",
  data() {
    return {
      ruleForm: {
        user_id: "",
        money: "",
        resource: ""
      },
      tkInfo: getCookies("token")
    };
  },
  created() {
    if (this.tkInfo == null) {
      this.$message({
        showClose: true,
        type: "error",
        message: "登陆失效！"
      });
      // this.$router.push({
      //   path: "/login"
      // });
    }
  },
  methods: {
    goStep() {
        var newTab = window.open('about:blank')
      var params = { token: this.tkInfo };
      this.$ajaxs.getAuthorization(params).then(data => {
        if (data.code == 1) {
          console.log(data.result.return_url);
          newTab.location.href = data.result.return_url
        //   window.open(data.result.return_url);
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: data.msg
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.tishi span {
  color: red;
}
.next-btn {
  margin: 30px auto;
  width: 129px;
  font-size: 16px;
  color: #4285f4;
  border-bottom: 1px solid #4285f4;
  cursor: pointer;
}
</style>

