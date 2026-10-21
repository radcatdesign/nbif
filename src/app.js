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
   blurb:'October 2016. My grandma called. She couldn’t find my dad.',
   deck:'October 2016. My grandma called. She couldn’t find my dad.',
   cw:'This story talks about a suicide attempt.',
   art:'peek', thumb:'peek', pArt:'walker', care:true,
   paras:[
    'October 2016. My grandma called. She couldn’t find my dad.',
    'He’d vanished before, so I wasn’t that worried. But something about this time felt different. I started calling hospitals and police stations, mostly going through the motions, sure I’d come up empty. Until a receptionist said the words I didn’t even know I’d been dreading: “He’s here.”',
    'At the hospital a doctor pulled me aside and said “your father attempted suicide” with the warmth of a meter maid. Dad survived, my brother flew in on the red eye, my mom (his ex) ran logistics like she’d spent years in training for it, and I was back at work within a week, telling everyone it was honestly kind of a blessing. A wake-up call. “No biggie, I’m fine” became my go-to response when people asked me how I was doing.',
    'What I couldn’t tell anyone was that I wasn’t sad. I looked everywhere for sad. What I found was rage. At him, at my grandma for whatever role I’d decided she played in getting him to that day, at every person that told me to go and cry in the fucking shower.',
    'The rage, the grief, needed somewhere to live but I didn’t even think about that. One night I saw an ad for a rage room on Instagram and I got an idea. I drove to a dollar store and bought a stack of ugly plates for six bucks and a Sharpie. On the first plate I wrote HE WAS CHOOSING TO ABANDON US, then I threw it as hard as I could against the wall in the alley behind my house. And fuck did it feel good, so I kept going. I wrote and I smashed until the stack was gone. And then I started using my real dishes (don’t recommend that part). By the time I was out of dishes and things to write on them, I laughed, I cried, and finally some of those stuck feelings moved, just a little.',
    'My dad is still alive. We still mostly don’t talk about that October. But the dollar store knows me now, and I always have a few extra plates on hand.'
   ],
   pTitle:'The practice, if you want to try it',
   kit:[
     {art:'need_plates', name:'Cheap plates or glasses', note:'Dollar store, thrift store, the uglier the better.'},
     {art:'need_sharpie', name:'A Sharpie', note:'For the sentence you’re not allowed to say out loud.'},
     {art:'need_zone', name:'A smash zone', note:'A metal trash can, a garage floor, a wall with a tarp.'},
     {art:'need_glasses', name:'Safety glasses', note:'I was fine, but I was also probably being an idiot.'},
     {art:'need_shoes', name:'Closed-toe shoes', note:'Shards go everywhere.'},
     {art:'need_broom', name:'A broom', note:'The sweeping is the second half of the ritual.'}
   ],
   steps:true,
   primary:{title:'Smash the plates', text:'Write the sentence you’re not allowed to say out loud. Read it out loud. Once. Then throw.'},
   practices:[
     {title:'Buy the plates', art:'step1', text:'Buy cheap plates or glasses. Dollar store, thrift store, the uglier the better. Never your own good ones — the point is to lose things you don’t love.'},
     {title:'Write the sentence', art:'step2', text:'Take a Sharpie and write the sentence you’re not allowed to say out loud. Full sentences, not single words. “He was choosing to abandon us” breaks better than “abandonment.”'},
     {title:'Pick your smash zone', art:'step3', text:'Pick your smash zone. A metal trash can, a garage floor, a wall with a tarp. And find some safety glasses and closed-toe shoes. I was fine, but I was also probably being an idiot.'},
     {title:'Say it, then throw', art:'step4', text:'Read the sentence out loud. Once. Then throw.'},
     {title:'One sentence per plate', art:'step5', text:'One sentence per plate. Keep going until the stack is gone or something in you goes quiet.'},
     {title:'Sweep up', art:'step6', text:'Sweep up. Don’t skip this part. The sweeping is the second half of the ritual. And throw that shit away.'}
   ],
   after:'If the rage feels bigger than a stack of plates, that’s information too.',
   scenes:[
     {after:0, art:'scene1', ch:'The call', cap:'My grandma called. She couldn’t find my dad.'},
     {after:1, art:'scene2', ch:'He’s here', cap:'“He’s here.”'},
     {after:2, art:'scene3', ch:'No biggie', cap:'“No biggie, I’m fine” became my go-to response.'},
     {after:3, art:'scene4', ch:'What I found was rage', cap:'Go and cry in the fucking shower.'},
     {after:4, art:'scene5', ch:'The plates', cap:'On the first plate I wrote HE WAS CHOOSING TO ABANDON US.'},
     {after:5, art:'scene6', ch:'The dollar store', cap:'The dollar store knows me now.'}
   ]}
];
var BY = {}; STORIES.forEach(function(s){ BY[s.id] = s; });

