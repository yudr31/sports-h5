<template>
    <div>
        <van-nav-bar title="订单列表" left-text="返回" right-text="" left-arrow @click-left="onClickLeftRule"/>
        <van-tabs type="card" @click="changeTab" >
            <van-tab v-for="(tab, index) in showTabsList" :title="tab.label">
                <van-row type="flex" justify="center" align="center">
                    <van-col span="22">
                        <div class="demo-swipe-cell" v-for="(item, index) in itemList">
                            <van-cell-group class="cell-group">
                                <van-panel :title="item.arena" :status="item.payStatus">
                                    <div class="demo-col">
                                        <van-row justify="center"  align="center">
                                            <van-col span="14">使用日期：{{item.orderDate}}</van-col>
                                            <van-col span="10">开始时间：{{item.startTime}}</van-col>
                                        </van-row>
                                        <van-row justify="center"  align="center">
                                            <van-col span="14">预约场地：{{item.court}}</van-col>
                                            <van-col span="10">金额：{{item.amount}}元</van-col>
                                        </van-row>
                                    </div>
                                </van-panel>
                            </van-cell-group>
                        </div>
                    </van-col>
                </van-row>
            </van-tab>
        </van-tabs>
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
    CheckboxGroup, 
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
        [CheckboxGroup.name]: CheckboxGroup,
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
            itemList: [
                
            ],
            showTabsList: [
                {
                    label: '待支付',
                    value: '0'
                },
                {
                    label: '已取消',
                    value: '1'
                },
                {
                    label: '待开始',
                    value: '2'
                }
            ]
        }
    },
    methods: {
        changeTab(index,title) {
            var payStatus = this.getShowTabsListLabel(index);
            this.getData(payStatus);
        },
        getShowTabsListLabel(value){
            for (var i = 0; i < this.showTabsList.length; i++){
                if (value == this.showTabsList[i].value){
                    return this.showTabsList[i].label;
                }
            }
            return "";
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
        getUnpayStatusData(){
            this.getData('待支付');
        },
        getCancelStatusData(){
            this.getData('已取消');
        },
        getPaySuccessData(){
            this.getData('待开始');
        },
        getData(payStatus){
            var param = {payStatus: payStatus};
            this.$fetch("/orderInfo/orderInfoList",param).then( res => {
                if (res.code == "0"){
                    this.itemList = res.data.list
                }
            }).catch(res => {
               // console.log(res)
            });
        }
    },
    mounted(){
        this.getUnpayStatusData();
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