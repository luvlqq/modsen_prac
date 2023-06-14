import { MeetupResponse } from '@app/src/modules/meetups/response/meetup.response';

export class UserResponse extends MeetupResponse {
  id: number;
  login: string;
  password: string;
  role: string;
  hashRt: string;
  followedMeetups: MeetupResponse[];
  createdMeetups: MeetupResponse[];
}
