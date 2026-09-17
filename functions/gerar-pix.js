/**
 * Netlify Serverless Function - Gerar PIX
 * POST /.netlify/functions/gerar-pix
 * 
 * Request body:
 * {
 *   "nome": "João Silva",
 *   "cpf": "12345678901",
 *   "codigoAcordo": "ABC123"
 * }
 */

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only accept POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    let body;
    try {
      body = JSON.parse(event.body);
    } catch {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON' })
      };
    }

    const { nome, cpf, codigoAcordo } = body;

    // Validações básicas
    if (!nome || !cpf || !codigoAcordo) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Nome, CPF e codigoAcordo são obrigatórios' })
      };
    }

    const cpfPuro = cpf.replace(/\D/g, '');
    if (cpfPuro.length !== 11) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'CPF inválido' })
      };
    }

    // Chave segura via variável de ambiente
    const apiKey = process.env.AVEN_API_KEY;
    if (!apiKey) {
      console.error('AVEN_API_KEY não configurada');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Chave de API não configurada' })
      };
    }

    // Montar payload para Aven Payments
    const payload = {
      amount: 6892, // R$ 68,92 em centavos
      currency: 'BRL',
      method: 'PIX',
      description: 'loja 05',
      externalRef: codigoAcordo,
      payer: {
        name: nome,
        taxId: cpfPuro,
        email: 'cliente@brasil.com',
        phone: '11999990000'
      },
      items: [{
        quantity: 1,
        name: 'Loja livro falante',
        price: 6892,
        type: 'DIGITAL'
      }]
    };

    // Chamar Aven Payments API
    const response = await fetch('https://api.avenpayments.com/v1/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Aven API Error:', data);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({
          error: data.message || 'Erro ao gerar PIX',
          details: data.details
        })
      };
    }

    // Retornar dados do PIX para o frontend
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        id: data.id,
        status: data.status,
        amount: data.amount,
        copypaste: data.data.copypaste,
        e2e: data.data.e2e || null,
        createdAt: data.createdAt
      })
    };

  } catch (error) {
    console.error('Erro na função gerar-pix:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Erro interno do servidor',
        message: error.message
      })
    };
  }
};
