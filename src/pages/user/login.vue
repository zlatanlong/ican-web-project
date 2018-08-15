<template>
  <Row type="flex" justify="center" class="code-row-bg" align="middle">
    <Col :xs="0" :sm="10" :md="9" :lg="7">
      <img src="@/assets/ican-logo.jpg" alt="" class="img-logo">
    </Col>
    <Col :xs="22" :sm="10" :md="9" :lg="7">
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="user">
          <Input type="text" v-model="formInline.user" placeholder="用户名" size="large">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" placeholder="密码" size="large">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')" style="margin-left: 4%">登录</Button>
          <Button @click="toRegister" style="float: right;margin-right: 4%">前去注册</Button>
        </FormItem>
      </Form>
    </Col>
  </Row>
</template>

<script>
import Store from '@/store.js'
export default {
  name: 'login',
  data () {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: '请填写用户名.', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码.', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不会少于6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$http.get('/api/login', {
            username: this.formInline.user,
            password: this.formInline.password
          }).then(res => {
            if (!res.data.hasUser) {
              console.log(res.data.hasUser)
              this.$Message.error('用户名错误!')
            } else if (!res.data.passWordMatched) {
              this.$Message.error('密码错误!')
            } else {
              this.$Message.success('登录成功!')
              Store.setIfLoginAction(this.formInline.user)
              this.$router.push('/')
            }
          }, err => {
            console.log(err)
            this.$Message.error('服务器连接失败!')
          })
        } else {
          this.$Message.error('登录失败!')
        }
      })
    },
    toRegister () {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
.img-logo{
  width: 100%;
}
</style>
