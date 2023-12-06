import { IAuthorizationPolicyConstraintStatementBuilder } from './IAuthorizationPolicyConstraintStatementBuilder';

export interface IAuthorizationPolicyConstraintConstructContext<TargetActor> {
  targetActor: TargetActor;
  statement(): IAuthorizationPolicyConstraintStatementBuilder;
}
