declare module "dynamic-panel/dynamic-panel" {
    import { ViewStrategy } from 'aurelia-framework';
    export interface PanelDefinition {
        caption?: string;
        items: PanelItemDefinition[];
    }
    export interface PanelItemDefinition {
        caption: string;
        propertyName?: string;
    }
    export class DynamicPanel {
        viewStrategy: ViewStrategy;
        panelDefinition: PanelDefinition;
        panelData: any;
        bind(bindingContext: any, overrideContext: any): void;
    }
}
declare module "dynamic-panel/dynamic-panel-builder" {
    import { PropertyDescriptor } from 'typescript-rtti';
    import { PanelDefinition } from "dynamic-panel/dynamic-panel";
    export class PanelDefinitionBuilder {
        private tableDefinition;
        withPropertyItem(propertyDescriptor: PropertyDescriptor, caption: string): this;
        build(): PanelDefinition;
    }
}
declare module "dynamic-table/dynamic-table" {
    import { ViewStrategy } from 'aurelia-framework';
    export interface TableDefinition {
        columns: ColumnDefinition[];
    }
    export interface ColumnDefinition {
        caption: string;
        propertyName?: string;
    }
    export class DynamicTable {
        viewStrategy: ViewStrategy;
        tableDefinition: TableDefinition;
        tableData: any[];
        bind(bindingContext: any, overrideContext: any): void;
    }
}
declare module "dynamic-table/dynamic-table-builder" {
    import { PropertyDescriptor } from 'typescript-rtti';
    import { TableDefinition } from "dynamic-table/dynamic-table";
    export class TableDefinitionBuilder {
        private tableDefinition;
        withPropertyColumn(propertyDescriptor: PropertyDescriptor, caption: string): this;
        build(): TableDefinition;
    }
}
declare module 'aurelia-dynamic-parts' {
    export * from "dynamic-panel/dynamic-panel";
    export * from "dynamic-panel/dynamic-panel-builder";
    export * from "dynamic-table/dynamic-table";
    export * from "dynamic-table/dynamic-table-builder";
}
