Ext.define('GSmartApp.view.systemmenu.SystemMenuViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SystemMenuViewController',
    init: function () {
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('MenuStore');
        store.loadStore_byrole(0);
    },
    control: {
        "#onThemMoi":{
            click: 'ThemMoi'
        }
    },
    ThemMoi:function(){
        var viewmodel=this.getViewModel();
        var form = Ext.create('Ext.window.Window',{
            height:300,
            width:300,
            closable:true,
            resizable:false,
            modal: true,
            border: false,
            title:'Thêm mới chức năng',
            closeAction:'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items:[
                {
                    xtype:'SystemMenuAddView'
                }
            ]
        });
        form.show();
    }
})