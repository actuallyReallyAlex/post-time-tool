export interface Article {
  canonical_url: string;
  collection_id: number | null;
  comments_count: number;
  cover_image: string;
  created_at: string;
  crossposted_at: string | null;
  description: string;
  edited_at: string;
  flare_tag: FlareTag;
  id: number;
  last_comment_at: string;
  organization: Organization | undefined;
  path: string;
  positive_reactions_count: number;
  public_reactions_count: number;
  published_at: string;
  published_timestamp: string;
  readable_publish_date: string;
  slug: string;
  social_image: string;
  tag_list: string[];
  tags: string;
  title: string;
  type_of: "article";
  url: string;
  user: User;
}

export interface DayGroup {
  day:
    | "Sunday"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday";
  group: Article[];
  positiveReactionsAverage: number;
  positiveReactionsSum: number;
}

interface FlareTag {
  bg_color_hex: string;
  name: string;
  text_color_hex: string;
}

interface Organization {
  name: string;
  username: string;
  slug: string;
  profile_image: string;
  profile_image_90: string;
}

interface User {
  github_username: string;
  name: string;
  profile_image: string;
  profile_image_90: string;
  twitter_username: string;
  username: string;
  website_url: string;
}
