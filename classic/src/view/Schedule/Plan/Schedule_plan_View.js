Ext.define('GSmartApp.view.Schedule.Plan.Schedule_plan_View', {
    extend : 'Sch.panel.SchedulerTree',
    xtype  : 'Schedule_plan_View',
    id: 'Schedule_plan_View',
    controller: 'Schedule_plan_ViewController',
    viewModel : {
        type: 'Schedule_plan_ViewModel'
    },
    requires : [
        'Sch.plugin.Zones',
        'Sch.data.ResourceTreeStore',
        'Sch.data.CrudManager',
        'GSmartApp.model.Schedule_Holiday_model',
        'GSmartApp.model.Schedule_Porder_model',
        'GSmartApp.model.Schedule_Plan_model',
        'Sch.plugin.Printable'
    ],
    rowHeight        : 40,
    barMargin        : 2,
    useArrows        : true,
    viewPreset       : {
        name : 'weekAndDayLetter',
        headerConfig: {
            bottom : {
                unit : 'DAY',
                increment: 1,
                dateFormat: 'd'
            },
            middle: {
                unit: 'WEEK',
                dateFormat: 'd-m-Y',
                align: 'center'
            }
        }
    },
    multiSelect      : true,
    border           : false,
    bodyBorder       : false,
    eventBorderWidth : 0,
    columnLines      : false,
    rowLines         : true,
    highlightWeekends :  true,
    cls              : 'tree-scheduler',
    // partnerTimelinePanel: 'Schedule_plan_GuestView',
    tooltipTpl: new Ext.XTemplate(
        '<ul class="eventTip">',
        '<li>Buyer: {buyername}</li>',
        '<li>Vendor: {vendorname}</li>',
        '<li>Số ngày SX: {duration}</li>',
        '<li>Năng suất: {productivity}</li>',
        '<li>Lệnh SX: {pordercode}</li>',
        '</ul>'
    ),
    eventRenderer : function(flight, resource, meta) {
        if (resource.data.leaf) {
            meta.cls = 'leaf';
            return flight.get('Name');
        } else {
            meta.cls = 'group';
            return '&nbsp;';
        }
    },

    // lockedGridConfig : {
    //     width : 300
    // },

    viewConfig : {
        getRowClass : function(r) {
            // if (r.get('Id') === 3 || r.parentNode.get('Id') === 3) {
            //     return 'some-grouping-class';
            // }

            // if (r.get('Id') === 9 || r.parentNode.get('Id') === 9) {
            //     return 'some-other-grouping-class';
            // }
        },
        plugins: {
            ptype: 'treeviewdragdrop',
            enableDrag: true,
            dragText: '{0} Yêu cầu SX',
            dragGroup: 'porderGanttDropGroup',
            dropGroup: 'porderFreeDropGroup'
        },
        listeners: {
            drop: 'onDrop',
            beforedrop: 'onBeforeDrop'
        }        
    },

    columns : [
        {
            xtype     : 'treecolumn', //this is so we know which column will show the tree
            text      : 'Nhà máy',
            width:      250,
            sortable  : false,
            dataIndex : 'Name'
        }
    ],

    initComponent : function() {
        var me            = this,
            viewmodel = this.getViewModel(),

            HolidayStore     = new Sch.data.EventStore({
                model       : 'GSmartApp.model.Schedule_Holiday_model',
                storeId     : 'zones',
                autoDestroy : true
            }),

            eventStore    = new Sch.data.EventStore({
                model : 'GSmartApp.model.Schedule_Porder_model'
            }),

            resourceStore = new Sch.data.ResourceTreeStore({
                model : 'GSmartApp.model.Schedule_Plan_model',
                sorters: [{
                    property: 'id_origin',
                    direction: 'ASC'
                }]
            });

            var cm            = new Sch.data.CrudManager({
                autoLoad      : false,
                resourceStore : resourceStore,
                eventStore    : eventStore,
                transport     : {
                    load : {
                        requestConfig : {
                            url : config.getAppBaseUrl()+'/api/v1/schedule/getplan',
                            method: 'POST',
                            headers :{
                                'Accept': "application/json", 
                                'Content-Type':"application/json"
                             },
                            params: {
                                listid: '13,14',
                                startDate: viewmodel.get('schedule.startDate'),
                                endDate: viewmodel.get('schedule.endDate'),
                                PO_code : '',
                                Buyer: 0,
                                Vendor: 0,
                                isReqPorder: false,
                                isAllgrant: false
                            }
                        }
                        
                    }
                },
                stores        : [
                    HolidayStore
                ]
            });

        Ext.apply(me, {
            crudManager : cm,            
            startDate        : viewmodel.get('schedule.startDate'),
            endDate          : viewmodel.get('schedule.endDate'),
            // resizeConfig: cfg,
            plugins : [
                {
                    ptype : 'scheduler_zones',
                    store : HolidayStore
                },
                {
                    ptype              : 'scheduler_printable',
                    pluginId           : 'printable',
                    // Configure what to show in print dialog
                    exportDialogConfig : {
                        showDPIField         : true,
                        showColumnPicker     : true,
                        dateRangeRestriction : false,
                        stateful             : true,
                        modal                : true
                    }
                }
            ]
        });

        me.callParent();
    },

    onDestroy : function() {
        this.crudManager.destroy();
        this.callParent();
    }
});