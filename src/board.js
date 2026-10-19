/* ================= storyboards: hand-drawn scenes, white line on black ================= */
/* each scene is drawn in a 300 x 200 box. {peek} is replaced with the peeking creature */
var BOARDS = {
  plates: [
    {cap:'My grandma called.', svg:
      '<path d="M30 22h74v58H30zM67 22v58M30 51h74"/><circle cx="88" cy="36" r="7"/>' +
      '<path d="M206 20h66v54h-66zM206 36h66"/>' +
      '<path d="M8 152C80 148 220 153 292 149M22 152l-6 46M280 150l6 46"/>' +
      '<path class="h" d="M40 160l-6 10M60 160l-6 10M80 160l-6 10M200 160l-6 10M220 160l-6 10M240 160l-6 10"/>' +
      '<path d="M112 133l64-20c6-2 10 0 12 5l8 21c2 6-1 9-6 11l-64 19c-6 2-10 0-12-5l-8-21c-2-5 0-8 6-10z"/>' +
      '<path class="h" d="M118 138l60-18 8 21-60 17z"/>' +
      '<path d="M96 126q-7 11 0 24M86 120q-10 16 0 34M206 108q8 11 2 24M216 102q11 16 3 34"/>' +
      '<text class="t" x="239" y="32" text-anchor="middle">OCT</text><text class="t big" x="239" y="62" text-anchor="middle">2016</text>' +
      '<text class="t sm" x="152" y="144" text-anchor="middle" transform="rotate(-17 152 141)">GRANDMA</text>'},
    {cap:'Calling hospitals and police stations.', svg:
      '<path d="M40 26l132-4 6 164-132 4z"/>' +
      '<path d="M56 30v-10M72 30v-10M88 30v-10M104 30v-10M120 30v-10M136 30v-10M152 30v-10"/>' +
      '<text class="t" x="58" y="62">ST. MARY’S</text><text class="t" x="58" y="88">COUNTY GEN.</text><text class="t" x="58" y="114">PRECINCT 4</text>' +
      '<text class="t" x="58" y="140">MERCY</text><text class="t dim" x="58" y="166">5TH ST. PD</text>' +
      '<path d="M54 58c30-2 70-1 100-3M54 84c32-1 74 1 104-2M54 110c30 0 60-2 90-1"/>' +
      '<path d="M50 134c10-14 66-14 72 0 4 12-58 16-72 4"/>' +
      '<g transform="rotate(12 232 104)"><path d="M206 52h52c4 0 6 2 6 6v94c0 4-2 6-6 6h-52c-4 0-6-2-6-6V58c0-4 2-6 6-6z"/><path class="h" d="M210 64h44v76h-44z"/></g>' +
      '<path d="M270 40q12 8 8 22M280 28q18 14 10 38"/>'},
    {cap:'“He’s here.”', svg:
      '<path d="M150 22c70 0 128 22 128 56s-58 56-128 56c-14 0-27-1-39-3L72 158l18-38C48 110 22 96 22 78c0-34 58-56 128-56z"/>' +
      '<text class="q" x="150" y="94" text-anchor="middle">He’s here.</text>' +
      '<g transform="rotate(-14 70 190)"><path d="M36 150h56c4 0 7 3 7 7v70H29v-70c0-4 3-7 7-7z"/><path class="h" d="M38 162h52v40H38z"/></g>' +
      '<path d="M18 132q-8 10-2 22M8 126q-12 16-4 34"/>'},
    {cap:'With the warmth of a meter maid.', svg:
      '<path d="M0 0l112 70M300 0l-112 70M0 200l112-74M300 200l-112-74"/>' +
      '<path d="M112 70h76v56h-76z"/><path d="M138 84h24v42h-24z"/><path d="M146 76h8M150 72v8"/>' +
      '<path d="M40 25l20 13M240 25l-20 13M78 47l12 8M222 47l-12 8"/>' +
      '<path d="M30 70v94M66 72v70M270 70v94M234 72v70"/>' +
      '<path class="h" d="M70 200l58-74M230 200l-58-74M150 200v-74"/>' +
      '<g transform="rotate(8 236 152)"><path d="M204 104h64v94h-64z"/><path d="M224 98h24v12h-24z"/><path class="h" d="M214 136h44M214 150h44M214 164h30"/>' +
      '<text class="t sm" x="236" y="126" text-anchor="middle">NOTICE</text></g>'},
    {cap:'“No biggie, I’m fine.”', svg:
      '{peek:46,74,180,104}' +
      '<path d="M10 178C90 175 210 180 290 176"/>' +
      '<path d="M206 176l10-54h66l-10 54z"/><path d="M196 176h90"/>' +
      '<path d="M26 176v-26h22v26M48 156q10 0 10 8t-10 8"/><path class="h" d="M32 142q-4-8 2-14M42 142q-4-8 2-14"/>' +
      '<path d="M150 14c62 0 100 12 100 30s-38 30-100 30c-10 0-20-1-29-2l-26 18 8-22C76 64 52 56 52 44c0-18 36-30 98-30z"/>' +
      '<text class="q sm" x="152" y="52" text-anchor="middle">No biggie, I’m fine.</text>'},
    {cap:'A stack of ugly plates for six bucks and a Sharpie.', svg:
      '<path d="M0 30h300M0 34h300"/><path class="h" d="M20 30V8h30v22M70 30V12h22v18M220 30V6h34v24"/>' +
      '<path d="M40 166c0 12 140 12 140 0M40 156c0 12 140 12 140 0M40 146c0 12 140 12 140 0M40 136c0 12 140 12 140 0M40 126c0 12 140 12 140 0"/>' +
      '<ellipse cx="110" cy="116" rx="70" ry="14"/><ellipse cx="110" cy="116" rx="40" ry="7"/>' +
      '<path d="M40 116v50M180 116v50"/>' +
      '<circle cx="168" cy="84" r="20"/><text class="big" x="168" y="93" text-anchor="middle">$6</text>' +
      '<g transform="rotate(-32 246 132)"><path d="M206 124h70c4 0 6 3 6 8s-2 8-6 8h-70z"/><path d="M276 124h14l6 8-6 8h-14"/><path d="M206 124v16"/>' +
      '<text class="t sm" x="238" y="135">SHARPIE</text></g>' +
      '<path d="M10 186C90 182 210 188 290 184"/>'},
    {cap:'As hard as I could against the wall.', svg:
      '<path class="h" d="M0 30h300M0 60h300M0 90h300M0 120h300M0 150h300M0 180h300"/>' +
      '<path class="h" d="M40 0v30M110 0v30M180 0v30M250 0v30M75 30v30M145 30v30M215 30v30M285 30v30M40 60v30M110 60v30M250 60v30M75 90v30M285 90v30M40 120v30M110 120v30M250 120v30M75 150v30M145 150v30M215 150v30M285 150v30M40 180v20M110 180v20M180 180v20M250 180v20"/>' +
      '<path d="M178 92l-18-22M178 92l26-24M178 92l30 6M178 92l20 28M178 92l-6 34M178 92l-28 14"/>' +
      '<path class="f" d="M130 52l22 4-6 18zM214 50l16 10-18 8zM236 104l-6 20-14-12zM192 138l14 14-20 4zM132 118l-14 16-6-18zM118 74l-16-6 10-12z"/>' +
      '<path d="M146 76l64-10 10 52-66 10z"/>' +
      '<text class="t sm" x="152" y="96" transform="rotate(-9 182 96)">HE WAS CHOOSING</text><text class="t sm" x="156" y="112" transform="rotate(-9 182 112)">TO ABANDON US</text>' +
      '<path d="M14 112h66M24 128h52M8 96h48"/>'},
    {cap:'I always have a few extra plates on hand.', svg:
      '<path d="M20 74h170M20 78h170M34 78v14M176 78v14"/>' +
      '<ellipse cx="62" cy="50" rx="18" ry="24"/><ellipse cx="62" cy="50" rx="9" ry="12"/>' +
      '<ellipse cx="104" cy="50" rx="18" ry="24"/><ellipse cx="104" cy="50" rx="9" ry="12"/>' +
      '<ellipse cx="146" cy="50" rx="18" ry="24"/><ellipse cx="146" cy="50" rx="9" ry="12"/>' +
      '<path d="M10 178C90 175 210 180 290 176"/>' +
      '<path d="M268 16l-62 140"/><path d="M190 146l32 10-14 26-36-10z"/><path class="h" d="M184 160l-6 14M194 162l-6 14M204 166l-6 14M214 168l-5 12"/>' +
      '<path d="M40 176l4-28h44l10 28"/>' +
      '<path class="f" d="M118 174l6-6 4 6zM134 176l4-8 6 8zM150 174l8-4 2 6zM106 176l3-5 5 4z"/>'}
  ]
};
var SKETCH_DEFS = '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>' +
  '<filter id="sk1" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="2.6" xChannelSelector="R" yChannelSelector="G"/></filter>' +
  '<filter id="sk2" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="9"/><feDisplacementMap in="SourceGraphic" scale="3.4" xChannelSelector="G" yChannelSelector="R"/></filter>' +
  '</defs></svg>';