var FOREWORD = [
  'No Biggie, I’m Fine is for people who push it down and power through.',
  'It’s a collection of real stories from people who found their own ways to carry hard things. Each entry pairs one person’s story with the specific thing that helped them. Some of those practices are ancient. Some were invented on a Tuesday afternoon out of desperation. None of them are the advice you’ve already ignored.',
  'I spent most of my life saying no biggie, I’m fine. This is my attempt to build the thing I wish I’d had. Proof I wasn’t the only one, and a few tricks to help me move through it.'
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
function recipeHTML(s){
  if(!s.kit) return '';
  return '<div class="rc-need"><div class="rc-h"><h3>What you\u2019ll need</h3><span>'+s.kit.length+' things</span></div><ul class="rc-kit">'+
    s.kit.map(function(k){ return '<li><div class="rk-art">'+artHTML(k.art, {fit:true})+'</div><h4>'+esc(k.name)+'</h4><p>'+esc(k.note)+'</p></li>'; }).join('')+'</ul></div>'+
    '<div class="rc-steps"><div class="rc-h"><h3>The steps</h3><span>'+s.practices.length+' steps</span></div><ol class="rc-list">'+
    s.practices.map(function(p, i){ return '<li class="rs"><div class="rs-art">'+artHTML(p.art, {fit:true})+'</div><div class="rs-copy"><span class="rs-n">'+(i+1)+'</span><h4>'+esc(p.title)+'</h4><p>'+esc(p.text)+'</p></div></li>'; }).join('')+'</ol></div>';
}
function sceneFig(sc){ return '<figure class="scene">'+artHTML(sc.art, {label:false})+'<figcaption>'+esc(sc.cap)+'</figcaption></figure>'; }
function scrollTop(){ try{ window.scrollTo({top:0, left:0, behavior:'instant'}); }catch(e){ window.scrollTo(0,0); } }
function practiceOf(s){ return s.primary || s.practices[0]; }

var homeV = $('#homeView'), storiesV = $('#storiesView'), aboutV = $('#aboutView'), storyV = $('#storyView'), bookV = $('#bookView'), submitV = $('#submitView');
var topH = $('#top'), siteFoot = $('#siteFoot');

/* ================= the shelf ================= */
var SHELF_TOTAL = 12;
var LOCKED_ART = ['card2','card4','featured','card3','about','stuck_hero','card1','peek','card2','card4','featured'];
var shelfBuilt = false;
function coverHTML(s, big){
  return '<span class="zc-num">No. '+s.num+'</span>'+
    '<span class="zc-art">'+artHTML(s.art, {fit:true})+'</span>'+
    '<span class="zc-title">'+esc(titleDot(s.title))+'</span>'+
    '<span class="zc-by">'+(s.by ? 'By '+esc(s.by) : '')+'</span>'+
    '<span class="zc-foot"><span>No biggie, I’m fine.</span><span>'+(big ? 'A field guide' : 'Read')+'</span></span>';
}
function renderStoriesPage(){
  if(shelfBuilt) return; shelfBuilt = true;
  var items = [];
  for(var i = 0; i < SHELF_TOTAL; i++){
    var s = STORIES[i], n = (i < 9 ? '0' : '') + (i + 1), tilt = ((i * 37) % 7 - 3) * .55;
    if(s){
      items.push('<li class="zslot"><a class="zcov open" href="#zine-'+s.id+'" style="--tilt:'+tilt.toFixed(2)+'deg" aria-label="Open zine No. '+n+': '+esc(s.title)+' by '+esc(s.by || '')+'">'+coverHTML(s)+'</a><span class="z-tag">Open</span></li>');
    } else {
      var art = LOCKED_ART[(i - 1) % LOCKED_ART.length];
      items.push('<li class="zslot"><button type="button" class="zcov locked" data-locked="'+n+'" style="--tilt:'+tilt.toFixed(2)+'deg" aria-label="Zine No. '+n+', coming soon. Get notified.">'+
        '<span class="zc-num">No. '+n+'</span><span class="zc-art">'+artHTML(art, {fit:true})+'</span>'+
        '<span class="zc-lock" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="10" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></span>'+
        '<span class="zc-title">Coming soon</span><span class="zc-foot"><span>No biggie, I’m fine.</span><span>Notify me</span></span></button><span class="z-tag">Locked</span></li>');
    }
  }
  var rows = '';
  for(var r = 0; r < items.length; r += 4) rows += '<ol class="zrow" start="'+(r+1)+'">'+items.slice(r, r + 4).join('')+'</ol>';
  $('#zShelf').innerHTML = rows;
  $('#shelfCount').textContent = STORIES.length + ' of ' + SHELF_TOTAL + ' ready';
  bindEyes($('#zShelf'));
}
document.addEventListener('click', function(e){
  var l = e.target.closest('[data-locked]'); if(!l) return;
  var sub = $('#subscribe'); sub.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block:'start'});
  $('#subMsg').textContent = 'No. ' + l.dataset.locked + ' is still being made. Leave your email and you’ll know when it’s out.';
  setTimeout(function(){ try{ $('#subEmail').focus({preventScroll:true}); }catch(err){} }, reduce ? 0 : 500);
});
$('#subForm').addEventListener('submit', function(e){
  e.preventDefault();
  var em = $('#subEmail').value.trim(), msg = $('#subMsg');
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){ msg.textContent = 'That email doesn’t look right. Check it and try again.'; $('#subEmail').focus(); return; }
  var href = 'mailto:brandonmkaufer@gmail.com?subject=' + encodeURIComponent('Notify me: new No Biggie zines') + '&body=' + encodeURIComponent('Please let me know when the next zine is out.\n\n' + em);
  window.location.href = href;
  msg.innerHTML = 'Your email app should open with a note ready to send. If it doesn’t, write to <span class="sel">brandonmkaufer@gmail.com</span> with “notify me”.';
});

document.addEventListener('click', function(e){
  if(!e.target.closest('[data-tosub]')) return;
  e.preventDefault(); location.hash = '#stories';
  setTimeout(function(){ $('#subscribe').scrollIntoView({behavior: reduce ? 'auto' : 'smooth'}); }, 80);
});

