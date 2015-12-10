'use strict';

var EventEmitter = __webpack_require__(10).EventEmitter;
var assign = __webpack_require__(11);
var AppDispatcher = __webpack_require__(4);
var actionType = __webpack_require__(8);
var SkuStores = __webpack_require__(12);

var EVENT_CHANGE = 'store::change';
var AppStores = assign({}, EventEmitter.prototype, {
    addChangeListener: function addChangeListener(callback, eventId) {
        var id = undefined;
        id = eventId ? eventId : '';
        // console.log(id)
        this.on(EVENT_CHANGE + id, callback);
    },
    removeChangeListener: function removeChangeListener(callback, eventId) {
        var id = undefined;
        id = eventId ? eventId : '';
        this.removeListener(EVENT_CHANGE + id, callback);
    },
    emitChange: function emitChange(eventId) {
        var id = undefined;
        id = eventId ? eventId : '';
        //console.log(id)
        this.emit(EVENT_CHANGE + id);
    }
});

var pageData = {};
var imgHelper = lib.img({
    'class': 'lazy', //图片class
    'dataSrc': 'data-src', //图片真实src 的data字段
    'size': '200x200', //cdn尺寸
    'sharpen': 's150', //锐化参数
    'q': ['q50', 'q30'], //图片质量[非弱网，弱网]
    'enableLazyload': true, //是否开启懒加载功能，默认true,
    'lazyHeight': 0, //[可选]，预加载当前屏幕以下lazyHeight内的图片，默认0
    'lazyWidth': 0, //[可选]，预加载当前屏幕右边lazyWidth内的图片，默认0
    'enalbeIOSWifiLoadMore': false //ios&&wifi情况下 是否取消懒加载,采用一次性加载，默认false
});
AppStores.pageData = pageData;
pageData.data = {
    firstLoad: true,
    loading: '正在加载'
};
pageData.imgHelper = imgHelper;

AppDispatcher.register(function (payload) {
    var action = payload;
    switch (action.actionType) {
        case actionType.EDITECLICK:
            initFn.setShopEdite(action.params);
            break;
        case actionType.EDITEFINISHCLICK:
            initFn.setShopEditeFinish(action.params);
            break;
        case actionType.SUBMITCLICK:
            initFn.setSubmit(action.params);
            break;
        case actionType.ITEMCHECKCLICK:
            initFn.setItemChecked(action.params);
            break;
        case actionType.SHOPCHECKCLICK:
            initFn.setShopChecked(action.params);
            break;
        case actionType.DELITEMCLICK:
            initFn.delItem(action.params);
            break;
        case actionType.EDITSKUCLICK:
            initFn.editSku(action.params);
            break;
        case actionType.EDITMINUSCLICK:
            initFn.editMinus(action.params);
            break;
        case actionType.EDITPLUSCLICK:
            initFn.editPlus(action.params);
            break;
        case actionType.EDITNUMBTNCLICK:
            initFn.editNumBtn(action.params);
            break;
        case actionType.CHECKEDALLCLICK:
            initFn.checkedAll(action.params);
            break;
        case actionType.POPCLOSEDCLICK:
            initFn.popClosed(action.params);
            break;
        case actionType.POPPAYCLICK:
            initFn.popPay(action.params);
            break;
        case actionType.COUPONCLICK:
            initFn.getCoupon(action.params);
            break;
        case actionType.EMPTYCLICK:
            initFn.emptyInvalid(action.params);
            break;
        case actionType.BACKCLICK:
            initFn.historyBack(action.params);
            break;
        case actionType.GLOBALCLICK:
            initFn.setGlobal(action.params);
            break;
        default:

    }
});

