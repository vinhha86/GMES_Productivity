Ext.define('GSmartApp.view.dashboard_kho.KeHoachVaoChuyenViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.KeHoachVaoChuyenViewController',
    init: function () {
        var me = this;
        me.CreateColumns();
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('KeHoachVaoChuyenStore');
        store.setGroupField('donvi');
        store.loadKeHoachVaoChuyen();
    },
    onReload: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('KeHoachVaoChuyenStore');
        store.load();
    },
    onbuyernameFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('KeHoachVaoChuyenStore');
        var filterField = this.lookupReference('buyernameFilter'),
            filters = store.getFilters();

        if (filterField.value) {
            this.buyernameFilter = filters.add({
                id: 'buyernameFilter',
                property: 'buyername',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.buyernameFilter) {
            filters.remove(this.buyernameFilter);
            this.buyernameFilter = null;
        }
    },
    onproductcodeKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('KeHoachVaoChuyenStore');
        var filterField = this.lookupReference('productcodeFilter'),
            filters = store.getFilters();

        if (filterField.value) {
            this.productcodeFilter = filters.add({
                id: 'productcodeFilter',
                property: 'productcode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.productcodeFilter) {
            filters.remove(this.productcodeFilter);
            this.productcodeFilter = null;
        }
    },
    CreateColumns: function () {
        var date = new Date();
        var length = 5;
        var grid = this.getView();
        //sinh 7 ngay tu ngay hom nay
        for (var i = 0; i < 7; i++) {
            var day = Ext.Date.add(date, Ext.Date.DAY, i);
            var title = Ext.Date.dateFormat(day, "d/m");
            var dataIndex = "day" + i;

            var column = Ext.create('Ext.grid.column.Number', {
                text: title,
                xtype: 'column',
                dataIndex: dataIndex,
                width: 70,
                menuDisabled: true,
                align: 'right',
                renderer: function (value, metaData, record) {
                    if (value == 0) return "";
                    return Ext.util.Format.number(value, '0,000')
                }
            });
            grid.headerCt.insert(length, column);
            length++;
        }
    }
})