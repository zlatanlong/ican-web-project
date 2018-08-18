<template>
  <Row type="flex" justify="center" class="register code-row-bg">
    <Col :xs="22" :sm="10" :md="8" :lg="8">
      <Form :model="formItem" :label-width="80" :rules="ruleCustom">
        <FormItem label="锅编码" prop="potId">
          <Input v-model="formItem.potId" placeholder="请输入锅编码" number></Input>
        </FormItem>
        <FormItem label="品种">
          <Select v-model="formItem.select">
            <Option value="pipixia">皮皮虾</Option>
            <Option value="geli">蛤蜊</Option>
            <Option value="shanbei">扇贝</Option>
            <Option value="haixing">海星</Option>
            <Option value="duixia">对虾</Option>
          </Select>
        </FormItem>
        <FormItem label="存留到">
          <Row>
            <Col span="11">
              <TimePicker type="time" placeholder="选择时间" v-model="formItem.time"></TimePicker>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="调味品">
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
          <Button type="primary">提交</Button>
          <Button style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </Col>
  </Row>
</template>
<script>
export default {
  data () {
    return {
      formItem: {
        potId: '',
        select: '',
        checkbox: [],
        time: '',
        textarea: ''
      },
      ruleCustom: {
        potId: [
          { required: true, type: 'number', max: 10000, message: '请输入正确的机器编号', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>
