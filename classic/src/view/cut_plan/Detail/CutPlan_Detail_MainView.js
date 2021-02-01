Ext.define('GSmartApp.view.cut_plan.Detail.CutPlan_Detail_MainView', {
    extend: 'Ext.form.Panel',
    xtype: 'CutPlan_Detail_MainView',
    id: 'CutPlan_Detail_MainView',
    itemId: 'CutPlan_Detail_MainView',
    controller: 'CutPlan_Detail_MainViewController',
    layout: 'border',
    items:[{
        region: 'center',
        // title: 'center',
        xtype: 'CutPlan_Tab_View',
        margin: 1,
        border: true
    },{
        region: 'west',
        xtype: 'CutPlan_NPL_View',
        width: '30%',
        margin: 1,
        border: true,
        collapseMode: 'mini',
        hideCollapseTool: true
        // collapsible: true
    }],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        items:[{
            xtype: 'button',
            text: 'DS NPL',
            iconCls: 'x-fa fa-forward',
            itemId: 'btnShowNPL',
            margin: 5,
            bind: {
                hidden: '{!isHiddenNPL}'
            }
        },{
            flex: 1
        },{
            xtype: 'textfield',
            fieldLabel: 'Mã NPL',
            readOnly: true,
            labelWidth: 60,
            bind: {
                value: '{npl.product_code}'
            },
            margin: 5
        },{
            xtype: 'textfield',
            fieldLabel: 'Tên NPL',
            readOnly: true,
            labelWidth: 60,
            bind: {
                value: '{npl.product_name}'
            },
            margin: 5
        },{
            xtype: 'textfield',
            fieldLabel: 'Màu NPL',
            labelWidth: 70,
            width: 300,
            readOnly: true,
            bind: {
                value: '{npl.mauSanPham}'
            },
            margin: 5
        },{
            xtype: 'textfield',
            fieldLabel: 'Cỡ khổ',            
            labelWidth: 60,
            readOnly: true,
            bind: {
                value: '{npl.coSanPham}'
            },
            margin: 5
        }]
    }]
})