Ext.define('GSmartApp.view.pcontract.PContractSKUViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractSKUViewCotroller',
    init: function () {
        
    },
    control:{
        
    },
    onEdit: function(editor, context, e){
        var viewmodel = this.getViewModel();
        var data = context.record.data;
        var params = new Object();
        params.data = data;
        params.data.pcontract_poid_link = viewmodel.get('pcontract_poid_link');

        delete params.data.listSKUvalue;

        GSmartApp.Ajax.post('/api/v1/pcontractsku/update', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    var store = viewmodel.getStore('PContractSKUStore');
                    if (response.respcode != 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Có'
                            }
                        });
                        store.rejectChanges();
                    }
                    else {
                        store.commitChanges();
                    }
                }
            })
    },
    onXoa: function(grid, rowIndex, colIndex){
        var th = this;
        Ext.Msg.show({
            title: "Thông báo",
            msg: 'bạn có chắc chắn muốn xóa SKU ?',
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function(btn){
                if(btn==='yes'){
                    var viewmodel= th.getViewModel();
                    var record = grid.getStore().getAt(rowIndex);
                    var params = new Object();
                    params.pcontractid_link = viewmodel.get('PContract.id');
                    params.skuid_link = record.data.skuid_link;
                
                    GSmartApp.Ajax.post('/api/v1/pcontractsku/delete', Ext.JSON.encode(params),
                    function (success, response, options) {
                        if (success) {
                            var response = Ext.decode(response.responseText);
                            var store = viewmodel.getStore('PContractSKUStore');
                            if (response.respcode == 200) {
                                Ext.Msg.show({
                                    title: "Thông báo",
                                    msg: 'Xóa thành công',
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'OK'
                                    }
                                });
                                store.remove(record);

                                var tab = Ext.getCmp('PContractProduct_Bom_TabColorView').getController();
                                tab.createTab();

                                var storeAtt = viewmodel.getStore('PContractAttValueStore');
                                storeAtt.loadStore(params.pcontractid_link, viewmodel.get('IdProduct'));
                            }
                            else {
                                Ext.Msg.show({
                                    title: "Thông báo",
                                    msg: 'Xóa thất bại',
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'OK'
                                    }
                                });
                            }
                        }
                    })
                }
            }
        });
    }
})