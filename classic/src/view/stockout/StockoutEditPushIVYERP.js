Ext.define('GSmartApp.view.pprocess.StockoutEditPushIVYERP', {
    extend: 'Ext.window.Window',
    xtype: 'stockoutedit_pushivyerp',
    requires: [
        'Ext.form.field.TextArea'
    ],    
    controller: 'stockoutedit_pushivyerp',
    title: 'Đẩy thông tin sang Lệnh điện tử',
    viewModel: 'stockoutedit_pushivyerp',
    width: 500,
    height: 300,
    layout: 'vbox',
    bodyPadding: 10,
    //resizable: true,
    modal: true,
    items:[
        {
            xtype: 'textfield',
            width: 200,
            textAlign: 'right',
            anchor: '100%',            
            fieldLabel: 'Mã SX:',
            labelAlign: 'left',
            labelWidth: 60,
            bind: '{ordercode}',
        },
        {
            xtype: 'container',
            flex: 1,
            // layout: 'hbox',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'grid',
                    reference: 'grd_PushERPSku',
                    // selModel:{
                    //     selType:'cellmodel'
                    // },
                    border: true,
                    width: 130,
                    bind: '{listStockout}',
                    viewConfig: {
                        enableTextSelection: true,
                        stripeRows: false
                    },   
                    columns: [
                        { header: 'Thẻ vải chính', dataIndex: 'mainskucode', flex: 1}                     
                    ],
                    listeners: {
                        selectionchange: 'onSelectSku'
                    }
                },
                {
                    xtype: 'panel',
                    width: 10
                },
                {
                    xtype: 'textareafield',
                    reference: 'txt_PushERPComment',
                    width: 330,
                    listeners: {
                        focusleave: 'onUpdateComment'
                    }
                }                  
            ]
      
        }
    ],
    fbar: [{
        minWidth: 80,
        text: 'Xác nhận',
        handler: 'onPushERPButton'
    }, {
        minWidth: 80,
        text: 'Đóng',
        handler: 'onCloseButton'
    }],
    listeners: {
        activate: 'onActivate'
    } 
});
