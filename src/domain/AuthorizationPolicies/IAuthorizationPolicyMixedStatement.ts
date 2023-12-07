import { IAuthorizationPolicyCondition } from './IAuthorizationPolicyCondition';
import { IAuthorizationPolicyConstraintAttachedStatementBehaviour } from './IAuthorizationPolicyConstraintAttachedStatementBehaviour';
import { IAuthorizationPolicyConstraintStatementJoin } from './IAuthorizationPolicyConstraintStatementJoin';

export type IAuthorizationPolicyMixedStatementSubStatementMixed = {
  behaviour: IAuthorizationPolicyConstraintAttachedStatementBehaviour;
  where: IAuthorizationPolicyCondition;
  joins: IAuthorizationPolicyConstraintStatementJoin[];
};

export type IAuthorizationPolicyMixedStatement = {
  alias: string;

  subStatementMixed: IAuthorizationPolicyMixedStatementSubStatementMixed[];
};
