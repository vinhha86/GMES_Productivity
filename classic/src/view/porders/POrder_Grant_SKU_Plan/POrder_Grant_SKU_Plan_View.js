Ext.define('GSmartApp.view.porders.POrder_Grant_SKU_Plan.POrder_Grant_SKU_Plan_View', {
    extend: 'Ext.pivot.Grid',
    xtype: 'POrder_Grant_SKU_Plan_View',
    itemId:'POrder_Grant_SKU_Plan_View',
    controller: 'POrder_Grant_SKU_Plan_Controller',
    viewModel: {
        type: 'POrder_Grant_SKU_Plan_ViewModel'
    },
    requires: [
        'Ext.pivot.plugin.Exporter',
        'Ext.pivot.plugin.Configurator',
        'Ext.pivot.plugin.CellEditing'
    ],
    // title: 'Bảng Tổng hợp CMP',
    // width: 750,
    // height: 350,
    // collapsible: true,
    multiSelect: true,
    columnLines: true,
    viewConfig: {
        scrollable: true,
        stripeRows: false
    },

    selModel: {
        type: 'rowmodel'
        // type: 'spreadsheet'
    },
    bind:{
        store:'{POrderGrant_SKU_PlanStore}'
    },
    plugins: {
        // pivotexporter: true
        pivotcellediting: {
            clicksToEdit: 2,
            // define here the type of editing: 'overwrite', 'increment',
            // 'percentage', 'uniform'
            defaultUpdater: 'overwrite',
            listeners: {
                validateedit: 'onSalTypeLevel_Edit'
            }       
        }        
    },       
    // Set this to false if multiple dimensions are configured on leftAxis and
    // you want to automatically expand the row groups when calculations are ready.
    enableLocking: true,
    startRowGroupsCollapsed: false,
    startColGroupsCollapsed: false,
    matrix: {
        type: 'local',
        // store: {
        //     type: 'CMPStore'
        // },

        // Set layout type to "outline". If this config is missing then the default
        // layout is "outline"
        viewLayoutType: 'compact',
        textRowLabels: 'Ngạch lương',
        compactViewColumnWidth: 180,
        rowGrandTotalsPosition: 'none',
        colGrandTotalsPosition: 'none',
        textGrandTotalTpl: 'Tổng:',
        textTotalTpl: 'Tổng ({name})',
        // Configure the aggregate dimensions. Multiple dimensions are supported.
        aggregate: [
            {
                dataIndex: 'salratio',
                header: 'HS',
                width: 50,
                editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, maxValue: 100, selectOnFocus: false},
                // renderer: function(value){
                //     return Ext.util.Format.number(value, '0,000');
                // }
            },     
            {
                dataIndex: 'salamount',
                header: 'Lương',
                // aggregator: 'sum',
                width: 80,
                editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, maxValue: 1000000000, selectOnFocus: false},
                renderer: function(value){
                    return Ext.util.Format.number(value, '0,000');
                }
            }
        ],

        // Configure the left axis dimensions that will be used to generate
        // the grid rows
        leftAxis: [
            {
                sortIndex: 'saltypeid_link',
                dataIndex: 'saltype_name',
                header: 'Ngạch lương',
                sortable: false,
                width: 180
            }
        ],

        /**
         * Configure the top axis dimensions that will be used to generate
         * the columns.
         *
         * When columns are generated the aggregate dimensions are also used.
         * If multiple aggregation dimensions are defined then each top axis
         * result will have in the end a column header with children columns
         * for each aggregate dimension defined.
         */
        topAxis: [
            {
                dataIndex: 'sallevel_name',
                header: 'Bậc lương',
                // labelRenderer: 'monthLabelRenderer'
            }
        ]
    },
    dockedItems: [
        // {
        //     dock: 'top',
        //     xtype: 'toolbar',
        //     padding: '0 0 10 5',
        //     height: 40,
        //     items: [
        //         {
        //             xtype: 'combobox',
        //             itemId: 'cboToChuyenKHVaoChuyen',
        //             bind: {
        //                 // store: '{POrder_ListBuyerStore}',
        //                 // value: '{objSearch.buyerid}'
        //             },
        //             displayField: 'code',
        //             valueField: 'id',
        //             queryMode: 'local',
        //             anyMatch: true,
        //             editable: true,
        //             allowBlank: true,
        //             margin: 2,
        //             width: 210,
        //             // flex: 1,
        //             fieldLabel: "Tổ chuyền",
        //             labelWidth: 70,
        //         },
        //         // '->'
        //         // ,            
        //         // {
        //         //     tooltip: 'Thêm ngạch lương',
        //         //     iconCls: 'x-fa fa-plus',
        //         //     weight: 30,
        //         //     handler: 'onAddSalType'
        //         // }
        //     ]
        // },
        {
            dock: 'bottom',
            layout: 'hbox',
            border: false,
            items: [
                {
                    margin: 1,
                    xtype:'button',
                    text:  'Thoát',
                    iconCls: 'x-fa fa-window-close',
                    itemId: 'btnThoat'
                }
            ]
        }
    ],
    listeners: {
        pivotgroupexpand: 'onPivotGroupExpand',
        pivotgroupcollapse: 'onPivotGroupCollapse',
        pivotupdate: 'onPivotUpdate',
        pivotitemclick: 'onPivotItemClick'
    },
});

