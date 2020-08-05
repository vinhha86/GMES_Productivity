Ext.define('GSmartApp.view.porders.POrderList.SewingCost.List_WorkingProcess_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.List_WorkingProcess_ViewController',
    init: function() {
        this.callParent(arguments);  
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('WorkingProcess_Store');
        var productid_link = viewmodel.get('working.productid_link');
        store.loadby_product(productid_link);


    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnChon' : {
            click: 'onChon'
        },
        '#btnThemMoi' : {
            click: 'onThemMoi'
        },
        '#btnHuy' : {
            click: 'onHuy'
        },
        '#btnLuu': {
            click: 'onLuu'
        },
        '#name' : {
            specialkey: 'onSpecialkey'
        },
        '#device' : {
            specialkey: 'onSpecialkey'
        },
        '#labor' : {
            specialkey: 'onSpecialkey'
        },
        '#time' : {
            specialkey: 'onSpecialkey'
        },
        '#comment' : {
            specialkey: 'onSpecialkey'
        }
    },
    onLuu: function(){
        var grid = this.getView();
        var viewmodel = this.getViewModel();

        var params = new Object();
        params.data = viewmodel.get('working');

        GSmartApp.Ajax.post('/api/v1/workingprocess/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if(response.respcode == 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Lưu thành công!",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            },
                            fn: function(){
                                var store = viewmodel.getStore('WorkingProcess_Store');
                                var rec = store.insert(0, response.data);
                                grid.getSelectionModel().select(rec);

                                grid.down('#addWorking').getForm().reset();
                                grid.down('#name').focus();
                            }
                        });
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Lưu thất bại!",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            },
                            fn: function(){
                                grid.down('#comment').focus();
                            }
                        });
                    }
                }else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Lưu thất bại!",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        },
                        fn: function(){
                            grid.down('#comment').focus();
                        }
                    });
                }
            })
    },
    onSpecialkey: function(field, e){
        var me = this.getView();
        if (e.getKey() == e.ENTER) {
            if (field.itemId == "name") {
                me.down('#device').focus();
              }
              else if (field.itemId == "device") {
                me.down('#labor').focus();
              }
              else if (field.itemId == "labor") {
                me.down('#time').focus();
              }
              else if (field.itemId == "time") {
                me.down('#comment').focus();
              }
              else if (field.itemId == "comment") {
                this.onLuu();
              }
        }
    },
    onHuy: function() {
        var me = this;
        var grid = this.getView();
        var viewmodel = this.getViewModel();

        viewmodel.set('isDisable_themmoi', false);
        grid.down('#addWorking').setHidden(true);
        grid.down('#addWorking').getForm().reset();
    },
    onThemMoi: function(){
        var me = this;
        var grid = this.getView();
        var viewmodel = this.getViewModel();

        viewmodel.set('isDisable_themmoi', true);
        grid.down('#addWorking').setHidden(false);
        grid.down('#name').focus();
    },
    onWorkingnameKeyup: function(){
        var grid = this.getView(),
        // Access the field using its "reference" property name.
        filterField = this.lookupReference('workingname'),
        filters = grid.store.getFilters();

        if (filterField.value) {
            this.codeFilter = filters.add({
                id: 'codeFilter',
                property: 'name',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.codeFilter) {
            filters.remove(this.codeFilter);
            this.codeFilter = null;
        }
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
    onChon: function(){
        var grid = this.getView();
        var select = grid.getSelectionModel().getSelection();

        if(select.length == 0){
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Bạn chưa chọn công đoạn",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
        }
        else {
            var listid = [];
            for(var i=0; i<select.length; i++){
                listid.push(select[i].get('id'));
            }
            grid.fireEvent('CreateSewingCost', listid);
        }
    }
});