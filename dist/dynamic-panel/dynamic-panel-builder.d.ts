import { PropertyDescriptor } from 'typescript-rtti';
import { PanelDefinition } from './dynamic-panel';
export declare class PanelDefinitionBuilder {
    private tableDefinition;
    withPropertyItem(propertyDescriptor: PropertyDescriptor, caption: string): this;
    build(): PanelDefinition;
}
