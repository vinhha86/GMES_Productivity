Ext.define('GSmartApp.view.handover.HandoverDetailPorderSearch', {
    extend: 'Ext.grid.Panel',
    xtype: 'HandoverDetailPorderSearch',
    id: 'HandoverDetailPorderSearch',
    reference: 'HandoverDetailPorderSearch',
    controller: 'HandoverDetailPorderSearchController',
    viewModel:{
        // type:'HandoverDetailPorderSearchViewModel'
    },
    viewConfig: {
        stripeRows: false,
        enableTextSelection: false,
        columnLines: true,
        rowLines: true,
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    bind:{
        store:'{POrder_ListStore}'
    },
    columns:[{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    },
        { header: 'Mã lệnh', dataIndex: 'ordercode', flex: 1},
    ],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            flex:1,
            border: false
        },{
            xtype:'button',
            text: 'Quay lại',
            margin: 3,
            itemId:'btnQuayLai',
            iconCls: 'x-fa fa-window-close'
        },{
            xtype:'button',
            text: 'Chọn',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        }]
    }]
});

