import { TrainingPictureOperation } from "config/constants";

export type TrainingPicture = {
  id: number;
  original_picture: string;
  is_usable: boolean;
  is_parent_data: boolean;
};

export type UpdatedTrainingPicture = {
  id: number;
  operation: TrainingPictureOperation;
};
