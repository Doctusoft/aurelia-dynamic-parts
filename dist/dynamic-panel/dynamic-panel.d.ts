import { ViewStrategy } from 'aurelia-framework';
export interface PanelDefinition {
    caption?: string;
    items: PanelItemDefinition[];
}
export interface PanelItemDefinition {
    caption: string;
    propertyName?: string;
}
export declare class DynamicPanel {
    viewStrategy: ViewStrategy;
    panelDefinition: PanelDefinition;
    panelData: any;
    bind(bindingContext: any, overrideContext: any): void;
}
