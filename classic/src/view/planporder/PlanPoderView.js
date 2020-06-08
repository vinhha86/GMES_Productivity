Ext.define('GSmartApp.view.planporder.PlanPoderView', {
    extend: 'Gnt.panel.Gantt',
    xtype: 'PlanPoderView',
    controller: 'PlanPoderView_Controller',
    viewModel: {
        type: 'PlanPoderView_ViewModel'
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
    startDate                : new Date(2020, 4, 1),
    endDate                  : Sch.util.Date.add(new Date(2020, 4, 1), Sch.util.Date.WEEK, 6),
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
    taskBodyTemplate : '<div class="sch-gantt-progress-bar" style="width:{progressBarWidth}px;{progressBarStyle}" unselectable="on">' +
    '<span class="sch-gantt-progress-bar-label">{[Gnt.column.PercentDone.prototype.defaultRenderer(values.pcontract_number)]}</span>' +
    '</div>',
    columns    : [
        {
            xtype: 'namecolumn',
            text: 'Kế hoạch sản xuất',
            width: 300
        },
        {
            width : 100,
            text: 'Mã hàng',
            dataIndex: 'pcontract_number'
        },
        {
            text: 'Số lượng',
            dataIndex: 'totalpackage'
        }
    ],
    eventRenderer : function (taskRecord) {
        return {
            ctcls : "Id-" + taskRecord.get('Id') // Add a CSS class to the task container element
        };
    },
    listeners : {
        // Setup a time header tooltip after rendering
        render : 'render',
        rowcontextmenu: 'onContextMenu',
        itemdblclick: 'onitemdblclick',
        aftertaskresize: 'onaftertaskresize',
        aftertaskdrop: 'onaftertaskdrop'
    },
    initComponent: function() {
        var me = this;
        var taskStore = me.getViewModel().getStore('TaskStore');
        taskStore.loadStore();

        var calendar = new Gnt.data.Calendar({
            weekendFirstDay : 6,
            weekendSecondDay : 0,
            weekendsAreWorkdays : true,
            data: [{
                Date: new Date(2020,05,08),
                Cls: 'gnt-holiday'
            },{
                Date: new Date(2020,05,09)
            },{
                Date: new Date(2020,05,11)
            }]
        })
        console.log(calendar);
        
        taskStore.setCalendar(calendar);

        this.taskStore = taskStore;
        this.callParent(arguments);
    }
});