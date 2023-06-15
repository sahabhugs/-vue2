<template>
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveShow" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 三级联动 -->
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
                <transition>
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" >
                            <div class="item bo" 
                            v-for="(c1, index) in categoryList" :key="c1.categoryId"
                            @click="goSearch">
                                <h3 @mouseenter="changeIndex(index)" :class="{ cur: currentIndex === index }">
                                    <a :data-categoryName="c1.categoryName" :data-category1id="c1.categoryId" 
                                    href="javascript:;">{{ c1.categoryName }}</a>
                                </h3>
                                <!-- 二级、三级分类 -->
                                <div class="item-list clearfix" :style="{ display: currentIndex == index ? 'block' : 'none' }">
                                    <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName" :data-category2id="c2.categoryId" 
                                                href="javascript:;">{{ c2.categoryName }}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName" :data-category3id="c3.categoryId" 
                                                    href="javascript:;">{{ c3.categoryName }}/</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
//引入lodash
//这种引入方式：是把lodash全部功能函数引入
import _ from 'lodash';
//最好的引入方式，按需加载
import throttle from "lodash/throttle"
export default {
    name: 'TypeNav',
    data() {
        return {
        //响应式属性，存储用户鼠标移上哪一个一级分类
        currentIndex: -1, //代表鼠标谁都没有移上去
        show:true //显示或隐藏导航栏
       } 
    },
    //发送请求经常在mounted生命周期函数中进行
    //组件挂载完毕
    //组件挂载完毕：可以向服务器发送请求
    mounted() {
        //当组件挂载完毕，让show属性变为false
        //如果不是home路由组件，将typeNav进行隐藏
        if (this.$route.path !== '/home') {
             this.show = false;
        } 
    },
    computed: {
        ...mapState({
            //右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
            //注入一个参数state，其实即为大仓库中的数据
            categoryList: (state) => {
                return state.home.categoryList;
            }
        })
    },
    methods: {
        //鼠标进入修改响应式数据currentIndex属性
        changeIndex: throttle(function (index) {
            //index 鼠标移上某一个一级分类的元素的索引值
            //正常情况（用户慢慢的操作）：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
            //非正常情况（用户操作很快）：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发了
            //就是由于用户行为过快，导致浏览器反应不过来。如果当前回调函数中有一些大量业务，有可能出现卡顿现象
            this.currentIndex = index;
        },50),
        //进行路由跳转的方法
        goSearch(event) {
            //最好的解决方案：编程式导航+事件委派
            //利用事件委派会存在一些问题：
            //1：如何知道点击的是a标签？事件委派，是把全部的子节点【h3、dt、dl、em】的事件委派给父亲节点
            //而只有在点击a标签的时候，才会进行路由跳转【怎么能确定点击的一定是a标签】
            //2：即使能确定点击的是a标签，如何获取参数【1、2、3级分类的产品的名字、id】，如何区分是一级、二级、三级分类的标签

            //第一个问题：把子节点当中的a标签加上自定义属性data-categoryName，其余的子节点是没有的
            
            //获取到当前触发这个事件的节点【h3、a、dt、dl】，需要带有data-categoryname属性的这样的节点【一定是a标签】
            //节点有一个dataset属性，可以获取节点的自定义属性与属性值
            let { categoryname,category1id, category2id, category3id} = event.target.dataset;
            //如果标签身上拥有categoryname属性则一定是a标签
            if (categoryname) {
                //整理路由跳转的参数
                // let location = { name: 'search' };
                let query = { categoryName: categoryname };
                //一级、二级、三级分类的a标签
                if (category1id) {
                    query.category1Id = category1id;
                } else if (category2id) {
                    query.category2Id = category2id;
                } else {
                    query.category3Id = category3id;
                }
                //判断：如果路由 跳转的时候，带有params参数，捎带着传递过去
                if (this.$route.params) {
                    location.query = query;
                    //路由跳转
                    this.$router.push({
                        name: 'search',
                        query: query,
                        params: this.$route.params,
                    })
                }
            }
        },
        //鼠标进入时显示三级导航一二三级分类
        enterShow() {
            this.show = true;
        },
        //鼠标离开时隐藏三级导航一二三级分类
        leaveShow() {
            this.currentIndex = -1;
            //如果在home组件中，就一直显示，其他组件离开即隐藏
            if (this.$route.path != "/home") {
                this.show = false;
            }
        }
    }
}
</script>

<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }
                    .cur {
                            background-color: skyblue;
                        }

                    .item-list {
                        // display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        // 三级导航内容部分过渡动画
        //过渡动画开始的状态
        .sort-enter,
        .sort-leave-to {
            height: 0px;
        }

        //过渡动画的结束状态
        .sort-enter-to,
        .sort-leave {
            height: 461px;
        }

        //定义动画时间，速率
        .sort-enter-active,
        .sort-leave-active {
            overflow: hidden;
            transition: all .1s linear;
        }

    }
}
</style>