//业务逻辑处理
var initFn = {
    MSG: {
        delItem: '套餐商品不能单独操作哦~',
        delRelationItem: '确认删除搭配套餐所有宝贝吗？',
        isDelItem: '确定要删除这个宝贝吗？',
        editSku: '套餐宝贝不支持编辑哦~',
        editSku2: '对不起，您无法修改这个宝贝',
        empty: '您还没有选择宝贝哦~',
        quantityPlus: '亲，该宝贝不能购买更多哦~',
        quantityMinus: '受不了了，宝贝不能再减少了哦~',
        quantityWarn: '超出数量范围~',
        invalidEmpty: '确认清空失效宝贝吗？',
        noInvalid: '无可清空的失效宝贝',
        checkMax: '购物车最多只支持{n}个宝贝一起购买哦！'
    },
    checkMax: 20,
    imgHelper: imgHelper,
    /**
     * 开始
     * @func 
     * @param {obj} 
     */
    init: function init() {
        var that = this;
        that.getLocalStorage();

        if (!lib.login.isLogin()) {
            that.goLoginFun();

            lib.login.goLoginAsync(function (status) {
                // 拉起登录框（手淘中也适用）
                if (status === 'SUCCESS') {
                    location.reload();
                }
            });
        } else {
            //

            this.queryOrder().then(function (response) {
                var data = response.data;
                pageData.data = data;
                that.setLocalStorage(data);

                pageData.data.firstLoad = false;
                pageData.allLoad = true;

                that.getStructureData();
                // update render
                AppStores.emitChange();

                pageData.allLoad = false;
                that.lazyLoad();
                that.getGestureFun();
            }, function (json) {
                var ret = json.ret[0];
                var retRep = ret.split('::');
                var code = retRep[0];
                var msg = retRep[1];

                //登录
                if (json && json.ret && json.retType === lib.mtop.RESPONSE_TYPE.SESSION_EXPIRED) {
                    lib.login.goLogin();
                } else {
                    if (that.cartData) {
                        lib.notification.simple('小二很忙，请稍后重试');
                    } else {

                        pageData.data.firstLoad = false;
                        pageData.error = {
                            sub: '请稍后重试'
                        };

                        AppStores.emitChange();
                    }
                    that.lazyLoad();
                }
            })['catch'](function () {

                if (that.cartData) {
                    lib.notification.simple('小二很忙，请稍后重试');
                } else {

                    pageData.data.firstLoad = false;
                    pageData.error = {
                        sub: '请稍后重试'
                    };

                    AppStores.emitChange();
                }
                that.lazyLoad();
            });

            that.setLocalData();
        }
    },
    /**
     * 事件-点击返回上层路径
     * @func 
     * @param {obj} 
     */
    historyBack: function historyBack() {
        history.back();
    },
    /**
     * 事件-点击关闭浮层
     * @func 
     * @param {obj} 
     */
    popClosed: function popClosed(params) {
        pageData.data.pop = {};
        AppStores.emitChange('pop');
    },
    /**
     * 事件-点击分组结算
     * @func 
     * @param {obj} 
     */
    popPay: function popPay(params) {
        var that = this;
        var structureData = that.structureData || {};
        var bundlev2Items = structureData.bundlev2Items || {};
        var itemsGroup = structureData.itemsGroup || {};
        var exclude = bundlev2Items.exclude || {};
        var special = itemsGroup.special;
        var settlement = itemsGroup.settlement;
        var cartIds = itemsGroup.cartIds;
        var controlParas = pageData.data['controlParas'] || {};
        var orderByH5Urls = controlParas['orderByH5Urls'] || {};

        if (settlement[params].length > that.checkMax) {
            lib.notification.simple(that.MSG.checkMax.replace('{n}', that.checkMax));
            return false;
        }

        if (orderByH5Urls[params]) {
            //特殊商品下单走配置的url
            that.toH5Url(params);
        } else {
            var slt = settlement[params] ? settlement[params] : settlement.total;
            var crt = cartIds[params] ? cartIds[params] : cartIds.total;
            //如果存在HK的宝贝
            if (!(exclude['HK'] && special[exclude.HK.get[0]]) && params === 'total' && exclude['HK'] && exclude['HK'].get.length === cartIds.total.length) {
                params = 'HK';
            } else if (params.indexOf('HK') >= 0) {
                params = 'HK';
            }

            location.href = that.getUrl(slt, crt, params);
        }
    },
    /**
     * 事件-点击全选
     * @func 
     * @param {obj} 
     */
    checkedAll: function checkedAll(opt) {

        var that = this;
        var _data = pageData.data['data'] || {};
        var footerId = opt.footerId;
        var footerData = _data[footerId] || {};
        var fields = footerData['fields'] || {};
        var checkAll = fields['checkAll'] || {};
        var checked = checkAll['checked'];
        var structureData = that.structureData;
        var items = structureData.bundlev2Items.items;
        var isChecked = checked === true || checked === 'true' ? false : true;

        var inputs = document.querySelectorAll('.o-t-cb');
        for (var i = 0; i < inputs.length; i++) {
            var oInput = inputs[i];
            oInput.checked = isChecked;
        }

        items.map(function (item) {
            var itemData = _data[item] || {};
            var itemDataFields = itemData['fields'] || {};
            var bundlev2Id = itemDataFields['bundleId'];
            if (bundlev2Id) {
                that.setCheckedItem(bundlev2Id, item, isChecked);
            }
        });

        AppStores.emitChange('footer_1');
    },
    /**
     * 事件-点击更改数量
     * @func 
     * @param {obj} 
     */
    editNumBtn: function editNumBtn(opt) {

        var that = this;
        var bundlev2Id = opt.bundlev2Id;
        var itemv2Id = opt.itemv2Id;
        var groupId = opt.groupId;
        var value = opt.value;
        var data = pageData.data.data[itemv2Id] || {};
        var fields = data['fields'] || {};
        var operate = fields['operate'];
        var isOperateEdit = operate.indexOf('edit') >= 0 ? true : false;
        var quantityData = fields['quantity'] || {};
        var quantity = quantityData['quantity'];
        var multiple = quantityData['multiple'];
        var max = quantityData['max'];
        var min = quantityData['min'];
        var num = quantity;
        var quantityEdit = quantityData.editable; //是否可编辑

        that.setQuantityIsEdit(quantityEdit, groupId, isOperateEdit).then(function () {
            if (!isNaN(value)) {
                value = Number(value);
                if (value > max || value < min) {
                    //弹层提示
                    lib.notification.simple(that.MSG.quantityWarn);

                    //失败恢复数据 超出范围 给出极限值
                    var num = value > max ? max : value < min ? min : quantity;
                    //pageData.data['data'][itemv2Id]['fields']['quantity']['quantity'] = quantity ;

                    //emitChange
                    that.setQuantity(fields, itemv2Id, num, bundlev2Id);
                    //AppStores.emitChange(bundlev2Id);
                    //AppStores.emitChange('footer_1');
                } else {
                        that.setQuantity(fields, itemv2Id, value, bundlev2Id);
                    }
            } else {
                //弹层提示
                lib.notification.simple(that.MSG.quantityWarn);

                //失败恢复数据 非数字数据 恢复原状
                pageData.data['data'][itemv2Id]['fields']['quantity']['quantity'] = quantity;

                //emitChange
                AppStores.emitChange(bundlev2Id);
                AppStores.emitChange('footer_1');
            }
        }, function () {});
    },
    /**
     * 事件-点击更改数量 “+”
     * @func 
     * @param {obj} 
     */
    editPlus: function editPlus(opt) {
        var that = this;
        var bundlev2Id = opt.bundlev2Id;
        var itemv2Id = opt.itemv2Id;
        var groupId = opt.groupId;
        var data = pageData.data.data[itemv2Id] || {};
        var fields = data['fields'] || {};
        var operate = fields['operate'];
        var isOperateEdit = operate.indexOf('edit') >= 0 ? true : false;
        var quantityData = fields['quantity'] || {};
        var quantity = quantityData['quantity'];
        var multiple = quantityData['multiple'];
        var max = quantityData['max'];
        var quantityEdit = quantityData.editable; //是否可编辑

        that.setQuantityIsEdit(quantityEdit, groupId, isOperateEdit).then(function () {

            if (quantity >= max || quantity + multiple > max) {
                lib.notification.simple(that.MSG.quantityPlus);
            } else {
                that.setQuantity(fields, itemv2Id, quantity + multiple, bundlev2Id);
            }
        }, function () {});
    },
    /**
     * 事件-点击更改数量 “-”
     * @func 
     * @param {obj} 
     */
    editMinus: function editMinus(opt) {
        var that = this;
        var bundlev2Id = opt.bundlev2Id;
        var itemv2Id = opt.itemv2Id;
        var groupId = opt.groupId;
        var data = pageData.data.data[itemv2Id] || {};
        var fields = data['fields'] || {};
        var operate = fields['operate'];
        var isOperateEdit = operate.indexOf('edit') >= 0 ? true : false;
        var quantityData = fields['quantity'] || {};
        var quantity = quantityData['quantity'];
        var multiple = quantityData['multiple'];
        var max = quantityData['max'];
        var min = quantityData['min'];
        var quantityEdit = quantityData.editable; //是否可编辑

        that.setQuantityIsEdit(quantityEdit, groupId, isOperateEdit).then(function () {
            if (quantity <= min || quantity - multiple < min) {
                lib.notification.simple(that.MSG.quantityMinus);
            } else {
                that.setQuantity(fields, itemv2Id, quantity - multiple, bundlev2Id);
            }
        }, function () {});
    },
    /**
     * 事件-点击更改sku
     * @func 
     * @param {obj} 
     */
    editSku: function editSku(opt) {
        var that = this;
        var _data = pageData.data['data'];
        var itemv2Id = opt.itemv2Id;
        var groupId = opt.groupId;
        var bundlev2Id = opt.bundlev2Id;

        var data = _data[itemv2Id];
        var params = data['fields'];
        var sku = params.sku || {};
        var skuEdit = sku.editable; //是否可编辑

        var groupData = _data[groupId] || {};
        var isRelationItem = groupData.fields.isRelationItem; //套餐宝贝

        if (!skuEdit) {
            var msg = isRelationItem ? this.MSG.editSku : this.MSG.editSku2;
            lib.notification.simple(msg);
        } else {
            SkuStores && SkuStores.confirmSku({
                'itemId': params.itemId,
                'cartId': params.cartId,
                'skuId': sku.skuId,
                'areaId': sku.areaId
            }, function (opt) {
                params['itemv2Id'] = itemv2Id;
                params['sku']['skuId'] = opt.skuId;
                var paramsData = that.getAdjustData([params], 'updateItemSku');
                that.getAdjustOrderSuc(paramsData).then(function () {
                    AppStores.emitChange(bundlev2Id);
                    AppStores.emitChange('footer_1');
                    //console.log(params)
                    //that.imgHelper.fireLazyload();
                });
            });
        }
    },
    /**
     * 事件-点击删除
     * @func 
     * @param {obj} 
     */
    delItem: function delItem(opt) {
        var that = this;
        var _data = pageData.data['data'];
        var bundlev2Id = opt.bundlev2Id;
        var itemv2Id = opt.itemv2Id;
        var data = _data[itemv2Id];
        var fields = data['fields'];
        var valid = fields.valid;
        var operate = fields.operate;
        var isDel = operate.indexOf('delete') === -1 ? false : true;
        var groupId = opt.groupId;
        var groupData = _data[groupId] || {};
        var isRelationItem = groupData.fields && groupData.fields.isRelationItem; //套餐宝贝
        var groupItem = that.structureData.structure[groupId] || [];

        if (!isDel && isRelationItem) {
            //套餐并且不支持删除的
            lib.notification.simple(this.MSG.delItem);
        } else if (isDel || !valid) {
            //可删除的
            var msg = isRelationItem ? that.MSG.delRelationItem : that.MSG.isDelItem;
            var pop = lib.notification.confirm(msg, '', function (e, isConfirm) {
                if (isConfirm) {
                    delFun(bundlev2Id);
                }
                this.hide();
            });
            pop.show();
        }

        function delFun(bundlev2Id) {
            var paramsData = {};
            var delCode = valid ? 'deleteSome' : 'deleteInvalid'; //有效宝贝 或者 失效宝贝

            if (isRelationItem) {
                console.log('套餐一块删除');
                var arrData = [];
                groupItem.map(function (item) {
                    var data = pageData.data['data'][item];
                    var fields = data['fields'];
                    var itemv2Id = data.tag + '_' + data.id;
                    fields.itemv2Id = itemv2Id;
                    arrData.push(fields);
                });
                paramsData = that.getAdjustData(arrData, delCode);
            } else {
                fields.itemv2Id = itemv2Id;

                paramsData = that.getAdjustData([fields], delCode);
            }
            that.setDelFun(paramsData, [fields], bundlev2Id);
        }
    },
    /**
     * 事件-点击店铺选中
     * @func 
     * @param {obj} 
     */
    setShopChecked: function setShopChecked(opt) {
        var that = this;
        var _data = pageData.data['data'];
        var bundleId = opt.bundleId;
        var bundlev2Id = opt.bundlev2Id;
        var shopId = opt.shopId;
        var shopData = _data[shopId];
        var checked = shopData.fields.checked;
        var isChecked = checked === true || checked === 'true' ? false : true;
        var items = this.structureData.bundlev2Items[bundlev2Id].items;

        React.Children.map(items, function (item) {
            that.setCheckedItem(bundleId, item, isChecked);
        });

        AppStores.emitChange(bundlev2Id);
        AppStores.emitChange('footer_1');
    },
    /**
     * 事件-点击单个宝贝选中
     * @func 
     * @param {obj} 
     */
    setItemChecked: function setItemChecked(opt) {
        var that = this;
        var itemv2Id = opt.itemv2Id;
        var groupId = opt.groupId;
        var bundlev2Id = opt.bundlev2Id;
        var _data = pageData.data['data'];

        var data = _data[itemv2Id];
        var params = data['fields'];
        var bundleId = params.bundleId;
        var shopId = 'shopv2_' + bundleId;
        var checked = params.checked;
        var itemChecked = checked === 'true' || checked === true ? false : true;

        var groupData = _data[groupId];
        var isRelationItem = groupData.fields.isRelationItem; //套餐宝贝

        if (isRelationItem) {
            var groupItems = that.structureData.structure[groupId];
            React.Children.map(groupItems, function (item) {
                that.setCheckedItem(bundleId, item, itemChecked);
            });
        } else {
            if (itemChecked) {
                //如果已经是选中 那么设置为不选中
                pageData.data['data'][shopId]['fields']['checked'] = false;
                that.setCheckedItem(bundleId, itemv2Id, itemChecked);
            } else {
                //item 数据更改
                that.setCheckedItem(bundleId, itemv2Id, itemChecked);
            }
        }

        AppStores.emitChange(bundlev2Id);
        AppStores.emitChange('footer_1');
    },
    /**
     * 事件-点击提交按钮
     * @func 
     * @param {obj} 
     */
    setSubmit: function setSubmit() {
        var that = this;
        var bundlev2Items = that.structureData['bundlev2Items'];
        var exclude = bundlev2Items['exclude'];
        var exded = exclude['exded'];
        var checkedItems = bundlev2Items['checked'];
        var settlement = bundlev2Items['settlement'];
        var cartIds = bundlev2Items['cartIds'];
        var controlParas = pageData.data['controlParas'] || {};
        var isSettlementAlone = controlParas['isSettlementAlone'];
        var orderByH5Urls = controlParas['orderByH5Urls'] || {};
        var pageMeta = pageData.data['pageMeta'] || {};
        var checkMax = that.checkMax; //pageMeta['checkMax'];h5只能支持20个
        var params = exded[0];

        //没有选中任何宝贝的判断
        if (checkedItems.length === 0) {
            lib.notification.simple(that.MSG.empty);
            return false;
        }

        if (checkedItems.length === 1) {
            //只有一个宝贝
            if (orderByH5Urls[params]) {
                //特殊商品下单走配置的url
                that.toH5Url(params);
            } else {
                location.href = that.getUrl(settlement, cartIds, params);
            }
        } else {
            //多个宝贝下单

            //数量必须小于等于checkMax
            if (checkedItems.length > checkMax) {
                lib.notification.simple(that.MSG.checkMax.replace('{n}', checkMax));
                return false;
            }

            var items = that.refreshMutex();
            var itemsGroup = that.structureData.itemsGroup;
            var special = itemsGroup.special;
            var settlement = itemsGroup.settlement;
            var specialShop = itemsGroup.specialShop;
            var cartIds = itemsGroup.cartIds;
            var specLeng = specialShop.length;

            //没有分组
            if (!specLeng //没有特殊组
             || specLeng === 1 && exded.indexOf('SM') >= 0 //有特殊组 只有一个特殊组 并且这个特殊组是猫超的

            ) {
                    if (exded.length === 1 && orderByH5Urls[params]) {
                        //只有一种商品 并且有配置url
                        that.toH5Url(params);
                    } else {

                        //多个宝贝 走普通下单 针对天猫国际和普通宝贝一起下单
                        if (exded.length > 1) {
                            params = '';
                        }

                        location.href = that.getUrl(that.structureData.bundlev2Items.settlement, that.structureData.bundlev2Items.cartIds, params);
                    }
                } else {
                //有分组
                pageData.data.pop = items;
                pageData.data.pop.popShow = true;

                AppStores.emitChange('pop');
            }

            // if(specialShop.length >=0 && (exded.length > 1 || exded.length === 1 && (exded[0] === 'SM' && specialShop.length > 1) ) && JSON.stringify(special) !== '{}'){
            // //有分组
            //     pageData.data.pop = items;
            //     pageData.data.pop.popShow = true;

            //     AppStores.emitChange('pop');
            // }else{
            // //没有分组

            //     if(exded.length === 1 && orderByH5Urls[params]){
            //     //只有一种商品 并且有配置url
            //         that.toH5Url(params);
            //     }else{
            //         location.href = that.getUrl(that.structureData.bundlev2Items.settlement,that.structureData.bundlev2Items.cartIds,params);
            //     }
            // }
        }
    },
    /**
     * 事件-点击店铺编辑按钮
     * @func 
     * @param {obj} 
     */
    setShopEdite: function setShopEdite(opt) {
        var id = opt.bundleId;
        var bundlev2Id = opt.bundlev2Id;
        var itemList = document.getElementById(opt.bundlev2Id).querySelectorAll('.item-list');
        //恢复滑动删除的操作DOM表现
        for (var i = 0; i < itemList.length; i++) {
            itemList[i].setAttribute('style', '');
        }

        this.setShopEditeData(id, true);
        AppStores.emitChange(bundlev2Id);
    },
    /**
     * 事件-点击领券
     * @func 
     * @param {obj} 
     */
    getCoupon: function getCoupon(sellerId) {
        location.href = '//h5.' + lib.mtop.config.subDomain + '.taobao.com/awp/base/coupon.htm?sellerId=' + sellerId;
    },
    /**
     * 事件-点击店铺编辑完成按钮
     * @func 
     * @param {obj} 
     */
    setShopEditeFinish: function setShopEditeFinish(opt) {
        var id = opt.bundleId;
        var bundlev2Id = opt.bundlev2Id;
        this.setShopEditeData(id, false);
        AppStores.emitChange(bundlev2Id);
    },
    /**
     * 事件-清空失效宝贝
     * @func 
     * @param {obj} id:bundleId
     */
    emptyInvalid: function emptyInvalid(id) {
        var that = this;

        var items = that.getStructure('bundlev2_' + id);
        var _data = pageData.data['data'];

        var pop = lib.notification.confirm(that.MSG.invalidEmpty, '', function (e, isConfirm) {
            if (isConfirm) {
                emptyFun();
            }
            pop.hide();
        });
        pop.show();

        function emptyFun() {
            var canItem = [];
            React.Children.map(items, function (item) {
                var data = _data[item];
                var fields = data['fields'];
                var canBatchRemove = fields['canBatchRemove']; //是否能批量删除
                if (canBatchRemove) {
                    fields['itemv2Id'] = 'itemv2_' + data['id'];
                    canItem.push(fields);
                }
            });
            //如果都是不可批量删除的
            if (!canItem.length) {
                that.delay(500).then(function () {
                    lib.notification.simple(that.MSG.noInvalid);
                });
            } else {
                var paramsData = that.getAdjustData(canItem, 'deleteInvalid');
                that.setDelFun(paramsData, canItem, 'bundlev2_invalid');
            }
        }
    },
    /**
     * 更改数据-编辑更改店铺数据
     * @func text
     * @param  {string} bundle组id Boole编辑为true或false
     * @return 
     */
    setShopEditeData: function setShopEditeData(id, Boole) {
        var that = this;
        var items = that.structureData.bundlev2Items['bundlev2_' + id].items;

        pageData.data['data']['shopv2_' + id]['fields']['isEdit'] = Boole;

        items.map(function (item) {
            if (pageData.data['data'][item]) {
                pageData.data['data'][item]['fields']['isEdit'] = Boole;
            }
        });
    },
    /**
     * 设置方法-删除宝贝
     * @func 
     * @param  {string} cal 更改的宝贝数量
     * @return 
     */
    setDelFun: function setDelFun(params, canItem, bundlev2Id) {
        var that = this;

        that.getAdjustOrderSuc(params).then(function () {
            that.clearDelItem(canItem);
            delEmit().then(function () {
                //AppStores.emitChange();
            });
        });

        function delEmit() {
            return new Promise(function (resolve, reject) {
                AppStores.emitChange(bundlev2Id);
                AppStores.emitChange('footer_1');
                resolve();
            });
        }
    },
    /**
     * 删除数据-删除宝贝数据
     * @func 
     * @param  {string} cal 更改的宝贝数量
     * @return 
     */
    clearDelItem: function clearDelItem(params) {
        var that = this;

        params.map(function (param) {
            var fields = param;
            var itemv2Id = fields.itemv2Id;
            var item = itemv2Id;
            delete pageData.data['data'][item];
        });
    },
    /**
     * 更改数据-编辑更改宝贝数量
     * @func 
     * @param  {string} cal 更改的宝贝数量
     * @return 
     */
    setQuantityIsEdit: function setQuantityIsEdit(quantityEdit, groupId, isOperateEdit) {
        var that = this;

        var groupData = pageData.data.data[groupId];
        var isRelationItem = groupData.fields.isRelationItem; //是否套餐宝贝

        return new Promise(function (resolve, reject) {
            if (!quantityEdit || !isOperateEdit && isRelationItem) {
                lib.notification.simple(that.MSG.editSku);
                reject();
            } else if (!quantityEdit || !isOperateEdit) {
                lib.notification.simple(that.MSG.editSku2);
                reject();
            } else {
                resolve();
            }
        });
    },
    /**
     * 更改数据-编辑更改宝贝数量
     * @func 
     * @param  {string} cal 更改的宝贝数量
     * @return 
     */
    setQuantity: function setQuantity(params, itemv2Id, cal, bundlev2Id) {
        var that = this;
        var paramsData = {};

        //更改数据
        var quantity = pageData.data['data'][itemv2Id]['fields']['quantity']['quantity'];
        pageData.data['data'][itemv2Id]['fields']['quantity']['quantity'] = cal;
        //得到新数据的传参
        params['itemv2Id'] = itemv2Id;
        paramsData = that.getAdjustData([params], 'update');

        that.getAdjustOrderSuc(paramsData).then(function () {
            AppStores.emitChange(bundlev2Id);
            AppStores.emitChange('footer_1');
        }, function (error) {
            //失败恢复数据
            pageData.data['data'][itemv2Id]['fields']['quantity']['quantity'] = quantity;
        })['catch'](function () {
            //失败恢复数据
            pageData.data['data'][itemv2Id]['fields']['quantity']['quantity'] = quantity;
        });
    },
    /**
     * 更改数据-异步请求 公共方法
     * @func 
     * @param  {string} bundle:组id itemId:宝贝id Boole:编辑为true或false
     * @return 
     */
    getAdjustOrderSuc: function getAdjustOrderSuc(paramsData) {
        var that = this;

        return new Promise(function (resolve, reject) {
            if (!lib.login.isLogin()) {
                lib.login.goLoginAsync(function (status) {
                    // 拉起登录框（手淘中也适用）
                    if (status === 'SUCCESS') {
                        location.reload();
                    }
                });
            } else {
                that.adjustOrder(paramsData).then(function (response) {

                    //存储一些旧的数据 因为接口出来的一些数据不靠谱 错误的 不能完全依赖合并
                    var old_pageData = pageData.data;
                    var old_data = old_pageData['data'];
                    var old_pageMeta = old_pageData['pageMeta'];
                    var old_footer_1 = old_data['footer_1'];
                    //    //需要用到的旧数据
                    var old_TotalCount = old_pageMeta['totalCount'];
                    var old_checkAll = old_footer_1['fields']['checkAll']['checked'];

                    //新的数据解析
                    var rd = response.data;
                    var data = rd.data;
                    var hierarchy = rd.hierarchy;
                    var excludes = rd.excludes;
                    var pageMeta = rd.pageMeta;

                    //合并新的数据
                    if (data) {
                        pageData.data['data'] = that.extend(pageData.data['data'], data);
                    }

                    if (hierarchy) {
                        pageData.data['hierarchy'] = hierarchy;
                        //pageData.data['hierarchy'] = that.extend(pageData.data['hierarchy'],hierarchy);
                    }

                    if (excludes) {
                        pageData.data['excludes'] = excludes;
                        //pageData.data['excludes'] = that.extend(pageData.data['excludes'],excludes);
                    }

                    if (pageMeta) {
                        pageData.data['pageMeta'] = that.extend(pageData.data['pageMeta'], pageMeta);
                    }

                    //新的数据合并完了 但是不一定是最好的 我们来替换回来吧
                    pageData.data['data']['footer_1']['fields']['checkAll']['checked'] = old_checkAll;
                    //    //删除的数据要减总数 因为新数据返回的总数完全是错误的
                    var pData = JSON.parse(paramsData.p);
                    var operateData = pData['operate'];
                    var delNum = 0;
                    if (operateData.deleteSome) {
                        delNum = operateData.deleteSome.length;
                    } else if (operateData.deleteInvalid) {
                        delNum = operateData.deleteInvalid.length;
                    }

                    pageData.data['pageMeta']['totalCount'] = old_TotalCount - delNum;

                    that.getStructureData();

                    //返回
                    resolve();
                }, function (json) {
                    //登录
                    if (json && json.ret && json.retType === lib.mtop.RESPONSE_TYPE.SESSION_EXPIRED) {
                        lib.login.goLogin();
                    } else {
                        reject();
                        that.errorNotifPop(json);
                    }
                });
            }
        });
    },
    /**
     * 更改数据-编辑更改宝贝选中数据
     * @func 
     * @param  {string} bundle:组id itemId:宝贝id Boole:编辑为true或false
     * @return 
     */
    setCheckedItem: function setCheckedItem(bundleId, itemv2Id, Boole) {
        var that = this;
        var _data = pageData.data['data'] || {};
        var shopId = 'shopv2_' + bundleId;

        var itemv2 = _data[itemv2Id] || {};
        var itemv2Data = itemv2['fields'] || {};
        var itemChecked = itemv2Data['checked'];
        var itemPay = itemv2Data.pay;
        var itemPayTotal = itemPay.total;
        var footer = _data['footer_1'] || {};
        var footerData = footer['fields'] || {};
        var footerPay = footerData.pay;
        var footerPrice = footerPay.price;
        var footerQuantity = footerData.quantity.value;
        var footerCheckAll = footerData.checkAll;
        var footerChecked = footerCheckAll.checked;

        //配置和状态已经同步 不处理
        itemChecked = itemChecked === true || itemChecked === 'true' ? true : false;
        if (itemChecked == Boole) {
            console.log('itemv2Id');
            return;
        }

        //通知设置
        if (!Boole) {
            pageData.data['data'][itemv2Id]['fields']['checked'] = false;
            pageData.data['data']['footer_1']['fields']['pay']['price'] = footerPrice - itemPayTotal;
            pageData.data['data']['footer_1']['fields']['quantity']['value'] = footerQuantity - 1;

            //重新计算数据
            that.getStructureData();

            //shop 店铺为不选中设置为不选中
            pageData.data['data'][shopId]['fields']['checked'] = false;

            //allcheck 全选为不选中
            pageData.data['data']['footer_1']['fields']['checkAll']['checked'] = false;
        } else {

            pageData.data['data'][itemv2Id]['fields']['checked'] = true;
            pageData.data['data']['footer_1']['fields']['pay']['price'] = itemPayTotal + footerPrice;
            pageData.data['data']['footer_1']['fields']['quantity']['value'] = footerQuantity + 1;

            //重新计算数据
            that.getStructureData();

            //计算shop是否选中
            var structureData = that.structureData;
            var structureBunle = structureData.bundlev2Items['bundlev2_' + bundleId] || {};
            var bundlev2Items = structureBunle['items'] || [];
            var bundlev2CheckedItems = structureBunle['checked'];
            if (bundlev2Items.toString() === bundlev2CheckedItems.toString()) {
                //更改shop数据
                pageData.data['data'][shopId]['fields']['checked'] = true;
            }
            //计算全选是否选中
            var bundlev2Items = structureData['bundlev2Items'] || {};
            var allItems = bundlev2Items['items'] || [];
            var allItemsChecked = bundlev2Items['checked'] || [];
            if (allItems.toString() === allItemsChecked.toString()) {
                //allchecked 数据
                pageData.data['data']['footer_1']['fields']['checkAll']['checked'] = true;
            }
        }
    },
    /**
     * 获取数据-获取structure数据
     * @func 
     * @param  {string} tag:id
     * @return {arr}
     */
    getStructure: function getStructure(tag) {
        var structure = pageData.data.hierarchy.structure;
        return structure[tag];
    },
    /**
     * 获取数据-根据structure数据解析出需要的数据组 
     that.structureData{
        bundlev2Items:{//每个bundle下具体宝贝集合
            'items' : [],//所有的非时效宝贝的id
            'checked' : [],//选中的宝贝的id
            'exclude' : {//每种类型下分别具体的宝贝id以及数据集合
                'exded' : [],//所有选中宝贝已有的类型集合
                ...
            }
            ...
        },
        structureObj:{//树形关系集合
    
        },
        structure : {//structure
    
        }
     }
     * @func 
     * @param  {} 
     * @return {}
     */
    getStructureData: function getStructureData() {
        var that = this;
        var data = pageData.data['data'];
        var hierarchy = pageData.data['hierarchy'];
        var structure = hierarchy.structure;
        var root = hierarchy.root;
        var structure = hierarchy.structure;
        var rootData = structure[root];
        var rootData = {
            'items': [],
            'checked': [],
            'settlement': [],
            'cartIds': [],
            'exclude': {
                'exded': []
            }
        };
        var obj = getHierarchyData({}, root, root, root);

        that.structureData = {
            bundlev2Items: rootData,
            structureObj: obj,
            structure: structure
        };

        function getHierarchyData(obj, mark, parent, grandParent) {
            var dataArr = structure[mark];

            obj[mark] = {};
            //rootData[parent][mark] = {}

            if (mark.indexOf('itemv2_') !== -1) {
                if (rootData[grandParent] && rootData[grandParent]['items']) {
                    rootData[grandParent]['items'].push(mark);
                    rootData['items'].push(mark);
                    //是否选中的items
                    var itemData = data[mark];
                    var id = itemData['id'];
                    var fields = itemData['fields'];
                    var exclude = fields['exclude'];
                    var mutex = fields['mutex'];
                    var settlement = fields['settlement'];
                    var cartId = fields['cartId'];

                    if (itemData['fields']['checked']) {
                        rootData[grandParent]['checked'].push(mark);
                        rootData['checked'].push(mark);
                        rootData['settlement'].push(settlement);
                        rootData['cartIds'].push(cartId);

                        //互斥存储
                        if (!rootData['exclude'][exclude]) {
                            rootData['exclude']['exded'].push(exclude);
                            rootData['exclude'][exclude] = {};
                            rootData['exclude'][exclude][mutex] = [];
                            rootData['exclude'][exclude]['get'] = [];
                        } else {
                            if (!rootData['exclude'][exclude][mutex]) {
                                rootData['exclude'][exclude][mutex] = [];
                            }
                            if (!rootData['exclude'][exclude]['get']) {
                                rootData['exclude'][exclude]['get'] = [];
                            }
                        }
                        rootData['exclude'][exclude][mutex].push(itemData);
                        if (rootData['exclude'][exclude]['get'].indexOf(mutex) === -1) {
                            rootData['exclude'][exclude]['get'].push(mutex);
                        }
                    }
                }
            }

            if (mark.indexOf('bundlev2_') !== -1) {
                rootData[mark] = {};
                if (!rootData[mark]['items']) {
                    rootData[mark]['items'] = [];
                    rootData[mark]['checked'] = [];
                }
            }

            if (mark.indexOf('group_') !== -1) {
                //todo
            }

            function getDataArr(dataArr) {
                if (dataArr && dataArr.length) {
                    var t = dataArr.map(function (d, c) {
                        return getHierarchyData(obj[mark], d, mark, parent);
                    });

                    return t;
                }
            }

            return getDataArr(dataArr);
        }
    },
    /**
     * 获取数据-获取已选中宝贝的互斥关系
     * @func 
     * @param  {} 
     * @return {}
     */
    refreshMutex: function refreshMutex() {
        var that = this;
        var sd = that.structureData;
        var bundlev2Items = sd.bundlev2Items;
        var exclude = bundlev2Items.exclude;
        var exded = exclude.exded;
        var checkedItems = JSON.parse(JSON.stringify(bundlev2Items.checked));
        var items = {
            item: {
                total: checkedItems
            },
            total: {},
            special: {},
            shop: {},
            settlement: {
                total: []
            },
            cartIds: {
                total: []
            },
            specialShop: []
        };

        var _data = pageData.data;
        var excludes = _data.excludes;
        var global = excludes.global;
        var inner = excludes.inner;
        var innerGlobal = excludes.innerGlobal;
        var tip = excludes.tip;

        checkedItems.map(function (item) {
            var data = pageData.data['data'][item];
            var fields = data['fields'];
            var settlement = fields.settlement;
            var cartId = fields.cartId;

            items.settlement['total'].push(settlement);
            items.cartIds['total'].push(cartId);
            items.total[item] = data;
        });

        //只有同店铺的同类商品才可以下单
        React.Children.map(innerGlobal, function (exc) {
            if (exded.indexOf(exc) !== -1) {
                var excludeMutex = exclude[exc];
                getMutexData(excludeMutex);

                // if(exded.length > 1){//非同类
                //     lib.notification.simple(tip[exc]);
                //     return false;
                // }else if(exclude[exc]['get'].length > 1){//非同店铺
                //     lib.notification.simple(tip[exc]);
                //     return false;
                // }
            }
        });

        //同类商品才可以下单
        React.Children.map(global, function (exc) {

            if (exded.indexOf(exc) !== -1) {
                if (exded.length > 1) {
                    //非同类
                    var excludeMutex = exclude[exc];
                    getMutexData(excludeMutex);
                }
            }
        });

        //同店铺的同类商品才可以下单 同类的不同店铺不可以下单 非同类商品不同店铺也可以下单
        for (var key in inner) {
            var excludeMutex = exclude[key];
            var isInnerNum = 0;
            if (exclude[key]) {
                React.Children.map(exclude[key]['get'], function (mutex) {
                    if (inner[key].indexOf(mutex) !== -1) {
                        isInnerNum++;
                    }
                });
            }

            if (isInnerNum >= 1) {
                getMutexData(excludeMutex);
            }
        }

        function getMutexData(excludeMutex) {
            var getData = excludeMutex['get'];

            getData.map(function (mutexId) {
                var datas = excludeMutex[mutexId];
                items['special'][mutexId] = {};

                for (var i = 0; i < datas.length; i++) {
                    var data = datas[i];
                    var fields = data['fields'] || {};
                    var bundleId = fields['bundleId'] || {};
                    var shopId = 'shopv2_' + bundleId;
                    var shopData = _data['data'][shopId] || {};
                    var shopTitle = shopData['fields']['title'];
                    var settlement = fields['settlement'];
                    var cartId = fields['cartId'];
                    var tag = data['tag'];
                    var id = data['id'];
                    var itemId = tag + '_' + id;
                    var index = items.item.total.indexOf(itemId);

                    if (items.total[itemId]) {
                        delete items.total[itemId];
                    }

                    if (index !== -1) {
                        items.item.total.splice(index, 1);
                        items.settlement.total.splice(index, 1);
                        items.cartIds.total.splice(index, 1);
                    }

                    if (!items.item[mutexId]) {
                        items.item[mutexId] = [];
                        items.settlement[mutexId] = [];
                        items.cartIds[mutexId] = [];
                    }

                    items['special'][mutexId][itemId] = _data['data'][itemId];
                    items['shop'][mutexId] = shopTitle;
                    //如果已经存在 不增加了
                    if (items.item[mutexId].indexOf(itemId) == -1) {
                        items.item[mutexId].push(itemId);
                    }
                    if (items.settlement[mutexId].indexOf(itemId) == -1) {
                        items.settlement[mutexId].push(settlement);
                    }
                    if (items.cartIds[mutexId].indexOf(itemId) == -1) {
                        items.cartIds[mutexId].push(cartId);
                    }
                    if (items.specialShop.indexOf(mutexId) == -1) {
                        items.specialShop.push(mutexId);
                    }
                }
            });
        }

        that.structureData.itemsGroup = items;

        return items;
    },
    /**
     * 获取数据-获取异步请求的数据格式
     * @func 
     * @param  {} 
     * @return {obj}
     */
    getAdjustData: function getAdjustData(params, ot) {
        var that = this;
        var bundlev2Items = that.structureData.bundlev2Items;
        var checkedItemId = bundlev2Items['checked'];
        var _data = pageData.data['data'];
        var paramData = {};
        var updateData = [];
        var deleteSomeData = [];
        var deleteInvalid = [];
        var updateItemSku = [];
        var operate = {};

        params.map(function (param) {
            var fields = param;
            var item = param.itemv2Id;
            paramData[item] = {
                fields: {
                    bundleId: fields.bundleId,
                    cartId: fields.cartId,
                    checked: fields.checked,
                    itemId: fields.itemId,
                    quantity: fields.quantity.quantity,
                    shopId: fields.shopId,
                    skuId: fields.sku ? fields.sku.skuId : '',
                    valid: fields.valid
                }
            };
            getData(param);
        });

        function getData(param) {
            var bundleId = param.bundleId;
            var bundlev2Id = 'bundlev2_' + bundleId;
            var bundleItems = bundlev2Items[bundlev2Id] ? bundlev2Items[bundlev2Id].items : [];
            var itemId = param.itemId;
            var itemv2Id = param.itemv2Id;

            //得到当前宝贝店铺下的所有宝贝的itemdata
            bundleItems.map(function (item) {
                var data = _data[item] || {};
                var fields = data.fields;
                if (fields) {
                    paramData[item] = {
                        fields: {
                            bundleId: fields.bundleId,
                            cartId: fields.cartId,
                            checked: fields.checked,
                            itemId: fields.itemId,
                            quantity: fields.quantity.quantity,
                            shopId: fields.shopId,
                            skuId: fields.sku ? fields.sku.skuId : '',
                            valid: fields.valid
                        }
                    };
                }
            });

            if (ot === 'update') {
                updateData.push(itemv2Id);
            } else if (ot === 'deleteSome') {
                deleteSomeData.push(itemv2Id);
            } else if (ot === 'deleteInvalid') {
                deleteInvalid.push(itemv2Id);
            } else if (ot === 'updateItemSku') {
                updateItemSku.push(itemv2Id);
            }
        }

        //得到所有选中宝贝的itemdata
        checkedItemId.map(function (item) {
            var data = _data[item] || {};
            var fields = data.fields;
            if (fields) {
                paramData[item] = {
                    fields: {
                        bundleId: fields.bundleId,
                        cartId: fields.cartId,
                        checked: fields.checked,
                        itemId: fields.itemId,
                        quantity: fields.quantity.quantity,
                        shopId: fields.shopId,
                        skuId: fields.sku ? fields.sku.skuId : '',
                        valid: fields.valid
                    }
                };
            };
        });

        //接口参数拼写规则 必须
        if (ot === 'update') {
            operate.update = updateData;
        } else if (ot === 'deleteSome') {
            operate.deleteSome = deleteSomeData;
        } else if (ot === 'deleteInvalid') {
            operate.deleteInvalid = deleteInvalid;
        } else if (ot === 'updateItemSku') {
            operate.updateItemSku = updateItemSku;
        }

        var p = {
            data: paramData,
            operate: operate,
            hierarchy: pageData.data['hierarchy']
        };
        var data = {
            p: JSON.stringify(p),
            extStatus: '0',
            feature: '{\"gzip\":false}',
            exParams: "{\"mergeCombo\":\"true\"}"
        };

        return data;
    },
    errorNotifPop: function errorNotifPop(response) {
        //提示
        var ret = response.ret[0];
        var retRep = ret.split('::');
        var code = retRep[0];
        var msg = retRep[1] && code !== 'ABORT' ? retRep[1] : '小二很忙,请稍后重试';

        lib.notification.simple(msg);
    },
    /**
     * 设置手势滑动方法出来删除
     * @func 
     * @param  {} 
     * @return {}
     */
    getGestureFun: function getGestureFun() {
        lib.editcontrol('.allItemv2', {
            'panelCls': '.itemv2',
            'activeCls': '.edit-false',
            'opCls': '.op2'
        });
    },
    toH5Url: function toH5Url(params) {
        var that = this;
        var bundlev2Items = that.structureData['bundlev2Items'];
        var cartIds = bundlev2Items['cartIds'];
        var checkedItems = bundlev2Items['checked'];

        var itemsGroup = that.structureData['itemsGroup'] || {};
        var itemsGroupItem = itemsGroup['item'] || {};
        var itemsGroupCartIds = itemsGroup['cartIds'] || {};
        var paramsItem = itemsGroupItem[params] || [];
        var cartIdsItem = itemsGroupCartIds[params] || [];

        var controlParas = pageData.data['controlParas'] || {};
        //var isSettlementAlone = controlParas['isSettlementAlone'];
        var orderByH5Urls = controlParas['orderByH5Urls'] || {};
        var obh = orderByH5Urls[params];
        var _data = pageData.data['data'];
        var cartParams = [];

        if (!cartIdsItem.length && params === 'YY') {
            paramsItem = checkedItems;
            cartIdsItem = cartIds;
        }

        paramsItem.map(function (item) {
            var h5Param = _data[item]['fields']['h5CartParam'];
            cartParams.push(h5Param);
        });

        if (params === 'YY') {
            //医药馆逻辑
            var html = $(['' + '<form method="post" action="' + obh + '">' + '<input type="hidden" name="cartId" value=\'' + cartIdsItem.join(',') + '\'/>' + '<input type="hidden" name="cart_param" value=\'{"items":[' + String(cartParams) + ']}\'/>' + '</form>'].join(''));

            html[0].submit();
        } else {
            location.href = obh;
        }
    },

    getUrl: function getUrl(settlement, cartIds, params) {
        var that = this;
        var controlParas = pageData.data['controlParas'] || {};
        var isSettlementAlone = controlParas['isSettlementAlone'];
        var buyParam = '';
        if (isSettlementAlone && settlement) {
            buyParam = 'buyParam=' + settlement.join(',');
        } else if (cartIds && cartIds.length) {
            buyParam = 'cartIds=' + cartIds.join(',');
        }

        var hostName = '//h5.' + lib.mtop.config.subDomain + '.' + (params === 'HK' && lib.mtop.config.subDomain === 'm' ? 'tmall.hk' : 'taobao.com'); //天猫国际商品线上环境走国际的域名
        //var hostName = '//h5.'+lib.mtop.config.subDomain+'.taobao.com';

        return hostName + '/cart/order.html?buyNow=false&' + buyParam;
    },

    /**
     * 请求异步数据-异步联动
     * @func 
     * @param  {} 
     * @return {}
     */
    adjustOrder: function adjustOrder(params) {
        var that = this;
        params.exParams = "{\"mergeCombo\":\"true\"}";

        return lib.mtop.request({
            'api': 'mtop.trade.updateBag',
            'v': '4.0',
            'data': params,
            'ttid': that.ttid,
            'type': 'post',
            'dataType': 'json',
            'isSec': "0",
            'ecode': "1",
            'AntiFlood': true,
            'AntiCreep': true,
            'H5Request': true
        });
    },
    queryOrder: function queryOrder(bizOrderId, archive) {
        var that = this;
        var params = lib.env.params || {};
        params.exParams = "{\"mergeCombo\":\"true\"}";
        params.isPage = "false";
        params.extStatus = '0';

        that.ttid = params.ttid;

        return lib.mtop.request({
            'api': 'mtop.trade.queryBag',
            'v': '5.0',
            'data': params,
            'ttid': params.ttid,
            'isSec': "0",
            'ecode': "1",
            'AntiFlood': true,
            'AntiCreep': true,
            'H5Request': true
        });

        /*
        //本地模拟数据
        return new Promise(function(resolve, reject) {
             $.getJSON('demo/demo.json', function(response) {
                resolve(response)
            }, function() {
                reject()
            })
        })
        */
    },
    /**
     * 图片懒加载
     * @func 
     * @param  {} 
     * @return {}
     */

    lazyLoad: function lazyLoad() {
        this.imgHelper.fireLazyload();
    },
    goLoginFun: function goLoginFun() {
        var that = this;
        pageData.data.firstLoad = false;
        pageData.error = {
            title: '登录信息失效',
            sub: '请重新登录',
            btn: {
                name: '去登录',
                url: ''
            }
        };

        AppStores.emitChange();
    },
    setLocalStorage: function setLocalStorage(data) {
        var that = this;
        var local = window.localStorage;
        if (local) {

            try {
                var cartData = {};
                var useNick = lib.login.getUserNick();
                cartData[useNick] = data;
                cartData = JSON.stringify(cartData);
                local.setItem('cartData', cartData);
            } catch (err) {}
        }
    },
    getLocalStorage: function getLocalStorage(data) {
        var that = this;
        var local = window.localStorage;
        if (local) {
            var cartData = local.getItem('cartData');
            if (cartData) {
                try {
                    cartData = JSON.parse(cartData);
                    that.cartData = cartData;
                } catch (err) {}
            }
        }
    },
    setLocalData: function setLocalData() {
        var that = this;

        var cartData = that.cartData || {};
        var useNick = lib.login.getUserNick();
        var data = cartData[useNick];
        if (data) {
            pageData.data = data;
            pageData.data.firstLoad = false;
            pageData.allLoad = true;
            that.getStructureData();
            // update render
            AppStores.emitChange();
            pageData.allLoad = false;
            that.lazyLoad();
            that.getGestureFun();
        }
    },
    getSpmUrl: function getSpmUrl(url, node) {
        return PublicStores.getSpmUrl(url, node);
    },
    extend: function extend(target, source) {
        var Obja = target || {};
        var Objb = source || {};

        function gui(aObj, bObj, main) {

            var aObj = aObj || {};
            var bObj = bObj || {};

            for (var p in bObj) {
                if (typeof bObj[p] === 'object') {
                    gui(aObj[p], bObj[p]);
                } else {

                    if (bObj.hasOwnProperty(p)) {

                        aObj[p] = bObj[p];
                    }
                }
            }

            return aObj;
        }

        var newSource = gui(Obja, Objb);

        return newSource;
    },
    delay: function delay(duration) {
        return new Promise(function (resolve, reject) {
            setTimeout(resolve, duration);
        });
    }
};

initFn.init();
module.exports = AppStores;

/*****************
 ** WEBPACK FOOTER
 ** ./src/js/stores/AppStores.js
 ** module id = 9
 ** module chunks = 0
 **/