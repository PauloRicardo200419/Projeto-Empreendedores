import { NextResponse } from 'next/server';
import { supabase } from '../../../src/utils/supabase';

export async function GET() {
  try {
    const { data, error, status } = await supabase
      .from('leads')
      .insert([
        {
          nome: 'Teste de Diagnostico',
          email: `teste-${Date.now()}@exemplo.com`,
          quantidade_propriedades: '1',
          duvidas_frequentes: ['teste']
        }
      ]);

    return NextResponse.json({
      supabase_url_used: process.env.NEXT_PUBLIC_SUPABASE_URL,
      insert_result: { data, error, status },
      message: "Se error for null, a inserção funcionou. Verifique o banco."
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message, stack: err.stack });
  }
}
