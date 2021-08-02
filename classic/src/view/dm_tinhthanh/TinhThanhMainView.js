Ext.define('GSmartApp.view.dm_tinhthanh.TinhThanhMainView',{
    extend:'Ext.form.Panel',
    xtype:'TinhThanhMainView',

    layout:'border',
    controller:'TinhThanhMainViewController',
    viewModel:{
        type:'TinhThanhMainViewModel',
    },

    items:[
        {
            region:'west',
            xtype:'TinhView',
            border: true,
            align:'center',
            flex:1,
            margin:5
        },
        {
            region:'center',
            xtype:'QuanHuyenView',
            border: true,
            flex:1,
            margin:5
        },
        {
            region:'east',
            xtype:'XaPhuongView',
            border: true,
            flex:1,
            margin:5
        }
    ]
})