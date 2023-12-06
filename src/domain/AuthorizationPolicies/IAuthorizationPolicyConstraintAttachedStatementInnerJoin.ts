import { IAuthorizationPolicyCondition } from './IAuthorizationPolicyCondition';

export type IAuthorizationPolicyConstraintAttachedStatementInnerJoin = {
  b_resource: string;
  b_alias: string;
  on_condition: IAuthorizationPolicyCondition;
};
