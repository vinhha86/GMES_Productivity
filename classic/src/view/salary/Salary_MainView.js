Ext.define('GSmartApp.view.salary.Salary_MainView', {
    extend: 'Ext.form.Panel',
    xtype: 'Salary_MainView',
    id:'Salary_MainView',
    viewModel:{
        type:'Salary_MainView_Model'
    },
    layout: 'border',
    items: [{
        region: 'west',
        width: '20%',
        title: 'Danh sách đơn vị',
        xtype: 'Salary_ListOrg_View',
        border: true,
        margin: 1
    
    }, {
        region: 'center',
        // title: 'Danh sách nhân viên',
        xtype: 'Salary_Def_Main',
        border: true,
        margin: 1
    }]
})