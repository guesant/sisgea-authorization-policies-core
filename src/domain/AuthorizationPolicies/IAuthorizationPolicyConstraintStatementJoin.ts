import { IAuthorizationPolicyCondition } from './IAuthorizationPolicyCondition';

export enum IAuthorizationPolicyConstraintStatementJoinMode {
  INNER = 'inner',
}

export type IAuthorizationPolicyConstraintStatementJoin = {
  mode: IAuthorizationPolicyConstraintStatementJoinMode.INNER;
  b_resource: string;
  b_alias: string;
  on_condition: IAuthorizationPolicyCondition;
};
