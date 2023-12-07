import { IAuthorizationPolicyCondition } from './IAuthorizationPolicyCondition';
import { IAuthorizationPolicyConstraintAttachedStatementBehaviour } from './IAuthorizationPolicyConstraintAttachedStatementBehaviour';
import { IAuthorizationPolicyConstraintStatementBuilderSpecialAction } from './IAuthorizationPolicyConstraintStatementBuilderSpecialAction';
import { IAuthorizationPolicyConstraintStatementBuilderSpecialTarget } from './IAuthorizationPolicyConstraintStatementBuilderSpecialTarget';
import { IAuthorizationPolicyConstraintStatementJoin } from './IAuthorizationPolicyConstraintStatementJoin';

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

  joins: IAuthorizationPolicyConstraintStatementJoin[];
};
