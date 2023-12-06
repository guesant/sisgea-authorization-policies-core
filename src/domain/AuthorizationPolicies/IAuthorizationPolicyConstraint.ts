import { IAuthorizationPolicyConstraintConstructContext } from './IAuthorizationPolicyConstraintConstructContext';

export interface IAuthorizationPolicyConstraint<TargetActor = unknown> {
  description: string;

  construct(ctx: IAuthorizationPolicyConstraintConstructContext<TargetActor>): void | Promise<void>;
}
