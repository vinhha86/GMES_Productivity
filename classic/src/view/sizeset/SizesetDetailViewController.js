Ext.define('GSmartApp.view.sizeset.SizesetDetailViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SizesetDetailViewController',
    IdSizeset: 0,
    init: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        //neu la mo len tu form tin kiem
        if(viewmodel.get('isWindow')){
            me.onLoadData(viewmodel.get('sizeset.id'), null);
        }
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
        '#btnLuuVaTaoMoi': {
            click: 'onLuuVaTaoMoi'
        }
    },
    CheckValidate: function(){
        var viewmodel = this.getViewModel();
        var mes = '';

        if(viewmodel.get('sizeset.name') == '' || viewmodel.get('sizeset.name') == null){
            mes ="Bạn chưa nhập tên dải size";
            return mes;
        }
        else if(viewmodel.get('sizeset.comment') == '' || viewmodel.get('sizeset.comment') == null){
            mes ="Bạn chưa nhập chú thích";
            return mes;
        }
        return mes;
    },
    onLuu: function () {
        var m = this;

        var me = this.getView();
        var viewModel = this.getViewModel();
        me.setLoading("Đang lưu dữ liệu");

        var params = new Object();
        var data = new Object();
        data = viewModel.get('sizeset');
        data.id = m.IdSizeset;

        params.data = data;
        params.msgtype = "SIZESET_CREATE";
        params.message = "Tạo dải size";

        GSmartApp.Ajax.post('/api/v1/sizeset/createsizeset', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.MessageBox.show({
                            title: 'Thông báo',
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            },
                            fn: function(){
                                console.log(viewModel.get('isWindow'));
                                
                                if(!viewModel.get('isWindow'))
                                    m.redirectTo("lssizeset/" + response.id + "/edit");
                                else
                                {
                                    //Tạo event để form gọi lên hứng khi thêm sản phẩm thành công với trường hợp tạo sản phẩm trong đơn hàng
                                    m.getView().fireEvent("CreateSizeset", response.sizeset);
                                }
                            }
                        });
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                        me.down('#name').focus();
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    });
                }
                me.setLoading(false);
            })
    },
    onLuuVaTaoMoi:function(){
        var m = this;

        var me = this.getView();
        var viewModel = this.getViewModel();
        me.setLoading("Đang lưu dữ liệu");

        var params = new Object();
        var data = new Object();
        data = viewModel.get('sizeset');
        data.id = m.IdSizeset;

        params.data = data;
        params.msgtype = "SIZESET_CREATE";
        params.message = "Tạo dải size";

        GSmartApp.Ajax.post('/api/v1/sizeset/createsizeset', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.MessageBox.show({
                            title: 'Thông báo',
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            },
                            fn: function(){
                                console.log(viewModel.get('isWindow'));
                                //
                                m.IdSizeset = 0;
                                viewInfo = Ext.getCmp('SizesetInfoView');
                                viewInfo.IdSizeset = 0;
                                viewInfo.getController().loadInfo(0);
                                viewAttribute = Ext.getCmp('SizesetAttributeView');
                                viewAttribute.IdSizeset = 0;
                                //
                                if(!viewModel.get('isWindow'))
                                    m.redirectTo("lssizeset/" + m.IdSizeset + "/edit");
                                else
                                {
                                    //Tạo event để form gọi lên hứng khi thêm sản phẩm thành công với trường hợp tạo sản phẩm trong đơn hàng
                                    m.getView().fireEvent("CreateSizeset", response.sizeset);
                                }
                            }
                        });
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    });
                }
                me.setLoading(false);
            })
        me.down('#infoname').focus();
    },
    onQuayLai: function () {
        this.redirectTo('lssizeset');
    },
    onLoadData: function (id, type) {
        this.IdSizeset = id;
        viewInfo = Ext.getCmp('SizesetInfoView');
        viewInfo.IdSizeset = id;
        viewInfo.getController().loadInfo(id);
        viewAttribute = Ext.getCmp('SizesetAttributeView');
        viewAttribute.IdSizeset = id;
        
        var storeAtt = this.getViewModel().getStore('SizesetAttributeValueStore');
        if (id != 0) {
            storeAtt.loadStore(id);
        }
        else {
            storeAtt.removeAll();
        }
    }
})