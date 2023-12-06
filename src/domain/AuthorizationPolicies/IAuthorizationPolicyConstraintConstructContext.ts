import { IAuthorizationPolicyConstraintStatementBuilder } from './IAuthorizationPolicyConstraintStatementBuilder';

export interface IAuthorizationPolicyConstraintConstructContext<TargetActor = unknown> {
  targetActor: TargetActor;
  statement(): IAuthorizationPolicyConstraintStatementBuilder;
}
