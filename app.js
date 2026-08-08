document.addEventListener('DOMContentLoaded', () => {
  // CONFIGURATION: Replace this with your Google Apps Script URL after deploying it
  const APPS_SCRIPT_URL = ''; 
  const DISCORD_WEBHOOK_URL = 'https://discordapp.com/api/webhooks/1535499789175889960/-etF65Xs-e5KMbLz06oKVS9O1rKDD_eNPpMxTdrJF8HOZF8Yyxu2NkY0r6dZ-JrZjG8u';

  let gamesData = [];
  let activeFilters = {
    players: 4,
    maxWeight: 30,
    onlyFree: false,
    graphics: { low: true, medium: true, high: true },
    platforms: { pc: true, console: true, mobile: true }
  };

  const mainContainer = document.getElementById('main-container');
  const quickNav = document.getElementById('quick-nav');
  const btnFilterToggle = document.getElementById('btn-filter-toggle');
  const filterPanel = document.getElementById('filter-panel');
  const btnRandomGame = document.getElementById('btn-random-game');
  const btnSuggestJump = document.getElementById('btn-suggest-jump');
  
  // Filter inputs
  const sliderPlayers = document.getElementById('slider-players');
  const valPlayers = document.getElementById('val-players');
  const sliderWeight = document.getElementById('slider-weight');
  const valWeight = document.getElementById('val-weight');
  const checkFree = document.getElementById('check-free');
  const btnOptions = document.querySelectorAll('.btn-option');
  const btnPlatforms = document.querySelectorAll('.btn-platform');

  // Toggle Filters
  btnFilterToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    filterPanel.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!filterPanel.contains(e.target) && e.target !== btnFilterToggle) {
      filterPanel.classList.remove('active');
    }
  });

  // Suggest Jump Button on the left
  btnSuggestJump.addEventListener('click', () => {
    const section = document.getElementById('section-suggest');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Random Game Picker on the left
  btnRandomGame.addEventListener('click', () => {
    // Find all games that match the current filters and are currently displayed
    const activeGames = gamesData.filter(game => {
      const playersMatch = activeFilters.players >= game.min_players && activeFilters.players <= game.max_players;
      const weightMatch = activeFilters.maxWeight === 50 || game.weight_gb <= activeFilters.maxWeight;
      const priceMatch = !activeFilters.onlyFree || game.is_free;
      const graphicsMatch = activeFilters.graphics[game.graphics];
      const platformMatch = game.platforms.some(plat => activeFilters.platforms[plat]);
      return playersMatch && weightMatch && priceMatch && graphicsMatch && platformMatch;
    });

    if (activeGames.length > 0) {
      const randomIndex = Math.floor(Math.random() * activeGames.length);
      const chosenGame = activeGames[randomIndex];
      const section = document.getElementById(`section-${chosenGame.id}`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  // Setup Filter Event Listeners
  sliderPlayers.addEventListener('input', (e) => {
    activeFilters.players = parseInt(e.target.value);
    valPlayers.textContent = activeFilters.players === 20 ? '20+' : activeFilters.players;
    filterGames();
  });

  sliderWeight.addEventListener('input', (e) => {
    activeFilters.maxWeight = parseInt(e.target.value);
    valWeight.textContent = activeFilters.maxWeight === 50 ? 'Cualquiera' : `${activeFilters.maxWeight} GB`;
    filterGames();
  });

  checkFree.addEventListener('change', (e) => {
    activeFilters.onlyFree = e.target.checked;
    filterGames();
  });

  btnOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      const option = btn.dataset.option;
      activeFilters.graphics[option] = !activeFilters.graphics[option];
      btn.classList.toggle('selected', activeFilters.graphics[option]);
      filterGames();
    });
  });

  btnPlatforms.forEach(btn => {
    btn.addEventListener('click', () => {
      const plat = btn.dataset.platform;
      activeFilters.platforms[plat] = !activeFilters.platforms[plat];
      btn.classList.toggle('selected', activeFilters.platforms[plat]);
      filterGames();
    });
  });

  // Fetch games configuration
  fetch('games.json')
    .then(res => res.json())
    .then(data => {
      gamesData = data;
      gamesData.sort((a, b) => a.name.localeCompare(b.name));
      renderApp();
    })
    .catch(err => {
      console.error('Error cargando los juegos:', err);
      mainContainer.innerHTML = `
        <div class="empty-state">
          <h2>Error al cargar datos</h2>
          <p>No se pudo establecer conexión con el archivo games.json. Asegúrate de que existe.</p>
        </div>
      `;
    });

  // Render Page Content
  function renderApp() {
    mainContainer.innerHTML = '';
    quickNav.innerHTML = '';

    // Create rendering sections
    for (const game of gamesData) {
      // Create navigation dot
      const navDot = document.createElement('div');
      navDot.className = 'nav-dot';
      navDot.dataset.gameId = game.id;
      
      const dotImg = document.createElement('img');
      dotImg.src = game.cover_image;
      dotImg.alt = game.name;
      dotImg.loading = "lazy";
      navDot.appendChild(dotImg);

      const tooltip = document.createElement('span');
      tooltip.className = 'nav-dot-tooltip';
      tooltip.textContent = game.name;
      navDot.appendChild(tooltip);

      navDot.addEventListener('click', () => {
        const section = document.getElementById(`section-${game.id}`);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      });
      quickNav.appendChild(navDot);

      // Create Section
      const section = document.createElement('section');
      section.className = 'game-section';
      section.id = `section-${game.id}`;
      section.dataset.id = game.id;

      // Platform Formatter
      const platformLabels = { pc: 'PC', console: 'Consola', mobile: 'Móvil' };
      const platformText = game.platforms.map(p => platformLabels[p] || p).join(', ');

      // Inner Layout
      section.innerHTML = `
        <div class="game-content-wrapper">
          <div class="game-media skeleton" id="media-container-${game.id}">
            <img class="media-main" id="img-${game.id}" src="${game.bg_image}" alt="${game.name}" loading="lazy" style="opacity: 0; transition: opacity 0.5s ease;">
            <div class="media-gradient-overlay"></div>
          </div>
          <div class="game-details">
            <h2 class="game-title">${game.name}</h2>
            <p class="game-desc">${game.description}</p>
            <div class="game-specs">
              <div class="spec-item">
                <span class="spec-label">Jugadores</span>
                <span class="spec-value">${game.min_players === game.max_players ? game.min_players : `${game.min_players} - ${game.max_players}`}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Peso</span>
                <span class="spec-value">${game.weight_gb} GB</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Precio</span>
                <span class="spec-value">${game.is_free ? 'Gratis' : 'De Pago'}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Gráficos</span>
                <span class="spec-value" style="text-transform: uppercase;">${game.graphics}</span>
              </div>
              <div class="spec-item spec-full">
                <span class="spec-label">Plataformas</span>
                <span class="spec-value">${platformText}</span>
              </div>
            </div>
          </div>
        </div>
      `;

      mainContainer.appendChild(section);

      // Handle skeleton removal when image loads
      setupImageLoad(game.id);
    }

    // Render Suggestion Section
    renderSuggestionSection();

    // Initialize Intersection Observer for active class tracking
    setupObserver();
    filterGames(); // Apply current filters
  }

  // Render Suggestion Form Section
  function renderSuggestionSection() {
    // Section Layout
    const section = document.createElement('section');
    section.className = 'game-section';
    section.id = 'section-suggest';
    section.dataset.id = 'suggest';

    section.innerHTML = `
      <div class="game-content-wrapper">
        <div class="game-media suggestion-intro">
          <h2 class="suggest-hero-title">¿Falta algún juego?</h2>
          <p class="suggest-hero-desc">Ayúdanos a expandir el catálogo. Si conoces algún juego online divertido que funcione en computadoras de bajos recursos, envíanos los detalles.</p>
          <div class="glow-box">
             <span>🚀</span>
             <p>Las sugerencias se guardarán en nuestra base de datos en Google Sheets y nos llegará una notificación directa a Discord para revisarlo.</p>
          </div>
        </div>
        <div class="game-details suggest-form-card">
          <h2 class="game-title">Sugerir Juego</h2>
          <form id="suggest-form" class="suggest-form">
            <div class="form-group">
              <label for="s-name">Nombre del Juego</label>
              <input type="text" id="s-name" required placeholder="Ej: Left 4 Dead 2">
            </div>
            <div class="form-group">
              <label for="s-comments">Detalles Adicionales (Opcional)</label>
              <textarea id="s-comments" rows="5" placeholder="Ej: Es cooperativo online hasta 8 jugadores, pesa unos 7GB, y corre muy bien en gráficos medios..."></textarea>
            </div>
            <button type="submit" id="btn-submit-suggestion" class="btn-submit-suggest">Enviar sugerencia</button>
            <div id="form-feedback" class="form-feedback"></div>
          </form>
        </div>
      </div>
    `;

    mainContainer.appendChild(section);

    // Setup submit listener
    const form = document.getElementById('suggest-form');
    form.addEventListener('submit', handleFormSubmit);
  }

  // Handle Form Submission
  async function handleFormSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('btn-submit-suggestion');
    const feedback = document.getElementById('form-feedback');
    
    const data = {
      name: document.getElementById('s-name').value.trim(),
      comments: document.getElementById('s-comments').value.trim() || 'Sin comentarios adicionales.'
    };

    btn.disabled = true;
    btn.textContent = 'Enviando...';
    feedback.className = 'form-feedback';
    feedback.textContent = '';

    try {
      // 1. Post to Discord directly (Client side)
      let discordPromise = fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: "🎮 Nueva sugerencia de juego",
            color: 16716947, // Pink (#FF1493)
            fields: [
              { name: "Nombre del Juego", value: data.name, inline: false },
              { name: "Detalles / Comentarios", value: data.comments, inline: false }
            ],
            timestamp: new Date().toISOString()
          }]
        })
      });

      // 2. Post to Google Sheets Web App (if configured)
      let sheetsPromise = Promise.resolve();
      if (APPS_SCRIPT_URL) {
        sheetsPromise = fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // Apps Script web app redirect requires no-cors
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      }

      await Promise.all([discordPromise, sheetsPromise]);

      feedback.className = 'form-feedback success';
      feedback.textContent = '¡Sugerencia enviada con éxito!';
      document.getElementById('suggest-form').reset();
    } catch (err) {
      console.error(err);
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Ocurrió un error al enviar. Por favor intenta de nuevo.';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Enviar sugerencia';
    }
  }

  // Handle image load triggers
  function setupImageLoad(gameId) {
    const mediaContainer = document.getElementById(`media-container-${gameId}`);
    const imgEl = document.getElementById(`img-${gameId}`);

    if (!imgEl) return;

    imgEl.addEventListener('load', () => {
      mediaContainer.classList.remove('skeleton');
      imgEl.style.opacity = '1';
    });
    
    // Check if cached
    if (imgEl.complete) {
      mediaContainer.classList.remove('skeleton');
      imgEl.style.opacity = '1';
    }
  }

  // Filter verification logic
  function filterGames() {
    let visibleCount = 0;
    
    gamesData.forEach(game => {
      const section = document.getElementById('section-' + game.id);
      const navDot = document.querySelector('.nav-dot[data-game-id="' + game.id + '"]');
      
      if (!section) return;

      // Filter matches
      const playersMatch = activeFilters.players >= game.min_players && activeFilters.players <= game.max_players;
      const weightMatch = activeFilters.maxWeight === 50 || game.weight_gb <= activeFilters.maxWeight;
      const priceMatch = !activeFilters.onlyFree || game.is_free;
      const graphicsMatch = activeFilters.graphics[game.graphics];
      const platformMatch = game.platforms.some(plat => activeFilters.platforms[plat]);

      if (playersMatch && weightMatch && priceMatch && graphicsMatch && platformMatch) {
        section.style.display = 'flex';
        if (navDot) navDot.style.display = 'block';
        visibleCount++;
      } else {
        section.style.display = 'none';
        if (navDot) navDot.style.display = 'none';
      }
    });

    // Check if empty state needed
    const existingEmptyState = document.getElementById('empty-state-card');
    if (visibleCount === 0) {
      if (!existingEmptyState) {
        const emptyState = document.createElement('div');
        emptyState.id = 'empty-state-card';
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
          <svg class="empty-state-icon" viewBox="0 0 24 24">
            <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <h2>No se encontraron juegos</h2>
          <p>Prueba ajustando los filtros para ver más resultados que coincidan con tus exigencias.</p>
        `;
        mainContainer.appendChild(emptyState);
      }
    } else {
      if (existingEmptyState) {
        existingEmptyState.remove();
      }
    }
  }

  // Intersection Observer
  let observer;
  function setupObserver() {
    if (observer) observer.disconnect();

    const options = {
      root: mainContainer,
      threshold: 0.6
    };

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Update navigation dot
          const gameId = entry.target.dataset.id;
          document.querySelectorAll('.nav-dot').forEach(dot => {
            if (dot.dataset.gameId === gameId) {
              dot.classList.add('active');
              dot.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
            } else {
              dot.classList.remove('active');
            }
          });

          // Toggle action suggest button active class
          if (gameId === 'suggest') {
            btnSuggestJump.classList.add('active');
          } else {
            btnSuggestJump.classList.remove('active');
          }
        }
      });
    }, options);

    document.querySelectorAll('.game-section').forEach(sec => {
      observer.observe(sec);
    });
  }
});
