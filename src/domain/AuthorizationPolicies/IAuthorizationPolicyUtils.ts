import { IAliasesMapping } from '../IAliasesMapping';

export namespace IAuthorizationPolicyUtils {
  export type GetNewAlias = (oldAlias: string, aliasesMapping: IAliasesMapping) => string;
}
