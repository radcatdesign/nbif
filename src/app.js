(function(){
'use strict';
var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var $ = function(s,root){return (root||document).querySelector(s)};
var $$ = function(s,root){return Array.prototype.slice.call((root||document).querySelectorAll(s))};
var ARROW = $('.btn .arr') ? $('.btn .arr').outerHTML : '';
var ARTLIB = window.__ARTLIB || {};

/* ================= content ================= */
var STORIES = [
  {id:'plates', num:'01', title:'The plates', by:'Brandon Kaufer',
   blurb:'October 2016. Rage instead of sadness, and a stack of cheap plates.',
   deck:'October 2016. Rage instead of sadness, and a stack of cheap plates.',
   cw:'Content note: this story mentions a suicide attempt.',
   art:'peek', thumb:'peek', pArt:'practices', note:'One sentence per plate.', care:true,
   pending:'https://nobiggieimfine.com/',
   pTitle:'The rage plate ritual.', pIntro:'For when the feeling is stuck and too loud to say out loud. Give it somewhere to go.',
   steps:true,
   primary:{title:'Rage plates', text:'Write the sentence you can’t say on a cheap plate. Read it out loud once, then throw it somewhere safe. Sweep up after.'},
   practices:[
     {title:'Get cheap plates', text:'Thrift-store plates or glasses. Never your good dishes.'},
     {title:'Write the sentence', text:'On each plate, write the whole sentence you can’t say out loud.'},
     {title:'Set up safely', text:'Pick a spot where breaking things is safe. Safety glasses and closed-toe shoes on.'},
     {title:'Say it, then throw', text:'Read the sentence out loud once. Then throw the plate.'},
     {title:'One plate, one sentence', text:'Keep going until the stack is gone or you feel calmer.'},
     {title:'Sweep it up', text:'Clean up and toss the pieces. The cleanup is part of it.'}],
   after:'If the rage feels bigger than a stack of plates, pay attention to that, and tell someone you trust.'},
  {id:'weight', num:'02', title:'The weight I carry',
   blurb:'Sometimes it feels heavy. Sometimes it doesn’t. Both are real.',
   deck:'Sometimes it feels heavy. Sometimes it doesn’t. Both are real.',
   art:'featured', thumb:'thumb5', pArt:'practices', note:'Still carrying on.',
   paras:[
    'Some mornings the weight is the first thing I notice. Before coffee, before my phone, it’s already sitting on my chest like it pays rent there.',
    'I used to think the goal was to put it down for good. Fix it, file it, move on. That never really happened.',
    'What happened instead was smaller. I learned which days it gets heavier. Sundays, mostly, and anything involving a dentist. I learned that telling one person makes it lighter by about a third. I learned that “I’m fine” can mean “I’m here,” and that’s allowed.',
    'Sometimes it feels heavy. Sometimes it doesn’t. Both are real, and I’m still carrying on.'],
   pTitle:'Small ways I set it down.', pIntro:'None of these make the weight disappear. They give my shoulders a break for a minute.',
   practices:[
     {icon:'i_mug', title:'Tell one person', text:'Saying it out loud to one person makes it lighter by about a third. Every time.'},
     {icon:'i_nbook', title:'Name the heavy days', text:'Sundays and dentist days get extra care. Knowing they’re coming lets me plan softer.'},
     {icon:'ico_sun', title:'Fresh air', text:'Three slow breaths by an open window before I decide the day is ruined.'}]},
  {id:'wins', num:'03', title:'Small wins',
   blurb:'It’s not about fixing it. It’s about noticing it.',
   deck:'It’s not about fixing it. It’s about noticing it.',
   art:'card1', thumb:'card1', pArt:'walker', note:'One corner counts.',
   paras:[
    'Today I made the bed. Not well. One corner is still doing its own thing. But I made it, and then I stood there for a second and let that count.',
    'For a long time I only counted the big stuff, which meant most days added up to zero. Now I keep a tally on a sticky note by the door. Took a walk. Answered one email. Ate something green on purpose.',
    'None of it fixes anything. It just reminds me that I’m moving, even when it doesn’t feel like it.'],
   pTitle:'Tiny things I count on purpose.', pIntro:'When the big stuff won’t move, I keep score on the small stuff.',
   practices:[
     {icon:'ico_book', title:'The sticky note tally', text:'One sticky note by the door. Every small thing I did today gets a mark.'},
     {icon:'ico_flw', title:'Messy counts', text:'Making the bed badly still counts. The point is one thing done before the day starts.'},
     {icon:'i_boots', title:'One short walk', text:'Around the block or to the mailbox. It goes on the tally either way.'}]},
  {id:'stuck', num:'04', title:'Stuck and still here',
   blurb:'Progress doesn’t always look loud.',
   deck:'It’s not always a dark place. Sometimes it’s just a loop I can’t get out of.',
   art:'stuck_hero', thumb:'thumb1', pArt:'walker',
   paras:[
    'Some days I wake up already tired. Not physically, but mentally. My mind feels like a browser with 50 tabs open, none of them finishing.',
    'I tell myself I’ll get started, but then I’m scrolling. Or overthinking. Or stuck in the same loop. It’s not laziness. It’s like everything feels just a little too heavy, so I avoid it. Then I feel worse for avoiding it.',
    'I still show up. I still do the things I have to do. But there’s this part of me that feels stuck. Like I’m watching myself from a little distance, waiting for the moment I feel like me again.',
    'Even in the stuck moments, there are glimmers. A good song. A text from a friend. The sunlight through the window. Those little things remind me I’m still here, and that matters.'],
   panels:[
     {art:'panel1', note:'Same thoughts. Different day.', x:73, y:6},
     {art:'panel2', note:'So many tabs open. None of them finish.', x:74, y:8},
     {art:'panel3', note:'Still here. That counts for something.', x:63, y:10}],
   pTitle:'Small things that help me get unstuck.', pIntro:'These are a few things that help me when my mind feels heavy or I’m caught in a loop. They don’t fix everything, but they give me a little movement.',
   practices:[
     {icon:'i_boots', title:'Move my body', text:'A short walk, a stretch, or just standing outside helps reset my mind.'},
     {icon:'i_nbook', title:'Brain dump', text:'I write everything that’s in my head. Getting it out helps me breathe a little easier.'},
     {icon:'i_mug', title:'A slower start', text:'Instead of rushing, I give myself 10 quiet minutes. No phone, no pressure, just a slower start.'},
     {icon:'i_mtnsun', title:'Change the scene', text:'Even a new room or a little time outside can help me break the loop.'},
     {icon:'i_phones', title:'Good noise', text:'A playlist, a podcast, or just music that feels good can shift my mood.'},
     {icon:'i_cat', title:'Be kind to myself', text:'I remind myself that feeling stuck doesn’t mean I’m failing. I’m still here, and that’s enough.'}]},
  {id:'lighter', num:'05', title:'A little lighter today',
   blurb:'Some days just feel a little brighter.',
   deck:'Some days just feel a little brighter.',
   art:'card2', thumb:'card2', pArt:'practices', note:'Proof.',
   paras:[
    'Nothing happened today. That’s the whole story.',
    'No breakthrough, no good news, no reason I can point to. I woke up and the air felt thinner in a good way. I sang in the car. I texted my brother back within the hour, which is a personal record.',
    'I’ve stopped interrogating days like this. They don’t need a reason and they don’t need to last. I’m writing this one down so that next time I’m stuck, I have proof that lighter days show up without asking.'],
   pTitle:'How I hold on to the lighter days.', pIntro:'Lighter days don’t need a reason. These help me remember they happen.',
   practices:[
     {icon:'ico_book', title:'Write it down', text:'On a good day I write two lines about it, so future me has proof.'},
     {icon:'i_phones', title:'Save the song', text:'Whatever I sang in the car goes on a playlist called proof.'},
     {icon:'ico_mtn', title:'Take it outside', text:'If the day feels light, I take it for a walk. Even ten minutes.'}]},
  {id:'same', num:'06', title:'Same place. Different me',
   blurb:'Nothing around me changed. Something in me did.',
   deck:'Nothing around me changed. Something in me did.',
   art:'about', thumb:'card4', pArt:'walker', note:'Steadier.',
   paras:[
    'I went back to my old neighborhood last week. Same corner store, same cracked sidewalk, same bench where I used to sit and wonder why everything felt so loud.',
    'I sat on the bench again. It was quieter this time. Not the street. Me.',
    'I don’t know exactly when it changed. There wasn’t one day. It was a lot of small, boring days of doing the next thing, and somewhere in there I got a little steadier.',
    'Same place. Different me. I’ll take it.'],
   pTitle:'What got me a little steadier.', pIntro:'Nothing dramatic. Just things I kept doing until they added up.',
   practices:[
     {icon:'i_mug', title:'A slower start', text:'Ten quiet minutes before I check anything. Coffee, window, nothing else.'},
     {icon:'i_mtnsun', title:'Go back on purpose', text:'When a place holds an old feeling, I visit it and notice what’s different now.'},
     {icon:'i_cat', title:'Be kind to myself', text:'I talk to myself the way I’d talk to a friend sitting on that bench.'}]},
  {id:'weirder', num:'07', title:'It gets weirder (and better)',
   blurb:'A note to myself on the days that feel like too much.',
   deck:'A note to myself on the days that feel like too much.',
   art:'card4', thumb:'card4', pArt:'practices', note:'Your record is perfect.',
   paras:[
    'Dear me, on a bad day.',
    'You’ve had this exact feeling before and you got through it every single time. Your record is perfect.',
    'Things are going to keep getting weirder. You’ll like people you didn’t expect to like. You’ll stop caring about things that used to keep you up at night. You’ll end up wearing a paper crown at a friend’s kitchen table, laughing so hard you can’t breathe.',
    'So drink some water. Step outside for five minutes. Text someone. Then wait for the weird good part. It’s coming.'],
   pTitle:'My bad-day checklist.', pIntro:'The note ends with a short list. It’s short on purpose.',
   practices:[
     {icon:'i_mug', title:'Drink some water', text:'A full glass, all of it. It isn’t a cure. It’s a start.'},
     {icon:'ico_sun', title:'Step outside', text:'Five minutes. The porch counts.'},
     {icon:'ico_flw', title:'Text someone', text:'Not to explain anything. Just “hey.” Let someone know you’re around.'}]}
];
var BY = {}; STORIES.forEach(function(s){ BY[s.id] = s; });

var FOREWORD = [
  'No Biggie, I’m Fine is for people who push it down and power through.',
  'It’s a collection of real stories from people who found their own ways to carry hard things. Each entry pairs one person’s story with the specific thing that helped them.',
  'Some of those practices are ancient. Some were invented on a Tuesday afternoon out of desperation. None of them are the advice you’ve already ignored.'
];

/* ================= helpers ================= */
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function titleDot(t){ return /[.!?)]$/.test(t) ? t : t + '.'; }
function artHTML(name, opts){
  opts = opts || {};
  var node = null;
  if(ARTLIB[name]){ var t = document.createElement('template'); t.innerHTML = ARTLIB[name]; node = t.content.firstElementChild; }
  else { var src = document.querySelector('#homeView .art--'+name + ', #aboutView .art--'+name); if(src) node = src.cloneNode(true); }
  if(!node) return '';
  if(!opts.anim){
    $$('.rain', node).forEach(function(n){ n.parentNode.removeChild(n); });
    $$('clipPath', node).forEach(function(n){ n.parentNode.removeChild(n); });
    $$('[clip-path]', node).forEach(function(n){ n.removeAttribute('clip-path'); });
    $$('[id]', node).forEach(function(n){ n.removeAttribute('id'); });
  }
  if(!opts.label){ node.removeAttribute('role'); node.removeAttribute('aria-label'); node.setAttribute('aria-hidden','true'); }
  if(opts.fit) node.setAttribute('preserveAspectRatio','xMidYMid meet');
  return node.outerHTML;
}
var toastT;
function toast(msg){
  var t = $('#toast'); t.textContent = msg; t.classList.add('on');
  clearTimeout(toastT); toastT = setTimeout(function(){ t.classList.remove('on'); }, 2600);
}
function scrollTop(){ try{ window.scrollTo({top:0, left:0, behavior:'instant'}); }catch(e){ window.scrollTo(0,0); } }
function practiceOf(s){ return s.primary || s.practices[0]; }

var homeV = $('#homeView'), storiesV = $('#storiesView'), aboutV = $('#aboutView'), storyV = $('#storyView'), bookV = $('#bookView');
var topH = $('#top'), siteFoot = $('#siteFoot');

/* ================= stories page ================= */
var listBuilt = false;
function renderStoriesPage(){
  if(listBuilt) return; listBuilt = true;
  $('#storyList').innerHTML = STORIES.map(function(s, i){
    var p = practiceOf(s);
    return '<article class="sitem'+(i === 0 ? ' feat' : '')+'">'+
      '<a class="si-link" href="#story-'+s.id+'" aria-label="Story '+s.num+': '+esc(s.title)+'. What helped: '+esc(p.title)+'">'+
        '<div class="si-story"><div class="si-top"><span>Story '+s.num+'</span><span aria-hidden="true">Read</span></div>'+
          '<div class="si-art">'+artHTML(s.art, {fit:true})+'</div>'+
          '<h2 class="si-title">'+esc(titleDot(s.title))+'</h2>'+(s.by ? '<p class="si-by">By '+esc(s.by)+'</p>' : '')+
          '<p class="si-deck">'+esc(s.blurb)+'</p></div>'+
        '<div class="si-prac"><small>What helped</small><b>'+esc(p.title)+'</b></div>'+
      '</a>'+
      '<a class="textlink si-book" href="#book-'+s.id+'">Read it in the book '+ARROW+'</a>'+
    '</article>';
  }).join('') + '<aside class="send"><h2>Rather turn<br><em>the pages?</em></h2><p>Every story above, in order, one page at a time.</p><a class="btn btn--ink" href="#book">Open the book '+ARROW+'</a></aside>';
  bindEyes(storiesV);
}

/* ================= story page ================= */
function renderStory(id){
  var s = BY[id]; if(!s) return;
  $('#sList').innerHTML = STORIES.map(function(x){
    return '<li><a href="#story-'+x.id+'"'+(x.id===id?' aria-current="page"':'')+'><span class="s-thumb">'+artHTML(x.thumb)+'</span><span class="s-meta"><b>'+esc(x.num)+'</b><span>'+esc(x.title)+'</span></span></a></li>';
  }).join('');
  var cur = $('#sList [aria-current]'); if(cur && window.innerWidth <= 900){ $('#sList').scrollLeft = cur.parentNode.offsetLeft - 16; }
  $('#sNum').textContent = 'Story ' + s.num;
  $('#sTitle').textContent = titleDot(s.title);
  $('#sMeta').innerHTML = (s.by ? '<p class="s-by">By '+esc(s.by)+'</p>' : '') + (s.cw ? '<p class="s-cw">'+esc(s.cw)+'</p>' : '');
  $('#sDeck').textContent = s.deck || '';
  $('#sBook').setAttribute('href', '#book-' + s.id);
  $('#sArt').innerHTML = artHTML(s.art, {anim:true, label:true});
  var text = '';
  if(s.paras && s.paras.length) text = s.paras.map(function(p){ return '<p>'+esc(p)+'</p>'; }).join('');
  else if(s.pending) text = '<p class="pending">Brandon’s full story is being moved over from <a href="'+esc(s.pending)+'" target="_blank" rel="noopener">nobiggieimfine.com</a>. Until then, you can read it there.</p>';
  $('#sText').innerHTML = text;
  var side = '';
  if(s.panels){
    side = s.panels.map(function(p){
      return '<figure class="panel">'+artHTML(p.art)+'<span class="pnote" style="left:'+p.x+'%;top:'+p.y+'%">'+esc(p.note)+'</span></figure>';
    }).join('');
  } else {
    side = '<div class="s-aside">'+(s.note ? '<p class="note">'+esc(s.note)+'</p>' : '')+
      (s.care ? '<p class="care">If you’re thinking about suicide, or you’re worried about someone, you can call or text 988 in the US any time. Elsewhere, contact your local emergency number.</p>' : '')+'</div>';
  }
  $('#sSide').innerHTML = side;
  $('#pTitle').textContent = s.pTitle || 'What helped.';
  $('#pIntro').textContent = s.pIntro || '';
  $('#pArt').innerHTML = artHTML(s.pArt);
  var grid = $('#pGrid');
  grid.classList.toggle('steps-only', !!s.steps || !s.practices.some(function(p){ return p.icon; }));
  grid.innerHTML = s.practices.map(function(p, i){
    return '<li><span class="p-num">'+(i<9?'0':'')+(i+1)+'</span>'+(p.icon ? '<div class="p-icon">'+artHTML(p.icon)+'</div>' : '')+'<h3>'+esc(p.title)+'</h3><p>'+esc(p.text)+'</p></li>';
  }).join('');
  var idx = STORIES.indexOf(s), prev = STORIES[idx-1], next = STORIES[idx+1];
  $('#sPager').innerHTML = (s.after ? '<p class="p-after" style="flex-basis:100%">'+esc(s.after)+' In the US, you can call or text 988 any time.</p>' : '')+
    (prev ? '<a class="prev" href="#story-'+prev.id+'">'+ARROW+' '+esc(prev.title)+'</a>' : '<span></span>')+
    (next ? '<a href="#story-'+next.id+'">'+esc(next.title)+' '+ARROW+'</a>' : '<a href="#book">Open the book '+ARROW+'</a>');
  bindEyes(storyV);
}

/* ================= story mode: the book ================= */
var bookEl = $('#book'), bkL = $('#bkL'), bkR = $('#bkR'), stage = $('#bkStage'), measure = $('#bkMeasure');
var BK = {pages:[], spreads:[], si:0, mode:'spread', busy:false, sig:'', anchor:null};

function bkLayout(){
  var vw = stage.clientWidth, vh = stage.clientHeight, ratio = 0.7, w, h;
  var spread = vw >= 860 && vw / Math.max(vh,1) > 1.1;
  if(spread){
    h = Math.min(vh - 24, 880); w = h * ratio;
    var maxW = (vw - 150) / 2;
    if(w > maxW){ w = maxW; h = w / ratio; }
  } else {
    h = Math.min(vh - 16, 860); w = h * ratio;
    if(w > vw - 24){ w = vw - 24; h = Math.min(w / ratio, vh - 16); }
  }
  w = Math.floor(w); h = Math.floor(h);
  return {mode: spread ? 'spread' : 'single', pw:w, ph:h, bf: Math.max(10.5, Math.min(17, w / 29))};
}
function applyLayout(L){
  var st = bookV.style;
  st.setProperty('--pw', L.pw+'px'); st.setProperty('--ph', L.ph+'px'); st.setProperty('--bf', L.bf.toFixed(2)+'px');
  st.setProperty('--px', Math.round(L.pw*.11)+'px'); st.setProperty('--pt', Math.round(L.ph*.085)+'px'); st.setProperty('--pb', Math.round(L.ph*.085)+'px');
  bookEl.classList.toggle('single', L.mode === 'single');
}

/* measuring */
function mBody(cls){ measure.innerHTML = '<div class="bpage '+cls+'"><div class="bp-body"></div></div>'; return $('.bp-body', measure); }
function fits(b){ return b.scrollHeight <= b.clientHeight + 1; }
function paginateParas(paras, cls){
  var out = [], body = mBody(cls);
  function flush(){ out.push(body.innerHTML); body.innerHTML = ''; }
  paras.forEach(function(text){
    var cont = false, guard = 0;
    while(text && guard++ < 80){
      var p = document.createElement('p'); if(cont) p.className = 'cont';
      p.textContent = text; body.appendChild(p);
      if(fits(body)) { text = null; break; }
      var words = text.split(/\s+/), lo = 0, hi = words.length - 1;
      while(lo < hi){ var mid = Math.ceil((lo + hi) / 2); p.textContent = words.slice(0, mid).join(' '); if(fits(body)) lo = mid; else hi = mid - 1; }
      if(lo === 0){
        body.removeChild(p);
        if(body.children.length){ flush(); continue; }
        p.textContent = text; body.appendChild(p); flush(); text = null; break;
      }
      p.textContent = words.slice(0, lo).join(' ');
      flush();
      text = words.slice(lo).join(' '); cont = true;
    }
  });
  if(body.children.length) flush();
  return out;
}
function paginateBlocks(blocks, cls){
  var out = [], body = mBody(cls);
  blocks.forEach(function(html){
    var t = document.createElement('template'); t.innerHTML = html.trim(); var el = t.content.firstElementChild;
    body.appendChild(el);
    if(!fits(body) && body.children.length > 1){ body.removeChild(el); out.push(body.innerHTML); body.innerHTML = ''; body.appendChild(el); }
  });
  if(body.children.length) out.push(body.innerHTML);
  return out;
}

/* page content */
function contentsBlocks(nums){
  return ['<h3 class="ct-h">Contents</h3>'].concat(STORIES.map(function(s, i){
    var n = nums ? String(nums[i]) : '000';
    return '<button type="button" class="ct-row" data-goto="'+(nums ? nums[i] : 0)+'"><span class="ct-num">'+s.num+'</span><span class="ct-t">'+esc(s.title)+'</span><span class="ct-dots" aria-hidden="true"></span><span class="ct-pg">'+n+'</span></button>';
  }));
}
function practiceBlocks(s){
  var b = ['<div class="pp-head"><p class="pp-label">What helped</p><h3 class="pp-title">'+esc(s.pTitle || 'What helped.')+'</h3>'+(s.pIntro ? '<p class="pp-intro">'+esc(s.pIntro)+'</p>' : '')+'</div>'];
  s.practices.forEach(function(p, i){
    if(s.steps) b.push('<div class="pp-item pp-step"><span class="pi-n">'+(i+1)+'</span><h4>'+esc(p.title)+'</h4><p>'+esc(p.text)+'</p></div>');
    else b.push('<div class="pp-item'+(p.icon ? '' : ' noic')+'">'+(p.icon ? '<span class="pi-ic">'+artHTML(p.icon, {fit:true})+'</span>' : '')+'<h4>'+esc(p.title)+'</h4><p>'+esc(p.text)+'</p></div>');
  });
  if(s.after) b.push('<p class="pp-care">'+esc(s.after)+' In the US, you can call or text 988 any time.</p>');
  b.push('<p class="pp-link"><a href="#story-'+s.id+'">Open this story’s page '+ARROW+'</a></p>');
  return b;
}
function buildBook(L){
  var pages = [], spread = L.mode === 'spread';
  function add(p){ pages.push(p); return p; }
  function blank(){ add({kind:'blank', cls:'bwhite bblank', key:'blank'+pages.length, html:'<p class="blank-note">This page is blank on purpose.<br>Take a breath.</p>'}); }

  add({kind:'cover', cls:'bdark cover', key:'cover', html:
    '<div class="cv"><p class="cv-top">Volume one</p><div class="cv-art">'+artHTML('peek', {fit:true})+'</div>'+
    '<h2 class="cv-title">No Biggie,<br><em>I’m Fine.</em></h2><p class="cv-sub">Real stories, and the things that helped.</p></div>'});

  var fw = paginateBlocks(['<p class="tp-logo">No biggie,<br>I’m fine.</p>', '<p class="tp-label">A note before you start</p>'].concat(FOREWORD.map(function(t){ return '<p class="tp-p">'+esc(t)+'</p>'; })), 'bwhite front');
  fw.forEach(function(h, i){ add({kind:'title', cls:'bwhite front', key:'title'+i, html:h}); });

  var ctPages = paginateBlocks(contentsBlocks(null), 'bwhite front');
  var ctStart = pages.length;
  ctPages.forEach(function(h, i){ add({kind:'contents', cls:'bwhite front', key:'contents'+i, html:h}); });

  var openers = [];
  STORIES.forEach(function(s){
    if(spread && pages.length % 2 === 1) blank();
    openers.push(pages.length);
    add({kind:'opener', cls:'bdark opener', story:s, key:s.id+':open', html:
      '<div class="bo"><p class="bo-kicker">Story '+s.num+'</p><div class="bo-art">'+artHTML(s.art, {fit:true})+'</div>'+
      '<h2 class="bo-title">'+esc(titleDot(s.title))+'</h2>'+(s.by ? '<p class="bo-by">By '+esc(s.by)+'</p>' : '')+
      '<p class="bo-deck">'+esc(s.deck || s.blurb)+'</p>'+(s.cw ? '<p class="bo-cw">'+esc(s.cw)+'</p>' : '')+'</div>'});
    var tp = (s.paras && s.paras.length) ? paginateParas(s.paras, 'bdark btext') :
      ['<p>Brandon’s full story is being moved over from nobiggieimfine.com. Until then, you can read it there.</p><p><a href="'+esc(s.pending || 'https://nobiggieimfine.com/')+'" target="_blank" rel="noopener">Read “'+esc(s.title)+'” on nobiggieimfine.com '+ARROW+'</a></p>'];
    tp.forEach(function(h, i){ add({kind:'text', cls:'bdark btext', story:s, key:s.id+':text'+i, html:h}); });
    if(s.panels){
      add({kind:'panels', cls:'bdark panels', story:s, key:s.id+':panels', html:'<div class="bpanels">'+s.panels.map(function(p){
        return '<figure class="panel">'+artHTML(p.art)+'<span class="pnote" style="left:'+p.x+'%;top:'+p.y+'%">'+esc(p.note)+'</span></figure>';
      }).join('')+'</div>'});
    }
    paginateBlocks(practiceBlocks(s), 'bwhite bprac').forEach(function(h, i){ add({kind:'practice', cls:'bwhite bprac', story:s, key:s.id+':prac'+i, html:h}); });
  });

  add({kind:'end', cls:'bwhite front endp', key:'end', html:
    '<div class="endc"><h3 class="end-h">That’s the book,<br><em>for now.</em></h3><p>More stories are on the way. If one of these stayed with you, send it to someone who pushes it down too.</p>'+
    '<p class="end-links"><a href="#stories">Browse the stories '+ARROW+'</a><a href="#top">Back to home '+ARROW+'</a></p></div>'});
  if(spread && pages.length % 2 === 0) blank();
  add({kind:'back', cls:'bdark backc', key:'back', html:
    '<div class="bc"><div class="bc-art">'+artHTML('card4', {fit:true})+'</div><p class="bc-logo">No biggie,<br>I’m fine.</p><p class="bc-sub">Real people. Real things.<br>A brighter way through.</p></div>'});

  // real page numbers in the contents
  var real = paginateBlocks(contentsBlocks(openers), 'bwhite front');
  real.forEach(function(h, i){ if(pages[ctStart + i]) pages[ctStart + i].html = h; });

  var spreads = [];
  if(spread){ spreads.push([-1, 0]); for(var i = 1; i < pages.length; i += 2) spreads.push([i, i + 1 < pages.length ? i + 1 : -1]); }
  else pages.forEach(function(_, i){ spreads.push([-1, i]); });
  BK.pages = pages; BK.spreads = spreads; BK.mode = L.mode;
  measure.innerHTML = '';
}

function pageHTML(i, side){
  var p = BK.pages[i]; if(!p) return '';
  var head = '', num = '';
  if(p.kind === 'text' || p.kind === 'practice' || p.kind === 'panels'){
    var left = side === 'l';
    head = '<div class="bp-head"><span>'+(left ? 'No Biggie, I’m Fine' : esc(p.story.title))+'</span></div>';
    num = '<div class="bp-num">'+i+'</div>';
  }
  return '<div class="bpage '+p.cls+' side-'+side+'" data-i="'+i+'">'+head+'<div class="bp-body">'+p.html+'</div>'+num+'</div>';
}
function slotHTML(i, side){ return i >= 0 ? pageHTML(i, side) : ''; }
function visible(){ var sp = BK.spreads[BK.si] || [-1,-1]; return BK.mode === 'spread' ? sp : [-1, sp[1]]; }
function renderBook(){
  var sp = BK.spreads[BK.si];
  if(BK.mode === 'spread'){ bkL.innerHTML = slotHTML(sp[0], 'l'); bkR.innerHTML = slotHTML(sp[1], 'r'); }
  else { bkL.innerHTML = ''; bkR.innerHTML = slotHTML(sp[1], 's'); }
  afterRender();
}
function afterRender(){
  bindEyes(bookEl);
  var sp = visible(), shown = sp.filter(function(i){ return i >= 0; });
  var n = BK.pages.length - 1, label;
  if(shown.length === 1 && shown[0] === 0) label = 'Cover';
  else if(shown.length === 2) label = 'Pages ' + shown[0] + '–' + shown[1] + ' of ' + n;
  else label = 'Page ' + shown[0] + ' of ' + n;
  $('#bkCount').textContent = label;
  var scrub = $('#bkScrub'); scrub.max = BK.spreads.length - 1; scrub.value = BK.si;
  scrub.setAttribute('aria-valuetext', label);
  $('#bkPrev').disabled = $('#bkPrevSide').disabled = BK.si === 0;
  $('#bkNext').disabled = $('#bkNextSide').disabled = BK.si === BK.spreads.length - 1;
  var story = null;
  shown.forEach(function(i){ if(BK.pages[i].story && !story) story = BK.pages[i].story; });
  $('#bkWhere').textContent = story ? 'Story ' + story.num + ' · ' + story.title : 'No Biggie, I’m Fine';
  BK.anchor = BK.pages[shown[shown.length - 1]] ? BK.pages[shown[shown.length - 1]].key : null;
  var want = story ? '#book-' + story.id : '#book';
  if(location.hash !== want){ try{ history.replaceState(null, '', want); }catch(e){} }
}
function spreadOf(i){ for(var k = 0; k < BK.spreads.length; k++){ if(BK.spreads[k][0] === i || BK.spreads[k][1] === i) return k; } return 0; }
function goToPage(i){ BK.si = spreadOf(i); renderBook(); }

function turn(dir){
  if(BK.busy) return;
  var t = BK.si + dir; if(t < 0 || t >= BK.spreads.length) return;
  var cur = BK.spreads[BK.si], nxt = BK.spreads[t];
  if(reduce){ BK.si = t; renderBook(); return; }
  BK.busy = true;
  var leaf = document.createElement('div'), front, back, from, to, finishFn;
  leaf.className = 'bk-leaf';
  if(BK.mode === 'spread'){
    if(dir > 0){
      leaf.classList.add('at-r'); front = slotHTML(cur[1], 'r'); back = slotHTML(nxt[0], 'l');
      bkR.innerHTML = slotHTML(nxt[1], 'r'); from = 0; to = -180;
      finishFn = function(){ bkL.innerHTML = slotHTML(nxt[0], 'l'); };
    } else {
      leaf.classList.add('at-l'); front = slotHTML(cur[0], 'l'); back = slotHTML(nxt[1], 'r');
      bkL.innerHTML = slotHTML(nxt[0], 'l'); from = 0; to = 180;
      finishFn = function(){ bkR.innerHTML = slotHTML(nxt[1], 'r'); };
    }
  } else {
    leaf.classList.add('at-s');
    if(dir > 0){
      front = slotHTML(cur[1], 's'); back = '<div class="bpage pback"></div>';
      bkR.innerHTML = slotHTML(nxt[1], 's'); from = 0; to = -180; finishFn = function(){};
    } else {
      front = slotHTML(nxt[1], 's'); back = '<div class="bpage pback"></div>';
      from = -180; to = 0; finishFn = function(){ bkR.innerHTML = slotHTML(nxt[1], 's'); };
    }
  }
  leaf.innerHTML = '<div class="lf lf-f">'+front+'<i class="shade"></i></div><div class="lf lf-b">'+back+'<i class="shade"></i></div>';
  leaf.style.transform = 'rotateY('+from+'deg)';
  bookEl.appendChild(leaf);
  void leaf.offsetWidth;
  leaf.classList.add('go');
  leaf.style.transform = 'rotateY('+to+'deg)';
  var done = false;
  function finish(){ if(done) return; done = true; finishFn(); if(leaf.parentNode) leaf.parentNode.removeChild(leaf); BK.si = t; BK.busy = false; afterRender(); }
  leaf.addEventListener('transitionend', function(e){ if(e.target === leaf) finish(); });
  setTimeout(finish, 1000);
}

function ensureBook(){
  var L = bkLayout();
  var sig = L.mode + ':' + L.pw + 'x' + L.ph;
  if(sig === BK.sig) return false;
  var keep = BK.anchor;
  applyLayout(L);
  buildBook(L);
  BK.sig = sig;
  BK.si = 0;
  if(keep){ for(var i = 0; i < BK.pages.length; i++){ if(BK.pages[i].key === keep){ BK.si = spreadOf(i); break; } } }
  return true;
}
var prevNonBook = '#top', bookOpen = false;
function openBook(storyId){
  show('book');
  $('#bkClose').setAttribute('href', prevNonBook);
  var ready = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  ready.then(function(){
    requestAnimationFrame(function(){
      ensureBook();
      if(storyId && BY[storyId]){
        for(var i = 0; i < BK.pages.length; i++){ if(BK.pages[i].key === storyId + ':open'){ BK.si = spreadOf(i); break; } }
      } else if(!bookOpen){ BK.si = 0; }
      bookOpen = true;
      renderBook();
      try{ bookEl.focus({preventScroll:true}); }catch(e){}
    });
  });
}
function closeBook(){ location.hash = prevNonBook; }

$('#bkPrev').addEventListener('click', function(){ turn(-1); });
$('#bkNext').addEventListener('click', function(){ turn(1); });
$('#bkPrevSide').addEventListener('click', function(){ turn(-1); });
$('#bkNextSide').addEventListener('click', function(){ turn(1); });
$('#bkScrub').addEventListener('input', function(){ if(BK.busy) return; BK.si = +this.value; renderBook(); });
$('#bkToc').addEventListener('click', function(){
  for(var i = 0; i < BK.pages.length; i++){ if(BK.pages[i].kind === 'contents'){ goToPage(i); return; } }
});
var sw = {x:0, y:0, on:false, used:false};
stage.addEventListener('pointerdown', function(e){ sw.on = true; sw.used = false; sw.x = e.clientX; sw.y = e.clientY; });
stage.addEventListener('pointerup', function(e){
  if(!sw.on) return; sw.on = false;
  var dx = e.clientX - sw.x, dy = e.clientY - sw.y;
  if(Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2){ sw.used = true; turn(dx < 0 ? 1 : -1); }
});
bookEl.addEventListener('click', function(e){
  var g = e.target.closest('[data-goto]');
  if(g){ e.preventDefault(); goToPage(+g.dataset.goto); return; }
  if(e.target.closest('a,button')) return;
  if(sw.used){ sw.used = false; return; }
  var r = bookEl.getBoundingClientRect(), x = e.clientX - r.left;
  if(BK.mode === 'spread') turn(x < r.width / 2 ? -1 : 1);
  else turn(x < r.width * .34 ? -1 : 1);
});
document.addEventListener('keydown', function(e){
  if(bookV.hidden) return;
  var tag = (e.target.tagName || '').toLowerCase();
  if(tag === 'input' && e.target.type !== 'range') return;
  if(e.key === 'ArrowRight' || e.key === 'PageDown'){ e.preventDefault(); turn(1); }
  else if(e.key === 'ArrowLeft' || e.key === 'PageUp'){ e.preventDefault(); turn(-1); }
  else if(e.key === ' ' && e.target === bookEl){ e.preventDefault(); turn(e.shiftKey ? -1 : 1); }
  else if(e.key === 'Home'){ e.preventDefault(); BK.si = 0; renderBook(); }
  else if(e.key === 'End'){ e.preventDefault(); BK.si = BK.spreads.length - 1; renderBook(); }
  else if(e.key === 'Escape'){ closeBook(); }
});
var rzT = 0;
window.addEventListener('resize', function(){
  if(bookV.hidden) return;
  clearTimeout(rzT);
  rzT = setTimeout(function(){ if(BK.busy) return; if(ensureBook()) renderBook(); }, 180);
});

/* ================= router ================= */
var current = 'home';
function show(view){
  homeV.hidden = view !== 'home'; storiesV.hidden = view !== 'stories'; aboutV.hidden = view !== 'about';
  storyV.hidden = view !== 'story'; bookV.hidden = view !== 'book';
  var chrome = view === 'home' || view === 'stories' || view === 'about';
  topH.hidden = !chrome; siteFoot.hidden = !chrome;
  document.body.classList.toggle('bk-open', view === 'book');
  $$('.top .nav a, #siteFoot .nav a').forEach(function(a){
    var on = (a.getAttribute('href') === '#stories' && view === 'stories') || (a.getAttribute('href') === '#about' && view === 'about');
    if(on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  current = view;
}
function route(){
  var h = location.hash.replace(/^#/, '');
  try{ h = decodeURIComponent(h); }catch(e){}
  if(h === 'book' || h.indexOf('book-') === 0){ if(current !== 'book') openBook(h.slice(5)); return; }
  prevNonBook = '#' + (h || 'top');
  if(h.indexOf('story-') === 0 && BY[h.slice(6)]){ show('story'); renderStory(h.slice(6)); scrollTop(); req(); return; }
  if(h === 'stories'){ var w1 = current; show('stories'); renderStoriesPage(); if(w1 !== 'stories') scrollTop(); req(); return; }
  if(h === 'about'){ var w2 = current; show('about'); bindEyes(aboutV); if(w2 !== 'about') scrollTop(); req(); return; }
  var wasHome = current === 'home';
  show('home');
  if(!h || h === 'top'){ if(wasHome) window.scrollTo({top:0, behavior: reduce ? 'auto' : 'smooth'}); else scrollTop(); req(); return; }
  var el = document.getElementById(h);
  if(el && homeV.contains(el)){ requestAnimationFrame(function(){ el.scrollIntoView({behavior: (wasHome && !reduce) ? 'smooth' : 'auto'}); }); }
  else if(!wasHome) scrollTop();
  req();
}
window.addEventListener('hashchange', route);

document.addEventListener('click', function(e){
  var t = e.target.closest('[data-soon]');
  if(t) toast(t.dataset.soon + ' link goes live at launch');
});

/* torn card edges */
function rng(seed){ return function(){ seed = (seed*16807) % 2147483647; return (seed-1)/2147483646; }; }
$$('.card').forEach(function(card, i){
  var r = rng(97+i*31), pts=[], n=16, a=4.5, k;
  for(k=0;k<=n;k++) pts.push('calc('+(k/n*100).toFixed(2)+'% + '+((k===0||k===n)?0:(r()-.5)*3).toFixed(1)+'px) '+(r()*a).toFixed(1)+'px');
  for(k=1;k<=n;k++) pts.push('calc(100% - '+(r()*a).toFixed(1)+'px) '+(k/n*100).toFixed(2)+'%');
  for(k=n-1;k>=0;k--) pts.push((k/n*100).toFixed(2)+'% calc(100% - '+(r()*a).toFixed(1)+'px)');
  for(k=n-1;k>0;k--) pts.push((r()*a).toFixed(1)+'px '+(k/n*100).toFixed(2)+'%');
  card.style.clipPath = 'polygon('+pts.join(',')+')';
});

/* ================= creatures that watch you ================= */
var creatures = [];
function bindEyes(root){
  $$('svg', root).forEach(function(svg){
    var eyes = $$('.eye', svg).filter(function(g){ return g.parentNode.closest('svg') === svg; });
    if(!eyes.length || svg.__eyes) return;
    svg.__eyes = true;
    var c = {svg:svg, eyes:eyes.map(function(g){ return {pp:$('.pp', g), cx:+g.dataset.cx, cy:+g.dataset.cy, r:+g.dataset.r}; }), wander:{x:0,y:0}};
    creatures.push(c);
    if(!reduce) scheduleBlink(c);
  });
  creatures = creatures.filter(function(c){ return c.svg.isConnected; });
}
function scheduleBlink(c){
  setTimeout(function(){
    if(!c.svg.isConnected) return;
    c.svg.classList.add('blink');
    setTimeout(function(){ c.svg.classList.remove('blink'); scheduleBlink(c); }, 130);
  }, 2200 + Math.random()*5200);
}
var px=null, py=null, lastMove=0, raf=0;
function look(){
  raf = 0;
  var idle = px === null || (Date.now()-lastMove > 4000);
  creatures.forEach(function(c){
    if(!c.svg.isConnected) return;
    var m = c.svg.getScreenCTM(); if(!m || !m.a) return;
    c.eyes.forEach(function(e){
      var max = e.r*.42, ox, oy;
      if(idle){ ox = c.wander.x*max; oy = c.wander.y*max; }
      else{
        var sx = e.cx*m.a + m.e, sy = e.cy*m.d + m.f, dx = px-sx, dy = py-sy, d = Math.hypot(dx,dy)||1;
        var k = Math.min(1, d/240)*max; ox = dx/d*k; oy = dy/d*k;
      }
      e.pp.setAttribute('transform','translate('+ox.toFixed(2)+' '+oy.toFixed(2)+')');
    });
  });
}
function req(){ if(!raf) raf = requestAnimationFrame(look); }
window.addEventListener('pointermove', function(e){ if(e.pointerType==='touch') return; px=e.clientX; py=e.clientY; lastMove=Date.now(); req(); }, {passive:true});
window.addEventListener('scroll', req, {passive:true});
window.addEventListener('resize', req);
if(!reduce){
  setInterval(function(){
    if(px!==null && Date.now()-lastMove <= 4000) return;
    creatures.forEach(function(c){ var a=Math.random()*Math.PI*2, d=Math.random()<.3?0:.55+Math.random()*.45; c.wander={x:Math.cos(a)*d,y:Math.sin(a)*d}; });
    req();
  }, 2600);
}
bindEyes(homeV);
$$('.yr').forEach(function(y){ try{ y.textContent = new Date().getFullYear(); }catch(e){} });
route();
if(!reduce && current === 'home'){ var hc = creatures[0]; if(hc){ setTimeout(function(){ hc.svg.classList.add('blink'); setTimeout(function(){ hc.svg.classList.remove('blink'); },140); }, 900); } }
})();
