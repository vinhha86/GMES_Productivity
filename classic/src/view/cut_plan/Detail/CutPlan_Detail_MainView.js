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
        margin: '0 0 0 1',
        border: true
    },{
        region: 'west',
        xtype: 'CutPlan_NPL_View',
        // width: '30%',
        margin: '0 1 0 0',
        border: true,
        collapseMode: 'mini',
        hideCollapseTool: true,
        bind: {
            width: '{width_npl}'
        }
        // collapsible: true
    }]
})