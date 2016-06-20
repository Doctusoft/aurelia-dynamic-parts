import { PropertyDescriptor } from 'typescript-rtti';
import { TableDefinition } from './dynamic-table';
export declare class TableDefinitionBuilder {
    private tableDefinition;
    withPropertyColumn(propertyDescriptor: PropertyDescriptor, caption: string): this;
    build(): TableDefinition;
}
