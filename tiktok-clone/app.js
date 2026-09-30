const videosData = [
  {
    id: 1,
    username: "anya.codes",
    displayName: "Anya",
    avatar: "https://i.pravatar.cc/100?img=5",
    verified: true,
    caption: "Когда наконец запушила фикс в прод без багов 😅 #coding #programming #developer #рекомендации",
    song: "original sound - anya.codes",
    likes: "128.4K",
    likesRaw: 128400,
    comments: 3421,
    shares: "12.3K",
    bookmarks: "8.9K",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    following: false,
    liked: false,
    isFollowingTab: false,
    tags: ["coding","developer"]
  },
  {
    id: 2,
    username: "travel.vibes",
    displayName: "Leo Travel",
    avatar: "https://i.pravatar.cc/100?img=8",
    verified: true,
    caption: "Закат на Бали 🌅 Это место силы. Кто был? #travel #bali #sunset #путешествия",
    song: "Sunset Dreams - Chill Vibes",
    likes: "892.1K",
    likesRaw: 892100,
    comments: 12453,
    shares: "45K",
    bookmarks: "102K",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    following: true,
    liked: true,
    isFollowingTab: true,
    tags: ["travel","bali"]
  },
  {
    id: 3,
    username: "dance_crew_msk",
    displayName: "DANCE CREW",
    avatar: "https://i.pravatar.cc/100?img=32",
    verified: false,
    caption: "Новый челлендж 🔥 Повторишь? Отмечай нас! #dancechallenge #танцы #челлендж #fyp",
    song: "Dance Monkey - Tones and I",
    likes: "2.3M",
    likesRaw: 2300000,
    comments: 45210,
    shares: "312K",
    bookmarks: "540K",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    following: false,
    liked: false,
    isFollowingTab: false,
    tags: ["dance","fyp"]
  },
  {
    id: 4,
    username: "foodie.katya",
    displayName: "Катя • Еда",
    avatar: "https://i.pravatar.cc/100?img=9",
    verified: false,
    caption: "Паста за 15 минут 🍝 Рецепт в комментах! Сохрани чтобы не потерять #еда #рецепт #паста #foodtok",
    song: "Cooking Time - LoFi",
    likes: "445K",
    likesRaw: 445000,
    comments: 8923,
    shares: "67K",
    bookmarks: "201K",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    following: true,
    liked: false,
    isFollowingTab: true,
    tags: ["food","recipe"]
  },
  {
    id: 5,
    username: "memes.daily",
    displayName: "Мемы",
    avatar: "https://i.pravatar.cc/100?img=15",
    verified: false,
    caption: "Когда дедлайн вчера, а ты только начал 😭😂 #мемы #юмор #работа #программирование",
    song: "original sound - memes.daily",
    likes: "1.1M",
    likesRaw: 1100000,
    comments: 23412,
    shares: "89K",
    bookmarks: "34K",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    following: false,
    liked: false,
    isFollowingTab: false,
    tags: ["memes","funny"]
  },
  {
    id: 6,
    username: "fitness.pro",
    displayName: "Alex Fit",
    avatar: "https://i.pravatar.cc/100?img=20",
    verified: true,
    caption: "3 упражнения для пресса дома. Без оборудования! День 12/30 #фитнес #пресс #тренировка #sport",
    song: "Workout Motivation - Gym Mix",
    likes: "623K",
    likesRaw: 623000,
    comments: 11234,
    shares: "98K",
    bookmarks: "312K",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    following: false,
    liked: false,
    isFollowingTab: false,
    tags: ["fitness","workout"]
  },
  {
    id: 7,
    username: "art.by.masha",
    displayName: "Маша рисует",
    avatar: "https://i.pravatar.cc/100?img=26",
    verified: false,
    caption: "Рисую портрет за 60 секунд ⏱️ Как вам результат? #art #drawing #арт #творчество",
    song: "Art Inspiration - Piano",
    likes: "334K",
    likesRaw: 334000,
    comments: 5432,
    shares: "12K",
    bookmarks: "87K",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    following: true,
    liked: true,
    isFollowingTab: true,
    tags: ["art","drawing"]
  },
  {
    id: 8,
    username: "tech.tok",
    displayName: "Техно Ток",
    avatar: "https://i.pravatar.cc/100?img=33",
    verified: true,
    caption: "iPhone 16 Pro Max - честный обзор спустя месяц использования. Стоит ли брать? #технологии #iphone #обзор #apple",
    song: "Tech Review - original sound",
    likes: "756K",
    likesRaw: 756000,
    comments: 34211,
    shares: "23K",
    bookmarks: "45K",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    following: false,
    liked: false,
    isFollowingTab: false,
    tags: ["tech","iphone"]
  }
];

