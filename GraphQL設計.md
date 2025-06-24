# GraphQL API 設計書

## 概要

本 API は、リアルタイムメッセージング機能を提供する GraphQL API です。ユーザー間のメッセージ送信、ルーム管理、リアルタイム通信をサポートしています。

## スキーマ構成

### 型定義

#### Room

チャットルームを表現する型です。

| フィールド | 型       | 必須 | 説明                     |
| ---------- | -------- | ---- | ------------------------ |
| id         | Int      | ✓    | ルームの一意識別子       |
| name       | String   | -    | ルーム名（nullable）     |
| isGroup    | Boolean  | ✓    | グループチャットかどうか |
| createdAt  | DateTime | ✓    | 作成日時                 |
| updatedAt  | DateTime | ✓    | 更新日時                 |

#### User

ユーザーを表現する型です。

| フィールド | 型     | 必須 | 説明                 |
| ---------- | ------ | ---- | -------------------- |
| id         | Int    | ✓    | ユーザーの一意識別子 |
| name       | String | ✓    | ユーザー名           |

#### Message

メッセージを表現する型です。

| フィールド | 型       | 必須 | 説明                   |
| ---------- | -------- | ---- | ---------------------- |
| id         | Int      | ✓    | メッセージの一意識別子 |
| roomId     | Int      | ✓    | 所属ルーム ID          |
| userId     | Int      | ✓    | 送信者のユーザー ID    |
| content    | String   | ✓    | メッセージ内容         |
| createdAt  | DateTime | ✓    | 作成日時               |
| updatedAt  | DateTime | ✓    | 更新日時               |
| deletedAt  | DateTime | -    | 削除日時（論理削除）   |
| user       | User     | -    | 送信者のユーザー情報   |
| room       | Room     | -    | 所属ルーム情報         |

#### DateTime（スカラー型）

UTC 形式の日時文字列（例：2019-12-03T09:54:33Z）を表現するカスタムスカラー型です。

### クエリ操作

#### messagesByRoomId

```graphql
messagesByRoomId(roomId: Int!): [Message!]!
```

指定されたルーム ID のメッセージ一覧を取得します。

**パラメータ：**

- `roomId`: 取得対象のルーム ID（必須）

**レスポンス例：**

```json
{
  "data": {
    "messagesByRoomId": [
      {
        "id": 1,
        "roomId": 1,
        "userId": 1,
        "content": "こんにちは！",
        "createdAt": "2024-01-01T10:00:00Z",
        "updatedAt": "2024-01-01T10:00:00Z",
        "deletedAt": null,
        "user": {
          "id": 1,
          "name": "大谷翔平"
        }
      }
    ]
  }
}
```

#### myRooms

```graphql
myRooms(userId: Int!): [Room!]!
```

指定されたユーザーが参加しているルーム一覧を取得します。

**パラメータ：**

- `userId`: 対象ユーザー ID（必須）

**レスポンス例：**

```json
{
  "data": {
    "myRooms": [
      {
        "id": 1,
        "name": "鈴木一朗",
        "isGroup": true,
        "createdAt": "2024-01-01T09:00:00Z",
        "updatedAt": "2024-01-01T09:00:00Z"
      }
    ]
  }
}
```

### ミューテーション操作

#### createMessage

```graphql
createMessage(input: CreateMessageInput!): Message!
```

新しいメッセージを作成します。

**入力型（CreateMessageInput）：**
| フィールド | 型 | 必須 | 説明 |
|-----------|---|------|------|
| roomId | Int | ✓ | 送信先ルーム ID |
| userId | Int | ✓ | 送信者ユーザー ID |
| content | String | ✓ | メッセージ内容 |

**リクエスト例：**

```graphql
mutation {
  createMessage(
    input: { roomId: 1, userId: 1, content: "新しいメッセージです" }
  ) {
    id
    content
    createdAt
    user {
      name
    }
  }
}
```

**レスポンス例：**

```json
{
  "data": {
    "createMessage": {
      "id": 2,
      "content": "新しいメッセージです",
      "createdAt": "2024-01-01T10:30:00Z",
      "user": {
        "name": "松井秀喜"
      }
    }
  }
}
```

### サブスクリプション操作

#### messageSent

```graphql
messageSent: Message!
```

新しいメッセージが送信された際にリアルタイムで通知を受け取ります。

**サブスクリプション例：**

```graphql
subscription {
  messageSent {
    id
    content
    createdAt
    user {
      name
    }
    room {
      name
    }
  }
}
```

## エラーハンドリング

GraphQL の標準的なエラーレスポンス形式に従います：

```json
{
  "errors": [
    {
      "message": "エラーメッセージ",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["fieldName"]
    }
  ],
  "data": null
}
```

## 注意事項

- すべての日時は UTC 形式で管理されます
- メッセージの論理削除は`deletedAt`フィールドで管理されます
- リアルタイム通信には WebSocket を使用します
- 認証・認可については別途実装する予定（今回は最低限の設計。JWT を使用する予定）
