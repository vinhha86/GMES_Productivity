Ext.define('GSmartApp.view.pcontract.PContract_POrder_Porders', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_POrder_Porders',
    id:'PContract_POrder_Porders',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,
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
        store:'{porderStore}'
    },
    columns:[
        {
            header:'Style',
            dataIndex:'stylebuyer',
            flex: 1
        },        
        {
            header:'Mã lệnh',
            dataIndex:'ordercode',
            flex: 1
        },        
        {
            header:'Ngày tạo lệnh',
            dataIndex:'orderdate',
            renderer: Ext.util.Format.dateRenderer('d/m/y'),
            width: 70
        },
        {
            header:'Dự kiến VC',
            dataIndex:'productiondate_plan',
            renderer: Ext.util.Format.dateRenderer('d/m/y'),
            width: 70
        },
        {
            header:'SL',
            align: 'end',
            dataIndex:'totalorder',
            width: 70,
            summaryType: 'sum', 
            // summaryRenderer: 'renderSum'
            editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: true, maxValue: 9999999, selectOnFocus: false}
        },{
            xtype: 'actioncolumn',
            width: 25,
            menuDisabled: true,
            sortable: false,
            items: [
                {
                    iconCls: 'x-fa fas fa-bars violetIcon',
                    handler: 'onMenu_POrder'
                },            
            ]
        }
    ]
});

