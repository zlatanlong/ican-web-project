<template>
<div class="home">
  <Row type="flex" justify="center" class="code-row-bg" align="middle">
    <Col :xs="22" :sm="8" :md="7" :lg="6">
      <div class="first-col">
        <h1>想吃海鲜要几步？</h1>
        <br>
        <br>
        <Timeline>
          <TimelineItem>
            <p class="time">第一步</p>
            <p class="content">new 海鲜()</p>
          </TimelineItem>
          <TimelineItem>
            <p class="time">第二步</p>
            <p class="content">找到<span>共享海鲜锅</span></p>
          </TimelineItem>
          <TimelineItem>
            <p class="time">第三步</p>
            <p class="content">开煮！</p>
          </TimelineItem>
          <TimelineItem>
            <p class="time">第四步</p>
            <p class="content">稍等一会吧</p>
          </TimelineItem>
          <TimelineItem>
            <p class="time">第五步</p>
            <p class="content">品尝美味</p>
          </TimelineItem>
        </Timeline>
        <Tag checkable color="primary">标签一</Tag>
        <Tag checkable color="success">标签二</Tag>
        <Tag checkable color="error">标签三</Tag>
        <Tag checkable color="warning">标签四</Tag>
      </div>
    </Col>
    <Col :xs="0" :sm="8" :md="7" :lg="6">
      <div class="second-col">
        <img src="@/assets/ican-logo.jpg" alt="" class="img-logo">
      </div>
    </Col>
    <Col>
    </Col>
  </Row>
</div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style lang="stylus" scoped>
.home{
  .first-col{
    .time{
      font-size 24px
    }
    .content{
      font-size 30px
      span{
        color #fa7c21
      }
    }
  }
  .second-col{
    .img-logo{
      width: 95%;
    }
  }
}
</style>
