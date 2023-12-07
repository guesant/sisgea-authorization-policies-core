import {
  IAuthorizationPolicyCondition,
  IAuthorizationPolicyConstraintAttachedStatementBehaviour,
  IAuthorizationPolicyMixedStatement,
} from '../../../domain';
import { Builder, checkIfConditionNeedsDatabaseResolution } from '../AuthorizationPolicyCondition';

export const checkIfMixedStatementNeedsDatabaseResolution = (mixedStatement: IAuthorizationPolicyMixedStatement) => {
  if (mixedStatement.subStatementMixed.some((i) => i.joins.length > 0)) {
    return true;
  }

  if (mixedStatement.subStatementMixed.length > 1) {
    return true;
  }

  if (mixedStatement.subStatementMixed.some((i) => checkIfConditionNeedsDatabaseResolution(i.where))) {
    return true;
  }

  return false;
};

export const extractAliasesMappingsFromMixedStatement = (mixedStatement: IAuthorizationPolicyMixedStatement, resource: string) => {
  const aliasesMappings: Map<string, string> = new Map<string, string>();

  aliasesMappings.set(mixedStatement.alias, resource);

  for (const statement of mixedStatement.subStatementMixed) {
    for (const join of statement.joins) {
      aliasesMappings.set(join.b_alias, join.b_resource);
    }
  }

  return aliasesMappings;
};

export const attachBehaviourOnCondition = (
  previousCondition: IAuthorizationPolicyCondition | null,
  nextCondition: IAuthorizationPolicyCondition,
  behaviour: IAuthorizationPolicyConstraintAttachedStatementBehaviour,
): IAuthorizationPolicyCondition | null => {
  switch (behaviour) {
    case IAuthorizationPolicyConstraintAttachedStatementBehaviour.APPROVE: {
      return Builder.CombineOr(previousCondition, nextCondition);
    }

    case IAuthorizationPolicyConstraintAttachedStatementBehaviour.REJECT: {
      const invertedNextCondition = Builder.Not(nextCondition);
      return Builder.CombineAnd(previousCondition, invertedNextCondition);
    }
  }

  return null;
};
