<template>
  <div>
    <!-- 评分 -->
    <div class="grade">
      <div class="left">
        <p class="left_1">3.9</p>
        <p class="left_2">综合评分</p>
        <p class="left_3">高于周边商家69.2%</p>
      </div>
      <div class="right">
        <p class="right_1">
          商品评价
          <Rate show-text allow-half v-model="valueCustomText1">
            <span style="color: #f5a623">{{ valueCustomText1 }}</span>
          </Rate>
        </p>
        <p class="right_2">服务态度
          <Rate show-text allow-half v-model="valueCustomText2">
            <span style="color: #f5a623">{{ valueCustomText2 }}</span>
          </Rate>
        </p>
        <p class="right_3">送达时间  44 分钟</p>
      </div>
    </div>
    <!-- 分割线 -->
    <div class="box"></div>

    <!-- 用户评价 -->
    <div class="usereve">
      <!-- 按钮 -->
      <div class="btn">
        <div class="btnall">
          <Button type="primary">全部110</Button>
          <Button type="info">满意20</Button>
          <Button class="band">不满意98</Button>
        </div>
      </div>
      <!-- 只看有内容的评价 -->
      <p class="onlysee">
        <Icon type="md-checkmark-circle" />只看有内容的评价
      </p>
      <!-- 内容 -->
      <div class="bigmain">
        <Row class="main">
          <div v-for="(v,i) in this.data" :key="i" class="conts">
            <i-Col span="4" class="userimg">
              <img :src="v.avatar" />
            </i-Col>
            <i-Col span="20" class="usertxt">
              <p class="usertime">
                <span class="username">{{v.username}}</span>
                <span class="rateTime">{{v.rateTime}}</span>
              </p>
              <p class="howtime">
                <Rate :value.sync="v.score"></Rate>
                {{v.deliveryTime}}分钟送达
              </p>
              <p class="content-text">{{v.text}}</p>
              <p class="recommend">
                <Icon type="ios-thumbs-up" />
                <span v-for="(x,i) in v.recommend" :key="i">{{x}}</span>
              </p>
            </i-Col>
          </div>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
import { getRatings } from "../api/apis";
export default {
  data() {
    return {
      data: {},
      valueCustomText1: 3.8,
      valueCustomText2: 4.0
    };
  },
  created() {
    /* 初始化请求 */
    getRatings().then(res => {
      this.data = res.data.data;
      console.log(res.data.data);
      this.data.forEach(function(v) {
        //   v.rateTime=new Date(parseInt(v.rateTime) * 1000).toLocaleString().replace(/年|月/g, "/").replace(/日/g, " ");
        function newtime(sjx) {
          var sj = new Date(sjx);
          var year = sj.getFullYear();
          var month = sj.getMonth() + 1;
          if (month < 10) {
            month = "0" + month;
          }
          var day = sj.getDate();
          if (day < 10) {
            day = "0" + day;
          }
          var hours = sj.getHours();
          if (hours < 10) {
            hours = "0" + hours;
          }
          var minutes = sj.getMinutes();
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          var seconds = sj.getSeconds();
          if (seconds < 10) {
            seconds = "0" + seconds;
          }
          return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }
        v.rateTime = newtime(v.rateTime);
      });
    });
  }
};
</script>

<style lang="less" scoped>
//评分
.grade {
  display: flex;
  border-top: 1px solid #e8e8e8;
  padding: 20px;
  .left {
    flex: 0.4;
    text-align: center;
    border-right: 1px solid #ccc;
    padding-right: 18px;
    .left_1 {
      font-size: 30px;
      color: #fd9c00;
    }
    .left_2 {
      font-size: 18px;
      color: #333;
      font-weight: 600;
    }
  }
  .right {
    padding-left: 30px;
    flex: 0.6;
    font-size: 18px;
    line-height: 32px;
    color: #333;
    font-weight: 600;
    .right_1{
      .ivu-rate{
        display: inline-block;
        font-size: 14px;
      }
    }
  }
}
/* 分割线 */
.box {
  width: 100%;
  height: 15px;
  background: #f3f6f6;
  border-top: 1px solid #e5e8e8;
  border-bottom: 1px solid #e5e8e8;
}
/* 用户评价 */
.usereve {
  // 按钮
  .btn {
    display: flex;
    justify-content: space-around;
    .btnall {
      margin-top: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e5e8e8;
      .ivu-btn {
        margin-left: 10px;
      }
      .band {
        background-color: #e9ecec;
      }
    }
  }
  //只看有内容的评价
  .onlysee {
    font-size: 22px;
    padding: 20px;
    border-bottom: 1px solid #e5e8e8;
  }

  /* 内容 */
  .bigmain {
    height: 100%;
    padding: 0 20px;
    .main {
      height: 100%;
      .conts {
        height: 100%;
        /* 用户头像 */
        .userimg {
          margin-top: 20px;
          img {
            width: 90%;
            border-radius: 50%;
          }
        }
        /* 文字内容 */
        .usertxt {
          margin-top: 20px;
          padding-bottom: 20px;
          padding-left: 20px;
          border-bottom: 1px solid #e8e8e8;
          .usertime {
            .rateTime {
              font-size: 12px;
              margin-left: 130px;
              color: #91999e;
            }
          }
          .howtime {
            font-size: 12px;
            color: #91999e;
            .ivu-rate {
              font-size: 12px;
              .ivu-rate-star {
                margin-right: 0px !important;
              }
            }
          }
          .recommend {
            .ivu-icon-ios-thumbs-up {
              color: #00a1dc;
              line-height: 14px;
              font-size: 18px;
              vertical-align: middle;
            }
            span {
              display: inline-block;
              margin-left: 5px;
              margin-top: 3px;
              padding: 3px;
              font-size: 14px;
              height: 20px;
              line-height: 14px;
              max-width: 75px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              border: 1px solid #ccc;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
}
</style>