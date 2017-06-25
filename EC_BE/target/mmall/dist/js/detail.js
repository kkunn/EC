webpackJsonp([3],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(109);


/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: kkun
	* @Date:   2017-05-18 19:30:12
	* @Last Modified by:   kkun
	* @Last Modified time: 2017-06-21 05:42:54
	*/

	'use strict';
	__webpack_require__(3);
	var _mm     = __webpack_require__(8);
	// 通用页面头部
	var header = {
	    init : function(){
	        this.onLoad();
	        this.bindEvent();
	    },
	    onLoad : function(){
	        var keyword = _mm.getUrlParam('keyword');
	        // keyword存在，则回填输入框
	        if(keyword){
	            $('#search-input').val(keyword);
	        };
	    },
	    bindEvent : function(){
	        var _this = this;
	        // 点击搜索按钮以后，做搜索提交
	        $('#search-btn').click(function(){
	            _this.searchSubmit();
	        });
	        // 输入会车后，做搜索提交
	        $('#search-input').keyup(function(e){
	            // 13是回车键的keyCode
	            if(e.keyCode === 13){
	                _this.searchSubmit();
	            }
	        });
	    },
	    // 搜索的提交
	    searchSubmit : function(){
	        var keyword = $.trim($('#search-input').val());
	        // 如果提交的时候有keyword,正常跳转到list页
	        if(keyword){
	            window.location.href = './list.html?keyword=' + keyword;
	        }
	        // 如果keyword为空，直接返回首页
	        else{
	            _mm.goHome();
	        }
	    }
	};

	header.init();

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: kkun 
	* @Date:   2017-06-17 14:17:01
	* @Last Modified by:   kkun
	* @Last Modified time: 2017-06-21 04:26:57
	*/

	'use strict';
	__webpack_require__(13);
	var _mm     = __webpack_require__(8);
	var _user   = __webpack_require__(15);
	var _cart   = __webpack_require__(16);
	// 导航
	var nav = {
	    init : function(){
	        this.bindEvent();
	        this.loadUserInfo();
	        this.loadCartCount();
	        return this;
	    },
	    bindEvent : function(){
	        // 登录点击事件
	        $('.js-login').click(function(){
	            _mm.doLogin();
	        });
	        // 注册点击事件
	        $('.js-register').click(function(){
	            window.location.href = './user-register.html';
	        });
	        // 退出点击事件
	        $('.js-logout').click(function(){
	            _user.logout(function(res){
	                window.location.reload();
	            }, function(errMsg){
	                _mm.errorTips(errMsg);
	            });
	        });
	    },
	    // 加载用户信息
	    loadUserInfo : function(){
	        _user.checkLogin(function(res){
	            $('.user.not-login').hide().siblings('.user.login').show()
	                .find('.username').text(res.username);
	        }, function(errMsg){
	            // do nothing
	        });
	    },
	    //加载购物车数量
	    loadCartCount : function(){
	        _cart.getCartCount(function(res){
	            $('.nav .cart-count').text(res || 0);
	        }, function(errMsg){
	            $('.nav .cart-count').text(0);
	        });
	    }
	};

	module.exports = nav.init();

/***/ }),

