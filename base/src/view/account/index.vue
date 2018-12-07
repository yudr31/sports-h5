<template>
	<div >
		<van-nav-bar title="账号信息" left-text="返回" right-text="" left-arrow @click-left="onClickLeftRule"/>
		<div>
			<van-row type="flex" justify="center" align="center">
				<van-col span="22">
					<div class="demo-swipe-cell" v-for="(item, index) in itemList">
                        <van-swipe-cell :right-width="65" :on-close="onClose.bind(this,index)">
    						<van-cell-group class="cell-group">
                                <van-cell :title="item.nickname" :value="item.userName" @click="editUserAccount(index)"/>
                            </van-cell-group>
                            <span slot="right">删除</span>
                        </van-swipe-cell>
					</div>
				</van-col>
			</van-row>
			<van-row type="flex" justify="center">
				<van-col span="22">
					<van-button type="primary" size="large" round @click="addUserAccount">添加用户账号</van-button>
				</van-col>
			</van-row>
            <van-dialog v-model="show" show-cancel-button :before-close="beforeClose2">
                <van-field v-model="user.nickname" label="用户昵称" placeholder="请输入用户昵称" required/>
                <van-field v-model="user.userName" label="趣运动账号" placeholder="请输入趣运动账号" required/>
                <van-field v-model="user.password" type="password" label="密码" placeholder="请输入密码" required/>
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
            done:'',
        	show: false,
            user: {
                nickname: '',
                userName: '',
                password: ''
            },
      		itemList: [
      			
      		]
        }
    },
    methods: {
        onClickLeftRule(){
            router.go(-1);
        },
        editUserAccount(index) {
            this.show = true;
            this.user = this.itemList[index];
        },
        addUserAccount() {
            this.show = true;
            this.user = {}
        },
        beforeClose2(action, done){
            document.querySelector('.van-hairline--top .van-button--default:nth-child(2)').innerHTML = '确认';
            document.querySelector('.van-hairline--top .van-button--default:nth-child(1)').innerHTML = '取消';
            this.beforeClose(action, done)
            return;
        },
        beforeClose(action, done) {
            if(!this.done){
                this.done = done;
            }
            if (action === 'confirm') {
                console.log(this.user.nickname,'this.user.nickname');
                if (!this.user.nickname){
                    Toast('用户昵称不能为空');
                    this.done(false);
                    return;
                }
                if (!this.user.userName){
                    Toast('趣运动账号不能为空');
                    this.done(false);
                    return;
                }
                if (!this.user.password){
                    Toast('用户密码不能为空');
                    this.done(false);
                    return;
                }
                var url = this.user.gid == undefined ? "addOuterUser" : "editOuterUser";
                this.$fetch("/outerUser/" + url,this.user).then( res => {
                    if (res.code == "0"){
                        this.done();
                        this.getData();
                    }
                }).catch(res => {
                   // console.log(res)
                   this.done();
                });
                // setTimeout(done, 1000);
            } else {
                this.done();
            }
        },
        onClose(index, clickPosition, instance) {
            switch (clickPosition) {
                case 'left':
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
                        this.$put("/outerUser/removeOuterUser",this.itemList[index]).then( res => {
                            if (res.code == "0"){
                                instance.close();
                                this.getData();
                            }
                        }).catch(res => {
                           // console.log(res)
                        });
                    });
                break;
            }
        },
        getData(){
            this.$fetch("/outerUser/outerUserList").then( res => {
                if (res.code == "0"){
                    this.itemList = res.data.list
                }
            }).catch(res => {
               // console.log(res)
            });
        }
    },
    mounted(){
        this.getData();
        var that = this;
        document.querySelector('.van-hairline--top .van-button--default:nth-child(2)').onclick = function(){
            that.beforeClose('confirm',function(){})
        }
        document.querySelector('.van-hairline--top .van-button--default:nth-child(1)').onclick = function(){
            that.beforeClose('cancel',function(){})
        }
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
        .van-swipe-cell__wrapper{
            .van-cell{
                .van-cell__title{
                    width:100%;
                    font-size: 14px;
                }
            }
        }
        &__right {
            color: white;
            font-size: 15px;
            width: 65px;
            display: inline-block;
            text-align: center;
            line-height: 44px;
            background-color: red;
        }
    }
}
</style>