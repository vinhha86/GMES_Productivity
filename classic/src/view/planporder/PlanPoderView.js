// Ext.define('GSmartApp.view.planporder.PlanPoderView', {
//     extend: 'Ext.panel.Panel',
//     xtype: 'PlanPoderView',
//     viewModel: {
//         type: 'PlanPoderView_ViewModel'
//     },
//     controller: 'PlanPoderView_Controller',
//     requires: [
//     	'Gnt.panel.Gantt',
//         'Gnt.column.PercentDone',
//         'Gnt.column.StartDate',
//         'Gnt.column.EndDate'
//     ],

//     initComponent: function() {

//         var viewmodel = this.getViewModel();


//         // var taskStore = viewmodel.getStore('PContract_porder_gantt_store');
//         // taskStore.loadStore();

//         var taskStore = viewmodel.getStore('PContract_porder_gantt_store');
//         taskStore.loadStore(viewmodel.get('gantt.startDate'), viewmodel.get('gantt.endDate'), viewmodel.get('gantt.listid'));
//         var g = Ext.create('Gnt.panel.Gantt', {
//             width     : '100%',
//             height    : 600,
//             highlightWeekends : true,
//             rowHeight         : 30,
//             resizeConfig             : {
//                 showDuration : false
//             },

//             viewConfig  : {
//                 trackOver : false
//             },
//             border                   : true,
//             enableProgressBarResize  : true,
//             enableDependencyDragDrop : true,
//             startDate                : new Date(2020, 6, 1),
//             endDate                  : Sch.util.Date.add(new Date(2020, 6, 1), Sch.util.Date.WEEK, 4),
//             viewPreset               : {
//                 name                : 'weekAndDay',
//                 // headerConfig        : {
//                 //     middle          : {
//                 //         // unit       : "HOUR",
//                 //         // increment  : 12,
//                 //         // renderer   : function(startDate, endDate, headerConfig, cellIdx) {
//                 //         //     console.log(startDate);
//                 //         //     return "";
//                 //         // }
//                 //     }
//                 // }
//             },
//             eventBorderWidth         : 0,
//             eventRenderer : function (taskRecord) {
//                 return {
//                     ctcls : "Id-" + taskRecord.get('Id') // Add a CSS class to the task container element
//                 };
//             },

//             tooltipTpl : '<ul class="taskTip">' +
//             '<li><strong>Tên công việc:</strong>{Name}</li>' +
//             '<li><strong>Bắt đầu:</strong>{[values._record.getDisplayStartDate("y-m-d")]}</li>' +
//             '<li><strong>Số ngày:</strong> {Duration}d</li>' +
//             '<li><strong>Tiến độ:</strong>{PercentDone}%</li>' +
//             '</ul>',

//             // Setup your static columns
//             columns    : [
//                 {
//                     xtype     : 'namecolumn',
//                     text: 'Ten',
//                     width     : 200
//                 }
//             ],
//             // bind: {
//             //     taskStore: '{TaskStore}'
//             // },

//             taskStore       : taskStore,

//             listeners : {

//                 // Setup a time header tooltip after rendering
//                 render : 'render',
//                 taskclick : 'onTaskClick',
//                 scheduleclick: function(){
//                     console.log(12344);
//                 },
//                 dependencyclick: function(){
//                     console.log(12344);
//                 },
//                 itemclick: function(){
//                     console.log(12344);
//                 },
//                 rowcontextmenu: 'onContextMenu'
//             }
//         });

//         Ext.apply(this, {
//             items: [g]
//         });

//         this.callParent(arguments);
//     },
//     dockedItems: [{
// xtype: 'toolbar',
// dock: 'top',
// items: [
//     {
//         xtype: 'button',
//         tooltip: 'Kế hoạch giao hàng',
//         iconCls: 'x-fa fa-truck',
//         weight: 30,
//         handler: 'onShowPO',
//     },
//     {
//         xtype: 'button',
//         tooltip: 'Tổng hợp CMP',
//         iconCls: 'x-fa fa-dollar',
//         weight: 30,
//         handler: 'onShowPO',
//     },
//     {
//         xtype: 'button',
//         tooltip: 'Tổng hợp Salary Fund',
//         iconCls: 'x-fa fa-money',
//         weight: 30,
//         handler: 'onShowPO',
//     },
//     {
//         xtype: 'datefield',
//         weight: 30,
//         fieldLabel: 'Bắt đầu',
//         format: 'd/m/Y',
//         altFormats: "Y-m-d\\TH:i:s.uO",
//         labelWidth: 60,
//         width: 190,
//         bind: {
//             value: '{gantt.startDate}'
//         }
//     },
//     {
//         xtype: 'datefield',
//         weight: 30,
//         fieldLabel: 'Kết thúc',
//         format: 'd/m/Y',
//         altFormats: "Y-m-d\\TH:i:s.uO",
//         labelWidth: 60,
//         width: 190,
//         bind: {
//             value: '{gantt.endDate}'
//         }
//     },
//     {
//         xtype: 'button',
//         tooltip: 'Phóng to',
//         // text: 'Zoom in',
//         iconCls: 'x-fa fa-search',
//         weight: 30,
//         handler: 'onSearch',
//     },
//     '->'
//     ,
//     {
//         xtype: 'button',
//         tooltip: 'Phóng to',
//         // text: 'Zoom in',
//         iconCls: 'x-fa fa-search-plus',
//         weight: 30,
//         handler: 'onZoomIn',
//     },
//     {
//         xtype: 'button',
//         tooltip: 'Thu nhỏ',
//         // text: 'Zoom out',
//         iconCls: 'x-fa fa-search-minus',
//         weight: 30,
//         handler: 'onZoomOut',
//     }
// ]
// }]  
// });
