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
            return '<div style="color:black; font-weight: bold; align: right">'+ 'Tổng';
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
        width: 50
    },{
        text:'SL đơn',
        dataIndex:'pquantity_porder',
        width: 80,
        align: 'right',
        editor:{
            xtype:'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        summaryType: 'sum',
        summaryRenderer: function(value, summaryData, dataIndex) {
            return '<div style="color:black; font-weight: bold; align: right">'+ value ;
        }
    },{
        text:'SL SX',
        dataIndex:'pquantity_production',
        width: 80,
        align: 'right',
        editor:{
            xtype:'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        summaryType: 'sum',
        summaryRenderer: function(value, summaryData, dataIndex) {
            return '<div style="color:black; font-weight: bold; align: right">'+ value ;
        }
    },{
        text:'SL mẫu',
        dataIndex:'pquantity_sample',
        width: 80,
        align: 'right',
        editor:{
            xtype:'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        summaryType: 'sum',
        summaryRenderer: function(value, summaryData, dataIndex) {
            return '<div style="color:black; font-weight: bold; align: right">'+ value ;
        }
    },{
        text:'SL Tổng',
        dataIndex:'pquantity_total',
        width: 100,
        align: 'right',
        summaryType: 'sum',
        summaryRenderer: function(value, summaryData, dataIndex) {
            return '<div style="color:black; font-weight: bold; align: right">'+ value ;
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
    }],
    dockedItems:[{
        dock:'top',
        xtype:'toolbar',
        padding: '0 0 10 5',
        height: 40,
        items:[{
            xtype:'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black",
            labelWidth : 0,
            bind:{
                value: 'Chi tiết màu, cỡ'
            }
        },
		'->'
		,
	    {
            xtype:'button',
            itemId: 'btnThemSKU',
            ui: 'header',
			tooltip: 'Thêm SKU',
            iconCls: 'x-fa fa-plus',
            handler: 'onThemSKU'
        },
        {
            xtype:'button',
            text: 'Chốt màu,cỡ',
            itemId:'btnConfirmSKU',
            // ui: 'header',
			tooltip: 'Chốt chi tiết màu cỡ',
            iconCls: 'x-fa fa-check greenIcon',
            // handler: 'onFactoriesTap',
        }
        ]
    }]    
});

