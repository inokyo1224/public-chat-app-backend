import { Room } from 'src/room/models/room.model';

export interface IRoomDao {
  findRoomsByUserId(userId: string, include: any): Promise<Room[]>;

  createRoom(params: {
    name?: string;
    isGroup: boolean;
    userIds: string[];
  }): Promise<Room>;
}
