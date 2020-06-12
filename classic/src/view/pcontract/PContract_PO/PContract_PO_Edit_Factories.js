Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_Factories', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_PO_Edit_Factories',
    id:'PContract_PO_Edit_Factories',
    // controller: 'PContractSKUViewCotroller',
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
            dropGroup: 'secondGridDDGroup'
        },
        listeners: {
            drop: 'onDropOrg',
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
        store:'{OrgGrantedStore}'
    },
    columns:[{
        text:'Phân xưởng',
        dataIndex:'granttoorg_name',
        flex: 1
    },
    // {
    //     text:'Tổ SX',
    //     dataIndex:'granttoline_name',
    //     width: 80
    // },
    {
        text:'SL',
        dataIndex:'grantamount',
        width: 50,
        summaryType: 'sum', 
        // summaryRenderer: 'renderSum'
        editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: true, maxValue: 100000, selectOnFocus: false}
    }]
});