const commentsMock = {
  1: [
    {user:"code_ninja", avatar:"https://i.pravatar.cc/100?img=11", text:"АХАХАХ жиза 😂", likes:234, time:"2ч"},
    {user:"junior_dev", avatar:"https://i.pravatar.cc/100?img=13", text:"У меня так каждый релиз", likes:89, time:"1ч"},
    {user:"anya.codes", avatar:"https://i.pravatar.cc/100?img=5", text:"Спасибо всем за поддержку ❤️", likes:120, time:"30м", author:true},
  ],
  2: [
    {user:"wanderlust", avatar:"https://i.pravatar.cc/100?img=14", text:"Бали - мечта!", likes:543, time:"5ч"},
    {user:"sunset_lover", avatar:"https://i.pravatar.cc/100?img=16", text:"Какой отель?", likes:12, time:"3ч"},
  ],
  3: [
    {user:"dancer01", avatar:"https://i.pravatar.cc/100?img=18", text:"🔥🔥🔥 огонь!", likes:1203, time:"1ч"},
  ],
  4: [
    {user:"hungry", avatar:"https://i.pravatar.cc/100?img=19", text:"Сохранил, завтра приготовлю", likes:45, time:"2ч"},
  ]
};

const trending = [
  {tag:"#рекомендации", views:"12.4B"},
  {tag:"#танцы", views:"8.2B"},
  {tag:"#юмор", views:"6.1B"},
  {tag:"#еда", views:"4.3B"},
  {tag:"#путешествия", views:"3.9B"},
  {tag:"#обучение", views:"2.7B"},
];

let currentTab = 'foryou';
let currentVideoId = null;
let isMutedGlobal = true;
let activeVideoEl = null;
let userVideos = [];
let searchQuery = '';

const feedContainer = document.getElementById('feedContainer');
const followingAvatars = document.getElementById('followingAvatars');
const trendingList = document.getElementById('trendingList');
const toastEl = document.getElementById('toast');

function showToast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  setTimeout(()=>toastEl.classList.remove('show'), 2500);
}

function formatNumber(n){
  if(n>=1000000) return (n/1000000).toFixed(1)+'M';
  if(n>=1000) return (n/1000).toFixed(1)+'K';
  return n.toString();
}

function getAllVideos(){
  return [...userVideos, ...videosData];
}

function getFilteredVideos(){
  let vids = getAllVideos();
  if(currentTab==='following'){
    vids = vids.filter(v=>v.following);
  }
  if(searchQuery){
    const q = searchQuery.toLowerCase();
    vids = vids.filter(v=>
      v.caption.toLowerCase().includes(q) ||
      v.username.toLowerCase().includes(q) ||
      v.tags.some(t=>t.toLowerCase().includes(q))
    );
  }
  return vids;
}

function renderFollowing(){
  followingAvatars.innerHTML = getAllVideos().filter(v=>v.following).slice(0,6).map(v=>`
    <div class="follow-item" data-user="${v.username}">
      <img src="${v.avatar}" />
      <div>
        <div class="follow-name">${v.displayName}</div>
        <div class="follow-handle">@${v.username}</div>
      </div>
      <span style="margin-left:auto;width:8px;height:8px;background:#25F4EE;border-radius:50%;display:inline-block"></span>
    </div>
  `).join('');
}

function renderTrending(){
  trendingList.innerHTML = trending.map(t=>`
    <div class="trend-item">
      <div>
        <b>${t.tag}</b><br/>
        <span>${t.views} просмотров</span>
      </div>
      <span style="margin-left:auto">↗</span>
    </div>
  `).join('');
}

