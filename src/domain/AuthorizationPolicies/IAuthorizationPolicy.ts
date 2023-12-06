import { IAuthorizationPolicyBuildContext } from './IAuthorizationPolicyBuildContext';

export interface IAuthorizationPolicy<TargetActor = unknown> {
  priority: number;

  description: string;

  build(ctx: IAuthorizationPolicyBuildContext<TargetActor>): void | Promise<void>;
}
