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
                        m.redirectTo("handover_cut_toline/" + response.data.id + "/edit");
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
        HandoverProductStore.loadStore(handoverid_link);
    },
    onChange: function(cbbox, newValue, oldValue, eOpts){
        // console.log(newValue);
        // console.log(oldValue);
    },
    onOrderCodeSelect: function (cbbox, record, eOpts){
        var m = this;
        var viewModel = this.getViewModel();
        var porderid_link = record.data.id;
        viewModel.set('currentRec.porderid_link', porderid_link);

        var POrderGrantStore = viewModel.getStore('POrderGrantStore');
        POrderGrantStore.loadStoreByPOrderId(porderid_link);
    },
    onPOrderGrantSelect: function(cbbox, record, eOpts){
        var m = this;
        var viewModel = this.getViewModel();
        var pordergrantid_link = record.data.id;
        var orgid_to_link = record.data.granttoorgid_link;
        
        viewModel.set('currentRec.pordergrantid_link', pordergrantid_link);
        viewModel.set('currentRec.orgid_to_link', orgid_to_link);
    },
    onMenu: function(grid, rowIndex, colIndex, item, e, record){
        var me = this;
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
                    // me.onEdit(record);
                    console.log(record);
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
    }
})