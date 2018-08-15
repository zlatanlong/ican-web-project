<template>
  <div class="nav-main">
    <Menu mode="horizontal" :theme="theme1" active-name="1">
      <div class="items-right">
        <MenuItem name="1" to="/">
          <svg class="icon icon-shouye" aria-hidden="true">
            <use xlink:href="#icon-shouye"></use>
          </svg>
          首页
        </MenuItem>
        <MenuItem name="2" to="/login">
          <svg class="icon icon-guo" aria-hidden="true">
            <use xlink:href="#icon-guo"></use>
          </svg>
          开煮
        </MenuItem>
        <Submenu name="3">
          <template slot="title">
            <svg class="icon icon-gerenxinxiyebaobeixingming" aria-hidden="true">
              <use xlink:href="#icon-gerenxinxiyebaobeixingming"></use>
            </svg>
            {{user}}
          </template>
          <MenuGroup title="个人">
            <MenuItem name="3-1">个人信息</MenuItem>
            <MenuItem name="3-2">烹饪记录</MenuItem>
          </MenuGroup>
          <MenuGroup title="账号">
            <MenuItem name="3-3">修改密码</MenuItem>
            <MenuItem name="3-4">注销</MenuItem>
          </MenuGroup>
        </Submenu>
      </div>
      <div class="items-left">
        <MenuItem name="4" to="/">
          <svg class="icon icon-longxia" aria-hidden="true">
            <use xlink:href="#icon-longxia"></use>
          </svg>
          我爱煮锅
        </MenuItem>
      </div>
    </Menu>
  </div>
</template>
<script>
import Store from '@/store.js'
export default {
  data () {
    return {
      theme1: 'light',
      ifLogin: '',
      user: '登录'
    }
  },
  created () {
    this.ifLogin = Store.fetchLogin() !== ''
    this.user = Store.fetchLogin()
  }
}
</script>

<style lang="stylus" scoped>
.nav-main{
  position: fixed;
  width: 100%;
  top: 0;
  right: 0;
  z-index: 1000;
  .items-right{
    float: right;
    .ivu-menu-item{
      font-size 20px
    }
    .ivu-menu-submenu{
      font-size 20px
    }
  }
  .items-left{
    float: left;
    @media screen and (max-width: 768px){
      // 小屏直接隐藏掉
      display none
    }
  }
}
</style>
