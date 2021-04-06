Ext.define('GSmartApp.view.stockout.Stockout_EPC_Window', {
    extend: 'Ext.window.Window',
    xtype: 'Stockout_EPC_Window',
    requires: [
        'Ext.grid.Panel'
    ],
    modal: true,
    controller: 'stockoutepc',
    viewModel: 'stockoutepc',
    title: 'Danh sách chíp',
    width: 500,
    height: 500,
    margin:10,
    layout: 'fit',
    items:[
        {
            xtype: 'grid',
            bind: '{stockout_d.stockout_packinglist}',
            columnLines: true,
            viewConfig: {
                enableTextSelection: true,
                stripeRows: false,
                getRowClass: function(record, index) {
                    var c = record.get('status');
                    if (c == -1)
                        return "epc-error";
                    else 
                        return "epc-ok";
                }                
            },
            
            columns: [
                { header: 'Mã chíp', dataIndex: 'epc', width: 210},
                // { header: 'Trạng thái', dataIndex: 'status', width: 100},
                { header: 'Ghi chú', dataIndex: 'extrainfo', flex: 1}
            ]
        }
    ]
});    