/* ================= submit a story ================= */
var mine = null, draft = freshDraft();
function freshDraft(){ return {name:'', title:'', story:'', practices:[{name:'', how:''}], ok:false}; }
var STARTERS = ['It started when','The hardest part was','What nobody saw was','The first thing that helped was','These days'];
var DRAFT_KEY = 'nbif.draft.v1';
var shStep = 1, shDone = false, pvFlipped = false, pvT = 0, saveT = 0;
(function loadDraft(){
  try{
    var d = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
    if(d && typeof d === 'object'){
      draft.name = String(d.name || ''); draft.title = String(d.title || ''); draft.story = String(d.story || '');
      if(Array.isArray(d.practices) && d.practices.length) draft.practices = d.practices.slice(0,6).map(function(p){ return {name:String((p&&p.name)||''), how:String((p&&p.how)||'')}; });
    }
  }catch(e){}
})();
function hasDraft(){ return !!(draft.name || draft.title || draft.story || draft.practices.some(function(p){ return p.name || p.how; })); }
function saveDraft(){
  clearTimeout(saveT);
  saveT = setTimeout(function(){
    var st = $('#dStat');
    try{ localStorage.setItem(DRAFT_KEY, JSON.stringify({name:draft.name, title:draft.title, story:draft.story, practices:draft.practices})); if(st) st.textContent = 'Draft saved on this device'; }
    catch(e){ if(st) st.textContent = ''; }
  }, 400);
}
function clearDraft(){ try{ localStorage.removeItem(DRAFT_KEY); }catch(e){} }
function stepsHTML(n){
  return '<ol class="steps" aria-label="Progress">'+
    '<li class="'+(n===1?'on':'done')+'"'+(n===1?' aria-current="step"':'')+'><b>1</b>Your story</li>'+
    '<li class="'+(n===2?'on':'')+'"'+(n===2?' aria-current="step"':'')+'><b>2</b>What helped</li></ol>';
}
function words(t){ var m = t.trim().match(/\S+/g); return m ? m.length : 0; }
function wcText(){
  var n = words(draft.story);
  if(!n) return '0 words · aim for 150 to 600';
  if(n < 150) return n + ' word' + (n===1?'':'s') + ' · aim for 150 to 600';
  if(n <= 600) return n + ' words · right in the zone';
  return n + ' words · that’s fine, we may trim for length';
}
function step1HTML(){
  return '<div class="fpanel is-dark"><p class="fp-kicker">Step 1 of 2 · Your story</p><h3 class="fp-h">What were you carrying?</h3>'+stepsHTML(1)+
    '<form id="stepForm" novalidate>'+
    '<div class="field"><label for="fName">Name to show (or leave blank for anonymous)</label><input type="text" id="fName" autocomplete="given-name" placeholder="Anonymous" value="'+esc(draft.name)+'"></div>'+
    '<div class="field"><label for="fTitle">Give it a title</label><input type="text" id="fTitle" placeholder="The plates" value="'+esc(draft.title)+'"></div>'+
    '<div class="field"><label for="fStory">Your story</label><textarea id="fStory" placeholder="Where you were, what it felt like, what you did, where you are now. Messy is fine.">'+esc(draft.story)+'</textarea></div>'+
    '<div class="fmeta"><span id="wc">'+wcText()+'</span><span id="dStat">'+(hasDraft()?'Draft saved on this device':'')+'</span></div>'+
    '<div class="starters"><span class="flabel" id="startLbl">Stuck? Start a paragraph with</span><div class="chips" role="group" aria-labelledby="startLbl">'+
      STARTERS.map(function(s){ return '<button type="button" class="chip" data-insert="'+esc(s)+'">'+esc(s)+'…</button>'; }).join('')+'</div></div>'+
    '<p class="err" id="sErr" role="alert"></p>'+
    '<div class="fp-row"><button class="btn btn--paper" type="submit">Next: what helped '+ARROW+'</button></div>'+
    '</form><p class="fp-fine">Your draft stays on this device until you send it.</p></div>';
}
function pblockHTML(p, i){
  var chips = '';
  return '<div class="pblock" data-i="'+i+'">'+(i>0?'<h3>Practice '+(i+1)+'</h3><button type="button" class="rm" data-rm="'+i+'">Remove</button>':'')+chips+
    '<div class="field"><label for="pName'+i+'">Name your practice</label><input type="text" id="pName'+i+'" class="pname" placeholder="'+(i===0?'Smash a stack of dollar store plates':'Another thing that helped')+'" value="'+esc(p.name)+'"></div>'+
    '<div class="field"><label for="pHow'+i+'">How do you do it, and what did it change?</label><textarea id="pHow'+i+'" class="phow" placeholder="When, where, how long. Write it so a stranger could try it tomorrow.">'+esc(p.how)+'</textarea></div></div>';
}
function step2HTML(){
  return '<div class="fpanel fp-paper"><p class="fp-kicker">Step 2 of 2 · What helped</p><h3 class="fp-h">What got you through it?</h3>'+stepsHTML(2)+
    '<p class="fp-lede">Share the practice that helped with what you just wrote about. Name it like an action, keep it small, and say how you do it.</p>'+
    '<form id="stepForm" novalidate><div id="pblocks">'+draft.practices.map(pblockHTML).join('')+'</div>'+
    (draft.practices.length < 6 ? '<button type="button" class="addp" id="addP">+ Add another practice</button>' : '')+
    '<label class="check" for="sOk"><input type="checkbox" id="sOk"'+(draft.ok?' checked':'')+'> <span>It’s okay to share my story and practices on the site. You may trim for length, never for meaning.</span></label>'+
    '<p class="err" id="sErr" role="alert"></p>'+
    '<div class="fp-row"><button class="btn btn--line btn--back" type="button" id="backBtn">'+ARROW+' Back to my story</button><button class="btn btn--ink" type="submit">Send it '+ARROW+'</button></div>'+
    '</form><p class="fp-fine">Sending opens your email app with everything filled in. It goes to one person, and nothing gets published without your yes.</p></div>';
}
function thanksHTML(){
  return '<div class="fpanel fp-paper fp-thanks"><p class="fp-kicker">Almost there</p><h3 class="fp-h">Thank you'+(mine.by === 'Anonymous' ? '' : ', '+esc(mine.by))+'.</h3>'+
    '<p class="fp-lede">Your email app should be open with your story and what helped already in it. Hit send there and it lands with me. A human reads everything.</p>'+
    '<div class="fp-row"><a class="btn btn--ink" id="mailAgain" href="'+mailHref()+'">Open the email again '+ARROW+'</a><button class="btn btn--line" type="button" id="copyIt">Copy it instead</button></div>'+
    '<p class="fp-copy">Nothing opened? Paste it into an email to <b>'+MAILTO+'</b></p>'+
    '<div class="fp-row" style="margin-top:12px"><button class="textlink" type="button" id="writeAgain">Write another story '+ARROW+'</button></div>'+
    '<p class="fp-fine">Nothing is stored on this site. Nothing gets published, quoted, or shared without your explicit yes.</p></div>';
}
function keep(b){
  var n = $('#fName', b); if(n) draft.name = n.value;
  var t = $('#fTitle', b); if(t) draft.title = t.value;
  var x = $('#fStory', b); if(x) draft.story = x.value;
  var blocks = $$('.pblock', b);
  if(blocks.length) draft.practices = blocks.map(function(bl){ return {name: $('.pname', bl).value, how: $('.phow', bl).value}; });
  var ok = $('#sOk', b); if(ok) draft.ok = ok.checked;
}
function firstSentence(t){
  var p = (t || '').trim().split(/\n/)[0] || '';
  var m = p.match(/^.*?[.!?](?=\s|$)/); var f = m ? m[0] : p;
  if(f.length > 110) f = f.slice(0, 107).replace(/\s+\S*$/,'') + '…';
  return f;
}
function previewStory(){
  if(shDone && mine) return mine;
  var ps = draft.practices.filter(function(p){ return p.name.trim() || p.how.trim(); });
  if(!ps.length) ps = [{name:'', how:''}];
  return {title: draft.title.trim() || 'Your title', by: draft.name.trim() || 'Anonymous', blurb: firstSentence(draft.story) || 'Your first line shows up here.',
    practices: ps.map(function(p){ return {title: p.name.trim() || 'Your practice', text: p.how.trim() || 'How you do it, and what it changed, shows up here.'}; })};
}
function pvLabel(){ return 'Card preview, showing the '+(pvFlipped?'practice':'story')+' side. Press to flip.'; }
function updatePreview(){
  var holder = $('#pvCard'); if(!holder) return;
  var s = previewStory();
  holder.innerHTML = '<button type="button" class="pvc'+(pvFlipped?' flipped':'')+'" aria-label="'+pvLabel()+'"><span class="pvc-in">'+
    '<span class="pvc-face pvc-front"><span class="pvc-k"><span>No. Yours</span><span>The story</span></span><span class="pvc-art">'+artHTML('peek', {fit:true})+'</span>'+
      '<span class="pvc-t">'+esc(titleDot(s.title))+'</span><span class="pvc-by">By '+esc(s.by)+'</span><span class="pvc-l">'+esc(s.blurb)+'</span></span>'+
    '<span class="pvc-face pvc-back"><span class="pvc-k"><span>No. Yours</span><span>The practice</span></span><span class="pvc-t">What helped.</span>'+
      '<span class="pvc-ps">'+s.practices.slice(0,3).map(function(p){ return '<span style="display:block" class="li"><b>'+esc(p.title)+'</b><span>'+esc(p.text)+'</span></span>'; }).join('')+'</span></span>'+
    '</span></button>';
  var c = $('.pvc', holder);
  c.addEventListener('click', function(){ pvFlipped = !pvFlipped; c.classList.toggle('flipped', pvFlipped); c.setAttribute('aria-label', pvLabel()); });
  bindEyes(holder);
}
function queuePreview(){ clearTimeout(pvT); pvT = setTimeout(updatePreview, 160); }
function toForm(focusSel){
  var m = $('#shMain');
  var r = m.getBoundingClientRect();
  if(r.top < 0 || r.top > window.innerHeight * .6) m.scrollIntoView({behavior: reduce?'auto':'smooth', block:'start'});
  if(focusSel) setTimeout(function(){ var f = $(focusSel, m); if(f) f.focus({preventScroll:true}); }, reduce ? 0 : 380);
}
function insertStarter(text){
  var ta = $('#fStory'); if(!ta) return;
  var v = ta.value, start = ta.selectionStart == null ? v.length : ta.selectionStart, end = ta.selectionEnd == null ? v.length : ta.selectionEnd;
  if(document.activeElement !== ta){ start = end = v.length; }
  var before = v.slice(0, start), after = v.slice(end);
  var pre = before.trim() ? (/\n\s*$/.test(before) ? (/\n\s*\n\s*$/.test(before) ? '' : '\n') : '\n\n') : '';
  var ins = pre + text + ' ';
  ta.value = before + ins + after;
  var pos = (before + ins).length;
  ta.focus({preventScroll:true}); ta.setSelectionRange(pos, pos);
  ta.dispatchEvent(new Event('input', {bubbles:true}));
}
function renderShare(focusSel){
  var m = $('#shMain');
  if(shDone){ m.innerHTML = thanksHTML(); pvFlipped = false; updatePreview(); wireThanks(m); return; }
  m.innerHTML = shStep === 1 ? step1HTML() : step2HTML();
  pvFlipped = shStep === 2;
  updatePreview();
  if(shStep === 1) wireStep1(m); else wireStep2(m, focusSel);
}
function wireStep1(m){
  var f = $('#stepForm', m);
  f.addEventListener('input', function(){ keep(m); $('#wc', m).textContent = wcText(); saveDraft(); queuePreview(); });
  $$('[data-insert]', m).forEach(function(b){ b.addEventListener('click', function(){ insertStarter(b.dataset.insert); }); });
  f.addEventListener('submit', function(e){
    e.preventDefault(); keep(m);
    if(draft.story.trim().length < 40){ $('#sErr', m).textContent = 'Add a little more. A few sentences is plenty.'; $('#fStory', m).focus(); return; }
    shStep = 2; renderShare(); toForm(draft.practices[0].name ? '#pHow0' : '#pName0');
  });
}
function wireStep2(m, focusSel){
  var f = $('#stepForm', m), first = $('#pName0', m), chips = [];
  function sync(){ chips.forEach(function(c){ c.setAttribute('aria-pressed', String(c.textContent === first.value.trim())); }); }
  f.addEventListener('input', function(){ keep(m); sync(); saveDraft(); queuePreview(); });
  f.addEventListener('change', function(){ keep(m); });
  chips.forEach(function(c){ c.addEventListener('click', function(){ first.value = c.textContent; keep(m); sync(); saveDraft(); queuePreview(); $('#pHow0', m).focus(); }); });
  var add = $('#addP', m);
  if(add) add.addEventListener('click', function(){ keep(m); draft.practices.push({name:'', how:''}); saveDraft(); renderShare(); var ins = $$('.pname', $('#shMain')); ins[ins.length-1].focus(); });
  $$('[data-rm]', m).forEach(function(r){ r.addEventListener('click', function(){ keep(m); draft.practices.splice(+r.dataset.rm, 1); saveDraft(); renderShare(); }); });
  $('#backBtn', m).addEventListener('click', function(){ keep(m); shStep = 1; renderShare(); toForm('#fStory'); });
  f.addEventListener('submit', function(e){
    e.preventDefault(); keep(m);
    var err = $('#sErr', m);
    var filled = draft.practices.filter(function(p){ return p.name.trim() || p.how.trim(); });
    if(!filled.length || !filled[0].name.trim()){ err.textContent = 'Give the practice a name, even a short one.'; first.focus(); return; }
    for(var i=0;i<filled.length;i++){
      if(!filled[i].name.trim()){ err.textContent = 'Practice '+(i+1)+' needs a name.'; return; }
      if(filled[i].how.trim().length < 20){ err.textContent = 'Tell us a little more about how you do '+(filled.length>1?'practice '+(i+1):'it')+'.'; return; }
    }
    if(!draft.ok){ err.textContent = 'Tick the box so we know it’s okay to share.'; $('#sOk', m).focus(); return; }
    draft.practices = filled;
    send();
  });
  if(focusSel){ var el = $(focusSel, m); if(el) el.focus({preventScroll:true}); }
}
var MAILTO = 'brandonmkaufer@gmail.com';
function mailBody(){
  var out = 'TITLE: ' + mine.title + '\nNAME TO SHOW: ' + mine.by + '\n\nMY STORY\n\n' + mine.story + '\n\nWHAT HELPED\n';
  mine.practices.forEach(function(p, i){ out += '\n' + (i + 1) + '. ' + p.title + '\n' + p.text + '\n'; });
  return out + '\nIt’s okay to share my story and practices on the site. You may trim for length, never for meaning.\n';
}
function mailHref(){ return 'mailto:' + MAILTO + '?subject=' + encodeURIComponent('No biggie, here’s my story: ' + mine.title) + '&body=' + encodeURIComponent(mailBody()); }
function send(){
  mine = {title: draft.title.trim() || 'Untitled', by: draft.name.trim() || 'Anonymous', story: draft.story.trim(), blurb: firstSentence(draft.story),
    practices: draft.practices.map(function(p){ return {title:p.name.trim(), text:p.how.trim()}; })};
  draft = freshDraft(); clearDraft();
  shDone = true; shStep = 1;
  renderShare(); toForm('.fp-h');
  location.href = mailHref();
}
function wireThanks(m){
  $('#writeAgain', m).addEventListener('click', function(){ shDone = false; shStep = 1; renderShare(); toForm('#fName'); });
  $('#copyIt', m).addEventListener('click', function(){
    var txt = 'To: ' + MAILTO + '\n\n' + mailBody();
    function done(){ toast('Copied. Paste it into an email to ' + MAILTO); }
    if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, fallback); else fallback();
    function fallback(){ var ta = document.createElement('textarea'); ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); try{ document.execCommand('copy'); done(); }catch(e){ toast('Couldn’t copy. Select the text and copy it by hand.'); } document.body.removeChild(ta); }
  });
}
/* guide prompts drop a starter straight into the story box */
document.addEventListener('click', function(e){
  var s = e.target.closest('[data-start]'); if(!s) return;
  if(shDone){ shDone = false; }
  if(shStep !== 1){ keep($('#shMain')); shStep = 1; }
  renderShare(); toForm(); insertStarter(s.dataset.start);
});
document.addEventListener('click', function(e){
  var j = e.target.closest('[data-jump]'); if(!j) return;
  var el = document.getElementById(j.dataset.jump); if(!el) return;
  el.scrollIntoView({behavior: reduce?'auto':'smooth', block:'start'});
});

