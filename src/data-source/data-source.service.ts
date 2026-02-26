import { Injectable } from '@nestjs/common';

export interface Column {
    name: string;
    type: string;
    nullable: boolean;
}

export interface ForeignKey {
    foreignTable: string;
    foreignColumn: string;
    localColumn: string;
}

export interface DataSource {
    id: string;
    name: string;
    schema_name: string;
    type: string;
    app: string;
    group: string;
    columns: Column[];
    foreignKeys?: ForeignKey[];
}

@Injectable()
export class DataSourceService {
    private readonly testDataSources: DataSource[] = [
        {
            id: '1',
            name: 'customers',
            schema_name: 'public',
            type: 'table',
            app: 'CRM',
            group: 'Management',
            columns: [
                { name: 'id', type: 'integer', nullable: false },
                { name: 'name', type: 'varchar', nullable: false },
                { name: 'email', type: 'varchar', nullable: false },
                { name: 'phone', type: 'varchar', nullable: true },
                { name: 'address', type: 'text', nullable: true },
                { name: 'city', type: 'varchar', nullable: true },
                { name: 'country_id', type: 'integer', nullable: true },
                { name: 'created_at', type: 'timestamp', nullable: false },
            ],
            foreignKeys: [
                { foreignTable: 'countries', foreignColumn: 'id', localColumn: 'country_id' },
            ],
        },
        {
            id: '2',
            name: 'orders',
            schema_name: 'public',
            type: 'table',
            app: 'Commerce',
            group: 'Sales',
            columns: [
                { name: 'id', type: 'integer', nullable: false },
                { name: 'customer_id', type: 'integer', nullable: false },
                { name: 'order_date', type: 'date', nullable: false },
                { name: 'total_amount', type: 'decimal', nullable: false },
                { name: 'status', type: 'varchar', nullable: false },
                { name: 'shipping_address', type: 'text', nullable: true },
                { name: 'payment_method_id', type: 'integer', nullable: true },
            ],
            foreignKeys: [
                { foreignTable: 'customers', foreignColumn: 'id', localColumn: 'customer_id' },
                { foreignTable: 'payment_methods', foreignColumn: 'id', localColumn: 'payment_method_id' },
            ],
        },
        {
            id: '3',
            name: 'products',
            schema_name: 'public',
            type: 'table',
            app: 'Commerce',
            group: 'Inventory',
            columns: [
                { name: 'id', type: 'integer', nullable: false },
                { name: 'name', type: 'varchar', nullable: false },
                { name: 'description', type: 'text', nullable: true },
                { name: 'price', type: 'decimal', nullable: false },
                { name: 'stock', type: 'integer', nullable: false },
                { name: 'category_id', type: 'integer', nullable: true },
                { name: 'supplier_id', type: 'integer', nullable: true },
                { name: 'sku', type: 'varchar', nullable: false },
            ],
            foreignKeys: [
                { foreignTable: 'categories', foreignColumn: 'id', localColumn: 'category_id' },
                { foreignTable: 'suppliers', foreignColumn: 'id', localColumn: 'supplier_id' },
            ],
        },
        {
            id: '4',
            name: 'order_items',
            schema_name: 'public',
            type: 'table',
            app: 'Commerce',
            group: 'Sales',
            columns: [
                { name: 'id', type: 'integer', nullable: false },
                { name: 'order_id', type: 'integer', nullable: false },
                { name: 'product_id', type: 'integer', nullable: false },
                { name: 'quantity', type: 'integer', nullable: false },
                { name: 'price', type: 'decimal', nullable: false },
                { name: 'discount', type: 'decimal', nullable: true },
            ],
            foreignKeys: [
                { foreignTable: 'orders', foreignColumn: 'id', localColumn: 'order_id' },
                { foreignTable: 'products', foreignColumn: 'id', localColumn: 'product_id' },
            ],
        },
        {
            id: '5',
            name: 'categories',
            schema_name: 'public',
            type: 'table',
            app: 'Commerce',
            group: 'Inventory',
            columns: [
                { name: 'id', type: 'integer', nullable: false },
                { name: 'name', type: 'varchar', nullable: false },
                { name: 'description', type: 'text', nullable: true },
                { name: 'parent_category_id', type: 'integer', nullable: true },
            ],
            foreignKeys: [
                { foreignTable: 'categories', foreignColumn: 'id', localColumn: 'parent_category_id' },
            ],
        },
        {
            id: '6',
            name: 'suppliers',
            schema_name: 'public',
            type: 'table',
            app: 'Commerce',
            group: 'Inventory',
            columns: [
                { name: 'id', type: 'integer', nullable: false },
                { name: 'name', type: 'varchar', nullable: false },
                { name: 'contact_person', type: 'varchar', nullable: true },
                { name: 'email', type: 'varchar', nullable: false },
                { name: 'phone', type: 'varchar', nullable: true },
                { name: 'country_id', type: 'integer', nullable: true },
            ],
            foreignKeys: [
                { foreignTable: 'countries', foreignColumn: 'id', localColumn: 'country_id' },
            ],
        },
        {
            id: '7',
            name: 'countries',
            schema_name: 'public',
            type: 'table',
            app: 'CRM',
            group: 'Management',
            columns: [
                { name: 'id', type: 'integer', nullable: false },
                { name: 'name', type: 'varchar', nullable: false },
                { name: 'code', type: 'varchar', nullable: false },
                { name: 'currency', type: 'varchar', nullable: true },
            ],
        },
        {
            id: '8',
            name: 'payment_methods',
            schema_name: 'public',
            type: 'table',
            app: 'Commerce',
            group: 'Sales',
            columns: [
                { name: 'id', type: 'integer', nullable: false },
                { name: 'name', type: 'varchar', nullable: false },
                { name: 'description', type: 'text', nullable: true },
                { name: 'active', type: 'boolean', nullable: false },
            ],
        },
        {
            id: '9',
            name: 'employees',
            schema_name: 'public',
            type: 'table',
            app: 'HRMS',
            group: 'Management',
            columns: [
                { name: 'id', type: 'integer', nullable: false },
                { name: 'first_name', type: 'varchar', nullable: false },
                { name: 'last_name', type: 'varchar', nullable: false },
                { name: 'email', type: 'varchar', nullable: false },
                { name: 'department_id', type: 'integer', nullable: true },
                { name: 'manager_id', type: 'integer', nullable: true },
                { name: 'hire_date', type: 'date', nullable: false },
            ],
            foreignKeys: [
                { foreignTable: 'departments', foreignColumn: 'id', localColumn: 'department_id' },
                { foreignTable: 'employees', foreignColumn: 'id', localColumn: 'manager_id' },
            ],
        },
        {
            id: '10',
            name: 'departments',
            schema_name: 'public',
            type: 'table',
            app: 'HRMS',
            group: 'Management',
            columns: [
                { name: 'id', type: 'integer', nullable: false },
                { name: 'name', type: 'varchar', nullable: false },
                { name: 'description', type: 'text', nullable: true },
                { name: 'manager_id', type: 'integer', nullable: true },
            ],
            foreignKeys: [
                { foreignTable: 'employees', foreignColumn: 'id', localColumn: 'manager_id' },
            ],
        },
        {
            id: '11',
            name: 'reviews',
            schema_name: 'public',
            type: 'table',
            app: 'Commerce',
            group: 'Sales',
            columns: [
                { name: 'id', type: 'integer', nullable: false },
                { name: 'product_id', type: 'integer', nullable: false },
                { name: 'customer_id', type: 'integer', nullable: false },
                { name: 'rating', type: 'integer', nullable: false },
                { name: 'comment', type: 'text', nullable: true },
                { name: 'created_at', type: 'timestamp', nullable: false },
            ],
            foreignKeys: [
                { foreignTable: 'products', foreignColumn: 'id', localColumn: 'product_id' },
                { foreignTable: 'customers', foreignColumn: 'id', localColumn: 'customer_id' },
            ],
        },
        {
            id: '12',
            name: 'shipments',
            schema_name: 'public',
            type: 'table',
            app: 'Commerce',
            group: 'Sales',
            columns: [
                { name: 'id', type: 'integer', nullable: false },
                { name: 'order_id', type: 'integer', nullable: false },
                { name: 'tracking_number', type: 'varchar', nullable: true },
                { name: 'shipped_date', type: 'date', nullable: true },
                { name: 'delivery_date', type: 'date', nullable: true },
                { name: 'carrier', type: 'varchar', nullable: true },
            ],
            foreignKeys: [
                { foreignTable: 'orders', foreignColumn: 'id', localColumn: 'order_id' },
            ],
        },
    ];

