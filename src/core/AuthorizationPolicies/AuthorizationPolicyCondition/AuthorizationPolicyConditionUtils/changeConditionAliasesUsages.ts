import { IAuthorizationPolicyConditionType, IAuthorizationPolicyConditionUtils } from '../../../../domain';
import { AuthorizationPolicyUtils } from '../../AuthorizationPolicy';
import { getAllSubNodesFromCondition } from './getAllSubNodesFromCondition';

export const changeConditionAliasesUsages: IAuthorizationPolicyConditionUtils.ChangeConditionAliasesUsages = (
  rootNode,
  aliasesMapping,
  getNewAlias = AuthorizationPolicyUtils.getNewAlias,
) => {
  for (const node of getAllSubNodesFromCondition(rootNode)) {
    switch (node.type) {
      case IAuthorizationPolicyConditionType.VALUE_RESOURCE_ATTRIBUTE: {
        node.resource_alias = getNewAlias(node.resource_alias, aliasesMapping);
        break;
      }

      default: {
        break;
      }
    }
  }
};
