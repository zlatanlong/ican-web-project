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
          <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
        </FormItem>
      </Form>
    </Col>
  </Row>
</template>

<script>
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
  created () { // 在数据被初始化后会调用，this指向的是vm实例，钩子函数
    this.$http.get('/api/login').then(res => { // success
      console.log(res.data)
    }, err => { // error
      console.log('失败')
      console.log(err)
    })
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('登录成功!')
        } else {
          this.$Message.error('登录失败!')
        }
      })
    }
  }
}
</script>

<style scoped>
.img-logo{
  width: 100%;
}
</style>
