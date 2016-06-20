System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var PanelDefinitionBuilder;
    return {
        setters:[],
        execute: function() {
            PanelDefinitionBuilder = (function () {
                function PanelDefinitionBuilder() {
                    this.tableDefinition = { items: [] };
                }
                PanelDefinitionBuilder.prototype.withPropertyItem = function (propertyDescriptor, caption) {
                    this.tableDefinition.items.push({
                        caption: caption,
                        propertyName: propertyDescriptor.name
                    });
                    return this;
                };
                PanelDefinitionBuilder.prototype.build = function () {
                    return this.tableDefinition;
                };
                return PanelDefinitionBuilder;
            }());
            exports_1("PanelDefinitionBuilder", PanelDefinitionBuilder);
        }
    }
});
