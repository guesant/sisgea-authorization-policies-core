import { IAuthorizationPolicyConditionType, IAuthorizationPolicyConditionUtils } from '../../../../domain';
import { getAllSubNodesFromCondition } from './getAllSubNodesFromCondition';

export const checkIfConditionNeedsDatabaseResolution: IAuthorizationPolicyConditionUtils.CheckIfConditionNeedsDatabaseResolution = (
  node,
) => {
  for (const subNode of getAllSubNodesFromCondition(node)) {
    switch (subNode.type) {
      case IAuthorizationPolicyConditionType.VALUE_RESOURCE_ATTRIBUTE: {
        return true;
      }
    }
  }

  return false;
};
