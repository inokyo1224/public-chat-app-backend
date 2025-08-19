import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // ユーザーの作成
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: '田中太郎',
        email: 'tanaka@example.com',
        password: await bcrypt.hash('password', 10),
      },
    }),
    prisma.user.create({
      data: {
        name: '佐藤花子',
        email: 'sato@example.com',
        password: await bcrypt.hash('password', 10),
      },
    }),
    prisma.user.create({
      data: {
        name: '鈴木一郎',
        email: 'suzuki@example.com',
        password: await bcrypt.hash('password', 10),
      },
    }),
    prisma.user.create({
      data: {
        name: '高橋美咲',
        email: 'takahashi@example.com',
        password: await bcrypt.hash('password', 10),
      },
    }),
    prisma.user.create({
      data: {
        name: '伊藤健二',
        email: 'ito@example.com',
        password: await bcrypt.hash('password', 10),
      },
    }),
  ]);

  console.log(`Created ${users.length} users`);

  // グループチャットルームの作成
  const groupRoom1 = await prisma.room.create({
    data: {
      name: '開発チーム',
      isGroup: true,
      roomUsers: {
        create: [
          { userId: users[0].id }, // 田中太郎
          { userId: users[2].id }, // 鈴木一郎
          { userId: users[4].id }, // 伊藤健二
        ],
      },
    },
  });

  const groupRoom2 = await prisma.room.create({
    data: {
      name: 'プロジェクトA',
      isGroup: true,
      roomUsers: {
        create: [
          { userId: users[0].id }, // 田中太郎
          { userId: users[1].id }, // 佐藤花子
          { userId: users[2].id }, // 鈴木一郎
          { userId: users[3].id }, // 高橋美咲
        ],
      },
    },
  });

  const groupRoom3 = await prisma.room.create({
    data: {
      name: 'プロジェクトB',
      isGroup: true,
      roomUsers: {
        create: [
          { userId: users[0].id }, // 田中太郎
          { userId: users[3].id }, // 高橋美咲
        ],
      },
    },
  });

  console.log('Created rooms');

  // グループチャットのメッセージ
  const groupMessages = await Promise.all([
    prisma.message.create({
      data: {
        roomId: groupRoom1.id,
        userId: users[0].id,
        content: '開発チームの皆さん、お疲れ様です！',
      },
    }),
    prisma.message.create({
      data: {
        roomId: groupRoom1.id,
        userId: users[2].id,
        content: 'お疲れ様です！今日のタスクを共有します。',
      },
    }),
    prisma.message.create({
      data: {
        roomId: groupRoom1.id,
        userId: users[4].id,
        content: '了解です。私はバグ修正を進めています。',
      },
    }),
    prisma.message.create({
      data: {
        roomId: groupRoom2.id,
        userId: users[1].id,
        content: 'プロジェクトAのキックオフミーティングの日程を決めましょう。',
      },
    }),
    prisma.message.create({
      data: {
        roomId: groupRoom2.id,
        userId: users[3].id,
        content: '来週の月曜日はいかがでしょうか？',
      },
    }),
    prisma.message.create({
      data: {
        roomId: groupRoom3.id,
        userId: users[0].id,
        content: 'こんにちは、佐藤さん！',
      },
    }),
    prisma.message.create({
      data: {
        roomId: groupRoom3.id,
        userId: users[1].id,
        content: 'こんにちは、田中さん！お元気ですか？',
      },
    }),
    prisma.message.create({
      data: {
        roomId: groupRoom3.id,
        userId: users[0].id,
        content: 'はい、元気です。今日の会議の資料を送りますね。',
      },
    }),
  ]);

  console.log('Created messages');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
