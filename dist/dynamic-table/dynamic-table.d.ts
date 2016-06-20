import { ViewStrategy } from 'aurelia-framework';
export interface TableDefinition {
    columns: ColumnDefinition[];
}
export interface ColumnDefinition {
    caption: string;
    propertyName?: string;
}
export declare class DynamicTable {
    viewStrategy: ViewStrategy;
    tableDefinition: TableDefinition;
    tableData: any[];
    bind(bindingContext: any, overrideContext: any): void;
}
