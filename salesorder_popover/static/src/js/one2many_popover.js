odoo.define('salesorder_popover.salesorder_popover', function (require) {
    "use strict";
    var ListRenderer = require("web.ListRenderer");
    ListRenderer.include({
        init: function () {
            this._super.apply(this, arguments);            
        },
        // Mouse Events
        events: _.extend({}, ListRenderer.prototype.events, {
            'mouseover tbody td.o_data_cell': '_onOne2ManyMouseOver',
            'mouseout tbody td.o_data_cell': '_onOne2ManyMouseOut',            
        }),
        // Mouser Hover event for the Pop Over
        _onOne2ManyMouseOver: function (event) {

            event.stopPropagation();
            event.preventDefault();
            
            var self = this;
            if (self.state.model=='sale.order.line'){
                var $td = $(event.currentTarget);
                var $tr = $td.parent();
                var rowIndex = this.$('.o_data_row').index($tr); 
                
               
                this.$el.find('tbody').popover('dispose');             
                this.$el.find('tbody').popover(
                    {
                        
                        animation: true,
                        'content': function(e){                        
                          
                                return '<div style="height:100%; width:auto;"><h2 style="background-color: #4CAF50;color: white;">'+self.state.data[rowIndex].data.name+'</h2>'+
                                        '<table>'+  
                                        ' <tr>'+
                                        ' <td>Ordered Qty:</td>'+
                                        ' <td>'+ self.state.data[rowIndex].data.product_uom_qty +'</td>'+   
                                        ' </tr>'+
                                        '<tr>'+
                                        ' <td>Delivered Qty:</td>'+
                                        ' <td>'+ self.state.data[rowIndex].data.qty_delivered +'</td>'+  
                                        ' </tr>'+
                                        ' <tr>'+
                                        ' <td>Unit Price:</td>'+
                                            ' <td>'+ self.state.data[rowIndex].data.price_unit +'</td>'+  
                                        ' </tr>'+
                                        '<tr>'+
                                        ' <td>Sub Total:</td>'+
                                            ' <td>'+ self.state.data[rowIndex].data.price_subtotal +'</td>'+  
                                        '</tr>'+
                                        '</table></div>'
                            
                        },
                        'html': true,
                        'placement':  function(c,s){
                            return $(s).position().top < 200 ?'bottom':'top'
                        },
                        'trigger': 'hover',
                        
                    })

                this.$el.find('tbody').popover('show');
              
            }                 
                
        },
        // Mouser Out event 
        _onOne2ManyMouseOut: function (event) {

            var self = this;
            
            if (self.state.model=='sale.order.line'){                                
                $('div.popover').remove();
                //console.log("Remove ----");
            }
            
        },        
       
    });  
    
   
});