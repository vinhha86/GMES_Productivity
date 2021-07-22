Ext.define('GSmartApp.view.devices.ThietBiViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ThietBiViewController',

    init: function () {

    },
    control: {
        '#ThietBiView':{
            itemclick:'onThietBiClick'
        }
    },

    onMenu: function(grid, rowIndex, colIndex, item, e, record){
        //var rec =grid.getStore().getAt(rowIndex);
        var me=this;
        var menu_grid ;
        if(record.data.status==3){
            //tạo menu có 2 items(khóa - download) để chọn
            menu_grid=new Ext.menu.Menu({
                items:[
                    {
                        text:'Mở khóa',
                        iconCls:'x-fa fa-unlock',
                        handler: function(){
                            me.onMoKhoaThietBi(record);
                        }
                    },{
                        text:'DownLoadLog',
                        iconCls:'x-fa fa-cloud-download',
                    }]
                
            })
        }else{
            menu_grid=new Ext.menu.Menu({
                items:[
                    {
                        text:'Khóa',
                        iconCls:'x-fa fa-lock',
                        handler: function(){
                            me.onKhoaThietBi(record);
                        }
                    },{
                        text:'DownLoadLog',
                        iconCls:'x-fa fa-cloud-download',
                    }
                ]
            })
        }
        var position = e.getXY();
        e.stopEvent();
        menu_grid.showAt(position);


    },
    //gán status =3 => khóa
    onKhoaThietBi:function(params){
        var viewmodel = this.getViewModel();
		GSmartApp.Ajax.postJitin('/api/v1/device/device_lock','{"id": '+params.getId()+'}',
			function(success,response,options ) {
				if(success){
					var response = Ext.decode(response.responseText);
                    if(response.respcode==200){
                        Ext.Msg.show({
                            title:'Thông báo',
                            msg:'Khóa thành công',
                            buttons:Ext.MessageBox.YES,
                            buttonText:{
                                yes:'Đóng',
                            }
                        })
                        var ds_thietbi_tore = viewmodel.getStore('ds_thietbi_store');
                        ds_thietbi_tore.load_device_active();
                    }
				
				//	formDevice.getForm().reset(); 
				}else{
                    Ext.Msg.show({
                        title:'Thông báo',
                        msg:'Khóa thất bại',
                        buttons:Ext.MessageBox.YES,
                        buttonText:{
                            yes:'Đóng'
                        }
                    })
					
				}
			})
	},
    
    onMoKhoaThietBi:function(params){
        var viewmodel = this.getViewModel();
		
		GSmartApp.Ajax.post('/api/v1/device/device_unlock','{"id": '+params.getId()+'}',
			function(success,response,options ) {
				if(success){
					var response = Ext.decode(response.responseText);
                    if(response.respcode==200){
                        Ext.Msg.show({
                            title:'Thông báo',
                            msg:'Mở khóa thành công',
                            buttons:Ext.MessageBox.YES,
                            buttonText:{
                                yes:'Đóng',
                            }
                        })
                        var ds_thietbi_tore = viewmodel.getStore('ds_thietbi_store');
                        ds_thietbi_tore.load_device_active();
                    }
				}else{
                    Ext.Msg.show({
                        title:'Thông báo',
                        msg:'Mở khóa thất bại',
                        buttons:Ext.MessageBox.YES,
                        buttonText:{
                            yes:'Đóng'
                        }
                    })
				}
			})
	},
    
    search: function () {
        var viewmodel = this.getViewModel();
        var ds_thietbi_tore = viewmodel.getStore('ds_thietbi_store');
        //lấy giá trị từ form tìm kiếm 
        var params = new Object();
        //nếu giá trị bằng "" thì gán bằng null, còn không vẫn giữ nguyên giá trị
        params.org_governid_link = viewmodel.get('timkiem.org_governid_link') == "" ? null : viewmodel.get('timkiem.org_governid_link');
        params.search = viewmodel.get('timkiem.name_code') == "" ? null : viewmodel.get('timkiem.name_code');
        params.type=null;


        //ds_thietbi_tore.load_device_active(params.org_governid_link,params.search,null);
            GSmartApp.Ajax.postJitin('/api/v1/device/device_getactivate', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                         //load lai 
                        //remove dữ liệu trong store đi - > thêm dữ liệu vừa tìm kiếm vào
                        ds_thietbi_tore.removeAll();
                        ds_thietbi_tore.add(response.data);
                      
                    }

                }
            })     
    },
    //lấy thông tin thiết bị để hiển thị chi tiết
    onThietBiClick: function (grid, record, item, index, e, eOpts) {
        var viewmodel = this.getViewModel();
        viewmodel.set('thongtin_chitiet.devicegroupid_link', record.data.devicegroupid_link);
        viewmodel.set('thongtin_chitiet.code', record.data.code);
        viewmodel.set('thongtin_chitiet.name', record.data.name);
        viewmodel.set('thongtin_chitiet.type', record.data.type);
        viewmodel.set('thongtin_chitiet.org_governid_link', record.data.org_governid_link);
        viewmodel.set('thongtin_chitiet.id', record.data.id);
    },
})