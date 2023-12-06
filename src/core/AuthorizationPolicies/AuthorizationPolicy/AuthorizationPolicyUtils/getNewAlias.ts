import { IAliasesMapping, IAuthorizationPolicyUtils } from '../../../../domain';

export const getNewAlias: IAuthorizationPolicyUtils.GetNewAlias = (oldAlias: string, aliasesMapping: IAliasesMapping) =>
  aliasesMapping.get(oldAlias) ?? oldAlias;
