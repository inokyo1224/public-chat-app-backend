import { PathMapping } from 'src/shared/prisma/prisma.converter';

/**
 * Message用のマッピング定義
 */
export const messageMappings: PathMapping[] = [
  {
    graphqlPath: 'user',
    prismaInclude: {
      user: true,
    },
  },
  {
    graphqlPath: 'room',
    prismaInclude: {
      room: true,
    },
  },

  {
    graphqlPath: 'room.roomUsers',
    prismaInclude: {
      room: {
        include: {
          roomUsers: true,
        },
      },
    },
  },
  {
    graphqlPath: 'room.roomUsers.user',
    prismaInclude: {
      room: {
        include: {
          roomUsers: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  },
];