/***/ 13:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: kkun
	* @Date:   2017-05-17 17:04:32
	* @Last Modified by:   kkun
	* @Last Modified time: 2017-06-21 04:27:20
	*/

	'use strict';

	var _mm = __webpack_require__(8);

	var _user = {
	    // 用户登录
	    login : function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/login.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 检查用户名
	    checkUsername : function(username, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/check_valid.do'),
	            data    : {
	                type    : 'username',
	                str     : username
	            },
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 用户注册
	    register : function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/register.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 检查登录状态
	    checkLogin : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/get_user_info.do'),
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 获取用户密码提示问题
	    getQuestion : function(username, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/forget_get_question.do'),
	            data    : {
	                username : username
	            },
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 检查密码提示问题答案
	    checkAnswer : function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/forget_check_answer.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 重置密码
	    resetPassword : function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/forget_reset_password.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 获取用户信息
	    getUserInfo : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/get_information.do'),
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 更新个人信息
	    updateUserInfo : function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/update_information.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 登录状态下更新密码
	    updatePassword : function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/reset_password.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 登出
	    logout : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/logout.do'),
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    }
	}
	module.exports = _user;

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: kkun
	* @Date:   2017-05-17 18:55:04
	* @Last Modified by:   kkun
	* @Last Modified time: 2017-06-21 04:27:32
	*/

	'use strict';

	var _mm = __webpack_require__(8);

	var _cart = {
	    // 获取购物车数量
	    getCartCount : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/get_cart_product_count.do'),
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 添加到购物车
	    addToCart : function(productInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/add.do'),
	            data    : productInfo,
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 获取购物车列表
	    getCartList : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/list.do'),
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 选择购物车商品
	    selectProduct : function(productId, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/select.do'),
	            data    : {
	                productId : productId
	            },
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 取消选择购物车商品
	    unselectProduct : function(productId, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/un_select.do'),
	            data    : {
	                productId : productId
	            },
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 选中全部商品
	    selectAllProduct : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/select_all.do'),
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 取消选中全部商品
	    unselectAllProduct : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/un_select_all.do'),
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 更新购物车商品数量
	    updateProduct : function(productInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/update.do'),
	            data    : productInfo,
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 删除指定商品
	    deleteProduct : function(productIds, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/delete_product.do'),
	            data    : {
	                productIds : productIds
	            },
	            success : resolve,
	            error   : reject
	        });
	    },
	}
	module.exports = _cart;

/***/ }),

/***/ 109:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: kkun
	* @Date:   2017-05-28 19:45:49
	* @Last Modified by:   kkun
	* @Last Modified time: 2017-06-21 20:04:45
	*/

	'use strict';

	__webpack_require__(110);
	__webpack_require__(12);
	__webpack_require__(2);
	var _mm             = __webpack_require__(8);
	var _product        = __webpack_require__(112);
	var _cart           = __webpack_require__(16);
	var templateIndex   = __webpack_require__(113);

	var page = {
	    data : {
	        productId : _mm.getUrlParam('productId') || '',
	    },
	    init : function(){
	        this.onLoad();
	        this.bindEvent();
	    },
	    onLoad : function(){
	        // 如果没有传productId, 自动跳回首页
	        if(!this.data.productId){
	            _mm.goHome();
	        }
	        this.loadDetail();
	    },
	    bindEvent : function(){
	        var _this = this;
	        // 图片预览
	        $(document).on('mouseenter', '.p-img-item', function(){
	            var imageUrl   = $(this).find('.p-img').attr('src');
	            $('.main-img').attr('src', imageUrl);
	        });
	        // count的操作
	        $(document).on('click', '.p-count-btn', function(){
	            var type        = $(this).hasClass('plus') ? 'plus' : 'minus',
	                $pCount     = $('.p-count'),
	                currCount   = parseInt($pCount.val()),
	                minCount    = 1,
	                maxCount    = _this.data.detailInfo.stock || 1;
	            if(type === 'plus'){
	                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
	            }
	            else if(type === 'minus'){
	                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
	            }
	        });
	        // 加入购物车
	        $(document).on('click', '.cart-add', function(){
	            _cart.addToCart({
	                productId   : _this.data.productId,
	                count       : $('.p-count').val()
	            }, function(res){
	                window.location.href = './result.html?type=cart-add';
	            }, function(errMsg){
	                _mm.errorTips(errMsg);
	            });
	        });
	    },
	    // 加载商品详情的数据
	    loadDetail : function(){
	        var _this       = this,
	            html        = '',
	            $pageWrap   = $('.page-wrap');
	        // loading
	        $pageWrap.html('<div class="loading"></div>');
	        // 请求detail信息
	        _product.getProductDetail(this.data.productId, function(res){
	            _this.filter(res);
	            // 缓存住detail的数据
	            _this.data.detailInfo = res;
	            // render
	            html = _mm.renderHtml(templateIndex, res);
	            $pageWrap.html(html);
	        }, function(errMsg){
	            $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了</p>');
	        });
	    },
	    // 数据匹配
	    filter : function(data){
	        data.subImages = data.subImages.split(',');
	    }
	};
	$(function(){
	    page.init();
	})

/***/ }),

/***/ 110:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: kkun
	* @Date:   2017-05-27 18:26:52
	* @Last Modified by:   kkun
	* @Last Modified time: 2017-06-21 04:27:27
	*/

	'use strict';

	var _mm = __webpack_require__(8);

	var _product = {
	    // 获取商品列表
	    getProductList : function(listParam, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/product/list.do'),
	            data    : listParam,
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 获取商品详细信息
	    getProductDetail : function(productId, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/product/detail.do'),
	            data    : {
	                productId : productId
	            },
	            success : resolve,
	            error   : reject
	        });
	    }
	}
	module.exports = _product;

/***/ }),

/***/ 113:
/***/ (function(module, exports) {

	module.exports = "<div class=\"intro-wrap\"> <div class=\"p-img-con\"> <div class=\"main-img-con\"> <img class=\"main-img\" src=\"{{imageHost}}{{mainImage}}\" alt=\"{{name}}\"/> </div> <ul class=\"p-img-list\"> {{#subImages}} <li class=\"p-img-item\"> <img class=\"p-img\" src=\"{{imageHost}}{{.}}\" alt=\"{{name}}\"/> </li> {{/subImages}} </ul> </div> <div class=\"p-info-con\"> <h1 class=\"p-name\">{{name}}</h1> <p class=\"p-subtitle\">{{subtitle}}</p> <div class=\"p-info-item p-price-con\"> <span class=\"label\">价格:</span> <span class=\"info\">￥{{price}}</span> </div> <div class=\"p-info-item\"> <span class=\"label\">库存:</span> <span class=\"info\">{{stock}}</span> </div> <div class=\"p-info-item p-count-con\"> <span class=\"label\">数量:</span> <input class=\"p-count\" value=\"1\" readonly=\"\"/> <span class=\"p-count-btn plus\">+</span> <span class=\"p-count-btn minus\">-</span> </div> <div class=\"p-info-item\"> <a class=\"btn cart-add\">加入购物车</a> </div> </div> </div> <div class=\"detail-wrap\"> <div class=\"detail-tab-con\"> <ul class=\"tab-list\"> <li class=\"tab-item active\">详细描述</li> </ul> </div> <div class=\"detail-con\"> {{{detail}}} </div> </div>";

/***/ })

});