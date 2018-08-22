<template>
  <Row type="flex" justify="center" class="register code-row-bg">
    <Col :xs="22" :sm="10" :md="8" :lg="8">
      <Form ref="formItem" :model="formItem" :label-width="80" :rules="ruleItem">
        <FormItem label="锅编码" prop="potId">
          <Input v-model="formItem.potId" placeholder="请输入锅编码" number></Input>
        </FormItem>
        <FormItem label="品种" prop="select">
          <Select v-model="formItem.select">
            <Option value="皮皮虾">皮皮虾</Option>
            <Option value="蛤蜊">蛤蜊</Option>
            <Option value="扇贝">扇贝</Option>
            <Option value="海星">海星</Option>
            <Option value="对虾">对虾</Option>
          </Select>
        </FormItem>
        <FormItem label="存留到" prop="time">
          <Row>
            <Col span="11">
              <TimePicker type="time" placeholder="选择时间" v-model="formItem.time"></TimePicker>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="调味品" prop="checkbox">
          <CheckboxGroup v-model="formItem.checkbox">
            <Checkbox label="盐"></Checkbox>
            <Checkbox label="辣椒酱"></Checkbox>
            <Checkbox label="酱油"></Checkbox>
            <Checkbox label="芥末"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="备注">
          <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="备注，现在就当留言了吧"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formItem')">提交</Button>
          <Button style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </Col>
  </Row>
</template>
<script>
import Store from '@/store.js'
export default {
  data () {
    return {
      formItem: {
        sharedState: Store.state,
        potId: '',
        select: '',
        checkbox: [],
        time: '',
        textarea: '',
        subtime: ''
      },
      ruleItem: {
        potId: [
          { required: true, type: 'number', max: 10000, message: '请输入正确的机器编号', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '请选择时间嘛~~', trigger: 'on-change' }
        ],
        select: [
          { required: true, message: '请选择一个嘛~~', trigger: 'on-change' }
        ]
      }
    }
  },
  methods: {
    getNowDate () {
      // 得到 YYYY-MM-DD HH:mm:SS
      let date = new Date()
      let sign1 = '-'
      let sign2 = ':'
      let year = date.getFullYear() // 年
      let month = date.getMonth() + 1 // 月
      let day = date.getDate() // 日
      let hour = date.getHours() // 时
      let minutes = date.getMinutes() // 分
      let seconds = date.getSeconds() // 秒
      // 给一位数数据前面加 “0”
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (day >= 0 && day <= 9) {
        day = '0' + day
      }
      if (hour >= 0 && hour <= 9) {
        hour = '0' + hour
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = '0' + minutes
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = '0' + seconds
      }
      let currentdate = year + sign1 + month + sign1 + day + ' ' + hour + sign2 + minutes + sign2 + seconds
      return currentdate
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.formItem.sharedState.user !== (null || '')) {
            this.$Spin.show({
              render: (h) => {
                return h('div', [
                  h('Icon', {
                    'class': 'demo-spin-icon-load',
                    props: {
                      type: 'ios-loading',
                      size: 18
                    }
                  }),
                  h('div', '正在提交申请，请稍后')
                ])
              }
            })
            this.$http.post('http://localhost:8081/api/CookServlet', {
              subtime: this.getNowDate(),
              condiment: this.formItem.checkbox,
              username: this.formItem.sharedState.user,
              foodkind: this.formItem.select,
              potid: this.formItem.potId,
              remarks: this.formItem.textarea,
              keeptime: this.formItem.time
            }).then(res => {
              if (res.data.stateCode === '0') {
                this.$Message.success('发送成功！')
                this.$Spin.hide()
                this.$router.push('/')
              } else {
                this.$Message.error('服务器君走神了，请联系开发者')
              }
            }, err => {
              console.log(err)
            })
          } else {
            this.$Message.error('请登录！')
            this.$router.push('/Login')
          }
        } else {
          this.$Message.error('操作失败！')
          this.$Loading.error()
        }
      })
    }
  }
}
</script>
