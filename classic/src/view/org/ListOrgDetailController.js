Ext.define('GSmartApp.view.org.ListOrgDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ListOrgDetailController',
    Id: 0,
    init: function () {
        
    },
    control: {
        '#btnLuu': {
            click: 'onLuu'
        },
        '#btnThemDonViTrucThuoc': {
            click: 'onThemTrucThuoc'
        }
    },
    onThemTrucThuoc: function(){
        // parentid_link
        var viewModel = this.getViewModel();
        var data = new Object();
        data = viewModel.get('currentRec');
        viewModel.set('parentid_link',data.id);
        viewModel.set('id',0);
        viewModel.set('currentRec',null);
    },
    onLuu: function () {
        var me = this.getView();
        me.setLoading("Đang lưu dữ liệu");

        var viewModel = this.getViewModel();

        var params = new Object();
        var data = new Object();
        data = viewModel.get('currentRec');
        data.id = viewModel.get('id');
        data.parentid_link=viewModel.get('parentid_link');
        
        if(data.status==true){
            data.status=1;
        }else{
            data.status=-1;
        }

        params.data = data;
        params.msgtype = "ORG_CREATE";
        params.message = "Tạo org";

        if(data.id == 0){
            viewModel.set('currentRec',null);
            viewModel.set('parentid_link',null);
            viewModel.set('fieldState',false);
            viewModel.set('id',0);
        }

        GSmartApp.Ajax.post('/api/v1/orgmenu/createOrg', Ext.JSON.encode(params),
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
                        var storeMenu = viewModel.getStore('MenuStore');
                        storeMenu.loadStore();
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
                me.setLoading(false);
            })
    }
})