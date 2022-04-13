Ext.define('GSmartApp.view.users.UserListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.UserListController',
	init: function() {
		
		var GroupUserStore = this.getViewModel().getStore('GroupUserStore');
		GroupUserStore.loadStore();

		var userStore = this.getViewModel().getStore('UserStore');
		userStore.loadStore_bypage('','','','',0);
	},
	control: {
		'#firstname': {
			keypress: 'onPressEnterSearch'
		},
		'#middlename': {
			keypress: 'onPressEnterSearch'
		},
		'#lastname': {
			keypress: 'onPressEnterSearch'
		},
		'#username': {
			keypress: 'onPressEnterSearch'
		},
		'#groupuser': {
			keypress: 'onPressEnterSearch'
		},
		'#btnTimKiem': {
			click: 'onSearch'
		},
		'#User_List': {
			itemdblclick: 'onItemdblclick'
		}
	},
	// enter to search
    onPressEnterSearch: function (textfield, e, eOpts) {
		var m = this;
		if (e.getKey() == e.ENTER) {
			// Ext.Msg.alert('Keys','You pressed the Enter key');
			m.onSearch();
		}
	},
	onSearch:function(){
		var me = this.getView();

		var firstname = me.down('#firstname').getValue();
		var middlename = me.down('#middlename').getValue();
		var lastname = me.down('#lastname').getValue();
		var username = me.down('#username').getValue();
		var groupuser = me.down('#groupuser').getValue();

		if (groupuser == "" || groupuser == null)
			groupuser = 0;

		var userStore = this.getViewModel().getStore('UserStore');
		userStore.loadStore_bypage(firstname, middlename, lastname, username, groupuser);
	},
	onEdit:function(grid, rowIndex, colIndex){
		var record = grid.getStore().getAt(rowIndex);
		var id = record.get('id');
		
		this.redirectTo("lsusers/"+id+"/edit");
	},
	onCustommer: function(grid, rowIndex, colIndex){
		var record = grid.getStore().getAt(rowIndex);
		var id = record.get('id');

		var me = this.getView();
        var record = grid.getStore().getAt(row);
        var form = Ext.create('Ext.window.Window', {
            height: 400,
            closable: true,
            title: 'Thuộc tính : ' + record.data.attributeName,
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            width: 400,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'ProductSelectAttributeView',
                viewModel: {
                    type: 'ProductDetailViewModel',
                    data: {
                        IdAttribute: record.data.attributeid_link,
                        IdProduct: me.IdProduct
                    }
                },
                IdAttribute: record.data.attributeid_link,
                IdProduct: me.IdProduct
            }]
        });
        form.show();
	},
	onItemdblclick:function(grid, record, item, index, e, eOpts ){
		var id = record.get('id');
		
		this.redirectTo("lsusers/"+id+"/edit");
	},
	onDelete:function(grid, rowIndex, colIndex){
		var gridUser = this.lookupReference('gridUser');
		Ext.Msg.show({
			title:GSmartApp.Locales.title_thongbao[GSmartApp.Locales.currentLocale],
			message:GSmartApp.Locales.title_xoa[GSmartApp.Locales.currentLocale],
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			fn: function(btn) {
				if (btn === 'yes') {
					var record = grid.getStore().getAt(rowIndex);
					var id = record.get('id');  
					if(!isNaN(id)){
						GSmartApp.Ajax.post('/api/v1/users/user_delete','{"userid": '+id+'}',
						function(success,response,options ) {
						})
					}
					gridUser.getStore().remove(record);	
				}
			}
		});
	},

	onFilterFullNameKeyup: function () {
        var viewModel = this.getViewModel();
        var store = viewModel.get('UserStore');
        var filterField = this.lookupReference('filterFullName');
        var filters = store.getFilters();

        if (filterField.value) {
            this.filterFullName = filters.add({
                id: 'filterFullName',
                property: 'fullname',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.filterFullName) {
            filters.remove(this.filterFullName);
            this.filterFullName = null;
        }
    },
	onFilterUsernameKeyup: function () {
        var viewModel = this.getViewModel();
        var store = viewModel.get('UserStore');
        var filterField = this.lookupReference('filterUsername');
        var filters = store.getFilters();

        if (filterField.value) {
            this.filterUsername = filters.add({
                id: 'filterUsername',
                property: 'username',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.filterUsername) {
            filters.remove(this.filterUsername);
            this.filterUsername = null;
        }
    },
})