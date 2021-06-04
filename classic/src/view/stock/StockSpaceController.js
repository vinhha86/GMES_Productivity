Ext.define('GSmartApp.view.stock.StockSpaceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockSpaceController',
    Id: 0,
    init: function () {
        // this.onloadPage();
    },
    control: {
        '#btnLuuSpace': {
            click: 'onLuu'
        },
        // '#btnThemDonViTrucThuoc': {
        //     click: 'onThemTrucThuoc'
        // }
    },
    // onloadPage: function(){
    //     var viewModel = this.getViewModel();
    //     var ListKhoRowStore = viewModel.getStore('ListKhoRowStore');
    //     ListKhoRowStore.loadOrgByTypeKho();
    // },
    onLuu: function () {
        var m = this;
        var me = this.getView();
        var treePanel = Ext.getCmp('stock').down('StockMenu');

        var viewModel = this.getViewModel();
        var spaceObj = viewModel.get('spaceObj');
        if(
            spaceObj.orgid_link == null || spaceObj.orgid_link == '' || 
            spaceObj.spacename == null || spaceObj.spacename == ''
            ){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Cần phải điền đầy đủ thông tin',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            me.down('#txtFieldSpacename').focus();
            return;
        }

        if(spaceObj.spacename == spaceObj.spacename_old){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Lưu thành công',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }

        var params = new Object();
        params.orgid_link = spaceObj.orgid_link;
        params.spacename = spaceObj.spacename;
        params.spacename_old = spaceObj.spacename_old;
        params.rowid_link = spaceObj.rowid_link;

        me.setLoading("Đang lưu dữ liệu");
        GSmartApp.Ajax.postJitin('/api/v1/stock/create_space', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
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
                        
                        var StockTreeStore = viewModel.getStore('StockTreeStore');
                        StockTreeStore.load();
                        viewModel.set('spaceObj', null);
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
})