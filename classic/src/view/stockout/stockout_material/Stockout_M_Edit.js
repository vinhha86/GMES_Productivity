Ext.define('GSmartApp.view.stockout.Stockout_M_Edit', {
    extend: 'Ext.container.Container',
    xtype: 'Stockout_M_Edit',
    controller: 'Stockout_M_EditController',
    viewModel: 'Stockout_M_EditModel',
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'Stockout_M_Edit_M',
            id: 'Stockout_M_Edit_M',
            margin: '5 0 0 0',
            height: 100
        },
        {
            xtype: 'Stockout_M_Edit_D',
            reference: 'grd_stockoutd',
            margin: '0 5 5 0',
            flex: 1
        },
        {
            xtype: 'container',
            height: 35,
            layout:'hbox',
            items:[
            {
                width:100,
                xtype:'button',
                text:  "Quay lại",
                iconCls: 'x-fa fa-backward',
                handler: 'onUrlBack'
            },
            {
                flex:1
            },
            {
                width:80,
                margin: '0 5 5 0',
                xtype:'button',
                text:  'Lưu',
                iconCls: 'x-fa fa-floppy-o',
                handler: 'onSave',
                bind:{
                    disabled: '{isStart}'
                }
            }
        ]
        }        
    ] 
});
