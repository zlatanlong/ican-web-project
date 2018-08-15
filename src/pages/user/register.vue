<template>
  <Row type="flex" justify="center" class="register code-row-bg">
    <Col :xs="22" :sm="10" :md="8" :lg="8">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem label="用户名" prop="user">
          <Input type="text" v-model="formCustom.user" size="large"></Input>
        </FormItem>
        <FormItem label="密码" prop="passwd">
          <Input type="password" v-model="formCustom.passwd" size="large"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="passwdCheck">
          <Input type="password" v-model="formCustom.passwdCheck" size="large"></Input>
        </FormItem>
        <FormItem label="年龄" prop="age">
          <Input type="text" v-model="formCustom.age" number size="large"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
          <Button @click="handleReset('formCustom')" style="margin-left: 8px">重填</Button>
          <Button @click="toLogin" style="margin-right: 3%;float: right">直接登录</Button>
        </FormItem>
      </Form>
    </Col>
  </Row>
</template>
<script>
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        // 没有输入密码
        callback(new Error('请输入密码！'))
      } else {
        if (this.formCustom.passwdCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField('passwdCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认你的密码！'))
      } else if (value !== this.formCustom.passwd) {
        callback(new Error('两次输入的密码不一致！'))
      } else {
        callback()
      }
    }
    const validateAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空！'))
      }
      // 模拟异步验证效果
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入一个数字！'))
        } else {
          if (value < 18) {
            callback(new Error('必须满18周岁！'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    const validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空！'))
      } else {
        this.$http.get('./validateUserName', {
          user: this.formCustom.user
        }).then(res => {
          if (res.data.hasUser) {
            callback(new Error('用户名已被注册'))
          } else {
            callback()
          }
        }, err => {
          callback(new Error('无法连接服务器'))
          console.log(err)
        })
      }
    }

    return {
      formCustom: {
        passwd: '',
        passwdCheck: '',
        age: '',
        user: ''
      },
      ruleCustom: {
        user: [
          { type: 'string', min: 4, message: '请起个长一点的名字', trigger: 'blur' },
          { validator: validateUser, trigger: 'blur' }
        ],
        passwd: [
          { type: 'string', min: 6, message: '密码不会少于6位', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        passwdCheck: [
          { validator: validatePassCheck, trigger: 'blur' }
        ],
        age: [
          { validator: validateAge, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('注册成功!')
          this.$router.push('/login')
        } else {
          this.$Message.error('注册失败!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    toLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.register{
  height: 700px;
}
</style>
