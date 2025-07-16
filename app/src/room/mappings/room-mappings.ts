import { PathMapping } from 'src/prisma/prisma.converter';

/**
 * Room用のデフォルトマッピング定義
 */
export const roomMappings: PathMapping[] = [
  {
    graphqlPath: 'roomUsers',
    prismaInclude: {
      roomUsers: true,
    },
  },
  {
    graphqlPath: 'roomUsers.user',
    prismaInclude: {
      roomUsers: {
        include: {
          user: true,
        },
      },
    },
  },
];
