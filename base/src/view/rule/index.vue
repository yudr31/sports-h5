<template>
	<div >
		<van-nav-bar title="规则列表" left-text="返回" right-text="" left-arrow @click-left="onClickLeftRule"/>
		<div>
			<van-row type="flex" justify="center" align="center">
				<van-col span="22">
					<div class="demo-swipe-cell" v-for="(item, index) in itemList">
						<van-swipe-cell :right-width="65" :left-width="65" :on-close="onClose">
							<span slot="left">选择</span>
							<van-cell-group class="cell-group">
								<div class="demo-col" @click="detail(index)">
				            		<van-row>
					            		<van-cell-group>
											<van-switch-cell v-model="item.checked" :title="item.bookingTime" 
											size="18px" @change="openBookingState(index)" />
										</van-cell-group>
										<van-col span="12">时间：{{item.bookingDate}}</van-col>
										<van-col span="12">抓取次数：{{item.grabCount}}</van-col>
									</van-row>
									<van-row>
										<van-col span="24">球场类型：{{item.courtTypeDesc}}</van-col>
									</van-row>
									<van-row>
										<van-col span="19">通知手机号：{{item.phone}}</van-col>
										<van-col span="5">
											<van-button size="mini" type="primary" round @click.stop="editRule(item.gid)"">修改</van-button>
										</van-col>
									</van-row>
								</div>
					        </van-cell-group>
					        <span slot="right">删除</span>
						</van-swipe-cell>
					</div>
				</van-col>
			</van-row>
			<van-actionsheet v-model="showDetail" title="详细信息">
				<van-cell title="抓取次数：" v-model="itemDetail.grabCount"/>
                <van-cell title="开始时间：" v-model="itemDetail.bookingTime"/>
                <van-cell title="预订总时间：" v-model="itemDetail.duration + '小时'"/>
		        <van-cell title="预订日期" v-model="itemDetail.bookingDate"/>
		        <van-cell title="球场类型" v-model="itemDetail.courtTypeDesc"/>
		        <van-cell title="通知方式" v-model="itemDetail.notifyTypeLabel"/>
		        <van-cell title="通知手机号" v-model="itemDetail.phone"/>
		        <van-cell title="最大通知次数" v-model="itemDetail.maxNotify + '次'"/>
		        <van-cell title="通知时间间隔" v-model="itemDetail.timeInterval + '分钟'"/>
		        <van-cell title="已通知次数" v-model="itemDetail.notifyCount + '次'"/>
		        <van-cell title="上次通知时间" v-model="itemDetail.notifyTime"/>
		        <van-cell title="是否直接下单" v-model="itemDetail.isOrderNow"/>
		        <van-cell title="下单用户" :key="itemDetail.orderUserName" v-model="itemDetail.orderUserName" />
        	</van-actionsheet>
			<van-row type="flex" justify="center">
				<van-col span="22">
					<van-button type="primary" size="large" round @click=addRule()>新建订场规则</van-button>
				</van-col>
			</van-row>
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
    SwitchCell, 
    DatetimePicker, 
    Radio, 
    RadioGroup, 
    Switch, 
    Dialog, 
    Actionsheet,
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
        [SwitchCell.name]: SwitchCell,
        [DatetimePicker.name]: DatetimePicker,
        [Radio.name]: Radio,
        [RadioGroup.name]: RadioGroup,
        [Switch.name]: Switch,
        [Dialog.name]: Dialog,
        [Actionsheet.name]: Actionsheet,
        [SwipeCell.name]: SwipeCell
    },
    data() {
        return {
            showList: false,
            chosenCoupon: true,
            showDetail: false,
            itemDetail: {

            },
      		itemList: [
      			
      		],
      		notifyList: [
                {
                    value: '1',
                    label: '短信'
                },
                {
                    value: '2',
                    label: '电话'
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
            ]
        }
    },
    methods: {
        getLabelByList(list, value){
            for (var i = 0; i < list.length; i++){
                if (value == list[i].value){
                    return list[i].label;
                }
            }
            return "";
        },
		openBookingState(index,checked) {
			this.chosenCoupon = false;
			var item = this.itemList[index];
			var message = item.checked ? "是否开启预订？" : "是否停止预订？";
			Dialog.confirm({
				title: '提醒',
				message: message
			}).then(() => {
				item.bookingState = item.checked ? 1 : 0;
				this.$fetch("/bookingInfo/updateBookingState",item).then( res => {
	                if (res.code == "0"){
	                	Toast('设置成功');
	                    this.getData();
	                }
	            }).catch(res => {
	               // console.log(res)
	            });
			});
		},
		addRule() {
			router.push({name:'booking'});
		},
        editRule(gid) {
            router.push({name:'booking',query:{gid:gid}});
            return false;
        },
        onClickLeftRule(){
        	router.go(-1);
        },
        detail(index){
        	var that = this;
	        setTimeout(function(){
	        	if (that.chosenCoupon){
	        		that.itemDetail = that.itemList[index];
	        		that.itemDetail.notifyTime = that.itemDetail.notifyTime.replace('T',' ');
	        		if (that.itemDetail.orderUser){
	        			that.getOuterUser(that.itemDetail.orderUser, true);
	        		} else {
						that.showDetail = true;
	        		}
	        	}
	        	that.chosenCoupon = true;
	        },200);
        },
        onClickRight() {
            Toast('按钮');
        },
        onClose(clickPosition, instance) {
			switch (clickPosition) {
				case 'left':
					Toast('按钮');
					instance.close();
					break;
				case 'cell':
				case 'outside':
					instance.close();
					break;
				case 'right':
					this.$dialog.confirm({
						message: '确定删除吗？'
					}).then(() => {
						instance.close();
					});
				break;
			}
		},
		getOuterUser(orderUser, showDetail){
			if (orderUser){
				var param = {"gid": orderUser};
				this.$fetch("/outerUser/outerUserDetail",param).then( res => {
	                if (res.code == "0"){
	                	this.itemDetail.orderUserName = res.data.nickname;
	                	if (showDetail){
			        		this.showDetail = true;
			        	}
	                }
	            }).catch(res => {
	               // console.log(res)
	            });
			}
            
		},
		getData(){
			this.$fetch("/bookingInfo/bookingInfoList").then( res => {
                if (res.code == "0"){
                	var data = res.data;
                	this.itemList = [];
                	for (var i = 0; i < data.list.length; i++){
                		var item = data.list[i];
                		item.checked = item.bookingState == 1;
                		item.courtTypeDesc = this.getLabelByList(this.courtList,item.courtType);
                		item.notifyTypeLabel = this.getLabelByList(this.notifyList,item.notifyType);
                		item.isOrderNow = item.orderNow == 0 ? "否" : "是";
                		this.itemList.push(item)
                	}
                }
            }).catch(res => {
               // console.log(res)
            });
		}
    },
    mounted(){
        this.getData();
    }
};
</script>
<style scorp lang="less">
.divFloat{
	display:flex;
	justify-content:space-between;
	padding:6px 0;
	div{
		&:nth-child(1){
			width:30%;
			display:flex;
			flex-direction: column; // 轴向  column：垂直 默认：左右方向
			justify-content:center; // 主轴上居中 center:居中 flex-start:按顺序排列 flex-end:反向 space-around:间隙相同 space-between:两边没有间隔
			align-items:center; // 侧轴 center：居中 flex-start:按顺序排列 flex-end:反向
			span{

			}
			i{
				font-style:normal;
			}
		}
		&:nth-child(2){
			width:40%;
			display:flex;
			flex-direction: column;
			span{

			}
			i{
				font-style:normal;
			}
		}
		&:nth-child(3){
			width:30%;
			flex:1; // 获取一份
			text-align:right;
			display:flex;
			justify-content:center;
			align-items:center;
		}
	}
}
.user {
    &-poster {
        width: 100%;
        display: block;
    }
}
.demo-col{
    .van-col{
        padding-left:17px;
        font-size: 15px;
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
.van-swipe-cell{
	.van-swipe-cell__wrapper{
		align-item:center;
		width:100%;
		.van-cell{
			.van-cell__title{
				width:100%;
				font-size: 24px;
			}
			.van-cell__label{
				width:100%;
			}
			.van-cell__value{
				width:40px;
				flex:none;
			}
		}
		.van-swipe-cell__right{
			height:44px;
			line-height:44px;
		}
	}

}
</style>