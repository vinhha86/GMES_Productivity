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
        rowLines: true
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
    selModel: {
        //selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    bind:{
        store:'{PContractSKUStore}'
    },
    columns:[{
        text:'Phân xưởng',
        dataIndex:'name',
        flex: 1
    },{
        text:'Năng suất đáp ứng',
        dataIndex:'productivity',
        width: 80
    },{
        text:'CMPT tháng',
        dataIndex:'cmpt',
        width: 80,
    }]
});

