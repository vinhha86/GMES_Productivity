Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_D', {
    extend: 'Ext.dataview.DataView',
    xtype: 'Stockin_M_Edit_D',
    itemId: 'Stockin_M_Edit_D',
    // controller: 'Stockin_M_Edit_D_ViewController',
    reference: 'Stockin_M_Edit_D',
    cls: 'Stockin_M_Edit_D',

    itemTpl: new Ext.XTemplate(
        '<tpl for=".">',
            '<div class="content">' +
                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Mã:</b></div>'+
                    '<div class="content1-sub2"><b>{skucode}</b></div>' +
                    // '<div class="content1-sub1">'+
                    //     '<button class="button" type="button">C.tiết</button>'+
                    // '</div>' +
                '</div>' +

                '<div class="content2">'+
                    '<div class="content2-sub1">Mô tả:</div>'+
                    '<div class="content2-sub2"></div>' +
                '</div>' +

                '<div class="content1" style={[this.getDisplayM(values)]}>' +
                    '<div class="content1-sub1" style={[this.getDisplayM(values)]}>Dài phiếu(M):</div>'+
                    '<div class="content1-sub1" style={[this.getDisplayM(values)]}>{totalmet_origin}</div>' +
                    '<div class="content1-sub1" style={[this.getDisplayM(values)]}>Dài kiểm(M):</div>'+
                    '<div class="content1-sub1" style={[this.getDisplayM(values)]}>{totalmet_check}</div>' +
                '</div>' +

                '<div class="content1" style={[this.getDisplayY(values)]}>' +
                    '<div class="content1-sub1" style={[this.getDisplayY(values)]}>Dài phiếu(Y):</div>'+
                    '<div class="content1-sub1" style={[this.getDisplayY(values)]}>{totalydsorigin}</div>' +
                    '<div class="content1-sub1" style={[this.getDisplayY(values)]}>Dài kiểm(Y):</div>'+
                    '<div class="content1-sub1" style={[this.getDisplayY(values)]}>{totalydscheck}</div>' +
                '</div>' +

                '<div class="content2">'+
                    '<div class="content2-sub1">Lot:</div>'+
                    '<div class="content2-sub2">{[this.getStockinDLotUpperCase(values)]}</div>' +
                    // '<div class="content2-sub2">{stockinDLot}</div>' +
                '</div>' +
            '</div>',
        '</tpl>'
        , {
            getDisplayM: function (values) {
                if (values.unitid_link != 1) { // không phải met, ẩn
                    return 'display:none;padding-bottom:0px;';
                }
            },
            getDisplayY: function (values) {
                if (values.unitid_link != 3) { // không phải yds, ẩn
                    return 'display:none;padding-bottom:0px;';
                }
            },
            getStockinDLotUpperCase: function (values) {
                var result = values.stockinDLot == null ? '' : values.stockinDLot.toUpperCase();
                return result;
            },
        }
    ),

    bind: {
        // store:'{stockin.stockin_d}'
        store:'{Stockin_d_Store}'
    },
});