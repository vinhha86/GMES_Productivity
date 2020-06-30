Ext.define('GSmartApp.view.porder_gantt.Porder_gantt_guess', {
    extend: 'Ext.panel.Panel',
    xtype: 'Porder_gantt_guess',
    controller: 'Porder_gantt_guess_Controller',
    viewModel: {
        type: 'Porder_gantt_guess_ViewModel'
    },
    layout: 'fit',
    requires: [
        'Gnt.panel.Gantt',
        'Gnt.column.PercentDone',
        'Gnt.column.StartDate',
        'Gnt.plugin.Export',
        'Gnt.column.EndDate',
        'Gnt.plugin.Printable',

    ],
    initComponent: function () {
        var me = this;
        var viewmodel = me.getViewModel();

        var current = new Date();
        var startdate = new Date(current.getFullYear(), current.getMonth() - 1, 1);

        var taskStore = viewmodel.getStore('TaskStore');
        taskStore.loadStore(viewmodel.get('gantt.startDate'), viewmodel.get('gantt.endDate'), viewmodel.get('gantt.listid'));

        var g = Ext.create('Gnt.panel.Gantt', {
            id: 'Gantt_GuessKeHoach',
            width: '100%',
            // height: '100%',
            autoHeight: true,
            startDate : startdate,
            endDate : Sch.util.Date.add(startdate, Sch.util.Date.MONTH, 6),
            
            leftLabelField: {
                dataIndex: 'totalpackage',
                renderer: function (value) {
                    return value == null ? "" : "SL:" + value;
                }
            },
            highlightWeekends: true,
            skipWeekendsDuringDragDrop: false,
            allowParentTaskMove: false,
            loadMask: true,
            rowHeight: 35,
            enableTaskReordering: false,
            resizeConfig: {
                showDuration: true
            },
            viewConfig: {
                trackOver: false,
                plugins: {
                    ptype: 'treeviewdragdrop',
                    enableDrag: true,
                    dragText: '{0} Phân lệnh xuống nhà máy',
                    dragGroup: 'porderGanttDropGroup',
                    dropGroup: 'porderFreeDropGroup'
                },
                listeners: {
                    drop: 'onDrop',
                    beforedrop: 'onBeforeDrop'
                }
            },
            border: true,
            enableProgressBarResize: false,
            enableTaskDragDrop: true,
            showRollupTasks: true,
            rollupLabelField: {
                dataIndex: 'mahang',
                renderer: function (value) {
                    if (value != null)
                        return "<label class= 'styleRollup'>" + value + "</label>";
                    return "";
                }
            },
            viewPreset: {
                name: 'weekAndDayLetter',
                headerConfig: {
                    bottom: {
                        unit: "DAY",
                        increment: 1,
                        dateFormat: 'd'
                    },
                    middle: {
                        unit: "WEEK",
                        dateFormat: 'd-m-Y',
                        align: 'center'
                    }
                }
            },
            eventBorderWidth: 0,
            plugins: [
                {
                    ptype: 'gantt_export',
                    pluginId: 'export',
                    // You can easily define your own custom HTML header (or footer) to include logo etc
                    headerTpl: '<div class="sch-export-header" style="width:{width}px">' +
                        // '<img src="resources/your-logo.png"/>' +
                        '<dl>' +
                        '<dt>Date: {[Ext.Date.format(new Date(), "M d Y")]}</dt>' +
                        '<dd>Page: {pageNo}/{totalPages}</dd>' +
                        '</dl>' +
                        '</div>',
                    // translateURLsToAbsolute : 'http://dev.bryntum.com:8080/resources',
                    printServer: 'http://localhost:8182'
                },
                {
                    ptype: 'gantt_printable',
                    exportDialogConfig : {
                        showDPIField         : true,
                        showColumnPicker     : true,
                        showResizePicker     : false,
                        dateRangeRestriction : false,
                        stateful             : true,
                        stateId              : 'gntprint'
                    }
                }
            ],

            tooltipTpl: '<ul class="taskTip">' +
                '<li><strong></strong>{Name}</li>' +
                '<li><strong>Từ ngày: </strong>{[Ext.Date.format(values.StartDate, "d-m-Y")]}</li>' +
                '<li><strong>Từ ngày: </strong>{[Ext.Date.format(values.EndDate, "d-m-Y")]}</li>' +
                '<li><strong>Số lượng: </strong> {totalpackage}</li>' +
                '</ul>',
            columns: [
                {
                    xtype: 'namecolumn',
                    text: 'Kế hoạch sản xuất',
                    width: 250
                }
            ],
            taskStore : taskStore,
            eventRenderer: function (taskRecord) {
                return {
                    ctcls : "Id-" + taskRecord.get('Id') // Add a CSS class to the task container element
                };
            },
            listeners: {
                // Setup a time header tooltip after rendering
                render: 'render',
                rowcontextmenu: 'onContextMenu',
                // itemdblclick: 'onitemdblclick',
                // aftertaskresize: 'onaftertaskresize',
                // aftertaskdrop: 'onaftertaskdrop'
            },
        });

        Ext.apply(this, {
            items: [g]
        });


        this.callParent(arguments);
    },
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
                xtype: 'button',
                tooltip: 'Kế hoạch giao hàng',
                iconCls: 'x-fa fa-shopping-basket',
                weight: 30,
                handler: 'onShowPO',
            },
            {
                xtype: 'button',
                tooltip: 'Tổng hợp CMP',
                iconCls: 'x-fa fa-dollar',
                weight: 30,
                handler: 'onShowPO',
            },
            {
                xtype: 'button',
                tooltip: 'Tổng hợp Salary Fund',
                iconCls: 'x-fa fa-money',
                weight: 30,
                handler: 'onShowPO',
            },
            {
                xtype: 'datefield',
                weight: 30,
                fieldLabel: 'Bắt đầu',
                format: 'd/m/Y',
                altFormats: "Y-m-d\\TH:i:s.uO",
                labelWidth: 60,
                width: 190,
                bind: {
                    value: '{gantt.startDate}'
                }
            },
            {
                xtype: 'datefield',
                weight: 30,
                fieldLabel: 'Kết thúc',
                format: 'd/m/Y',
                altFormats: "Y-m-d\\TH:i:s.uO",
                labelWidth: 60,
                width: 190,
                bind: {
                    value: '{gantt.endDate}'
                }
            },
            {
                xtype: 'button',
                tooltip: 'Phóng to',
                // text: 'Zoom in',
                iconCls: 'x-fa fa-search',
                weight: 30,
                handler: 'onSearch',
            },
            '->'
            ,
            {
                xtype  : 'button',
                iconCls: 'fa fa-file-pdf-o',
                text   : 'Export to PDF',
                margin : '0 10 0 0',
                handler: 'onExportGantt',
                hidden: true
            },{
                xtype  : 'button',
                iconCls: 'fa fa-file-pdf-o',
                text   : 'PDF',
                handler: 'onPrint'
            },{
                xtype: 'button',
                tooltip: 'Phóng to',
                // text: 'Zoom in',
                iconCls: 'x-fa fa-search-plus',
                weight: 30,
                handler: 'onZoomInGantt',
            },
            {
                xtype: 'button',
                tooltip: 'Thu nhỏ',
                // text: 'Zoom out',
                iconCls: 'x-fa fa-search-minus',
                weight: 30,
                handler: 'onZoomOutGantt',
            }
        ]
    }]
});