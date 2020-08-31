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
            listeners: {
                edit: 'onEdit'
            } 
        }
    },
    features: [{
        ftype:'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'SINGLE',
    //     checkOnly: true
    // },
    bind:{
        store:'{porderReqStore}'
    },
    columns:[{
        xtype: 'checkcolumn',
        dataIndex : 'is_calculate',
        width: 25
    },{
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
        width: 75,
        summaryType: 'sum', 
        summaryRenderer: 'renderSum',
        renderer: 'renderValue',
        getEditor: function (record) {
            if (!record.get('is_calculate')) {
                return Ext.create('Ext.grid.CellEditor', {
                    field: {
                        xtype: 'numberfield', hideTrigger:true, allowBlank: true, maxValue: 9999999, selectOnFocus: false
                    }
                })
            }
        }
    },{
        xtype: 'actioncolumn',
        id: 'PContract_PO_Edit_Porder_Req_deletebutton',
        width: 20,
        menuDisabled: true,
        sortable: false,
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: 'Xóa',
            handler: 'onXoa'
        }]
    }],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        padding: '0 0 10 5',
        height: 30,
        items: [{
            xtype: 'checkboxfield',
            labelStyle: "font-size:11px",
            fieldStyle: 'font-size:11px;text-align:right',
            fieldLabel: 'Tự động chia số lượng:',
            hideTrigger:true,
            labelAlign: 'left',
            labelWidth: 120,
            flex: 1,
            bind: {
                value: '{po.isauto_calculate}'
            }
        }]
    }]
});

