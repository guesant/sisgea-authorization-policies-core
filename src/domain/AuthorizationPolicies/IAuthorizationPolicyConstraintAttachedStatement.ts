import { IAuthorizationPolicyCondition } from './IAuthorizationPolicyCondition';
import { IAuthorizationPolicyConstraintAttachedStatementBehaviour } from './IAuthorizationPolicyConstraintAttachedStatementBehaviour';
import { IAuthorizationPolicyConstraintAttachedStatementInnerJoin } from './IAuthorizationPolicyConstraintAttachedStatementInnerJoin';
import { IAuthorizationPolicyConstraintStatementBuilderSpecialAction } from './IAuthorizationPolicyConstraintStatementBuilderSpecialAction';
import { IAuthorizationPolicyConstraintStatementBuilderSpecialTarget } from './IAuthorizationPolicyConstraintStatementBuilderSpecialTarget';

export type IAuthorizationPolicyConstraintAttachedStatement = {
  behaviour: IAuthorizationPolicyConstraintAttachedStatementBehaviour;

  //

  alias: string;

  //

  action: IAuthorizationPolicyConstraintStatementBuilderSpecialAction.MANAGE | string[];
  target: IAuthorizationPolicyConstraintStatementBuilderSpecialTarget.ALL | string[];

  //

  where: IAuthorizationPolicyCondition;

  //

  inner_joins: IAuthorizationPolicyConstraintAttachedStatementInnerJoin[];
};
