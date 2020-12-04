Ext.define('GSmartApp.view.porders.POrder_List.POrder_InfoView', {
    extend: 'Ext.form.Panel',
    xtype: 'POrder_InfoView',
    id: 'POrder_InfoView',
    controller: 'POrder_InfoViewController',
    reference: 'POrder_InfoView',
    bodyPadding: 5,
    border: false,
    IdPOrder: 0,
    items: [{
        layout: 'vbox',
        border: false,
        width: '100%',
        items: [{
            layout: 'hbox',
            border: false,
            width: '100%',
            items: [{
                xtype: 'textfield',
                margin: 2,
                fieldLabel: "Mã lệnh",
                allowBlank: false,
                // itemId: 'contractcode',
                blankText: 'Không được để trống',
                bind: {
                    value: '{porder.ordercode}'
                },
                labelWidth: 110,
                flex: 1,
                // width: 250
            },{
                xtype: 'datefield',
                margin: 2,
                reference: 'productiondate_plan',
                fieldLabel: "Ngày vào chuyền",
                allowBlank: false,
                itemId: 'productiondate_plan',
                bind: {
                    value: '{productiondate_plan}'
                },
                format: 'd/m/Y',
                labelWidth: 110,
                flex: 1,
                // width: 250
            },{
                xtype: 'datefield',
                margin: 2,
                reference: 'golivedate',
                fieldLabel: "Ngày giao hàng",
                allowBlank: false,
                itemId: 'golivedate',
                bind: {
                    value: '{golivedate}'
                },
                format: 'd/m/Y',
                labelWidth: 110,
                flex: 1,
                // width: 250
            },{
                xtype:'combobox',
                // itemId:'txtstatus',
                bind:{
                    store:'{POrder_ListStatusStore}',
                    value: '{porder.status}'
                },
                fieldLabel: "Trạng thái",
                displayField: 'name',
                valueField: 'id',
                queryMode: 'local',
                editable: false,
                allowBlank: false,
                margin: 2,
                labelWidth: 110,
                flex: 1,
                // width: 250
            }]
        },{
            layout: 'hbox',
            border: false,
            width: '100%',
            items: [{
                xtype: 'textfield',
                margin: 2,
                fieldLabel: "Mã Buyer",
                allowBlank: false,
                // itemId: 'contractcode',
                blankText: 'Không được để trống',
                bind: {
                    value: '{porder.stylebuyer}'
                },
                labelWidth: 110,
                flex: 1,
                // width: 250
            },{
                xtype: 'textfield',
                margin: 2,
                fieldLabel: "Tên sản phẩm",
                allowBlank: false,
                // itemId: 'contractcode',
                blankText: 'Không được để trống',
                bind: {
                    value: '{porder.productname}'
                },
                labelWidth: 110,
                flex: 1,
                // width: 250
            },{
                xtype: 'textfield',
                margin: 2,
                fieldLabel: "SL yêu cầu",
                // allowBlank: false,
                // itemId: 'contractcode',
                blankText: 'Không được để trống',
                maskRe: /[0-9]/,
                fieldStyle: 'text-align:right;',
                vtype: 'dollar',
                bind: {
                    value: '{porder.totalorder_req}'
                },
                labelWidth: 110,
                flex: 1,
                // width: 250
            },{
                xtype: 'textfield',
                margin: 2,
                fieldLabel: "SL phân lệnh",
                allowBlank: false,
                // itemId: 'contractcode',
                blankText: 'Không được để trống',
                maskRe: /[0-9]/,
                fieldStyle: 'text-align:right;',
                vtype: 'dollar',
                bind: {
                    value: '{porder.totalorder}'
                },
                labelWidth: 110,
                flex: 1,
                // width: 250
            }]
        },{
            layout: 'hbox',
            border: false,
            width: '100%',
            items: [{
                xtype: 'textfield',
                margin: 2,
                fieldLabel: "PO Buyer",
                allowBlank: false,
                // itemId: 'contractcode',
                blankText: 'Không được để trống',
                bind: {
                    value: '{porder.po_buyer}'
                },
                labelWidth: 110,
                flex: 1,
                // width: 250
            },{
                xtype: 'textfield',
                margin: 2,
                fieldLabel: "Tên Buyer",
                allowBlank: false,
                // itemId: 'contractcode',
                blankText: 'Không được để trống',
                bind: {
                    value: '{porder.buyername}'
                },
                labelWidth: 110,
                flex: 1,
                // width: 250
            },{
                xtype: 'textfield',
                margin: 2,
                fieldLabel: "PO Vendor",
                allowBlank: false,
                // itemId: 'contractcode',
                blankText: 'Không được để trống',
                bind: {
                    value: '{porder.po_vendor}'
                },
                labelWidth: 110,
                flex: 1,
                // width: 250
            },{
                xtype: 'textfield',
                margin: 2,
                fieldLabel: "Tên Vendor",
                allowBlank: false,
                // itemId: 'contractcode',
                blankText: 'Không được để trống',
                bind: {
                    value: '{porder.vendorname}'
                },
                labelWidth: 110,
                flex: 1,
                // width: 250
            }]
        }]
    }]
})