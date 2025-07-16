import { GraphQLResolveInfo } from 'graphql';
import * as graphqlFields from 'graphql-fields';

/**
 * パスベースのマッピング定義
 */
export interface PathMapping {
  graphqlPath: string;
  prismaInclude: any;
}

/**
 * パスベースの変換関数
 */
export function convertWithPathMappings(
  info: GraphQLResolveInfo,
  mappings: PathMapping[],
): any {
  const prismaInclude: any = {};
  const selectedFields = graphqlFields(info);

  console.log(selectedFields);

  mappings.forEach((mapping) => {
    if (hasPath(selectedFields, mapping.graphqlPath)) {
      Object.assign(prismaInclude, mapping.prismaInclude);
    }
  });

  return prismaInclude;
}

/**
 * オブジェクトに指定されたパスが存在するかチェック
 */
function hasPath(obj: any, path: string): boolean {
  const parts = path.split('.');
  let current = obj;

  for (const part of parts) {
    if (current[part] === undefined) {
      return false;
    }
    current = current[part];
  }

  return true;
}
