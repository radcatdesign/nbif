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
var mine = null;
function getStory(id){ return id === 'yours' ? mine : BY[id]; }
function allStories(){ return mine ? STORIES.concat([mine]) : STORIES; }

var PRACTICES = {
  outside:{title:'Get outside', deck:'A change of scene helps me see things a little clearer.', steps:[
    'Step out the door. The porch counts. The parking lot counts.',
    'Find three things you didn’t notice yesterday. A crack in the sidewalk is fine.',
    'Stay for five minutes before you decide how you feel about it.']},
  air:{title:'Fresh air', deck:'Three slow rounds. In for four, hold for four, out for six.', breath:true},
  steps:{title:'Small steps', deck:'I don’t have to solve everything today. I just have to take the next step.', steps:[
    'Write down the one thing that’s bugging you most.',
    'Shrink it until the next step takes less than ten minutes.',
    'Do that step. Then you’re allowed to stop.']},
  write:{title:'Write it out', deck:'Getting thoughts on paper helps me stop carrying them around in my head.', write:true}
};
var PORDER = ['outside','air','steps','write'];
var PRODUCTS = {
  'practice-deck':{name:'Practice deck', price:22, cat:'paper', tag:'New', desc:'Practices from the stories, one per card. Pull one when you need it.', details:['24 cards','Tuck box','Pairs with the story deck online']},
  tee:{name:'Tee', price:32, cat:'wear', desc:'Heavyweight cotton tee with the sitting creature on the chest.', details:['100% cotton','One-color print','Sizes S to XXL'], sizes:['S','M','L','XL','XXL']},
  mug:{name:'Mug', price:18, cat:'home', desc:'The creature peeks up over the rim while you drink.', details:['12 oz ceramic','Dishwasher safe']},
  'print-weight':{name:'The Weight I Carry print', price:34, cat:'home', desc:'The featured story’s creature, sitting it out under the cloud.', details:['11 × 14 in','Unframed','Matte paper']},
  notebook:{name:'Notebook', price:16, cat:'paper', desc:'Spiral notebook for brain dumps, lists, and the stuff you don’t say out loud.', details:['A5, 120 pages','Dot grid']},
  zine:{name:'Zine No. 1', price:12, cat:'paper', desc:'Six stories and their practices, small enough for a back pocket.', details:['24 pages','Saddle stitched']},
  tote:{name:'Tote', price:24, cat:'wear', desc:'A canvas tote for carrying things. Literally.', details:['Natural canvas','Long handles']},
  'print-stuck':{name:'Stuck and Still Here print', price:34, cat:'home', desc:'Peeking over the desk. Still here.', details:['11 × 14 in','Unframed','Matte paper']},
  stickers:{name:'Sticker sheet', price:6, cat:'paper', desc:'Four creatures for a laptop, a water bottle, or a friend who needs one.', details:['Four vinyl stickers','Weatherproof']},
  pin:{name:'Enamel pin', price:10, cat:'wear', desc:'The crowned creature, for days that call for a crown.', details:['1.25 in','Hard enamel','Rubber clutch']},
  postcards:{name:'Postcard set', price:14, cat:'paper', desc:'Three creatures for checking in on someone without saying too much.', details:['Set of 3','Blank backs','5 × 7 in']},
  print:{name:'Night print', price:28, cat:'home', desc:'Moon over the mountains, for the quiet hours.', details:['8 × 10 in','Unframed','Matte paper']}
};
var PORDER_SHOP = ['practice-deck','tee','mug','print-weight','notebook','zine','tote','print-stuck','stickers','pin','postcards','print'];
var CATS = [['all','All'],['wear','Wear'],['home','Home'],['paper','Paper']];

