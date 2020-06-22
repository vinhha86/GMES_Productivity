Ext.define('GSmartApp.view.pcontract.PContractProduct_Bom2_TabColorView', {
    extend: 'Ext.tab.Panel',
    xtype: 'PContractProduct_Bom2_TabColorView',
    id: 'PContractProduct_Bom2_TabColorView',
    controller: 'PContractProduct_Bom2_TabColorViewController',
    tabPosition: 'right',
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        border: true,
        height: 45,
        style: "background-color : white",
        items: [{
            xtype: 'combo',
            width:500,
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
            displayField: 'productName'
        }]
    }]
})