export async function fetchJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Impossible de charger ${path} (statut ${response.status})`);
  }
  return response.json();
}

export function toAssetPath(path) {
  if (!path) return '';
  if (/^https?:\/\//.test(path)) return path;
  return `/${String(path).replace(/^\.?\//, '')}`;
}

export function getSkillIcon(skillIcons, skill) {
  return (skillIcons && skillIcons[skill]) || 'bx-check-circle';
}
