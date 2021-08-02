Ext.define('GSmartApp.view.dm_tinhthanh.XaPhuongView',{
    extend:'Ext.grid.Panel',
    xtype:'XaPhuongView',

    bind:{
        title:'{showTitle_Xa}'
    },
    columns:[{
        text:'STT',
        xtype:'rownumberer',
        width:80,
        align:'center'
    },
    {
        xtype: 'actioncolumn',
        width:38,
        iconCls:'x-fa fa-trash'
    },
   {
       text:'Tên ',
       dataIndex:'name',
       flex:2,
      
    },{
        text:'Mã ',
        dataIndex:'code',
        flex:1,
       
    }
],

    dockedItems:[{
        dock:'bottom',
        items:[
            {
                xtype:'button',
                text:'Thêm',
                width:80
            }
        ]
    }  
    ]
})