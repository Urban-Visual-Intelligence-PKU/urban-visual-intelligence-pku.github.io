import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type Person = CollectionEntry<'people'>;
export type Theme = CollectionEntry<'themes'>;

export const roleOrder = ['pi', 'postdoc', 'phd', 'master', 'undergrad', 'alumni'] as const;

export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects');
  // Astro only logs broken references inside arrays; fail the build instead so CI catches typos.
  const ids = new Set((await getCollection('people')).map((p) => p.id));
  for (const p of all) {
    const missing = p.data.members.filter((m) => !ids.has(m.id)).map((m) => m.id);
    if (missing.length) {
      throw new Error(
        `Project "${p.id}" lists members [${missing.join(', ')}], but there is no src/content/people/<id>.yaml for them. Check the spelling or add the person first.`,
      );
    }
  }
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getThemes(): Promise<Theme[]> {
  const all = await getCollection('themes');
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getPeople(): Promise<Person[]> {
  const all = await getCollection('people');
  return all.sort(
    (a, b) =>
      roleOrder.indexOf(a.data.role) - roleOrder.indexOf(b.data.role) ||
      a.data.order - b.data.order ||
      (a.data.since ?? 0) - (b.data.since ?? 0) ||
      a.data.name.en.localeCompare(b.data.name.en),
  );
}

export function projectsOf(personId: string, projects: Project[]): Project[] {
  return projects.filter((p) => p.data.members.some((m) => m.id === personId));
}

export function membersOf(project: Project, people: Person[]): Person[] {
  return project.data.members
    .map((m) => people.find((p) => p.id === m.id))
    .filter((p): p is Person => Boolean(p));
}

export function years(p: Person): string {
  const { since, until } = p.data;
  if (!since) return '';
  return until ? `${since}–${until}` : `${since}–`;
}
