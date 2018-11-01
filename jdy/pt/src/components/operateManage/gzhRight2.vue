<template>
    <div class="my_list securitySet">
        <div class="bg-fff col-333 info-content">
            <div class="rechatge">
                <div class="rechatge-button" style="width: 200px;">
                    <el-button class="blue_btn" type="primary" @click="goSetGzh">我有微信公众号，立即设置</el-button>
                </div>
            </div>
            <p class="tishi">
                温馨提示：<br>
                1、一个微信公众号只能和一个账户绑定 <br>
                2、公众号必须是已认证的服务号，才有微信消息提醒功能。<br>
                3、认证服务号绑定之后，如需解绑请至微信公众号后台取消绑定。 <br>
                4、公众号授权之后我们系统会默认开通模板消息并且设置行业为：“IT科技/互联网|电子商务，IT科技/IT软件与服务”,并添加“收到回复通知”模板。请勿删除该模板<br>
                5、如果公众号已经使用模板消息，可能会影响到之前的业务系统。如果在一个月内修改过公众号模板消息的“所在行业”，可能会导致模板ID设置不成功，无法成功授权绑定。<br>
                <span>6、请默认授予所有权限，否则导致无法进入系统，无法准确判断是否关注等异常。</span>
            </p>
        </div>
    </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    goSetGzh() {
      this.$router.push({ path: "/mainPage/gzhRight1" });
    }
  }
};
</script>
<style scoped>
.mylist {
  height: 760px;
  background: #fff;
}
.tishi {
  margin-top: 10px;
  line-height: 28px;
  color: #9b9b9b;
}
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
.rechatge-button .el-button {
  width: 220px;
}
</style>

