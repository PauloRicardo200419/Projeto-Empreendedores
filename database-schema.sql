-- 1. Criar a tabela de Leads
CREATE TABLE public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    quantidade_propriedades VARCHAR(50) NOT NULL,
    duvidas_frequentes JSONB NOT NULL
);

-- 2. Habilitar o Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 3. Criar Política de Inserção Anônima
-- Permite que qualquer pessoa (anon) insira dados no formulário
CREATE POLICY "Permitir inserção anônima de leads"
ON public.leads
FOR INSERT
TO anon
WITH CHECK (true);

-- 4. Criar Política de Leitura Restrita
-- Garante que apenas usuários autenticados (o dono/admin) possam ver os leads
CREATE POLICY "Apenas administradores podem ler leads"
ON public.leads
FOR SELECT
TO authenticated
USING (true);
