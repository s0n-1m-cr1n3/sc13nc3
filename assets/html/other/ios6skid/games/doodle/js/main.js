/* w3 CWV 2026-10-03: phones painted the canvas at native 635x955 first, then SHOW_ALL scaled it (mobile CLS 0.17) -> hidden until settled. */
/* w3-canvas-settle — Phaser 2 SHOW_ALL first paints the canvas at its native 635x955 in the corner, then
   scales and centres it ~0.4 s later: a 0.1-0.4 layout shift inside every /play/ load (CF RUM, 2026-10-01).
   Keep the canvas invisible until the engine has sized it (game aspect, inside the viewport, three equal checks), then show it. */
(function () {
  var d = document, st = d.createElement('style')
  st.textContent = 'body>canvas{visibility:hidden}html.w3cv body>canvas{visibility:visible}'
  ;(d.head || d.documentElement).appendChild(st)
  var last = '', same = 0, t0 = Date.now()
  var iv = setInterval(function () {
    var c = d.querySelector('body>canvas'), done = Date.now() - t0 > 6000
    if (c && c.style.width && c.width && c.height) {
      // settled = at the game's own aspect, inside the viewport (SHOW_ALL always fits; the native
      // 635x955 first pass does not) and unchanged for three checks
      var r = c.getBoundingClientRect(), k = [r.left, r.top, r.width, r.height].map(Math.round).join()
      var fit = r.height > 0 && Math.abs(r.width / r.height - c.width / c.height) < 0.03 &&
        r.width <= innerWidth + 1 && r.height <= innerHeight + 1
      same = fit && k === last ? same + 1 : 0
      last = fit ? k : ''
      if (same >= 2) done = true
    }
    if (done) { clearInterval(iv); d.documentElement.className += ' w3cv' }
  }, 120)
})()
;
/* w3 CWV 2026-09-29: Phaser SHOW_ALL centres the canvas with margins after boot -> CLS 0.21. Centre it with a transform instead (no layout move); input uses getBoundingClientRect, which includes the transform. */
(function(){var s=document.createElement('style');s.textContent='body>canvas{display:block!important;position:relative!important;left:50%!important;margin-left:0!important;margin-right:0!important;transform:translateX(-50%)}';(document.head||document.documentElement).appendChild(s)})();
var Doodle = Doodle || {};

Doodle.game = new Phaser.Game(635, 955, Phaser.AUTO);

// Anonymous CORS for textures: inside the simulator's sandboxed iframe,
// images arrive cross-origin and would taint WebGL without it.
// (Serve with `Access-Control-Allow-Origin: *` — see serve.py.)
// Set inside Boot.init: game.load only exists once the game has booted.
(function () {
  function arm() {
    try {
      if (Doodle.game && Doodle.game.load) { Doodle.game.load.crossOrigin = 'anonymous'; return true; }
    } catch (e) {}
    return false;
  }
  if (Doodle.BootState) {
    if (Doodle.BootState.prototype && Doodle.BootState.prototype.init) {
      var pInit = Doodle.BootState.prototype.init;
      Doodle.BootState.prototype.init = function () { arm(); return pInit.apply(this, arguments); };
    } else if (Doodle.BootState.init) {
      var oInit = Doodle.BootState.init;
      Doodle.BootState.init = function () { arm(); return oInit.apply(this, arguments); };
    }
  }
  var n = 0;
  var iv = setInterval(function () {
    if (arm() || ++n > 100) clearInterval(iv);
  }, 50);
})();

Doodle.game.state.add('Boot', Doodle.BootState); 
Doodle.game.state.add('Preload', Doodle.PreloadState); 
Doodle.game.state.add('Game', Doodle.GameState);
Doodle.game.state.add('Menu', Doodle.MenuState);
Doodle.game.state.add('Settings', Doodle.SettingsState);
Doodle.game.state.add('Calibrate', Doodle.CalibrateState);
Doodle.game.state.add('Scores', Doodle.ScoresState);
Doodle.game.state.start('Boot'); 


Doodle.game.state.start('Boot'); 


