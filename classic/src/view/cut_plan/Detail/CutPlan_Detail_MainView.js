Ext.define('GSmartApp.view.cut_plan.Detail.CutPlan_Detail_MainView', {
    extend: 'Ext.tab.Panel',
    xtype: 'CutPlan_Detail_MainView',
    id: 'CutPlan_Detail_MainView',
    itemId: 'CutPlan_Detail_MainView',
    controller: 'CutPlan_Detail_MainViewController',
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        border: true,
        height: 45,
        style: "background-color : white",
        items: [
            {
                xtype: 'button',
                itemId: 'btnAddCutPlan',
                text: 'Thêm kế hoạch',
                margin: 3,
                iconCls: 'x-fa fa-plus'
            },
            {
                xtype: 'combo',
                width:400,
                margin: 3,
                bind: {
                    store: '{ProductStore}',
                    value: '{materialid_link}',
                },
                fieldLabel: 'Nguyên liệu',
                labelWidth: 80,
                itemId: 'cmbMaterial',
                queryMode: 'local',
                valueField: 'id',
                displayField: 'product_code'
            }            
        ]
    }]
})