function sceneSVG(scene){
  var body = scene.svg.replace(/\{peek:([\d.]+),([\d.]+),([\d.]+),([\d.]+)\}/g, function(_, x, y, w, h){
    var t = document.createElement('template'); t.innerHTML = artHTML('peek'); var src = t.content.firstElementChild;
    if(!src) return '';
    return '<svg x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" viewBox="'+src.getAttribute('viewBox')+'" preserveAspectRatio="xMidYMax meet" class="sb-peek">'+src.innerHTML+'</svg>';
  });
  var lines = body.replace(/<text[\s\S]*?<\/text>/g, ''), texts = (body.match(/<text[\s\S]*?<\/text>/g) || []).join('');
  var peek = '';
  lines = lines.replace(/<svg x=[\s\S]*?<\/svg>/g, function(m){ peek = m; return ''; });
  return '<svg class="sb-svg" viewBox="0 0 300 200" aria-hidden="true" focusable="false">' +
    '<g class="sb-ghost" filter="url(#sk2)">'+lines+'</g><g class="sb-lines" filter="url(#sk1)">'+lines+'</g>'+peek+'<g class="sb-text">'+texts+'</g></svg>';
}
function storyboardHTML(id){
  var b = BOARDS[id]; if(!b) return '';
  return '<section class="board" aria-label="Storyboard">' +
    '<div class="board-head"><span class="board-h">Storyboard</span><span class="board-n">'+b.length+' frames</span></div>' +
    '<ol class="board-grid">' + b.map(function(sc, i){
      return '<li class="frame"><div class="fr-box">'+sceneSVG(sc)+'<span class="fr-n">'+(i<9?'0':'')+(i+1)+'</span></div><p class="fr-cap">'+esc(sc.cap)+'</p></li>';
    }).join('') + '</ol></section>';
}
