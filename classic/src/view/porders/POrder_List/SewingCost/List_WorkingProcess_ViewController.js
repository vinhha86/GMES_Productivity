Ext.define('GSmartApp.view.porders.POrderList.SewingCost.List_WorkingProcess_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.List_WorkingProcess_ViewController',
    init: function() {
        this.callParent(arguments);  
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('WorkingProcess_Store');
        var productid_link = viewmodel.get('productid_link');
        store.loadby_product(productid_link);


    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnChon' : {
            click: 'onChon'
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