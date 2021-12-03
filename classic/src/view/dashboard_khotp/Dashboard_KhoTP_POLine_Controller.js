Ext.define('GSmartApp.view.dashboard_khotp.Dashboard_KhoTP_POLine_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Dashboard_KhoTP_POLine_Controller',
    init: function () {
        this.loadPO_HavetoShip();
    },
    control: {
        '#Dashboard_KhoTP_POLine_List': {
            itemclick: 'onSelectProduct'
        },
        '#btnStockoutOrder_Create': {
            click: 'onStockoutOrder_Create'
        }
    },
    loadPO_HavetoShip: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POLineStore');
        store.getpo_havetoship(viewmodel.get('shipdate_from'), viewmodel.get('shipdate_to'));
    },
    onSelectProduct: function (t, record, index, eOpts) {
        var viewmodel = this.getViewModel();
        var storeSku = viewmodel.getStore('PContractSKUStore');
        var pcontract_poid_link = record.data.id;
        // console.log(record);
        storeSku.load_by_pcontract_po(pcontract_poid_link);
    },
    onStockoutOrder_Create: function(){
        //Lấy danh sách các PO Line được chọn --> Gửi lên để tạo Stockout_order
        var me = this.getView();
        var th = this;

        me.setLoading(true);
        var poLinesView = me.down('#Dashboard_KhoTP_POLine_List');

        var data = '';
        var select = poLinesView.getSelectionModel().getSelection();

        if (select.length == 0) {
            me.setLoading(false);
            return;
        }
        for (var i = 0; i < select.length; i++) {
            data = data + select[i].data.id + ';';
            // data.push(select[i].data);
        }
        console.log(data);

        var params = new Object();
        params.list_po = data;

        GSmartApp.Ajax.post('/api/v1/stockoutorder/create_from_po', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    // console.log(response);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Tạo lệnh xuất kho thành công",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        //Refresh lại danh sách PO Line
                        th.loadPO_HavetoShip();
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    // console.log(response);
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
    }
});
