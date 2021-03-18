Ext.define('GSmartApp.view.porders.POrder_List.POrder_Product_SKU.POLine_SKU_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POLine_SKU_ViewController',
    init: function () {
        var viewmodel = this.getViewModel();
    },
    control: {
        '#btnAddToPorder': {
            click: 'onAddToPorder'
        }
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    },
    onAddToPorder: function(){
        var view = this.getView();
        view.setLoading("Đang lưu dữ liệu");

        var select = view.getSelectionModel().getSelection();
        var viewmodel = this.getViewModel();

        var porder = viewmodel.get('porder');
         var params = new Object();
         params.porderid_link = porder.id;
         params.productid_link = porder.productid_link;
         
         var lst = [];
         for(var i=0; i< select.length; i++){
             lst.push(select[i].data);
         }

         params.list_sku = lst;

         GSmartApp.Ajax.post('/api/v1/porderlist/addskuto_porder', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if(response.respcode == 200) {
                        var store_line = view.getStore('POLineSKU_Store');
                        store_line.load();
                        var store = view.getStore('porderSKUStore');
                        store.load();
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Lưu thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                }else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Thêm thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                view.setLoading(false);
            })
    }
})