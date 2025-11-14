-- Tabela de Planos
CREATE TABLE IF NOT EXISTS plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price_monthly NUMERIC(10, 2) NOT NULL,
    price_annually NUMERIC(10, 2) NOT NULL,
    features TEXT[]
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_plans_name ON plans (name);

-- Inserir os planos padrão (idempotente)
INSERT INTO plans (name, price_monthly, price_annually, features) VALUES
('Básico', 49.00, 490.00, ARRAY['Gestão de cardápio', 'Recebimento de pedidos', 'Suporte por e-mail', 'Análise básica'])
ON CONFLICT (name) DO NOTHING;

INSERT INTO plans (name, price_monthly, price_annually, features) VALUES
('Premium', 99.00, 990.00, ARRAY['Tudo do plano Básico', 'Notificações via WhatsApp', 'Programa de fidelidade', 'Análise avançada', 'Suporte prioritário'])
ON CONFLICT (name) DO NOTHING;

-- Tabela de Estabelecimentos
CREATE TABLE IF NOT EXISTS establishments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    plan_id INTEGER REFERENCES plans(id),
    registered TIMESTAMPTZ DEFAULT NOW(),
    status VARCHAR(50) NOT NULL,
    address VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    phone VARCHAR(50),
    logo_url VARCHAR(255)
);

-- Tabela de Planos Personalizados
CREATE TABLE IF NOT EXISTS custom_plans (
    id SERIAL PRIMARY KEY,
    price NUMERIC(10, 2) NOT NULL,
    billing_cycle VARCHAR(50) NOT NULL,
    establishment_id INTEGER REFERENCES establishments(id)
);

-- Tabela de Usuários (para donos de estabelecimentos)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    establishment_id INTEGER REFERENCES establishments(id)
);

-- Tabela de Super Admins
CREATE TABLE IF NOT EXISTS super_admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

-- Tabela de Clientes
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    password_hash VARCHAR(255) NOT NULL
);

-- Tabela de Endereços de Clientes
CREATE TABLE IF NOT EXISTS customer_addresses (
    id SERIAL PRIMARY KEY,
    customer_id UUID REFERENCES customers(id),
    street VARCHAR(255) NOT NULL,
    number VARCHAR(50),
    complement VARCHAR(255),
    neighborhood VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zip_code VARCHAR(10) NOT NULL
);

-- Tabela de Categorias de Produtos
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(255),
    establishment_id INTEGER REFERENCES establishments(id)
);

ALTER TABLE categories ADD COLUMN IF NOT EXISTS icon VARCHAR(255);

-- Tabela de Produtos
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    image_url VARCHAR(255),
    category_id INTEGER REFERENCES categories(id),
    establishment_id INTEGER REFERENCES establishments(id)
);

-- Tabela de Pedidos
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customer_id UUID REFERENCES customers(id),
    establishment_id INTEGER REFERENCES establishments(id),
    address_id INTEGER REFERENCES customer_addresses(id),
    total_price NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de Itens do Pedido
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS addons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    establishment_id INTEGER REFERENCES establishments(id)
);

CREATE TABLE IF NOT EXISTS product_addons (
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    addon_id INTEGER REFERENCES addons(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, addon_id)
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE establishments ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE addons ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'categories' AND policyname = 'select_categories_public'
    ) THEN
        CREATE POLICY select_categories_public ON categories FOR SELECT TO anon, authenticated USING (true);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'products' AND policyname = 'select_products_public'
    ) THEN
        CREATE POLICY select_products_public ON products FOR SELECT TO anon, authenticated USING (true);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'establishments' AND policyname = 'select_establishments_public'
    ) THEN
        CREATE POLICY select_establishments_public ON establishments FOR SELECT TO anon, authenticated USING (true);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'plans' AND policyname = 'select_plans_public'
    ) THEN
        CREATE POLICY select_plans_public ON plans FOR SELECT TO anon, authenticated USING (true);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'addons' AND policyname = 'select_addons_public'
    ) THEN
        CREATE POLICY select_addons_public ON addons FOR SELECT TO anon, authenticated USING (true);
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_products_category_id ON products (category_id);
CREATE INDEX IF NOT EXISTS idx_products_establishment_id ON products (establishment_id);
CREATE INDEX IF NOT EXISTS idx_categories_establishment_id ON categories (establishment_id);
CREATE INDEX IF NOT EXISTS idx_addons_establishment_id ON addons (establishment_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items (order_id);
CREATE INDEX IF NOT EXISTS idx_orders_establishment_id ON orders (establishment_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders (customer_id);
