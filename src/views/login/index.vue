<template>
  <div class="login">
    <el-form
    class="login-form"
    ref="form"
    :model="form"
    :rules="rules"
    label-position="top"
    label-width="80px">
  <el-form-item label="手机号" prop="phone">
    <el-input v-model="form.phone"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password" >
    <el-input v-model="form.password" type="password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button
    type="primary"
    :loading="isLoginLoading"
    class="login-btn"
    @click="onSubmit"
    >登录</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import request from '@/utils/request'
// import qs from 'qs'
import { Form } from 'element-ui'
import { login } from '../../services/user'

export default Vue.extend({
  name: 'loginIndex',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      },
      isLoginLoading: false
    }
  },
  methods: {
    async onSubmit () {
      try {
        // 1. 表单验证
        await (this.$refs.form as Form).validate()
        // 登录按钮 loading
        this.isLoginLoading = true
        // 2. 验证通过 -》提交表单
        const { data } = await login(this.form)
        // 3. 处理请求结果
        // 失败: 给出提示
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          // 3.1 登录成功，记录登录状态，状态需要能够全局访问（放到 Vuex 容器中）
          this.$store.commit('setUser', data.content)
          // 3.2 访问需要登录的页面的时候盘软有没有登录状态（路由拦截器）
          // 成功跳到首页
          this.$router.push(this.$route.query.redirect as string || '/')
          // this.$router.push({
          //   name: 'home'
          // })
          this.$message.success('登录成功')
        }
      } catch (err) {
        console.log('登录失败', err)
      }

      // 结束登录按钮的loading
      this.isLoginLoading = false
    }

  }
})
</script>

<style lang="scss" scoped>
.login{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-form{
      background: #fff;
      padding: 20px;
      border-radius: 5px;
      width: 300px;
    }
    .login-btn{
      width: 100%;
    }
}

</style>
