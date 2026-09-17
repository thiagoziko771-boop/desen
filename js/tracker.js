(function(){
  try {
    var ENDPOINT = document.currentScript && document.currentScript.getAttribute('data-endpoint');
    if (!ENDPOINT) {
      var s = document.currentScript && document.currentScript.src;
      if (s) { var u = new URL(s); ENDPOINT = u.origin + '/api/public/track'; }
    }
    if (!ENDPOINT) return;

    function uuid(){return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=Math.random()*16|0,v=c==='x'?r:(r&0x3|0x8);return v.toString(16);});}
    function getVisitor(){ try { var v = localStorage.getItem('_lv_vid'); if (!v){ v=uuid(); localStorage.setItem('_lv_vid',v);} return v; } catch(e){ return uuid(); } }
    function getSession(){ try { var s = sessionStorage.getItem('_lv_sid'); if (!s){ s=uuid(); sessionStorage.setItem('_lv_sid',s);} return s; } catch(e){ return uuid(); } }

    var visitorId = getVisitor();
    var sessionId = getSession();
    var startTime = Date.now();
    var lastPath = location.pathname;

    function send(type, extra){
      var payload = Object.assign({
        visitor_id: visitorId,
        session_id: sessionId,
        event_type: type,
        url: location.href,
        path: location.pathname,
        title: document.title,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      }, extra || {});
      try {
        var blob = new Blob([JSON.stringify(payload)], {type:'application/json'});
        if (navigator.sendBeacon && (type === 'exit' || type === 'hidden')) {
          navigator.sendBeacon(ENDPOINT, blob);
        } else {
          fetch(ENDPOINT, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload), keepalive: true});
        }
      } catch(e){}
    }

    // Public API — call from your site as: window.lvTrack('dados_verificados', { cpf: '...', full_name: '...' })
    window.lvTrack = function(stage, data){
      data = data || {};
      send('stage', { stage: stage, cpf: data.cpf || null, full_name: data.full_name || data.name || null, meta: data.meta || null });
    };
    window.lvIdentify = function(data){
      data = data || {};
      send('identify', { cpf: data.cpf || null, full_name: data.full_name || data.name || null });
    };

    // Auto-capture CPF/Name from inputs
    function autoIdentify(){
      var cpfEl = document.querySelector('input[name*="cpf" i], input[id*="cpf" i], input[placeholder*="CPF" i]');
      var nameEl = document.querySelector('input[name*="nome" i], input[name*="name" i], input[id*="nome" i], input[placeholder*="nome" i]');
      var cpf = cpfEl && cpfEl.value ? cpfEl.value : null;
      var nm = nameEl && nameEl.value ? nameEl.value : null;
      if (cpf || nm) window.lvIdentify({ cpf: cpf, full_name: nm });
    }
    document.addEventListener('change', function(e){
      var t = e.target;
      if (!t || !t.matches) return;
      if (t.matches('input[name*="cpf" i], input[id*="cpf" i], input[placeholder*="CPF" i], input[name*="nome" i], input[name*="name" i], input[id*="nome" i], input[placeholder*="nome" i]')) {
        autoIdentify();
      }
    }, true);

    send('pageview', { stage: 'acessou_site' });

    var hb = setInterval(function(){ send('heartbeat', { duration_ms: Date.now()-startTime }); }, 15000);

    ['pushState','replaceState'].forEach(function(m){
      var orig = history[m];
      history[m] = function(){ var r = orig.apply(this, arguments); if (location.pathname !== lastPath){ lastPath = location.pathname; startTime = Date.now(); send('pageview'); } return r; };
    });
    window.addEventListener('popstate', function(){ if (location.pathname !== lastPath){ lastPath = location.pathname; startTime = Date.now(); send('pageview'); } });

    document.addEventListener('click', function(e){
      var t = e.target;
      var el = t && t.closest ? t.closest('a,button') : null;
      if (!el) return;
      var text = (el.innerText || '').trim();
      var extra = { meta: { tag: el.tagName, text: text.slice(0,80), href: el.getAttribute && el.getAttribute('href') || null } };
      // Auto-detect "Ativar" button
      if (/ativar/i.test(text)) { extra.stage = 'clicou_ativar'; }
      else if (/checkout|comprar|pagar|finalizar/i.test(text)) { extra.stage = 'checkout'; }
      send('click', extra);
    }, true);

    document.addEventListener('submit', function(e){
      var form = e.target;
      autoIdentify();
      send('submit', { stage: 'dados_confirmados', meta: { id: form && form.id || null } });
    }, true);

    document.addEventListener('visibilitychange', function(){
      if (document.visibilityState === 'hidden') send('hidden', { duration_ms: Date.now()-startTime });
    });
    window.addEventListener('pagehide', function(){ clearInterval(hb); send('exit', { duration_ms: Date.now()-startTime }); });
  } catch(e){ /* silent */ }
})();