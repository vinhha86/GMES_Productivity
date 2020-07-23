Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_GrantView', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrder_List_GrantView',
    id: 'POrder_List_GrantView',
    IdPOrder: 0,
    // viewModel: {
    //     type: 'SizesetViewModel'
    // },
    controller: 'POrder_List_GrantViewController',
    reference: 'POrder_List_GrantView',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    features: [{
        ftype: 'summary'
    }],
    bind: {
        store: '{POrder_ListGrantStore}'
    },
    title: 'Danh sách tổ chuyền',
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Tổ',
        dataIndex: 'granttoorgname',
        flex: 1,
    }, {
        text: 'Ngày vào chuyền',
        dataIndex: 'start_date_plan',
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        flex: 1,
    }, {
        text: 'Ngày ra chuyền',
        dataIndex: 'finish_date_plan',
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        summaryType: 'count',
        summaryRenderer: function(){
            return '<b>Tổng SL : </b>';
        },
        flex: 1
    }, {
        text: 'Số lượng',
        dataIndex: 'grantamount',
        summaryType: 'sum',
        summaryRenderer: function(value){
            return '<b>'+value+'</b>';
        },
        fieldStyle:{
            'text-align':'right',
        },
        flex: 1
    }]
});

