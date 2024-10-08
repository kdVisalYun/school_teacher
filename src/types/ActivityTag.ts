export type ActivityTag = {
  id: number;
  name: string;
  used_time: string;
};

export type RecentActivityTagResponse = {
  results: ActivityTag[];
};
