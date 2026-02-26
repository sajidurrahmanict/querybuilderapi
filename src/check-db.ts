import { DataSource } from 'typeorm';

async function checkAndCreateTables() {
    const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: 'Root@pass1',
        database: 'querybuilder',
    });

    try {
        await dataSource.initialize();
        console.log('Connected to DB');

        const tables = await dataSource.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        console.log('Existing tables:', tables.map((t: any) => t.table_name));

        const tableNames = tables.map((t: any) => t.table_name);

        if (!tableNames.includes('countries')) {
            console.log('Creating countries table...');
            await dataSource.query(`
                CREATE TABLE countries (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    code VARCHAR(10) NOT NULL,
                    currency VARCHAR(50)
                )
            `);
            await dataSource.query(`
                INSERT INTO countries (name, code, currency) VALUES
                ('United States', 'US', 'USD'),
                ('United Kingdom', 'UK', 'GBP'),
                ('Canada', 'CA', 'CAD')
            `);
        }

        if (!tableNames.includes('customers')) {
            console.log('Creating customers table...');
            await dataSource.query(`
                CREATE TABLE customers (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    phone VARCHAR(50),
                    address TEXT,
                    city VARCHAR(100),
                    country_id INTEGER REFERENCES countries(id),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);
            await dataSource.query(`
                INSERT INTO customers (name, email, phone, address, city, country_id) VALUES
                ('John Doe', 'john@example.com', '123-456-7890', '123 Main St', 'New York', 1),
                ('Jane Smith', 'jane@example.com', '987-654-3210', '456 Oak Ave', 'London', 2),
                ('Bob Johnson', 'bob@example.com', '555-555-5555', '789 Pine Rd', 'Toronto', 3)
            `);
        }

        console.log('Check complete.');
    } catch (err) {
        console.error('Error during DB check:', err);
    } finally {
        await dataSource.destroy();
    }
}

checkAndCreateTables();
