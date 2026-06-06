window.SlamMapEditor = window.SlamMapEditor || {};

(function(S) {
  S.SEMANTIC_FREE     = 255;
  S.SEMANTIC_KEEPOUT  = 0;
  S.SEMANTIC_STAIRS   = 128;
  S.SEMANTIC_GUIDANCE = 160;

  S.getSpeedValue = function(percent) {
    return Math.max(1, Math.min(100, Math.round(percent)));
  };

  S.getSemanticZoneType = function(value) {
    if (value === S.SEMANTIC_KEEPOUT) return 'keepout';
    if (value >= 1 && value <= 100) return 'speed';
    if (value === S.SEMANTIC_STAIRS) return 'stairs';
    if (value === S.SEMANTIC_GUIDANCE) return 'guidance';
    return 'free';
  };

  S.getSemanticColor = function(value, visibility) {
    var zone = S.getSemanticZoneType(value);
    if (!visibility[zone]) return [0, 0, 0, 0];
    switch (zone) {
      case 'keepout':  return [190, 50, 50, 140];
      case 'speed':    return [190, 170, 40, 130];
      case 'stairs':   return [50, 120, 190, 130];
      case 'guidance': return [40, 150, 60, 130];
      default:         return [0, 0, 0, 0];
    }
  };
})(window.SlamMapEditor);
