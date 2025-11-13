// Netlify Function to proxy requests to Google's Generative Language API (Gemini)
// Expects JSON body: { contents, systemInstruction }
exports.handler = async function(event, context) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Gemini API key not configured on server.' })
      };
    }

    const body = event.body ? JSON.parse(event.body) : {};
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const resp = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!resp.ok) {
      const text = await resp.text();
      return { statusCode: resp.status, body: JSON.stringify({ error: text }) };
    }

    const result = await resp.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || null;

    return {
      statusCode: 200,
      body: JSON.stringify({ text, raw: result })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
