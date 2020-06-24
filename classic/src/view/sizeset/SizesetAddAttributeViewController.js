Ext.define('GSmartApp.view.sizeset.SizesetAddAttributeViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SizesetAddAttributeViewController',
    init: function () {
        var me = this.getView();
        var store = this.getViewModel().getStore('AttributeStore');
        //////////////////////////////////////////////
        store.loadStore_NotinSizeset(me.IdSizeset);
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onLuu'
        }
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    onLuu: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();

        var params = new Object();
        params.sizesetid_link = me.IdSizeset;

        var obj = [];
        var select = me.getSelectionModel().getSelection();
        for (var i = 0; i < select.length; i++) {
            var data = select[i].data;
            obj.push(data.id);
        }

        params.listId = obj;
        params.msgtype = "SIZESET_ATTRIBUTE_CREATE";
        params.message = "Tạo thuộc tính dải size";

        GSmartApp.Ajax.post('/api/v1/sizesetattribute/createatt', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        mainView = Ext.getCmp('SizesetAttributeView');
                        if(mainView)
                            mainView.getStore().load();
                        me.up('window').close();
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Lưu thất bại',
                            msg: null,
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