<template>
  <div class="bigmain">
    <div class="head">
      <!-- 容器页面 -->
      <div :style="{backgroundImage:'url('+data.avatar+')'}" class="headbg"></div>
      <Row class="headmain">
        <i-Col span="7" class="headleft">
          <!-- 动态获取图片 -->
          <img :src="data.avatar" />
        </i-Col>
        <!-- 商家描述 -->
        <i-Col span="14" class="headcenter">
          <p>
            <img src="../assets/imgs/brand@2x.png" alt />
            {{data.name}}
          </p>
          <p>
            <span>{{data.description}} /</span>
            <span>{{data.deliveryTime}}</span>分钟送达
          </p>
          <p>
            <img src="../assets/imgs/decrease_1@2x.png" alt />
            {{data.supports?data.supports[0].description:''}}
          </p>
        </i-Col>
        <!-- 商家店铺图片 -->
        <i-Col span="3" class="headright">
          <div class="btn">5个 ></div>
        </i-Col>
        <!-- 公告 -->
        <div class="ad">
          <span class="ad_box">公告</span>
          {{data.bulletin}}
        </div>
      </Row>
    </div>
    <!-- 一级路由按钮 -->
    <div class="router-link-div">
      <router-link to="/">商品</router-link>
      <router-link to="/evaluate">评价</router-link>
      <router-link to="/merchant">商家</router-link>
    </div>
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <transition name="slide-fade">
      <div v-show="shopcarShow" class="shopcar-board">购物车板子</div>
    </transition>
    <div @click="shopcarShow = !shopcarShow" class="shopcar-bar">
      <div class="shopcar-box1">
        <img src="../assets/imgs/car.png" />
        <span class="price">￥0</span>
        <span class="song">另需配送费￥4元</span>
      </div>
      <div class="shopcar-box2">￥20起送</div>
    </div>
  </div>
</template>


<script>
import { getSeller } from "../api/apis";
export default {
  data() {
    return {
      shopcarShow: false, //是否显示购物车板子
      data: {} //商家信息
    };
  },
  created() {
    //发送初始化请求
    // var obj = getSeller() //req.get('/api/seller')
    // //obj === req.get('/api/seller')
    // obj.then()
    getSeller().then(res => {
      console.log(res.data.data);
      this.data = res.data.data;
    });
  }
};
</script>

<style lang='less' scoped>
.bigmain {
  // display: flex;
  /* 头部 */
  .head {
    width: 100%;
    height: 180px;
    /* 背景图 */
    .headbg {
      width: 100%;
      height: 180px;
      position: relative;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      -webkit-filter: blur(15px);
      -moz-filter: blur(15px);
      -o-filter: blur(15px);
      -ms-filter: blur(15px);
      filter: blur(10px);
    }
    /* 头部内容 */
    .headmain {
      width: 100%;
      height: 180px;
      position: absolute;
      top: 10px;
      left: 10px;
      /* 商家头像 */
      .headleft {
        text-align: center;
        img {
          width: 80px;
          height: 80px;
          margin-top: 30px;
        }
      }
      /* 商家描述 */
      .headcenter {
        p:first-child {
          font-size: 20px;
          font-weight: bolder;
          margin-top: 30px;
          color: #fff;
          img {
            width: 35px;
            height: 20px;
          }
        }
        p:nth-child(2) {
          font-size: 18px;
          color: #fff;
          span {
            font-size: 18px;
          }
        }
        p:last-child {
          font-size: 16px;
          color: #fff;
          margin-top: 4px;
          img {
            width: 16px;
          }
        }
      }

      /* 店铺图片 */
      .headright {
        .btn {
          width: 40px;
          height: 26px;
          text-align: center;
          border-radius: 40px;
          line-height: 26px;
          font-size: 12px;
          background-color: #3e352b;
          color: #fff;
          position: absolute;
          top: 94px;
          left: -40px;
          cursor: pointer;
        }
      }
    }
    /* 公告 */
    .ad {
      width: 100%;
      height: 30px;
      padding: 0px 10px;
      color: white;
      text-align: center;
      line-height: 30px;
      font-size: 12px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      background: rgba(5, 4, 4, 0.5);
      position: absolute;
      bottom: 4px;
      right: 10px;
      .ad_box {
        display: inline-block;
        width: 26px;
        height: 14px;
        font-weight: bold;
        text-align: center;
        line-height: 14px;
        font-size: 11px;
        background: white;
        color: black;
      }
    }
  }

  /* 一级路由 */
  .router-link-div {
    display: flex;
    justify-content: space-around;
    line-height: 50px;

    a {
      font-size: 18px;
      color: #000d00;
    }

    .router-link-exact-active {
      color: #f60;
    }
  }

  .shopcar-bar {
    position: fixed;
    width: 100%;
    height: 60px;
    bottom: 0;
    background: #141c27;
    display: flex;
    justify-content: space-between;
    .shopcar-box1 {
      width: 70%;
      height: 30px;
      padding: 15px 0px;
      font-weight: bold;
      text-align: center;
      line-height: 30px;
      position: relative;
      img {
        width: 60px;
        height: 60px;
        position: absolute;
        left: 20px;
        top: -16px;
        border: 5px solid #141c27;
        border-radius: 50%;
      }
      .price {
        display: inline-block;
        width: 50px;
        height: 30px;
        line-height: 30px;
        font-size: 18px;
        border-right: 1px solid gray;
        margin-left: 50px;
      }
      .song {
        display: inline-block;
        width: 100px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 13px;
        margin-left: 10px;
      }
    }
    .shopcar-box2 {
      width: 30%;
      height: 60px;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      line-height: 60px;
      color: rgb(146, 146, 146);
      background: rgb(58, 57, 57);
    }
  }

  /* 购物车板子 */
  .shopcar-board {
    position: fixed;
    height: 100px;
    width: 100%;
    bottom: 60px;
    background-color: skyblue;
  }

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all 0.8s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.8s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(100px);
    opacity: 0;
  }
}
</style>