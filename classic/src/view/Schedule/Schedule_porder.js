// Ext.define('GSmartApp.view.Schedule.Schedule_porder', {
//     extend : 'Sch.panel.SchedulerTree',
//     xtype  : 'Schedule_porder',

//     requires : [
//         'Sch.plugin.Zones',
//         'Sch.data.ResourceTreeStore',
//         'Sch.data.CrudManager',
//         'GSmartApp.view.Schedule.Flight',
//         'GSmartApp.view.Schedule.Gate',
//         'GSmartApp.view.Schedule.WeatherInfo'
//     ],

//     title            : 'Test',
//     rowHeight        : 40,
//     barMargin        : 2,
//     useArrows        : true,
//     viewPreset       : 'hourAndDay',
//     startDate        : new Date(2017, 11, 24, 8),
//     // endDate          : new Date(2017, 11, 2, 18),
//     multiSelect      : true,
//     border           : false,
//     bodyBorder       : false,
//     eventBorderWidth : 0,
//     columnLines      : false,
//     rowLines         : true,
//     cls              : 'tree-scheduler',
//     tooltipTpl: new Ext.XTemplate(
//         '<dl class="eventTip">',
//         '<dt class="icon-clock">Time</dt><dd>{[Ext.Date.format(values.StartDate, "Y-m-d G:i")]}</dd>',
//         '<dt class="icon-task">Task</dt><dd>{Name}</dd>',
//         '<dt class="icon-earth">Location</dt><dd>{leaf}&nbsp;</dd>',
//         '</dl>'
//     ),
//     eventRenderer : function(flight, resource, meta) {
//         if (resource.data.leaf) {
//             meta.cls = 'leaf';
//             return flight.get('Name');
//         } else {
//             meta.cls = 'group';
//             return '&nbsp;';
//         }
//     },

//     lockedGridConfig : {
//         width : 300
//     },

//     viewConfig : {
//         getRowClass : function(r) {
//             if (r.get('Id') === 3 || r.parentNode.get('Id') === 3) {
//                 return 'some-grouping-class';
//             }

//             if (r.get('Id') === 9 || r.parentNode.get('Id') === 9) {
//                 return 'some-other-grouping-class';
//             }
//         }
//     },

//     onEventCreated : function(newFlight) {
//         newFlight.set('Name', 'New departure');
//     },

//     columns : [
//         {
//             xtype     : 'treecolumn', //this is so we know which column will show the tree
//             text      : 'Name',
//             width     : 200,
//             flex      : 1,
//             sortable  : true,
//             dataIndex : 'Name'
//         },
//         {
//             text      : 'Capacity',
//             width     : 75,
//             sortable  : true,
//             dataIndex : 'Capacity'
//         }
//     ],

//     initComponent : function() {
//         var me            = this,

//             zoneStore     = new Sch.data.EventStore({
//                 model       : 'GSmartApp.view.Schedule.WeatherInfo',
//                 storeId     : 'zones',
//                 autoDestroy : true
//             }),

//             eventStore    = new Sch.data.EventStore({
//                 model : 'GSmartApp.view.Schedule.Flight'
//             }),

//             resourceStore = new Sch.data.ResourceTreeStore({
//                 model : 'GSmartApp.view.Schedule.Gate'
//             }),

//             cm            = new Sch.data.CrudManager({
//                 autoLoad      : true,
//                 resourceStore : resourceStore,
//                 eventStore    : eventStore,
//                 transport     : {
//                     load : {
//                         url : 'data/data.json'
//                     }
//                 },
//                 stores        : [
//                     zoneStore
//                 ]
//             });

//             var tip = new Sch.tooltip.Tooltip(
                
//             );
//             var cfg = {
//                 tip : tip,
//                 showTooltip: true
//             }

//         Ext.apply(me, {
//             crudManager : cm,
//             // resizeConfig: cfg,
//             plugins : [
//                 {
//                     ptype : 'scheduler_zones',
//                     store : zoneStore,

//                     // Add some extra markup inside the zone element
//                     innerTpl : '<span class="weather fa {WeatherIcon}"></span><span class="temperature">{TemperatureC}°C / {TemperatureF}°F</span>' +
//                     '<tpl if="Snowing">' +
//                     '<div class="snowflake">❄</div>' +
//                     '<div class="snowflake">❄</div>' +
//                     '<div class="snowflake">❄</div>' +
//                     '<div class="snowflake">❄</div>' +
//                     '<div class="snowflake">❄</div>' +
//                     '<div class="snowflake">❄</div>' +
//                     '<div class="snowflake">❄</div>' +
//                     '</tpl>'
//                 }
//             ],

//             header : {
//                 items: [
//                     {
//                         xtype    : 'textfield',
//                         emptyText: 'Filter resources',

//                         triggers: {
//                             remove: {
//                                 cls    : 'x-form-clear-trigger',
//                                 handler: function () {
//                                     this.setValue('');
//                                 }
//                             }
//                         },

//                         listeners: {
//                             change: function (field, newValue, oldValue) {
//                                 if (newValue) {
//                                     var regexps = Ext.Array.map(newValue.split(/\s+/), function (token) {
//                                         return new RegExp(Ext.String.escapeRegex(token), 'i');
//                                     });
//                                     var length = regexps.length;

//                                     resourceStore.filterTreeBy(function (resource) {
//                                         var name = resource.get('Name');

//                                         // blazing fast "for" loop! :)
//                                         for (var i = 0; i < length; i++)
//                                             if (!regexps[i].test(name)) return false;

//                                         return true;
//                                     });
//                                 } else {
//                                     resourceStore.clearTreeFilter();
//                                 }
//                             },

//                             specialkey: function (field, e, t) {
//                                 if (e.keyCode === e.ESC) field.reset();
//                             }
//                         }
//                         // eof listeners
//                     }
//                 ]
//             }
//         });

//         me.callParent();
//     },

//     onDestroy : function() {
//         this.crudManager.destroy();
//         this.callParent();
//     }
// });