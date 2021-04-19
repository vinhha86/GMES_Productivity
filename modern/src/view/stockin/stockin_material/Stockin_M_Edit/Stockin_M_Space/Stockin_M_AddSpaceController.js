Ext.define('GSmartApp.view.stockin.Stockin_M_AddSpaceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_AddSpaceController',
    init: function() {
        var viewModel = this.getViewModel();

        // fake store
        var day = [
            {id: 1,code: '1'},
            {id: 2,code: '2'},
            {id: 3,code: '3'},
            {id: 4,code: '4'},
            {id: 5,code: '5'}
        ];
        var hang = [
            {rowid_link: 1, spacename: 1, floorid: 1},
            {rowid_link: 1, spacename: 2, floorid: 2},
            {rowid_link: 1, spacename: 3, floorid: 3},
            {rowid_link: 1, spacename: 4, floorid: 4},
        ];
        var tang = [
            {rowid_link: 1, spacename: 1, floorid: 1},
            {rowid_link: 1, spacename: 2, floorid: 2},
            {rowid_link: 1, spacename: 3, floorid: 3},
            {rowid_link: 1, spacename: 4, floorid: 4},
        ];

        viewModel.set('day', day);
        viewModel.set('hang', hang);
        viewModel.set('tang', tang);

        this.loadInfo();
    },
    control: {
        '#btnLuu': {
            tap: 'onLuu'
        },
        '#btnThoat': {
            tap: 'onThoat'
        },
    },
    onLuu: function(){
        var viewModel = this.getViewModel();
        var row = viewModel.get('row');
        var space = viewModel.get('space');
        var floor = viewModel.get('floor');

        if(row == null || space == null || floor == null){
            Ext.toast('Cần lựa chọn đủ thông tin', 1000);
        }else{
            var obj = new Object();
            obj.row = row;
            obj.space = space;
            obj.floor = floor;
            this.fireEvent('Luu', obj);
        }
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
    loadInfo: function(){
        var viewModel = this.getViewModel();
        var day = viewModel.get('day');
        viewModel.set('dayStore', day);
    },
    onRowChange: function(cbbox, newValue, oldValue, eOpts){
        // load hang
        var viewModel = this.getViewModel();
        var hang = viewModel.get('hang');
        var hangStore = new Array();

        for(var i = 0; i < hang.length; i++){
            hangStore.push(hang[i]);
        }
        viewModel.set('hangStore', hangStore);

    },
    onSpaceChange: function(cbbox, newValue, oldValue, eOpts){
        // load tang
        var viewModel = this.getViewModel();
        var tang = viewModel.get('tang');
        var tangStore = new Array();

        for(var i = 0; i < tang.length; i++){
            tangStore.push(tang[i]);
        }
        viewModel.set('tangStore', tangStore);
    }
});
