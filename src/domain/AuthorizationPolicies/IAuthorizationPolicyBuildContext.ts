import { IAuthorizationPolicyBuildContextApply } from './IAuthorizationPolicyBuildContextApply';
import { IAuthorizationPolicyConstraint } from './IAuthorizationPolicyConstraint';

export interface IAuthorizationPolicyBuildContext<TargetActor = unknown> {
  apply(constraint: IAuthorizationPolicyConstraint<TargetActor>): IAuthorizationPolicyBuildContextApply;
}