function createVideoElement(video){
  const div = document.createElement('div');
  div.className = 'video-item';
  div.dataset.id = video.id;
  div.innerHTML = `
    <div class="video-wrapper" data-id="${video.id}">
      <video loop playsinline ${isMutedGlobal?'muted':''} poster="" preload="metadata" src="${video.src}"></video>
      <div class="video-controls">
        <div class="play-indicator">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
      </div>
      <div class="video-overlay">
        <div class="video-info">
          <div class="video-author">
            <span>@${video.username}</span>
            ${video.verified?'<span class="check">✓</span>':''}
          </div>
          <div class="video-caption">${linkify(video.caption)}</div>
          <div class="video-music">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
            <div style="overflow:hidden;flex:1"><span class="marquee">${video.song}</span></div>
          </div>
        </div>
      </div>
      <div class="progress-wrap"><div class="progress-bar"></div></div>
      <button class="mute-btn" data-mute="${video.id}">
        ${isMutedGlobal?`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.08"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`}
      </button>
    </div>
    <div class="action-bar">
      <div class="action-avatar" data-follow="${video.id}">
        <img src="${video.avatar}" alt="${video.username}" />
        <div class="follow-plus ${video.following?'following':''}">${video.following?'✓':'+'}</div>
      </div>
      <div class="action-btn ${video.liked?'liked':''}" data-like="${video.id}">
        <div class="icon-circle">
          <svg viewBox="0 0 24 24" fill="${video.liked?'currentColor':'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </div>
        <span class="action-count">${video.likes}</span>
      </div>
      <div class="action-btn" data-comment="${video.id}">
        <div class="icon-circle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        </div>
        <span class="action-count">${formatNumber(video.comments)}</span>
      </div>
      <div class="action-btn" data-bookmark="${video.id}">
        <div class="icon-circle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        </div>
        <span class="action-count">${video.bookmarks}</span>
      </div>
      <div class="action-btn" data-share="${video.id}">
        <div class="icon-circle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        </div>
        <span class="action-count">${video.shares}</span>
      </div>
      <div class="action-avatar" style="margin-top:8px">
        <img src="${video.avatar}" style="width:48px;height:48px;border-radius:12px;animation:spin 4s linear infinite" />
      </div>
    </div>
  `;
  // events
  const wrapper = div.querySelector('.video-wrapper');
  const vid = div.querySelector('video');
  const progress = div.querySelector('.progress-bar');
  
  // progress
  vid.addEventListener('timeupdate', ()=>{
    if(vid.duration){
      progress.style.width = (vid.currentTime/vid.duration*100)+'%';
    }
  });

  // click to play/pause
  wrapper.addEventListener('click', (e)=>{
    if(e.target.closest('.mute-btn') || e.target.closest('.action-bar')) return;
    if(vid.paused){
      vid.play();
      wrapper.classList.remove('paused');
    } else {
      vid.pause();
      wrapper.classList.add('paused');
    }
  });

  // double click like
  let lastTap = 0;
  wrapper.addEventListener('click', (e)=>{
    const now = Date.now();
    if(now-lastTap<300){
      triggerLike(video.id, true);
      showBurst(wrapper);
    }
    lastTap = now;
  });

  // mute
  div.querySelector('[data-mute]').addEventListener('click', (e)=>{
    e.stopPropagation();
    isMutedGlobal = !isMutedGlobal;
    document.querySelectorAll('video').forEach(v=>v.muted=isMutedGlobal);
    updateMuteIcons();
    showToast(isMutedGlobal?'Звук выключен':'Звук включен');
  });

  // actions
  div.querySelector('[data-like]').addEventListener('click', ()=>triggerLike(video.id,false));
  div.querySelector('[data-comment]').addEventListener('click', ()=>openComments(video.id));
  div.querySelector('[data-share]').addEventListener('click', ()=>openShare(video.id));
  div.querySelector('[data-bookmark]').addEventListener('click', (e)=>{
    const btn = e.currentTarget;
    btn.classList.toggle('bookmarked');
    showToast(btn.classList.contains('bookmarked')?'Добавлено в закладки':'Удалено из закладок');
  });
  div.querySelector('[data-follow]').addEventListener('click', ()=>toggleFollow(video.id));
  
  return div;
}

function linkify(text){
  return text.replace(/#(\w+)/g,'<b class="hashtag">#$1</b>').replace(/@(\w+)/g,'<b>@$1</b>');
}

function showBurst(wrapper){
  const burst = document.createElement('div');
  burst.className='like-burst';
  burst.innerHTML='<svg width="100" height="100" viewBox="0 0 24 24" fill="#FE2C55" stroke="#FE2C55"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
  wrapper.appendChild(burst);
  setTimeout(()=>burst.remove(),900);
}

function triggerLike(id, fromDouble){
  const all = getAllVideos();
  const v = all.find(x=>x.id===id);
  if(!v) return;
  v.liked = !v.liked || fromDouble;
  if(v.liked && fromDouble){
    // if already liked and double tap, keep liked
    v.liked = true;
  }
  if(v.liked){
    v.likesRaw = (v.likesRaw||0)+1;
  } else {
    if(!fromDouble) v.likesRaw = Math.max(0,(v.likesRaw||1)-1);
  }
  v.likes = formatNumber(v.likesRaw);
  renderFeed(true);
  if(fromDouble){
    showToast('Лайк! ❤️');
  }
}

function toggleFollow(id){
  const v = getAllVideos().find(x=>x.id===id);
  if(!v) return;
  v.following = !v.following;
  // propagate to same user
  getAllVideos().forEach(vv=>{
    if(vv.username===v.username) vv.following=v.following;
  });
  renderFeed(true);
  renderFollowing();
  showToast(v.following?`Вы подписались на @${v.username}`:`Отписка от @${v.username}`);
}

function updateMuteIcons(){
  document.querySelectorAll('[data-mute]').forEach(btn=>{
    btn.innerHTML = isMutedGlobal?`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.08"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;
  });
}

