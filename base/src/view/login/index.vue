<template>
    <van-cell-group>
        <img class="user-poster" src="logo.png" >
        <van-field
            v-model="user.userName"
            required
            clearable
            label="用户名"
            icon="question"
            placeholder="请输入用户名"
            @click-icon="$toast('question')"
        />

        <van-field
            v-model="user.password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
        />
        <van-button type="primary" size="large" @click=login round>登录</van-button>
    </van-cell-group>
</template>
<script>
    import { Field, Toast, CellGroup, Button } from 'vant';
    import { router } from '../../router';
    
    export default {

        components: {
            [Field.name]: Field,
            [Button.name]: Button,
            [CellGroup.name]: CellGroup
        },

        data() {
            return {
                user: {
                    userName: "",
                    password: ""
                }
            }
        },

        methods: {
            login() {
                if (this.user.username == ""){
                    Toast('请输入用户名');
                    return;
                }
                if (this.user.password == ""){
                    Toast('请输入密码');
                    return;
                }
                this.$post("/login", this.user).then((response) => {
                    if (response.code == "0"){
                        router.push({name:"info"})
                    }
                }).catch(res => {
                   console.log(res)
                });
            }
        }
    }
</script>
<style lang="less">
.user {
    &-poster {
        width: 100%;
        display: block;
    }
}
.demo-button {
    .van-button {
        user-select: none;
        &--large {
            margin-bottom: 15px;
        }
    }
}
</style>