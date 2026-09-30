import { NextResponse } from 'next/server';
import { supabase } from '../../src/utils/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, quantidade_propriedades, duvidas_frequentes } = body;

    // 1. Validação simples
    if (!nome || !email || !quantidade_propriedades || !duvidas_frequentes || duvidas_frequentes.length === 0) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios e devem ser preenchidos.' },
        { status: 400 }
      );
    }

    // 2. Inserção no Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          nome,
          email,
          quantidade_propriedades,
          duvidas_frequentes,
        },
      ])
      .select();

    if (error) {
      // Se for violação de unique (e-mail já cadastrado)
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Este e-mail já está cadastrado na nossa lista de espera.' },
          { status: 400 }
        );
      }
      
      console.error('Erro ao inserir lead no Supabase:', error);
      return NextResponse.json(
        { error: 'Erro interno ao processar sua solicitação.' },
        { status: 500 }
      );
    }

    // 3. Sucesso
    return NextResponse.json(
      { message: 'Lead capturado com sucesso!', lead: data },
      { status: 200 }
    );

  } catch (err) {
    console.error('Falha inesperada:', err);
    return NextResponse.json(
      { error: 'Erro interno no servidor.' },
      { status: 500 }
    );
  }
}