function renderFeed(keepScroll=false){
  const prevScroll = feedContainer.scrollTop;
  const prevActiveId = activeVideoEl?.closest('.video-item')?.dataset?.id;
  feedContainer.innerHTML='';
  const vids = getFilteredVideos();
  if(vids.length===0){
    feedContainer.innerHTML=`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:var(--text2);gap:12px"><div style="font-size:48px">🔍</div><h3>Ничего не найдено</h3><p>Попробуй другой запрос</p></div>`;
    return;
  }
  vids.forEach(v=>{
    feedContainer.appendChild(createVideoElement(v));
  });
  setupObserver();
  if(keepScroll){
    feedContainer.scrollTop = prevScroll;
    // re-find active
    if(prevActiveId){
      const el = feedContainer.querySelector(`.video-item[data-id="${prevActiveId}"] video`);
      if(el){ activeVideoEl=el; }
    }
  } else {
    feedContainer.scrollTop = 0;
  }
  // autoplay first
  setTimeout(()=>{
    const first = feedContainer.querySelector('.video-item video');
    if(first){
      playVideo(first);
    }
  },100);
  renderProfileGrid();
}

let observer = null;
function setupObserver(){
  if(observer) observer.disconnect();
  observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      const video = entry.target.querySelector('video');
      if(!video) return;
      if(entry.isIntersecting && entry.intersectionRatio>0.7){
        playVideo(video);
      } else {
        video.pause();
      }
    });
  },{threshold:[0,0.5,0.7,1], root:feedContainer});
  document.querySelectorAll('.video-item').forEach(el=>observer.observe(el));
}

function playVideo(videoEl){
  if(activeVideoEl && activeVideoEl!==videoEl){
    activeVideoEl.pause();
    activeVideoEl.closest('.video-wrapper')?.classList.add('paused');
  }
  activeVideoEl = videoEl;
  videoEl.muted = isMutedGlobal;
  videoEl.play().catch(()=>{});
  videoEl.closest('.video-wrapper')?.classList.remove('paused');
  currentVideoId = parseInt(videoEl.closest('.video-item').dataset.id);
}

function scrollToNext(dir){
  const items = [...feedContainer.querySelectorAll('.video-item')];
  if(!items.length) return;
  let idx = items.findIndex(el=>parseInt(el.dataset.id)===currentVideoId);
  if(idx===-1) idx=0;
  else idx+=dir;
  idx = Math.max(0, Math.min(items.length-1, idx));
  items[idx].scrollIntoView({behavior:'smooth'});
}

