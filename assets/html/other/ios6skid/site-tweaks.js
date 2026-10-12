(function () {
  'use strict';
  function apply() {
    try {
      document.querySelectorAll('.device-rotation-controls').forEach(function (el) { el.style.display = 'none'; });
      document.querySelectorAll('button').forEach(function (b) {
        var t = (b.textContent || '').trim();
        if ((t === 'Rotate device' || t === 'Reset rotation') && b.closest('.emulator-controls, aside')) {
          b.style.display = 'none';
        }
      });
      document.querySelectorAll('label').forEach(function (l) {
        var t = (l.textContent || '').trim();
        if (t.indexOf('Device rotation') === 0 && l.closest('.emulator-controls, aside')) {
          l.style.display = 'none';
        }
      });
    } catch (e) {}
  }
  var queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; apply(); });
  }
  try {
    apply();
    new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  } catch (e) {}
})();
