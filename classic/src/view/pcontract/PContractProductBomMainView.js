Ext.define('GSmartApp.view.pcontract.PContractProductBomMainView', {
    extend: 'Ext.form.Panel',
    xtype: 'PContractProductBomMainView',
    id: 'PContractProductBomMainView',
    IdProduct: 0,
    pcontractid_link: 0,
    controller: 'PContractProductBomMainViewController',
    height: 700,
    items: [{
        xtype: 'PContractProductBomView'
    }],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        border: true,
        height: 45,
        style: "background-color : white",
        items: [{
            xtype: 'combo',
            bind: {
                store: '{PContractProductStore}',
                value: '{IdProduct}',
                readOnly: '{isReadOnlycmbSanPham}'
            },
            fieldLabel: 'Sản phẩm',
            itemId: 'cmbSanPham',
            queryMode: 'local',
            editable: false,
            valueField: 'productid_link',
            displayField: 'productName'
        },
            '->',
        {
            xtype: 'button',
            text: 'Thêm NPL',
            margin: 3,
            itemId: 'btnNPL',
            iconCls: 'x-fa fa-plus'
        }]
    }]
})