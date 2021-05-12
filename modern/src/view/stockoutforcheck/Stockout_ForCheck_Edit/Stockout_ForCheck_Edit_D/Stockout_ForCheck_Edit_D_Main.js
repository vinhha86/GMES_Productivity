Ext.define('GSmartApp.view.stockoutforcheck.Stockout_ForCheck_Edit_D_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockout_ForCheck_Edit_D_Main',
    id: 'Stockout_ForCheck_Edit_D_Main',
    reference: 'Stockout_ForCheck_Edit_D_Main',
    controller: 'Stockout_ForCheck_Edit_D_MainController',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    requires: [
        'Ext.Toast',
        'Ext.Responsive',
        'Ext.dataview.listswiper.ListSwiper'
    ],

    items:[
        {
            layout: 'vbox',
            flex: 1,
            items:[
                // {
                //     xtype: 'textfield',
                //     itemId: 'maNPLFilter',
                //     // label: 'Mã hàng:',
                //     // labelWidth: 85,
                //     margin: '5 5 1 5',
                //     // padding: 6,
                //     // flex: 1,
                //     // width: '100%',
                //     // minWidth: 80,
                //     // maxWidth: 200,
                //     textAlign: 'left',
                //     placeholder: 'Tìm kiếm nhanh ... (theo mã)',
                //     // editable: false,
                //     // readOnly: true,
                //     clearable: false,
                //     cls: 'searchField',
                //     // bind: {
                //     //     value: '{maNPLFilter}'
                //     // },
                //     listeners: {
                //         keyup: 'onmaNPLFilterKeyup',
                //         buffer: 500
                //     }
                // },
                {
                    margin: 1,
                    flex: 1,
                    xtype: 'Stockout_ForCheck_Edit_D',
                    // id: 'handover_cut_toline_detail',
                },
            ]
        },
    ]
});