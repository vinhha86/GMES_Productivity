Ext.define('GSmartApp.view.login.RegisterDemo_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RegisterDemo_Controller',
    control: {
        // '#btnThoat': {
        //     click: 'onThoat'
        // },
        '#btnLuu': {
            click: 'onChon'
        }
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
    onChon: function(){
        var me = this;
        var viewmodel = this.getViewModel();

        Ext.Ajax.request({
            url :  config.getBack() + 'demoreg',
            method:'POST',
            params: JSON.stringify({
                reguser: viewmodel.get('reguser'),
                regemail: viewmodel.get('regemail'),
                regtel: viewmodel.get('regtel'),
                regorg: viewmodel.get('regorg'),
                regcomment: viewmodel.get('regcomment'),
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            success: function(result, opts) {
                me.onThoat();
            },
            failure: function(err, opts) {
                console.log('Failure login user', err);
            }
        });
    }
})