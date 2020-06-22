Ext.define('GSmartApp.view.pcontract.PContractSKUView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContractSKUView',
    id:'PContractSKUView',
    controller: 'PContractSKUViewCotroller',
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
        text: 'STT',
        width: 45,
        xtype: 'rownumberer',
        align: 'center'
    },{
        text:'SKU',
        dataIndex:'skuCode',
        flex: 1,
        summaryType: 'count',
        summaryRenderer: function (value, summaryData, dataIndex) {
            return '<div style="color:red; font-weight: bold; align: right">'+ 'Tổng';
        }
    },
    // {
    //     text:'Mã vạch',
    //     dataIndex:'skuBarCode',
    //     flex: 1
    // },
    {
        text:'Màu',
        dataIndex:'mauSanPham',
        width: 100
    },{
        text:'Cỡ',
        dataIndex:'coSanPham',
        width: 70
    },{
        text:'SL SX',
        dataIndex:'pquantity_porder',
        width: 70,
        align: 'right',
        editor:{
            xtype:'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        summaryType: 'sum',
        summaryRenderer: function(value, summaryData, dataIndex) {
            return '<div style="color:red; font-weight: bold; align: right">'+ value ;
        }
    },{
        text:'SL mẫu',
        dataIndex:'pquantity_sample',
        width: 70,
        align: 'right',
        editor:{
            xtype:'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        summaryType: 'sum',
        summaryRenderer: function(value, summaryData, dataIndex) {
            return '<div style="color:red; font-weight: bold; align: right">'+ value ;
        }
    },{
        text:'SL Tổng',
        dataIndex:'pquantity_total',
        width: 70,
        align: 'right',
        summaryType: 'sum',
        summaryRenderer: function(value, summaryData, dataIndex) {
            return '<div style="color:red; font-weight: bold; align: right">'+ value ;
        }
    },{
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        sortable: false,
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: 'Xóa',
            handler: 'onXoa'
        }]
    }]
});

