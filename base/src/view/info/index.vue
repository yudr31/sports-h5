<template>
    <div>
        <img class="user-poster" src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png">
        <van-row class="user-links">
            <van-col span="8">
                <van-icon name="pending-payment" @click="query" />
                趣运动账号
            </van-col>
            <van-col span="8">
                <van-icon name="pending-orders" @click="rule"/>
                订场设置
            </van-col>
            <van-col span="8">
                <van-icon name="pending-deliver" @click="notice"/>
                通知设置
            </van-col>
            <!--<van-col span="6">
                <van-icon name="logistics" />
                待发货
            </van-col>-->
        </van-row>

        <van-cell-group class="user-group">
            <van-cell icon="records" title="全部订单" is-link @click="orders"/>
        </van-cell-group>

        <van-cell-group>
            <van-cell icon="exchange" title="球场信息" is-link url="http://m.quyundong.com/court/detail?id=17056&cid=1"/>
            <van-cell icon="contact" title="我的账号" is-link @click="toUserCenter"/>
        </van-cell-group>
    </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup, Toast } from 'vant';
import { router } from '../../router';
import axios from "axios";

export default {
    components: {
        [Row.name]: Row,
        [Col.name]: Col,
        [Icon.name]: Icon,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup
    },
    mounted(){
        // this.query();
    },
    methods: {
        query() {
            router.push({name:'account'});
        },
        notice() {
            router.push({name:'notice'});
        },

        rule() {
            router.push({name:'rule'});
        },

        orders(){
            router.push({name:'order'});
        },
        cart(){
            router.push({name:'cart'});
        },
        toUserCenter(){
            router.push({name:'user'});
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
