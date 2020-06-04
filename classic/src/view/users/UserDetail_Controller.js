Ext.define('GSmartApp.view.users.UserDetail_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.UserDetail_Controller',
    init: function () {

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
            click: 'onUpdate'
        }
    },
    onQuayLai: function(){
        this.redirectTo("lsusers");
    },
    onLoadData:function(id,type){
        this.getInfo(id);

        var GroupUserStore = this.getViewModel().getStore('GroupUserStore');
        var sorters = [{
            property: 'checked',
            direction: 'DESC'
        }]
        GroupUserStore.sorter =sorters;
        GroupUserStore.loadStore_byuser(id);
    },
    getInfo: function (id) {
        var viewModel = this.getViewModel();
        var params = new Object();
        params.id = id;

        GSmartApp.Ajax.post('/api/v1/users/user_getinfo', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                       viewModel.set('User', response.data);
                    }
                }
            })
    },
    onUpdate: function(){
        var me = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        var user = new Object();
        user = viewModel.get('User');
        params.user = user;
        GSmartApp.Ajax.post('/api/v1/users/user_update', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: "Lưu thành công",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            },
                            fn: function(){
                                if(0 == viewModel.get('User.status')){
                                    me.onQuayLai();
                                }
                            }
                        });
                    }
                    else{
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: "Lưu thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                }
            })
    }
})