Ext.define('GSmartApp.view.cut_plan.Detail.CutPlan_NPL_ViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CutPlan_NPL_ViewCotroller',
    init: function () {
        var viewmodel = this.getViewModel();


    },
    control: {
        '#btnHideNPL': {
            click: 'onHideNPL'
        },
        '#CutPlan_NPL_View': {
            itemclick: 'onSelectNPL'
        },
        '#btnAdd_CutPlan': {
            click: 'onThemKeHoach'
        }
    },
    onFilterValueMaNPLKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('ProductStore');
        var filterField = this.lookupReference('ValueFilterFieldMaNPL'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldMaNPL = filters.add({
                id: 'ValueFilterFieldMaNPL',
                property: 'product_code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldMaNPL) {
            filters.remove(this.ValueFilterFieldMaNPL);
            this.ValueFilterFieldMaNPL = null;
        }
    },
    onHideNPL: function () {
        var viewmodel = this.getViewModel();
        viewmodel.set('width_npl', 0);
        // var form = this.getView();
        // form.collapse('left', 0);

        viewmodel.set('isHiddenNPL', true);
    },
    onSelectNPL: function (grid, record, item, index, e, eOpts) {
        var viewmodel = this.getViewModel();
        viewmodel.set('npl', record.data);

        var colorid_link = viewmodel.get('colorid_link_active');
        var porder = viewmodel.get('porder');
        var npl = viewmodel.get('npl');

        var store = viewmodel.getStore('CutPlanRowStore');
        store.loadStore_bycolor(colorid_link, porder.id, npl.id, porder.productid_link, porder.pcontractid_link);
    },
    onThemKeHoach: function () {
        var viewmodel = this.getViewModel();
        var npl = viewmodel.get('npl');
        var porder = viewmodel.get('porder');

        if (npl.id == null) {
            Ext.Msg.alert({
                title: "Thông báo",
                msg: 'Bạn chưa chọn nguyên liệu',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            var params = new Object();
            params.material_skuid_link = npl.id;
            params.porderid_link = porder.id;
            params.productid_link = porder.productid_link;
            params.pcontractid_link = porder.pcontractid_link;

            GSmartApp.Ajax.post('/api/v1/cutplan/create', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode != 200) {
                            Ext.Msg.show({
                                title: "Thông báo",
                                msg: 'Lưu thất bại',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                        else {
                            //Thanh cong thi commit de bo dau do trong grid
                            Ext.Msg.show({
                                title: "Thông báo",
                                msg: 'Tạo thành công',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                },
                                fn: function () {
                                    var store = viewmodel.getStore('CutPlanRowStore');
                                    store.load();
                                }
                            });
                        }
                    }
                })
        }
    }
})