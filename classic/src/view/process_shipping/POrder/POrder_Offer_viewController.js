Ext.define('GSmartApp.view.process_shipping.POrder.POrder_Offer_viewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_Offer_viewController',
    init: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrder_ListStore');
        var pcontract_poid_link = viewmodel.get('pcontract_poid_link');
        store.loadbyOffer(pcontract_poid_link);
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnChon': {
            click: 'onChon'
        }
    },
    onOrderCodeFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('POrder_ListStore');
        var filterField = this.lookupReference('ordercodeFilterField'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ordercodeFilterField = filters.add({
                id: 'ordercodeFilterField',
                property: 'ordercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ordercodeFilterField) {
            filters.remove(this.ordercodeFilterField);
            this.ordercodeFilterField = null;
        }
    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onThoat: function () {
        this.fireEvent('Thoat');
    },
    onChon: function () {
        var viewmodel = this.getViewModel();

        var grid = this.getView();
        var select = grid.getSelectionModel().getSelection();

        if (select.length == 0) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn chưa chọn Lệnh sản xuất',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
        }
        else {
            grid.setLoading('Đang xử lý');
            var params = new Object();
            var list = [];
            for (var i = 0; i < select.length; i++) {
                list.push(select[i].data);
            }
            params.pcontract_poid_link = viewmodel.get('pcontract_poid_link');
            params.data = list;

            GSmartApp.Ajax.post('/api/v1/porderpoline/add_porder', Ext.JSON.encode(params),
                function (success, response, options) {
                    grid.setLoading(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            grid.fireEvent('Chon');
                        }
                        else {
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: 'Có lỗi trong quá trình xử lý dữ liệu!',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng'
                                }
                            });
                        }
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Có lỗi trong quá trình xử lý dữ liệu!',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }
                })


        }
    }
})