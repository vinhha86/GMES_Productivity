Ext.define('GSmartApp.view.pcontract.PContractView', {
    extend: 'Ext.form.Panel',
    xtype: 'PContractView',
    id: 'PContractView',
    controller: 'PContractViewController',
    viewModel: {
        type: 'PContractViewModel'
    },
    IdPContract: 0,
    layout: 'border',
    height: 500,
    items: [{
        region: 'north',
        height: 115,
        border: true,
        xtype: 'PContractInfoView',
        margin: 1
    }, {
        region: 'center',
        border: true,
        margin: 1,
        xtype: 'tabpanel',
        itemId:'tabmain',
        items: [{
            title: 'Danh sách sản phẩm',
            layout: 'border',
            items: [{
                region: 'center',
                margin: 1,
                // border: true,
                layout: 'border',
                items: [{
                    region: 'center',
                    xtype: 'PContractAttributeView',
                    margin: 1,
                    border: true
                }, {
                    region: 'west',
                    width: '65%',
                    layout: 'border',
                    items:[
                        {
                            region: 'center',
                            margin: 1,
                            border: true,
                            xtype: 'PContractListProductView',
                        },
                        {
                            region: 'south',
                            margin: 1,
                            height: 200,
                            layout: 'border',
                            items: [{
                                region: 'center',
                                xtype: 'PContractDocumentView',
                                border: true,
                                margin: 1
                            }, {
                                region: 'east',
                                width: '50%',
                                margin: 1,
                                border: true,
                                xtype: 'PContractPairProductView'
                            }]
                        }         
                    ]

                }]
            }]
        }, {
            title: 'Giao hàng - Chào giá',
            xtype: 'PContract_PO_Main'
        },{
            title: 'Chi tiết màu,cỡ',
            xtype: 'PContractSKUMainView'
        },{
            title: 'Nguyên phụ liệu',
            xtype: 'PContractProductBomView'
        }, {
            title: 'Định mức hải quan',
            xtype: 'PContractProduct_Bom_TabColorView'
        }, {
            title: 'Định mức cân đối',
            xtype: 'PContractProduct_Bom2_TabColorView'
        },{
            title: 'Lệnh sản xuất',
            xtype: 'POrderCreating_New_View'
        }]
    }],
    dockedItems: [{
        layout: 'hbox',
        reference: 'dockBottomBar',
        border: false,
        dock: 'bottom',
        items: [{
            xtype: 'button',
            text: 'Quay lại',
            margin: 1,
            itemId: 'btnQuayLai',
            iconCls: 'x-fa fa-backward'
        }, {
            flex: 1,
            border: false
        }, {
            xtype: 'button',
            text: 'Chốt đơn',
            margin: 1,
            itemId: 'btnConfirm',
            iconCls: 'x-fa fa-handshake-o',
            // formBind: true
        },{
            xtype: 'button',
            text: 'Tạo đơn',
            margin: 1,
            itemId: 'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        }]
    }]
})