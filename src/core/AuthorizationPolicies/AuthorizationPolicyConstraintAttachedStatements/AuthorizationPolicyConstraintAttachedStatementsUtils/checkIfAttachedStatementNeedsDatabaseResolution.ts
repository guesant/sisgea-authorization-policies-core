import { IAuthorizationPolicyConstraintAttachedStatement } from '../../../../domain';
import { checkIfConditionNeedsDatabaseResolution } from '../../AuthorizationPolicyCondition';

export const checkIfAttachedStatementNeedsDatabaseResolution = (attachedStatement: IAuthorizationPolicyConstraintAttachedStatement) => {
  if (attachedStatement.joins.length > 0) {
    return true;
  }

  if (attachedStatement.where !== null && checkIfConditionNeedsDatabaseResolution(attachedStatement.where)) {
    return true;
  }

  return false;
};
