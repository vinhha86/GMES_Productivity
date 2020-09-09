Ext.define('GSmartApp.view.pcontract.PContract_POList', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_POList',
    // id:'PContract_POList',
    controller: 'PContract_POListController',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        //selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            } 
        }
    },
    bind:{
        store:'{PContractPOList}'
    },
    columns:[{
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    },
    {
        text:'PO Buyer',
        dataIndex:'po_buyer',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'POBuyerFilter',
            width: '98%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onPOBuyerFilterKeyup',
                buffer: 500
            }
        },

    },    
    {
        text:'Mã SP (Buyer)',
        dataIndex:'productbuyercode',
        width: 100,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text:'Mã SP (Vendor)',
        dataIndex:'productvendorcode',
        width: 70,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },    
    // {
    //     text:'PO Vendor',
    //     dataIndex:'po_vendor',
    //     flex: 1,
    //     renderer: function(value, metaData, record, rowIdx, colIdx, store) {
    //         metaData.tdAttr = 'data-qtip="' + value + '"';
    //         return value;
    //     }
    // },
    {
        text:'Ngày GH',
        dataIndex:'shipdate',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        width: 75
    },{
        text:'SL',
        align: 'end',
        dataIndex:'po_quantity',
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
    },{
        xtype: 'actioncolumn',
        width: 25,
        menuDisabled: true,
        sortable: false,
        items: [
            {
                iconCls: 'x-fa fas fa-list',
                tooltip: 'Sửa PO',
                handler: 'onEdit'
            },
            {
                iconCls: 'x-fa fas fa-trash redIcon',
                tooltip: 'Xóa PO',
                handler: 'onXoaPO'
            }
        ]
    }],    
    dockedItems:[{
        dock:'top',
        border: 'hbox',
        xtype: 'toolbar',
        padding: '0 0 10 5',
        height: 40,
        items:[{
            xtype:'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black",
            labelWidth : 0,
            bind:{
                value: 'Danh sách PO'
            }
        },{
            xtype:'combo',
            editable: false,
            width: 250,
            margin: '5 5 5 40',
            fieldLabel: 'Sản phẩm',
            itemId: 'productFilter',
            bind: {
                store: '{ProductFilterStore}',
                value: '{IdProduct_filterPO}'
            },
            valueField: 'productid_link',
            displayField: 'productBuyerCode',
            queryMode: 'local'
        },'->'
        ,
	    {
            xtype:'button',
            itemId: 'btnThemPO',
            ui: 'header',
			tooltip: 'Thêm PO',
            iconCls: 'x-fa fa-plus',
            handler: 'onThemPO'
        }]
    }]
});