// Comments
const drawer = document.getElementById('commentsDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const commentsList = document.getElementById('commentsList');
const commentCount = document.getElementById('commentCount');
const commentInput = document.getElementById('commentInput');

function openComments(id){
  currentVideoId = id;
  const v = getAllVideos().find(x=>x.id===id);
  const list = commentsMock[id] || [
    {user:"user123", avatar:`https://i.pravatar.cc/100?img=${Math.floor(Math.random()*60)}`, text:"Вау, это топ! 🔥", likes:12, time:"1ч"},
    {user:"tiktok_fan", avatar:`https://i.pravatar.cc/100?img=${Math.floor(Math.random()*60)}`, text:"Где ты это снимал?", likes:5, time:"45м"},
  ];
  commentCount.textContent = v ? formatNumber(v.comments) : list.length;
  commentsList.innerHTML = list.map(c=>`
    <div class="comment">
      <img src="${c.avatar}" />
      <div class="comment-body">
        <div class="comment-user">${c.user} ${c.author?'<span style="color:var(--pink);font-size:11px;border:1px solid var(--pink);padding:0 4px;border-radius:4px;margin-left:6px">Автор</span>':''}</div>
        <div class="comment-text">${c.text}</div>
        <div class="comment-meta"><span>${c.time}</span><span>${c.likes} лайков</span><span class="comment-like">❤️</span><span>Ответить</span></div>
      </div>
      <div style="margin-left:auto"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div>
    </div>
  `).join('');
  drawer.classList.add('active');
  drawerOverlay.classList.add('active');
  // pause
  if(activeVideoEl) activeVideoEl.pause();
}

function closeComments(){
  drawer.classList.remove('active');
  drawerOverlay.classList.remove('active');
  if(activeVideoEl) activeVideoEl.play().catch(()=>{});
}

document.getElementById('closeDrawer').onclick = closeComments;
drawerOverlay.onclick = closeComments;

document.getElementById('sendComment').onclick = ()=>{
  const text = commentInput.value.trim();
  if(!text) return;
  const newC = document.createElement('div');
  newC.className='comment';
  newC.innerHTML=`<img src="https://i.pravatar.cc/100?img=12" /><div class="comment-body"><div class="comment-user">you</div><div class="comment-text">${text}</div><div class="comment-meta"><span>сейчас</span><span>0 лайков</span></div></div>`;
  commentsList.prepend(newC);
  commentInput.value='';
  const v = getAllVideos().find(x=>x.id===currentVideoId);
  if(v){ v.comments++; }
  renderFeed(true);
};

// Share
const shareModal = document.getElementById('shareModal');
const shareOverlay = document.getElementById('shareOverlay');
function openShare(id){
  currentVideoId=id;
  shareModal.classList.add('active');
  shareOverlay.classList.add('active');
}
function closeShare(){
  shareModal.classList.remove('active');
  shareOverlay.classList.remove('active');
}
document.getElementById('closeShare').onclick=closeShare;
shareOverlay.onclick=closeShare;
shareModal.querySelectorAll('.share-item').forEach(btn=>{
  btn.onclick=()=>{
    showToast('Ссылка скопирована 📋');
    closeShare();
  };
});

// Upload
const uploadModal = document.getElementById('uploadModal');
const uploadOverlay = document.getElementById('uploadOverlay');
const fileInput = document.getElementById('fileInput');
const uploadPreview = document.getElementById('uploadPreview');
const uploadForm = document.getElementById('uploadForm');
let uploadedFileURL = null;

function openUpload(){
  uploadModal.classList.add('active');
  uploadOverlay.classList.add('active');
}
function closeUpload(){
  uploadModal.classList.remove('active');
  uploadOverlay.classList.remove('active');
  uploadPreview.innerHTML='';
  uploadForm.style.display='none';
  uploadedFileURL=null;
}
document.getElementById('uploadBtn').onclick=openUpload;
document.getElementById('uploadBtn2').onclick=openUpload;
document.getElementById('closeUpload').onclick=closeUpload;
uploadOverlay.onclick=closeUpload;
document.getElementById('pickFile').onclick=()=>fileInput.click();

fileInput.onchange = (e)=>{
  const file = e.target.files[0];
  if(!file) return;
  handleFile(file);
};

const uploadArea = document.getElementById('uploadArea');
uploadArea.addEventListener('dragover', e=>{e.preventDefault(); uploadArea.style.background='var(--bg3)'});
uploadArea.addEventListener('dragleave', ()=>{uploadArea.style.background='transparent'});
uploadArea.addEventListener('drop', e=>{
  e.preventDefault();
  uploadArea.style.background='transparent';
  const file = e.dataTransfer.files[0];
  if(file && file.type.startsWith('video/')) handleFile(file);
});

function handleFile(file){
  uploadedFileURL = URL.createObjectURL(file);
  uploadPreview.innerHTML=`<video src="${uploadedFileURL}" controls autoplay muted loop style="max-width:100%"></video><p style="margin-top:8px;font-size:12px;color:var(--text2)">${file.name} • ${(file.size/1024/1024).toFixed(1)} MB</p>`;
  uploadForm.style.display='flex';
}

document.getElementById('publishBtn').onclick=()=>{
  const caption = document.getElementById('upCaption').value || "Мое новое видео 🔥 #fyp #рекомендации";
  const song = document.getElementById('upSong').value || "оригинальный звук - you";
  if(!uploadedFileURL){ showToast('Выбери видео'); return; }
  const newVideo = {
    id: Date.now(),
    username:"you",
    displayName:"Ты",
    avatar:"https://i.pravatar.cc/100?img=12",
    verified:false,
    caption,
    song,
    likes:"0",
    likesRaw:0,
    comments:0,
    shares:"0",
    bookmarks:"0",
    src:uploadedFileURL,
    following:false,
    liked:false,
    isFollowingTab:false,
    tags:["fyp"]
  };
  userVideos.unshift(newVideo);
  closeUpload();
  currentTab='foryou';
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active', t.dataset.tab==='foryou'));
  renderFeed();
  showToast('Видео опубликовано! 🚀');
};

// Profile
const profileModal = document.getElementById('profileModal');
const profileOverlay = document.getElementById('profileOverlay');
function openProfile(){
  profileModal.classList.add('active');
  profileOverlay.classList.add('active');
}
function closeProfile(){
  profileModal.classList.remove('active');
  profileOverlay.classList.remove('active');
}
document.getElementById('profileLink').onclick=(e)=>{e.preventDefault(); openProfile();};
profileOverlay.onclick=closeProfile;
profileModal.querySelector('.btn-outline').onclick=()=>showToast('Редактирование скоро ✨');

function renderProfileGrid(){
  const grid = document.getElementById('profileGrid');
  const all = getAllVideos().filter(v=>v.username==='you');
  if(all.length===0){
    grid.innerHTML = getAllVideos().slice(0,6).map(v=>`
      <div class="grid-item"><video src="${v.src}" muted></video><span>▶ ${v.likes}</span></div>
    `).join('');
  } else {
    grid.innerHTML = all.map(v=>`
      <div class="grid-item"><video src="${v.src}" muted></video><span>▶ ${v.likes}</span></div>
    `).join('');
  }
}

// Tabs
document.querySelectorAll('.tab').forEach(tab=>{
  tab.addEventListener('click', ()=>{
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    currentTab = tab.dataset.tab || 'foryou';
    renderFeed();
  });
});

// Search
document.getElementById('searchInput').addEventListener('input', (e)=>{
  searchQuery = e.target.value;
  renderFeed();
});
document.querySelector('.search-btn').addEventListener('click', ()=>{
  showToast(searchQuery?`Поиск: ${searchQuery}`:'Введи запрос');
});

// Nav arrows
document.getElementById('prevBtn').onclick=()=>scrollToNext(-1);
document.getElementById('nextBtn').onclick=()=>scrollToNext(1);

// Keyboard
document.addEventListener('keydown', (e)=>{
  if(e.target.tagName==='INPUT') return;
  if(e.key==='ArrowDown' || e.key==='j'){ e.preventDefault(); scrollToNext(1); }
  if(e.key==='ArrowUp' || e.key==='k'){ e.preventDefault(); scrollToNext(-1); }
  if(e.key.toLowerCase()==='l'){
    if(currentVideoId) triggerLike(currentVideoId,false);
  }
  if(e.key.toLowerCase()==='m'){
    isMutedGlobal=!isMutedGlobal;
    document.querySelectorAll('video').forEach(v=>v.muted=isMutedGlobal);
    updateMuteIcons();
  }
  if(e.key==='Escape'){
    closeComments(); closeShare(); closeUpload(); closeProfile();
  }
});

// Wheel throttle for feed snap improvement on desktop
let wheelTimeout=null;
feedContainer.addEventListener('wheel', (e)=>{
  // allow native snap but prevent super fast scroll
}, {passive:true});

// Init
renderFollowing();
renderTrending();
renderFeed();

// Add style for spin
const style = document.createElement('style');
style.textContent=`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`;
document.head.appendChild(style);

// Touch swipe for mobile like tiktok
let touchStartY=0;
feedContainer.addEventListener('touchstart', e=>{touchStartY=e.touches[0].clientY}, {passive:true});
feedContainer.addEventListener('touchend', e=>{
  const diff = touchStartY - e.changedTouches[0].clientY;
  if(Math.abs(diff)>50){
    // native snap will handle, but we can update currentVideoId
    setTimeout(()=>{
      const center = feedContainer.scrollTop + feedContainer.clientHeight/2;
      const items = [...feedContainer.querySelectorAll('.video-item')];
      let closest = items[0];
      let minDist = Infinity;
      items.forEach(item=>{
        const dist = Math.abs(item.offsetTop + item.offsetHeight/2 - center);
        if(dist<minDist){minDist=dist;closest=item}
      });
      if(closest) currentVideoId = parseInt(closest.dataset.id);
    },300);
  }
}, {passive:true});