    getNormalizedData() {
        const apps: any[] = Array.from(new Set(this.testDataSources.map(ds => ds.app))).map(name => ({
            id: name.toLowerCase().replace(/\s+/g, '-'),
            name,
        }));

        const groups: any[] = [];
        const processedGroups = new Set();

        this.testDataSources.forEach(ds => {
            const groupKey = `${ds.app}:${ds.group}`;
            if (!processedGroups.has(groupKey)) {
                groups.push({
                    id: groupKey.toLowerCase().replace(/[:\s]+/g, '-'),
                    name: ds.group,
                    appId: ds.app.toLowerCase().replace(/\s+/g, '-'),
                });
                processedGroups.add(groupKey);
            }
        });

        const dataSources: any[] = this.testDataSources.map(ds => ({
            id: ds.id,
            name: ds.name,
            schemaName: ds.schema_name,
            type: ds.type,
            groupId: `${ds.app}:${ds.group}`.toLowerCase().replace(/[:\s]+/g, '-'),
        }));

        const columns: any[] = [];
        this.testDataSources.forEach(ds => {
            ds.columns.forEach((col, index) => {
                columns.push({
                    id: `${ds.id}-${col.name}`,
                    dataSourceId: ds.id,
                    name: col.name,
                    type: col.type,
                    nullable: col.nullable,
                    position: index,
                });
            });
        });

        const relations: any[] = [];
        this.testDataSources.forEach(ds => {
            if (ds.foreignKeys) {
                ds.foreignKeys.forEach((fk, index) => {
                    relations.push({
                        id: `rel-${ds.id}-${index}`,
                        localDataSourceId: ds.id,
                        localColumn: fk.localColumn,
                        foreignDataSourceName: fk.foreignTable,
                        foreignColumn: fk.foreignColumn,
                    });
                });
            }
        });

        return {
            apps,
            groups,
            dataSources,
            columns,
            relations,
        };
    }
}
