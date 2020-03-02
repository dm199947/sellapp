<template>
  <div class="goods">
    <Row class="goods-div">
      <!-- 右边商品 -->
      <i-Col span="18" push="6" class="right-div">
        <ul class="content">
          <div :id="i" v-for="(v,i) in this.goodslist" :key="i" class="right-type">
            <p class="solo">{{v.name}}</p>
            <div v-for="(x,y) in goodslist[i].foods" :key="y" class="right-show">
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
                    <i-Col span="16">
                      <span class="money01">￥{{x.price}}</span>
                      <span class="money02">
                        ￥
                        <del>{{x.oldPrice}}</del>
                      </span>
                    </i-Col>
                    <i-Col span="8">
                      <button v-show="x.num >= 1" @click="clickAdd(x.name,-1)" class="remove">-</button>
                      <span v-show="x.num>=1">{{x.num}}</span>
                      <button @click="clickAdd(x.name,1)" class="add">+</button>
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
            v-for="(v,i) in this.goodslist"
            :key="i"
            class="category"
          >
            <!-- item.type -1没有 1折 2减 3...a  不要在v-for中使用v-if   v-if频繁操作节点，会让代码变得非常野鸡（性能低）-->
            <!-- <img style="width: 12px" v-show="v.type == 1" src="../assets/imgs/icon1.png" />
            <img style="width: 12px" v-show="v.type == 2" src="../assets/imgs/icon2.png" />-->
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
      curSelected: 0
    };
  },
  created() {
    //发送初始化请求
    getGoods().then(res => {
      // console.log(res.data.data);
      // this.list = res.data.data;

      //要改变vuex的内容，commit + mutation
      this.$store.commit("initGoodsList", res.data.data);
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
    this.rightDiv = new BScroll(document.querySelector(".right-div"), {
      click: true,
      probeType: 3 //实时派发滚动事件
    });

    this.rightDiv.on("scroll", ({ y }) => {
      //o(形参=滚动距离的对象)
      // console.log(Math.abs(y));
      let _y = Math.abs(y);

      //获取div的高度?计算所有div的高度，而且还要高频获取（反复获取，要考虑性能）
      for (let divObj of this.getDivMath) {
        //根据计算完毕的DIV对象，判断y的区间端，如果处于某一个区间端，那么就吧左侧索引设置为对应的位置
        if (_y >= divObj.min && _y < divObj.max) {
          this.curSelected = divObj.index;
          return; //结束剩下的所有循环
        }
      }

      // this.getDivMath;

      console.log(_y);
      /* //第一个div是1078 第二个div是124 第三个div是124
      if(_y >=0 && _y<1078){
        this.curSelected = 0 //现在y坐标处于id为0的div内部，所以索引选中0
      }else if(_y >=1078 && _y<1202){
        this.curSelected = 1 //现在y坐标处于id为1的div内部，所以索引选中1
      }else if(_y >=1202 && _y<1326){
        this.curSelected = 2 //现在y坐标处于id为2的div内部，所以索引选中2
      } */
    });

    //实例对象。API函数（）
    //事件监听:实例对象.on（事件名,回家函数）
  },
  methods: {
    clickLeftTitle(i) {
      //点击选项卡，把新的索引保存起来
      this.curSelected = i;
      // console.log(title);

      //让右侧滚动起来 querySelector不支持数字字符串ID
      //左侧索引index,对应右侧DIV id
      this.rightDiv.scrollToElement(document.getElementById(i), 600); //用实例对象，要调用的函数
    },

    /* 点击减号的时候 */
    // clickDec(name){
    // console.log('减少了一份：',name);
    //改变vuex中对应商品的数量 -1

    // },
    /* 点击加号的时候 */
    clickAdd(name, val) {
      // console.log('增加了一份：',name);
      //改变vuex中对应商品的数量 +1
      this.$store.commit("addnum", {
        name,
        val
      });
    }
  },

  //计算属性：会进行运算结果缓存，取10次或者1万次，它都是读取第一次运算完的缓存结果
  //计算属性因为是属性，所以没法传值。计算属性必须有return。不能作为事件句柄去绑定。
  //性能比methods高n倍，因为他不会重复运算。除非内部引用的数据发生了变化，才会重新计算一次
  computed: {
    //获取div的高度?计算所有div的高度，而且还要高频获取（反复获取，要考虑性能）
    getDivMath() {
      //算法
      let arr = [];
      let total = 0; //之前div所有高度的累计
      //获取div的高度,根据数组索引，获取每一个div的高度
      for (let i = 0; i < this.goodslist.length; i++) {
        // arr.push(document.getElementById(i).offsetHeight);
        let curDivHeight = document.getElementById(i).offsetHeight;

        //min：之前div的高度累计 max：之前div累加的高度 + 自身的高度
        arr.push({ min: total, max: total + curDivHeight, index: i });

        //每循环一次累计之前div的高度
        total += curDivHeight;
      }

      // console.log(arr);

      return arr;
    },

    //获取vuex中的共享数据
    goodslist() {
      return this.$store.state.goodslist;
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
  height: 100%;
  flex: 1;
  .goods-div {
    height: 100%;
    flex: 1;
    border-top: 1px solid #e4e4e5;
    /* 左边商品类别 */
    .left-div {
      height: 100%;
      flex: 1;
      background-color: #f3f6f6;
      // overflow: scroll;
      .category {
        height: 60%;
        padding: 10px 0px;
        text-align: center;
        border-bottom: 1px solid #dcdfdf;
        span {
          font-size: 16px;
        }
      }
    }
    /* 右边商品 */
    .right-div {
      height: 540px;
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
                width: 20px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border-radius: 10px;
                border: 0;
                outline: none;
                background-color: #00a1dc;
                color: #fff;
                font-size: 20px;
              }
              .remove {
                width: 20px;
                height: 20px;
                text-align: center;
                line-height: 5px;
                border-radius: 10px;
                border: 1px solid #00a1dc;
                background-color: #fff;
                outline: none;
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