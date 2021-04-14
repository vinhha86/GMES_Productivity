Ext.define('GSmartApp.view.pcontract.PContract_Bom_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_Bom_View',
    id: 'PContract_Bom_View',
    controller: 'PContract_Bom_ViewController',
    bind: {
        store: '{PContractBom2Store_New}'
    },
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{name}'
    }],
    columns: [{
        text: 'STT',
        width: 45,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            itemId: 'btnDeleteMaterial_Bom2',
            isActionDisabled: 'checkActionColumnPermission',
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }]
    }, {
        text: 'Mã NPL',
        dataIndex: 'materialCode',
        width: 120
    }, {
        text: 'Nguyên phụ liệu',
        dataIndex: 'materialName',
        width: 150
    }, {
        text: 'Màu NPL',
        dataIndex: 'tenMauNPL',
        width: 120
    }, {
        text: 'Cỡ khổ',
        dataIndex: 'coKho',
        width: 80
    }, {
        text: 'Thành phần vải',
        dataIndex: 'thanhPhanVai',
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Màu SP',
        dataIndex: 'color_name',
        width: 150
    }, {
        text: 'ĐVT',
        dataIndex: 'unitid_link',
        width: 70,
        getEditor: function (record) {
            return Ext.create('Ext.grid.CellEditor', {
                field: {
                    xtype: 'combo',
                    bind: {
                        store: '{UnitStore}'
                    },
                    valueField: 'id',
                    displayField: 'code',
                    queryMode: 'local'
                }
            })
        },
        renderer: 'renderUnit'
    }, {
        text: 'Tiêu hao',
        dataIndex: 'lost_ratio',
        width: 70,
        xtype: 'numbercolumn',
        format: '0.000',
        editor: {
            xtype: 'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        renderer: function (value, metaData, record) {
            return value + " %";
        }
    }],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        border: true,
        height: 45,
        style: "background-color : white",
        items: [
            {
                xtype: 'button',
                itemId: 'btnAddMaterial_Bom',
                text: 'Thêm NPL',
                margin: 3,
                iconCls: 'x-fa fa-plus'
            },
            {
                xtype: 'combo',
                width: 400,
                margin: 3,
                bind: {
                    store: '{PContractProductStore}',
                    value: '{IdProduct}',
                    readOnly: '{isReadOnlycmbSanPham}'
                },
                fieldLabel: 'Sản phẩm',
                labelWidth: 80,
                itemId: 'cmbSanPham',
                queryMode: 'local',
                editable: false,
                valueField: 'productid_link',
                displayField: 'productBuyerCode'
            },
            {
                xtype: 'button',
                text: 'Chốt định mức',
                itemId: 'btnConfirmBOM1',
                // ui: 'header',
                tooltip: 'Chốt định mức hải quan',
                iconCls: 'x-fa fa-check greenIcon',
                // handler: 'onFactoriesTap',
            }
        ]
    }]
})