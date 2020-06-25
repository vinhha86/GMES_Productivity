Ext.define('GSmartApp.view.pcontract.PContract_porder_gantt_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_porder_gantt_Controller',
    isActivate: false,
    init: function () {
        var gantt = this.getView().down('ganttpanel');
        // var taskStore = this.getViewModel().getStore('TaskStore');
        // taskStore.loadStore();
    },

    render: function (view) {
        var header = view.getSchedulingView().headerCt;
        view.tip = Ext.create('Ext.tip.ToolTip', {
            // The overall target element.
            target: header.id,
            // Each grid row causes its own separate show and hide.
            delegate: '.sch-simple-timeheader',
            showDelay: 0,
            trackMouse: true,
            anchor: 'bottom',

            //to see different date formats, see http://docs.sencha.com/ext-js/4-1/#!/api/Ext.Date
            dateFormat: 'd-m-Y',
            //dateFormat: 'Y-m-d, g:i a',
            renderTo: Ext.getBody(),
            listeners: {
                // Change content dynamically depending on which element triggered the show.
                beforeshow: function (tip) {
                    var el = Ext.get(tip.triggerElement),
                        position = el.getXY(),
                        date = view.getSchedulingView().getDateFromXY(position);

                    //update the tip with date
                    tip.update(Ext.Date.format(date, tip.dateFormat));
                }
            }
        });
    },
    onaftertaskresize: function (gantt, task, eOpts) {
        this.UpdateKeHoach(gantt,task);
    },
    onaftertaskdrop: function(gantt, task, eOpts){
        this.UpdateKeHoach(gantt,task);
    },  
    onitemdblclick: function (grid, record, item, index, e, eOpts) {
        if (record.data.depth == 4) {
            this.ThemKeHoach(record.data, record.data.plan_type, record.data.id_origin);
        }

    },
    onContextMenu: function (tree, record, item, index, e, eOpts) {
        var type = record.data.plan_type;

        var me = this;
        var level1 = true, level2 = true,
            level3 = true, level4 = true;

        switch (record.data.depth) {
            case 1:
                level2 = false;
                level3 = false;
                level4 = false;
                break;
            case 2:
                level1 = false;
                level3 = false;
                level4 = false;
                break;
            case 3:
                level2 = false;
                level1 = false;
                level4 = false;
                break;
            case 4:
                level2 = false;
                level3 = false;
                level1 = false;
                break;
        }
        var menu_grid = new Ext.menu.Menu({
            items: [{
                text: 'Thêm kế hoạch',
                iconCls: 'x-fa fa-plus',
                hidden: !level3,
                handler: function () {
                    me.ThemKeHoach(record.data, type, 0);
                }
            }, {
                text: 'Xóa',
                iconCls: 'x-fa fa-trash',
                hidden: !level4,
                handler: function () {
                    me.XoaKeHoach(record.data.id_origin, record.data.id);
                }
            },
            {
                text: 'Thông tin đơn hàng',
                iconCls: 'x-fa fa-handshake-o',
                hidden: !level2,
                handler: function () {
                    me.showPContract(record.data, type, 0);
                }
            },
            {
                text: 'Thông tin lệnh sản xuất',
                iconCls: 'x-fa fa-hand-o-right',
                hidden: !level2,
                handler: function () {

                }
            },
            {
                text: 'Tiến độ sản xuất',
                iconCls: 'x-fa fa-line-chart',
                hidden: !level2,
                handler: function () {
                    me.showProcessingLine(record.data, type, 0);
                }
            },
            {
                text: 'Ảnh sản phẩm ',
                iconCls: 'x-fa fa-picture-o',
                hidden: !level2,
                handler: function () {
                    me.ShowImgProduct(record.data);
                }
            }
            ]
        })
        e.stopEvent();
        menu_grid.showAt(e.getXY());
    },
    ShowImgProduct: function (data) {
        var params = new Object();
        params.id = data.productid_link;

        GSmartApp.Ajax.post('/api/v1/product/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var form = Ext.create('Ext.window.Window', {
                            height: 358,
                            closable: true,
                            resizable: false,
                            modal: true,
                            border: false,
                            title: "Ảnh sản phẩm",
                            closeAction: 'destroy',
                            width: 380,
                            bodyStyle: 'background-color: transparent',
                            layout: {
                                type: 'fit', // fit screen for window
                                padding: 5
                            },
                            items: [{
                                xtype: 'Plan_ImgProduct',
                                id: 'Plan_ImgProduct',
                                viewModel: {
                                    data: {
                                        img: response.img
                                    }
                                }
                            }]
                        });
                        form.show();
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Lấy thông tin thất bại',
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    ThemKeHoach: function (data, type, id) {
        var title = "";

        switch (type) {
            case 1:
                title = "Thêm kế hoạch Nguyên phụ liệu về";
                break;
            case 2:
                title = "Thêm kế hoạch May mẫu";
                break;
            case 3:
                title = "Thêm kế hoạch Nhập kho thành phẩm";
                break;
            case 4:
                title = "Thêm kế hoạch Giao hàng";
                break;
        }

        var time = new Date();

        var form = Ext.create('Ext.window.Window', {
            height: 230,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: title,
            closeAction: 'destroy',
            width: 600,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PlanEdit',
                viewModel: {
                    data: {
                        plan: {
                            plan_type: type,
                            porderid_link: data.porderid_link,
                            id: id,
                            plan_date_start: time,
                            plan_date_end: new Date(time.getFullYear(), time.getMonth(), time.getDate() + 1)
                        },
                        parentId: data.id
                    }
                }
            }]
        });
        form.show();
    },
    XoaKeHoach: function (id_origin, id) {
        var gantt = this.getView().down('ganttpanel');
        Ext.Msg.show({
            title: "Thông báo",
            msg: 'bạn có chắc chắn muốn xóa kế hoạch?',
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    var params = new Object();
                    params.id = id_origin;

                    GSmartApp.Ajax.post('/api/v1/plan/delete', Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                var response = Ext.decode(response.responseText);

                                if (response.respcode == 200) {
                                    Ext.Msg.show({
                                        title: 'Thông báo',
                                        msg: 'Xóa thành công',
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng',
                                        },
                                        fn: function () {
                                            var store = gantt.getTaskStore();
                                            var task = store.getNodeById(id);
                                            store.removeTasks(task);
                                        }
                                    });
                                }
                            }
                        })
                }
            }
        });
    },
    showPContract: function (data, type, id) {
        console.log(data.pcontractid_link);
        var form = Ext.create('Ext.window.Window', {
            height: 600,
            width: 1000,
            closable: true,
            title: 'Đơn hàng',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',

            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'PContractView',
                IdPContract: data.pcontractid_link
            }]
        });
        form.show();
    },
    showProcessingLine: function (data, type, id) {
        var form = Ext.create('Ext.window.Window', {
            height: 550,
            width: 900,
            closable: true,
            title: 'Tiến độ',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',

            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'POrderProcessingLineChart',
                POrderId: data.porderid_link
            }]
        });
        form.show();
    },
    onZoomIn: function () {
        var config = {
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
        var viewmodel = this.getViewModel();
        var present = this.getView().getViewPreset();

        console.log(preset);

        // this.getView().setViewPreset(1,viewmodel.get('gantt.startDate'),viewmodel.get('gantt.endDate'));
        this.getView().zoomIn();
    },

    onZoomOut: function () {
        var viewmodel = this.getViewModel();
        this.getView().zoomOut();
        // this.getView().zoomOut(1,viewmodel.get('gantt.startDate'),viewmodel.get('gantt.endDate'));
    },

    getlevel_byName: function(name){
        var level = 0;
        switch(name){
            case 'weekAndDayLetter':
                level = 1;
                break;
        }
    },

    getViewPresentName_bylevel: function(level){
        var level = this.getView().get
        
    },

    onSearch: function() {
        var viewmodel = this.getViewModel();
        var store = this.getView().getTaskStore();
        this.getView().setStartDate(viewmodel.get('gantt.startDate'));
        this.getView().setEndDate(viewmodel.get('gantt.endDate'));
        store.loadStore(viewmodel.get('gantt.startDate'), viewmodel.get('gantt.endDate'), viewmodel.get('gantt.listid'));
    },

    UpdateKeHoach: function (gantt, task) {
        var params = new Object();
        var plan = new Object();
        var store = gantt.getTaskStore();
        store.startProjection();

        plan.id = task.data.id_origin;
        plan.plan_date_start = task.data.StartDate;
        plan.plan_date_end = task.data.EndDate;

        params.data = plan;

        GSmartApp.Ajax.post('/api/v1/plan/update', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                       
                        if(response.respcode != 200) {
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: 'Lưu thất bại',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                    } else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                })
    },
    onShowPO: function(){
        //var panel_orderwaiting = this.getView().up().items.get('panel_orderwaiting');
        var panel_po = this.getView().up().items.get('panel_po');
        if (null != panel_po){
            if (panel_po.getHidden())
            panel_po.setHidden(false);
            else
            panel_po.setHidden(true);
        }
    },   
    loadStore: function(store){
        var params = new Object();

        params.textsearch ="";
        params.status = 1;

		store.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/gantt/getporder_po_gantt',
			paramsAsJson:true,
            noCache: false,
            extraParams : params,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		store.load();
    },
    onDrop: function(node, data, overModel, dropPosition, eOpts ){
        var me = this;

        var porder_data = data.records[0].data;
        var destPos_Data = overModel.data;

        var form = Ext.create('Ext.window.Window', {
            height: Ext.getBody().getViewSize().height*.95,
            closable: true,
            title: 'Phân chuyền',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            width: 750,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'POrder_Grant_Main',
                pcontract_poid_link: porder_data.pcontract_poid_link,
                pcontractid_link: porder_data.pcontractid_link,
                porderid_link: porder_data.id,
                granttoorgid_link: destPos_Data.id_origin,
                granttoorg_name: destPos_Data.Name
            }]
        });
        form.show(); 

        //Refresh Data
        form.down('#POrder_Grant_Main').on('GrantSave', function () {
            me.onSearch();
            form.close();
        })
    }, 
    onBeforeDrop:  function( node, data, overModel, dropPosition, dropHandlers, eOpts){
        if (dropPosition == 'append'){
            var destPos_Data = overModel.data;
            if (destPos_Data.depth != 2){
                Ext.Msg.show({
                    title: 'Thông báo',
                    msg: 'Chỉ được phép phân lệnh cho tổ chuyền',
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
                dropHandlers.cancelDrop();
            } else {
                //Neu khong tha vao to san xuat --> Huy bo
                if (destPos_Data.id_origin < 1){
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Chỉ được phép phân lệnh cho tổ chuyền',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    dropHandlers.cancelDrop();
                } else {
                    dropHandlers.processDrop();
                }
            }
        } else {
            dropHandlers.cancelDrop();
        }
    }
})