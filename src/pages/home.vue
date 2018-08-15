<template>
<div class="home">
  <Row type="flex" justify="center" class="code-row-bg" align="middle">
    <Col :xs="11" :sm="8" :md="7" :lg="6">
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
        <Tag checkable color="primary"><span>快</span></Tag>
        <Tag checkable color="success"><span>香</span></Tag>
        <Tag checkable color="error"><span>易</span></Tag>
        <Tag checkable color="warning"><span>省</span></Tag>
      </div>
    </Col>
    <Col :xs="11" :sm="8" :md="7" :lg="6">
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
    @media screen and (max-width: 768px){
      font-size 12px
    }
    font-size 16px
    .time{
      @media screen and (max-width: 768px){
        font-size 18px
      }
      font-size 24px
    }
    .content{
      @media screen and (max-width: 768px){
        font-size 22px
      }
      font-size 30px
      span{
        @media screen and (max-width: 768px){
          font-size 22px
        }
        color #fa7c21
        font-size 30px
      }
    }
    span{
      @media screen and (max-width: 768px){
        font-size 14px
      }
      font-size 20px
    }
  }
  .second-col{
    .img-logo{
      width: 95%;
    }
  }
}
</style>
