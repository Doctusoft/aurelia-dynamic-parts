System.register(['aurelia-framework'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var aurelia_framework_1;
    var DynamicPanel;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }],
        execute: function() {
            DynamicPanel = (function () {
                function DynamicPanel() {
                }
                DynamicPanel.prototype.bind = function (bindingContext, overrideContext) {
                    var template = '<template><div class="dynamic-panel">';
                    if (this.panelDefinition.caption) {
                        template += '<div class="dynamic-panel-caption">' + this.panelDefinition.caption + '</div>';
                    }
                    this.panelDefinition.items.forEach(function (item) {
                        template +=
                            '<div class="dynamic-panel-item">' +
                                '  <div class="item-label">' + item.caption + '</div>' +
                                '  <div class="item-value">${panelData.' + item.propertyName + '}</div>' +
                                '</div>';
                    });
                    template += '</div></template>';
                    this.viewStrategy = new aurelia_framework_1.InlineViewStrategy(template);
                };
                __decorate([
                    aurelia_framework_1.bindable, 
                    __metadata('design:type', Object)
                ], DynamicPanel.prototype, "panelDefinition", void 0);
                __decorate([
                    aurelia_framework_1.bindable, 
                    __metadata('design:type', Object)
                ], DynamicPanel.prototype, "panelData", void 0);
                DynamicPanel = __decorate([
                    aurelia_framework_1.inlineView('<template><compose view.bind="viewStrategy"></compose></template>'), 
                    __metadata('design:paramtypes', [])
                ], DynamicPanel);
                return DynamicPanel;
            }());
            exports_1("DynamicPanel", DynamicPanel);
        }
    }
});
