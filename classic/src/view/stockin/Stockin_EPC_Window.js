Ext.define('GSmartApp.view.stockout.Stockin_EPC_Window', {
    extend: 'Ext.window.Window',
    xtype: 'stockin_epc_window',
    cls: 'Stockin_EPC_Window',
    requires: [
        'Ext.grid.Panel'
    ],
    modal: true,
    controller: 'stockinepc',
    viewModel: 'stockinepc',
    title: 'Danh sách chíp',
    width: 500,
    height: 500,
    margin:10,
    scrollable: true,
    items:[
        {
            xtype: 'grid',
            bind: '{stockin_d.stockin_packinglist}',
            columnLines: true,
            viewConfig: {
                enableTextSelection: true,
                stripeRows: false,
                // getRowClass: function(record, index) {
                //     var c = record.get('status');
                //     if (c == 0)
                //         return "epc-ok";
                //     else 
                //         return "epc-error";
                // }                
            },
            columns: [
                {
                    text: 'STT',
                    width: 50,
                    xtype: 'rownumberer',
                    align: 'center'
                },
                { header: 'Mã chíp', dataIndex: 'epc', width: 210,
                    renderer: function (value, metaData, record){
                        var c = record.get('status');
                        if (c == -2)
                            metaData.tdCls =  "epc-instock";
                        else if (c == -1)
                            metaData.tdCls =  "epc-error";
                        else 
                            metaData.tdCls =  "epc-ok";
                        return value;
                    }
                },
                // { header: 'Trạng thái', dataIndex: 'status', width: 100},
                { header: 'Ghi chú', dataIndex: 'extrainfo', flex: 1}
            ]
        }
    ]
});    