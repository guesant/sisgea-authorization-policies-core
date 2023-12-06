import { IAuthorizationPolicyCondition } from './IAuthorizationPolicyCondition';

export type IAuthorizationPolicyMixedStatementInnerJoin = {
  b_resource: string;
  b_alias: string;
  on_condition: IAuthorizationPolicyCondition;
};
