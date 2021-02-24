Ext.define('GSmartApp.view.stockout.Stockin_M_Edit', {
    extend: 'Ext.container.Container',
    xtype: 'Stockin_M_Edit',
    controller: 'Stockin_M_Edit_Controller',
    viewModel: 'Stockin_M_ViewModel',
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'Stockin_M_Edit_M',
            id: 'StockIn_M_Edit_M',
            margin: '2 0 0 0',
            height: 140
        },
        {
            xtype: 'Stockin_M_Edit_D',
            margin: '0 5 5 0',
            flex: 1
        },
        {
            xtype: 'container',
            height: 35,
            layout:'hbox',
            items:[
            {
                xtype:'button',
                text:  "Quay lại",
                iconCls: 'x-fa fa-backward',
                itemId: 'btnBack'
            },
            {
                margin: '0 5 5 0',
                xtype:'button',
                text:  "Duyệt",
                iconCls: 'x-fa fa-check',
                itemId: 'btnConfirm'
            },
            {
                flex:1
            },
            {
                margin: '0 5 5 0',
                xtype:'button',
                text:  'In phiếu',
                iconCls: 'x-fa fa-print',
                itemId: 'btnStockin_Print'
            },
            {
                margin: '0 5 5 0',
                xtype:'button',
                text:  'Đồng bộ kế toán',
                iconCls: 'x-fa fa-refresh',
                itemId: 'btnStockin_Sync'
            },
            {
                margin: '0 5 5 0',
                xtype:'button',
                text:  'Lưu',
                iconCls: 'x-fa fa-floppy-o',
                itemId: 'btnLuu',
                bind: {
                    disabled: '{isStart}'
                }
            }
        ]
        }        
    ] 
});