/* ================= story page ================= */
function renderStory(id){
  var s = BY[id]; if(!s) return;
  $('#sList').innerHTML = STORIES.map(function(x){
    return '<li><a href="#story-'+x.id+'"'+(x.id===id?' aria-current="page"':'')+'><span class="s-thumb">'+artHTML(x.thumb)+'</span><span class="s-meta"><b>'+esc(x.num)+'</b><span>'+esc(x.title)+'</span></span></a></li>';
  }).join('');
  var cur = $('#sList [aria-current]'); if(cur && window.innerWidth <= 900){ $('#sList').scrollLeft = cur.parentNode.offsetLeft - 16; }
  $('#sNum').textContent = 'Story ' + s.num;
  var tw = titleDot(s.title).split(' '), last = tw.pop();
  $('#sTitle').innerHTML = (tw.length ? esc(tw.join(' ')) + ' ' : '') + '<em>' + esc(last) + '</em>';
  $('#sMeta').innerHTML = (s.by ? '<p class="s-by">By '+esc(s.by)+'</p>' : '') + (s.cw ? '<p class="s-cw">'+esc(s.cw)+'</p>' : '');
  $('#sDeck').textContent = s.deck || '';
  $('#sBook').setAttribute('href', '#book-' + s.id);
  $('#sArt').innerHTML = artHTML(s.art, {anim:true, label:true});
  var text = '';
  if(s.paras && s.paras.length) text = s.paras.map(function(p, i){
    var sc = (s.scenes || []).filter(function(x){ return x.after === i; })[0];
    return '<p>'+esc(p)+'</p>' + (sc ? sceneFig(sc) : '');
  }).join('');
  else if(s.pending) text = '<p class="pending">Brandon’s full story is being moved over from <a href="'+esc(s.pending)+'" target="_blank" rel="noopener">nobiggieimfine.com</a>. Until then, you can read it there.</p>';
  $('#sText').innerHTML = text;
  var side = '';
  var care = s.care ? '<div class="s-aside"><p class="care">If today is heavier than a website can help with, call or text 988 (Suicide and Crisis Lifeline, US). This project is a book, not a substitute for a human who can actually be there.</p></div>' : '';
  if(s.panels){
    side = s.panels.map(function(p){
      return '<figure class="panel">'+artHTML(p.art)+'<span class="pnote" style="left:'+p.x+'%;top:'+p.y+'%">'+esc(p.note)+'</span></figure>';
    }).join('');
  } else {
    side = '<div class="s-aside">'+(s.note ? '<p class="note">'+esc(s.note)+'</p>' : '')+
      (s.care ? '<p class="care">If today is heavier than a website can help with, call or text 988 (Suicide and Crisis Lifeline, US). This project is a book, not a substitute for a human who can actually be there.</p>' : '')+'</div>';
  }
  if(!s.panels){ text += side; side = ''; }
  $('#sText').innerHTML = text;
  $('#sSide').innerHTML = side;
  $('#sSide').hidden = !side;
  $('#sGrid').classList.toggle('solo', !side);
  $('#sGrid').classList.toggle('has-scenes', !!(s.scenes && s.scenes.length));
  $('#pTitle').textContent = s.pTitle || 'What helped.';
  $('#pIntro').textContent = s.pIntro || '';
  $('#pArt').innerHTML = artHTML(s.pArt);
  $('#pRecipe').innerHTML = recipeHTML(s);
  $('#pRecipe').hidden = !s.kit;
  var grid = $('#pGrid'); grid.hidden = !!s.kit;
  grid.classList.toggle('steps-only', !!s.steps || !s.practices.some(function(p){ return p.icon; }));
  grid.innerHTML = s.practices.map(function(p, i){
    return '<li><span class="p-num">'+(i<9?'0':'')+(i+1)+'</span>'+(p.icon ? '<div class="p-icon">'+artHTML(p.icon)+'</div>' : '')+(p.title ? '<h3>'+esc(p.title)+'</h3>' : '')+'<p>'+esc(p.text)+'</p></li>';
  }).join('');
  var idx = STORIES.indexOf(s), prev = STORIES[idx-1], next = STORIES[idx+1];
  $('#sPager').innerHTML = (s.after ? '<p class="p-after" style="flex-basis:100%">'+esc(s.after)+'</p>' : '')+
    (prev ? '<a class="prev" href="#story-'+prev.id+'">'+ARROW+' '+esc(prev.title)+'</a>' : '<span></span>')+
    (next ? '<a href="#story-'+next.id+'">'+esc(next.title)+' '+ARROW+'</a>' : '<a href="#book">Open the book '+ARROW+'</a>');
  bindEyes(storyV);
}

