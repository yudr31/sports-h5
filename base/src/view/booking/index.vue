<template>
    <div>
        <van-nav-bar title="设置相关规则" left-text="返回" right-text="" left-arrow @click-left="onClickLeft"/>
        <van-panel title="请选择时间" >
            <van-datetime-picker :key="param.bookingTime" v-model="param.bookingTime" type="time" :min-hour="9" :max-hour="21" 
            :max-minute="0" v-bind:show-toolbar="false"/>
        </van-panel>
        <van-cell title="预订总时间：" v-model="durationDesc" @click="showDuration=true" required/>
        <van-cell title="选择日期" v-model="param.bookingDate" @click="showBookingDate=true" required/>
        <van-cell title="球场类型" v-model="courtTypeDesc" @click="showCourtType=true" required/>
        <van-cell title="通知方式" v-model="notifyTypeLabel" @click="showNotify=true" required/>
        <van-cell title="选择通知手机号" v-model="param.phone" @click="getNotifyAccountAndShow" required/>
        <van-cell title="最大通知次数" v-model="maxNotifyCountDesc" @click="showMaxNotifyCount=true" required/>
        <van-cell title="通知时间间隔" v-model="timeIntervalDesc" @click="showTimeInterval=true" required/>
        <van-cell title="是否直接下单"><van-switch v-model="orderChecked" size="20px" @change="changeOrderChecked"/></van-cell>
        <van-cell title="选择下单用户" v-model="orderUserName" @click="getOrderUserAndShow" v-bind:required="orderChecked"/>
        
        <van-actionsheet v-model="showDuration" title="预订总时间">
            <van-radio-group v-model="durationDesc" v-for="(item, index) in hourList">
                <van-cell-group>
                    <van-cell :title="item.label" clickable @click="changeDuration(index)">
                        <van-radio :name="item.label" />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </van-actionsheet>
        <van-actionsheet v-model="showBookingDate" title="请选择日期">
            <van-checkbox-group v-model="result" @change="changeBookDate()">
                <van-cell-group>
                    <van-cell v-for="(item, index) in dayList" clickable :key="item.id" :title="item.name" @click="toggle(index)">
                        <van-checkbox :name="item.name" ref="checkboxes" />
                    </van-cell>
                </van-cell-group>
            </van-checkbox-group>
        </van-actionsheet>
        <van-actionsheet v-model="showCourtType" title="预订球场类型">
            <van-radio-group v-model="courtTypeDesc" v-for="(item, index) in courtList">
                <van-cell-group>
                    <van-cell :title="item.label" clickable @click="changeCourtType(index)">
                        <van-radio :name="item.label"/>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </van-actionsheet>
        <van-actionsheet v-model="showNotifyAccount" title="请选择通知用户">
            <van-radio-group v-model="notifyUserName" v-for="(item, index) in notifyAccountList">
                <van-cell-group>
                    <van-cell :title="item.userName + ': ' + item.phone" clickable @click="changeNotifyUser(index)">
                        <van-radio :name="item.userName" />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
            <van-button type="primary" size="large" @click="showAddNotifyAccount=true">添加通知用户</van-button>
            <van-dialog v-model="showAddNotifyAccount" show-cancel-button :before-close="addNotifyAccountClose">
                <van-field v-model="notifyAccount.userName" label="用户名称" placeholder="请输入用户名称" required/>
                <van-field v-model="notifyAccount.phone" label="手机号" placeholder="请输入手机号" required/>
                <van-field center clearable v-model="notifyAccount.verifyCode" label="验证码" placeholder="请输入验证码" required>
                    <van-button slot="button" size="small" type="primary">发送验证码</van-button>
                </van-field>
            </van-dialog>
        </van-actionsheet>
        <van-actionsheet v-model="showMaxNotifyCount" title="最大通知次数">
            <van-radio-group v-model="maxNotifyCountDesc" v-for="(item, index) in notifyCountList">
                <van-cell-group>
                    <van-cell :title="item.label" clickable @click="changeNotifyCount(index)">
                        <van-radio :name="item.label"/>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </van-actionsheet>
        <van-actionsheet v-model="showTimeInterval" title="通知时间间隔">
            <van-radio-group v-model="timeIntervalDesc" v-for="(item, index) in timeIntervalList">
                <van-cell-group>
                    <van-cell :title="item.label" clickable @click="changeTimeInterval(index)">
                        <van-radio :name="item.label"/>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </van-actionsheet>
        <van-actionsheet v-model="showOrderUser" title="请选择下单用户">
            <van-radio-group v-model="orderUserName" v-for="(item, index) in orderUserList">
                <van-cell-group>
                    <van-cell :title="item.nickname + ': ' + item.userName" clickable @click="changeOrderUser(index)">
                        <van-radio :name="item.nickname" />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
            <van-button type="primary" size="large" @click="showAddUser=true">添加用户</van-button>
            <van-dialog v-model="showAddUser" show-cancel-button :before-close="beforeClose">
                <van-field v-model="outerUser.nickname" label="用户昵称" placeholder="请输入用户昵称"/>
                <van-field v-model="outerUser.userName" label="趣运动账号" placeholder="请输入趣运动账号"/>
                <van-field v-model="outerUser.password" type="password" label="密码" placeholder="请输入密码"/>
            </van-dialog>
        </van-actionsheet>
        
        <van-actionsheet v-model="showNotify" title="请选择通知方式">
            <van-radio-group v-model="notifyTypeLabel" v-for="(item, index) in notifyList">
                <van-cell-group>
                    <van-cell :title="item.label" clickable @click="changeNotifyType(index)">
                        <van-radio :name="item.label"/>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </van-actionsheet>
        <div class="footer">
            <van-button type="warning" size="large" @click=cancle>取消</van-button>
            <van-button type="primary" size="large" @click=save>提交</van-button>
        </div>
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
    Actionsheet, 
    DatetimePicker, 
    Radio, 
    RadioGroup, 
    Switch, 
    SwitchCell,
    Dialog
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
        [Actionsheet.name]: Actionsheet,
        [DatetimePicker.name]: DatetimePicker,
        [Radio.name]: Radio,
        [RadioGroup.name]: RadioGroup,
        [Switch.name]: Switch,
        [SwitchCell.name]: SwitchCell,
        [Dialog.name]: Dialog
    },
    mounted(){
        this.query();
    },
    data() {
        return {
            param: {
                bookingTime: '18:00',
                duration: '2',
                bookingDate: '',
                courtType: '号场',
                orderNow: "0",
                orderUser: "",
                notifyType: "2",
                phone: "",
                maxNotify: "1",
                timeInterval: "1"
            },
            notifyAccount: {
                userName: "",
                phone: "",
                verifyCode: ""
            },
            outerUser: {
                nickname: "",
                userName: "",
                password: ""
            },
            durationDesc: '',
            courtTypeDesc: '',
            maxNotifyCountDesc: '1次',
            timeIntervalDesc: '1分钟',

            showDuration: false,
            showBookingDate: false,
            showCourtType: false,
            showNotifyAccount: false,
            showMaxNotifyCount: false,
            showTimeInterval: false,
            orderChecked: false,
            showOrderUser: false,
            showAddNotifyAccount: false,
            showAddUser: false,
            showNotify: false,
            result: [
                
            ],
            notifyUserName: "",
            orderUserName: "",
            notifyTypeLabel: "",
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
            orderUserList: [
                
            ],
            notifyAccountList: [
                
            ],
            notifyList: [
                {
                    value: '1',
                    label: '短信'
                },
                {
                    value: '2',
                    label: '电话'
                },
                {
                    value: '3',
                    label: '钉钉'
                }
            ],
            hourList: [
                {
                    value: '1',
                    label: '1小时'
                },
                {
                    value: '2',
                    label: '2小时'
                },
                {
                    value: '3',
                    label: '3小时'
                }
            ],
            courtList: [
                {
                    value: '%',
                    label: '全部'
                },
                {
                    value: '号场',
                    label: '非VIP球场'
                },
                {
                    value: 'VIP',
                    label: '仅VIP球场'
                }
            ],
            notifyCountList: [
                {
                    value: '1',
                    label: '1次'
                },
                {
                    value: '2',
                    label: '2次'
                },
                {
                    value: '3',
                    label: '3次'
                },
                {
                    value: '5',
                    label: '5次'
                }
            ]
            ,
            timeIntervalList: [
                {
                    value: '1',
                    label: '1分钟'
                },
                {
                    value: '5',
                    label: '5分钟'
                },
                {
                    value: '10',
                    label: '10分钟'
                },
                {
                    value: '30',
                    label: '30分钟'
                }
            ]
        }
    },
    methods: {
        getNotifyAccountAndShow(){
            this.getNotifyAccount();
            this.showNotifyAccount = true;
        },
        getNotifyAccount() {
            this.$fetch("/notifyAccount/notifyAccountList").then( res => {
                if (res.code == "0"){
                    this.notifyAccountList = res.data.list;
                }
            }).catch(res => {
                console.log(res)
            });

        },
        addNotifyAccountClose(action, done){
            if (action === 'confirm') {
                if(!this.notifyAccount.userName){
                    Toast('用户名不能为空');
                    done(false);
                    return;
                }
                if(!this.notifyAccount.phone){
                    Toast('手机号不能为空');
                    done(false);
                    return;
                }
                if(!this.notifyAccount.verifyCode){
                    Toast('验证码不能为空');
                    done(false);
                    return;
                }
                this.$put("/notifyAccount/addNotifyAccount",this.notifyAccount)
                .then( res => {
                    var data = res.data;
                    if (res.code != "0"){
                        done(false);
                        return;
                    } else {
                        done();
                        this.getNotifyAccount();
                    }
                }).catch(res => {
                    console.log(res)
                });
            } else {
                done();
            }
        },
        changeOrderChecked(checked){
            if (checked){
                this.param.orderNow = 1;
            } else {
                this.param.orderNow = 0;
                this.orderUserName = "";
                this.param.orderUser = "";
            }
        },
        getOrderUserAndShow(){
            this.getOrderUser();
            this.showOrderUser = true;
        },
        getOrderUser() {
            this.$fetch("/outerUser/outerUserList").then( res => {
                if (res.code == "0"){
                    this.orderUserList = res.data.list;
                    for (var i = 0; i < this.orderUserList.length; i++){
                        if (this.param.orderUser == this.orderUserList[i].gid){
                            this.orderUserName = this.orderUserList[i].nickname;
                            return;
                        }
                    }
                }
            }).catch(res => {
                console.log(res)
            });
        },
        cancle(){
            router.go(-1);
        },
        save(){
            if (!this.param.bookingDate){
                Toast('请选择预订日期！');
                return;
            }
            var url = this.param.gid ? "editBookingInfo" : "addBookingInfo";
            this.$fetch("/bookingInfo/" + url, this.param).then( res => {
                var data = res.data;
                if (res.code == "0"){
                    router.push({name:'rule'})
                }
            }).catch(res => {
                console.log(res)
            });
        },
        toggle(index) {
            this.$refs.checkboxes[index].toggle();            
        },
        changeBookDate(){
            this.param.bookingDate = this.result.join(',');
        },
        onClickLeft() {
            router.go(-1);
        },
        onClickRight() {
            Toast('按钮');
        },
        // 改变预订总时间（时长）
        changeDuration(index){
            this.durationDesc = this.hourList[index].label;
            this.param.duration = this.hourList[index].value;
        },
        changeCourtType(index){
            this.courtTypeDesc = this.courtList[index].label;
            this.param.courtType = this.courtList[index].value;
        },
        changeNotifyUser(index){
            this.param.phone = this.notifyAccountList[index].phone;
            this.notifyUserName = this.notifyAccountList[index].userName;
        },
        changeNotifyCount(index){
            this.param.maxNotify = this.notifyCountList[index].value;
            this.maxNotifyCountDesc = this.notifyCountList[index].label;
        },
        changeTimeInterval(index){
            this.param.timeInterval = this.timeIntervalList[index].value;
            this.timeIntervalDesc = this.timeIntervalList[index].label;
        },
        changeOrderUser(index){
            this.param.orderUser = this.orderUserList[index].gid;
            this.orderUserName = this.orderUserList[index].nickname;
        },
        beforeClose(action, done) {
            if (action === 'confirm') {
                var user = {
                    id: '3',
                    name: '王五'
                }
                this.userList.push(user)
                // setTimeout(done, 1000);
            }
            done();
        },
        changeNotifyType(index){
            this.param.notifyType = this.notifyList[index].value;
            this.notifyTypeLabel = this.notifyList[index].label;
        },
        getLabelByList(list, value){
            for (var i = 0; i < list.length; i++){
                if (value == list[i].value){
                    return list[i].label;
                }
            }
            return "";
        },
        initData(){
            this.notifyTypeLabel = this.getLabelByList(this.notifyList,this.param.notifyType);
            this.durationDesc = this.getLabelByList(this.hourList,this.param.duration);
            this.courtTypeDesc = this.getLabelByList(this.courtList,this.param.courtType);
            this.maxNotifyCountDesc = this.getLabelByList(this.notifyCountList,this.param.maxNotify);
            this.timeIntervalDesc = this.getLabelByList(this.timeIntervalList,this.param.timeInterval);
        }
    },
    mounted() {
        // console.log(this.$route.params.gid); // params参数
        var param = this.$route.query;
        if (param.gid){
            this.$fetch("/bookingInfo/bookingInfoDetail", param).then( res => {
                if (res.code == "0"){
                    this.param = res.data;
                    this.result = res.data.bookingDate.split(",");
                    this.getOrderUser();
                    this.initData();
                    if (res.data.orderNow == 1){
                        this.orderChecked = true;
                    }
                }
            }).catch(res => {
                console.log(res)
            });
        } else {
            this.initData();
        }
    }
};
</script>
<style scoped>
    .footer{
        display:flex;
    }
</style>