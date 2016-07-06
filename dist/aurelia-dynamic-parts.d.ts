declare module "aurelia-dynamic-parts" {
    import { ViewStrategy } from 'aurelia-framework';
    import { PropertyDescriptor } from 'typescript-rtti';
    export interface PanelDefinition {
        caption?: string;
        items: PanelItemDefinition[];
    }
    export interface PanelItemDefinition {
        caption: string;
        propertyName?: string;
        template?: string;
    }
    export class DynamicPanel {
        viewStrategy: ViewStrategy;
        panelDefinition: PanelDefinition;
        panelData: any;
        outerController: any;
        bind(bindingContext: any, overrideContext: any): void;
    }
    export class PanelDefinitionBuilder {
        private tableDefinition;
        withPropertyItem(propertyDescriptor: PropertyDescriptor, caption: string): this;
        withTemplateItem(template: string, caption: string): this;
        build(): PanelDefinition;
    }
    export interface TableDefinition {
        columns: ColumnDefinition[];
        rowStyleClass?: string;
    }
    export interface ColumnDefinition {
        caption: string;
        propertyName?: string;
        template?: string;
    }
    export class DynamicTable {
        viewStrategy: ViewStrategy;
        tableDefinition: TableDefinition;
        tableData: any[];
        outerController: any;
        bind(bindingContext: any, overrideContext: any): void;
    }
    export class TableDefinitionBuilder {
        private tableDefinition;
        withPropertyColumn(propertyDescriptor: PropertyDescriptor, caption: string): this;
        withTemplateColumn(template: string, caption: string): this;
        build(): TableDefinition;
    }
}
