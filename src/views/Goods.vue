<template>
  <div class="goods">
    <Row class="goods-div">
      <!-- 右边商品 -->
      <i-Col span="18" push="6" class="right-div">
        <ul class="content">
          <div :id="i" v-for="(v,i) in this.list" :key="i" class="right-type">
            <p class="solo">{{v.name}}</p>
            <div v-for="(x,y) in list[i].foods" :key="y" class="right-show">
              <Row>
                <i-Col span="8" class="goodsimg">
                  <img :src="x.image" alt />
                </i-Col>
                <i-Col span="16" class="goodstxt">
                  <p class="name">{{x.name}}</p>
                  <p class="sketch">{{x.description}}</p>
                  <p class="sell">
                    月销售{{x.sellCount}}份
                    <span>好评率{{x.rating}}%</span>
                  </p>
                  <Row class="pay">
                    <i-Col span="20">
                      <span class="money01">￥{{x.price}}</span>
                      <span class="money02">{{x.oldPrice}}</span>
                    </i-Col>
                    <i-Col span="4">
                      <span class="add">
                        <Icon type="md-add-circle" />
                      </span>
                    </i-Col>
                  </Row>
                </i-Col>
              </Row>
            </div>
          </div>
        </ul>
      </i-Col>
      <!-- 左边商品类别 -->
      <i-Col span="6" pull="18" class="left-div">
        <!-- 只要想要实现bettrscroll容器效果，必须在此div下套一个ul class必须是content
              固定用法就是要套ul class=“content”不用去覆盖此ul的样式
        -->
        <ul class="content">
          <!-- 之前要滚动的内容 -->
          <div
            @click="clickLeftTitle(i)"
            :class="{selected:i == curSelected}"
            v-for="(v,i) in this.list"
            :key="i"
            class="category"
          >
            <!-- item.type -1没有 1折 2减 3...a  不要在v-for中使用v-if   v-if频繁操作节点，会让代码变得非常野鸡（性能低）-->
            <!-- <img style="width: 12px" v-show="v.type == 1" src="../assets/imgs/icon1.png" />
            <img style="width: 12px" v-show="v.type == 2" src="../assets/imgs/icon2.png" /> -->
            <!-- <img style="width: 12px" v-show="" src="../assets/imgs/icon3.png" /> -->
            <span>{{ v.name }}</span>
          </div>
        </ul>
      </i-Col>
    </Row>
  </div>
</template>

<script>
import { getGoods } from "../api/apis";
import BScroll from "better-scroll"; //引入BetterScroll滚动插件

export default {
  data() {
    return {
      list: [], //商品信息
      curSelected: 0
    };
  },
  created() {
    //发送初始化请求
    getGoods().then(res => {
      console.log(res.data.data);
      this.list = res.data.data;
    });
  },
  mounted() {
    //new BScroll(Dom节点)
    //一次只能初始化一个div，左右是分开的所以需要单独初始化
    //左侧
    new BScroll(document.querySelector(".left-div"), {
      click: true
    });
    //右侧
    this.rightDiv = new BScroll(document.querySelector(".right-div"));
  },
  methods: {
    clickLeftTitle(i) {
      //点击选项卡，把新的索引保存起来
      this.curSelected = i;
      // console.log(title);

      //让右侧滚动起来 querySelector不支持数字字符串ID
      //左侧索引index,对应右侧DIV id
      this.rightDiv.scrollToElement(document.getElementById(i), 600); //用实例对象，要调用的函数
    }
  }
};
</script>

<style lang="less" scoped>
/* 点击变化 */
.selected {
  background-color: #fff;
}
.goods {
  height: 500px;
  .goods-div {
    height: 100%;
    border-top: 1px solid #e4e4e5;
    /* 左边商品类别 */
    .left-div {
      height: 100%;
      background-color: #f3f6f6;
      overflow: scroll;
      .category {
        height: 90px;
        padding: 30px 0px;
        text-align: center;
        border-bottom: 1px solid #dcdfdf;
        span {
          font-size: 16px;
        }
      }
    }
    /* 右边商品 */
    .right-div {
      height: 100%;
      overflow: scroll;
      .solo {
        height: 100%;
        line-height: 30px;
        text-indent: 1em;
        background-color: #f3f6f6;
        border-left: 4px solid #e4e4e5;
        color: #8e959b;
      }
      .right-type {
        .right-show {
          height: 100%;
          padding: 20px;
          /* 商品图片 */
          .goodsimg {
            img {
              width: 90%;
            }
          }
          /* 商品描述 */
          .goodstxt {
            .name {
              font-size: 18px;
              color: #000;
              font-weight: bolder;
            }
            /* 商品价格 */
            .pay {
              .money01 {
                color: red;
                font-size: 18px;
                font-weight: bolder;
              }
              .add {
                color: #00a1dc;
                font-size: 20px;
              }
            }
          }
        }
      }
    }
  }
}
</style>