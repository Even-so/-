// pages/personal/personal.js
import request from "../../utils/request";
Page({
    /**
     * 页面的初始数据
     */
    data: {
        realName: "", //真实姓名
        telNumber: "", //电话号码
        array: ["请选择", "男", "女"],
        objectArray: [
            {
                id: 0,
                name: "请选择",
            },
            {
                id: 1,
                name: "男",
            },
            {
                id: 2,
                name: "女",
            },
        ],
        date: "请选择", //生日选择器
        region: ["请选择"], //省市区选择器  0为省 1为市 2为区
        index: 0, //性别
        userInfo: {}, //微信获取的头像和昵称
        //日期
        year: "",
        mon: "",
        day: "",

        //弹窗设置
        show: false,
        duration: 300,
        position: "bottom",
        round: true,
        overlay: true,
        customStyle: "",
        overlayStyle: "",
    },
    //性别选择器
    //0未选择   1男   2女
    bindPickerChange: function (e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        this.setData({
            index: e.detail.value,
        });
    },
    //填写电话
    getPhoneNumber: function () {
        this.setData({
            show: true,
        });
    },
    exit() {
        this.setData({ show: false });
    },
    //生日选择器
    bindDateChange: function (e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        this.setData({
            date: e.detail.value,
        });
    },
    //省市区选择器
    bindRegionChange: function (e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        this.setData({
            region: e.detail.value,
        });
    },
    bindsubmit: async function () {
        let GoodsListData = await request(
            "/users.php?action=login",
            {
                nickName: this.data.userInfo.nickName,
                realName: this.data.realName,
                telNumber: this.data.telNumber,
                gender: this.data.index,
                birthday: this.data.date,
                sheng: this.data.region[0],
                shi: this.data.region[1],
                qu: this.data.region[2],
            },
            "post"
        );
        console.log(GoodsListData);
        wx.navigateTo({
            url: "/pages/index/index",
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (option) {
        //从主页获取用户信息
        this.setData({
            userInfo: JSON.parse(option.userInfo),
        });
        console.log(this.data.userInfo);

        //获取日期
        /* var timestamp = Date.parse(new Date());
        var date = new Date(timestamp);
        var y = date.getFullYear();
        console.log(typeof y); */
        this.setData({
            //获取年份
            year: new Date().getFullYear(),
            mon: new Date().getMonth() + 1,
            day: new Date().getDate(),
        });
        console.log(this.data.year);
        console.log(this.data.mon);
        console.log(this.data.day);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
});
