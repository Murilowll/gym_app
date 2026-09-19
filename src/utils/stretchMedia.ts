export const STRETCH_ID_TO_GIF_MAP: Record<string, string> = {
  'str-1-1': '/stretches/rear-deltoid-stretch.gif',
  'str-1-2': '/stretches/dynamic-chest-stretch-male.gif',
  'str-1-3': '/stretches/chest-and-front-of-shoulder-stretch.gif',
  'str-2-1': '/stretches/kneeling-lat-stretch.gif',
  'str-2-2': '/stretches/spine-stretch.gif',
  'str-2-3': '/stretches/side-wrist-pull-stretch.gif',
  'str-3-1': '/stretches/standing-calves-calf-stretch.gif',
  'str-3-2': '/stretches/seated-piriformis-stretch.gif',
  'str-3-3': '/stretches/intermediate-hip-flexor-and-quad-stretch.gif',
  'str-4-1': '/stretches/overhead-triceps-stretch.gif',
  'str-4-2': '/stretches/kneeling-lat-stretch.gif',
  'str-5-1': '/stretches/neck-side-stretch.gif',
  'str-5-2': '/stretches/side-lying-floor-stretch.gif',
  'str-6-1': '/stretches/leg-up-hamstring-stretch.gif',
  'str-6-2': '/stretches/world-greatest-stretch.gif',
  'str-7-1': '/stretches/standing-hamstring-and-calf-stretch-with-strap.gif',
  'str-7-2': '/stretches/behind-head-chest-stretch.gif',
  'gen-str-1': '/stretches/world-greatest-stretch.gif'
};

export const STRETCH_ICON_TYPE_TO_GIF_MAP: Record<string, string> = {
  shoulders: '/stretches/rear-deltoid-stretch.gif',
  chest: '/stretches/dynamic-chest-stretch-male.gif',
  back: '/stretches/kneeling-lat-stretch.gif',
  hips: '/stretches/seated-piriformis-stretch.gif',
  ankles: '/stretches/standing-calves-calf-stretch.gif',
  hamstrings: '/stretches/leg-up-hamstring-stretch.gif',
  neck: '/stretches/neck-side-stretch.gif'
};

export function getStretchGif(stretch?: { id?: string; gifUrl?: string; iconType?: string }): string {
  if (!stretch) return '/stretches/world-greatest-stretch.gif';
  if (stretch.gifUrl) return stretch.gifUrl;
  if (stretch.id && STRETCH_ID_TO_GIF_MAP[stretch.id]) {
    return STRETCH_ID_TO_GIF_MAP[stretch.id];
  }
  if (stretch.iconType && STRETCH_ICON_TYPE_TO_GIF_MAP[stretch.iconType]) {
    return STRETCH_ICON_TYPE_TO_GIF_MAP[stretch.iconType];
  }
  return '/stretches/world-greatest-stretch.gif';
}
