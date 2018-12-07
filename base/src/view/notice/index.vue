<template>
    <div class="van-doc-demo-section demo-swipe-cell">
        <van-nav-bar title="注册手机号列表" left-text="返回" right-text="" left-arrow @click-left="onClickLeftRule"/>
        <div>
            <van-row type="flex" justify="center" align="center">
                <van-col span="22">
                    <div class="van-doc-demo-section demo-swipe-cell" v-for="(item, index) in itemList" >
                        <van-swipe-cell :right-width="65" :on-close="onClose.bind(this,index)">
                            <van-cell-group class="cell-group">
                                <van-cell :title="item.userName" :value="item.phone" @click="editUser(index)"/>
                            </van-cell-group>
                            <span slot="right">删除</span>
                        </van-swipe-cell>
                    </div>
                </van-col>
            </van-row>
            <van-row type="flex" justify="center">
                <van-col span="22">
                    <van-button type="primary" size="large" round @click="show=true">添加用户账号</van-button>
                </van-col>
            </van-row>
            <van-dialog v-model="show" show-cancel-button :before-close="beforeClose">
                <van-field v-model="param.userName" label="用户名称称" placeholder="请输入用户名称" required/>
                <van-field v-model="param.phone" label="手机号" placeholder="请输入手机号" required/>
                <van-field center clearable v-model="param.verifyCode" label="验证码" placeholder="请输入验证码" required>
                    <van-button slot="button" size="small" type="primary">发送验证码</van-button>
                </van-field>
            </van-dialog>
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
        [Actionsheet.name]: Actionsheet,
        [DatetimePicker.name]: DatetimePicker,
        [Radio.name]: Radio,
        [RadioGroup.name]: RadioGroup,
        [Switch.name]: Switch,
        [Dialog.name]: Dialog,
        [SwipeCell.name]: SwipeCell
    },
    data() {
        return {
            show: false,
            param: {
                userName: '',
                phone: '',
                verifyCode: ''
            },
            itemList: [
                
            ]
        }
    },
    methods: {
        editUser(index) {
            this.show = true;
            this.param = this.itemList[index]
        },
        onClickLeftRule(){
            router.go(-1);
        },
        onClickRight() {
            Toast('按钮');
        },
        beforeClose(action, done) {
            if (action === 'confirm') {
                if(!this.param.userName){
                    Toast('用户名不能为空');
                    done(false);
                    return;
                }
                if(!this.param.phone){
                    Toast('手机号不能为空');
                    done(false);
                    return;
                }
                if(!this.param.verifyCode){
                    Toast('验证码不能为空');
                    done(false);
                    return;
                }
                this.$fetch("/notifyAccount/addNotifyAccount",this.param).then( res => {
                    if (res.code != "0"){
                        done(false);
                        return;
                    }
                    done();
                    this.getData();
                }).catch(res => {
                    console.log(res)
                });
            } else {
                done();
            }
            
        },
        onClose(index, clickPosition, instance) {
            switch (clickPosition) {
                case 'left':
                    Toast('按钮');
                    instance.close();
                    break;
                case 'cell':
                    test(index)
                case 'outside':
                    instance.close();
                    break;
                case 'right':
                this.$dialog.confirm({
                    message: '确定删除吗？'
                }).then(() => {
                    console.log("确定删除！");
                    instance.close();
                    this.itemList.splice(index,1);
                });
                break;
            }
        },
        getData(){
            this.$fetch("/notifyAccount/notifyAccountList").then( res => {
                if (res.code == "0"){
                    this.itemList = res.data.list;
                }
            }).catch(res => {
                console.log(res)
            });
        }
    },
    mounted() {
        this.getData();
    }
};
</script>
<style lang="less">
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
.demo-swipe-cell {
    user-select: none;
    .van-swipe-cell {
        
        &__right {
            color: white;
            font-size: 15px;
            width: 65px;
            height: 44px;
            display: inline-block;
            text-align: center;
            line-height: 44px;
            background-color: red;
        }
    }
}
</style>