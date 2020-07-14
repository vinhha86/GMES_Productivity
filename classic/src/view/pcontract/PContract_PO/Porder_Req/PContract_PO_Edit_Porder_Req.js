Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_Porder_Req', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_PO_Edit_Porder_Req',
    id:'PContract_PO_Edit_Porder_Req',
    controller: 'PContract_PO_Edit_PordersController',
    IdPcontract: 0,
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,
        plugins: {
            ptype: 'gridviewdragdrop',
            enableDrag: false,
            //dragText: '{0} Mã sản xuất được tính lương',
            dragGroup: 'firstGridDDGroup',
            dropGroup: 'porderGanttDropGroup'
        },
        listeners: {
            // drop: 'onDropOrg',
            beforedrop: 'onBeforeDropOrg'
        }          
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            // listeners: {
            //     edit: 'onEdit'
            // } 
        }
    },
    features: [{
        ftype:'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    selModel: {
        //selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    bind:{
        store:'{porderReqStore}'
    },
    columns:[{
        header:'Phân xưởng',
        dataIndex:'granttoorgcode',
        flex: 1
    },
    // {
    //     header:'Dải cỡ',
    //     dataIndex:'sizesetname',
    //     flex: 1
    // },
    {
        header:'SL',
        align: 'end',
        dataIndex:'totalorder',
        width: 90,
        summaryType: 'sum', 
        summaryRenderer: 'renderSum',
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
    }]
});

