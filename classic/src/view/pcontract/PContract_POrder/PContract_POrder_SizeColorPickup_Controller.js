Ext.define('GSmartApp.view.pcontract.PContract_POrder_SizeColorPickup_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_POrder_SizeColorPickup_Controller',
    init: function(){

    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
    },    
    onThoat: function () {
        this.fireEvent('Thoat');
    }
})