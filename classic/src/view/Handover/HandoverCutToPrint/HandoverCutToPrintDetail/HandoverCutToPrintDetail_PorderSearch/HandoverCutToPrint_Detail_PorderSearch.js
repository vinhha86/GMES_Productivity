Ext.define('GSmartApp.view.handover.HandoverCutToPrint_Detail_PorderSearch', {
    extend: 'Ext.grid.Panel',
    xtype: 'HandoverCutToPrint_Detail_PorderSearch',
    id: 'HandoverCutToPrint_Detail_PorderSearch',
    reference: 'HandoverCutToPrint_Detail_PorderSearch',
    controller: 'HandoverCutToPrint_Detail_PorderSearchController',
    viewModel:{
        // type:'HandoverCutToPrint_Detail_PorderSearchViewModel'
    },
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
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
            xtype:'button',
            text: 'Thoát',
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
        },{
            flex:1,
            border: false
        },]
    }]
});

