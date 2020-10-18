Ext.define('GSmartApp.view.personel.Personnel_info_main_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Personnel_info_main_ViewController',
    init: function () {
      
    },
    control: {
        '#btnThoat' : {
            click: 'onThoat'
        }
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    }
})