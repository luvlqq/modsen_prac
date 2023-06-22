export class Meetup {
  id: number;
  name: string;
  description: string;
  place: string;
  date: Date;
  tags: string[];
  meetupCreator: number;
}

export class UserResponse {
  id: number;
  login: string;
  password: string;
  role: string;
  hashRt: string;
  followedMeetups: Meetup[];
  createdMeetups: Meetup[];
}
