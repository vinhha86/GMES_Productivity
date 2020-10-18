Ext.define('GSmartApp.view.personel.Personnel_ListView_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Personnel_ListView_Controller',
    init: function () {
      
    },
    control: {
        '#btnThemMoi_Personnel' : {
            click: 'onThemMoi'
        }
    },
    onThemMoi: function(){
        var viewModel = this.getViewModel();

        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thêm mới nhân viên',
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .95,
            width: Ext.getBody().getViewSize().width * .8,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Personnel_info_main'
            }]
        });
        form.show();

        form.down('Personnel_info_main').getController().on('Thoat', function () {
            form.close();
        });
    }
})