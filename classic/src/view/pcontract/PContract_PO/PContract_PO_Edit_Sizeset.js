Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_Sizeset', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_PO_Edit_Sizeset',
    id:'PContract_PO_Edit_Sizeset',
    reference: 'PContract_PO_Edit_Sizeset',
    itemId:'PContract_PO_Edit_Sizeset',
    controller: 'PContract_PO_Edit_SizesetController',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true    
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            // listeners: {
            //      edit: 'onEdit'
                    // beforeedit: function(e, editor){
                    //     if (e.rowIdx == 0)
                    //         return false;
                    // }
            // } 
        }
    },    
    features: [{
        ftype:'summary',
        dock: 'bottom'
    }],    
    selModel: {
        //selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    bind:{
        store:'{PriceStore}'
    },
    columns:[{
        header:'Dải cỡ',
        dataIndex:'sizesetname',
        flex: 1
    },{
        header:'SL',
        width: 65,
        dataIndex:'quantity',
        summaryType: 'sum', 
        // summaryRenderer: 'renderSum'
        editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: true, maxValue: 9999999, selectOnFocus: false}

    },{
        xtype: 'actioncolumn',
        width: 20,
        menuDisabled: true,
        sortable: false,
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: 'Xóa',
            handler: 'onXoa'
        }]
    }],
    dockedItems:[{
        dock:'top',
        xtype:'toolbar',
        padding: '0 0 10 5',
        height: 35,
        items:[{
            xtype:'displayfield',
            fieldStyle: "font-weight: bold; font-size: 12px; color: black;",
            labelWidth : 0,
            value: 'Dải cỡ'
        },
		'->'
		,
		{
            xtype:'button',
            itemId:'btnSizesetSelect',
            ui: 'header',
            margin: '10 5 0 0',
			tooltip: 'Thêm sản phẩm',
            iconCls: 'x-fa fa-plus'
        }]
    }]
});

