Ext.define('GSmartApp.view.handovercuttoline.HandoverCutTolineDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverCutTolineDetailController',
    init: function () {
        // var session = GSmartApp.util.State.get('session');
        // console.log(session);
        var m = this;
        var viewModel = this.getViewModel();
        var UserListStore = viewModel.getStore('UserListStore');
        UserListStore.loadUserbyOrg(1);
        var ListOrgStore = viewModel.getStore('ListOrgStore');
        var orgtypestring = '17';
        ListOrgStore.loadStoreByOrgTypeString(orgtypestring);
        // var POrder_ListStore = viewModel.getStore('POrder_ListStore');
        // POrder_ListStore.loadStore();

        //
        var viewOut = Ext.getCmp('handover_cut_toline_edit');
        var viewIn = Ext.getCmp('handover_line_fromcut_edit');
        if(viewOut) viewModel.set('isOut', true);
        if(viewIn) viewModel.set('isIn', true);
        console.log('Out: ' + viewModel.get('isOut'));
        console.log('In: ' + viewModel.get('isIn'));
    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData'
            }
        }
    },
    control: {
        '#btnQuayLai': {
            click: 'onQuayLai'
        },
        '#btnLuu': {
            click: 'onLuu'
        },
        '#btnHandover': {
            click: 'onConfirm'
        },
        '#btnConfirm': {
            click: 'onConfirm'
        },
        '#btnPlus': {
            click: 'onBtnPlus'
        },
        '#btnSearch': {
            click: 'onBtnSearch'
        },
    },
    onBtnPlus: function(){
        var me = this;
        var viewModel = this.getViewModel();
        var pordercode = viewModel.get('pordercode');

        if(pordercode == null || pordercode.length == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Mã lệnh không được bỏ trống',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }

        var params = new Object();
        params.pordercode = pordercode;

        GSmartApp.Ajax.post('/api/v1/porderlist/getbyexactpordercode', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        // console.log(response);
                        if(response.message == 'Mã lệnh không tồn tại'){
                            Ext.Msg.show({
                                title: 'Lấy thông tin thất bại',
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }else{
                            // load bản ghi đầu tiên trả vê, cần sửa lại nếu có nhiều lệnh trùng ordercode
                            var porderid_link = response.data[0].id;
                            var POrderGrantStore = viewModel.getStore('POrderGrantStore');
                            POrderGrantStore.loadStoreByPOrderId(porderid_link);
                            me.getView().down('#comboboxPordergrant').setValue(null);
                            me.getView().down('#comboboxPordergrant').focus();
                            viewModel.set('currentRec.porderid_link', porderid_link);

                            me.loadHandoverProductOnPorderSelect(porderid_link);
                        }
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Lấy thông tin thất bại',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Lấy thông tin thất bại',
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onBtnSearch: function(){
        var viewModel = this.getViewModel();
        var pordercode = viewModel.get('pordercode');
        // if(pordercode.length < 4){
        //     Ext.Msg.show({
        //         title: 'Thông báo',
        //         msg: 'Mã lệnh phải từ 4 ký tự trở lên',
        //         buttons: Ext.MessageBox.YES,
        //         buttonText: {
        //             yes: 'Đóng',
        //         }
        //     });
        //     return;
        // }
        if(pordercode == null || pordercode.length == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Mã lệnh không được bỏ trống',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        var form = Ext.create('Ext.window.Window', {
            height: 400,
            width: 500,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Danh sách lệnh',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'HandoverCutTolinePorderSearch',
                viewModel: {
                    type: 'HandoverCutTolinePorderSearchViewModel',
                    data: {
                        pordercode: pordercode
                    }
                }
            }]
        });
        form.show();
    },
    onLuu: function (thisBtn) {
        // var viewMain = Ext.getCmp('ContractBuyer');
        var m = this;
        var me = this.getView();
        // me.setLoading("Đang lưu dữ liệu");

        var viewModel = this.getViewModel();
        var HandoverProductStore = viewModel.getStore('HandoverProductStore');
        // console.log(HandoverProductStore.data);

        var params = new Object();
        var data = new Object();
        data = viewModel.get('currentRec');
        // console.log(HandoverProductStore.getById(0).data);

        params.data = data;
        if(viewModel.get('isCreateNew'))
            params.handoverProduct = HandoverProductStore.getById(0).data;
        params.msgtype = "HANDOVER_CREATE";
        params.message = "Tạo handover";

        GSmartApp.Ajax.post('/api/v1/handover/create', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        viewModel.set('currentRec', response.data);
                        var handover_date = viewModel.get('currentRec.handover_date');
                        var date = Ext.Date.parse(handover_date, 'c');
                        if (null == date) date = new Date(handover_date);
                        viewModel.set('currentRec.handover_date',date);

                        m.redirectTo("handover_cut_toline/" + response.data.id + "/edit");
                        // m.loadHandoverProduct(response.data.id);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Lưu thất bại',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Lưu thất bại',
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onQuayLai: function () {
        var viewModel = this.getViewModel();
        if(viewModel.get('isOut')) 
            this.redirectTo('handover_cut_toline');
        if(viewModel.get('isIn'))
            this.redirectTo('handover_line_fromcut');
    },
    onLoadData: function (id, type) {
        var m = this;
        if(id == 0){
            m.loadNewInfo();
        }else{
            m.loadInfo(id);
        }
    },
    loadNewInfo: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var session = GSmartApp.util.State.get('session');
        viewModel.set('isCreateNew', true);
        viewModel.set('currentRec.id', 0);
        viewModel.set('currentRec.status', 0);
        viewModel.set('currentRec.handovertypeid_link', 1);
        // viewModel.set('currentRec.handover_userid_link', session.id);
        viewModel.set('currentRec.handover_date', new Date());
        // viewModel.set('currentRec.orgid_from_link', session.orgid_link);

        // nếu orgid_link là tổ cắt thì chọn tổ cắt, nếu không chọn combo
        var params = new Object();
        params.id = session.orgid_link;
        GSmartApp.Ajax.post('/api/v1/org/getOrgById', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    data = response.data;
                    // console.log(data);
                    if(data.orgtypeid_link == 17){ // tổ cắt
                        viewModel.set('currentRec.orgid_from_link', session.orgid_link);
                    }
                }
            })
    },
    loadInfo: function(id){
        var m = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.post('/api/v1/handover/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    data = response.data;
                    viewModel.set('isCreateNew', false);
                    viewModel.set('currentRec', data);

                    var handover_date = viewModel.get('currentRec.handover_date');
                    var date = Ext.Date.parse(handover_date, 'c');
                    if (null == date) date = new Date(handover_date);
                    viewModel.set('currentRec.handover_date',date);
                    viewModel.set('pordercode',viewModel.get('currentRec.ordercode'));
                    // console.log(viewModel.get('currentRec'));

                    var POrderGrantStore = viewModel.getStore('POrderGrantStore');
                    POrderGrantStore.loadStoreByPOrderId(data.porderid_link);

                    m.loadHandoverProduct(data.id);
                }
            })
    },
    loadHandoverProduct: function(handoverid_link){
        var viewModel = this.getViewModel();
        var HandoverProductStore = viewModel.getStore('HandoverProductStore');
        HandoverProductStore.removeAll();
        HandoverProductStore.loadStore_Async(handoverid_link);

        HandoverProductStore.load({
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    this.fireEvent('logout');
                } else {
                    var params=new Object();
                    params.handoverid_link = handoverid_link;
                    // console.log(params);
                    GSmartApp.Ajax.post('/api/v1/handoverproduct/getByHandoverId', Ext.JSON.encode(params),
                    function (success, response, options) {
                        var response = Ext.decode(response.responseText);
                        if (success) {
                            // console.log(response);
                            HandoverProductStore.setData(response.data);
                        }
                    }); 
                }
            }
        });
    },
    onPOrderGrantSelect: function(cbbox, record, eOpts){
        var m = this;
        var viewModel = this.getViewModel();
        var pordergrantid_link = record.data.id;
        var orgid_to_link = record.data.granttoorgid_link;
        
        viewModel.set('currentRec.pordergrantid_link', pordergrantid_link);
        viewModel.set('currentRec.orgid_to_link', orgid_to_link);
    },
    onEditProductTotalPackage: function (editor, context, e) {
        var viewModel = this.getViewModel();
        if(viewModel.get('isIn')){
            var HandoverProductStore = viewModel.getStore('HandoverProductStore');
            HandoverProductStore.rejectChanges();
            return;
        }
        if(context.value == context.originalValue || context.value < 0){
            var HandoverProductStore = viewModel.getStore('HandoverProductStore');
            HandoverProductStore.rejectChanges();
            return;
        }

        var isCreateNew = viewModel.get('isCreateNew');
        if(!isCreateNew){
            var me = this;
            if (context.field == "totalpackage") {
                me.updateTotalpackage(context.record);
            }

        }
    },
    updateTotalpackage: function(record){
        var grid = this.getView();
        // console.log(record.data);
        var me = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.data = record.data;
        GSmartApp.Ajax.post('/api/v1/handoverproduct/updateHandoverProduct', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    var HandoverProductStore = viewModel.getStore('HandoverProductStore');
                    if (response.respcode != 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        HandoverProductStore.rejectChanges();
                    }
                    else {
                        HandoverProductStore.commitChanges();
                    }
                }
            })
    },
    onMenu: function(grid, rowIndex, colIndex, item, e, record){
        var me = this;
        var viewModel = this.getViewModel();
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
            {
                text: 'Chi tiết SKU',
                itemId: 'btnSKU',
                separator: true,
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-edit brownIcon',
                handler: function(){
                    var record = this.parentMenu.record;
                    console.log(record);
                    // me.onEdit(record);
                    var porderid_link = viewModel.get('currentRec.porderid_link');
                    var handoverid_link = viewModel.get('currentRec.id');
                    var handoverproductid_link = record.data.id;
                    var productid_link = record.data.productid_link;
                    var isIn = viewModel.get('isIn');

                    var form = Ext.create('Ext.window.Window', {
                        height: 400,
                        width: 500,
                        closable: true,
                        resizable: false,
                        modal: true,
                        border: false,
                        title: 'Chi tiết SKU',
                        closeAction: 'destroy',
                        bodyStyle: 'background-color: transparent',
                        layout: {
                            type: 'fit', // fit screen for window
                            padding: 5
                        },
                        items: [{
                            xtype: 'HandoverCutTolineSKUDetail',
                            viewModel: {
                                type: 'HandoverCutTolineSKUDetailViewModel',
                                data: {
                                    handoverid_link: handoverid_link, 
                                    handoverproductid_link: handoverproductid_link, 
                                    porderid_link: porderid_link, 
                                    productid_link: productid_link,
                                    isIn: isIn
                                }
                            }
                        }]
                    });
                    form.show();
                },
            }
        ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX()-10, e.getY()-10];
        e.stopEvent();
        menu_grid.record = record;
        menu_grid.showAt(position);
        // common.Check_Menu_Permission(menu_grid);
    },
    onConfirm: function(){
        // nhận
        var viewModel = this.getViewModel();
        var handoverid_link = viewModel.get('currentRec.id');
        var isIn = viewModel.get('isIn');
        var isOut = viewModel.get('isOut');
        var form = Ext.create('Ext.window.Window', {
            // height: 200,
            width: 315,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Nơi nhận xác thực',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'HandoverCutTolineConfirm',
                viewModel: {
                    type: 'HandoverCutTolineConfirmViewModel',
                    data: {
                        handoverid_link: handoverid_link,
                        isIn: isIn,
                        isOut: isOut
                    }
                }
            }]
        });
        form.show();
    },
    loadHandoverProductOnPorderSelect: function(porderid_link){
        var viewModel = this.getViewModel();
        var params = new Object();
        params.porderid_link = porderid_link;

        GSmartApp.Ajax.post('/api/v1/handoverproduct/getByPorderId', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        response.data.buyercode = response.buyercode;
                        response.data.buyername = response.buyername;
                        response.data.unitName = response.unitName;
                        
                        var data = new Array();
                        data.push(response.data);

                        var HandoverProductStore = viewModel.getStore('HandoverProductStore');
                        HandoverProductStore.setData(data);
                    }
                }
            })
    },
    onPressEnterPordercode: function(textfield, e, eOpts){
        var me = this;
        if(e.getKey() == e.ENTER) {
            // Ext.Msg.alert('Keys','You pressed the Enter key');
            me.onBtnPlus();
        }
    }
})