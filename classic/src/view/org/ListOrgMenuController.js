Ext.define('GSmartApp.view.org.ListOrgMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ListOrgMenuController',
    init: function () {
        this.onloadPage();
    },
    control: {
        '#ListOrgMenu': {
            itemclick: 'onloadDetail'
        }
    },
    onloadDetail: function( grid, record, item, index, e, eOpts){
        var viewModel = this.getViewModel();
        console.log(record.data);
        viewModel.set('currentRec', record.data);
        viewModel.set('id', record.data.id);
        viewModel.set('titleName', record.data.name);
        viewModel.set('parentid_link',record.data.parentid_link);
        //
        viewModel.set('code', record.data.code);
        viewModel.set('name', record.data.name);
        viewModel.set('city', record.data.city);
        viewModel.set('address', record.data.address);
        viewModel.set('contactperson', record.data.contactperson);
        viewModel.set('email', record.data.email);
        viewModel.set('phone', record.data.phone);
        viewModel.set('linecost', record.data.linecost);
        viewModel.set('orgtypeid_link', record.data.orgtypeid_link);
        viewModel.set('colorid_link', record.data.colorid_link);
        viewModel.set('status', record.data.status);
        //
        viewModel.set('fieldState', true);
    },
    onloadPage: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var storeMenu = viewModel.getStore('MenuStore');
        storeMenu.loadStore();
        var storeColor = viewModel.getStore('ColorStore');
        storeColor.loadStore();
        var storeOrgType = viewModel.getStore('OrgTypeStore');
        storeOrgType.loadAllOrgType();
    },
    onDropOrg: function(node, data, dropRec, dropPosition){
        // console.log(node);
        // console.log(data);
        // console.log(dropRec);
        // console.log(dropPosition);
        // if (dropPosition == 'append'){
        //     //change parent node
        // } else {
        //     //reorder
        // }
    },  
    onBeforeDropOrg:  function( node, data, overModel, dropPosition, dropHandlers, eOpts){
        console.log(dropHandlers);
        console.log(overModel);
        if (data.records[0].childNodes.length > 0) {
            Ext.MessageBox.show({
                title: "Quản lý đơn vị",
                msg: "Không được di chuyển đơn vị cha",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            dropHandlers.cancelDrop();
        }
    },
    onContextMenu: function(tree, record, item, index, e, eOpts ) {
        //Phan xuong
        if(record.data.orgtypeid_link == 13){
            var menu_grid = new Ext.menu.Menu({ items:
                [
                    {
                        text: 'Thêm Tổ SX',
                        itemId: 'btnAddLine_ListOrgMenu',
                        separator: true,
                        // margin: '5 0 0',
                        iconCls: 'x-fa fas fa-sliders',
                        handler: function(){
                            console.log(record);
                            // var record = this.parentMenu.record;
                            // me.onPOPriceEdit(record);
                        },
                    }, 
                ]
                });
            var position = e.getXY();
            e.stopEvent();
            menu_grid.showAt(position);
        }
        //To san xuat
        if(record.data.orgtypeid_link == 14){
            var menu_grid = new Ext.menu.Menu({ items:
                [
                    {
                        text: 'Nhân bản',
                        itemId: 'btnDuplicate_ListOrgMenu',
                        separator: true,
                        // margin: '5 0 0',
                        iconCls: 'x-fa fas fa-files-o',
                        handler: function(){
                            console.log(record);
                            // var record = this.parentMenu.record;
                            // me.onPOPriceEdit(record);
                        },
                    }, 
                ]
                });
            var position = e.getXY();
            e.stopEvent();
            menu_grid.showAt(position);
        }        
        //Tong cong ty
        if (record.data.orgtypeid_link == 1){
            var menu_grid = new Ext.menu.Menu({ items:
                [
                    {
                        text: 'Thêm Phân xưởng',
                        itemId: 'btnAddFactory_ListOrgMenu',
                        separator: true,
                        // margin: '5 0 0',
                        iconCls: 'x-fa fas fa-industry',
                        handler: function(){
                            console.log(record);
                            // var record = this.parentMenu.record;
                            // me.onPOPriceEdit(record);
                        },
                    }, 
                ]
                });
            var position = e.getXY();
            e.stopEvent();
            menu_grid.showAt(position);
        }
    }
})