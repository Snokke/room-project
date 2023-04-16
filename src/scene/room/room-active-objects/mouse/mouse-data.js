const MOUSE_PART_TYPE = {
  Body: 'mouse_body',
  LeftKey: 'mouse_left_key',
}

const MOUSE_PART_ACTIVITY_CONFIG = {
  [MOUSE_PART_TYPE.Body]: true,
  [MOUSE_PART_TYPE.LeftKey]: true,
}

const CURSOR_MONITOR_TYPE = {
  Monitor: 'MONITOR',
  Laptop: 'LAPTOP',
}

const AREA_BORDER_TYPE = {
  Left: 'LEFT',
  Right: 'RIGHT',
  Top: 'TOP',
  Bottom: 'BOTTOM',
}

export { MOUSE_PART_TYPE, MOUSE_PART_ACTIVITY_CONFIG, CURSOR_MONITOR_TYPE, AREA_BORDER_TYPE };
