import { TFunction } from "react-i18next";

export const getTagValues = (t: TFunction<"translation">): string[] => {
  return [
    t('blog_creation.tag_values.question'),
    t('blog_creation.tag_values.info'),
    t('blog_creation.tag_values.ad'),
    t('blog_creation.tag_values.job'),
    t('blog_creation.tag_values.industrial'),
    t('blog_creation.tag_values.residential'),
    t('blog_creation.tag_values.disposal'),
    t('blog_creation.tag_values.rental'),
    t('blog_creation.tag_values.legal'),
    t('blog_creation.tag_values.issue'),
    t('blog_creation.tag_values.investment'),
  ];
}

export const parseTags = (tags: string[]): string => {
  let parsedTags: string = '';

  tags.forEach(tag => {
    parsedTags = parsedTags + tag + ';';
  });

  return parsedTags;
}

export const extractTags = (tags: string): string[] => {
  let postTags: string[] = [];

  tags.split(';').forEach(tag => postTags.push(tag));

  return postTags;
}