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
        ListOrgStore.loadStoreAll();
        var POrder_ListStore = viewModel.getStore('POrder_ListStore');
        POrder_ListStore.loadStore();
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
            click: 'Luu'
        },
        '#btnHandover': {
            click: 'onHandover'
        },
        '#btnConfirm': {
            click: 'onConfirm'
        },
    },
    onLuu: function (thisBtn) {
        // var viewMain = Ext.getCmp('ContractBuyer');
        var m = this;
        var me = this.getView();
        // me.setLoading("Đang lưu dữ liệu");

        var viewModel = this.getViewModel();

        var params = new Object();
        var data = new Object();
        data = viewModel.get('currentRec');
        // console.log(data);

        params.data = data;
        params.msgtype = "HANDOVER_CREATE";
        params.message = "Tạo handover";

        GSmartApp.Ajax.post('/api/v1/handover/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
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
                        m.loadHandoverProduct(response.data.id);
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
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    Luu:function(){
        var m = this;
        var viewModel = this.getViewModel();
        m.onLuu();
    },
    onQuayLai: function () {
        this.redirectTo('handover_cut_toline');
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
        viewModel.set('currentRec.id', 0);
        viewModel.set('currentRec.status', 0);
        viewModel.set('currentRec.handovertypeid_link', 1);
        viewModel.set('currentRec.handover_userid_link', session.id);
        viewModel.set('currentRec.orgid_from_link', session.orgid_link);
        // console.log(session.id);
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
                    viewModel.set('currentRec', data);

                    var handover_date = viewModel.get('currentRec.handover_date');
                    var date = Ext.Date.parse(handover_date, 'c');
                    if (null == date) date = new Date(handover_date);
                    viewModel.set('currentRec.handover_date',date);

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
        HandoverProductStore.loadStore(handoverid_link);
    },
    onChange: function(cbbox, newValue, oldValue, eOpts){
        // console.log(newValue);
        // console.log(oldValue);
    },
    onOrderCodeSelect: function (cbbox, record, eOpts){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var porderid_link = record.data.id;
        viewModel.set('currentRec.porderid_link', porderid_link);

        var POrderGrantStore = viewModel.getStore('POrderGrantStore');
        POrderGrantStore.loadStoreByPOrderId(porderid_link);

        var comboboxPordergrant = me.down('#comboboxPordergrant');
        comboboxPordergrant.setValue('');
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
        if(context.value == context.originalValue || context.value < 0){
            var HandoverProductStore = viewModel.getStore('HandoverProductStore');
            HandoverProductStore.rejectChanges();
            return;
        }

        var me = this;
        if (context.field == "totalpackage") {
            me.updateTotalpackage(context.record);
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
                                    productid_link: productid_link
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
    onHandover: function(){
        // giao
        var m = this;
        var viewModel = this.getViewModel();
        var handoverid_link = viewModel.get('currentRec.id');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Xác nhận giao?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    m.setStatus(1, handoverid_link);
                }
                else {
                    return;
                }
            }
        });
    },
    onConfirm: function(){
        // nhận
        var viewModel = this.getViewModel();
        var handoverid_link = viewModel.get('currentRec.id');
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
                    // type: 'HandoverCutTolineConfirmViewModel',
                    // data: {
                    //     handoverid_link: handoverid_link
                    // }
                }
            }]
        });
        form.show();
    },
    setStatus: function(status, handoverid_link){
        var viewModel = this.getViewModel();
        var params = new Object();
        params.status = status;
        params.handoverid_link = handoverid_link;
        params.msgtype = "HANDOVER_SETSTATUS";
        params.message = "Set status";

        GSmartApp.Ajax.post('/api/v1/handover/setstatus', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        viewModel.set('currentRec.status', 1);
                        console.log(viewModel.get('currentRec'));
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
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    }
})