<template>
    <div>
        <van-nav-bar title="个人信息" left-text="返回" right-text="" left-arrow @click-left="onClickLeftRule"/>
        <van-cell-group class="user-group">
            <van-cell title="昵称" v-model="user.nickname"/>
            <van-cell title="账号" v-model="user.userName"/>
        </van-cell-group>

        <van-cell-group class="user-group">
            <van-cell title="修改密码" @click="show=true"/>
        </van-cell-group>
        <van-dialog v-model="show" show-cancel-button :before-close="resetPassword">
            <van-field v-model="param.oldPassword" type="password" label="旧密码" placeholder="请输入旧密码" required/>
            <van-field v-model="param.password" type="password" label="新密码" placeholder="请输入新密码" required/>
            <van-field v-model="param.passwordAgain" type="password" label="确认密码" placeholder="请再次输入新密码" required/>
        </van-dialog>
        <van-cell-group class="user-group">
            <van-button type="primary" size="large" @click=logout round>退出登录</van-button>
        </van-cell-group>
    </div>
</template>

<script>
import { Row, Col, Icon, Cell, Field, CellGroup, Toast, NavBar, Button } from 'vant';
import { router } from '../../router';
import axios from "axios";

export default {
    components: {
        [Row.name]: Row,
        [Col.name]: Col,
        [Icon.name]: Icon,
        [Cell.name]: Cell,
        [Field.name]: Field,
        [CellGroup.name]: CellGroup,
        [NavBar.name]: NavBar,
        [Button.name]: Button
    },
    data() {
        return {
            show: false,
            user: {
                userName: '',
                nickname: ''
            },
            param: {
                oldPassword: '',
                password: '',
                passwordAgain: ''
            },
            itemList: [
                
            ]
        }
    },
    mounted(){
        this.getData();
    },
    methods: {
        getData() {
            this.$fetch("/userInfo").then( res => {
                console.log(res)
                if (res.code == "0"){
                    this.user = res.data;
                }
            }).catch(res => {
               console.log(res)
            });
        },
        notice() {
            Toast('登录');
            this.$fetch("/test/bookingCourt").then( res => {
               console.log(res)
            }).catch(res => {
               console.log(res)
            });
            router.push({name:'notice'});
        },

        logout() {
            this.$post("/logout").then( res => {
                if (res.code == "0"){
                    router.push({name:"login"})
                }
            }).catch(res => {
               console.log(res)
            });
        },
        onClickLeftRule(){
            router.go(-1);
        },
        resetPassword(action, done){
            if (action === 'confirm') {
                if (!this.param.oldPassword){
                    Toast('旧密码不能为空');
                    done(false);
                    return;
                }
                if (!this.param.password){
                    Toast('新密码不能为空');
                    done(false);
                    return;
                }
                if (this.param.password != this.param.passwordAgain){
                    Toast('您输入的两次密码不一样');
                    done(false);
                    return;
                }
                this.$post("/resetPassword", this.param).then( res => {
                    if (res.code == "0"){
                        Toast('设置成功');
                    } else {
                        done(false);
                        return;
                    }
                }).catch(res => {
                   console.log(res)
                });
                // setTimeout(done, 1000);
            }
            done();
        },
        cart(){
            router.push({name:'cart'});
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

    &-group {
        margin-top: 15px;
        margin-bottom: 15px;
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
