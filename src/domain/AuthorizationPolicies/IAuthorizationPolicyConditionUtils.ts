import { IAuthorizationPolicyCondition, IAuthorizationPolicyConditionValue } from './IAuthorizationPolicyCondition';
import { IAuthorizationPolicyUtils } from './IAuthorizationPolicyUtils';

export namespace IAuthorizationPolicyConditionUtils {
  export type ChangeConditionAliasesUsages = (
    rootNode: IAuthorizationPolicyCondition,
    aliasesMapping: Map<string, string>,
    getNewAlias?: IAuthorizationPolicyUtils.GetNewAlias,
  ) => void;

  export type GetAllSubNodesFromCondition = (rootNode: IAuthorizationPolicyCondition) => Iterable<IAuthorizationPolicyConditionValue>;

  export type CheckIfConditionNeedsDatabaseResolution = (node: IAuthorizationPolicyCondition) => boolean;
}
