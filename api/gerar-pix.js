/**
 * Vercel Serverless Function - Gerar PIX
 * POST /api/gerar-pix
 * 
 * Request body:
 * {
 *   "nome": "João Silva",
 *   "cpf": "12345678901",
 *   "codigoAcordo": "ABC123"
 * }
 */

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { nome, cpf, codigoAcordo } = req.body;

    // Validações básicas
    if (!nome || !cpf || !codigoAcordo) {
      return res.status(400).json({ error: 'Nome, CPF e codigoAcordo são obrigatórios' });
    }

    const cpfPuro = cpf.replace(/\D/g, '');
    if (cpfPuro.length !== 11) {
      return res.status(400).json({ error: 'CPF inválido' });
    }

    // Chave segura via variável de ambiente
    const apiKey = process.env.AVEN_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Chave de API não configurada' });
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
      return res.status(response.status).json({ 
        error: data.message || 'Erro ao gerar PIX',
        details: data.details
      });
    }

    // Retornar dados do PIX para o frontend
    return res.status(200).json({
      id: data.id,
      status: data.status,
      amount: data.amount,
      copypaste: data.data.copypaste,
      e2e: data.data.e2e || null,
      createdAt: data.createdAt
    });

  } catch (error) {
    console.error('Erro na função gerar-pix:', error);
    return res.status(500).json({ 
      error: 'Erro interno do servidor',
      message: error.message 
    });
  }
}
