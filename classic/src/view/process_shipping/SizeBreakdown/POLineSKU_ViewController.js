Ext.define('GSmartApp.view.process_shipping.SizeBreakdown.POLineSKU_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POLineSKU_ViewController',
    init: function () {

    },
    control: {
        '#btnAddToPorder': {
            click: 'onAddPorder'
        }
    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onAddPorder: function () {
        var grid = this.getView();
        var select = grid.getSelectionModel().getSelection();
        var viewmodel = this.getViewModel();

        if (select.length == 0) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn chưa chọn thông tin',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
        }
        else {
            var params = new Object();
            params.porderid_link = viewmodel.get('porderid_link');
            params.productid_link = viewmodel.get('productid_link');
            params.pcontract_poid_link = viewmodel.get('pcontract_poid_link');

            //validate
            var mes = "";
            if (params.porderid_link == 0) {
                mes = "Bạn chưa chọn lệnh sản xuất!";
            }
            else if (params.pcontract_poid_link == 0) {
                mes = "Bạn chưa chọn PO Line!";
            }

            if (mes != "") {
                Ext.Msg.show({
                    title: 'Thông báo',
                    msg: mes,
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng'
                    }
                });
            }
            else {
                grid.setLoading('Đang lưu');

                var lst = [];
                for (var i = 0; i < select.length; i++) {
                    lst.push(select[i].data);
                }

                params.list_sku = lst;
                GSmartApp.Ajax.post('/api/v1/porderlist/addskuto_porder', Ext.JSON.encode(params),
                    function (success, response, options) {
                        if (success) {
                            var response = Ext.decode(response.responseText);
                            if (response.respcode == 200) {
                                var store_line = viewmodel.getStore('POLineSKU_Store');
                                store_line.load();
                                var store_porder = viewmodel.getStore('porderSKUStore');
                                store_porder.load();
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
                        } else {
                            Ext.Msg.show({
                                title: "Thông báo",
                                msg: "Thêm thất bại",
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                        grid.setLoading(false);
                    })
            }
        }
    }
})