/* ================= story mode: the book ================= */
var bookEl = $('#book'), bkL = $('#bkL'), bkR = $('#bkR'), stage = $('#bkStage'), measure = $('#bkMeasure');
var BK = {pages:[], spreads:[], si:0, mode:'spread', busy:false, sig:'', anchor:null, zine:null};

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
  if(s.kit){
    b.push('<p class="pp-sub">What you\u2019ll need</p>');
    b.push('<ul class="pp-kit">'+s.kit.map(function(k){ return '<li><span class="pk-art">'+artHTML(k.art, {fit:true})+'</span><span>'+esc(k.name)+'</span></li>'; }).join('')+'</ul>');
    b.push('<p class="pp-sub">The steps</p>');
  }
  s.practices.forEach(function(p, i){
    if(s.kit) b.push('<div class="pp-rstep"><span class="pr-art">'+artHTML(p.art, {fit:true})+'</span><div><h4><b>'+(i+1)+'</b> '+esc(p.title)+'</h4><p>'+esc(p.text)+'</p></div></div>');
    else if(s.steps) b.push('<div class="pp-item pp-step"><span class="pi-n">'+(i+1)+'</span>'+(p.title ? '<h4>'+esc(p.title)+'</h4>' : '')+'<p>'+esc(p.text)+'</p></div>');
    else b.push('<div class="pp-item'+(p.icon ? '' : ' noic')+'">'+(p.icon ? '<span class="pi-ic">'+artHTML(p.icon, {fit:true})+'</span>' : '')+'<h4>'+esc(p.title)+'</h4><p>'+esc(p.text)+'</p></div>');
  });
  if(s.after) b.push('<p class="pp-care">'+esc(s.after)+'</p>');
  b.push('<p class="pp-link"><a href="#story-'+s.id+'">Open this story’s page '+ARROW+'</a></p>');
  return b;
}
function buildZine(L, s){
  var pages = [], spread = L.mode === 'spread';
  function add(p){ pages.push(p); return p; }
  function blank(){ add({kind:'blank', cls:'bwhite bblank', key:'blank'+pages.length, html:'<p class="blank-note">This page is blank on purpose.<br>Take a breath.</p>'}); }
  add({kind:'cover', cls:'bdark zcover', key:s.id+':zcover', ch:'Cover', html:
    '<i class="staple s1" aria-hidden="true"></i><i class="staple s2" aria-hidden="true"></i>'+
    '<div class="zcp"><p class="zcp-num">No. '+s.num+'</p><div class="zcp-art">'+artHTML(s.art, {fit:true})+'</div>'+
    '<h2 class="zcp-title">'+esc(titleDot(s.title))+'</h2><p class="zcp-by">'+(s.by ? 'By '+esc(s.by) : '')+'</p>'+
    '<p class="zcp-foot"><span>No biggie, I’m fine.</span><span>A field guide</span></p>'+(s.cw ? '<p class="bo-cw">'+esc(s.cw)+'</p>' : '')+'</div>'});
  var scs = (s.scenes || []).slice().sort(function(a, b){ return a.after - b.after; });
  var segs = [], start = 0;
  scs.forEach(function(sc){ segs.push({from:start, to:sc.after, scene:sc, name: start === 0 ? 'October 2016' : (scs.filter(function(x){ return x.after === start - 1; })[0] || {}).ch}); start = sc.after + 1; });
  if(start < (s.paras || []).length) segs.push({from:start, to:s.paras.length - 1, scene:null, name:(scs[scs.length - 1] || {}).ch || 'The story'});
  segs.forEach(function(sg, k){
    paginateParas(s.paras.slice(sg.from, sg.to + 1), 'bdark btext').forEach(function(h, i){
      add({kind:'text', cls:'bdark btext', story:s, key:s.id+':z'+sg.from+'-'+i, ch: i === 0 ? sg.name : null, part: i === 0 && k === 0 ? 'The story' : null, html:h});
    });
    if(sg.scene) add({kind:'scene', cls:'bdark bscene', story:s, key:s.id+':z'+sg.scene.art, html:'<figure class="bsc">'+artHTML(sg.scene.art, {fit:true})+'<figcaption>'+esc(sg.scene.cap)+'</figcaption></figure>'});
  });
  if(spread && pages.length % 2 === 0) blank();
  paginateBlocks(practiceBlocks(s), 'bwhite bprac').forEach(function(h, i){
    var p = add({kind:'practice', cls:'bwhite bprac', story:s, key:s.id+':zprac'+i, html:h});
    if(i === 0){ p.ch = 'What you’ll need'; p.part = 'The practice'; }
    else if(h.indexOf('>The steps<') > -1) p.ch = 'The steps';
  });
  add({kind:'end', cls:'bdark zend', key:s.id+':zend', ch:'Eleven more', html:
    '<div class="endc"><h3 class="end-h">Eleven more<br><em>on the way.</em></h3><p>Stories will start getting published once I have enough.</p><p>Leave your email on the shelf and you’ll hear when the next zine is out.</p>'+
    '<p class="end-links"><a href="#stories" data-tosub>Get notified '+ARROW+'</a><a href="#stories">Back to the shelf '+ARROW+'</a></p>'+
    (s.care ? '<p class="end-care">If today is heavier than a website can help with, call or text 988 (Suicide and Crisis Lifeline, US). This project is a book, not a substitute for a human who can actually be there.</p>' : '')+'</div>'});
  if(spread && pages.length % 2 === 0) blank();
  add({kind:'back', cls:'bdark backc zback', key:s.id+':zback', html:
    '<i class="staple s1" aria-hidden="true"></i><i class="staple s2" aria-hidden="true"></i>'+
    '<div class="bc"><div class="bc-art">'+artHTML('card4', {fit:true})+'</div><p class="bc-logo">No biggie,<br>I’m fine.</p><p class="bc-sub">No. '+s.num+' of 12<br>A project by Brandon Kaufer<br>Popsy Wolf Studios © 2026</p></div>'});
  var spreads = [];
  if(spread){ spreads.push([-1, 0]); for(var i = 1; i < pages.length; i += 2) spreads.push([i, i + 1 < pages.length ? i + 1 : -1]); }
  else pages.forEach(function(_, i){ spreads.push([-1, i]); });
  BK.pages = pages; BK.spreads = spreads; BK.mode = L.mode;
  measure.innerHTML = '';
}
function buildBook(L){
  if(BK.zine && BY[BK.zine]) return buildZine(L, BY[BK.zine]);
  var pages = [], spread = L.mode === 'spread';
  function add(p){ pages.push(p); return p; }
  function blank(){ add({kind:'blank', cls:'bwhite bblank', key:'blank'+pages.length, html:'<p class="blank-note">This page is blank on purpose.<br>Take a breath.</p>'}); }

  add({kind:'cover', cls:'bdark cover', key:'cover', ch:'Cover', html:
    '<div class="cv"><p class="cv-top">Volume one</p><div class="cv-art">'+artHTML('peek', {fit:true})+'</div>'+
    '<h2 class="cv-title">No Biggie,<br><em>I’m Fine.</em></h2><p class="cv-sub">A field guide for people who push it down and power through.</p></div>'});

  var fw = paginateBlocks(['<p class="tp-logo">No biggie,<br>I’m fine.</p>', '<p class="tp-label">A note before you start</p>'].concat(FOREWORD.map(function(t){ return '<p class="tp-p">'+esc(t)+'</p>'; })), 'bwhite front');
  fw.forEach(function(h, i){ add({kind:'title', cls:'bwhite front', key:'title'+i, ch: i ? null : 'A note before you start', html:h}); });

  var ctPages = paginateBlocks(contentsBlocks(null), 'bwhite front');
  var ctStart = pages.length;
  ctPages.forEach(function(h, i){ add({kind:'contents', cls:'bwhite front', key:'contents'+i, ch: i ? null : 'Contents', html:h}); });

  var openers = [];
  STORIES.forEach(function(s){
    if(spread && pages.length % 2 === 1) blank();
    openers.push(pages.length);
    add({kind:'opener', cls:'bdark opener', story:s, key:s.id+':open', ch:'Story '+s.num+' \u00b7 '+s.title, html:
      '<div class="bo"><p class="bo-kicker">Story '+s.num+'</p><div class="bo-art">'+artHTML(s.art, {fit:true})+'</div>'+
      '<h2 class="bo-title">'+esc(titleDot(s.title))+'</h2>'+(s.by ? '<p class="bo-by">By '+esc(s.by)+'</p>' : '')+
      '<p class="bo-deck">'+esc(s.deck || s.blurb)+'</p>'+(s.cw ? '<p class="bo-cw">'+esc(s.cw)+'</p>' : '')+'</div>'});
    if(s.scenes && s.scenes.length && s.paras){
      var start = 0;
      s.scenes.slice().sort(function(a, b){ return a.after - b.after; }).forEach(function(sc){
        paginateParas(s.paras.slice(start, sc.after + 1), 'bdark btext').forEach(function(h, i){ add({kind:'text', cls:'bdark btext', story:s, key:s.id+':text'+start+'-'+i, html:h}); });
        add({kind:'scene', cls:'bdark bscene', story:s, key:s.id+':'+sc.art, html:'<figure class="bsc">'+artHTML(sc.art, {fit:true})+'<figcaption>'+esc(sc.cap)+'</figcaption></figure>'});
        start = sc.after + 1;
      });
      if(start < s.paras.length) paginateParas(s.paras.slice(start), 'bdark btext').forEach(function(h, i){ add({kind:'text', cls:'bdark btext', story:s, key:s.id+':textend'+i, html:h}); });
    } else {
    var tp = (s.paras && s.paras.length) ? paginateParas(s.paras, 'bdark btext') :
      ['<p>Brandon’s full story is being moved over from nobiggieimfine.com. Until then, you can read it there.</p><p><a href="'+esc(s.pending || 'https://nobiggieimfine.com/')+'" target="_blank" rel="noopener">Read “'+esc(s.title)+'” on nobiggieimfine.com '+ARROW+'</a></p>'];
    tp.forEach(function(h, i){ add({kind:'text', cls:'bdark btext', story:s, key:s.id+':text'+i, html:h}); });
    }
    if(s.panels){
      add({kind:'panels', cls:'bdark panels', story:s, key:s.id+':panels', html:'<div class="bpanels">'+s.panels.map(function(p){
        return '<figure class="panel">'+artHTML(p.art)+'<span class="pnote" style="left:'+p.x+'%;top:'+p.y+'%">'+esc(p.note)+'</span></figure>';
      }).join('')+'</div>'});
    }
    paginateBlocks(practiceBlocks(s), 'bwhite bprac').forEach(function(h, i){ add({kind:'practice', cls:'bwhite bprac', story:s, key:s.id+':prac'+i, ch: i ? null : 'The practice', html:h}); });
  });

  add({kind:'end', cls:'bwhite front endp', key:'end', ch:'Your turn', html:
    '<div class="endc"><h3 class="end-h">Your turn.</h3><p>Got through something? Tell me about the hard thing and the thing you did to get through it.</p><p>Stories will start getting published once I have enough.</p>'+
    '<p class="end-links"><a href="https://nobiggieimfine.com/#form" target="_blank" rel="noopener">Leave it here '+ARROW+'</a><a href="#top">Back to home '+ARROW+'</a></p>'+
    '<p class="end-care">If today is heavier than a website can help with, call or text 988 (Suicide and Crisis Lifeline, US).</p></div>'});
  if(spread && pages.length % 2 === 0) blank();
  add({kind:'back', cls:'bdark backc', key:'back', html:
    '<div class="bc"><div class="bc-art">'+artHTML('card4', {fit:true})+'</div><p class="bc-logo">No biggie,<br>I’m fine.</p><p class="bc-sub">A project by Brandon Kaufer<br>Popsy Wolf Studios © 2026</p></div>'});

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
  if(p.kind === 'text' || p.kind === 'practice' || p.kind === 'panels' || p.kind === 'scene'){
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
  var zs = BK.zine && BY[BK.zine];
  $('#bkWhere').textContent = zs ? 'No. ' + zs.num + ' \u00b7 ' + zs.title : (story ? 'Story ' + story.num + ' · ' + story.title : 'No Biggie, I’m Fine');
  BK.anchor = BK.pages[shown[shown.length - 1]] ? BK.pages[shown[shown.length - 1]].key : null;
  var want = zs ? '#zine-' + zs.id : (story ? '#book-' + story.id : '#book');
  var cur = 0; for(var q = 0; q <= shown[shown.length - 1]; q++){ if(BK.pages[q] && BK.pages[q].ch) cur = q; }
  $$('#bkIndex [data-goto]').forEach(function(a){ var on = +a.dataset.goto === cur; a.classList.toggle('on', on); if(on) a.setAttribute('aria-current','true'); else a.removeAttribute('aria-current'); });
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
  var sig = L.mode + ':' + L.pw + 'x' + L.ph + ':' + (BK.zine || 'book');
  if(sig === BK.sig) return false;
  var keep = BK.anchor;
  applyLayout(L);
  buildBook(L);
  buildIndex();
  BK.sig = sig;
  BK.si = 0;
  if(keep){ for(var i = 0; i < BK.pages.length; i++){ if(BK.pages[i].key === keep){ BK.si = spreadOf(i); break; } } }
  return true;
}
var prevNonBook = '#top', bookOpen = false;
function buildIndex(){
  var last = null;
  $('#bkIndexList').innerHTML = BK.pages.map(function(p, i){
    if(!p.ch) return '';
    var head = (p.part && p.part !== last) ? '<li class="bki-part">'+esc(p.part)+'</li>' : ''; if(p.part) last = p.part;
    return head + '<li><button type="button" data-goto="'+i+'"><span>'+esc(p.ch)+'</span><span class="bki-pg">'+(i ? i : '')+'</span></button></li>';
  }).join('');
  $('#bkIndexTitle').textContent = BK.zine ? 'In this zine' : 'In this book';
}
function toggleIndex(open){
  var p = $('#bkIndex'), btn = $('#bkToc');
  if(open === undefined) open = p.hidden;
  p.hidden = !open; btn.setAttribute('aria-expanded', String(open));
  if(open){ var on = $('#bkIndex .on') || $('#bkIndex [data-goto]'); if(on) on.focus(); }
}
function openBook(storyId, zineId){
  show('book');
  var z = zineId && BY[zineId] ? zineId : null;
  if(z !== BK.zine){ BK.zine = z; BK.sig = ''; BK.anchor = null; bookOpen = false; }
  bookV.classList.toggle('is-zine', !!z);
  $('#bkClose').setAttribute('href', z ? '#stories' : prevNonBook);
  $('#bkClose').lastChild.nodeValue = z ? ' Back to the shelf' : ' Close the book';
  toggleIndex(false);
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
function closeBook(){ location.hash = BK.zine ? '#stories' : prevNonBook; }

$('#bkPrev').addEventListener('click', function(){ turn(-1); });
$('#bkNext').addEventListener('click', function(){ turn(1); });
$('#bkPrevSide').addEventListener('click', function(){ turn(-1); });
$('#bkNextSide').addEventListener('click', function(){ turn(1); });
$('#bkScrub').addEventListener('input', function(){ if(BK.busy) return; BK.si = +this.value; renderBook(); });
$('#bkToc').addEventListener('click', function(e){ e.stopPropagation(); toggleIndex(); });
$('#bkIndex').addEventListener('click', function(e){
  var g = e.target.closest('[data-goto]');
  if(g){ goToPage(+g.dataset.goto); toggleIndex(false); try{ bookEl.focus({preventScroll:true}); }catch(err){} }
  else if(e.target.closest('.bki-x')) toggleIndex(false);
});
document.addEventListener('click', function(e){ if(!$('#bkIndex').hidden && !e.target.closest('#bkIndex,#bkToc')) toggleIndex(false); });
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
  else if(e.key === 'Escape'){ if(!$('#bkIndex').hidden){ toggleIndex(false); $('#bkToc').focus(); } else closeBook(); }
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
  storyV.hidden = view !== 'story'; bookV.hidden = view !== 'book'; submitV.hidden = view !== 'submit';
  var chrome = view === 'home' || view === 'stories' || view === 'about' || view === 'submit';
  topH.hidden = !(chrome || view === 'story'); siteFoot.hidden = !chrome;
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
  if(h.indexOf('zine-') === 0 && BY[h.slice(5)]){ if(current !== 'book' || BK.zine !== h.slice(5)) openBook(null, h.slice(5)); return; }
  if(h === 'book' || h.indexOf('book-') === 0){ if(current !== 'book' || BK.zine) openBook(h.slice(5)); return; }
  prevNonBook = '#' + (h || 'top');
  if(h.indexOf('story-') === 0 && BY[h.slice(6)]){ show('story'); renderStory(h.slice(6)); scrollTop(); req(); return; }
  if(h === 'stories'){ var w1 = current; show('stories'); renderStoriesPage(); if(w1 !== 'stories') scrollTop(); req(); return; }
  if(h === 'submit'){ var w3 = current; show('submit'); if(w3 !== 'submit'){ renderShare(); scrollTop(); } bindEyes(submitV); req(); return; }
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
window.__nbif = {BK:BK, renderBook:renderBook};
})();
