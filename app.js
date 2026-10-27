/**
 * TastyNest - Clean, Modern Culinary Studio Architecture
 * Clean minimal aesthetic, dynamic serving calculations,
 * live step timers, weekly meal calendar, and smart aisle grocery list.
 */

const TastyApp = (() => {
  // Application State
  const state = {
    currentView: 'home',
    currentRecipeId: null,
    searchQuery: '',
    filters: {
      category: 'All',
      cuisine: 'All',
      difficulty: 'All',
      maxTime: 120,
      dietary: 'all',
      sortBy: 'featured',
      videoOnly: false
    },
    youtubeApiKey: localStorage.getItem('tastynest_custom_yt_key') || 'AIzaSyA6gqytrRIVh8YlWjLQ82z2uJgXn9JPD1k',
    youtubeSearchResults: [],
    youtubeSearchResultsMap: {},
    activeYoutubeQuery: 'potato recipe',
    activeVideoMode: 'local', // 'local' (HD Studio MP4) or 'youtube' (IFrame)
    currentVideoSpeed: 1,
    activeModalRecipe: null,
    youtubeSearchResults: [],
    theme: localStorage.getItem('tastynest_theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    favorites: JSON.parse(localStorage.getItem('tastynest_favorites') || '["wild-mushroom-truffle-risotto", "creamy-tuscan-salmon", "authentic-carbonara"]'),
    customRecipes: JSON.parse(localStorage.getItem('tastynest_custom_recipes') || '[]'),
    shoppingList: JSON.parse(localStorage.getItem('tastynest_shopping_list') || JSON.stringify([
      { id: '1', item: 'Fresh Chanterelle or Cremini Mushrooms', amount: '250g', aisle: 'Produce', checked: false },
      { id: '2', item: 'Fresh Baby Spinach', amount: '3 cups', aisle: 'Produce', checked: false },
      { id: '3', item: 'Parmigiano Reggiano (Aged 24m)', amount: '75g', aisle: 'Dairy', checked: true },
      { id: '4', item: 'European Cultured Butter', amount: '60g', aisle: 'Dairy', checked: false },
      { id: '5', item: 'Carnaroli Rice', amount: '300g', aisle: 'Pantry', checked: false },
      { id: '6', item: 'Sun-Dried Tomatoes in Olive Oil', amount: '0.5 cup', aisle: 'Pantry', checked: false }
    ])),
    mealPlan: JSON.parse(localStorage.getItem('tastynest_meal_plan') || JSON.stringify({
      Monday: { Breakfast: 'fluffy-blueberry-ricotta-pancakes', Lunch: 'mediterranean-chickpea-power-bowl', Dinner: 'wild-mushroom-truffle-risotto', Snack: null },
      Tuesday: { Breakfast: 'avocado-poached-egg-toast', Lunch: 'creamy-tomato-basil-penne', Dinner: 'creamy-tuscan-salmon', Snack: null },
      Wednesday: { Breakfast: null, Lunch: 'pan-seared-gnocchi', Dinner: 'szechuan-kung-pao', Snack: null },
      Thursday: { Breakfast: 'avocado-poached-egg-toast', Lunch: null, Dinner: '15min-garlic-butter-shrimp-scampi', Snack: null },
      Friday: { Breakfast: null, Lunch: 'crispy-baja-fish-tacos', Dinner: 'butter-chicken-delight', Snack: 'molten-chocolate-lava-cake' },
      Saturday: { Breakfast: 'fluffy-blueberry-ricotta-pancakes', Lunch: 'mumbai-pani-puri', Dinner: 'authentic-carbonara', Snack: 'classic-italian-tiramisu' },
      Sunday: { Breakfast: 'avocado-poached-egg-toast', Lunch: 'beetroot-goat-cheese-galette', Dinner: 'hyderabadi-dum-biryani', Snack: null }
    })),
    isAuthenticated: true,
    authRole: localStorage.getItem('tastynest_role') || 'admin',
    user: JSON.parse(localStorage.getItem('tastynest_user') || JSON.stringify({
      name: 'Chef Elena Rostova',
      email: 'admin@tastynest.food',
      role: localStorage.getItem('tastynest_role') || 'admin',
      title: 'Master Chef & Studio Administrator',
      bio: 'Dedicated to the pursuit of rustic Mediterranean flavors, authentic pasta textures, and hand-ground spice blends.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      dietaryPreferences: ['Mediterranean', 'High-Protein'],
      skillLevel: 'Executive Master Chef'
    })),
    activeServings: 4,
    completedSteps: {},
    timer: {
      interval: null,
      secondsRemaining: 0,
      running: false,
      title: ''
    },
    tempPlanSelection: {
      recipeId: null,
      day: 'Monday',
      slot: 'Dinner'
    },
    plannerActiveDay: 'All',
    slotPickerTarget: { day: 'Monday', slot: 'Breakfast' },
    slotPickerSearch: '',
    slotPickerCategory: 'All'
  };

  function getAllRecipes() {
    return [...state.customRecipes, ...INITIAL_RECIPES];
  }

  function getRecipeById(id) {
    return getAllRecipes().find(r => r.id === id);
  }

  // Navigation & Hash Routing
  // Theme Management
  function initTheme() {
    applyTheme(state.theme);
  }

  function toggleTheme() {
    const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  }

  function applyTheme(theme) {
    state.theme = theme;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('tastynest_theme', theme);

    const iconSun = document.getElementById('theme-icon-sun');
    const iconMoon = document.getElementById('theme-icon-moon');
    const userMenuThemeLabel = document.getElementById('user-menu-theme-label');

    if (iconSun && iconMoon) {
      if (theme === 'dark') {
        iconSun.classList.remove('hidden');
        iconMoon.classList.add('hidden');
      } else {
        iconSun.classList.add('hidden');
        iconMoon.classList.remove('hidden');
      }
    }

    if (userMenuThemeLabel) {
      userMenuThemeLabel.innerText = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
    }

    updateNavUI();
  }

  // Open Access (No Authentication Barrier Required)
  function checkAuthGuard() {
    const authGate = document.getElementById('auth-gate');
    if (authGate) authGate.classList.add('hidden');
    document.querySelectorAll('.app-shell-element').forEach(el => el.classList.remove('hidden'));
    return true;
  }

  // Navigation & Hash Routing with Authorization Guard
  function handleRouteFromHash() {
    const raw = window.location.hash.replace('#', '') || 'home';
    if (raw.startsWith('recipe/')) {
      state.currentRecipeId = raw.replace('recipe/', '');
      state.currentView = 'recipe-detail';
    } else if (raw.startsWith('recipe-')) {
      const id = raw.replace('recipe-', '');
      const match = getAllRecipes().find(r => r.id === id || r.id.includes(id));
      state.currentRecipeId = match ? match.id : id;
      state.currentView = 'recipe-detail';
    } else if (raw === 'admin') {
      // Role Authorization Check
      if (state.user && state.user.role === 'admin') {
        state.currentView = 'admin';
      } else {
        state.currentView = 'admin-denied';
      }
    } else {
      const validViews = ['home', 'explore', 'videos', 'categories', 'planner', 'favorites', 'shopping', 'add-recipe', 'profile', 'admin'];
      state.currentView = validViews.includes(raw) ? raw : 'home';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateNavUI();
    renderView();
  }

  function navigateTo(view, params = {}) {
    state.currentView = view;
    if (params.category) state.filters.category = params.category;
    if (params.cuisine) state.filters.cuisine = params.cuisine;

    const targetHash = params.recipeId ? `recipe/${params.recipeId}` : view;
    if (window.location.hash !== `#${targetHash}`) {
      window.location.hash = targetHash;
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      updateNavUI();
      renderView();
    }
  }

  function updateNavUI() {
    const favCount = document.getElementById('favorites-count-badge');
    if (favCount) favCount.innerText = state.favorites.length;

    const shopCount = document.getElementById('shopping-count-badge');
    if (shopCount) {
      const unchecked = state.shoppingList.filter(i => !i.checked).length;
      shopCount.innerText = unchecked;
    }

    const headerName = document.getElementById('header-user-name');
    if (headerName) headerName.innerText = state.user.name.split(' ')[0];

    const headerAvatar = document.getElementById('header-user-avatar');
    if (headerAvatar) headerAvatar.src = state.user.avatar;

    const dropdownName = document.getElementById('dropdown-user-name');
    if (dropdownName) dropdownName.innerText = state.user.name;

    const dropdownEmail = document.getElementById('dropdown-user-email');
    if (dropdownEmail) dropdownEmail.innerText = state.user.email;

    // Role-Based Access Badges & Navigation Control
    const isAdmin = state.user && state.user.role === 'admin';

    const dropdownRoleBadge = document.getElementById('dropdown-user-role-badge');
    if (dropdownRoleBadge) {
      if (isAdmin) {
        dropdownRoleBadge.className = "px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 flex items-center gap-1";
        dropdownRoleBadge.innerHTML = `<i data-lucide="crown" class="w-3 h-3 text-amber-500"></i><span>Master Chef (Admin)</span>`;
      } else {
        dropdownRoleBadge.className = "px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 flex items-center gap-1";
        dropdownRoleBadge.innerHTML = `<i data-lucide="utensils" class="w-3 h-3 text-emerald-600"></i><span>Home Cook (Member)</span>`;
      }
    }

    const dropdownAdminLink = document.getElementById('dropdown-admin-link');
    if (dropdownAdminLink) {
      if (isAdmin) {
        dropdownAdminLink.classList.remove('hidden');
      } else {
        dropdownAdminLink.classList.add('hidden');
      }
    }

    const drawerAdminLink = document.getElementById('mobile-drawer-admin');
    if (drawerAdminLink) {
      if (isAdmin) {
        drawerAdminLink.classList.remove('hidden');
      } else {
        drawerAdminLink.classList.add('hidden');
      }
    }

    const drawerRoleBadge = document.getElementById('drawer-user-role-badge');
    if (drawerRoleBadge) {
      drawerRoleBadge.className = isAdmin 
        ? "px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300"
        : "px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300";
      drawerRoleBadge.innerText = isAdmin ? "Admin" : "Member";
    }

    // Header Profile button active state
    const headerProfileBtn = document.getElementById('user-profile-header-btn');
    if (headerProfileBtn) {
      if (state.currentView === 'profile' || state.currentView === 'admin') {
        headerProfileBtn.classList.add('ring-2', 'ring-emerald-500', 'bg-emerald-50', 'dark:bg-emerald-950/50', 'border-emerald-500');
      } else {
        headerProfileBtn.classList.remove('ring-2', 'ring-emerald-500', 'bg-emerald-50', 'dark:bg-emerald-950/50', 'border-emerald-500');
      }
    }

    // Drawer User Info
    const drawerAvatar = document.getElementById('drawer-user-avatar');
    if (drawerAvatar) drawerAvatar.src = state.user.avatar;

    const drawerName = document.getElementById('drawer-user-name');
    if (drawerName) drawerName.innerText = state.user.name;

    const drawerRole = document.getElementById('drawer-user-role');
    if (drawerRole) drawerRole.innerText = `${isAdmin ? 'Master Chef (Admin)' : 'Home Cook (Member)'} · View Profile →`;

    // Desktop Nav Active State
    ['home', 'explore', 'videos', 'categories', 'planner', 'favorites', 'shopping'].forEach(v => {
      const btn = document.getElementById(`nav-btn-${v}`);
      if (btn) {
        if (state.currentView === v) {
          btn.classList.add('nav-pill-active');
          btn.classList.remove('text-ink-600', 'dark:text-zinc-300');
        } else {
          btn.classList.remove('nav-pill-active');
          btn.classList.add('text-ink-600', 'dark:text-zinc-300');
        }
      }
    });

    // Mobile Bottom Dock Active State
    const dockMapping = {
      'home': 'mobile-dock-home',
      'explore': 'mobile-dock-explore',
      'videos': 'mobile-dock-videos',
      'planner': 'mobile-dock-planner',
      'profile': 'mobile-dock-profile'
    };

    Object.keys(dockMapping).forEach(v => {
      const btn = document.getElementById(dockMapping[v]);
      if (btn) {
        if (state.currentView === v) {
          btn.classList.add('mobile-dock-active');
          btn.classList.remove('text-ink-500', 'dark:text-zinc-400');
        } else {
          btn.classList.remove('mobile-dock-active');
          btn.classList.add('text-ink-500', 'dark:text-zinc-400');
        }
      }
    });

    // Mobile Drawer Links Active State
    ['home', 'explore', 'videos', 'categories', 'planner', 'favorites', 'shopping', 'add-recipe', 'profile'].forEach(v => {
      const btn = document.getElementById(`mobile-drawer-${v}`);
      if (btn) {
        if (state.currentView === v) {
          btn.classList.add('bg-emerald-50', 'dark:bg-emerald-950/60', 'text-emerald-700', 'dark:text-emerald-400', 'font-bold');
          btn.classList.remove('text-ink-700', 'dark:text-zinc-300');
        } else {
          btn.classList.remove('bg-emerald-50', 'dark:bg-emerald-950/60', 'text-emerald-700', 'dark:text-emerald-400', 'font-bold');
          btn.classList.add('text-ink-700', 'dark:text-zinc-300');
        }
      }
    });

    if (window.lucide) lucide.createIcons();
  }

  // ==========================================
  // Modern Culinary Video Theater Engine
  // ==========================================
  function openVideoModal(recipeId, event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    let recipe = getRecipeById(recipeId);
    if (!recipe && state.activeModalRecipe && state.activeModalRecipe.id === recipeId) {
      recipe = state.activeModalRecipe;
    }
    if (!recipe) return;

    state.activeModalRecipeId = recipeId;
    state.activeModalRecipe = recipe;
    // Default to YouTube mode when recipe has a YouTube video
    state.activeVideoMode = recipe.youtubeId ? 'youtube' : 'local';

    const modal = document.getElementById('recipe-video-modal');
    const title = document.getElementById('video-modal-title');
    const ytLink = document.getElementById('video-modal-yt-link');
    const markers = document.getElementById('video-step-markers');
    const viewRecipeBtn = document.getElementById('video-view-recipe-btn');

    if (modal) {
      if (title) title.innerText = `${recipe.title} — Masterclass by ${recipe.author?.name || 'Chef'}`;

      if (ytLink) {
        const watchUrl = recipe.youtubeWatchUrl || (recipe.youtubeId ? `https://www.youtube.com/watch?v=${recipe.youtubeId}` : `https://www.youtube.com/results?search_query=${encodeURIComponent(recipe.title + ' recipe')}`);
        ytLink.href = watchUrl;
      }

      renderModalPlayer();

      if (markers) {
        const chapters = recipe.videoChapters && recipe.videoChapters.length > 0 ? recipe.videoChapters : [
          { time: 0, label: "Step 1: Prep" },
          { time: 60, label: "Step 2: Technique & Cook" },
          { time: 140, label: "Step 3: Plating & Taste" }
        ];

        markers.innerHTML = chapters.map(ch => `
          <button 
            onclick="TastyApp.jumpVideoTo(${ch.time})"
            class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 hover:scale-102"
          >
            <i data-lucide="play" class="w-3 h-3 fill-rose-400 text-rose-400"></i>
            <span>${ch.label}</span>
          </button>
        `).join('');
      }

      if (viewRecipeBtn) {
        viewRecipeBtn.onclick = () => {
          closeVideoModal();
          navigateTo('recipe-detail', { recipeId: recipe.id });
        };
      }

      modal.classList.remove('hidden');
      if (window.lucide) lucide.createIcons();
    }
  }

  function renderModalPlayer() {
    const frame = document.getElementById('video-player-frame');
    if (!frame || !state.activeModalRecipe) return;
    const recipe = state.activeModalRecipe;

    const localBtn = document.getElementById('video-mode-local');
    const ytBtn = document.getElementById('video-mode-youtube');

    if (state.activeVideoMode === 'youtube' && recipe.youtubeId) {
      if (localBtn) {
        localBtn.className = "px-2.5 py-1 rounded-lg text-stone-300 hover:text-white transition-all flex items-center gap-1.5";
      }
      if (ytBtn) {
        ytBtn.className = "px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold transition-all shadow-xs flex items-center gap-1.5";
      }

      frame.innerHTML = `
        <div class="relative w-full h-full bg-black flex items-center justify-center">
          <iframe 
            id="recipe-active-iframe"
            src="https://www.youtube.com/embed/${recipe.youtubeId}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1" 
            title="${recipe.title}" 
            class="w-full h-full border-0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen
          ></iframe>
        </div>
      `;
    } else {
      if (localBtn) {
        localBtn.className = "px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold transition-all shadow-xs flex items-center gap-1.5";
      }
      if (ytBtn) {
        ytBtn.className = "px-2.5 py-1 rounded-lg text-stone-300 hover:text-white transition-all flex items-center gap-1.5";
      }

      const videoSource = recipe.videoUrl || "videos/cooking-demo.mp4";

      frame.innerHTML = `
        <video 
          id="recipe-main-video" 
          class="w-full h-full object-contain bg-black" 
          controls 
          autoplay 
          playsinline 
          poster="${recipe.image}"
        >
          <source src="${videoSource}" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      `;

      const video = document.getElementById('recipe-main-video');
      if (video) {
        video.playbackRate = state.currentVideoSpeed || 1;
        video.play().catch(() => {});
      }
    }
    if (window.lucide) lucide.createIcons();
  }

  function switchVideoMode(mode) {
    state.activeVideoMode = mode;
    renderModalPlayer();
  }

  function setVideoSpeed(speed) {
    state.currentVideoSpeed = speed;
    const video = document.getElementById('recipe-main-video');
    if (video) video.playbackRate = speed;

    const featured = document.getElementById('featured-video-player');
    if (featured) featured.playbackRate = speed;

    const inline = document.getElementById(`inline-recipe-video-${state.currentRecipeId}`);
    if (inline) inline.playbackRate = speed;

    document.querySelectorAll('.video-spd-btn').forEach(btn => {
      if (parseFloat(btn.dataset.speed) === speed) {
        btn.classList.add('bg-white/20', 'text-white', 'font-bold');
        btn.classList.remove('hover:bg-white/10');
      } else {
        btn.classList.remove('bg-white/20', 'text-white', 'font-bold');
        btn.classList.add('hover:bg-white/10');
      }
    });
  }

  function closeVideoModal() {
    const modal = document.getElementById('recipe-video-modal');
    const frame = document.getElementById('video-player-frame');
    if (frame) {
      frame.innerHTML = '';
    }
    if (modal) {
      modal.classList.add('hidden');
    }
    state.activeModalRecipe = null;
  }

  function jumpVideoTo(seconds) {
    const video = document.getElementById('recipe-main-video');
    if (video) {
      video.currentTime = seconds;
      video.play().catch(() => {});
      return;
    }
    const featured = document.getElementById('featured-video-player');
    if (featured) {
      featured.currentTime = seconds;
      featured.play().catch(() => {});
      return;
    }
    const iframe = document.getElementById('recipe-active-iframe');
    if (iframe && iframe.src) {
      let base = iframe.src.split('&start=')[0];
      iframe.src = `${base}&start=${seconds}&autoplay=1`;
    }
  }

  function jumpInlineVideo(recipeId, seconds) {
    const video = document.getElementById(`inline-recipe-video-${recipeId}`);
    if (video) {
      video.currentTime = seconds;
      video.play().catch(() => {});
    }
  }

  // Safe YouTube Playback Handler
  function playYouTubeInModal(videoId, title, channel) {
    const cached = state.youtubeSearchResultsMap[videoId];
    const finalTitle = title || (cached && cached.title) || 'Chef Masterclass Video';
    const finalChannel = channel || (cached && cached.channel) || 'Master Culinary Chef';
    const thumb = (cached && cached.thumb) || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    state.activeModalRecipe = {
      id: 'yt-' + videoId,
      title: finalTitle,
      author: { name: finalChannel },
      image: thumb,
      videoUrl: 'videos/cooking-demo.mp4',
      youtubeId: videoId,
      youtubeWatchUrl: `https://www.youtube.com/watch?v=${videoId}`,
      videoDuration: '10:15',
      cuisine: 'Global Masterclass',
      videoChapters: [
        { time: 0, label: "Ingredient Preparation & Mise en Place" },
        { time: 90, label: "Culinary Technique & Searing" },
        { time: 240, label: "Sauce Reduction & Emulsion" },
        { time: 420, label: "Final Assembly & Plating" }
      ]
    };
    state.activeVideoMode = 'youtube';
    openVideoModal('yt-' + videoId);
  }

  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Intelligent Culinary Knowledge Graph Fallback (guarantees real videos for ANY dish query)
  function getFallbackYouTubeVideos(query) {
    const q = (query || '').toLowerCase().trim();
    
    // Potato / Aloo / Gnocchi
    if (/potato|aloo|gnocchi|hashbrown|fries|fries/i.test(q)) {
      return [
        { videoId: 'clH40DW57xA', title: 'Crispy Potato Fry Recipe 🥔🔥 (Crispy Golden Slices & Spice Blend)', channel: 'AromAni Culinary', thumb: 'https://i.ytimg.com/vi/clH40DW57xA/hqdefault.jpg', duration: '8:45', badge: 'Potato Special' },
        { videoId: '5kUo1dCzHOI', title: 'Pan-Seared Potato Gnocchi with Sage Butter & Hazelnuts', channel: 'Chef Vincenzo Italian Table', thumb: 'https://i.ytimg.com/vi/5kUo1dCzHOI/hqdefault.jpg', duration: '14:20', badge: 'Handmade Gnocchi' },
        { videoId: 'pmzQH4NoUJI', title: 'The Ultimate Crispy Cheesy Hashbrowns (Tested 100+ Methods)', channel: 'Ben Chelin Kitchen', thumb: 'https://i.ytimg.com/vi/pmzQH4NoUJI/hqdefault.jpg', duration: '9:15', badge: 'Trending Masterclass' },
        { videoId: 'fzucN0zYpZ0', title: 'Restaurant Style Crispy Potato Bites & Herb Roast Wedges', channel: 'Crispy Bites Global', thumb: 'https://i.ytimg.com/vi/fzucN0zYpZ0/hqdefault.jpg', duration: '11:30', badge: 'Chef Technique' },
        { videoId: 'T-s1CPpyDdo', title: 'Crispy French Garlic Butter Potatoes in Under 10 Minutes', channel: 'Tasty Culinary Food', thumb: 'https://i.ytimg.com/vi/T-s1CPpyDdo/hqdefault.jpg', duration: '6:50', badge: 'Quick & Crispy' },
        { videoId: '9uDOWB-nqNI', title: 'Easy Crispy Golden Potato Croquettes with Garlic Aioli', channel: 'Foodie China & Continental', thumb: 'https://i.ytimg.com/vi/9uDOWB-nqNI/hqdefault.jpg', duration: '7:40', badge: 'Crispy Snack' }
      ];
    }

    // Butter Chicken / Chicken
    if (/butter|makhani|chicken|tikka|curry/i.test(q)) {
      return [
        { videoId: 'a03U45jFxOI', title: 'How To Make Butter Chicken At Home | Restaurant Style Murgh Makhani', channel: 'The Bombay Chef – Varun Inamdar', thumb: 'https://i.ytimg.com/vi/a03U45jFxOI/hqdefault.jpg', duration: '12:45', badge: '13M+ Views Masterclass' },
        { videoId: '1JYV4dKe5hg', title: 'Anyone Can Cook: Velvety Butter Chicken & Fragrant Naan', channel: 'Chef Jon Ashton Culinary', thumb: 'https://i.ytimg.com/vi/1JYV4dKe5hg/hqdefault.jpg', duration: '14:10', badge: 'Guest Chef Edition' },
        { videoId: 'eBAT31s61T8', title: 'Szechuan Kung Pao Chicken with Roasted Peanuts & Wok Hei', channel: 'Chef Kenji Wok Master', thumb: 'https://i.ytimg.com/vi/eBAT31s61T8/hqdefault.jpg', duration: '15:20', badge: 'Sichuan Wok' },
        { videoId: 'U1gg3JEW1CQ', title: 'Golden Garlic Herb Roast Chicken with Pan Reduction', channel: 'Chef Mateo Bistro', thumb: 'https://i.ytimg.com/vi/U1gg3JEW1CQ/hqdefault.jpg', duration: '18:00', badge: 'Roast Poultry' },
        { videoId: 'GxL9fTvf4go', title: 'Royal Hyderabadi Dum Biryani with Golden Saffron & Spiced Chicken', channel: 'Master Sanjeev Kapoor', thumb: 'https://i.ytimg.com/vi/GxL9fTvf4go/hqdefault.jpg', duration: '22:15', badge: 'Royal Biryani' },
        { videoId: '80nghU2Ef2I', title: 'Crispy Skillet Chicken Breast with Lemon Herb Butter', channel: 'Chef Marcus Wareing', thumb: 'https://i.ytimg.com/vi/80nghU2Ef2I/hqdefault.jpg', duration: '10:45', badge: 'Pan-Sear Pro' }
      ];
    }

    // Pasta / Carbonara / Italian
    if (/pasta|carbonara|spaghetti|risotto|italian|pizza/i.test(q)) {
      return [
        { videoId: 'INh6tzqQI0s', title: 'Classic Roman Spaghetti Carbonara (Authentic Guanciale & Egg Crema)', channel: 'Trastevere Roman Chef', thumb: 'https://i.ytimg.com/vi/INh6tzqQI0s/hqdefault.jpg', duration: '13:20', badge: 'Authentic Roman' },
        { videoId: 'D_2DBLAt57c', title: 'Traditional Italian Rigatoni alla Carbonara Masterclass', channel: 'Chef Antonio Pasta Bar', thumb: 'https://i.ytimg.com/vi/D_2DBLAt57c/hqdefault.jpg', duration: '11:15', badge: 'Pasta Perfection' },
        { videoId: 'vvKTyETdbpo', title: 'Wild Mushroom & Black Truffle Carnaroli Risotto Milanese', channel: 'Chef Marco Piedmont Master', thumb: 'https://i.ytimg.com/vi/vvKTyETdbpo/hqdefault.jpg', duration: '16:40', badge: 'Creamy Risotto' },
        { videoId: '_Fjsg-Z2t6E', title: 'Slow-Simmered Tuscan San Marzano Tomato & Basil Penne', channel: 'Chef Nonna Rosa', thumb: 'https://i.ytimg.com/vi/_Fjsg-Z2t6E/hqdefault.jpg', duration: '12:10', badge: 'Rustic Italian' },
        { videoId: '5kUo1dCzHOI', title: 'Pan-Seared Potato Gnocchi with Sage Brown Butter', channel: 'Chef Vincenzo Italian Table', thumb: 'https://i.ytimg.com/vi/5kUo1dCzHOI/hqdefault.jpg', duration: '14:20', badge: 'Handmade Pasta' },
        { videoId: 'xqjLvDFZxBs', title: 'Classic Venetian Tiramisu with Savoiardi & Espresso', channel: 'Chef Sofia Pasticceria', thumb: 'https://i.ytimg.com/vi/xqjLvDFZxBs/hqdefault.jpg', duration: '10:30', badge: 'Venetian Dolce' }
      ];
    }

    // Salmon / Fish / Seafood
    if (/salmon|fish|seafood|shrimp|scampi|tuna/i.test(q)) {
      return [
        { videoId: '-oefWiNuxBY', title: 'Creamy Tuscan Garlic Butter Salmon with Sun-Dried Tomatoes & Baby Spinach', channel: 'Gourmet Master Gordon', thumb: 'https://i.ytimg.com/vi/-oefWiNuxBY/hqdefault.jpg', duration: '14:50', badge: 'Pan-Seared Salmon' },
        { videoId: '80nghU2Ef2I', title: 'Crispy Skin Wild Atlantic Salmon Fillet with Herb Quinoa', channel: 'Chef Marcus Seaside Kitchen', thumb: 'https://i.ytimg.com/vi/80nghU2Ef2I/hqdefault.jpg', duration: '12:15', badge: 'Crispy Skin Method' },
        { videoId: 'Z4_z-8vqp0g', title: 'Authentic Baja Fish Tacos with Crispy Batter & Smoky Chipotle Crema', channel: 'Chef Carlos Baja Grill', thumb: 'https://i.ytimg.com/vi/Z4_z-8vqp0g/hqdefault.jpg', duration: '11:40', badge: 'Coastal Street Food' },
        { videoId: 'llbtqYVB8nI', title: '15-Minute Garlic Butter Mediterranean Shrimp Scampi', channel: 'Chef Yotam Coastal Table', thumb: 'https://i.ytimg.com/vi/llbtqYVB8nI/hqdefault.jpg', duration: '9:30', badge: 'Quick Seafood' },
        { videoId: 'ZQnI9IT476Y', title: 'Wok-Tossed Prawn Fried Rice with Jasmine Rice & Chili', channel: 'Wok Master Lin', thumb: 'https://i.ytimg.com/vi/ZQnI9IT476Y/hqdefault.jpg', duration: '10:55', badge: 'Wok Specialist' },
        { videoId: 'clH40DW57xA', title: 'Crispy Fish & Herb Potato Wedges English Pub Style', channel: 'Chef Liam British Classics', thumb: 'https://i.ytimg.com/vi/clH40DW57xA/hqdefault.jpg', duration: '13:00', badge: 'Pub Classic' }
      ];
    }

    // Desserts / Chocolate / Baking / Cake
    if (/dessert|cake|chocolate|lava|pancake|baking|sweet/i.test(q)) {
      return [
        { videoId: '53RSO_o1DX0', title: 'Molten Chocolate Lava Cake with Warm Liquid Ganache Core', channel: 'Chef Pierre Pastry Lab', thumb: 'https://i.ytimg.com/vi/53RSO_o1DX0/hqdefault.jpg', duration: '10:20', badge: 'French Patisserie' },
        { videoId: 'GLdnJbHqE-E', title: 'Fluffy Japanese Soufflé Ricotta Blueberry Pancakes', channel: 'Pastry Chef Emma Artisan', thumb: 'https://i.ytimg.com/vi/GLdnJbHqE-E/hqdefault.jpg', duration: '11:45', badge: 'Fluffy Souffle' },
        { videoId: 'xqjLvDFZxBs', title: 'Authentic Venetian Mascarpone Tiramisu with Dutch Cocoa', channel: 'Chef Sofia Pasticceria', thumb: 'https://i.ytimg.com/vi/xqjLvDFZxBs/hqdefault.jpg', duration: '12:30', badge: 'Italian Dolce' },
        { videoId: 'rSu43d_0pJQ', title: 'Rustic French Free-Form Butter Galette with Fruit & Thyme', channel: 'Chef Claire Fontaine', thumb: 'https://i.ytimg.com/vi/rSu43d_0pJQ/hqdefault.jpg', duration: '11:05', badge: 'Flaky Pastry' },
        { videoId: 'RWD30vY1OGk', title: 'Artisan Brioche French Toast with Caramelized Vanilla Pears', channel: 'Chef Chloe Brunch Bar', thumb: 'https://i.ytimg.com/vi/RWD30vY1OGk/hqdefault.jpg', duration: '8:50', badge: 'Gourmet Brunch' },
        { videoId: 'pmzQH4NoUJI', title: 'Golden Crispy Churros with Spiced Dark Chocolate Dip', channel: 'Ben Chelin Kitchen', thumb: 'https://i.ytimg.com/vi/pmzQH4NoUJI/hqdefault.jpg', duration: '9:40', badge: 'Artisan Sweets' }
      ];
    }

    // General / Custom / Any Other Recipe Search (Dynamic Fallback from Catalog)
    const matchingRecipes = getAllRecipes().filter(r => 
      r.title.toLowerCase().includes(q) || 
      r.cuisine.toLowerCase().includes(q) || 
      r.category.toLowerCase().includes(q) ||
      (r.tags || []).some(t => t.toLowerCase().includes(q))
    );

    const baseList = matchingRecipes.length >= 3 ? matchingRecipes : getAllRecipes();
    return baseList.slice(0, 6).map((r, i) => ({
      videoId: r.youtubeId || ['clH40DW57xA', 'a03U45jFxOI', 'INh6tzqQI0s', '-oefWiNuxBY', '53RSO_o1DX0', 'GLdnJbHqE-E'][i % 6],
      title: `${r.title} — Step-by-Step Culinary Masterclass`,
      channel: r.author ? r.author.name : 'TastyNest Culinary Studio',
      thumb: r.image || `https://img.youtube.com/vi/${r.youtubeId}/hqdefault.jpg`,
      duration: r.videoDuration || '12:30',
      badge: r.cuisine || 'Masterclass'
    }));
  }

  // Live YouTube Video Search Engine (Supports ANY recipe name typed by user)
  async function searchYouTube(query) {
    let cleanQuery = (query || '').trim();
    if (!cleanQuery) {
      const inputEl = document.getElementById('yt-explore-input');
      cleanQuery = inputEl && inputEl.value.trim() ? inputEl.value.trim() : "Potato Recipe";
    }
    state.activeYoutubeQuery = cleanQuery;

    // Sync input field
    const inputField = document.getElementById('yt-explore-input');
    if (inputField && inputField.value !== cleanQuery) {
      inputField.value = cleanQuery;
    }

    // Update active style on popular chips
    document.querySelectorAll('.yt-popular-chip').forEach(chip => {
      if (chip.textContent.trim().toLowerCase() === cleanQuery.toLowerCase()) {
        chip.classList.add('bg-rose-600', 'text-white', 'border-rose-500');
        chip.classList.remove('bg-white/10', 'text-white/90');
      } else {
        chip.classList.remove('bg-rose-600', 'border-rose-500');
        chip.classList.add('bg-white/10', 'text-white/90');
      }
    });

    const container = document.getElementById('youtube-search-results');
    if (!container) return;

    // Animated Loading Skeleton
    container.innerHTML = `
      <div class="col-span-full py-6 flex flex-col items-center justify-center text-center space-y-3">
        <div class="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs text-stone-200">
          <div class="w-4 h-4 rounded-full border-2 border-rose-500 border-t-transparent animate-spin"></div>
          <span>Connecting to YouTube Data API for "<strong>${escapeHTML(cleanQuery)}</strong>"...</span>
        </div>
      </div>
      ${[1, 2, 3].map(() => `
        <div class="rounded-2xl bg-white/5 border border-white/10 overflow-hidden animate-pulse h-64 flex flex-col justify-between p-4">
          <div class="w-full h-36 bg-white/10 rounded-xl"></div>
          <div class="space-y-2 pt-3">
            <div class="w-3/4 h-4 bg-white/10 rounded"></div>
            <div class="w-1/2 h-3 bg-white/10 rounded"></div>
          </div>
        </div>
      `).join('')}
    `;

    let videoItems = [];
    let isLiveApi = false;

    try {
      const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(cleanQuery)}+cooking+recipe&type=video&videoEmbeddable=true&maxResults=6&key=${state.youtubeApiKey}`;
      const res = await fetch(endpoint);
      
      if (res.ok) {
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          isLiveApi = true;
          videoItems = data.items.map(item => ({
            videoId: item.id.videoId,
            title: item.snippet.title,
            channel: item.snippet.channelTitle,
            thumb: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || `https://img.youtube.com/vi/${item.id.videoId}/hqdefault.jpg`,
            duration: 'Chef Video',
            badge: 'YouTube Live Feed'
          }));
        }
      }
    } catch (apiErr) {
      console.warn("YouTube Data API fetch notice, switching to knowledge-graph fallback:", apiErr);
    }

    // If API returned 0 items, exceeded quota (403), or network failed, invoke knowledge graph fallback
    if (!videoItems || videoItems.length === 0) {
      videoItems = getFallbackYouTubeVideos(cleanQuery);
      isLiveApi = false;
    }

    // Cache results in state map for safe click handling
    state.youtubeSearchResults = videoItems;
    state.youtubeSearchResultsMap = {};
    videoItems.forEach(v => {
      state.youtubeSearchResultsMap[v.videoId] = v;
    });

    // Render Clean High-End Video Cards
    container.innerHTML = `
      <!-- Search Feedback Header Banner -->
      <div class="col-span-full flex items-center justify-between gap-3 pb-2 text-xs border-b border-white/10">
        <div class="flex items-center gap-2 text-stone-300">
          <span class="w-2 h-2 rounded-full ${isLiveApi ? 'bg-emerald-400' : 'bg-rose-400'} animate-pulse"></span>
          <span>Found <strong>${videoItems.length}</strong> masterclass videos for "<strong>${escapeHTML(cleanQuery)}</strong>"</span>
          <span class="text-[10px] px-2 py-0.5 rounded-full ${isLiveApi ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'}">
            ${isLiveApi ? 'Live YouTube API' : 'Curated Studio Feed'}
          </span>
        </div>
        <button onclick="TastyApp.searchYouTube('Butter Chicken')" class="text-stone-400 hover:text-white text-[11px] underline">
          Reset to Butter Chicken
        </button>
      </div>

      ${videoItems.map(item => {
        const vId = item.videoId;
        const vTitle = escapeHTML(item.title);
        const vChannel = escapeHTML(item.channel);
        const vThumb = item.thumb;
        const vBadge = item.badge || 'Chef Masterclass';

        return `
          <div class="modern-card rounded-2xl overflow-hidden bg-white/5 dark:bg-[#161B18] border border-white/10 shadow-clean-sm flex flex-col justify-between group hover:border-rose-500/50 transition-all">
            <div class="relative w-full h-44 bg-black card-img-wrap cursor-pointer" onclick="TastyApp.playYouTubeInModal('${vId}')">
              <img src="${vThumb}" alt="${vTitle}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
              
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <i data-lucide="play" class="w-5 h-5 fill-current translate-x-0.5"></i>
                </div>
              </div>

              <span class="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-bold text-rose-400 flex items-center gap-1 border border-white/10">
                <i data-lucide="youtube" class="w-3 h-3 text-rose-500"></i> ${vBadge}
              </span>

              <span class="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/75 text-white text-[10px] font-mono font-bold">
                ${item.duration || 'Full Video'}
              </span>
            </div>

            <div class="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 class="font-editorial text-base font-semibold text-white group-hover:text-rose-400 line-clamp-2 transition-colors cursor-pointer leading-snug" onclick="TastyApp.playYouTubeInModal('${vId}')">
                  ${vTitle}
                </h4>
                <p class="text-[11px] text-stone-300 mt-1.5 flex items-center gap-1.5 truncate">
                  <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  <span class="font-medium">${vChannel}</span>
                </p>
              </div>

              <div class="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <button 
                  onclick="TastyApp.playYouTubeInModal('${vId}')" 
                  class="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i>
                  <span>Play in Studio</span>
                </button>
                <a 
                  href="https://www.youtube.com/watch?v=${vId}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="px-2.5 py-1.5 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>YouTube</span>
                  <i data-lucide="external-link" class="w-3 h-3"></i>
                </a>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    `;

    if (window.lucide) lucide.createIcons();
  }

  // Custom API Key Management Dialog
  function openApiKeyModal() {
    const currentKey = state.youtubeApiKey;
    const userKey = prompt("Configure your custom Google YouTube Data API v3 Key (Leave empty to use default studio key):", currentKey);
    if (userKey !== null) {
      const trimmed = userKey.trim();
      if (trimmed) {
        state.youtubeApiKey = trimmed;
        localStorage.setItem('tastynest_custom_yt_key', trimmed);
        showNotification('YouTube API Key updated successfully!', 'success');
      } else {
        localStorage.removeItem('tastynest_custom_yt_key');
        state.youtubeApiKey = 'AIzaSyA6gqytrRIVh8YlWjLQ82z2uJgXn9JPD1k';
        showNotification('Reset to default studio YouTube API key.', 'info');
      }
      searchYouTube(state.activeYoutubeQuery || 'Potato Recipe');
    }
  }

  // Master Render Engine
  function renderView() {
    const root = document.getElementById('app-root');
    if (!root) return;

    switch (state.currentView) {
      case 'home':
        root.innerHTML = renderHomeView();
        break;
      case 'explore':
        root.innerHTML = renderExploreView();
        break;
      case 'videos':
        root.innerHTML = renderVideosView();
        setTimeout(() => {
          if (document.getElementById('youtube-search-results')) {
            searchYouTube(state.activeYoutubeQuery || 'Potato Recipe');
          }
        }, 60);
        break;
      case 'admin':
        root.innerHTML = renderAdminView();
        break;
      case 'admin-denied':
        root.innerHTML = renderAdminDeniedView();
        break;
      case 'recipe-detail':
        root.innerHTML = renderRecipeDetailView();
        break;
      case 'categories':
        root.innerHTML = renderCategoriesView();
        break;
      case 'favorites':
        root.innerHTML = renderFavoritesView();
        break;
      case 'planner':
        root.innerHTML = renderPlannerView();
        break;
      case 'shopping':
        root.innerHTML = renderShoppingView();
        break;
      case 'add-recipe':
        root.innerHTML = renderAddRecipeView();
        break;
      case 'profile':
        root.innerHTML = renderProfileView();
        break;
      default:
        root.innerHTML = renderHomeView();
    }

    if (window.lucide) lucide.createIcons();
  }

  // ==========================================
  // VIEW 1: CLEAN MODERN HOMEPAGE
  // ==========================================
  function renderHomeView() {
    const heroRecipe = getRecipeById('wild-mushroom-truffle-risotto') || getAllRecipes()[0];
    const trending = getAllRecipes().filter(r => r.trending).slice(0, 4);

    return `
      <div class="space-y-16 sm:space-y-20 pb-16">
        
        <!-- MODERN HERO SECTION -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
          <div class="flex flex-col space-y-6 max-w-3xl">
            
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100/90 dark:bg-white/10 text-ink-700 dark:text-zinc-300 text-xs font-semibold w-max border border-stone-200/50 dark:border-white/10">
              <span class="w-1.5 h-1.5 rounded-full bg-citrus-500"></span>
              <span>Issue № 48 · Autumn Harvest Edition</span>
            </div>

            <h1 class="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-ink-900 dark:text-white leading-[1.05]">
              Cook with Passion, <br/>
              <span class="italic text-citrus-600 dark:text-citrus-400">Savor Every Bite.</span>
            </h1>

            <p class="text-sm sm:text-base text-ink-600 dark:text-zinc-300 max-w-xl font-normal leading-relaxed">
              2,500+ curated recipes by passionate chefs. Designed with dynamic serving scalers, live step-by-step cooking timers, and intuitive weekly meal planning.
            </p>

            <!-- Floating Modern Search Bar -->
            <div class="pt-2">
              <div class="relative w-full max-w-xl bg-white dark:bg-[#161B18] rounded-2xl shadow-clean-md border border-stone-200/70 dark:border-white/10 p-2 flex items-center gap-2">
                <div class="pl-3 text-ink-400 dark:text-zinc-400">
                  <i data-lucide="search" class="w-4 h-4"></i>
                </div>
                <input 
                  type="text" 
                  id="hero-search-input"
                  onkeydown="if(event.key==='Enter') TastyApp.handleHeroSearch(this.value)"
                  placeholder="What are you craving today? (e.g. Salmon, Truffle, Gnocchi)..." 
                  class="flex-1 bg-transparent text-ink-900 dark:text-zinc-100 placeholder-ink-400 dark:placeholder-zinc-500 text-xs sm:text-sm focus:outline-none py-2"
                />
                <button 
                  onclick="TastyApp.handleHeroSearch(document.getElementById('hero-search-input').value)"
                  class="px-5 py-2.5 rounded-xl bg-ink-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0"
                >
                  <span>Search</span>
                  <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                </button>
              </div>

              <!-- Filter Chips -->
              <div class="flex items-center gap-1.5 overflow-x-auto py-3 text-xs font-medium text-ink-600 dark:text-zinc-300">
                <button onclick="TastyApp.quickFilterTag('All')" class="px-3 py-1 rounded-full bg-ink-900 dark:bg-emerald-600 text-white font-semibold">All</button>
                <button onclick="TastyApp.quickFilterTag('Quick Recipes')" class="px-3 py-1 rounded-full bg-white dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 text-ink-700 dark:text-zinc-300 border border-stone-200/60 dark:border-white/10 transition-colors whitespace-nowrap">⚡ Under 20 min</button>
                <button onclick="TastyApp.quickFilterTag('Italian')" class="px-3 py-1 rounded-full bg-white dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 text-ink-700 dark:text-zinc-300 border border-stone-200/60 dark:border-white/10 transition-colors whitespace-nowrap">🍝 Italian</button>
                <button onclick="TastyApp.quickFilterTag('Indian')" class="px-3 py-1 rounded-full bg-white dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 text-ink-700 dark:text-zinc-300 border border-stone-200/60 dark:border-white/10 transition-colors whitespace-nowrap">🍛 Indian</button>
                <button onclick="TastyApp.quickFilterTag('Healthy Meals')" class="px-3 py-1 rounded-full bg-white dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 text-ink-700 dark:text-zinc-300 border border-stone-200/60 dark:border-white/10 transition-colors whitespace-nowrap">🥗 Clean Eating</button>
                <button onclick="TastyApp.quickFilterTag('Desserts')" class="px-3 py-1 rounded-full bg-white dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 text-ink-700 dark:text-zinc-300 border border-stone-200/60 dark:border-white/10 transition-colors whitespace-nowrap">🍰 Desserts</button>
              </div>
            </div>

          </div>

          <!-- CURATOR'S CHOICE HERO SHOWCASE -->
          <div class="mt-8">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <i data-lucide="sparkles" class="w-4 h-4 text-citrus-500"></i>
                <h2 class="font-editorial text-xl font-semibold text-ink-900 dark:text-white">Curator's Choice</h2>
              </div>
              <span class="text-xs font-bold uppercase tracking-wider text-citrus-600 dark:text-citrus-400">Featured Today</span>
            </div>

            <article class="modern-card rounded-3xl overflow-hidden bg-white dark:bg-[#161B18] border border-stone-200/70 dark:border-white/10 shadow-clean-sm flex flex-col lg:flex-row">
              <!-- Left/Top Image -->
              <div class="relative w-full lg:w-3/5 h-72 sm:h-80 lg:h-96 card-img-wrap bg-stone-100 dark:bg-stone-800">
                <img src="${heroRecipe.image}" alt="${heroRecipe.title}" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                <div class="absolute top-4 left-4 flex items-center gap-2">
                  <span class="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-ink-900 font-bold text-xs shadow-clean-sm flex items-center gap-1">
                    <i data-lucide="timer" class="w-3.5 h-3.5 text-ink-600"></i> ${heroRecipe.prepTime + heroRecipe.cookTime} mins
                  </span>
                  <span class="px-3 py-1 rounded-full bg-citrus-100/95 backdrop-blur-md text-citrus-700 font-bold text-xs shadow-clean-sm">
                    ${heroRecipe.difficulty}
                  </span>
                </div>

                <button 
                  onclick="TastyApp.toggleFavorite('${heroRecipe.id}', event)"
                  class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-ink-700 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-clean-sm"
                  title="Save Recipe"
                >
                  <i data-lucide="heart" class="w-4 h-4 ${state.favorites.includes(heroRecipe.id) ? 'fill-citrus-500 text-citrus-500' : 'text-ink-600'}"></i>
                </button>

                <div class="absolute bottom-4 left-4 right-4 text-white">
                  <div class="flex items-center gap-1.5 text-amber-300 text-xs font-bold mb-1">
                    <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-300 text-amber-300"></i>
                    <span>${heroRecipe.rating}</span>
                    <span class="text-white/80 font-normal">(${heroRecipe.reviewsCount} reviews)</span>
                  </div>
                  <h3 class="font-editorial text-2xl sm:text-3xl font-semibold leading-tight text-white drop-shadow-sm">
                    ${heroRecipe.title}
                  </h3>
                </div>
              </div>

              <!-- Right/Bottom Info -->
              <div class="w-full lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <img src="${heroRecipe.author.avatar}" alt="${heroRecipe.author.name}" class="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <p class="text-xs font-bold text-ink-900 dark:text-white">${heroRecipe.author.name}</p>
                        <p class="text-[11px] text-ink-500 dark:text-zinc-400">${heroRecipe.author.title}</p>
                      </div>
                    </div>
                    <span class="text-xs text-ink-400 dark:text-zinc-400 font-medium">4 Servings</span>
                  </div>

                  <p class="text-xs sm:text-sm text-ink-600 dark:text-zinc-300 leading-relaxed">
                    ${heroRecipe.description}
                  </p>
                </div>

                <div class="pt-4 border-t border-stone-100 dark:border-white/10 flex items-center gap-2">
                  <button 
                    onclick="TastyApp.navigateTo('recipe-detail', { recipeId: '${heroRecipe.id}' })"
                    class="flex-1 py-3 px-5 rounded-xl bg-ink-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Start Cooking</span>
                    <i data-lucide="arrow-right" class="w-4 h-4"></i>
                  </button>

                  <button 
                    onclick="TastyApp.shareRecipe('${heroRecipe.title}')"
                    class="w-11 h-11 rounded-xl border border-stone-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-stone-50 dark:hover:bg-white/10 text-ink-600 dark:text-zinc-300 flex items-center justify-center transition-colors"
                    title="Share recipe"
                  >
                    <i data-lucide="share-2" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>

        <!-- ARTISAN KITCHENS CATEGORIES -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-editorial text-2xl font-semibold text-ink-900 dark:text-white">Artisan Kitchens</h2>
            <button onclick="TastyApp.navigateTo('categories')" class="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 hover:underline">
              View All 8 Categories &rarr;
            </button>
          </div>

          <div class="flex items-center gap-4 overflow-x-auto py-2 scrollbar-none">
            ${CATEGORIES_DATA.map(cat => `
              <div 
                onclick="TastyApp.navigateTo('explore', { category: '${cat.id}' })"
                class="group cursor-pointer shrink-0 flex flex-col items-center space-y-2 text-center w-24"
              >
                <div class="w-18 h-18 rounded-full overflow-hidden p-0.5 bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-white/10 shadow-clean-sm group-hover:scale-105 group-hover:border-emerald-600 transition-all duration-300">
                  <img src="${cat.image}" alt="${cat.name}" class="w-full h-full rounded-full object-cover" />
                </div>
                <span class="text-xs font-bold text-ink-800 dark:text-zinc-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors truncate w-full">${cat.id}</span>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- TRENDING IN KITCHENS -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="font-editorial text-2xl sm:text-3xl font-semibold text-ink-900 dark:text-white">Trending in Kitchens</h2>
              <p class="text-xs text-ink-500 dark:text-zinc-400 mt-0.5">Most cooked dishes by our community this week</p>
            </div>
            <button onclick="TastyApp.navigateTo('explore')" class="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">
              Browse All &rarr;
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${getAllRecipes().slice(0, 6).map(recipe => renderModernRecipeCard(recipe)).join('')}
          </div>
        </section>

        <!-- VIDEO MASTERCLASSES SHOWCASE -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="p-6 sm:p-10 rounded-3xl bg-stone-900 dark:bg-[#141916] text-white border border-stone-800 dark:border-white/10 shadow-clean-xl space-y-8">
            <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 text-rose-400 text-xs font-semibold border border-rose-500/25 mb-2">
                  <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                  <span>HD Video Masterclasses</span>
                </div>
                <h2 class="font-editorial text-3xl sm:text-4xl font-semibold text-white">Watch Master Chefs in Action</h2>
                <p class="text-xs sm:text-sm text-stone-300 max-w-xl mt-1 leading-relaxed">
                  Stream high-definition step-by-step cooking videos with chapter markers and technique secrets.
                </p>
              </div>
              <button onclick="TastyApp.navigateTo('videos')" class="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all shrink-0">
                <i data-lucide="play" class="w-3.5 h-3.5 fill-white"></i>
                <span>Explore All Video Masterclasses &rarr;</span>
              </button>
            </div>

            <!-- Video Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              ${getAllRecipes().filter(r => r.hasVideo).slice(0, 3).map(recipe => `
                <div class="rounded-2xl overflow-hidden bg-stone-950 border border-white/10 flex flex-col group hover:border-rose-500/40 transition-all">
                  <div class="relative w-full h-48 bg-black card-img-wrap cursor-pointer" onclick="TastyApp.openVideoModal('${recipe.id}', event)">
                    <img src="${recipe.image}" alt="${recipe.title}" class="w-full h-full object-cover opacity-85 group-hover:opacity-95 transition-opacity" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="w-12 h-12 rounded-full bg-white/90 text-rose-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <i data-lucide="play" class="w-5 h-5 fill-current translate-x-0.5"></i>
                      </div>
                    </div>

                    <span class="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-md text-white font-mono text-[10px] font-semibold flex items-center gap-1">
                      <i data-lucide="timer" class="w-3 h-3 text-rose-400"></i> ${recipe.videoDuration}
                    </span>
                    <span class="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-rose-600/90 text-white text-[10px] font-bold">
                      ${recipe.cuisine}
                    </span>
                  </div>

                  <div class="p-4 flex flex-col flex-1 justify-between space-y-3">
                    <div>
                      <h4 onclick="TastyApp.openVideoModal('${recipe.id}', event)" class="font-editorial text-lg font-semibold text-white group-hover:text-rose-400 transition-colors line-clamp-1 cursor-pointer">
                        ${recipe.title}
                      </h4>
                      <p class="text-xs text-stone-400 line-clamp-2 mt-1 leading-relaxed">
                        ${recipe.description}
                      </p>
                    </div>

                    <div class="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                      <span class="text-[11px] text-stone-400">${recipe.author.name}</span>
                      <button onclick="TastyApp.openVideoModal('${recipe.id}', event)" class="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1">
                        <span>Play Video</span>
                        <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                      </button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- EDITORIAL MASTERCLASS SPOTLIGHT -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="rounded-3xl overflow-hidden bg-ink-900 text-white shadow-clean-lg grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div class="lg:col-span-7 p-8 sm:p-12 space-y-4">
              <span class="px-3 py-1 rounded-full bg-citrus-600 text-white text-[10px] font-bold uppercase tracking-wider">
                Masterclass Edition
              </span>
              <h3 class="font-editorial text-3xl sm:text-4xl font-semibold text-white leading-tight">
                The Art of Cold Weather Roasting
              </h3>
              <p class="text-xs sm:text-sm text-ink-200 leading-relaxed font-normal max-w-lg">
                Master the exact caramelization ratios, cast-iron thermal distribution, and spice pairings to turn simple root vegetables into gourmet triumphs.
              </p>
              <div class="pt-2 flex items-center justify-between max-w-sm text-xs text-ink-300">
                <span class="flex items-center gap-1.5"><i data-lucide="book-open" class="w-3.5 h-3.5"></i> 8 min read · 4 Techniques</span>
                <button onclick="TastyApp.navigateTo('recipe-detail', { recipeId: 'beetroot-goat-cheese-galette' })" class="px-4 py-2 rounded-xl bg-white text-ink-900 font-bold hover:bg-stone-100 transition-all">
                  Read Story &rarr;
                </button>
              </div>
            </div>

            <div class="lg:col-span-5 h-64 lg:h-full relative min-h-[260px] bg-ink-800">
              <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80" alt="Roasting" class="w-full h-full object-cover opacity-85" />
            </div>

          </div>
        </section>

        <!-- COMMUNITY METRICS BAR -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="rounded-3xl bg-white dark:bg-[#141916] border border-stone-200/70 dark:border-white/10 p-6 sm:p-8 shadow-clean-sm">
            <div class="grid grid-cols-3 gap-4 text-center divide-x divide-stone-100 dark:divide-white/10">
              <div>
                <span class="font-editorial text-3xl sm:text-4xl font-bold text-ink-900 dark:text-white">145k+</span>
                <span class="block text-xs text-ink-500 dark:text-zinc-400 mt-1">Active Home Chefs</span>
              </div>
              <div>
                <span class="font-editorial text-3xl sm:text-4xl font-bold text-ink-900 dark:text-white">4.96 ★</span>
                <span class="block text-xs text-ink-500 dark:text-zinc-400 mt-1">Recipe Accuracy</span>
              </div>
              <div>
                <span class="font-editorial text-3xl sm:text-4xl font-bold text-ink-900 dark:text-white">820k+</span>
                <span class="block text-xs text-ink-500 dark:text-zinc-400 mt-1">Planned Weekly Meals</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    `;
  }

  // Modern Clean Recipe Card
  function renderModernRecipeCard(recipe) {
    const isFav = state.favorites.includes(recipe.id);
    const totalTime = recipe.prepTime + recipe.cookTime;

    return `
      <article class="modern-card rounded-3xl overflow-hidden bg-white dark:bg-[#161B18] border border-stone-200/70 dark:border-white/10 shadow-clean-sm flex flex-col group transition-all">
        <!-- Card Image -->
        <div class="relative w-full h-52 sm:h-56 bg-stone-100 dark:bg-stone-800 card-img-wrap cursor-pointer" onclick="TastyApp.navigateTo('recipe-detail', { recipeId: '${recipe.id}' })">
          <img src="${recipe.image}" alt="${recipe.title}" class="w-full h-full object-cover" loading="lazy" />
          
          ${recipe.hasVideo ? `
            <button 
              onclick="TastyApp.openVideoModal('${recipe.id}', event)"
              class="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-rose-600/95 hover:bg-rose-500 text-white font-bold text-[10px] shadow-sm flex items-center gap-1.5 backdrop-blur-md transition-all hover:scale-105 z-10"
              title="Watch Video Masterclass"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              <i data-lucide="play" class="w-2.5 h-2.5 fill-current"></i>
              <span>Video (${recipe.videoDuration || 'HD'})</span>
            </button>
          ` : ''}

          <span class="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-white font-mono text-[10px] font-semibold">
            ${totalTime}m
          </span>

          <button 
            onclick="TastyApp.toggleFavorite('${recipe.id}', event)"
            class="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 dark:bg-stone-800/90 backdrop-blur-md text-ink-700 dark:text-zinc-200 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-clean-sm z-10"
            title="Save Recipe"
          >
            <i data-lucide="heart" class="w-4 h-4 ${isFav ? 'fill-citrus-500 text-citrus-500' : 'text-ink-600 dark:text-zinc-300'}"></i>
          </button>
        </div>

        <!-- Card Content -->
        <div class="p-5 flex flex-col flex-1 justify-between space-y-3">
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-[11px]">
              <span class="font-bold text-citrus-600 dark:text-citrus-400 uppercase tracking-wider">${recipe.cuisine}</span>
              <div class="flex items-center gap-1 text-ink-900 dark:text-zinc-100 font-bold">
                <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i>
                <span>${recipe.rating}</span>
                <span class="text-ink-400 dark:text-zinc-500 font-normal">(${recipe.reviewsCount})</span>
              </div>
            </div>

            <h3 
              onclick="TastyApp.navigateTo('recipe-detail', { recipeId: '${recipe.id}' })"
              class="font-editorial text-xl font-semibold text-ink-900 dark:text-zinc-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-1 cursor-pointer"
            >
              ${recipe.title}
            </h3>

            <p class="text-xs text-ink-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
              ${recipe.description}
            </p>
          </div>

          <!-- Bottom Footer -->
          <div class="pt-3 border-t border-stone-100 dark:border-white/5 flex items-center justify-between text-xs">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-white/10 text-ink-700 dark:text-zinc-300 font-semibold text-[10px]">${recipe.difficulty}</span>
              <span class="text-ink-400 dark:text-zinc-500 text-[11px]">· ${recipe.calories} kcal</span>
            </div>

            <div class="flex items-center gap-1.5">
              ${recipe.hasVideo ? `
                <button 
                  onclick="TastyApp.openVideoModal('${recipe.id}', event)"
                  class="p-1.5 rounded-lg text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  title="Watch Video Masterclass"
                >
                  <i data-lucide="play-circle" class="w-4 h-4"></i>
                </button>
              ` : ''}

              <button 
                onclick="TastyApp.openMealPlanModal('${recipe.id}', event)"
                class="p-1.5 rounded-lg text-ink-400 hover:text-ink-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/10 transition-colors"
                title="Add to Meal Plan"
              >
                <i data-lucide="calendar-plus" class="w-4 h-4"></i>
              </button>
              <button 
                onclick="TastyApp.navigateTo('recipe-detail', { recipeId: '${recipe.id}' })"
                class="font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 flex items-center gap-0.5"
              >
                <span>View</span>
                <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  // ==========================================
  // VIEW 2: RECIPE EXPLORE PAGE (Clean Modern Filter Grid)
  // ==========================================
  function toggleVideoOnlyFilter() {
    state.filters.videoOnly = !state.filters.videoOnly;
    renderView();
  }

  function renderExploreView() {
    let recipes = getAllRecipes();

    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase();
      recipes = recipes.filter(r => 
        r.title.toLowerCase().includes(q) || 
        r.description.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.ingredients.some(i => i.item.toLowerCase().includes(q))
      );
    }

    if (state.filters.category !== 'All') {
      recipes = recipes.filter(r => r.category === state.filters.category);
    }

    if (state.filters.cuisine !== 'All') {
      recipes = recipes.filter(r => r.cuisine === state.filters.cuisine);
    }

    if (state.filters.difficulty !== 'All') {
      recipes = recipes.filter(r => r.difficulty === state.filters.difficulty);
    }

    if (state.filters.videoOnly) {
      recipes = recipes.filter(r => r.hasVideo);
    }

    if (state.filters.dietary === 'veg') {
      recipes = recipes.filter(r => r.isVegetarian);
    } else if (state.filters.dietary === 'gluten-free') {
      recipes = recipes.filter(r => r.isGlutenFree);
    }

    if (state.filters.sortBy === 'rating') {
      recipes.sort((a, b) => b.rating - a.rating);
    } else if (state.filters.sortBy === 'quickest') {
      recipes.sort((a, b) => (a.prepTime + a.cookTime) - (b.prepTime + b.cookTime));
    } else if (state.filters.sortBy === 'calories') {
      recipes.sort((a, b) => a.calories - b.calories);
    }

    const categoriesList = ['All', 'Indian', 'Italian', 'Chinese', 'Desserts', 'Breakfast', 'Healthy Meals', 'Street Food', 'Quick Recipes'];

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <!-- Header -->
        <div class="space-y-1">
          <h1 class="font-editorial text-4xl sm:text-5xl font-semibold text-ink-900 dark:text-white">Explore Recipes</h1>
          <p class="text-xs sm:text-sm text-ink-500 dark:text-zinc-400">Discover chef-crafted recipes with dynamic ingredient scaling, step timers, and video walkthroughs.</p>
        </div>

        <!-- Filter Bar -->
        <div class="p-5 rounded-3xl bg-white dark:bg-[#161B18] border border-stone-200/70 dark:border-white/10 shadow-clean-sm space-y-4">
          
          <div class="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div class="relative w-full sm:max-w-md">
              <i data-lucide="search" class="w-4 h-4 text-ink-400 dark:text-zinc-400 absolute left-3.5 top-3"></i>
              <input 
                type="text" 
                value="${state.searchQuery}"
                oninput="TastyApp.setSearchQuery(this.value)"
                placeholder="Search by title, ingredient, cuisine..."
                class="w-full pl-9 pr-8 py-2 rounded-xl bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 text-xs text-ink-900 dark:text-zinc-100 placeholder-ink-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
              ${state.searchQuery ? `
                <button onclick="TastyApp.setSearchQuery('')" class="absolute right-2.5 top-2.5 text-ink-400 dark:text-zinc-400 hover:text-ink-700 dark:hover:text-zinc-200">
                  <i data-lucide="x" class="w-3.5 h-3.5"></i>
                </button>
              ` : ''}
            </div>

            <div class="flex items-center gap-2.5 w-full sm:w-auto justify-end text-xs">
              <span class="text-ink-400 dark:text-zinc-400 font-medium">Sort:</span>
              <select 
                onchange="TastyApp.setFilter('sortBy', this.value)"
                class="px-3 py-2 rounded-xl bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 text-xs font-semibold text-ink-800 dark:text-zinc-200 focus:outline-none"
              >
                <option value="featured" ${state.filters.sortBy === 'featured' ? 'selected' : ''}>Featured</option>
                <option value="rating" ${state.filters.sortBy === 'rating' ? 'selected' : ''}>Highest Rated (★)</option>
                <option value="quickest" ${state.filters.sortBy === 'quickest' ? 'selected' : ''}>Quickest Prep</option>
                <option value="calories" ${state.filters.sortBy === 'calories' ? 'selected' : ''}>Lowest Calories</option>
              </select>

              <button onclick="TastyApp.resetFilters()" class="text-xs font-semibold text-citrus-600 dark:text-citrus-400 hover:underline">
                Reset
              </button>
            </div>
          </div>

          <!-- Category Pills & Video Filter -->
          <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button 
              onclick="TastyApp.toggleVideoOnlyFilter()" 
              class="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${state.filters.videoOnly ? 'bg-rose-600 text-white shadow-2xs' : 'bg-stone-100 dark:bg-white/10 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40'}"
            >
              <i data-lucide="play-circle" class="w-3.5 h-3.5 ${state.filters.videoOnly ? 'fill-white text-rose-600' : 'text-rose-600 dark:text-rose-400'}"></i>
              <span>With Video Only (${getAllRecipes().filter(r => r.hasVideo).length})</span>
            </button>

            ${categoriesList.map(cat => `
              <button 
                onclick="TastyApp.setFilter('category', '${cat}')"
                class="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${state.filters.category === cat ? 'bg-ink-900 dark:bg-emerald-600 text-white shadow-2xs' : 'bg-stone-100 dark:bg-white/10 text-ink-700 dark:text-zinc-300 hover:bg-stone-200/80 dark:hover:bg-white/15'}"
              >
                ${cat}
              </button>
            `).join('')}
          </div>

          <!-- Secondary Filters -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-stone-100 dark:border-white/5 text-xs">
            <div>
              <label class="block text-[10px] font-bold uppercase text-ink-400 dark:text-zinc-400 mb-1">Cuisine</label>
              <select onchange="TastyApp.setFilter('cuisine', this.value)" class="w-full px-2.5 py-1.5 rounded-lg bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 text-xs text-ink-800 dark:text-zinc-200 focus:outline-none">
                <option value="All">All Cuisines</option>
                <option value="Italian">Italian</option>
                <option value="Indian">Indian</option>
                <option value="Chinese">Chinese</option>
                <option value="French">French</option>
                <option value="American">American</option>
                <option value="Mediterranean">Mediterranean</option>
                <option value="Mexican">Mexican</option>
              </select>
            </div>

            <div>
              <label class="block text-[10px] font-bold uppercase text-ink-400 dark:text-zinc-400 mb-1">Difficulty</label>
              <select onchange="TastyApp.setFilter('difficulty', this.value)" class="w-full px-2.5 py-1.5 rounded-lg bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 text-xs text-ink-800 dark:text-zinc-200 focus:outline-none">
                <option value="All">All Levels</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div class="col-span-2">
              <label class="block text-[10px] font-bold uppercase text-ink-400 dark:text-zinc-400 mb-1">Dietary</label>
              <div class="grid grid-cols-3 gap-1 text-center font-medium">
                <button onclick="TastyApp.setFilter('dietary', 'all')" class="py-1.5 rounded-lg border text-xs ${state.filters.dietary === 'all' ? 'bg-ink-900 dark:bg-emerald-600 text-white border-transparent' : 'bg-stone-50 dark:bg-white/5 border-stone-200 dark:border-white/10 text-ink-700 dark:text-zinc-300'}">All</button>
                <button onclick="TastyApp.setFilter('dietary', 'veg')" class="py-1.5 rounded-lg border text-xs ${state.filters.dietary === 'veg' ? 'bg-ink-900 dark:bg-emerald-600 text-white border-transparent' : 'bg-stone-50 dark:bg-white/5 border-stone-200 dark:border-white/10 text-ink-700 dark:text-zinc-300'}">Veg</button>
                <button onclick="TastyApp.setFilter('dietary', 'gluten-free')" class="py-1.5 rounded-lg border text-xs ${state.filters.dietary === 'gluten-free' ? 'bg-ink-900 dark:bg-emerald-600 text-white border-transparent' : 'bg-stone-50 dark:bg-white/5 border-stone-200 dark:border-white/10 text-ink-700 dark:text-zinc-300'}">Gluten-Free</button>
              </div>
            </div>
          </div>

        </div>

        <!-- Recipe Count -->
        <p class="text-xs text-ink-400 dark:text-zinc-400 font-medium">Showing <strong class="text-ink-900 dark:text-white font-bold">${recipes.length}</strong> recipes</p>

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${recipes.map(recipe => renderModernRecipeCard(recipe)).join('')}
        </div>

      </div>
    `;
  }

  // ==========================================
  // VIEW: RECIPE VIDEOS & MASTERCLASSES HUB
  // ==========================================
  function renderVideosView() {
    const videoRecipes = getAllRecipes().filter(r => r.hasVideo);
    const featuredVideoRecipe = videoRecipes[0] || getAllRecipes()[0];

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        <!-- Video Hub Header -->
        <div class="space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 text-xs font-semibold border border-rose-500/25">
            <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span>TastyNest Cinema · ${videoRecipes.length} Masterclasses</span>
          </div>
          <h1 class="font-editorial text-4xl sm:text-6xl font-semibold text-ink-900 dark:text-white leading-tight">
            Watch, Learn, & Master Every Dish
          </h1>
          <p class="text-xs sm:text-sm text-ink-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            High-definition culinary walkthroughs with chapter markers, technique secrets, and live ingredient checklists. Click any video to launch the full-screen player.
          </p>
        </div>

        <!-- Hero Featured Video -->
        <div class="rounded-3xl overflow-hidden bg-stone-950 border border-white/10 shadow-clean-xl grid grid-cols-1 lg:grid-cols-12 items-center">
          <div class="lg:col-span-7 relative aspect-video bg-black flex items-center justify-center overflow-hidden">
            <video 
              id="featured-video-player" 
              controls 
              playsinline 
              poster="${featuredVideoRecipe.image}" 
              class="w-full h-full object-cover"
            >
              <source src="${featuredVideoRecipe.videoUrl || 'videos/cooking-demo.mp4'}" type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
          </div>

          <div class="lg:col-span-5 p-6 sm:p-8 space-y-4 text-white">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-1 rounded-full bg-rose-600 text-[10px] font-bold uppercase tracking-wider">Spotlight Masterclass</span>
              <span class="text-xs text-white/50">${featuredVideoRecipe.videoDuration} · ${featuredVideoRecipe.cuisine}</span>
            </div>

            <h2 class="font-editorial text-2xl sm:text-3xl font-semibold text-white leading-snug">
              ${featuredVideoRecipe.title}
            </h2>

            <p class="text-xs sm:text-sm text-white/70 leading-relaxed">
              ${featuredVideoRecipe.description}
            </p>

            <!-- Step Highlights -->
            <div class="space-y-2 pt-2">
              <p class="text-[11px] uppercase tracking-wider font-bold text-white/40">Technique Chapters</p>
              <div class="flex flex-wrap gap-1.5">
                ${(featuredVideoRecipe.videoChapters || []).map(ch => `
                  <button 
                    onclick="TastyApp.jumpVideoTo(${ch.time})"
                    class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/90 text-[11px] font-medium flex items-center gap-1 transition-colors hover:scale-102"
                  >
                    <i data-lucide="play" class="w-3 h-3 fill-rose-400 text-rose-400"></i> ${ch.label}
                  </button>
                `).join('')}
              </div>
            </div>

            <div class="pt-4 flex flex-wrap items-center gap-3">
              <button 
                onclick="TastyApp.openVideoModal('${featuredVideoRecipe.id}', event)"
                class="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <i data-lucide="play" class="w-4 h-4 fill-white"></i>
                <span>Theater Player</span>
              </button>
              <a 
                href="${featuredVideoRecipe.youtubeWatchUrl || 'https://www.youtube.com/watch?v=' + (featuredVideoRecipe.youtubeId || '')}"
                target="_blank"
                rel="noopener noreferrer"
                class="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <i data-lucide="youtube" class="w-3.5 h-3.5 text-rose-400"></i>
                <span>Watch on YouTube</span>
              </a>
              <button 
                onclick="TastyApp.navigateTo('recipe-detail', { recipeId: '${featuredVideoRecipe.id}' })"
                class="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all"
              >
                Recipe Guide
              </button>
            </div>
          </div>
        </div>

        <!-- Masterclass Grid -->
        <div class="space-y-6">
          <div class="flex items-center justify-between border-b border-stone-200/80 dark:border-white/10 pb-4">
            <h2 class="font-editorial text-2xl sm:text-3xl font-semibold text-ink-900 dark:text-white">All Recipe Masterclasses</h2>
            <span class="text-xs text-ink-500 dark:text-zinc-400 font-medium">${videoRecipes.length} Masterclasses</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${videoRecipes.map(recipe => `
              <div class="modern-card rounded-3xl overflow-hidden bg-white dark:bg-[#161B18] border border-stone-200/70 dark:border-white/10 shadow-clean-sm flex flex-col group">
                <div class="relative w-full h-52 bg-black card-img-wrap cursor-pointer" onclick="TastyApp.openVideoModal('${recipe.id}', event)">
                  <img src="${recipe.image}" alt="${recipe.title}" class="w-full h-full object-cover opacity-85 group-hover:opacity-95 transition-opacity" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-12 h-12 rounded-full bg-white/90 dark:bg-black/75 backdrop-blur-md text-rose-600 dark:text-rose-400 flex items-center justify-center shadow-clean-lg group-hover:scale-110 transition-transform">
                      <i data-lucide="play" class="w-5 h-5 fill-current translate-x-0.5"></i>
                    </div>
                  </div>

                  <span class="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-md text-white font-mono text-[10px] font-bold flex items-center gap-1">
                    <i data-lucide="timer" class="w-3 h-3 text-rose-400"></i> ${recipe.videoDuration}
                  </span>

                  <span class="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-rose-600/90 text-white text-[10px] font-bold">
                    ${recipe.cuisine}
                  </span>
                </div>

                <div class="p-5 flex flex-col flex-1 justify-between space-y-3">
                  <div>
                    <h3 onclick="TastyApp.openVideoModal('${recipe.id}', event)" class="font-editorial text-xl font-semibold text-ink-900 dark:text-zinc-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-1 cursor-pointer">
                      ${recipe.title}
                    </h3>
                    <p class="text-xs text-ink-500 dark:text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                      ${recipe.description}
                    </p>
                  </div>

                  <div class="pt-3 border-t border-stone-100 dark:border-white/5 flex items-center justify-between text-xs">
                    <span class="text-[11px] text-ink-400 dark:text-zinc-400 font-medium">${(recipe.videoChapters || []).length} Chapters</span>
                    <div class="flex items-center gap-2">
                      <button 
                        onclick="TastyApp.openVideoModal('${recipe.id}', event)"
                        class="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 font-bold text-xs flex items-center gap-1 transition-colors"
                      >
                        <i data-lucide="play" class="w-3 h-3 fill-current"></i>
                        <span>Watch</span>
                      </button>
                      <button 
                        onclick="TastyApp.navigateTo('recipe-detail', { recipeId: '${recipe.id}' })"
                        class="p-1.5 rounded-xl text-ink-400 hover:text-ink-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/10"
                        title="View Full Recipe"
                      >
                        <i data-lucide="chevron-right" class="w-4 h-4"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- LIVE YOUTUBE RECIPE EXPLORER (Powered by YouTube Data API v3) -->
        <div class="rounded-3xl bg-gradient-to-br from-stone-900 via-[#141816] to-black p-6 sm:p-10 border border-stone-200/40 dark:border-white/10 shadow-clean-xl space-y-6 text-white">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div class="space-y-1.5">
              <div class="flex items-center gap-2 flex-wrap">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/30">
                  <i data-lucide="youtube" class="w-4 h-4 text-rose-500"></i>
                  <span>YouTube Data API v3 · Live Feed</span>
                </div>
                <button onclick="TastyApp.openApiKeyModal()" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-semibold border border-white/15 transition-all shadow-2xs" title="Enter your own Google YouTube API key">
                  <i data-lucide="key" class="w-3.5 h-3.5 text-amber-400"></i>
                  <span>⚙️ Custom API Key</span>
                </button>
              </div>
              <h2 class="font-editorial text-2xl sm:text-4xl font-semibold text-white">
                Live YouTube Culinary Studio
              </h2>
              <p class="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
                Search and explore real chef tutorials worldwide powered by your YouTube Data API key with instant studio playback.
              </p>
            </div>

            <!-- YouTube Search Bar -->
            <div class="flex items-center gap-2 w-full md:w-auto">
              <div class="relative flex-1 md:w-80">
                <input 
                  type="text" 
                  id="yt-explore-input" 
                  placeholder="Search any dish on YouTube (e.g. Ramen, Biryani)..." 
                  onkeydown="if(event.key==='Enter') TastyApp.searchYouTube(this.value)"
                  class="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
                <i data-lucide="search" class="w-4 h-4 text-white/40 absolute left-3 top-3"></i>
              </div>
              <button 
                onclick="TastyApp.searchYouTube(document.getElementById('yt-explore-input').value)" 
                class="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-sm shrink-0 flex items-center gap-1.5"
              >
                <span>Search</span>
              </button>
            </div>
          </div>

          <!-- Quick Discovery Chips -->
          <div class="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span class="text-white/40 text-[11px] uppercase tracking-wider font-bold shrink-0">Popular:</span>
            ${['Potato Recipe', 'Butter Chicken', 'Authentic Carbonara', 'Tuscan Salmon', 'Wild Mushroom Risotto', 'Potato Gnocchi', 'Molten Lava Cake', 'Blueberry Pancakes'].map(tag => `
              <button 
                onclick="TastyApp.searchYouTube('${tag}')" 
                class="yt-popular-chip px-3 py-1.5 rounded-full ${(state.activeYoutubeQuery || '').toLowerCase() === tag.toLowerCase() ? 'bg-rose-600 text-white border-rose-500' : 'bg-white/10 hover:bg-white/20 text-white/90'} text-xs font-medium border border-white/10 whitespace-nowrap transition-all hover:scale-102"
              >
                ${tag}
              </button>
            `).join('')}
          </div>

          <!-- YouTube Results Container -->
          <div id="youtube-search-results" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            <!-- Populated dynamically -->
          </div>
        </div>

      </div>
    `;
  }

  // ==========================================
  // VIEW 3: RECIPE DETAILS (Modern Clean Studio)
  // ==========================================
  function renderRecipeDetailView() {
    const recipe = getRecipeById(state.currentRecipeId) || getAllRecipes()[0];
    const isFav = state.favorites.includes(recipe.id);
    const multiplier = state.activeServings / recipe.servings;

    return `
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <!-- Breadcrumb & Top Bar -->
        <div class="flex items-center justify-between no-print">
          <button onclick="TastyApp.navigateTo('explore')" class="text-xs font-semibold text-ink-500 dark:text-zinc-400 hover:text-ink-900 dark:hover:text-white flex items-center gap-1.5 transition-colors">
            <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
            <span>Back to Explorer</span>
          </button>

          <div class="flex items-center gap-2">
            ${recipe.hasVideo ? `
              <button onclick="TastyApp.openVideoModal('${recipe.id}', event)" class="p-2 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-1.5 shadow-2xs hover:bg-rose-100">
                <i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i>
                <span class="hidden sm:inline">Watch Video</span>
              </button>
            ` : ''}
            <button onclick="window.print()" class="p-2 rounded-xl border border-stone-200 dark:border-white/10 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-ink-600 dark:text-zinc-300 text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
              <i data-lucide="printer" class="w-4 h-4"></i>
              <span class="hidden sm:inline">Print</span>
            </button>
            <button onclick="TastyApp.shareRecipe('${recipe.title}')" class="p-2 rounded-xl border border-stone-200 dark:border-white/10 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-ink-600 dark:text-zinc-300 text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
              <i data-lucide="share-2" class="w-4 h-4"></i>
              <span class="hidden sm:inline">Share</span>
            </button>
            <button onclick="TastyApp.toggleFavorite('${recipe.id}', event)" class="p-2 rounded-xl border border-stone-200 dark:border-white/10 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
              <i data-lucide="heart" class="w-4 h-4 ${isFav ? 'fill-citrus-500 text-citrus-500' : 'text-ink-600 dark:text-zinc-300'}"></i>
              <span class="hidden sm:inline">${isFav ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        <!-- Recipe Header Title -->
        <div class="space-y-3">
          <div class="flex items-center gap-2 flex-wrap text-xs">
            <span class="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold uppercase tracking-wider text-[10px]">
              ${recipe.cuisine}
            </span>
            <span class="text-ink-400 dark:text-zinc-500">·</span>
            <span class="text-ink-500 dark:text-zinc-400 font-medium">${recipe.category}</span>
            ${recipe.hasVideo ? `<span class="px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold text-[10px] flex items-center gap-1"><i data-lucide="play" class="w-2.5 h-2.5 fill-current"></i> Video Masterclass</span>` : ''}
            ${recipe.isVegetarian ? `<span class="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-300 font-bold text-[10px]">Vegetarian</span>` : ''}
            ${recipe.isGlutenFree ? `<span class="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-300 font-bold text-[10px]">Gluten-Free</span>` : ''}
          </div>

          <h1 class="font-editorial text-3xl sm:text-5xl font-semibold text-ink-900 dark:text-white leading-tight">
            ${recipe.title}
          </h1>

          <p class="text-xs sm:text-sm text-ink-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
            ${recipe.description}
          </p>

          <div class="pt-2 flex flex-wrap items-center justify-between gap-4 border-b border-stone-200/80 dark:border-white/10 pb-6 text-xs text-ink-600 dark:text-zinc-400">
            <div class="flex items-center gap-3">
              <img src="${recipe.author.avatar}" alt="${recipe.author.name}" class="w-9 h-9 rounded-full object-cover" />
              <div>
                <p class="font-bold text-ink-900 dark:text-zinc-100">${recipe.author.name}</p>
                <p class="text-[10px] text-ink-400 dark:text-zinc-500">${recipe.author.title}</p>
              </div>
            </div>

            <div class="flex items-center gap-5 sm:gap-6 font-medium">
              <div>
                <span class="block text-[10px] uppercase text-ink-400 dark:text-zinc-500">Rating</span>
                <span class="font-bold text-ink-900 dark:text-zinc-100 text-sm">★ ${recipe.rating}</span>
              </div>
              <div class="h-4 w-px bg-stone-200 dark:bg-white/10"></div>
              <div>
                <span class="block text-[10px] uppercase text-ink-400 dark:text-zinc-500">Prep</span>
                <span class="font-bold text-ink-900 dark:text-zinc-100">${recipe.prepTime}m</span>
              </div>
              <div class="h-4 w-px bg-stone-200 dark:bg-white/10"></div>
              <div>
                <span class="block text-[10px] uppercase text-ink-400 dark:text-zinc-500">Cook</span>
                <span class="font-bold text-ink-900 dark:text-zinc-100">${recipe.cookTime}m</span>
              </div>
              <div class="h-4 w-px bg-stone-200 dark:bg-white/10"></div>
              <div>
                <span class="block text-[10px] uppercase text-ink-400 dark:text-zinc-500">Energy</span>
                <span class="font-bold text-ink-900 dark:text-zinc-100">${recipe.calories} kcal</span>
              </div>
            </div>
          </div>
        </div>

        <!-- HERO IMAGE -->
        <div class="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden shadow-clean-md bg-stone-100 dark:bg-stone-800">
          <img src="${recipe.image}" alt="${recipe.title}" class="w-full h-full object-cover" />
          <div class="absolute bottom-4 right-4 flex items-center gap-2">
            ${recipe.hasVideo ? `
              <button 
                onclick="TastyApp.openVideoModal('${recipe.id}', event)"
                class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-clean-sm flex items-center gap-1.5 transition-all"
              >
                <i data-lucide="play" class="w-3.5 h-3.5 fill-white"></i>
                <span>Watch Video (${recipe.videoDuration})</span>
              </button>
            ` : ''}
            <button 
              onclick="TastyApp.openMealPlanModal('${recipe.id}', event)"
              class="px-4 py-2 rounded-xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-md text-ink-900 dark:text-white hover:bg-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all"
            >
              <i data-lucide="calendar-plus" class="w-3.5 h-3.5 text-citrus-600"></i>
              <span>Add to Meal Plan</span>
            </button>
          </div>
        </div>

        ${recipe.hasVideo ? `
          <!-- INLINE VIDEO MASTERCLASS PLAYER -->
          <div class="rounded-3xl overflow-hidden bg-black text-white shadow-clean-xl border border-white/10 space-y-0">
            <div class="p-4 sm:p-5 bg-gradient-to-r from-stone-900 to-black border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div class="flex items-center gap-2.5">
                <span class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                <span class="font-bold text-xs uppercase tracking-wider text-rose-400">Step-by-Step Video Masterclass</span>
                <span class="text-white/40">·</span>
                <span class="text-xs text-white/80 font-medium">${recipe.videoDuration} HD Studio Demonstration</span>
              </div>
              <div class="flex items-center gap-2">
                <a 
                  href="${recipe.youtubeWatchUrl || 'https://www.youtube.com/watch?v=' + (recipe.youtubeId || '')}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <i data-lucide="youtube" class="w-3.5 h-3.5 text-rose-400"></i>
                  <span>Watch on YouTube</span>
                </a>
                <button 
                  onclick="TastyApp.openVideoModal('${recipe.id}', event)"
                  class="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <i data-lucide="maximize-2" class="w-3.5 h-3.5"></i>
                  <span>Theater Player</span>
                </button>
              </div>
            </div>

            <div class="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
              <video 
                id="inline-recipe-video-${recipe.id}" 
                controls 
                playsinline 
                class="w-full h-full object-cover" 
                poster="${recipe.image}"
              >
                <source src="${recipe.videoUrl || 'videos/cooking-demo.mp4'}" type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>
            </div>

            <!-- Chapter Jump Markers -->
            <div class="p-4 bg-stone-900/95 flex items-center gap-2 overflow-x-auto text-xs">
              <span class="text-white/50 text-[11px] font-bold uppercase tracking-wider shrink-0">Jump To Technique:</span>
              ${(recipe.videoChapters || [
                { time: 0, label: "Step 1: Prep" },
                { time: 40, label: "Step 2: Cook" },
                { time: 90, label: "Step 3: Plate" }
              ]).map(ch => `
                <button 
                  onclick="TastyApp.jumpInlineVideo('${recipe.id}', ${ch.time})"
                  class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1 shrink-0 hover:scale-102"
                >
                  <i data-lucide="play" class="w-3 h-3 fill-rose-400 text-rose-400"></i>
                  <span>${ch.label}</span>
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- 2-COLUMN STUDIO LAYOUT -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- LEFT: Ingredients with Scaler & Nutrition (5 Cols) -->
          <div class="lg:col-span-5 space-y-6">
            
            <div class="p-6 rounded-3xl bg-white dark:bg-[#161B18] border border-stone-200/70 dark:border-white/10 shadow-clean-sm space-y-5">
              <div class="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-white/5">
                <h3 class="font-editorial text-2xl font-semibold text-ink-900 dark:text-white">Ingredients</h3>

                <!-- Stepper -->
                <div class="flex items-center gap-1 bg-stone-100 dark:bg-white/10 p-1 rounded-xl">
                  <button onclick="TastyApp.changeServings(${Math.max(1, state.activeServings - 1)})" class="w-6 h-6 rounded-lg bg-white dark:bg-stone-800 text-xs font-bold text-ink-900 dark:text-white shadow-2xs hover:bg-stone-200 dark:hover:bg-stone-700">-</button>
                  <span class="text-xs font-bold px-2 text-ink-800 dark:text-zinc-200">${state.activeServings} servings</span>
                  <button onclick="TastyApp.changeServings(${state.activeServings + 1})" class="w-6 h-6 rounded-lg bg-white dark:bg-stone-800 text-xs font-bold text-ink-900 dark:text-white shadow-2xs hover:bg-stone-200 dark:hover:bg-stone-700">+</button>
                </div>
              </div>

              <div class="space-y-2.5">
                ${recipe.ingredients.map(ing => {
                  const amt = (ing.amount * multiplier);
                  const displayAmt = Number.isInteger(amt) ? amt : amt.toFixed(1);
                  return `
                    <label class="flex items-start gap-3 p-2 rounded-xl hover:bg-stone-50 dark:hover:bg-white/5 cursor-pointer transition-colors group">
                      <input type="checkbox" class="modern-checkbox mt-0.5" onchange="this.nextElementSibling.classList.toggle('checked-done')" />
                      <div class="text-xs text-ink-700 dark:text-zinc-300 font-medium">
                        <span class="font-bold text-ink-900 dark:text-white">${displayAmt} ${ing.unit}</span> ${ing.item}
                        <span class="block text-[10px] text-ink-400 dark:text-zinc-500">${ing.aisle} aisle</span>
                      </div>
                    </label>
                  `;
                }).join('')}
              </div>

              <button 
                onclick="TastyApp.addAllToShoppingList('${recipe.id}')"
                class="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i>
                <span>Add All to Grocery List</span>
              </button>
            </div>

            <!-- Nutrition Facts -->
            <div class="p-5 rounded-2xl bg-white dark:bg-[#161B18] border border-stone-200/70 dark:border-white/10 shadow-clean-sm space-y-3">
              <h4 class="text-xs font-bold uppercase tracking-wider text-ink-400 dark:text-zinc-400">Nutrition Breakdown</h4>
              <div class="grid grid-cols-5 gap-2 text-center text-xs">
                <div class="p-2 rounded-xl bg-stone-50 dark:bg-white/5">
                  <span class="block text-[10px] text-ink-400 dark:text-zinc-400">Cal</span>
                  <span class="font-bold text-ink-900 dark:text-white">${recipe.nutrition.calories}</span>
                </div>
                <div class="p-2 rounded-xl bg-stone-50 dark:bg-white/5">
                  <span class="block text-[10px] text-ink-400 dark:text-zinc-400">Protein</span>
                  <span class="font-bold text-ink-900 dark:text-white">${recipe.nutrition.protein}g</span>
                </div>
                <div class="p-2 rounded-xl bg-stone-50 dark:bg-white/5">
                  <span class="block text-[10px] text-ink-400 dark:text-zinc-400">Carbs</span>
                  <span class="font-bold text-ink-900 dark:text-white">${recipe.nutrition.carbs}g</span>
                </div>
                <div class="p-2 rounded-xl bg-stone-50 dark:bg-white/5">
                  <span class="block text-[10px] text-ink-400 dark:text-zinc-400">Fat</span>
                  <span class="font-bold text-ink-900 dark:text-white">${recipe.nutrition.fat}g</span>
                </div>
                <div class="p-2 rounded-xl bg-stone-50 dark:bg-white/5">
                  <span class="block text-[10px] text-ink-400 dark:text-zinc-400">Fiber</span>
                  <span class="font-bold text-ink-900 dark:text-white">${recipe.nutrition.fiber}g</span>
                </div>
              </div>
            </div>

          </div>

          <!-- RIGHT: Instructions (7 Cols) -->
          <div class="lg:col-span-7 space-y-6">
            <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#161B18] border border-stone-200/70 dark:border-white/10 shadow-clean-sm space-y-6">
              <div class="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-white/5">
                <h3 class="font-editorial text-2xl font-semibold text-ink-900 dark:text-white">Step-by-Step Instructions</h3>
                <button onclick="TastyApp.resetStepProgress()" class="text-xs text-ink-400 dark:text-zinc-400 hover:text-ink-700 dark:hover:text-white underline">Reset</button>
              </div>

              <div class="space-y-5">
                ${recipe.instructions.map((step, idx) => {
                  const done = state.completedSteps[idx];
                  return `
                    <div class="p-4 rounded-2xl border transition-all ${done ? 'bg-stone-50 dark:bg-white/5 border-stone-200 dark:border-white/10' : 'bg-white dark:bg-transparent border-stone-200/70 dark:border-white/10 hover:border-stone-300 dark:hover:border-white/20'}">
                      <div class="flex items-start justify-between gap-3">
                        <div class="flex items-start gap-3 flex-1">
                          <button 
                            onclick="TastyApp.toggleStepDone(${idx})"
                            class="w-6 h-6 rounded-full ${done ? 'bg-emerald-700 text-white' : 'bg-stone-100 dark:bg-white/10 text-ink-600 dark:text-zinc-300 hover:bg-stone-200 dark:hover:bg-white/20'} flex items-center justify-center text-xs font-bold shrink-0 transition-colors mt-0.5"
                          >
                            ${done ? '✓' : step.step}
                          </button>

                          <div class="space-y-1">
                            <h4 class="text-sm font-bold text-ink-900 dark:text-white ${done ? 'line-through opacity-60' : ''}">${step.title}</h4>
                            <p class="text-xs sm:text-sm text-ink-600 dark:text-zinc-300 leading-relaxed ${done ? 'line-through opacity-60' : ''}">${step.text}</p>
                            ${step.tip ? `
                              <div class="text-[11px] text-emerald-800 dark:text-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/40 p-2 rounded-lg mt-1 border border-emerald-100 dark:border-emerald-800/30">
                                💡 <strong>Tip:</strong> ${step.tip}
                              </div>
                            ` : ''}
                          </div>
                        </div>

                        ${step.timerMinutes ? `
                          <button 
                            onclick="TastyApp.startCookingTimer(${step.timerMinutes}, '${step.title.replace(/'/g, "\\'")}')"
                            class="shrink-0 px-2.5 py-1 rounded-lg bg-citrus-50 dark:bg-citrus-950/40 hover:bg-citrus-100 dark:hover:bg-citrus-900/50 text-citrus-700 dark:text-citrus-300 text-xs font-bold border border-citrus-200/60 dark:border-citrus-800/40 flex items-center gap-1"
                          >
                            <i data-lucide="timer" class="w-3 h-3 text-citrus-600 dark:text-citrus-400"></i>
                            <span>${step.timerMinutes}m</span>
                          </button>
                        ` : ''}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>

              <button 
                onclick="TastyApp.finishRecipeCooking('${recipe.title}')"
                class="w-full py-3 rounded-2xl bg-ink-900 dark:bg-emerald-600 hover:bg-black dark:hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <span>Finished Cooking This Dish!</span>
                <i data-lucide="check" class="w-4 h-4"></i>
              </button>
            </div>
          </div>

        </div>

      </div>
    `;
  }

  // ==========================================
  // VIEW 4: CATEGORIES DIRECTORY
  // ==========================================
  function renderCategoriesView() {
    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div class="space-y-1">
          <h1 class="font-editorial text-4xl sm:text-5xl font-semibold text-ink-900">Explore by Category</h1>
          <p class="text-xs sm:text-sm text-ink-500">Find the perfect dish for any craving, meal, or dietary mood.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${CATEGORIES_DATA.map(cat => `
            <div 
              onclick="TastyApp.navigateTo('explore', { category: '${cat.id}' })"
              class="modern-card cursor-pointer rounded-3xl overflow-hidden bg-white border border-stone-200/70 shadow-clean-sm flex flex-col group"
            >
              <div class="relative h-44 w-full card-img-wrap bg-stone-100">
                <img src="${cat.image}" alt="${cat.name}" class="w-full h-full object-cover" />
                <span class="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-ink-900 text-[10px] font-bold">
                  ${cat.badge}
                </span>
              </div>
              <div class="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 class="font-editorial text-2xl font-semibold text-ink-900 group-hover:text-emerald-700 transition-colors">${cat.name}</h3>
                  <p class="text-xs text-ink-500 line-clamp-2 mt-1">${cat.description}</p>
                </div>
                <div class="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-semibold">
                  <span class="text-ink-400">${cat.count} Recipes</span>
                  <span class="text-emerald-700">Explore &rarr;</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ==========================================
  // VIEW 5: FAVORITES
  // ==========================================
  function renderFavoritesView() {
    const favoriteRecipes = getAllRecipes().filter(r => state.favorites.includes(r.id));

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="font-editorial text-4xl sm:text-5xl font-semibold text-ink-900">Saved Favorites</h1>
            <p class="text-xs sm:text-sm text-ink-500">${favoriteRecipes.length} recipes in your personal vault</p>
          </div>
          <button onclick="TastyApp.navigateTo('explore')" class="px-4 py-2 rounded-xl bg-ink-900 text-white text-xs font-semibold">
            Discover More
          </button>
        </div>

        ${favoriteRecipes.length ? `
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${favoriteRecipes.map(r => renderModernRecipeCard(r)).join('')}
          </div>
        ` : `
          <div class="p-16 rounded-3xl bg-white border border-stone-200/70 text-center space-y-3">
            <i data-lucide="heart" class="w-8 h-8 text-stone-300 mx-auto"></i>
            <h3 class="font-editorial text-2xl font-semibold text-ink-900">Your Vault is Empty</h3>
            <p class="text-xs text-ink-400">Save recipes with the heart icon to access them here.</p>
          </div>
        `}
      </div>
    `;
  }

  // ==========================================
  // VIEW 6: WEEKLY GOURMET MEAL PLANNER
  // ==========================================
  function renderPlannerView() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const slots = [
      { name: 'Breakfast', icon: 'sunrise', iconColor: 'text-amber-500', bgBadge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
      { name: 'Lunch', icon: 'sun', iconColor: 'text-emerald-500', bgBadge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
      { name: 'Dinner', icon: 'moon', iconColor: 'text-indigo-500', bgBadge: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20' },
      { name: 'Snack', icon: 'coffee', iconColor: 'text-rose-500', bgBadge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20' }
    ];

    let totalPlanned = 0;
    let totalCalories = 0;
    let totalCookTime = 0;
    let vegetarianCount = 0;
    let videoCount = 0;
    const dayStats = {};

    days.forEach(d => {
      dayStats[d] = { count: 0, calories: 0, time: 0 };
      const plan = state.mealPlan[d] || {};
      slots.forEach(s => {
        const rId = plan[s.name];
        if (rId) {
          const rec = getRecipeById(rId);
          if (rec) {
            dayStats[d].count++;
            dayStats[d].calories += (rec.calories || 0);
            dayStats[d].time += ((rec.prepTime || 0) + (rec.cookTime || 0));
            totalPlanned++;
            totalCalories += (rec.calories || 0);
            totalCookTime += ((rec.prepTime || 0) + (rec.cookTime || 0));
            if (rec.isVegetarian) vegetarianCount++;
            if (rec.hasVideo) videoCount++;
          }
        }
      });
    });

    const totalSlots = 28;
    const planPercent = Math.round((totalPlanned / totalSlots) * 100);
    const avgDailyCal = totalPlanned > 0 ? Math.round(totalCalories / 7) : 0;
    const activeDayFilter = state.plannerActiveDay || 'All';
    const visibleDays = activeDayFilter === 'All' ? days : [activeDayFilter];
    const currentDayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()];

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <!-- Planner Hero & Main Action Bar -->
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-stone-50/50 to-emerald-50/20 dark:from-[#161B18] dark:via-[#161B18] dark:to-emerald-950/20 border border-stone-200/80 dark:border-white/10 shadow-clean-sm space-y-6">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div class="space-y-2">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                <i data-lucide="sparkles" class="w-3.5 h-3.5 text-citrus-500"></i>
                <span>Intelligent Nutrition & Meal Prep</span>
              </div>
              <h1 class="font-editorial text-4xl sm:text-5xl font-semibold text-ink-900 dark:text-white tracking-tight">Weekly Gourmet Meal Planner</h1>
              <p class="text-xs sm:text-sm text-ink-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
                Coordinate your week with chef-crafted menus, dynamic nutrition tallies, and 1-click smart grocery generation.
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-2.5">
              <button 
                onclick="TastyApp.autoBalanceMealPlan()" 
                class="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs font-bold shadow-clean-sm hover:shadow-clean-md flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
                title="Automatically populate empty slots with a balanced gourmet weekly menu"
              >
                <i data-lucide="wand-2" class="w-4 h-4 text-citrus-300"></i>
                <span>Auto-Balance Week</span>
              </button>

              <button 
                onclick="TastyApp.shuffleMealPlan()" 
                class="px-3.5 py-2.5 rounded-2xl border border-stone-200/90 dark:border-white/10 bg-white dark:bg-[#1E2521] hover:bg-stone-50 dark:hover:bg-white/5 text-ink-700 dark:text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
                title="Shuffle meals randomly across the week"
              >
                <i data-lucide="shuffle" class="w-3.5 h-3.5 text-citrus-500"></i>
                <span>Shuffle</span>
              </button>

              <button 
                onclick="TastyApp.generateShoppingListFromMealPlan()" 
                class="px-4 py-2.5 rounded-2xl bg-citrus-500 hover:bg-citrus-600 text-white text-xs font-bold shadow-clean-sm flex items-center gap-1.5 transition-all transform hover:-translate-y-0.5"
                title="Aggregate all planned recipe ingredients into your smart grocery list"
              >
                <i data-lucide="shopping-bag" class="w-4 h-4"></i>
                <span>Send to Grocery</span>
              </button>

              <button 
                onclick="TastyApp.clearMealPlan()" 
                class="p-2.5 rounded-2xl border border-stone-200/80 dark:border-white/10 bg-white dark:bg-[#1E2521] hover:bg-rose-50 dark:hover:bg-rose-950/30 text-ink-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                title="Clear all meals from week"
              >
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </div>

          <!-- Weekly Nutrition & Planning Glance Cards -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div class="p-4 rounded-2xl bg-white dark:bg-[#1A201C] border border-stone-200/70 dark:border-white/5 space-y-2">
              <div class="flex items-center justify-between text-xs text-ink-400 dark:text-zinc-400">
                <span class="font-medium">Scheduled</span>
                <span class="font-bold text-ink-900 dark:text-white">${totalPlanned}/28</span>
              </div>
              <div class="text-xl sm:text-2xl font-bold text-emerald-700 dark:text-emerald-400">${planPercent}%</div>
              <div class="w-full h-1.5 rounded-full bg-stone-100 dark:bg-white/10 overflow-hidden">
                <div class="h-full bg-gradient-to-r from-emerald-500 to-citrus-500 transition-all duration-500 rounded-full" style="width: ${planPercent}%"></div>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-white dark:bg-[#1A201C] border border-stone-200/70 dark:border-white/5 space-y-1">
              <span class="text-xs text-ink-400 dark:text-zinc-400 font-medium">Daily Calories Avg</span>
              <div class="text-xl sm:text-2xl font-bold text-ink-900 dark:text-white">~${avgDailyCal.toLocaleString()} <span class="text-xs font-normal text-ink-400 dark:text-zinc-500">kcal</span></div>
              <p class="text-[11px] text-ink-400 dark:text-zinc-500 truncate">${totalCalories.toLocaleString()} kcal scheduled</p>
            </div>

            <div class="p-4 rounded-2xl bg-white dark:bg-[#1A201C] border border-stone-200/70 dark:border-white/5 space-y-1">
              <span class="text-xs text-ink-400 dark:text-zinc-400 font-medium">Weekly Kitchen Time</span>
              <div class="text-xl sm:text-2xl font-bold text-ink-900 dark:text-white">${Math.floor(totalCookTime / 60)}h ${totalCookTime % 60}m</div>
              <p class="text-[11px] text-ink-400 dark:text-zinc-500">Fresh homemade prep</p>
            </div>

            <div class="p-4 rounded-2xl bg-white dark:bg-[#1A201C] border border-stone-200/70 dark:border-white/5 space-y-1">
              <span class="text-xs text-ink-400 dark:text-zinc-400 font-medium">Dietary Balance</span>
              <div class="flex items-center gap-1.5 flex-wrap pt-0.5">
                <span class="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold text-[10px] border border-emerald-500/20">${vegetarianCount} Veg</span>
                <span class="px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 font-bold text-[10px] border border-rose-500/20">${videoCount} Videos</span>
              </div>
              <p class="text-[11px] text-ink-400 dark:text-zinc-500 pt-0.5">Diverse recipes</p>
            </div>
          </div>
        </div>

        <!-- Filter Tabs (All 7 Days or Single Focused Day) -->
        <div class="flex items-center justify-between gap-3 overflow-x-auto no-scrollbar pb-1">
          <div class="flex items-center gap-1.5">
            <button 
              onclick="TastyApp.setPlannerActiveDay('All')" 
              class="px-4 py-2 rounded-2xl text-xs font-bold transition-all ${activeDayFilter === 'All' ? 'bg-ink-900 text-white dark:bg-emerald-600 shadow-clean-sm' : 'bg-white dark:bg-[#161B18] text-ink-600 dark:text-zinc-400 border border-stone-200/80 dark:border-white/10 hover:border-emerald-500/40'}"
            >
              All 7 Days
            </button>
            ${days.map(d => {
              const isActive = activeDayFilter === d;
              const isToday = d === currentDayName;
              return `
                <button 
                  onclick="TastyApp.setPlannerActiveDay('${d}')" 
                  class="px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${isActive ? 'bg-ink-900 text-white dark:bg-emerald-600 shadow-clean-sm' : 'bg-white dark:bg-[#161B18] text-ink-600 dark:text-zinc-400 border border-stone-200/80 dark:border-white/10 hover:border-emerald-500/40'}"
                >
                  <span>${d.slice(0, 3)}</span>
                  ${isToday ? `<span class="w-1.5 h-1.5 rounded-full bg-citrus-500"></span>` : ''}
                </button>
              `;
            }).join('')}
          </div>

          <div class="hidden sm:flex items-center text-xs text-ink-400 dark:text-zinc-400 gap-1 shrink-0">
            <i data-lucide="info" class="w-3.5 h-3.5 text-emerald-600"></i>
            <span>Click any empty slot to choose a dish</span>
          </div>
        </div>

        <!-- 7-Day Board Grid -->
        <div class="grid grid-cols-1 ${visibleDays.length === 1 ? 'max-w-2xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-7'} gap-4">
          ${visibleDays.map(day => {
            const plan = state.mealPlan[day] || {};
            const stats = dayStats[day] || { count: 0, calories: 0, time: 0 };
            const isToday = day === currentDayName;

            return `
              <div class="flex flex-col rounded-3xl bg-white dark:bg-[#161B18] border ${isToday ? 'border-emerald-500/60 dark:border-emerald-500/50 shadow-clean-md' : 'border-stone-200/80 dark:border-white/10 shadow-clean-sm'} p-3.5 sm:p-4 space-y-3 transition-all hover:border-emerald-500/40">
                
                <!-- Day Header -->
                <div class="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-white/10">
                  <div class="flex items-center gap-1.5">
                    <span class="font-editorial text-xl font-bold text-ink-900 dark:text-white">${day.slice(0, 3)}</span>
                    ${isToday ? `<span class="px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[9px] font-extrabold uppercase">Today</span>` : ''}
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-white/10 text-ink-600 dark:text-zinc-300">
                      ${stats.calories} kcal
                    </span>
                    <button 
                      onclick="TastyApp.shuffleDayPlan('${day}')" 
                      class="p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-white/10 text-ink-400 hover:text-ink-700 dark:hover:text-zinc-200 transition-colors" 
                      title="Shuffle ${day}"
                    >
                      <i data-lucide="shuffle" class="w-3.5 h-3.5"></i>
                    </button>
                    <button 
                      onclick="TastyApp.clearDayPlan('${day}')" 
                      class="p-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 text-ink-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors" 
                      title="Clear ${day}"
                    >
                      <i data-lucide="x" class="w-3.5 h-3.5"></i>
                    </button>
                  </div>
                </div>

                <!-- 4 Meal Slots -->
                <div class="space-y-2.5 flex-1">
                  ${slots.map(slot => {
                    const rId = plan[slot.name];
                    const rec = rId ? getRecipeById(rId) : null;

                    return `
                      <div class="rounded-2xl transition-all ${rec ? 'bg-stone-50/90 dark:bg-white/[0.04] border border-stone-200/80 dark:border-white/10 p-2.5 space-y-2' : 'border border-dashed border-stone-200 dark:border-white/15 p-2.5 hover:bg-stone-50/70 dark:hover:bg-white/[0.02]'}" id="slot-${day}-${slot.name}">
                        
                        <!-- Slot Label Strip -->
                        <div class="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                          <div class="flex items-center gap-1.5 ${slot.iconColor}">
                            <i data-lucide="${slot.icon}" class="w-3 h-3"></i>
                            <span class="text-ink-700 dark:text-zinc-300 font-semibold">${slot.name}</span>
                          </div>
                          ${rec ? `
                            <div class="flex items-center gap-1">
                              <button 
                                onclick="TastyApp.openSlotDishPicker('${day}', '${slot.name}')" 
                                class="text-ink-400 hover:text-emerald-600 dark:hover:text-emerald-400 p-0.5 rounded transition-colors" 
                                title="Swap Dish"
                              >
                                <i data-lucide="repeat" class="w-3 h-3"></i>
                              </button>
                              <button 
                                onclick="TastyApp.removeMealFromPlan('${day}', '${slot.name}')" 
                                class="text-ink-400 hover:text-rose-600 dark:hover:text-rose-400 p-0.5 rounded transition-colors" 
                                title="Remove Dish"
                              >
                                <i data-lucide="trash" class="w-3 h-3"></i>
                              </button>
                            </div>
                          ` : ''}
                        </div>

                        <!-- Slot Content -->
                        ${rec ? `
                          <div class="flex items-center gap-2.5">
                            <img 
                              src="${rec.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80'}" 
                              alt="${rec.title}" 
                              onclick="TastyApp.navigateTo('recipe-detail', { recipeId: '${rec.id}' })"
                              class="w-11 h-11 rounded-xl object-cover shrink-0 cursor-pointer hover:opacity-90 transition-opacity border border-stone-200/70 dark:border-white/10" 
                            />
                            <div class="flex-1 min-w-0">
                              <p 
                                onclick="TastyApp.navigateTo('recipe-detail', { recipeId: '${rec.id}' })" 
                                class="font-bold text-xs text-ink-900 dark:text-white truncate cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                title="${rec.title}"
                              >
                                ${rec.title}
                              </p>
                              <div class="flex items-center gap-1.5 text-[10px] text-ink-400 dark:text-zinc-400 mt-0.5">
                                <span>⚡ ${rec.calories || 0} cal</span>
                                <span>•</span>
                                <span>${(rec.prepTime || 0) + (rec.cookTime || 0)}m</span>
                              </div>
                            </div>
                          </div>

                          ${rec.hasVideo ? `
                            <button 
                              onclick="TastyApp.openVideoModal('${rec.id}', event)" 
                              class="w-full py-1 px-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-[10px] font-bold flex items-center justify-center gap-1 transition-colors"
                            >
                              <i data-lucide="play" class="w-2.5 h-2.5 fill-current"></i>
                              <span>Watch Video Masterclass</span>
                            </button>
                          ` : ''}
                        ` : `
                          <button 
                            onclick="TastyApp.openSlotDishPicker('${day}', '${slot.name}')" 
                            class="w-full py-2 rounded-xl text-center text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30 flex items-center justify-center gap-1.5 transition-all group"
                          >
                            <i data-lucide="plus-circle" class="w-3.5 h-3.5 group-hover:scale-110 transition-transform"></i>
                            <span>Add ${slot.name}</span>
                          </button>
                        `}
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>

      </div>
    `;
  }

  // ==========================================
  // VIEW 7: GROCERY SHOPPING LIST (Smart Aisles)
  // ==========================================
  // ==========================================
  // VIEW 7: GROCERY SHOPPING LIST (Smart Aisles)
  // ==========================================
  function renderShoppingView() {
    const aisles = [
      { name: 'Produce', icon: 'carrot' },
      { name: 'Dairy', icon: 'milk' },
      { name: 'Meat', icon: 'drumstick' },
      { name: 'Pantry', icon: 'package' },
      { name: 'Spices', icon: 'sparkles' },
      { name: 'General', icon: 'shopping-cart' }
    ];
    const total = state.shoppingList.length;
    const checked = state.shoppingList.filter(i => i.checked).length;
    const percent = total > 0 ? Math.round((checked / total) * 100) : 0;

    return `
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="space-y-1">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i>
              <span>Smart Aisle Sorter</span>
            </div>
            <h1 class="font-editorial text-4xl sm:text-5xl font-semibold text-ink-900 dark:text-white tracking-tight">Smart Grocery List</h1>
            <p class="text-xs sm:text-sm text-ink-500 dark:text-zinc-400">${checked} of ${total} items completed (${percent}%)</p>
          </div>

          <div class="flex flex-wrap items-center gap-2 no-print">
            ${total > 15 ? `
              <button 
                onclick="TastyApp.consolidateShoppingList()" 
                class="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs font-bold shadow-clean-sm flex items-center gap-1.5 transition-all transform hover:-translate-y-0.5"
                title="Merge duplicate ingredients into single items"
              >
                <i data-lucide="sparkles" class="w-3.5 h-3.5 text-citrus-300"></i>
                <span>Merge Duplicates</span>
              </button>
            ` : ''}

            <button 
              onclick="TastyApp.clearCheckedShopping()" 
              class="px-3.5 py-2 rounded-2xl border border-stone-200/80 dark:border-white/10 bg-white dark:bg-[#161B18] text-xs font-semibold text-ink-600 dark:text-zinc-300 hover:bg-stone-50 dark:hover:bg-white/5 transition-colors flex items-center gap-1.5"
            >
              <i data-lucide="check-check" class="w-3.5 h-3.5"></i>
              <span>Clear Done</span>
            </button>

            <button 
              onclick="TastyApp.clearAllShopping()" 
              class="p-2.5 rounded-2xl border border-stone-200/80 dark:border-white/10 bg-white dark:bg-[#161B18] text-ink-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              title="Clear entire grocery list"
            >
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>

            <button 
              onclick="window.print()" 
              class="p-2.5 rounded-2xl border border-stone-200/80 dark:border-white/10 bg-white dark:bg-[#161B18] text-ink-600 dark:text-zinc-300 hover:bg-stone-50 dark:hover:bg-white/5 transition-colors"
              title="Print Grocery List"
            >
              <i data-lucide="printer" class="w-4 h-4"></i>
            </button>
          </div>
        </div>

        <!-- Add Item Form -->
        <div class="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#161B18] border border-stone-200/80 dark:border-white/10 shadow-clean-sm no-print">
          <form onsubmit="TastyApp.handleAddShoppingItem(event)" class="flex flex-col sm:flex-row gap-2.5">
            <input 
              type="text" 
              id="new-grocery-item" 
              required 
              placeholder="Add item (e.g. Avocado, 2 pieces)..." 
              class="flex-1 px-4 py-2.5 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-200/80 dark:border-white/15 text-xs text-ink-900 dark:text-white placeholder-ink-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-600" 
            />
            <select 
              id="new-grocery-aisle" 
              class="px-3.5 py-2.5 rounded-2xl bg-stone-50 dark:bg-[#1E2521] border border-stone-200/80 dark:border-white/15 text-xs text-ink-700 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            >
              <option value="Produce">Produce</option>
              <option value="Dairy">Dairy</option>
              <option value="Meat">Meat & Seafood</option>
              <option value="Pantry">Pantry</option>
              <option value="Spices">Spices & Seasoning</option>
              <option value="General">General</option>
            </select>
            <button 
              type="submit" 
              class="px-5 py-2.5 rounded-2xl bg-ink-900 dark:bg-emerald-600 hover:bg-black dark:hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-clean-sm flex items-center justify-center gap-1.5"
            >
              <i data-lucide="plus" class="w-4 h-4"></i>
              <span>Add Item</span>
            </button>
          </form>
        </div>

        <!-- Progress Bar -->
        <div class="w-full bg-stone-100 dark:bg-white/10 h-2 rounded-full overflow-hidden shadow-inner">
          <div class="bg-gradient-to-r from-emerald-500 to-citrus-500 h-full transition-all duration-500 rounded-full" style="width: ${percent}%;"></div>
        </div>

        ${total === 0 ? `
          <div class="py-16 text-center rounded-3xl bg-white dark:bg-[#161B18] border border-stone-200/80 dark:border-white/10 shadow-clean-sm space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <i data-lucide="shopping-bag" class="w-6 h-6"></i>
            </div>
            <div class="space-y-1">
              <h3 class="font-editorial text-2xl font-semibold text-ink-900 dark:text-white">Your Grocery List is Empty</h3>
              <p class="text-xs text-ink-500 dark:text-zinc-400 max-w-sm mx-auto">
                Schedule your favorite meals in the Meal Planner and click "Send to Grocery", or manually add items above.
              </p>
            </div>
            <button 
              onclick="TastyApp.navigateTo('planner')" 
              class="px-4 py-2 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-2xs inline-flex items-center gap-1.5 transition-all"
            >
              <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
              <span>Go to Meal Planner</span>
            </button>
          </div>
        ` : `
          <!-- Aisle Lists -->
          <div class="space-y-4">
            ${aisles.map(aisle => {
              const items = state.shoppingList.filter(i => {
                const a = i.aisle || 'General';
                return a === aisle.name || (aisle.name === 'Meat' && (a === 'Meat' || a === 'Meat & Seafood'));
              });
              if (!items.length) return '';

              return `
                <div class="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161B18] border border-stone-200/80 dark:border-white/10 shadow-clean-sm space-y-3">
                  <div class="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-white/10">
                    <h3 class="text-xs font-bold uppercase tracking-wider text-ink-900 dark:text-white flex items-center gap-2">
                      <i data-lucide="${aisle.icon}" class="w-4 h-4 text-emerald-600 dark:text-emerald-400"></i>
                      <span>${aisle.name}</span>
                    </h3>
                    <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-white/10 text-ink-600 dark:text-zinc-300">
                      ${items.length} ${items.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                  <div class="space-y-1">
                    ${items.map(item => `
                      <div class="flex items-center justify-between p-2 rounded-xl hover:bg-stone-50 dark:hover:bg-white/[0.04] text-xs transition-colors group">
                        <label class="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
                          <input 
                            type="checkbox" 
                            ${item.checked ? 'checked' : ''} 
                            onchange="TastyApp.toggleShoppingItem('${item.id}')" 
                            class="modern-checkbox" 
                          />
                          <span class="${item.checked ? 'checked-done text-ink-400 dark:text-zinc-500' : 'text-ink-800 dark:text-zinc-200 font-medium'} truncate">
                            <strong class="text-emerald-700 dark:text-emerald-400 font-bold mr-1">${item.amount}</strong> ${item.item}
                          </span>
                        </label>
                        <button 
                          onclick="TastyApp.deleteShoppingItem('${item.id}')" 
                          class="text-ink-300 dark:text-zinc-600 hover:text-rose-600 dark:hover:text-rose-400 p-1.5 rounded-lg opacity-60 group-hover:opacity-100 transition-opacity no-print"
                          title="Remove item"
                        >
                          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                        </button>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}

      </div>
    `;
  }

  // ==========================================
  // VIEW 8: ADD RECIPE FORM
  // ==========================================
  // ==========================================
  // VIEW 8: ADD RECIPE FORM
  // ==========================================
  function renderAddRecipeView() {
    return `
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 class="font-editorial text-4xl sm:text-5xl font-semibold text-ink-900 dark:text-white">Publish a Recipe</h1>
          <p class="text-xs sm:text-sm text-ink-500 dark:text-zinc-400">Share your signature dishes with the TastyNest community.</p>
        </div>

        <form onsubmit="TastyApp.handleRecipeFormSubmit(event)" class="space-y-6">
          <div class="p-6 rounded-3xl bg-white dark:bg-[#161B18] border border-stone-200/80 dark:border-white/10 shadow-clean-sm space-y-4 text-xs">
            <div>
              <label class="block font-bold text-ink-700 dark:text-zinc-300 mb-1">Title *</label>
              <input type="text" id="recipe-title" required placeholder="e.g. Saffron Tagliatelle with Lemon & Ricotta" class="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-white/15 bg-stone-50 dark:bg-white/5 text-ink-900 dark:text-white text-xs focus:outline-none" />
            </div>

            <div>
              <label class="block font-bold text-ink-700 dark:text-zinc-300 mb-1">Description *</label>
              <textarea id="recipe-desc" rows="2" required placeholder="Describe what makes this dish special..." class="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-white/15 bg-stone-50 dark:bg-white/5 text-ink-900 dark:text-white text-xs focus:outline-none"></textarea>
            </div>

            <div>
              <label class="block font-bold text-ink-700 dark:text-zinc-300 mb-1">Photo URL *</label>
              <div class="flex gap-2">
                <input type="url" id="recipe-image-url" required value="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80" oninput="document.getElementById('image-preview').src = this.value" class="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-white/15 bg-stone-50 dark:bg-white/5 text-ink-900 dark:text-white text-xs focus:outline-none" />
                <button type="button" onclick="TastyApp.useRandomPhoto()" class="px-3 py-2 rounded-xl bg-stone-100 dark:bg-white/10 text-ink-700 dark:text-zinc-200 font-semibold hover:bg-stone-200 dark:hover:bg-white/15">Random</button>
              </div>
              <div class="mt-2 w-full h-36 rounded-2xl overflow-hidden bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10">
                <img id="image-preview" src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80" class="w-full h-full object-cover" alt="Preview" />
              </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div>
                <label class="block font-bold text-ink-700 dark:text-zinc-300 mb-1">Category</label>
                <select id="recipe-category" class="w-full px-2.5 py-2 rounded-xl border border-stone-200 dark:border-white/15 bg-stone-50 dark:bg-[#1E2521] text-ink-900 dark:text-white text-xs">
                  <option value="Italian">Italian</option>
                  <option value="Indian">Indian</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Healthy Meals">Healthy Meals</option>
                  <option value="Quick Recipes">Quick Recipes</option>
                </select>
              </div>

              <div>
                <label class="block font-bold text-ink-700 dark:text-zinc-300 mb-1">Cuisine</label>
                <input type="text" id="recipe-cuisine" required value="Italian" class="w-full px-2.5 py-2 rounded-xl border border-stone-200 dark:border-white/15 bg-stone-50 dark:bg-white/5 text-ink-900 dark:text-white text-xs" />
              </div>

              <div>
                <label class="block font-bold text-ink-700 dark:text-zinc-300 mb-1">Prep (mins)</label>
                <input type="number" id="recipe-preptime" required value="15" min="1" class="w-full px-2.5 py-2 rounded-xl border border-stone-200 dark:border-white/15 bg-stone-50 dark:bg-white/5 text-ink-900 dark:text-white text-xs" />
              </div>

              <div>
                <label class="block font-bold text-ink-700 dark:text-zinc-300 mb-1">Cook (mins)</label>
                <input type="number" id="recipe-cooktime" required value="20" min="0" class="w-full px-2.5 py-2 rounded-xl border border-stone-200 dark:border-white/15 bg-stone-50 dark:bg-white/5 text-ink-900 dark:text-white text-xs" />
              </div>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div>
                <label class="block font-bold text-ink-700 dark:text-zinc-300 mb-1">Servings</label>
                <input type="number" id="recipe-servings" required value="4" min="1" class="w-full px-2.5 py-2 rounded-xl border border-stone-200 dark:border-white/15 bg-stone-50 dark:bg-white/5 text-ink-900 dark:text-white text-xs" />
              </div>
              <div>
                <label class="block font-bold text-ink-700 dark:text-zinc-300 mb-1">Calories</label>
                <input type="number" id="recipe-calories" required value="450" min="50" class="w-full px-2.5 py-2 rounded-xl border border-stone-200 dark:border-white/15 bg-stone-50 dark:bg-white/5 text-ink-900 dark:text-white text-xs" />
              </div>
              <div>
                <label class="block font-bold text-ink-700 dark:text-zinc-300 mb-1">Difficulty</label>
                <select id="recipe-difficulty" class="w-full px-2.5 py-2 rounded-xl border border-stone-200 dark:border-white/15 bg-stone-50 dark:bg-[#1E2521] text-ink-900 dark:text-white text-xs">
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div class="flex items-center gap-4 pt-1 text-ink-700 dark:text-zinc-300">
              <label class="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" id="recipe-is-veg" class="modern-checkbox" /><span>Vegetarian</span></label>
              <label class="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" id="recipe-is-vegan" class="modern-checkbox" /><span>Vegan</span></label>
              <label class="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" id="recipe-is-gf" class="modern-checkbox" /><span>Gluten-Free</span></label>
            </div>
          </div>

          <!-- Ingredients Builder -->
          <div class="p-6 rounded-3xl bg-white dark:bg-[#161B18] border border-stone-200/80 dark:border-white/10 shadow-clean-sm space-y-3">
            <div class="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-white/10">
              <h3 class="font-editorial text-2xl font-semibold text-ink-900 dark:text-white">Ingredients</h3>
              <button type="button" onclick="TastyApp.addIngredientRow()" class="text-xs font-semibold text-emerald-700 dark:text-emerald-400">+ Add Item</button>
            </div>
            <div id="form-ingredients-list" class="space-y-2">
              <div class="ingredient-row grid grid-cols-12 gap-2 items-center">
                <input type="text" placeholder="Ingredient name" required class="col-span-5 px-3 py-2 rounded-xl border border-stone-200 dark:border-white/15 bg-stone-50 dark:bg-white/5 text-ink-900 dark:text-white text-xs" />
                <input type="number" step="any" placeholder="Qty" value="2" required class="col-span-2 px-3 py-2 rounded-xl border border-stone-200 dark:border-white/15 bg-stone-50 dark:bg-white/5 text-ink-900 dark:text-white text-xs" />
                <input type="text" placeholder="Unit" value="cups" class="col-span-2 px-3 py-2 rounded-xl border border-stone-200 dark:border-white/15 bg-stone-50 dark:bg-white/5 text-ink-900 dark:text-white text-xs" />
                <select class="col-span-2 px-2 py-2 rounded-xl border border-stone-200 dark:border-white/15 bg-stone-50 dark:bg-[#1E2521] text-ink-900 dark:text-white text-xs">
                  <option value="Produce">Produce</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Meat">Meat</option>
                  <option value="Pantry">Pantry</option>
                  <option value="Spices">Spices</option>
                </select>
                <button type="button" onclick="this.parentElement.remove()" class="col-span-1 text-ink-300 dark:text-zinc-600 hover:text-rose-600">×</button>
              </div>
            </div>
          </div>

          <!-- Instructions Builder -->
          <div class="p-6 rounded-3xl bg-white dark:bg-[#161B18] border border-stone-200/80 dark:border-white/10 shadow-clean-sm space-y-3">
            <div class="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-white/10">
              <h3 class="font-editorial text-2xl font-semibold text-ink-900 dark:text-white">Instructions</h3>
              <button type="button" onclick="TastyApp.addInstructionStepRow()" class="text-xs font-semibold text-emerald-700 dark:text-emerald-400">+ Add Step</button>
            </div>
            <div id="form-instructions-list" class="space-y-2">
              <div class="instruction-row p-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 space-y-2">
                <div class="flex items-center gap-2">
                  <input type="text" placeholder="Step title" required class="flex-1 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-white/15 bg-white dark:bg-white/5 text-ink-900 dark:text-white text-xs font-bold" />
                  <input type="number" placeholder="Timer (mins)" min="0" class="w-24 px-2 py-1.5 rounded-lg border border-stone-200 dark:border-white/15 bg-white dark:bg-white/5 text-ink-900 dark:text-white text-xs" />
                </div>
                <textarea rows="2" placeholder="Describe instructions..." required class="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-white/15 bg-white dark:bg-white/5 text-ink-900 dark:text-white text-xs"></textarea>
              </div>
            </div>
          </div>

          <button type="submit" class="w-full py-3 rounded-2xl bg-ink-900 dark:bg-emerald-600 hover:bg-black dark:hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all">
            Publish Recipe
          </button>
        </form>
      </div>
    `;
  }

  // ==========================================
  // VIEW 9: USER PROFILE & CLOUD STUDIO DASHBOARD
  // ==========================================
  function renderProfileView() {
    const plannedCount = Object.values(state.mealPlan).reduce((acc, day) => {
      return acc + Object.values(day).filter(Boolean).length;
    }, 0);
    const isFirebaseReady = typeof TastyFirebase !== 'undefined' && TastyFirebase.isReady();
    const fbUser = typeof TastyFirebase !== 'undefined' ? TastyFirebase.getUser() : null;

    const dietaryOptions = [
      'Mediterranean', 'High-Protein', 'Vegetarian', 'Vegan', 
      'Gluten-Free', 'Dairy-Free', 'Low-Carb / Keto', 'Nut-Free'
    ];

    const avatarPresets = [
      { name: "Elena", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" },
      { name: "Marco", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" },
      { name: "Claire", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80" },
      { name: "Liam", url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80" },
      { name: "Aria", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" }
    ];

    return `
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <!-- Profile Banner Card -->
        <div class="relative rounded-3xl overflow-hidden bg-gradient-to-br from-stone-900 via-stone-900 to-emerald-950 text-white p-6 sm:p-10 shadow-clean-xl border border-white/10">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div class="relative group">
                <img id="profile-avatar-display" src="${state.user.avatar}" alt="${state.user.name}" class="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-2 border-white/20 shadow-lg" />
                <button onclick="document.getElementById('profile-edit-section').scrollIntoView({ behavior: 'smooth' })" class="absolute -bottom-2 -right-2 p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all hover:scale-105" title="Change Avatar">
                  <i data-lucide="camera" class="w-3.5 h-3.5"></i>
                </button>
              </div>

              <div class="space-y-1.5">
                <div class="flex items-center gap-2 flex-wrap">
                  <h1 class="font-editorial text-3xl sm:text-4xl font-semibold text-white tracking-tight">${state.user.name}</h1>
                  <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                    PRO CHEF
                  </span>
                </div>
                <p class="text-xs sm:text-sm text-stone-300 font-medium">${state.user.title}</p>
                <div class="flex items-center gap-3 text-xs text-stone-400 pt-1">
                  <span class="flex items-center gap-1"><i data-lucide="mail" class="w-3.5 h-3.5 text-stone-400"></i> ${state.user.email}</span>
                  <span>·</span>
                  <span class="flex items-center gap-1"><i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-400"></i> ${isFirebaseReady ? 'Firebase Connected' : 'Local Storage'}</span>
                </div>
              </div>
            </div>

            <!-- Header Quick Actions -->
            <div class="flex sm:flex-col items-center gap-2 w-full sm:w-auto">
              <button onclick="TastyApp.triggerCloudSync()" class="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all">
                <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
                <span>Sync Studio Data</span>
              </button>
              <button onclick="TastyApp.exportCulinaryBackup()" class="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all">
                <i data-lucide="download" class="w-3.5 h-3.5"></i>
                <span>Export Backup</span>
              </button>
            </div>
          </div>

          <!-- Bio bar -->
          <div class="mt-6 pt-5 border-t border-white/10 text-xs text-stone-300 leading-relaxed max-w-3xl">
            <p>“${state.user.bio || 'Exploring authentic textures, vibrant spices, and handcrafted recipes with TastyNest.'}”</p>
          </div>
        </div>

        <!-- 4-Metric Studio Snapshot -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div onclick="TastyApp.navigateTo('favorites')" class="cursor-pointer p-5 rounded-3xl bg-white dark:bg-[#161B18] border border-stone-200/70 dark:border-white/10 shadow-clean-sm hover:border-citrus-500/50 transition-all group">
            <div class="flex items-center justify-between mb-2">
              <span class="text-[11px] font-bold text-ink-400 dark:text-zinc-400 uppercase tracking-wider">Saved Recipes</span>
              <div class="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center">
                <i data-lucide="heart" class="w-4 h-4 fill-current"></i>
              </div>
            </div>
            <p class="font-editorial text-3xl font-bold text-ink-900 dark:text-white">${state.favorites.length}</p>
            <span class="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold group-hover:underline">View Saved Vault &rarr;</span>
          </div>

          <div onclick="TastyApp.navigateTo('planner')" class="cursor-pointer p-5 rounded-3xl bg-white dark:bg-[#161B18] border border-stone-200/70 dark:border-white/10 shadow-clean-sm hover:border-citrus-500/50 transition-all group">
            <div class="flex items-center justify-between mb-2">
              <span class="text-[11px] font-bold text-ink-400 dark:text-zinc-400 uppercase tracking-wider">Weekly Menu</span>
              <div class="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
                <i data-lucide="calendar" class="w-4 h-4"></i>
              </div>
            </div>
            <p class="font-editorial text-3xl font-bold text-ink-900 dark:text-white">${plannedCount}</p>
            <span class="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold group-hover:underline">Manage Meal Plan &rarr;</span>
          </div>

          <div onclick="TastyApp.navigateTo('shopping')" class="cursor-pointer p-5 rounded-3xl bg-white dark:bg-[#161B18] border border-stone-200/70 dark:border-white/10 shadow-clean-sm hover:border-citrus-500/50 transition-all group">
            <div class="flex items-center justify-between mb-2">
              <span class="text-[11px] font-bold text-ink-400 dark:text-zinc-400 uppercase tracking-wider">Grocery Items</span>
              <div class="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
                <i data-lucide="shopping-bag" class="w-4 h-4"></i>
              </div>
            </div>
            <p class="font-editorial text-3xl font-bold text-ink-900 dark:text-white">${state.shoppingList.filter(i => !i.checked).length}</p>
            <span class="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold group-hover:underline">Aisle Checklist &rarr;</span>
          </div>

          <div onclick="TastyApp.navigateTo('add-recipe')" class="cursor-pointer p-5 rounded-3xl bg-white dark:bg-[#161B18] border border-stone-200/70 dark:border-white/10 shadow-clean-sm hover:border-citrus-500/50 transition-all group">
            <div class="flex items-center justify-between mb-2">
              <span class="text-[11px] font-bold text-ink-400 dark:text-zinc-400 uppercase tracking-wider">Published Recipes</span>
              <div class="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
                <i data-lucide="chef-hat" class="w-4 h-4"></i>
              </div>
            </div>
            <p class="font-editorial text-3xl font-bold text-ink-900 dark:text-white">${state.customRecipes.length}</p>
            <span class="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold group-hover:underline">Publish New Dish &rarr;</span>
          </div>
        </div>

        <!-- 2-Column Studio: Profile Editor & Cloud Control Center -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- LEFT: Profile Editor Form (7 Cols) -->
          <div id="profile-edit-section" class="lg:col-span-7 space-y-6">
            <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#161B18] border border-stone-200/70 dark:border-white/10 shadow-clean-sm space-y-5">
              <div class="border-b border-stone-100 dark:border-white/5 pb-3">
                <h3 class="font-editorial text-2xl font-semibold text-ink-900 dark:text-white">Profile & Chef Identity</h3>
                <p class="text-xs text-ink-500 dark:text-zinc-400 mt-0.5">Customize how your culinary persona appears across TastyNest.</p>
              </div>

              <form onsubmit="TastyApp.saveProfileSettings(event)" class="space-y-4 text-xs">
                <div>
                  <label class="block font-bold text-ink-700 dark:text-zinc-300 mb-1">Display Name</label>
                  <input type="text" id="profile-edit-name" value="${state.user.name}" required class="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-white/10 bg-stone-50 dark:bg-white/5 text-ink-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600" />
                </div>

                <div>
                  <label class="block font-bold text-ink-700 dark:text-zinc-300 mb-1">Culinary Title</label>
                  <input type="text" id="profile-edit-title" value="${state.user.title}" placeholder="e.g. Italian Gastronomy Artisan, Weekend Baker..." class="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-white/10 bg-stone-50 dark:bg-white/5 text-ink-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600" />
                </div>

                <div>
                  <label class="block font-bold text-ink-700 dark:text-zinc-300 mb-1">Email Address</label>
                  <input type="email" id="profile-edit-email" value="${state.user.email}" readonly class="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-white/10 bg-stone-100 dark:bg-white/10 text-ink-500 dark:text-zinc-400 text-xs cursor-not-allowed" />
                </div>

                <div>
                  <label class="block font-bold text-ink-700 dark:text-zinc-300 mb-1">Bio & Philosophy</label>
                  <textarea id="profile-edit-bio" rows="3" class="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-white/10 bg-stone-50 dark:bg-white/5 text-ink-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600" placeholder="Share your cooking passion...">${state.user.bio}</textarea>
                </div>

                <div>
                  <label class="block font-bold text-ink-700 dark:text-zinc-300 mb-1">Avatar Image URL</label>
                  <input type="url" id="profile-edit-avatar" value="${state.user.avatar}" oninput="document.getElementById('profile-avatar-display').src=this.value" class="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-white/10 bg-stone-50 dark:bg-white/5 text-ink-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600" />
                </div>

                <!-- Avatar Quick Pickers -->
                <div class="pt-1">
                  <span class="block text-[11px] font-bold uppercase tracking-wider text-ink-400 dark:text-zinc-500 mb-2">Or Choose a Chef Avatar:</span>
                  <div class="flex items-center gap-2.5">
                    ${avatarPresets.map(preset => `
                      <button 
                        type="button" 
                        onclick="TastyApp.pickProfileAvatar('${preset.url}')"
                        class="group/avatar relative w-10 h-10 rounded-2xl overflow-hidden border-2 hover:border-emerald-600 transition-all"
                        title="${preset.name}"
                      >
                        <img src="${preset.url}" alt="${preset.name}" class="w-full h-full object-cover" />
                      </button>
                    `).join('')}
                  </div>
                </div>

                <div class="pt-3">
                  <button type="submit" class="w-full py-3 rounded-2xl bg-ink-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-2">
                    <i data-lucide="check" class="w-4 h-4"></i>
                    <span>Save Profile Changes</span>
                  </button>
                </div>
              </form>
            </div>

            <!-- Dietary Setup Form -->
            <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#161B18] border border-stone-200/70 dark:border-white/10 shadow-clean-sm space-y-4">
              <div class="border-b border-stone-100 dark:border-white/5 pb-3">
                <h3 class="font-editorial text-2xl font-semibold text-ink-900 dark:text-white">Dietary & Allergen Filters</h3>
                <p class="text-xs text-ink-500 dark:text-zinc-400 mt-0.5">Customizes recommendations and recipe tags automatically.</p>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-medium">
                ${dietaryOptions.map(option => {
                  const isChecked = (state.user.dietaryPreferences || []).includes(option);
                  return `
                    <label class="flex items-center gap-2 p-2.5 rounded-xl border border-stone-200 dark:border-white/10 hover:bg-stone-50 dark:hover:bg-white/5 cursor-pointer transition-colors">
                      <input type="checkbox" name="dietary-pref" value="${option}" ${isChecked ? 'checked' : ''} class="modern-checkbox" />
                      <span class="text-ink-800 dark:text-zinc-200">${option}</span>
                    </label>
                  `;
                }).join('')}
              </div>

              <button onclick="TastyApp.saveDietaryPreferences()" class="px-5 py-2.5 rounded-xl bg-ink-900 hover:bg-black dark:bg-white/10 dark:hover:bg-white/20 text-white text-xs font-semibold transition-all">
                Update Preferences
              </button>
            </div>
          </div>

          <!-- RIGHT: Firebase Cloud Sync & Export Studio (5 Cols) -->
          <div class="lg:col-span-5 space-y-6">
            
            <!-- Cloud Connection Status Box -->
            <div class="p-6 rounded-3xl bg-white dark:bg-[#161B18] border border-stone-200/70 dark:border-white/10 shadow-clean-sm space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                  <div class="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <i data-lucide="cloud" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-ink-900 dark:text-white text-sm">Firebase Cloud Studio</h4>
                    <p class="text-[11px] text-ink-400 dark:text-zinc-500">Project: <span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold">vibecart-146fe</span></p>
                  </div>
                </div>
                <span class="w-3 h-3 rounded-full ${isFirebaseReady ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}" title="${isFirebaseReady ? 'Live Cloud Connected' : 'Local Storage Mode'}"></span>
              </div>

              <div class="p-4 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 space-y-2 text-xs">
                <div class="flex items-center justify-between text-ink-600 dark:text-zinc-300">
                  <span>Firestore Status</span>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">Online & Ready</span>
                </div>
                <div class="flex items-center justify-between text-ink-600 dark:text-zinc-300">
                  <span>Cloud Documents</span>
                  <span class="font-bold text-ink-900 dark:text-white">${state.favorites.length + state.shoppingList.length + plannedCount} Records</span>
                </div>
                <div class="flex items-center justify-between text-ink-600 dark:text-zinc-300">
                  <span>Storage Engine</span>
                  <span class="font-bold text-ink-900 dark:text-white truncate max-w-[140px]">${isFirebaseReady ? 'Firestore Cloud' : 'Local Storage'}</span>
                </div>
              </div>

              <div class="space-y-2 pt-1">
                <button 
                  onclick="TastyApp.triggerCloudSync()" 
                  class="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <i data-lucide="cloud-upload" class="w-4 h-4"></i>
                  <span>Sync All to Firestore Cloud</span>
                </button>

                <button 
                  onclick="TastyApp.showCloudSyncInfo()" 
                  class="w-full py-2.5 rounded-xl border border-stone-200 dark:border-white/10 hover:bg-stone-50 dark:hover:bg-white/5 text-ink-700 dark:text-zinc-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <i data-lucide="info" class="w-4 h-4"></i>
                  <span>View Database Diagnostics</span>
                </button>
              </div>
            </div>

            <!-- Export & Backup Hub -->
            <div class="p-6 rounded-3xl bg-white dark:bg-[#161B18] border border-stone-200/70 dark:border-white/10 shadow-clean-sm space-y-4">
              <div>
                <h4 class="font-editorial text-xl font-semibold text-ink-900 dark:text-white">Culinary Data Backup</h4>
                <p class="text-xs text-ink-500 dark:text-zinc-400 mt-0.5">Take your saved recipes, shopping list, and meal plan anywhere.</p>
              </div>

              <div class="space-y-2.5 text-xs">
                <button 
                  onclick="TastyApp.exportCulinaryBackup()"
                  class="w-full p-3 rounded-2xl border border-stone-200 dark:border-white/10 hover:border-emerald-600 dark:hover:border-emerald-500 bg-stone-50/50 dark:bg-white/5 flex items-center justify-between text-left transition-all group"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-xl bg-white dark:bg-stone-800 flex items-center justify-center text-ink-600 dark:text-zinc-300">
                      <i data-lucide="file-json" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <p class="font-bold text-ink-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">Export JSON Backup</p>
                      <p class="text-[10px] text-ink-400 dark:text-zinc-500">Full recipes, planner, and grocery data</p>
                    </div>
                  </div>
                  <i data-lucide="download" class="w-4 h-4 text-ink-400 dark:text-zinc-400"></i>
                </button>

                <button 
                  onclick="TastyApp.exportShoppingListText()"
                  class="w-full p-3 rounded-2xl border border-stone-200 dark:border-white/10 hover:border-emerald-600 dark:hover:border-emerald-500 bg-stone-50/50 dark:bg-white/5 flex items-center justify-between text-left transition-all group"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-xl bg-white dark:bg-stone-800 flex items-center justify-center text-ink-600 dark:text-zinc-300">
                      <i data-lucide="clipboard-list" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <p class="font-bold text-ink-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">Export Grocery List (TXT)</p>
                      <p class="text-[10px] text-ink-400 dark:text-zinc-500">Formatted checklist by grocery aisles</p>
                    </div>
                  </div>
                  <i data-lucide="download" class="w-4 h-4 text-ink-400 dark:text-zinc-400"></i>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    `;
  }

  // Global Helpers
  function toggleFavorite(id, e) {
    if (e) e.stopPropagation();
    const idx = state.favorites.indexOf(id);
    if (idx > -1) {
      state.favorites.splice(idx, 1);
      showNotification('Removed from Saved', 'info');
    } else {
      state.favorites.push(id);
      showNotification('Saved to Favorites!', 'success');
      if (window.confetti) {
        confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
      }
    }
    localStorage.setItem('tastynest_favorites', JSON.stringify(state.favorites));
    if (typeof TastyFirebase !== 'undefined') TastyFirebase.saveFavoritesToCloud(state.favorites);
    updateNavUI();
    renderView();
  }

  function setFilter(key, value) {
    state.filters[key] = value;
    renderView();
  }

  function resetFilters() {
    state.searchQuery = '';
    state.filters = { category: 'All', cuisine: 'All', difficulty: 'All', maxTime: 120, dietary: 'all', sortBy: 'featured' };
    renderView();
  }

  function quickFilterTag(cat) {
    state.filters.category = cat;
    navigateTo('explore');
  }

  function handleHeroSearch(val) {
    state.searchQuery = val;
    navigateTo('explore');
  }

  function changeServings(newServings) {
    state.activeServings = newServings;
    renderView();
  }

  function toggleStepDone(idx) {
    state.completedSteps[idx] = !state.completedSteps[idx];
    renderView();
  }

  function resetStepProgress() {
    state.completedSteps = {};
    renderView();
  }

  function finishRecipeCooking(title) {
    showNotification(`Mastered ${title}! 👨‍🍳✨`, 'success');
    if (window.confetti) confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  }

  function addAllToShoppingList(recipeId) {
    const recipe = getRecipeById(recipeId);
    if (!recipe) return;
    const mult = state.activeServings / recipe.servings;

    recipe.ingredients.forEach(ing => {
      const amt = (ing.amount * mult);
      const displayAmt = Number.isInteger(amt) ? amt : amt.toFixed(1);
      state.shoppingList.push({
        id: Date.now() + Math.random().toString(),
        item: ing.item,
        amount: `${displayAmt} ${ing.unit}`,
        aisle: ing.aisle || 'General',
        checked: false
      });
    });

    localStorage.setItem('tastynest_shopping_list', JSON.stringify(state.shoppingList));
    if (typeof TastyFirebase !== 'undefined') TastyFirebase.saveShoppingListToCloud(state.shoppingList);
    updateNavUI();
    showNotification(`Added ${recipe.ingredients.length} items to Grocery List!`, 'success');
  }

  function handleAddShoppingItem(e) {
    e.preventDefault();
    const input = document.getElementById('new-grocery-item');
    const aisle = document.getElementById('new-grocery-aisle');
    if (!input.value.trim()) return;

    state.shoppingList.unshift({
      id: Date.now().toString(),
      item: input.value.trim(),
      amount: '',
      aisle: aisle.value,
      checked: false
    });

    localStorage.setItem('tastynest_shopping_list', JSON.stringify(state.shoppingList));
    if (typeof TastyFirebase !== 'undefined') TastyFirebase.saveShoppingListToCloud(state.shoppingList);
    input.value = '';
    updateNavUI();
    renderView();
    showNotification('Item added to list', 'success');
  }

  function toggleShoppingItem(id) {
    const item = state.shoppingList.find(i => i.id === id);
    if (item) {
      item.checked = !item.checked;
      localStorage.setItem('tastynest_shopping_list', JSON.stringify(state.shoppingList));
      if (typeof TastyFirebase !== 'undefined') TastyFirebase.saveShoppingListToCloud(state.shoppingList);
      updateNavUI();
      renderView();
    }
  }

  function deleteShoppingItem(id) {
    state.shoppingList = state.shoppingList.filter(i => i.id !== id);
    localStorage.setItem('tastynest_shopping_list', JSON.stringify(state.shoppingList));
    if (typeof TastyFirebase !== 'undefined') TastyFirebase.saveShoppingListToCloud(state.shoppingList);
    updateNavUI();
    renderView();
  }

  function clearCheckedShopping() {
    state.shoppingList = state.shoppingList.filter(i => !i.checked);
    localStorage.setItem('tastynest_shopping_list', JSON.stringify(state.shoppingList));
    if (typeof TastyFirebase !== 'undefined') TastyFirebase.saveShoppingListToCloud(state.shoppingList);
    updateNavUI();
    renderView();
    showNotification('Cleared checked items', 'info');
  }

  function consolidateShoppingList() {
    const itemMap = new Map();
    state.shoppingList.forEach(item => {
      if (!item || !item.item) return;
      const key = item.item.toLowerCase().trim();
      if (itemMap.has(key)) {
        const existing = itemMap.get(key);
        existing.checked = existing.checked && item.checked;
      } else {
        itemMap.set(key, { ...item });
      }
    });

    state.shoppingList = Array.from(itemMap.values());
    localStorage.setItem('tastynest_shopping_list', JSON.stringify(state.shoppingList));
    if (typeof TastyFirebase !== 'undefined') TastyFirebase.saveShoppingListToCloud(state.shoppingList);
    updateNavUI();
    renderView();
    showNotification(`Merged duplicate items into ${state.shoppingList.length} unique ingredients!`, 'success');
  }

  function clearAllShopping() {
    if (confirm('Clear your entire grocery shopping list?')) {
      state.shoppingList = [];
      localStorage.setItem('tastynest_shopping_list', JSON.stringify(state.shoppingList));
      if (typeof TastyFirebase !== 'undefined') TastyFirebase.saveShoppingListToCloud(state.shoppingList);
      updateNavUI();
      renderView();
      showNotification('Grocery list cleared', 'info');
    }
  }

  function openMealPlanModal(recipeId, e) {
    if (e) e.stopPropagation();
    state.tempPlanSelection.recipeId = recipeId;
    const recipe = getRecipeById(recipeId);
    const titleEl = document.getElementById('plan-modal-recipe-title');
    if (titleEl && recipe) titleEl.innerText = recipe.title;
    document.getElementById('meal-plan-modal').classList.remove('hidden');
  }

  function openMealPlanModalForSlot(day, slot) {
    openSlotDishPicker(day, slot);
  }

  function openSlotDishPicker(day, slot) {
    state.slotPickerTarget = { day, slot };
    state.slotPickerSearch = '';
    state.slotPickerCategory = 'All';

    const modal = document.getElementById('slot-dish-picker-modal');
    const titleEl = document.getElementById('slot-picker-title');
    const subtitleEl = document.getElementById('slot-picker-subtitle');
    const searchInput = document.getElementById('slot-picker-search-input');

    if (titleEl) titleEl.innerText = `Select ${slot}`;
    if (subtitleEl) subtitleEl.innerText = `Choose a gourmet recipe to schedule for ${day} ${slot}`;
    if (searchInput) searchInput.value = '';

    renderSlotPickerCategories();
    renderSlotPickerRecipes();

    if (modal) modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  }

  function closeSlotDishPicker() {
    const modal = document.getElementById('slot-dish-picker-modal');
    if (modal) modal.classList.add('hidden');
  }

  function handleSlotPickerSearch(val) {
    state.slotPickerSearch = (val || '').toLowerCase().trim();
    renderSlotPickerRecipes();
  }

  function selectSlotPickerCategory(cat) {
    state.slotPickerCategory = cat;
    renderSlotPickerCategories();
    renderSlotPickerRecipes();
  }

  function renderSlotPickerCategories() {
    const container = document.getElementById('slot-picker-category-chips');
    if (!container) return;

    const cats = ['All', 'Breakfast', 'Quick (<25m)', 'High-Protein', 'Vegetarian', 'Italian', 'Indian', 'Desserts'];
    container.innerHTML = cats.map(cat => {
      const active = state.slotPickerCategory === cat;
      return `
        <button 
          onclick="TastyApp.selectSlotPickerCategory('${cat}')" 
          class="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${active ? 'bg-emerald-700 text-white shadow-2xs' : 'bg-stone-100 dark:bg-white/10 text-ink-600 dark:text-zinc-300 hover:bg-stone-200 dark:hover:bg-white/15'}"
        >
          ${cat}
        </button>
      `;
    }).join('');
  }

  function renderSlotPickerRecipes() {
    const list = document.getElementById('slot-picker-recipes-list');
    if (!list) return;

    let recipes = getAllRecipes();
    const cat = state.slotPickerCategory;

    // Filter by category
    if (cat === 'Breakfast') {
      recipes = recipes.filter(r => r.category === 'Breakfast' || (r.tags && r.tags.includes('Breakfast')));
    } else if (cat === 'Quick (<25m)') {
      recipes = recipes.filter(r => ((r.prepTime || 0) + (r.cookTime || 0)) <= 25);
    } else if (cat === 'High-Protein') {
      recipes = recipes.filter(r => (r.nutrition && r.nutrition.protein >= 25) || (r.tags && r.tags.includes('High-Protein')));
    } else if (cat === 'Vegetarian') {
      recipes = recipes.filter(r => r.isVegetarian);
    } else if (cat === 'Italian') {
      recipes = recipes.filter(r => r.cuisine === 'Italian');
    } else if (cat === 'Indian') {
      recipes = recipes.filter(r => r.cuisine === 'Indian');
    } else if (cat === 'Desserts') {
      recipes = recipes.filter(r => r.category === 'Desserts');
    }

    // Filter by search query
    if (state.slotPickerSearch) {
      recipes = recipes.filter(r => 
        (r.title && r.title.toLowerCase().includes(state.slotPickerSearch)) ||
        (r.description && r.description.toLowerCase().includes(state.slotPickerSearch)) ||
        (r.tags && r.tags.some(t => t.toLowerCase().includes(state.slotPickerSearch))) ||
        (r.ingredients && r.ingredients.some(i => i.item && i.item.toLowerCase().includes(state.slotPickerSearch)))
      );
    }

    if (recipes.length === 0) {
      list.innerHTML = `
        <div class="py-12 text-center text-ink-400 dark:text-zinc-500 space-y-2">
          <i data-lucide="utensils" class="w-8 h-8 mx-auto text-ink-300 dark:text-zinc-600"></i>
          <p class="text-xs">No matching recipes found. Try a different search term or category.</p>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    list.innerHTML = recipes.map(r => `
      <div class="p-3 rounded-2xl bg-stone-50 dark:bg-white/[0.03] border border-stone-200/70 dark:border-white/10 flex items-center justify-between gap-3 hover:border-emerald-500/50 transition-all">
        <div class="flex items-center gap-3 min-w-0">
          <img 
            src="${r.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80'}" 
            alt="${r.title}" 
            class="w-14 h-14 rounded-xl object-cover shrink-0 border border-stone-200/80 dark:border-white/10" 
          />
          <div class="min-w-0 space-y-0.5">
            <h4 class="font-bold text-xs sm:text-sm text-ink-900 dark:text-white truncate">${r.title}</h4>
            <div class="flex items-center gap-2 text-[11px] text-ink-500 dark:text-zinc-400">
              <span>⚡ ${r.calories || 0} kcal</span>
              <span>•</span>
              <span>⏱️ ${(r.prepTime || 0) + (r.cookTime || 0)}m</span>
              <span>•</span>
              <span class="capitalize">${r.cuisine}</span>
              ${r.hasVideo ? `<span class="px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-[9px]">Video</span>` : ''}
            </div>
          </div>
        </div>

        <button 
          onclick="TastyApp.confirmSlotDishSelection('${r.id}')" 
          class="shrink-0 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-2xs flex items-center gap-1.5 transition-all"
        >
          <i data-lucide="check" class="w-3.5 h-3.5"></i>
          <span>Select</span>
        </button>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  }

  function confirmSlotDishSelection(recipeId) {
    const { day, slot } = state.slotPickerTarget;
    if (!state.mealPlan[day]) state.mealPlan[day] = {};
    state.mealPlan[day][slot] = recipeId;
    localStorage.setItem('tastynest_meal_plan', JSON.stringify(state.mealPlan));
    if (typeof TastyFirebase !== 'undefined') TastyFirebase.saveMealPlanToCloud(state.mealPlan);

    closeSlotDishPicker();
    const recipe = getRecipeById(recipeId);
    showNotification(`Scheduled "${recipe ? recipe.title : 'Dish'}" for ${day} ${slot}!`, 'success');
    renderView();
  }

  function setPlannerActiveDay(day) {
    state.plannerActiveDay = day;
    renderView();
  }

  function autoBalanceMealPlan() {
    const breakfastPool = ['fluffy-blueberry-ricotta-pancakes', 'avocado-poached-egg-toast'];
    const lunchPool = ['mediterranean-chickpea-power-bowl', 'creamy-tomato-basil-penne', 'crispy-baja-fish-tacos', 'pan-seared-gnocchi', '15min-garlic-butter-shrimp-scampi', 'grilled-salmon-quinoa-bowl'];
    const dinnerPool = ['butter-chicken-delight', 'authentic-carbonara', 'szechuan-kung-pao', 'wild-mushroom-truffle-risotto', 'creamy-tuscan-salmon', 'hyderabadi-dum-biryani', 'shahi-paneer-deluxe', 'beetroot-goat-cheese-galette'];
    const snackPool = ['molten-chocolate-lava-cake', 'classic-italian-tiramisu', 'mumbai-pani-puri', 'dim-sum-crystal-shrimp-dumplings'];

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    days.forEach((day, dIdx) => {
      if (!state.mealPlan[day]) state.mealPlan[day] = {};
      state.mealPlan[day].Breakfast = breakfastPool[dIdx % breakfastPool.length];
      state.mealPlan[day].Lunch = lunchPool[dIdx % lunchPool.length];
      state.mealPlan[day].Dinner = dinnerPool[dIdx % dinnerPool.length];
      state.mealPlan[day].Snack = snackPool[dIdx % snackPool.length];
    });

    localStorage.setItem('tastynest_meal_plan', JSON.stringify(state.mealPlan));
    if (typeof TastyFirebase !== 'undefined') TastyFirebase.saveMealPlanToCloud(state.mealPlan);

    showNotification('Weekly gourmet meal plan auto-balanced!', 'success');
    renderView();
  }

  function shuffleMealPlan() {
    const all = getAllRecipes();
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const slots = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

    days.forEach(day => {
      if (!state.mealPlan[day]) state.mealPlan[day] = {};
      slots.forEach(slot => {
        const rand = all[Math.floor(Math.random() * all.length)];
        state.mealPlan[day][slot] = rand.id;
      });
    });

    localStorage.setItem('tastynest_meal_plan', JSON.stringify(state.mealPlan));
    if (typeof TastyFirebase !== 'undefined') TastyFirebase.saveMealPlanToCloud(state.mealPlan);

    showNotification('Shuffled 28 weekly chef recipes!', 'info');
    renderView();
  }

  function shuffleDayPlan(day) {
    const all = getAllRecipes();
    const slots = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
    if (!state.mealPlan[day]) state.mealPlan[day] = {};

    slots.forEach(slot => {
      const rand = all[Math.floor(Math.random() * all.length)];
      state.mealPlan[day][slot] = rand.id;
    });

    localStorage.setItem('tastynest_meal_plan', JSON.stringify(state.mealPlan));
    if (typeof TastyFirebase !== 'undefined') TastyFirebase.saveMealPlanToCloud(state.mealPlan);

    showNotification(`Shuffled meals for ${day}!`, 'info');
    renderView();
  }

  function clearDayPlan(day) {
    if (state.mealPlan[day]) {
      state.mealPlan[day] = { Breakfast: null, Lunch: null, Dinner: null, Snack: null };
      localStorage.setItem('tastynest_meal_plan', JSON.stringify(state.mealPlan));
      if (typeof TastyFirebase !== 'undefined') TastyFirebase.saveMealPlanToCloud(state.mealPlan);
      showNotification(`Cleared meals for ${day}`, 'info');
      renderView();
    }
  }

  function closeMealPlanModal() {
    document.getElementById('meal-plan-modal').classList.add('hidden');
  }

  function selectPlanDay(day) {
    state.tempPlanSelection.day = day;
    document.querySelectorAll('.plan-day-btn').forEach(btn => {
      if (btn.innerText.includes(day.slice(0, 3))) {
        btn.classList.add('bg-ink-900', 'text-white');
      } else {
        btn.classList.remove('bg-ink-900', 'text-white');
      }
    });
  }

  function selectPlanSlot(slot) {
    state.tempPlanSelection.slot = slot;
    document.querySelectorAll('.plan-slot-btn').forEach(btn => {
      if (btn.innerText === slot) {
        btn.classList.add('bg-ink-900', 'text-white');
      } else {
        btn.classList.remove('bg-ink-900', 'text-white');
      }
    });
  }

  function confirmAddToPlan() {
    const { recipeId, day, slot } = state.tempPlanSelection;
    if (!state.mealPlan[day]) state.mealPlan[day] = {};
    state.mealPlan[day][slot] = recipeId;
    localStorage.setItem('tastynest_meal_plan', JSON.stringify(state.mealPlan));
    if (typeof TastyFirebase !== 'undefined') TastyFirebase.saveMealPlanToCloud(state.mealPlan);
    closeMealPlanModal();
    showNotification(`Scheduled for ${day} ${slot}!`, 'success');
    if (state.currentView === 'planner') renderView();
  }

  function removeMealFromPlan(day, slot) {
    if (state.mealPlan[day]) {
      state.mealPlan[day][slot] = null;
      localStorage.setItem('tastynest_meal_plan', JSON.stringify(state.mealPlan));
      if (typeof TastyFirebase !== 'undefined') TastyFirebase.saveMealPlanToCloud(state.mealPlan);
      renderView();
      showNotification(`Removed ${slot} from ${day}`, 'info');
    }
  }

  function clearMealPlan() {
    if (confirm('Clear the entire weekly meal plan?')) {
      state.mealPlan = { Monday: {}, Tuesday: {}, Wednesday: {}, Thursday: {}, Friday: {}, Saturday: {}, Sunday: {} };
      localStorage.setItem('tastynest_meal_plan', JSON.stringify(state.mealPlan));
      if (typeof TastyFirebase !== 'undefined') TastyFirebase.saveMealPlanToCloud(state.mealPlan);
      renderView();
      showNotification('Weekly plan cleared', 'info');
    }
  }

  function generateShoppingListFromMealPlan() {
    let itemsAdded = 0;
    const itemMap = new Map();

    // Map existing shopping items to avoid duplicates
    state.shoppingList.forEach(item => {
      if (item && item.item) itemMap.set(item.item.toLowerCase().trim(), item);
    });

    Object.keys(state.mealPlan).forEach(day => {
      Object.keys(state.mealPlan[day]).forEach(slot => {
        const rId = state.mealPlan[day][slot];
        if (rId) {
          const rec = getRecipeById(rId);
          if (rec && rec.ingredients) {
            rec.ingredients.forEach(ing => {
              const key = (ing.item || '').toLowerCase().trim();
              if (!key) return;

              if (itemMap.has(key)) {
                // Already listed, no duplicate spam
              } else {
                const newItem = {
                  id: Date.now() + Math.random().toString(),
                  item: ing.item,
                  amount: `${ing.amount || ''} ${ing.unit || ''}`.trim(),
                  aisle: ing.aisle || 'General',
                  checked: false
                };
                itemMap.set(key, newItem);
                state.shoppingList.push(newItem);
                itemsAdded++;
              }
            });
          }
        }
      });
    });

    localStorage.setItem('tastynest_shopping_list', JSON.stringify(state.shoppingList));
    if (typeof TastyFirebase !== 'undefined') TastyFirebase.saveShoppingListToCloud(state.shoppingList);
    updateNavUI();
    navigateTo('shopping');
    showNotification(`Added ${itemsAdded} fresh ingredients to your smart grocery list!`, 'success');
  }

  function startCookingTimer(minutes, title) {
    if (state.timer.interval) clearInterval(state.timer.interval);
    state.timer.secondsRemaining = minutes * 60;
    state.timer.running = true;
    state.timer.title = title || 'Cooking Step';

    const bar = document.getElementById('floating-timer-bar');
    if (bar) bar.classList.remove('hidden');

    state.timer.interval = setInterval(() => {
      if (!state.timer.running) return;
      state.timer.secondsRemaining--;
      updateTimerDisplay();
      if (state.timer.secondsRemaining <= 0) {
        clearInterval(state.timer.interval);
        state.timer.running = false;
        showNotification(`Timer Done: ${state.timer.title}! 🔔`, 'success');
      }
    }, 1000);

    updateTimerDisplay();
    showNotification(`Timer started: ${minutes}m for ${title}`, 'info');
  }

  function updateTimerDisplay() {
    const digits = document.getElementById('floating-timer-digits');
    if (!digits) return;
    const m = Math.floor(state.timer.secondsRemaining / 60);
    const s = state.timer.secondsRemaining % 60;
    digits.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function pauseResumeTimer() {
    state.timer.running = !state.timer.running;
    const btn = document.getElementById('floating-timer-pause-btn');
    if (btn) {
      btn.innerHTML = state.timer.running ? `<i data-lucide="pause" class="w-3.5 h-3.5"></i>` : `<i data-lucide="play" class="w-3.5 h-3.5"></i>`;
      if (window.lucide) lucide.createIcons();
    }
  }

  function cancelCookingTimer() {
    if (state.timer.interval) clearInterval(state.timer.interval);
    state.timer.running = false;
    const bar = document.getElementById('floating-timer-bar');
    if (bar) bar.classList.add('hidden');
  }

  function openSearchModal() {
    document.getElementById('search-modal').classList.remove('hidden');
    document.getElementById('global-search-input').focus();
    renderSearchResults('');
  }

  function closeSearchModal() {
    document.getElementById('search-modal').classList.add('hidden');
  }

  function handleSearchType(q) {
    renderSearchResults(q);
  }

  function setSearchQuery(q) {
    state.searchQuery = q;
    closeSearchModal();
    navigateTo('explore');
  }

  function renderSearchResults(q) {
    const list = document.getElementById('search-modal-results');
    if (!list) return;

    let recipes = getAllRecipes();
    if (q.trim()) {
      const query = q.toLowerCase();
      recipes = recipes.filter(r => 
        r.title.toLowerCase().includes(query) || 
        r.cuisine.toLowerCase().includes(query) ||
        r.category.toLowerCase().includes(query) ||
        r.ingredients.some(i => i.item.toLowerCase().includes(query))
      );
    }

    if (!recipes.length) {
      list.innerHTML = `<div class="p-4 text-center text-xs text-ink-400">No dishes found.</div>`;
      return;
    }

    list.innerHTML = recipes.slice(0, 5).map(r => `
      <div 
        onclick="TastyApp.navigateTo('recipe-detail', { recipeId: '${r.id}' }); TastyApp.closeSearchModal();"
        class="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-50 cursor-pointer transition-colors"
      >
        <img src="${r.image}" alt="${r.title}" class="w-10 h-10 rounded-lg object-cover" />
        <div class="flex-1 min-w-0">
          <p class="text-xs font-bold text-ink-900 truncate">${r.title}</p>
          <p class="text-[10px] text-ink-400">${r.cuisine} · ${r.prepTime + r.cookTime}m</p>
        </div>
      </div>
    `).join('');
  }

  function addIngredientRow() {
    const list = document.getElementById('form-ingredients-list');
    const row = document.createElement('div');
    row.className = 'ingredient-row grid grid-cols-12 gap-2 items-center';
    row.innerHTML = `
      <input type="text" placeholder="Ingredient name" required class="col-span-5 px-3 py-2 rounded-xl border border-stone-200 text-xs" />
      <input type="number" step="any" placeholder="Qty" value="1" required class="col-span-2 px-3 py-2 rounded-xl border border-stone-200 text-xs" />
      <input type="text" placeholder="Unit" value="tbsp" class="col-span-2 px-3 py-2 rounded-xl border border-stone-200 text-xs" />
      <select class="col-span-2 px-2 py-2 rounded-xl border border-stone-200 text-xs">
        <option value="Produce">Produce</option>
        <option value="Dairy">Dairy</option>
        <option value="Meat">Meat</option>
        <option value="Pantry">Pantry</option>
        <option value="Spices">Spices</option>
      </select>
      <button type="button" onclick="this.parentElement.remove()" class="col-span-1 text-ink-300 hover:text-rose-600">×</button>
    `;
    list.appendChild(row);
  }

  function addInstructionStepRow() {
    const list = document.getElementById('form-instructions-list');
    const stepCount = list.children.length + 1;
    const row = document.createElement('div');
    row.className = 'instruction-row p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-2';
    row.innerHTML = `
      <div class="flex items-center gap-2">
        <input type="text" placeholder="Step ${stepCount} Title" required class="flex-1 px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-bold" />
        <input type="number" placeholder="Timer (mins)" min="0" class="w-24 px-2 py-1.5 rounded-lg border border-stone-200 text-xs" />
      </div>
      <textarea rows="2" placeholder="Describe instructions..." required class="w-full px-3 py-1.5 rounded-lg border border-stone-200 text-xs"></textarea>
    `;
    list.appendChild(row);
  }

  function handleRecipeFormSubmit(e) {
    e.preventDefault();

    const title = document.getElementById('recipe-title').value.trim();
    const desc = document.getElementById('recipe-desc').value.trim();
    const image = document.getElementById('recipe-image-url').value.trim();
    const category = document.getElementById('recipe-category').value;
    const cuisine = document.getElementById('recipe-cuisine').value.trim();
    const prepTime = parseInt(document.getElementById('recipe-preptime').value, 10);
    const cookTime = parseInt(document.getElementById('recipe-cooktime').value, 10);
    const servings = parseInt(document.getElementById('recipe-servings').value, 10);
    const calories = parseInt(document.getElementById('recipe-calories').value, 10);
    const difficulty = document.getElementById('recipe-difficulty').value;
    const isVeg = document.getElementById('recipe-is-veg').checked;
    const isVegan = document.getElementById('recipe-is-vegan').checked;
    const isGf = document.getElementById('recipe-is-gf').checked;

    const ingredientRows = document.querySelectorAll('.ingredient-row');
    const ingredients = [];
    ingredientRows.forEach(row => {
      const inputs = row.querySelectorAll('input');
      const select = row.querySelector('select');
      ingredients.push({
        item: inputs[0].value,
        amount: parseFloat(inputs[1].value) || 1,
        unit: inputs[2].value,
        aisle: select.value
      });
    });

    const stepRows = document.querySelectorAll('.instruction-row');
    const instructions = [];
    stepRows.forEach((row, idx) => {
      const titleInput = row.querySelector('input[type="text"]');
      const timerInput = row.querySelector('input[type="number"]');
      const textInput = row.querySelector('textarea');
      instructions.push({
        step: idx + 1,
        title: titleInput.value,
        text: textInput.value,
        timerMinutes: parseInt(timerInput.value, 10) || 0,
        tip: 'Check doneness before serving.'
      });
    });

    const newRecipe = {
      id: 'custom-' + Date.now(),
      title,
      description: desc,
      cuisine,
      category,
      prepTime,
      cookTime,
      servings,
      calories,
      difficulty,
      isVegetarian: isVeg,
      isVegan,
      isGlutenFree: isGf,
      rating: 5.0,
      reviewsCount: 1,
      author: { name: state.user.name, avatar: state.user.avatar, title: state.user.title },
      image,
      featured: true,
      trending: false,
      seasonal: false,
      tags: [cuisine, category],
      ingredients,
      instructions,
      nutrition: { calories, protein: 30, carbs: 45, fat: 15, fiber: 4 },
      chefTips: ["Always taste right before plating."]
    };

    state.customRecipes.unshift(newRecipe);
    localStorage.setItem('tastynest_custom_recipes', JSON.stringify(state.customRecipes));
    if (typeof TastyFirebase !== 'undefined') TastyFirebase.saveRecipeToFirestore(newRecipe);

    showNotification('Recipe published to TastyNest & Synced to Cloud!', 'success');
    navigateTo('recipe-detail', { recipeId: newRecipe.id });
    if (window.confetti) confetti();
  }

  function useRandomPhoto() {
    const photos = [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1200&q=80"
    ];
    const pick = photos[Math.floor(Math.random() * photos.length)];
    document.getElementById('recipe-image-url').value = pick;
    document.getElementById('image-preview').src = pick;
  }

  function openAuthModal() {
    showNotification('All culinary studio features are unlocked!', 'info');
  }

  function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.add('hidden');
  }

  function switchAuthTab() {}

  // Profile & Cloud Management
  function saveProfileSettings(e) {
    if (e) e.preventDefault();
    const name = document.getElementById('profile-edit-name').value.trim();
    const title = document.getElementById('profile-edit-title').value.trim();
    const bio = document.getElementById('profile-edit-bio').value.trim();
    const avatar = document.getElementById('profile-edit-avatar').value.trim();

    if (name) state.user.name = name;
    if (title) state.user.title = title;
    if (bio) state.user.bio = bio;
    if (avatar) state.user.avatar = avatar;

    localStorage.setItem('tastynest_user', JSON.stringify(state.user));
    if (typeof TastyFirebase !== 'undefined' && TastyFirebase.isReady()) {
      TastyFirebase.saveUserProfileToCloud(state.user);
    }
    updateNavUI();
    renderView();
    showNotification('Chef Profile updated and saved!', 'success');
    if (window.confetti) {
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
    }
  }

  function pickProfileAvatar(url) {
    state.user.avatar = url;
    const input = document.getElementById('profile-edit-avatar');
    const display = document.getElementById('profile-avatar-display');
    if (input) input.value = url;
    if (display) display.src = url;
    localStorage.setItem('tastynest_user', JSON.stringify(state.user));
    if (typeof TastyFirebase !== 'undefined' && TastyFirebase.isReady()) {
      TastyFirebase.saveUserProfileToCloud(state.user);
    }
    updateNavUI();
    showNotification('Avatar selected!', 'info');
  }

  function saveDietaryPreferences() {
    const checkboxes = document.querySelectorAll('input[name="dietary-pref"]:checked');
    const selected = Array.from(checkboxes).map(cb => cb.value);
    state.user.dietaryPreferences = selected;
    localStorage.setItem('tastynest_user', JSON.stringify(state.user));
    if (typeof TastyFirebase !== 'undefined' && TastyFirebase.isReady()) {
      TastyFirebase.saveUserProfileToCloud(state.user);
    }
    showNotification(`Preferences updated: ${selected.length} active filters`, 'success');
  }

  async function triggerCloudSync() {
    showNotification('Syncing culinary data to Firebase Cloud...', 'info');
    try {
      if (typeof TastyFirebase !== 'undefined') {
        await TastyFirebase.saveFavoritesToCloud(state.favorites);
        await TastyFirebase.saveShoppingListToCloud(state.shoppingList);
        await TastyFirebase.saveMealPlanToCloud(state.mealPlan);
        if (typeof TastyFirebase.saveUserProfileToCloud === 'function') {
          await TastyFirebase.saveUserProfileToCloud(state.user);
        }
        showNotification('☁️ Everything synced to Firestore successfully!', 'success');
        if (window.confetti) confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      } else {
        showNotification('Local storage cache updated.', 'info');
      }
    } catch (err) {
      console.error(err);
      showNotification('Cloud sync error: ' + (err.message || 'Check connection'), 'error');
    }
  }

  function exportCulinaryBackup() {
    const backupData = {
      app: "TastyNest Gourmet Studio",
      exportedAt: new Date().toISOString(),
      user: state.user,
      favorites: state.favorites,
      mealPlan: state.mealPlan,
      shoppingList: state.shoppingList,
      customRecipes: state.customRecipes
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tastynest-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('JSON Backup downloaded!', 'success');
  }

  function exportShoppingListText() {
    const unchecked = state.shoppingList.filter(i => !i.checked);
    if (unchecked.length === 0) {
      showNotification('No active items in grocery list.', 'info');
      return;
    }

    let text = `🛒 TASTYNEST GROCERY CHECKLIST\nGenerated: ${new Date().toLocaleDateString()}\n-------------------------------\n\n`;
    const grouped = {};
    unchecked.forEach(i => {
      const aisle = i.aisle || 'General';
      if (!grouped[aisle]) grouped[aisle] = [];
      grouped[aisle].push(i);
    });

    Object.keys(grouped).forEach(aisle => {
      text += `[ ${aisle.toUpperCase()} ]\n`;
      grouped[aisle].forEach(item => {
        text += ` [ ] ${item.item} (${item.amount || 'as needed'})\n`;
      });
      text += '\n';
    });

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tastynest-groceries-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Grocery checklist exported!', 'success');
  }

  function showCloudSyncInfo() {
    const isOnline = typeof TastyFirebase !== 'undefined' && TastyFirebase.isReady();
    const user = typeof TastyFirebase !== 'undefined' ? TastyFirebase.getUser() : null;

    alert(`🔥 Firebase Cloud Studio Status:\n\n• Project: vibecart-146fe\n• Status: ${isOnline ? 'Online & Synced (Firestore)' : 'Offline / Local Mode'}\n• Active User: ${user ? (user.displayName || user.email) : 'Local Guest'}\n• Cloud Documents: ${state.favorites.length} Saved, ${state.shoppingList.length} Groceries\n• Real-Time Cloud Firestore: READY`);
  }

  async function handleAuthSubmit(e) {
    if (e) e.preventDefault();
  }

  async function handleSocialLogin() {}

  async function handleQuickDemoLogin() {}

  async function handlePasswordReset() {}

  async function handleAuthSignOut() {
    showNotification('All features remain open and accessible.', 'info');
  }

  function toggleUserMenu() {
    const m = document.getElementById('user-menu-dropdown');
    if (m) m.classList.toggle('hidden');
  }

  function closeUserMenu() {
    const m = document.getElementById('user-menu-dropdown');
    if (m) m.classList.add('hidden');
  }

  function toggleMobileDrawer() {
    const d = document.getElementById('mobile-drawer');
    if (d) d.classList.toggle('-translate-x-full');
  }

  function shareRecipe(title) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showNotification(`Link for "${title}" copied!`, 'info');
    }
  }

  function handleNewsletter(e) {
    e.preventDefault();
    showNotification('Subscribed to Sunday Dispatch!', 'success');
    e.target.reset();
  }

  function showNotification(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const isSuccess = type === 'success';
    toast.className = `toast-enter p-3 px-4 rounded-2xl shadow-clean-lg border flex items-center justify-between gap-3 text-xs font-semibold pointer-events-auto ${
      isSuccess ? 'bg-ink-900 text-white border-ink-800' : 'bg-white text-ink-900 border-stone-200'
    }`;

    toast.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="${isSuccess ? 'text-emerald-400' : 'text-citrus-500'}">●</span>
        <span>${msg}</span>
      </div>
      <button onclick="this.parentElement.remove()" class="text-ink-400 hover:text-white p-1">×</button>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3500);
  }


  // ==========================================
  // VIEW: CULINARY ADMIN STUDIO & CATALOG CONTROL
  // ==========================================
  function renderAdminView() {
    const allRecipes = getAllRecipes();
    const customCount = (state.customRecipes || []).length;
    const favCount = (state.favorites || []).length;
    const activePlanMeals = Object.values(state.mealPlan || {}).reduce((acc, day) => {
      return acc + Object.values(day).filter(Boolean).length;
    }, 0);

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <!-- Admin Header Banner -->
        <div class="rounded-3xl bg-gradient-to-r from-amber-950 via-[#181612] to-black border border-amber-500/30 p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-clean-xl">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
              <i data-lucide="shield-check" class="w-3.5 h-3.5 text-amber-400"></i>
              <span>Executive Master Chef · Culinary Admin Studio</span>
            </div>
            <h1 class="font-editorial text-3xl sm:text-5xl font-semibold text-white tracking-tight">
              Studio Governance & Catalog Control
            </h1>
            <p class="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              Manage live recipes, monitor video streams, inspect user meal planning activity, and toggle featured masterclasses.
            </p>
          </div>

          <div class="flex items-center gap-3 shrink-0">
            <button onclick="TastyApp.navigateTo('add-recipe')" class="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2">
              <i data-lucide="plus" class="w-4 h-4"></i>
              <span>Create New Recipe</span>
            </button>
            <button onclick="TastyApp.openApiKeyModal()" class="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-semibold border border-white/15 transition-all flex items-center gap-1.5">
              <i data-lucide="key" class="w-3.5 h-3.5 text-amber-400"></i>
              <span>YouTube API Key</span>
            </button>
          </div>
        </div>

        <!-- KPI Metric Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="p-5 rounded-2xl bg-white dark:bg-[#141816] border border-stone-200/80 dark:border-white/10 shadow-clean-xs">
            <p class="text-[11px] uppercase tracking-wider font-bold text-ink-400 dark:text-zinc-500">Total Masterclasses</p>
            <p class="font-editorial text-3xl font-bold text-ink-900 dark:text-white mt-1">${allRecipes.length}</p>
            <p class="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1">20 Video Masterclasses</p>
          </div>
          <div class="p-5 rounded-2xl bg-white dark:bg-[#141816] border border-stone-200/80 dark:border-white/10 shadow-clean-xs">
            <p class="text-[11px] uppercase tracking-wider font-bold text-ink-400 dark:text-zinc-500">Custom User Recipes</p>
            <p class="font-editorial text-3xl font-bold text-ink-900 dark:text-white mt-1">${customCount}</p>
            <p class="text-[10px] text-stone-400 mt-1">In local & cloud storage</p>
          </div>
          <div class="p-5 rounded-2xl bg-white dark:bg-[#141816] border border-stone-200/80 dark:border-white/10 shadow-clean-xs">
            <p class="text-[11px] uppercase tracking-wider font-bold text-ink-400 dark:text-zinc-500">Active Scheduled Meals</p>
            <p class="font-editorial text-3xl font-bold text-ink-900 dark:text-white mt-1">${activePlanMeals}</p>
            <p class="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1">7-Day Kitchen Schedule</p>
          </div>
          <div class="p-5 rounded-2xl bg-white dark:bg-[#141816] border border-stone-200/80 dark:border-white/10 shadow-clean-xs">
            <p class="text-[11px] uppercase tracking-wider font-bold text-ink-400 dark:text-zinc-500">Saved in Vaults</p>
            <p class="font-editorial text-3xl font-bold text-ink-900 dark:text-white mt-1">${favCount}</p>
            <p class="text-[10px] text-citrus-600 dark:text-citrus-400 mt-1">Starred chef favorites</p>
          </div>
        </div>

        <!-- Recipe Catalog Table -->
        <div class="rounded-3xl bg-white dark:bg-[#141816] border border-stone-200/80 dark:border-white/10 shadow-clean-sm overflow-hidden">
          <div class="p-5 sm:p-6 border-b border-stone-100 dark:border-white/10 flex items-center justify-between gap-4">
            <div>
              <h3 class="font-editorial text-xl sm:text-2xl font-semibold text-ink-900 dark:text-white">Recipe Catalog Governance</h3>
              <p class="text-xs text-ink-500 dark:text-zinc-400">View and manage all dishes in the TastyNest database</p>
            </div>
            <span class="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/40">
              Active Mode: Master Chef
            </span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-stone-50 dark:bg-white/5 border-b border-stone-100 dark:border-white/10 text-ink-500 dark:text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th class="p-4 pl-6">Recipe</th>
                  <th class="p-4">Cuisine</th>
                  <th class="p-4">Time & Servings</th>
                  <th class="p-4">Video Feed</th>
                  <th class="p-4">Featured</th>
                  <th class="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-stone-100 dark:divide-white/5">
                ${allRecipes.map(r => `
                  <tr class="hover:bg-stone-50/70 dark:hover:bg-white/[0.02] transition-colors">
                    <td class="p-4 pl-6">
                      <div class="flex items-center gap-3">
                        <img src="${r.image}" alt="${r.title}" class="w-12 h-12 rounded-xl object-cover shrink-0" />
                        <div>
                          <p class="font-bold text-ink-900 dark:text-white">${r.title}</p>
                          <p class="text-[11px] text-ink-400 dark:text-zinc-500">${r.difficulty} · ${r.calories} kcal</p>
                        </div>
                      </div>
                    </td>
                    <td class="p-4 text-ink-700 dark:text-zinc-300 font-medium">${r.cuisine}</td>
                    <td class="p-4 text-ink-600 dark:text-zinc-400">${r.prepTime + r.cookTime} mins · ${r.servings} Servings</td>
                    <td class="p-4">
                      ${r.youtubeId ? `
                        <span class="inline-flex items-center gap-1 text-[11px] text-rose-600 dark:text-rose-400 font-mono font-semibold">
                          <i data-lucide="youtube" class="w-3.5 h-3.5"></i> ${r.youtubeId}
                        </span>
                      ` : `
                        <span class="text-stone-400 text-[11px]">No Video</span>
                      `}
                    </td>
                    <td class="p-4">
                      <button onclick="TastyApp.toggleAdminFeatured('${r.id}')" class="px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${r.featured ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700' : 'bg-stone-100 text-stone-500 dark:bg-white/10 dark:text-zinc-400'}">
                        ${r.featured ? '★ Featured' : '☆ Standard'}
                      </button>
                    </td>
                    <td class="p-4 pr-6 text-right space-x-2">
                      <button onclick="TastyApp.navigateTo('recipe-detail', { recipeId: '${r.id}' })" class="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-white/10 hover:bg-stone-200 dark:hover:bg-white/20 text-ink-800 dark:text-white font-semibold">
                        Preview
                      </button>
                      ${r.isCustom ? `
                        <button onclick="TastyApp.deleteCustomRecipe('${r.id}')" class="px-2 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 text-rose-600 dark:text-rose-400 font-semibold">
                          Delete
                        </button>
                      ` : ''}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;
  }

  function renderAdminDeniedView() {
    return `
      <div class="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div class="w-16 h-16 rounded-3xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto border border-amber-200 dark:border-amber-800/40 shadow-clean-sm">
          <i data-lucide="shield-alert" class="w-8 h-8"></i>
        </div>
        <div class="space-y-2">
          <h2 class="font-editorial text-3xl sm:text-4xl font-semibold text-ink-900 dark:text-white">
            Access Restricted
          </h2>
          <p class="text-xs sm:text-sm text-ink-500 dark:text-zinc-400 leading-relaxed">
            The Culinary Admin Studio is reserved for Master Chef administrators.
          </p>
        </div>
        <div class="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onclick="TastyApp.navigateTo('admin')" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2">
            <i data-lucide="crown" class="w-4 h-4"></i>
            <span>Enter as Master Chef</span>
          </button>
          <button onclick="TastyApp.navigateTo('explore')" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-stone-100 dark:bg-white/10 hover:bg-stone-200 text-ink-800 dark:text-zinc-200 text-xs font-semibold transition-all">
            Browse All Recipes
          </button>
        </div>
      </div>
    `;
  }

  function toggleAdminFeatured(recipeId) {
    const r = getAllRecipes().find(x => x.id === recipeId);
    if (r) {
      r.featured = !r.featured;
      showNotification(`Updated "${r.title}" to ${r.featured ? 'Featured' : 'Standard'}!`, 'success');
      renderView();
    }
  }

  function deleteCustomRecipe(recipeId) {
    if (confirm("Are you sure you want to delete this custom recipe?")) {
      state.customRecipes = (state.customRecipes || []).filter(r => r.id !== recipeId);
      localStorage.setItem('tastynest_custom_recipes', JSON.stringify(state.customRecipes));
      showNotification('Custom recipe deleted.', 'info');
      renderView();
    }
  }

  function setupShortcuts() {
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearchModal();
      }
      if (e.key === 'Escape') {
        closeSearchModal();
        closeAuthModal();
        closeMealPlanModal();
        closeVideoModal();
        closeUserMenu();
      }
    });

    document.addEventListener('click', (e) => {
      const userBtn = document.getElementById('user-header-profile');
      if (userBtn && !userBtn.contains(e.target)) {
        closeUserMenu();
      }
    });
  }

  return {
    init: () => {
      initTheme();
      setupShortcuts();

      // Hook up Firebase Cloud Real-time Listener
      if (typeof TastyFirebase !== 'undefined') {
        TastyFirebase.addSyncListener((event, data) => {
          if (event === 'auth_changed' && data) {
            state.user.name = data.displayName || data.email.split('@')[0];
            state.user.email = data.email;
            if (data.photoURL) state.user.avatar = data.photoURL;
            localStorage.setItem('tastynest_user', JSON.stringify(state.user));
            updateNavUI();
          } else if (event === 'favorites_loaded' && Array.isArray(data)) {
            state.favorites = data;
            localStorage.setItem('tastynest_favorites', JSON.stringify(data));
            updateNavUI();
            if (state.currentView === 'favorites') renderView();
          } else if (event === 'shopping_loaded' && Array.isArray(data)) {
            state.shoppingList = data;
            localStorage.setItem('tastynest_shopping_list', JSON.stringify(data));
            updateNavUI();
            if (state.currentView === 'shopping') renderView();
          } else if (event === 'mealplan_loaded' && typeof data === 'object') {
            state.mealPlan = data;
            localStorage.setItem('tastynest_meal_plan', JSON.stringify(data));
            if (state.currentView === 'planner') renderView();
          }
        });
      }

      window.addEventListener('hashchange', handleRouteFromHash);
      handleRouteFromHash();
    },
    toggleTheme,
    applyTheme,
    openVideoModal,
    closeVideoModal,
    switchVideoMode,
    setVideoSpeed,
    jumpVideoTo,
    jumpInlineVideo,
    playYouTubeInModal,
    searchYouTube,
    openApiKeyModal,
    toggleAdminFeatured,
    deleteCustomRecipe,
    toggleVideoOnlyFilter,
    navigateTo,
    renderView,
    toggleFavorite,
    setFilter,
    resetFilters,
    quickFilterTag,
    handleHeroSearch,
    changeServings,
    toggleStepDone,
    resetStepProgress,
    finishRecipeCooking,
    addAllToShoppingList,
    handleAddShoppingItem,
    toggleShoppingItem,
    deleteShoppingItem,
    clearCheckedShopping,
    consolidateShoppingList,
    clearAllShopping,
    openMealPlanModal,
    openMealPlanModalForSlot,
    closeMealPlanModal,
    openSlotDishPicker,
    closeSlotDishPicker,
    handleSlotPickerSearch,
    selectSlotPickerCategory,
    confirmSlotDishSelection,
    setPlannerActiveDay,
    autoBalanceMealPlan,
    shuffleMealPlan,
    shuffleDayPlan,
    clearDayPlan,
    selectPlanDay,
    selectPlanSlot,
    confirmAddToPlan,
    removeMealFromPlan,
    clearMealPlan,
    generateShoppingListFromMealPlan,
    startCookingTimer,
    pauseResumeTimer,
    cancelCookingTimer,
    openSearchModal,
    closeSearchModal,
    handleSearchType,
    setSearchQuery,
    addIngredientRow,
    addInstructionStepRow,
    handleRecipeFormSubmit,
    useRandomPhoto,
    openAuthModal,
    closeAuthModal,
    switchAuthTab,
    handleAuthSubmit,
    handleSocialLogin,
    handleQuickDemoLogin,
    handlePasswordReset,
    handleAuthSignOut,
    saveProfileSettings,
    pickProfileAvatar,
    saveDietaryPreferences,
    triggerCloudSync,
    exportCulinaryBackup,
    exportShoppingListText,
    showCloudSyncInfo,
    toggleUserMenu,
    closeUserMenu,
    toggleMobileDrawer,
    shareRecipe,
    handleNewsletter,
    showNotification
  };
})();