/* ================= helpers ================= */
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function titleDot(t){ return /[.!?)]$/.test(t) ? t : t + '.'; }
function artHTML(name, opts){
  opts = opts || {};
  var node = null, src = document.querySelector('#homeView .art--'+name);
  if(src) node = src.cloneNode(true);
  else if(ARTLIB[name]){ var t = document.createElement('template'); t.innerHTML = ARTLIB[name]; node = t.content.firstElementChild; }
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

/* ================= sheet ================= */
var sheet = $('#sheet'), body = $('#sheetBody'), lastFocus = null, onClose = null;
function openSheet(html, after, dark, opts){
  if(onClose){ var f = onClose; onClose = null; f(); }
  sheet.classList.toggle('is-dark', !!dark);
  sheet.classList.toggle('is-wide', !!(opts && opts.wide));
  body.innerHTML = html;
  if(!sheet.open){ lastFocus = document.activeElement; sheet.showModal(); }
  $('.sheet-in', sheet).scrollTop = 0;
  var h = $('h2', body); if(h) h.id = 'sheetTitle';
  bindEyes(body);
  if(after) after(body);
}
function closeSheet(){ if(sheet.open) sheet.close(); }
sheet.addEventListener('close', function(){
  if(onClose){ var f = onClose; onClose = null; f(); }
  body.innerHTML = '';
  if(lastFocus && lastFocus.focus && document.body.contains(lastFocus)) lastFocus.focus({preventScroll:true});
});
$('#sheetClose').addEventListener('click', closeSheet);
sheet.addEventListener('click', function(e){ if(e.target === sheet) closeSheet(); });
function go(hash){ closeSheet(); if(location.hash === hash) route(); else location.hash = hash; }

/* home practice sheets (practices are paper) */
function practiceHTML(id){
  var p = PRACTICES[id];
  var h = '<p class="kicker">Practice</p><h2>'+esc(p.title)+'</h2><p class="deck">'+esc(p.deck)+'</p>';
  if(p.steps) h += '<ol>'+p.steps.map(function(s){return '<li>'+esc(s)+'</li>'}).join('')+'</ol>';
  if(p.breath){
    h += '<div class="breath" aria-hidden="true"><svg viewBox="-60 -60 120 120"><g class="rays" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">'+
      [0,1,2,3,4,5,6,7,8,9,10,11].map(function(i){var a=i*Math.PI/6, r1=34+(i%2?4:0), r2=r1+(i%2?6:10);return '<line x1="'+(Math.cos(a)*r1).toFixed(1)+'" y1="'+(Math.sin(a)*r1).toFixed(1)+'" x2="'+(Math.cos(a)*r2).toFixed(1)+'" y2="'+(Math.sin(a)*r2).toFixed(1)+'"/>'}).join('')+
      '</g><circle class="orb" r="24" fill="none" stroke="currentColor" stroke-width="2.6"/></svg></div>'+
      '<p class="breath-label" id="breathLabel">Ready when you are</p>'+
      '<div class="row" style="justify-content:center"><button class="btn btn--ink" type="button" id="breathGo">Start</button></div>';
  }
  if(p.write){
    h += '<div class="field"><label for="carry">What are you carrying today?</label><textarea id="carry" class="putdown" placeholder="Write it down. All of it, or just one line."></textarea></div>'+
      '<div class="row"><button class="btn btn--ink" type="button" id="putDown">Put it down '+ARROW+'</button></div>'+
      '<p class="fine">Nothing you type here is saved or sent anywhere. When you put it down, it’s gone.</p>';
  }
  if(p.steps) h += '<div class="row"><button class="btn btn--line" type="button" data-pnext="'+id+'">Next practice '+ARROW+'</button></div>';
  return h;
}
function showPractice(id){
  openSheet(practiceHTML(id), function(b){
    var nx = $('[data-pnext]', b);
    if(nx) nx.addEventListener('click', function(){ showPractice(PORDER[(PORDER.indexOf(id)+1)%PORDER.length]); });
    if(PRACTICES[id].breath) setupBreath(b);
    if(PRACTICES[id].write) setupWrite(b);
  });
}
function setupBreath(b){
  var goBtn = $('#breathGo', b), label = $('#breathLabel', b), orb = $('.orb', b), rays = $('.rays', b);
  var timers = [], running = false, phases = [['Breathe in',4,1.55],['Hold',4,1.55],['Breathe out',6,1]];
  function clear(){ timers.forEach(clearTimeout); timers = []; }
  function stop(msg){
    clear(); running = false; goBtn.textContent = 'Start';
    orb.style.transitionDuration = rays.style.transitionDuration = '1.2s';
    orb.style.transform = ''; rays.style.transform = ''; label.textContent = msg || 'Ready when you are';
  }
  function run(){
    running = true; goBtn.textContent = 'Stop';
    var t = 0, rounds = 3;
    for(var r=0;r<rounds;r++){
      phases.forEach(function(ph){
        (function(start, name, secs, scale, round){
          for(var s=0;s<secs;s++){
            (function(sec){
              timers.push(setTimeout(function(){
                label.textContent = name+'  '+(secs-sec)+'   ·   round '+(round+1)+' of '+rounds;
                if(sec===0 && !reduce){
                  orb.style.transitionDuration = rays.style.transitionDuration = secs+'s';
                  orb.style.transform = 'scale('+scale+')';
                  rays.style.transform = 'scale('+(0.85+scale*.2)+') rotate('+(scale>1?20:0)+'deg)';
                }
              }, (start+sec)*1000));
            })(s);
          }
        })(t, ph[0], ph[1], ph[2], r);
        t += ph[1];
      });
    }
    timers.push(setTimeout(function(){ stop('Nice. Still here.'); }, t*1000));
  }
  goBtn.addEventListener('click', function(){ running ? stop() : run(); });
  onClose = clear;
}
function setupWrite(b){
  var ta = $('#carry', b), btn = $('#putDown', b);
  btn.addEventListener('click', function(){
    if(!ta.value.trim()){ ta.focus(); return; }
    ta.classList.add('gone');
    setTimeout(function(){ ta.value=''; ta.classList.remove('gone'); ta.placeholder='Set down. Pick something else up, or don’t.'; }, reduce?0:1100);
  });
}

/* index sheets: the stories list is dark, the practices list is paper */
function indexStories(){
  openSheet('<p class="kicker">All stories</p><h2>Stories</h2><p class="deck">Real people. Real things. Every story comes with a practice.</p><ul class="index">'+
    allStories().map(function(s){ return '<li><button type="button" data-go="#story-'+s.id+'">'+esc(s.num)+' · '+esc(s.title)+' <span>Read</span></button></li>'; }).join('')+
    '</ul><div class="row"><button class="btn btn--line" type="button" data-go="#deck">Swipe the deck '+ARROW+'</button></div>', null, true);
}
function indexPractices(){
  openSheet('<p class="kicker">All practices</p><h2>Practices</h2><p class="deck">They don’t fix everything, but they help.</p><ul class="index">'+
    PORDER.map(function(id){ return '<li><button type="button" data-open-practice="'+id+'">'+esc(PRACTICES[id].title)+' <span>Try it</span></button></li>'; }).join('')+'</ul>');
}
function aboutHTML(){
  return '<p class="kicker">About</p><h2>No biggie, I’m fine.</h2>'+
    '<div class="sheet-art dark">'+artHTML('card4')+'</div>'+
    '<div class="prose"><p>It’s what we say when it isn’t, quite. This project lives in that gap.</p>'+
    '<p>Stories from real people, told plainly, each one paired with a practice that helped. Creatures drawn to look the way a long day feels. Everyday things, like a mug or a notebook, that make it a little easier to say “same.”</p>'+
    '<p>It isn’t therapy and it isn’t a fix. It’s company.</p></div>'+
    '<p class="fine">If you’re in crisis or thinking about hurting yourself, please reach out now. In the US, call or text 988. Elsewhere, contact your local emergency number.</p>';
}

/* ================= submission page: 1) story (dark)  2) what helped (paper) ================= */
var draft = freshDraft();
function freshDraft(){ return {name:'', title:'', story:'', practices:[{name:'', how:''}], ok:false}; }
var QUICK = ['Get outside','Fresh air','Small steps','Write it out'];
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
    '<div class="field"><label for="fTitle">Give it a title</label><input type="text" id="fTitle" placeholder="Stuck and still here" value="'+esc(draft.title)+'"></div>'+
    '<div class="field"><label for="fStory">Your story</label><textarea id="fStory" placeholder="Where you were, what it felt like, what you did, where you are now. Messy is fine.">'+esc(draft.story)+'</textarea></div>'+
    '<div class="fmeta"><span id="wc">'+wcText()+'</span><span id="dStat">'+(hasDraft()?'Draft saved on this device':'')+'</span></div>'+
    '<div class="starters"><span class="flabel" id="startLbl">Stuck? Start a paragraph with</span><div class="chips" role="group" aria-labelledby="startLbl">'+
      STARTERS.map(function(s){ return '<button type="button" class="chip" data-insert="'+esc(s)+'">'+esc(s)+'…</button>'; }).join('')+'</div></div>'+
    '<p class="err" id="sErr" role="alert"></p>'+
    '<div class="fp-row"><button class="btn btn--paper" type="submit">Next: what helped '+ARROW+'</button></div>'+
    '</form><p class="fp-fine">Your draft stays on this device until you send it. This preview doesn’t send anything yet.</p></div>';
}
function pblockHTML(p, i){
  var chips = i === 0 ? '<div class="field"><span class="flabel" id="quickLbl">Pick one of ours, or name your own</span><div class="chips" role="group" aria-labelledby="quickLbl">'+
      QUICK.map(function(q){ return '<button type="button" class="chip qchip" aria-pressed="'+(p.name===q)+'">'+esc(q)+'</button>'; }).join('')+'</div></div>' : '';
  return '<div class="pblock" data-i="'+i+'">'+(i>0?'<h3>Practice '+(i+1)+'</h3><button type="button" class="rm" data-rm="'+i+'">Remove</button>':'')+chips+
    '<div class="field"><label for="pName'+i+'">Name your practice</label><input type="text" id="pName'+i+'" class="pname" placeholder="'+(i===0?'Ten quiet minutes before my phone':'Another thing that helped')+'" value="'+esc(p.name)+'"></div>'+
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
    '</form><p class="fp-fine">This preview doesn’t send anything yet.</p></div>';
}
function thanksHTML(){
  var who = mine.by;
  return '<div class="fpanel fp-paper fp-thanks"><p class="fp-kicker">Sent</p><h3 class="fp-h">Thank you, '+esc(who)+'.</h3>'+
    '<p class="fp-lede">Thanks for trusting us with this. Someone is going to read what you carried and find a place to start. Your card is on the right, and it’s first in the deck.</p>'+
    '<div class="fp-row"><a class="btn btn--ink" href="#deck">See it in the deck '+ARROW+'</a><a class="btn btn--line" href="#story-yours">Preview your page</a></div>'+
    '<div class="fp-row" style="margin-top:12px"><button class="textlink" type="button" id="writeAgain">Write another story '+ARROW+'</button></div>'+
    '<p class="fp-fine">This preview doesn’t send anything yet, so nothing left this page.</p></div>';
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
  return {id:'preview', num:'Yours', preview:true, title: draft.title.trim() || 'Your title', by: draft.name.trim() || 'Anonymous',
    blurb: firstSentence(draft.story) || 'Your first line shows up here.', art:'card1', thumb:'card1',
    practices: ps.map(function(p){ return {title: p.name.trim() || 'Your practice', text: p.how.trim() || 'How you do it, and what it changed, shows up here.'}; })};
}
function updatePreview(){
  var holder = $('#pvCard'); if(!holder) return;
  holder.innerHTML = cardHTML(previewStory());
  var c = $('.dcard', holder);
  if(!shDone){ var a = $('.dc-more a', c); if(a){ var sp = document.createElement('span'); sp.textContent = 'Preview'; a.parentNode.replaceChild(sp, a); } }
  if(pvFlipped) c.classList.add('flipped');
  c.setAttribute('role','button'); c.setAttribute('tabindex','0');
  c.setAttribute('aria-label', 'Card preview, showing the '+(pvFlipped?'practice':'story')+' side. Press to flip.');
  function toggle(){ pvFlipped = !pvFlipped; c.classList.toggle('flipped', pvFlipped); c.setAttribute('aria-label', 'Card preview, showing the '+(pvFlipped?'practice':'story')+' side. Press to flip.'); }
  c.addEventListener('click', function(e){ if(e.target.closest('a')) return; toggle(); });
  c.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggle(); } });
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
  var f = $('#stepForm', m), first = $('#pName0', m), chips = $$('.qchip', m);
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
function send(){
  var who = draft.name.trim() || 'Anonymous';
  var paras = draft.story.trim().split(/\n\s*\n|\n/).map(function(p){ return p.trim(); }).filter(Boolean);
  var fl = firstSentence(draft.story);
  mine = {id:'yours', num:'Yours', title: draft.title.trim() || 'Untitled', by: who, blurb: fl, deck: fl, art:'card1', thumb:'card1', pArt:'walker', note:'Thank you.', preview:true,
    paras: paras, pTitle:'What helped me.', pIntro:'In ' + (who === 'Anonymous' ? 'their' : who + '’s') + ' own words. Try one this week.',
    practices: draft.practices.map(function(p){ return {title:p.name.trim(), text:p.how.trim()}; })};
  draft = freshDraft(); clearDraft();
  deckReset = true; shDone = true; shStep = 1;
  renderShare(); toForm('.fp-h');
  toast('Story sent. Thank you.');
}
function wireThanks(m){
  $('#writeAgain', m).addEventListener('click', function(){ shDone = false; shStep = 1; renderShare(); toForm('#fName'); });
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

/* ================= product art ================= */
function artInner(name){
  var html = artHTML(name); if(!html) return null;
  var t = document.createElement('template'); t.innerHTML = html; var svg = t.content.firstElementChild;
  return {vb: svg.getAttribute('viewBox'), inner: svg.innerHTML};
}
function productArt(id){
  switch(id){
    case 'tee': return '<div class="pa">'+artHTML('tee', {fit:true})+'</div>';
    case 'mug': return '<div class="pa">'+artHTML('mug', {fit:true})+'</div>';
    case 'notebook': return '<div class="pa">'+artHTML('nbook', {fit:true})+'</div>';
    case 'print': return '<div class="pa pa--print">'+artHTML('print', {fit:true})+'</div>';
    case 'zine': return '<div class="pa"><span class="pa-zine"><span class="zine"><span class="zt">Zine<br>No. 1</span>'+artHTML('card1')+'</span></span></div>';
    case 'stickers': return '<div class="pa"><span class="pa-stk"><span class="stickers"><span class="dot">'+artHTML('card1')+'</span><span class="dot">'+artHTML('card4')+'</span><span class="dot">'+artHTML('card3')+'</span><span class="dot">'+artHTML('card2')+'</span></span></span></div>';
    case 'tote':
      var c4 = artInner('card4');
      return '<div class="pa"><svg class="pa-tote" viewBox="0 0 100 124" aria-hidden="true">'+
        '<path class="t-line" d="M33 40 C32 14 44 6 50 6 C57 6 68 14 67 40"/><path class="t-line" d="M38 40 C38 21 45 13 50 13 C56 13 62 21 62 40"/>'+
        '<path class="t-bag" d="M14 38.5 L86.5 37.8 L89 119.5 L11.5 120.4 Z"/>'+
        (c4 ? '<svg x="21" y="50" width="58" height="64" viewBox="'+c4.vb+'" preserveAspectRatio="xMidYMid meet">'+c4.inner+'</svg>' : '')+
        '</svg></div>';
    case 'pin': return '<div class="pa"><span class="pa-pin">'+artHTML('card4')+'</span></div>';
    case 'postcards': return '<div class="pa"><span class="pa-cards"><span class="pc">'+artHTML('card2')+'</span><span class="pc">'+artHTML('card3')+'</span><span class="pc">'+artHTML('card1')+'</span></span></div>';
    case 'print-weight': return '<div class="pa"><span class="pa-frame"><span class="fin">'+artHTML('featured', {fit:true})+'</span></span></div>';
    case 'print-stuck': return '<div class="pa"><span class="pa-frame"><span class="fin">'+artHTML('stuck_hero', {fit:true})+'</span></span></div>';
    case 'practice-deck': return '<div class="pa"><span class="pa-deck"><i></i><i></i><span class="top"><small>Practice 01</small><span class="ic">'+artHTML('i_boots', {fit:true})+'</span><b>Move my body.</b></span></span></div>';
  }
  return '<div class="pa"></div>';
}

/* ================= cart ================= */
var cart = {};
function cartKey(id, size){ return size ? id + '|' + size : id; }
function cartCount(){ var n=0; for(var k in cart) n+=cart[k]; return n; }
function renderCount(){
  var n = cartCount();
  $$('.cart-count').forEach(function(s){ s.textContent = n; });
  $$('[data-cart]').forEach(function(c){ c.classList.remove('bump'); void c.offsetWidth; if(!reduce) c.classList.add('bump'); });
}
function addToCart(id, size, qty){
  var k = cartKey(id, size); cart[k] = (cart[k]||0) + (qty||1); renderCount();
  toast(PRODUCTS[id].name + (size ? ' (' + size + ')' : '') + ' added. Cart (' + cartCount() + ')');
}
function cartHTML(){
  var keys = Object.keys(cart).filter(function(k){ return cart[k] > 0; });
  if(!keys.length) return '<p class="kicker">Cart</p><h2>Nothing in here yet.</h2><p class="deck">Pick something from the shop. A mug is a good start.</p><div class="row"><button class="btn btn--ink" type="button" data-go="#store">Go to the shop '+ARROW+'</button></div>';
  var total = 0;
  var rows = keys.map(function(k){
    var parts = k.split('|'), p = PRODUCTS[parts[0]], label = p.name + (parts[1] ? ' · ' + parts[1] : '');
    total += p.price * cart[k];
    return '<li><span>'+esc(label)+'</span><span class="qty"><button type="button" data-q="-1" data-k="'+esc(k)+'" aria-label="Remove one '+esc(label)+'">−</button><span>'+cart[k]+'</span><button type="button" data-q="1" data-k="'+esc(k)+'" aria-label="Add one '+esc(label)+'">+</button></span><span>$'+(p.price*cart[k])+'</span></li>';
  }).join('');
  return '<p class="kicker">Cart</p><h2>Your things.</h2><ul class="cart-list">'+rows+'</ul><p class="total"><span>Subtotal</span><span>$'+total+'</span></p>'+
    '<p class="fine">Checkout isn’t connected in this preview. Shipping and tax get added at checkout.</p>'+
    '<div class="row"><button class="btn btn--line" type="button" data-go="#store">Keep shopping</button></div>';
}
function showCart(){
  openSheet(cartHTML(), function(b){
    $$('[data-q]', b).forEach(function(q){
      q.addEventListener('click', function(){ var k = q.dataset.k; cart[k] = Math.max(0, (cart[k]||0) + (+q.dataset.q)); if(!cart[k]) delete cart[k]; renderCount(); showCart(); });
    });
  });
}
document.addEventListener('click', function(e){ if(e.target.closest('[data-cart]')) showCart(); });

/* quick view */
function showProduct(id){
  var p = PRODUCTS[id]; if(!p) return;
  var size = p.sizes ? 'M' : null, qty = 1;
  var html = '<div class="qv"><div class="qv-art">'+productArt(id)+'</div><div class="qv-info">'+
    '<p class="kicker">'+esc(CATS.filter(function(c){ return c[0]===p.cat; })[0][1])+'</p><h2>'+esc(p.name)+'</h2>'+
    '<p class="qv-price">$'+p.price+'</p><p class="qv-desc">'+esc(p.desc)+'</p>'+
    '<ul class="qv-list">'+p.details.map(function(d){ return '<li>'+esc(d)+'</li>'; }).join('')+'</ul>'+
    (p.sizes ? '<div class="qv-opt"><span class="flabel" id="szLbl">Size</span><div class="chips" role="group" aria-labelledby="szLbl">'+p.sizes.map(function(s){ return '<button type="button" class="chip sz" aria-pressed="'+(s===size)+'">'+s+'</button>'; }).join('')+'</div></div>' : '')+
    '<div class="qv-buy"><span class="qty" aria-label="Quantity"><button type="button" id="qMinus" aria-label="One fewer">−</button><span id="qN">1</span><button type="button" id="qPlus" aria-label="One more">+</button></span>'+
    '<button class="btn btn--ink" type="button" id="qAdd">Add to cart · $<span id="qTot">'+p.price+'</span></button></div>'+
    '<p class="fine">Checkout isn’t connected in this preview.</p></div></div>';
  openSheet(html, function(b){
    function upd(){ $('#qN', b).textContent = qty; $('#qTot', b).textContent = p.price * qty; }
    $$('.sz', b).forEach(function(c){ c.addEventListener('click', function(){ size = c.textContent; $$('.sz', b).forEach(function(x){ x.setAttribute('aria-pressed', String(x === c)); }); }); });
    $('#qMinus', b).addEventListener('click', function(){ qty = Math.max(1, qty-1); upd(); });
    $('#qPlus', b).addEventListener('click', function(){ qty = Math.min(20, qty+1); upd(); });
    $('#qAdd', b).addEventListener('click', function(){ addToCart(id, size, qty); closeSheet(); });
  }, false, {wide:true});
}
$$('.product').forEach(function(p){
  p.setAttribute('aria-label', 'View '+PRODUCTS[p.dataset.id].name+', $'+PRODUCTS[p.dataset.id].price);
  p.addEventListener('click', function(){ showProduct(p.dataset.id); });
});
var rail = $('#rail');
$('#railNext').addEventListener('click', function(){
  var first = $('.product', rail); var step = first.getBoundingClientRect().width + parseFloat(getComputedStyle(rail).columnGap || 20);
  var atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
  rail.scrollTo({left: atEnd ? 0 : rail.scrollLeft + step, behavior: reduce?'auto':'smooth'});
});

/* ================= shop page ================= */
var stFilter = 'all', stSortBy = 'featured', stBuilt = false;
function buildStore(){
  if(stBuilt) return; stBuilt = true;
  $('#stGrid').innerHTML = PORDER_SHOP.map(function(id){
    var p = PRODUCTS[id];
    return '<article class="pcard" data-id="'+id+'" data-cat="'+p.cat+'">'+
      '<button class="pc-frame" type="button" data-view="'+id+'" aria-label="View '+esc(p.name)+'">'+productArt(id)+(p.tag ? '<span class="pc-tag">'+esc(p.tag)+'</span>' : '')+'<span class="pc-view" aria-hidden="true">Quick view</span></button>'+
      '<div class="pc-meta"><h3>'+esc(p.name)+'</h3><span class="pc-price">$'+p.price+'</span></div>'+
      '<p class="pc-desc">'+esc(p.desc)+'</p>'+
      '<button class="pc-add" type="button" data-add="'+id+'">'+(p.sizes ? 'Choose a size' : 'Add to cart +')+'</button></article>';
  }).join('');
  bindEyes($('#stGrid'));
  $('#stFilters').innerHTML = CATS.map(function(c){
    var n = c[0]==='all' ? PORDER_SHOP.length : PORDER_SHOP.filter(function(id){ return PRODUCTS[id].cat === c[0]; }).length;
    return '<button type="button" class="chip" data-cat="'+c[0]+'" aria-pressed="'+(c[0]===stFilter)+'">'+c[1]+' <span>'+n+'</span></button>';
  }).join('');
  $('#stFilters').addEventListener('click', function(e){
    var c = e.target.closest('[data-cat]'); if(!c) return;
    stFilter = c.dataset.cat; $$('[data-cat]', $('#stFilters')).forEach(function(x){ x.setAttribute('aria-pressed', String(x === c)); }); applyStore();
  });
  $('#stSort').addEventListener('change', function(){ stSortBy = this.value; applyStore(); });
  $('#stGrid').addEventListener('click', function(e){
    var v = e.target.closest('[data-view]'); if(v){ showProduct(v.dataset.view); return; }
    var a = e.target.closest('[data-add]'); if(!a) return;
    var id = a.dataset.add;
    if(PRODUCTS[id].sizes){ showProduct(id); return; }
    addToCart(id, null, 1);
    a.textContent = 'Added ✓'; a.classList.add('added');
    setTimeout(function(){ a.textContent = 'Add to cart +'; a.classList.remove('added'); }, 1600);
  });
  applyStore();
}
function applyStore(){
  var grid = $('#stGrid'), cards = $$('.pcard', grid);
  var order = PORDER_SHOP.slice();
  if(stSortBy === 'low') order.sort(function(a,b){ return PRODUCTS[a].price - PRODUCTS[b].price || PORDER_SHOP.indexOf(a) - PORDER_SHOP.indexOf(b); });
  if(stSortBy === 'high') order.sort(function(a,b){ return PRODUCTS[b].price - PRODUCTS[a].price || PORDER_SHOP.indexOf(a) - PORDER_SHOP.indexOf(b); });
  var shown = 0;
  order.forEach(function(id){
    var c = cards.filter(function(x){ return x.dataset.id === id; })[0];
    var on = stFilter === 'all' || PRODUCTS[id].cat === stFilter;
    c.hidden = !on; if(on) shown++;
    grid.appendChild(c);
  });
  var label = stFilter === 'all' ? '' : ' in ' + CATS.filter(function(x){ return x[0]===stFilter; })[0][1].toLowerCase();
  $('#stCount').textContent = shown + ' thing' + (shown===1?'':'s') + label;
}

/* ================= story page ================= */
var storyV = $('#storyView'), homeV = $('#homeView'), deckV = $('#deckView'), shareV = $('#shareView'), storeV = $('#storeView');
function renderStory(id){
  var s = getStory(id); if(!s) return;
  var list = allStories();
  $('#sList').innerHTML = list.map(function(x){
    return '<li><a href="#story-'+x.id+'"'+(x.id===id?' aria-current="page"':'')+'><span class="s-thumb">'+artHTML(x.thumb)+'</span><span class="s-meta"><b>'+esc(x.num)+'</b><span>'+esc(x.title)+'</span></span></a></li>';
  }).join('');
  var cur = $('#sList [aria-current]'); if(cur && cur.scrollIntoView && window.innerWidth <= 900){ var l = $('#sList'); l.scrollLeft = cur.parentNode.offsetLeft - 16; }
  $('#sNum').textContent = s.preview ? 'Your story · preview' : 'Story ' + s.num;
  $('#sTitle').textContent = titleDot(s.title);
  $('#sMeta').innerHTML = (s.by ? '<p class="s-by">By '+esc(s.by)+'</p>' : '') + (s.cw ? '<p class="s-cw">'+esc(s.cw)+'</p>' : '');
  $('#sDeck').textContent = s.deck || '';
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
  var idx = list.indexOf(s), prev = list[idx-1], next = list[idx+1];
  $('#sPager').innerHTML = (s.after ? '<p class="p-after" style="flex-basis:100%">'+esc(s.after)+' In the US, you can call or text 988 any time.</p>' : '')+
    (prev ? '<a class="prev" href="#story-'+prev.id+'">'+ARROW+' '+esc(prev.title)+'</a>' : '<span></span>')+
    (next ? '<a href="#story-'+next.id+'">'+esc(next.title)+' '+ARROW+'</a>' : '<a href="#deck">Swipe the deck '+ARROW+'</a>');
  bindEyes(storyV);
}

/* ================= deck ================= */
var SAVE_KEY = 'nbif.saved.v1';
var saved = (function(){ try{ var v = JSON.parse(localStorage.getItem(SAVE_KEY) || '[]'); return Array.isArray(v) ? v : []; }catch(e){ return []; } })();
function persist(){ try{ localStorage.setItem(SAVE_KEY, JSON.stringify(saved.filter(function(id){ return id !== 'yours'; }))); }catch(e){} }
var order = [], dIdx = 0, deckReset = true;
var stack = $('#stack');
function cardHTML(s){
  var p = s.primary || s.practices[0];
  var more = s.steps ? s.practices.length + ' steps in the full story' : (s.practices.length > 1 ? '+' + (s.practices.length-1) + ' more practice' + (s.practices.length > 2 ? 's' : '') : 'From the full story');
  var icon = (!s.primary && p.icon) ? '<div class="dc-icon">'+artHTML(p.icon)+'</div>' : '<div class="dc-icon" style="min-height:0;height:auto;margin-top:22px"></div>';
  return '<div class="dcard" data-id="'+s.id+'"><div class="dc-inner">'+
    '<div class="dc-face dc-front"><div class="dc-row"><span>'+(s.preview?'Your story':'Story '+esc(s.num))+'</span><span>Tap to flip</span></div>'+
      '<div class="dc-art">'+artHTML(s.art, {fit:true})+'</div>'+
      '<p class="dc-title">'+esc(titleDot(s.title))+'</p>'+(s.by ? '<p class="dc-by">By '+esc(s.by)+'</p>' : '')+
      '<p class="dc-deck">'+esc(s.blurb || s.deck)+'</p>'+
      '<div class="dc-hint"><span>← Pass</span><span>Save →</span></div></div>'+
    '<div class="dc-face dc-back"><div class="dc-row"><span>The practice</span><span>'+(s.preview?'Your story':'Story '+esc(s.num))+'</span></div>'+
      icon+'<p class="dc-title">'+esc(p.title)+'</p><p class="dc-text">'+esc(p.text)+'</p>'+
      '<div class="dc-more"><span>'+esc(more)+'</span><a href="#story-'+s.id+'">Full story '+ARROW+'</a></div></div>'+
    '</div><span class="stamp stamp--save" aria-hidden="true">Saved</span><span class="stamp stamp--pass" aria-hidden="true">Pass</span></div>';
}
function renderDeck(){
  if(deckReset){ order = allStories().map(function(s){ return s.id; }); if(mine){ order.splice(order.indexOf('yours'),1); order.unshift('yours'); } dIdx = 0; deckReset = false; }
  renderSaved(); renderStack();
}
function renderSaved(){
  var ids = saved.filter(function(id){ return getStory(id); });
  $('#savedCount').textContent = ids.length;
  var ul = $('#savedList');
  if(!ids.length){ ul.innerHTML = '<li class="saved-empty" style="display:block;border:0">Nothing saved yet. Swipe right on a story you want to keep.</li>'; return; }
  ul.innerHTML = ids.map(function(id){
    var s = getStory(id), p = s.primary || s.practices[0];
    return '<li><span class="mini">'+artHTML(s.thumb)+'</span><a href="#story-'+id+'">'+esc(s.title)+'<small>Practice: '+esc(p.title)+'</small></a><button type="button" data-unsave="'+id+'" aria-label="Remove '+esc(s.title)+' from saved">Remove</button></li>';
  }).join('');
}
function renderStack(){
  stack.innerHTML = '';
  var left = order.length - dIdx;
  $('#dCount').textContent = left > 0 ? (dIdx+1) + ' of ' + order.length : 'All ' + order.length + ' cards seen';
  ['#dPass','#dSave','#dFlip'].forEach(function(b){ $(b).disabled = left <= 0; });
  if(left <= 0){
    stack.innerHTML = '<div class="dend"><h3>That’s the deck.</h3><p>'+(saved.length ? 'You saved '+saved.length+' stor'+(saved.length===1?'y':'ies')+'.' : 'Nothing saved this time. That’s fine too.')+'</p><button class="btn btn--ink" type="button" id="dAgain">Start over</button></div>';
    $('#dAgain').addEventListener('click', function(){ deckReset = true; renderDeck(); stack.focus(); });
    return;
  }
  var ids = order.slice(dIdx, dIdx+3);
  for(var i = ids.length-1; i >= 0; i--){
    var s = getStory(ids[i]);
    var t = document.createElement('template'); t.innerHTML = cardHTML(s);
    var c = t.content.firstElementChild;
    var rot = i === 0 ? 0 : (i % 2 ? 2.4 : -2.2);
    c.style.transform = 'translateY('+(i*12)+'px) scale('+(1 - i*.045)+') rotate('+rot+'deg)';
    c.style.zIndex = 10 - i;
    if(i === 0){ c.classList.add('top'); c.setAttribute('aria-label', 'Story '+s.num+': '+s.title+'. '+(s.blurb||'')); }
    else c.setAttribute('aria-hidden','true');
    stack.appendChild(c);
  }
  bindEyes(stack);
  wireTop();
}
function topCard(){ return $('.dcard.top', stack); }
function flip(){ var c = topCard(); if(c) c.classList.toggle('flipped'); }
function decide(dir, c){
  c = c || topCard(); if(!c || c.dataset.gone) return;
  c.dataset.gone = '1';
  var id = c.dataset.id, s = getStory(id);
  if(dir > 0){
    if(saved.indexOf(id) < 0) saved.push(id);
    persist(); toast('Saved: ' + s.title);
  }
  $('.stamp--' + (dir>0?'save':'pass'), c).style.opacity = 1;
  var w = Math.max(window.innerWidth, 600);
  if(reduce){ dIdx++; renderSaved(); renderStack(); return; }
  c.classList.remove('dragging');
  c.style.transition = 'transform .42s cubic-bezier(.4,.1,.8,.5), opacity .42s ease';
  c.style.transform = 'translate('+(dir*w)+'px,'+(parseFloat(c.dataset.dy||0)+40)+'px) rotate('+(dir*30)+'deg)';
  c.style.opacity = '0';
  setTimeout(function(){ dIdx++; renderSaved(); renderStack(); }, 380);
}
function wireTop(){
  var c = topCard(); if(!c) return;
  var sx=0, sy=0, dx=0, dy=0, t0=0, down=false, moved=false, pid=null;
  var sSave = $('.stamp--save', c), sPass = $('.stamp--pass', c);
  c.addEventListener('pointerdown', function(e){
    if(e.button !== 0 || e.target.closest('a,button')) return;
    down = true; moved = false; sx = e.clientX; sy = e.clientY; dx = dy = 0; t0 = Date.now(); pid = e.pointerId;
  });
  c.addEventListener('pointermove', function(e){
    if(!down || e.pointerId !== pid) return;
    dx = e.clientX - sx; dy = e.clientY - sy;
    if(!moved){
      if(Math.abs(dx) < 8) { if(Math.abs(dy) > 12) down = false; return; }
      moved = true; c.classList.add('dragging'); try{ c.setPointerCapture(pid); }catch(err){}
    }
    c.dataset.dy = dy*.3;
    c.style.transform = 'translate('+dx+'px,'+(dy*.3)+'px) rotate('+(dx*.055)+'deg)';
    var k = Math.min(1, Math.abs(dx)/110);
    sSave.style.opacity = dx > 0 ? k : 0; sPass.style.opacity = dx < 0 ? k : 0;
  });
  function end(e){
    if(!down) return; down = false;
    if(!moved){ if(e.type === 'pointerup' && !e.target.closest('a,button')) flip(); return; }
    var v = Math.abs(dx) / Math.max(1, Date.now() - t0);
    if(Math.abs(dx) > 110 || (v > .55 && Math.abs(dx) > 40)) decide(dx > 0 ? 1 : -1, c);
    else { c.classList.remove('dragging'); c.style.transform = ''; sSave.style.opacity = sPass.style.opacity = 0; }
  }
  c.addEventListener('pointerup', end);
  c.addEventListener('pointercancel', end);
}
$('#dPass').addEventListener('click', function(){ decide(-1); });
$('#dSave').addEventListener('click', function(){ decide(1); });
$('#dFlip').addEventListener('click', flip);
$('#savedList').addEventListener('click', function(e){
  var b = e.target.closest('[data-unsave]'); if(!b) return;
  saved = saved.filter(function(id){ return id !== b.dataset.unsave; }); persist(); renderSaved();
});
$('.dv-savedlink').addEventListener('click', function(e){ e.preventDefault(); $('#savedBox').scrollIntoView({behavior: reduce?'auto':'smooth', block:'start'}); $('#savedList').focus({preventScroll:true}); });
document.addEventListener('keydown', function(e){
  if(deckV.hidden || sheet.open) return;
  var tag = (e.target.tagName || '').toLowerCase();
  if(tag === 'input' || tag === 'textarea') return;
  if(e.key === 'ArrowLeft'){ e.preventDefault(); decide(-1); }
  else if(e.key === 'ArrowRight'){ e.preventDefault(); decide(1); }
  else if((e.key === ' ' || e.key === 'Enter') && (e.target === stack || e.target === document.body)){ e.preventDefault(); flip(); }
});

/* ================= router ================= */
var current = 'home';
function show(view){
  homeV.hidden = view !== 'home'; storyV.hidden = view !== 'story'; deckV.hidden = view !== 'deck'; shareV.hidden = view !== 'share'; storeV.hidden = view !== 'store';
  current = view;
}
function route(){
  var h = location.hash.replace(/^#/, '');
  try{ h = decodeURIComponent(h); }catch(e){}
  if(h.indexOf('story-') === 0 && getStory(h.slice(6))){ show('story'); renderStory(h.slice(6)); scrollTop(); req(); return; }
  if(h === 'store'){ var wasS = current; show('store'); buildStore(); if(wasS !== 'store') scrollTop(); bindEyes(storeV); req(); return; }
  if(h === 'deck'){ show('deck'); renderDeck(); scrollTop(); req(); return; }
  if(h === 'submit'){ var was = current; show('share'); if(was !== 'share') renderShare(); if(was !== 'share') scrollTop(); bindEyes(shareV); req(); return; }
  var wasHome = current === 'home';
  show('home');
  var el = h && document.getElementById(h);
  if(el && homeV.contains(el)){ requestAnimationFrame(function(){ el.scrollIntoView({behavior: (wasHome && !reduce) ? 'smooth' : 'auto'}); }); }
  else if(!wasHome) scrollTop();
  req();
}
window.addEventListener('hashchange', route);

/* ================= wiring ================= */
document.addEventListener('click', function(e){
  var t = e.target.closest('[data-practice],[data-index],[data-open-practice],[data-soon],[data-submit],[data-go]');
  if(!t) return;
  if(t.dataset.practice) showPractice(t.dataset.practice);
  else if(t.dataset.index) (t.dataset.index === 'stories' ? indexStories() : indexPractices());
  else if(t.dataset.openPractice) showPractice(t.dataset.openPractice);
  else if(t.dataset.soon) toast(t.dataset.soon+' link goes live at launch');
  else if(t.hasAttribute('data-submit')) go('#submit');
  else if(t.dataset.go) go(t.dataset.go);
});
$('#aboutBtn').addEventListener('click', function(){ openSheet(aboutHTML()); });

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
