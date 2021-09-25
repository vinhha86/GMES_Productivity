Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.stockin_pklist.Stockin_packinglist', {
    extend: 'Ext.container.Container',
    xtype: 'Stockin_packinglist',
    id: 'Stockin_packinglist',
    controller: 'Stockin_packinglist_Controller',
    // viewModel: 'Invoice_packinglist_ViewModel',
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            margin: 1,
            flex: 1,
            layout: 'border',
            items: [
                // {
                //     region: 'west',
                //     xtype: 'Stockin_packinglist_lotnumber',
                //     width: '15%',
                //     margin: 1
                // },
                {
                    region: 'center',
                    xtype: 'Stockin_packinglist_detail',
                    margin: 1
                }
            ]
        },
        // {
        //     xtype: 'container',
        //     height: 35,
        //     layout:'hbox',
        //     items:[
        //         {
        //             flex:1
        //         },
        //         {
        //             // ui: 'default-toolbar',
        //             xtype: 'button',
        //             cls: 'dock-tab-btn',
        //             text: 'Export to ...',
        //             menu: {
        //                 defaults: {
        //                     handler: 'exportTo'
        //                 },
        //                 items: [{
        //                     text: 'Excel xlsx',
        //                     cfg: {
        //                         type: 'excel07',
        //                         ext: 'xlsx',
        //                         includeGroups: true,
        //                         includeSummary: true
        //                     }
        //                 }, {
        //                     text: 'Excel xml',
        //                     cfg: {
        //                         type: 'excel03',
        //                         ext: 'xml',
        //                         includeGroups: true,
        //                         includeSummary: true
        //                     }
        //                 }, {
        //                     text: 'CSV',
        //                     cfg: {
        //                         type: 'csv'
        //                     }
        //                 }, {
        //                     text: 'TSV',
        //                     cfg: {
        //                         type: 'tsv',
        //                         ext: 'csv'
        //                     }
        //                 }, {
        //                     text: 'HTML',
        //                     cfg: {
        //                         type: 'html',
        //                         includeGroups: true,
        //                         includeSummary: true
        //                     }
        //                 }]
        //             }
        //         },
        //         {
        //             margin: 1,
        //             xtype:'button',
        //             text:  'Thoát',
        //             iconCls: 'x-fa fa-window-close',
        //             itemId: 'btnThoat'
        //         }
        //     ]
        // }        
    ],
});
