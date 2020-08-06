Ext.define('GSmartApp.view.org.ListOrgDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ListOrgDetailController',
    Id: 0,
    init: function () {
        
    },
    control: {
        '#btnLuu': {
            click: 'onLuu'
        },
        '#btnThemDonViTrucThuoc': {
            click: 'onThemTrucThuoc'
        }
    },
    onThemTrucThuoc: function(){
        // parentid_link
        var viewModel = this.getViewModel();
        var data = new Object();
        data = viewModel.get('currentRec');
        viewModel.set('parentid_link',data.id);
        viewModel.set('id',0);
        viewModel.set('currentRec',null);
    },
    onLuu: function () {
        var me = this.getView();
        var treePanel = Ext.getCmp('ListOrgMenu');
        me.setLoading("Đang lưu dữ liệu");

        var viewModel = this.getViewModel();

        var params = new Object();
        var data = new Object();
        data = viewModel.get('currentRec');
        data.id = viewModel.get('id');
        data.parentid_link=viewModel.get('parentid_link');
        
        if(data.status==true){
            data.status=1;
        }else{
            data.status=-1;
        }

        params.data = data;
        params.msgtype = "ORG_CREATE";
        params.message = "Tạo org";

        if(data.id == 0){
            viewModel.set('currentRec',null);
            // viewModel.set('parentid_link',null);
            // viewModel.set('fieldState',false);
            viewModel.set('id',0);
        }

        GSmartApp.Ajax.post('/api/v1/orgmenu/createOrg', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        
                        var storeMenu = viewModel.getStore('MenuStore');
                        var items = storeMenu.data.items; // items trong tree
                        var isExist = false; // Org ton tai hay chua
                        var org = response.org;
                        var parentId = org.parentid_link;

                        if(data.id != 0 && org.status != -1){ // dat lai title cho detail
                            me.setTitle(org.name);
                        }

                        // check ton tai
                        if(storeMenu.getById(org.id) != null){
                            isExist = true;
                        }

                        // neu da org ton tai, neu status = -1, xoa
                        if(isExist && org.status == -1){
                            if(org.parentid_link == -1){
                                me.setLoading(false);
                                return;
                            }
                            var node = storeMenu.getById(org.parentid_link);
                            var node2 = storeMenu.getById(org.id);
                            node.removeChild(node2);
                            viewModel.set('currentRec',null);
                            viewModel.set('parentid_link',null);
                            viewModel.set('fieldState',false);
                            viewModel.set('id',0);

                        }

                        // neu org chua ton tai, neu status = 1, them
                        if(!isExist && org.status == 1){
                            for(var i=0;i<items.length;i++){
                                var parentOrg = items[i].data;
                                // console.log(parentOrg);
                                if(parentOrg.id == org.parentid_link){
                                    org.children = [];
                                    org.depth = parentOrg.depth+1;
                                    org.expandable = true;
                                    org.expanded = false;
                                    org.glyph = '';
                                    org.leaf = true;
                                    org.qshowDelay = 0;
                                    org.root = false;
                                    org.selectable = true;
                                    org.visible = true;
                                    var node = storeMenu.getById(parentOrg.id);
                                    node.appendChild(org);
                                    break;
                                }
                            }
                        }

                        treePanel.reconfigure(storeMenu);

                    }
                    else {
                        Ext.Msg.show({
                            title: 'Lưu thất bại',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Lưu thất bại',
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
    }
})