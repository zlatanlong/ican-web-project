<template>
  <Row type="flex" justify="center" class="register code-row-bg">
    <Col :xs="22" :sm="10" :md="8" :lg="8">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem label="用户名" prop="user">
          <Input type="text" v-model="formCustom.user" size="large"></Input>
        </FormItem>
        <FormItem label="手机号" prop="phoneNum">
          <Input type="text" v-model="formCustom.phoneNum" size="large">
            <Button slot="append" @click="sendIdCode" :loading="formCustom.sendLoding">
              <span v-if="!formCustom.sendLoding">发送验证码</span>
              <span v-if="formCustom.sendLoding">已发送，请注意短信</span>
            </Button>
          </Input>
        </FormItem>
        <FormItem label="验证码" prop="idCode">
          <Input type="text" v-model="formCustom.idCode" size="large"></Input>
        </FormItem>
        <FormItem label="密码" prop="passwd">
          <Input type="password" v-model="formCustom.passwd" size="large"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="passwdCheck">
          <Input type="password" v-model="formCustom.passwdCheck" size="large"></Input>
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
    const validateIdCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空！'))
      }
      // 模拟异步验证效果
      // setTimeout(() => {
      //   if (!Number.isInteger(value)) {
      //     callback(new Error('请输入一个数字！'))
      //   } else {
      //     if (value < 18) {
      //       callback(new Error('必须满18周岁！'))
      //     } else {
      //       callback()
      //     }
      //   }
      // }, 1000)
      if (value !== this.formCustom.idCodeContent) {
        return callback(new Error('验证码有误！'))
      } else {
        callback()
      }
    }
    const validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空！'))
      } else {
        this.$http.get('http://www.upctx.cn:8080/api/RegisterServlet', {
          params: {
            username: this.formCustom.user
          }
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
    const validatePhoneNum = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手机号不能为空！'))
      } else {
        this.$http.get('http://www.upctx.cn:8080/api/RegisterServlet', {
          params: {
            phonenum: this.formCustom.phoneNum
          }
        }).then(res => {
          if (res.data.hasPhone) {
            this.hasPhone = true
            console.log('该手机号已被注册')
            callback(new Error('该手机号已被注册'))
          } else {
            this.hasPhone = false
            console.log('该手机号可以被注册')
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
        idCode: '',
        user: '',
        phoneNum: '',
        idCodeContent: '', // 发送的验证码内容
        sendLoding: false
      },
      ruleCustom: {
        user: [
          { type: 'string', min: 2, message: '请起个长一点的名字', trigger: 'blur' },
          { validator: validateUser, trigger: 'blur' }
        ],
        phoneNum: [
          { type: 'string', min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' },
          { validator: validatePhoneNum, trigger: 'blur' }
        ],
        passwd: [
          { type: 'string', min: 6, message: '密码不会少于6位', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        passwdCheck: [
          { validator: validatePassCheck, trigger: 'blur' }
        ],
        idCode: [
          { type: 'string', min: 4, max: 4, message: '请输入正确的验证码', trigger: 'blur' },
          { validator: validateIdCode, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$http.post('http://www.upctx.cn:8080/api/RegisterServlet', {
            username: this.formCustom.user,
            password: this.formCustom.passwd,
            phonenum: this.formCustom.phoneNum
          }).then(res => {
            this.$Message.success('注册成功!')
            this.$router.push('/login')
            this.$Loading.finish()
          }, err => {
            console.log(err)
          })
        } else {
          this.$Message.error('注册失败!')
          this.$Loading.error()
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    toLogin () {
      this.$router.push('/login')
    },
    sendIdCode () {
      if (this.formCustom.phoneNum.length === 11 && !this.hasPhone) {
        this.formCustom.sendLoding = true
        this.$http.get('http://www.upctx.cn:8080/api/SendMsgServlet', {
          params: {
            phonenum: this.formCustom.phoneNum
          }
        }).then(res => {
          console.log(res.data.stateCode)
          if (res.data.stateCode === '0') {
            this.formCustom.idCodeContent = res.data.idCode
            this.$Message.success('验证码发送成功，请注意查收短信')
          } else {
            this.$Message.error('发送失败，请稍后再试')
          }
        }, err => {
          console.log(err)
        })
      } else {
        this.$Message.error('请输入正确的手机号')
      }
    },
    hasPhone () {
      return true
    }
  }
}
</script>

<style scoped>
.register{
  height: 700px;
}
</style>
