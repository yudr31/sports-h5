<template>
    <div>
        <van-nav-bar title="订单列表" left-text="返回" right-text="" left-arrow @click-left="onClickLeftRule"/>
        
        <van-tabs>
            <van-tab v-for="(item, index) in dayList" :title="item.name">

            </van-tab>
        </van-tabs>
        <van-row type="flex" justify="center" align="center">
            <van-col span="4">
                <van-badge-group :active-key="activeKey" @change="onChange">
                    <van-badge title="9:00" />
                    <van-badge title="10:00" />
                    <van-badge title="11:00" />
                    <van-badge title="12:00" />
                </van-badge-group>
            </van-col>
            <van-col span="20">
                <div>
                    <div class="demo-swipe-cell" v-for="(item, index) in itemList">
                        <van-cell-group class="cell-group">
                            <van-panel :title="item.arena" :status="item.payStatus">
                                <div class="demo-col">
                                    <van-row justify="center"  align="center">
                                        <van-col span="14">使用日期：{{item.orderDate}}</van-col>
                                        <van-col span="10">开始时间：{{item.hour}}</van-col>
                                    </van-row>
                                    <van-row justify="center"  align="center">
                                        <van-col span="14">预约场地：{{item.space}}</van-col>
                                        <van-col span="10">金额：{{item.amount}}</van-col>
                                    </van-row>
                                </div>
                            </van-panel>
                        </van-cell-group>
                    </div>
                </div>
            </van-col>
        </van-row>
    </div>
</template>
<script>
import { 
    Button, 
    CellGroup, 
    Checkbox, 
    Cell, 
    Field,
    Row, 
    Col, 
    NavBar, 
    Badge,
    BadgeGroup, 
    Panel, 
    Toast, 
    Tab, 
    Tabs, 
    Radio, 
    RadioGroup, 
    Switch, 
    Dialog, 
    SwipeCell 
} from 'vant';
import { router } from '../../router';
import axios from "axios";

export default {
    components: {
        [Button.name]: Button,
        [CellGroup.name]: CellGroup,
        [Checkbox.name]: Checkbox,
        [Cell.name]: Cell,
        [Field.name]: Field,
        [Row.name]: Row,
        [Col.name]: Col,
        [NavBar.name]: NavBar,
        [Badge.name]: Badge,
        [BadgeGroup.name]: BadgeGroup,
        [Panel.name]: Panel,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Radio.name]: Radio,
        [RadioGroup.name]: RadioGroup,
        [Switch.name]: Switch,
        [Dialog.name]: Dialog,
        [SwipeCell.name]: SwipeCell
    },
    data() {
        return {
            show: false,
            nickname: '',
            username: '',
            code: '',
            dayList: [
                {
                    id: '1',
                    name: '周一'
                },
                {
                    id: '2',
                    name: '周二'
                },
                {
                    id: '3',
                    name: '周三'
                },
                {
                    id: '4',
                    name: '周四'
                },
                {
                    id: '5',
                    name: '周五'
                },
                {
                    id: '6',
                    name: '周六'
                },
                {
                    id: '7',
                    name: '周日'
                }
            ],
            offsetWidth: 50,
            activeKey: '9:00',
            timeList: [
                '9:00',
                '10:00',
                '11:00',
                '12:00',
                '13:00',
                '14:00',
                '15:00',
                '16:00',
                '17:00',
                '18:00',
                '19:00',
                '20:00',
                '21:00',
                '22:00'
                
            ],
            itemList: [
                {
                    id: "1",
                    arena: "兴东羽毛球馆",
                    orderDate: '2018-10-22',
                    space: '11号场',
                    amount: '30.0元',
                    hour: "18:00",
                    payStatus: '可预订',
                    phone: "13399998888",
                    userNo: "张三"
                },
                {
                    id: "1",
                    arena: "兴东羽毛球馆",
                    space: '11号场',
                    orderDate: '2018-10-22',
                    amount: '75.0元',
                    hour: "18:00",
                    payStatus: '不可预订',
                    phone: "13377776666",
                    userNo: "李四"
                }
            ]
        }
    },
    methods: {
        changeTab(index,title) {
            console.log(index);
            console.log(title)
        },
        onClickLeftRule(){
            router.go(-1);
        },
        onClickRight() {
            Toast('按钮');
        },
        beforeClose(action, done) {
            if (action === 'confirm') {
                var user = {
                    id: '3',
                    phone: 'yuderen',
                    userNo: '王五'
                }
                this.itemList.push(user)
                // setTimeout(done, 1000);
            }
            done();
        },
        onChange(key) {
            this.activeKey = key;
            var data = {
                    id: "1",
                    arena: "兴东羽毛球馆",
                    orderDate: '2018-10-22',
                    space: '11号场',
                    amount: '130.0元',
                    hour: "18:00",
                    payStatus: '已取消',
                    phone: "13399998888",
                    userNo: "张三"
                };
            if (key % 2 == 0){
                this.itemList.push(data)
            } else {
                this.itemList.pop()
            }
            
        }
    }
};
</script>
<style lang="less">
.demo-col{
    .van-col{
        padding-left:17px;
        font-size: 14px;
    }
}
.user {
    &-poster {
        width: 100%;
        display: block;
    }
}
.cell {
    &-poster {
        width: 100%;
        display: block;
    }

    &-group {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    &-links {
        padding: 15px 0;
        font-size: 12px;
        text-align: center;
        background-color: #fff;

        .van-icon {
            display: block;
            font-size: 24px;
        }
    }
}
</style>