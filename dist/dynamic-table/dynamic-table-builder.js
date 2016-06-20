System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TableDefinitionBuilder;
    return {
        setters:[],
        execute: function() {
            TableDefinitionBuilder = (function () {
                function TableDefinitionBuilder() {
                    this.tableDefinition = { columns: [] };
                }
                TableDefinitionBuilder.prototype.withPropertyColumn = function (propertyDescriptor, caption) {
                    this.tableDefinition.columns.push({
                        caption: caption,
                        propertyName: propertyDescriptor.name
                    });
                    return this;
                };
                TableDefinitionBuilder.prototype.build = function () {
                    return this.tableDefinition;
                };
                return TableDefinitionBuilder;
            }());
            exports_1("TableDefinitionBuilder", TableDefinitionBuilder);
        }
    }
});
