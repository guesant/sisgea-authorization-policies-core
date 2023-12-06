import { IAuthorizationPolicyCondition } from './IAuthorizationPolicyCondition';
import { IAuthorizationPolicyMixedStatementInnerJoin } from './IAuthorizationPolicyMixedStatementInnerJoin';

export type IAuthorizationPolicyMixedStatement = {
  alias: string;
  where: IAuthorizationPolicyCondition;
  inner_joins: IAuthorizationPolicyMixedStatementInnerJoin[];
};
