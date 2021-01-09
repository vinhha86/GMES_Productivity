Ext.define('GSmartApp.view.Schuedule.Plan.TabPorder_notGrant_and_PorderReq', {
    extend: 'Ext.tab.Panel',
    xtype: 'TabPorder_notGrant_and_PorderReq',
    id: 'TabPorder_notGrant_and_PorderReq',
    controller: 'TabPorder_notGrant_and_PorderReq_Controller',
    items: [{
        title: 'Lệnh chưa phân chuyền',
        xtype: 'POrderUnGranted' //GSmartApp.view.porders.POrderUnGranted
    },{
        title: 'Đã xếp kế hoạch',
        xtype: 'Porder_Req_Granted' //GSmartApp.view.porders.Porder_Req_Granted
    },{
        title: 'Lệnh thay đổi',
        xtype: 'PorderChange_Productivity' //GSmartApp.view.porders.PorderChange_Productivity
    },{
        title: 'Yêu cầu xếp kế hoạch',
        xtype: 'Schedule_POrderReq_View' //GSmartApp.view.porders.Porder_Req
    }]
})