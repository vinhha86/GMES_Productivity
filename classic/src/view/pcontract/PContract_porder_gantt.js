Ext.define('GSmartApp.view.pcontract.PContract_porder_gantt', {
    extend: 'Gnt.panel.Gantt',
    xtype: 'PContract_porder_gantt',
    controller: 'PContract_porder_gantt_Controller',
    viewModel: {
        type: 'PContract_porder_gantt_ViewModel'
    },
    requires: [
    	'Gnt.panel.Gantt',
        'Gnt.column.PercentDone',
        'Gnt.column.StartDate',
        'Gnt.plugin.Export',
        'Gnt.column.EndDate'
    ],
    width     : '100%',
    leftLabelField :  {
        dataIndex : 'totalpackage',
        renderer  : function(value) {
            return value == null ? "" : "SL:" + value ;
        }
    },
    rightLabelField :  {
        dataIndex : 'mahang',
        renderer  : function(value) {
            return value == null ? "" : "Mã hàng: " + value ;
        }
    },
    highlightWeekends : true,
    skipWeekendsDuringDragDrop: false,
    allowParentTaskMove : false,
    loadMask          : true,
    rowHeight         : 35,
    isDroppable        : false,
    draggable: false,
    resizeConfig             : {
        showDuration : true
    },
    viewConfig  : {
        trackOver : false
    },
    border                   : true,
    enableProgressBarResize  : true,
    enableTaskDragDrop  : true,
    showRollupTasks         : true,
    // startDate                : new Date(2020, 4, 1),
    // endDate                  : Sch.util.Date.add(new Date(2020, 4, 1), Sch.util.Date.WEEK, 6),
    // viewPreset               : {
    //     name                : 'weekAndDayLetter'
    // },
    viewPreset: {
        name: 'weekAndDayLetter',
        headerConfig       : {
            bottom: {
                unit      : "DAY",
                increment : 1,
                dateFormat: 'd'
            },
            middle: {
                unit      : "WEEK",
                dateFormat: 'd-m-Y',
                align     : 'center'
            }
        }
    },
    eventBorderWidth         : 0,
    plugins: [
        {
            ptype       : 'gantt_export',
            pluginId    : 'export',
            // You can easily define your own custom HTML header (or footer) to include logo etc
            headerTpl   : '<div class="sch-export-header" style="width:{width}px">' +
            '<img src="resources/your-logo.png"/>' +
                '<dl>' +
                    '<dt>Date: {[Ext.Date.format(new Date(), "M d Y")]}</dt>' +
                    '<dd>Page: {pageNo}/{totalPages}</dd>' +
                '</dl>' +
            '</div>',
            // translateURLsToAbsolute : 'http://dev.bryntum.com:8080/resources',
            printServer : 'http://localhost:8182'
        }
    ],

    tooltipTpl : '<ul class="taskTip">' +
    '<li><strong></strong>{Name}</li>' +
    '<li><strong>Từ ngày: </strong>{[values._record.getDisplayStartDate("d-m-Y")]}</li>' +
    '<li><strong>Đến ngày: </strong>{[values._record.getDisplayEndDate("d-m-Y")]}</li>' +
    '<li><strong>Số lượng: </strong> {totalpackage}</li>' +
    '</ul>',
    taskBodyTemplate : '<div style="width:100px" unselectable="on">{values}</div>',
    columns    : [
        {
            xtype: 'namecolumn',
            text: 'Kế hoạch sản xuất',
            width: 200
        }
    ],
    eventRenderer : function (taskRecord) {
        return {
            ctcls : "Id-" + taskRecord.get('Id') // Add a CSS class to the task container element
        };
    },
    taskStore: {
        type  : 'PContract_porder_gantt_store',
        proxy : {
            type : 'ajax',
            url  : 'data/task.json'
        }
    },
    listeners : {
        // Setup a time header tooltip after rendering
        render : 'render',
        // rowcontextmenu: 'onContextMenu',
        // itemdblclick: 'onitemdblclick',
        // aftertaskresize: 'onaftertaskresize',
        // aftertaskdrop: 'onaftertaskdrop'
    },
    initComponent: function() {
        var me = this;
        var current = new Date();
        var startdate = new Date(current.getFullYear(), current.getMonth()-1, 1);
        me.startDate  = startdate;
        me.endDate  = Sch.util.Date.add(startdate, Sch.util.Date.WEEK, 12);
        
        this.callParent(arguments);
    },
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
                xtype: 'button',
                tooltip: 'Kế hoạch giao hàng',
                iconCls: 'x-fa fa-sliders',
                weight: 30,
                handler: 'onShowPO',
            },
            '->'
            ,
            {
                xtype: 'button',
                tooltip: 'Phóng to',
                // text: 'Zoom in',
                iconCls: 'x-fa fa-search-plus',
                weight: 30,
                handler: 'onZoomIn',
            },
            {
                xtype: 'button',
                tooltip: 'Thu nhỏ',
                // text: 'Zoom out',
                iconCls: 'x-fa fa-search-minus',
                weight: 30,
                handler: 'onZoomOut',
            }
        ]
    }],    
});