import topicsJson from '../../../topics.json';

export type Topic = {
  src: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
};

export const TOPICS = topicsJson as Topic[];

export function topicBySlug(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug);
}
