Ext.define('GSmartApp.view.POrder_Balance.POrderBalanceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrderBalanceController',
    init: function () {
        var viewModel = this.getViewModel();
        var porderid_link = viewModel.get('porderid_link');

        var PorderSewingCostStore = viewModel.getStore('PorderSewingCostStore');
        PorderSewingCostStore.loadByPorderUnused(porderid_link);

        var POrderBalanceStore = viewModel.getStore('POrderBalanceStore');
        POrderBalanceStore.loadStore(porderid_link);
    },
    onBtnThemViTri: function(){
        var viewModel = this.getViewModel();
        var porderid_link = viewModel.get('porderid_link');
        // console.log('porderid_link : ' + porderid_link);
        var form = Ext.create('Ext.window.Window', {
            // height: 400,
            width: 400,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thêm vị trí',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'POrderBalance_Detail_AddPosition',
                viewModel: {
                    type: 'POrderBalance_Detail_AddPositionViewModel',
                    data: {
                        porderid_link: porderid_link,
                    }
                }
            }]
        });
        form.show();
    },
    onBeforeDropBalanceDetailSubToSub: function(node, data, overModel, dropPosition, dropHandlers, eOpts){
        console.log('SubToSub');
        console.log(data); // drag data
        console.log(overModel);  // data where dropped
        console.log(dropPosition);

        var me = this;

        if(overModel == null) {
            dropHandlers.cancelDrop();
            return;
        }
        if(data == null) {
            dropHandlers.cancelDrop();
            return;
        }

        var porderbalanceid_link_next = overModel.data.porderbalanceid_link;
        var porderbalanceid_link_prev = data.records[0].data.porderbalanceid_link;
        var porders_balance_processid_link = data.records[0].data.id; 

        if(porderbalanceid_link_next == porderbalanceid_link_prev){
            dropHandlers.cancelDrop();
            return;
        }

        me.onDropBalanceDetailSubToSub(porders_balance_processid_link, 
            porderbalanceid_link_prev, porderbalanceid_link_next, dropHandlers);
        // dropHandlers.cancelDrop();
    },
    onDropBalanceDetailSubToSub: function(porders_balance_processid_link, 
        porderbalanceid_link_prev, porderbalanceid_link_next, dropHandlers){
        var viewModel = this.getViewModel();
        var POrderBalanceStore = viewModel.getStore('POrderBalanceStore');
        // var PorderSewingCostStore = viewModel.getStore('PorderSewingCostStore');

        var params = new Object();
        params.porders_balance_processid_link = porders_balance_processid_link;
        params.porderbalanceid_link_next = porderbalanceid_link_next;

        GSmartApp.Ajax.post('/api/v1/porder_balance_process/updatePorderBalanceId', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        POrderBalanceStore.load();
                        // var porderBalancePrev = POrderBalanceStore.getById(porderbalanceid_link_prev);
                        // var porderBalanceNext = POrderBalanceStore.getById(porderbalanceid_link_next);
                        // console.log(porderBalancePrev);
                        // console.log(porderBalanceNext);
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Xoá thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        dropHandlers.cancelDrop();
                    }
                }
                else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Xoá thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    dropHandlers.cancelDrop();
                }
            })
    },
    onBeforeDropBalanceDetailSub: function(node, data, overModel, dropPosition, dropHandlers, eOpts){
        console.log('SubToList');
        console.log(data); // drag data
        console.log(overModel);  // data where dropped
        console.log(dropPosition);

        var me = this;

        if(overModel == null) {
            dropHandlers.cancelDrop();
            return;
        }
        if(data == null) {
            dropHandlers.cancelDrop();
            return;
        }

        // var porders_sewingcostid_link = overModel.data.id;
        var porders_balance_processid_link = data.records[0].data.id;

        me.onDropBalanceDetailSub(porders_balance_processid_link, dropHandlers);
        // dropHandlers.cancelDrop();
    },
    onDropBalanceDetailSub: function(porders_balance_processid_link, dropHandlers){
        var viewModel = this.getViewModel();
        // var POrderBalanceStore = viewModel.getStore('POrderBalanceStore');
        var PorderSewingCostStore = viewModel.getStore('PorderSewingCostStore');

        var params = new Object();
        params.porders_balance_processid_link = porders_balance_processid_link;

        GSmartApp.Ajax.post('/api/v1/porder_balance_process/delete', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        PorderSewingCostStore.load();
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Xoá thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        dropHandlers.cancelDrop();
                    }
                }
                else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Xoá thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    dropHandlers.cancelDrop();
                }
            })
    },
    onBeforeDropWorkingProcess: function (node, data, overModel, dropPosition, dropHandlers, eOpts) {
        console.log('ListToPosition');
        console.log(data); // drag data
        console.log(overModel);  // data where dropped
        console.log(dropPosition);

        var me = this;

        if(overModel == null) {
            dropHandlers.cancelDrop();
            return;
        }
        if(data == null) {
            dropHandlers.cancelDrop();
            return;
        }

        var porderbalanceid_link = overModel.data.id;
        var pordersewingcostid_link = data.records[0].data.id;

        me.onDropWorkingProcess(porderbalanceid_link, pordersewingcostid_link, dropHandlers);
        // dropHandlers.cancelDrop();
    },
    onDropWorkingProcess: function(porderbalanceid_link, pordersewingcostid_link, dropHandlers){

        var viewModel = this.getViewModel();
        var POrderBalanceStore = viewModel.getStore('POrderBalanceStore');

        var params = new Object();
        params.porderbalanceid_link = porderbalanceid_link;
        params.pordersewingcostid_link = pordersewingcostid_link;

        GSmartApp.Ajax.post('/api/v1/porder_balance_process/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        POrderBalanceStore.load();
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Thêm mới thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        dropHandlers.cancelDrop();
                    }
                }
                else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Thêm mới thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    dropHandlers.cancelDrop();
                }
            })
    }

});