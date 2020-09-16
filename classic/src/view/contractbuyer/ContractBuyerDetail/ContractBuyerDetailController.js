Ext.define('GSmartApp.view.contractbuyer.ContractBuyerDetail.ContractBuyerDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ContractBuyerDetailController',
    Id: 0,
    init: function () {
        var me = this.getView();
        var viewmodel = me.getViewModel();
        var EndBuyer = viewmodel.getStore('EndBuyer');
        var Vendor = viewmodel.getStore('Vendor');
        EndBuyer.loadStore(12);
        EndBuyer.sort('code','ASC');
        Vendor.loadStore(11);
        Vendor.sort('code','ASC');
        var contract_date = this.lookupReference('contract_date');
        contract_date.getPicker().monthYearFormat = 'm-Y';
        var contract_date_finish = this.lookupReference('contract_date_finish');
        contract_date_finish.getPicker().monthYearFormat = 'm-Y';
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
        '#btnLuuVaTaoMoi': {
            click: 'Luu'
        }
    },
    onLuu: function (thisBtn) {
        var viewMain = Ext.getCmp('ContractBuyer');
        var m = this;
        var me = this.getView();
        me.setLoading("Đang lưu dữ liệu");

        var viewModel = this.getViewModel();

        var params = new Object();
        var data = new Object();
        data = viewModel.get('currentRec');
        data.id = this.Id;

        params.data = data;
        params.msgtype = "CONTRACTBUYER_CREATE";
        params.message = "Tạo contract buyer";

        GSmartApp.Ajax.post('/api/v1/contractbuyer/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });

                        if(response.message == 'Lưu thành công'){
                            if (data.id == 0) {
                                if(viewMain)
                                viewMain.getStore().load();
                            }
                            if(thisBtn.itemId=='btnLuu')
                                me.Id = response.id;
                            if(thisBtn.itemId=='btnLuuVaTaoMoi')
                                me.Id = 0;
                            m.redirectTo("lscontractbuyer/" + me.Id + "/edit");
                        }else{
                            // contract_code đã tồn tại
                            me.down('#contract_code').focus();
                        }
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
                        me.down('#code').focus();
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
                me.setLoading(false);
            })
    },
    Luu:function(thisBtn){
        var m = this;
        m.onLuu(thisBtn);
    },
    onQuayLai: function () {
        this.redirectTo('lscontractbuyer');
    },
    onLoadData: function (id, type) {
        var me = this;
        var viewMain = Ext.getCmp('ContractBuyer');
        var viewmodel = me.getViewModel();
        viewmodel.set('id', id);
        if (id == 0) {
            viewmodel.set('currentRec', null);
            me.getView().getForm().reset();
        }
        else {
            if(viewMain){
                var data = viewMain.getStore().getById(id).data;
                viewmodel.set('currentRec', data);
                viewmodel.set('contract_code', data.contract_code);
            }
            else{
                me.loadInfo(id, viewmodel);
            }
        }

        me.Id = id;
    },
    loadInfo: function(id, viewmodel ){
        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.post('/api/v1/contractbuyer/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    data = response.data;
                    viewmodel.set('currentRec', data);
                    viewmodel.set('contract_code', data.contract_code);

                    var contract_date = viewmodel.get('currentRec.contract_date');
                    var contract_date_finish = viewmodel.get('currentRec.contract_date_finish');
                    var d = Ext.Date.parse(contract_date, 'c');
                    var d_finish = Ext.Date.parse(contract_date_finish, 'c');
                    if (null == d) d = new Date(contract_date);
                    if (null == d_finish) d_finish = new Date(contract_date_finish);
                    viewmodel.set('currentRec.contract_date',d);
                    viewmodel.set('currentRec.contract_date_finish',d_finish);
                }
            })
    }
})