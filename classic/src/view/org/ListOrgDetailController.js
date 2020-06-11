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
        '#btnXoa': {
            click: 'onXoa'
        },
        '#btnThemDonViMoi': {
            click: 'onThem'
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
        viewModel.set('parentId',data.id);
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

        if(viewModel.get('parentId')!=null){
            data.parentid_link=viewModel.get('parentId');
        }else{
            data.parentid_link=-1;
        }

        params.data = data;
        params.msgtype = "ORG_CREATE";
        params.message = "Tạo org";

        viewModel.set('parentId',null);

        GSmartApp.Ajax.post('/api/v1/orgmenu/createOrg', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thành công',
                            // buttons: [{
                            //     itemId: 'cancel',
                            //     text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
                            // }]
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });

                        if (data.id == 0) {
                            // if(viewMain)
                            // viewMain.getStore().load();
                            var storeMenu = viewModel.getStore('MenuStore');
                            storeMenu.loadStore();
                        }
                        // me.Id = response.id;
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Lưu thất bại',
                            msg: response.message,
                            // buttons: [{
                            //     itemId: 'cancel',
                            //     text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
                            // }]
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        // me.down('#code').focus();
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Lưu thất bại',
                        msg: null,
                        // buttons: [{
                        //     itemId: 'cancel',
                        //     text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
                        // }]
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
    },
    onXoa:function(){
        // console.log('Clicked xoa');
        var me=this;
        var viewModel = this.getViewModel();
        var id=viewModel.get('id');
        var name=viewModel.get('name');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa đơn vị "' + name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.Xoa(id);
                }
            }
        });
    },Xoa:function(id){
        var me = this.getView();
        var viewmodel = this.getViewModel();
        me.up('panel').setLoading("Đang xóa dữ liệu");
        var params = new Object();
        params.id = id;

        GSmartApp.Ajax.post('/api/v1/orgmenu/deleteOrg', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Xóa thành công",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    viewmodel.set('id',0);
                    viewmodel.set('currentRec',null);
                    var storeMenu = viewmodel.getStore('MenuStore');
                    storeMenu.loadStore();
                } else {
                    Ext.Msg.show({
                        title: 'Xóa thất bại',
                        msg: null,
                        buttons: [{
                            itemId: 'cancel',
                            text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
                        }]
                    });
                }
                me.up('panel').setLoading(false);
            })
    },
    onThem:function(){
        // console.log('Clicked them');
        var viewModel = this.getViewModel();
        viewModel.set('parentId',null);
        viewModel.set('id',0);
        viewModel.set('currentRec',null);
    }
})