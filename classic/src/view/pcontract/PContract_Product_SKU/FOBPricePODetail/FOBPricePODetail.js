Ext.define('GSmartApp.view.pcontract.FOBPricePODetail', {
    extend: 'Ext.grid.Panel',
    xtype: 'FOBPricePODetail',
    id: 'FOBPricePODetail',
    viewModel: {
        type: 'FOBPricePODetailViewModel'
    },
    controller: 'FOBPricePODetailController',
    reference: 'FOBPricePODetail',
    // plugins: {
    //     cellediting: {
    //         clicksToEdit: 2
    //     }
    // },
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{FOBPricePODetailStore}'
    },
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '<b>{name}</b>',
        hideGroupedHeader: false,
        enableGroupingMenu: false
    }],
    columns: [
    // {
    //     text: 'STT',
    //     width: 40,
    //     xtype: 'rownumberer',
    //     align: 'center'
    // }, 
    {
        text: 'Dải cỡ',
        dataIndex: 'sizesetname',
        width: 100,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Tên',
        dataIndex: 'fobprice_name',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'ĐM',
        align: 'end',
        dataIndex: 'quota',
        width: 70,
        xtype: 'numbercolumn',
        format: '0.000',
        renderer: function (value, metaData, record) {
            if(value ==0) return "";
            return Ext.util.Format.number(value, '0.000')
        }
    },
    {
        text: 'ĐVT',
        dataIndex: 'unitcode',
        width: 65,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Đơn giá',
        dataIndex: 'unitprice',
        width: 70,
        xtype: 'numbercolumn',
        format: '0.000',
        renderer: function (value, metaData, record) {
            if(value ==0) return "";
            return Ext.util.Format.number(value, '0.000')
        }
    },
    {
        text: 'Giá chào',
        dataIndex: 'price',
        width: 80,
        xtype: 'numbercolumn',
        format: '0.000',
        renderer: function (value, metaData, record) {
            if(value ==0) return "";
            return Ext.util.Format.number(value, '0.000')
        }
    },
    {
        text: 'Loại tiền',
        dataIndex: 'currencyName',
        width: 100,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    ],

    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close',
            formBind: false
        },{
            flex:1,
            border: false
        }]
    }]
});

