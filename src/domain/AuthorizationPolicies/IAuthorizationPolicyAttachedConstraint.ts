import { IAuthorizationPolicy } from './IAuthorizationPolicy';
import { IAuthorizationPolicyAttachedConstraintKind } from './IAuthorizationPolicyAttachedConstraintKind';
import { IAuthorizationPolicyConstraint } from './IAuthorizationPolicyConstraint';

export type IAuthorizationPolicyAttachedConstraintBase<TargetActor = unknown> = {
  policy: IAuthorizationPolicy<TargetActor>;
  constraint: IAuthorizationPolicyConstraint<TargetActor>;
};

export type IAuthorizationPolicyAttachedConstraintEveryone<TargetActor = unknown> =
  IAuthorizationPolicyAttachedConstraintBase<TargetActor> & {
    kind: IAuthorizationPolicyAttachedConstraintKind.EVERYONE;
  };

export type IAuthorizationPolicyAttachedConstraintAuthedUser<TargetActor = unknown> =
  IAuthorizationPolicyAttachedConstraintBase<TargetActor> & {
    kind: IAuthorizationPolicyAttachedConstraintKind.AUTHED_USER;
  };

export type IAuthorizationPolicyAttachedConstraintRoles<TargetActor = unknown> = IAuthorizationPolicyAttachedConstraintBase<TargetActor> & {
  kind: IAuthorizationPolicyAttachedConstraintKind.ROLES;
  roles: string[];
};

export type IAuthorizationPolicyAttachedConstraint<TargetActor = unknown> =
  | IAuthorizationPolicyAttachedConstraintEveryone<TargetActor>
  | IAuthorizationPolicyAttachedConstraintAuthedUser<TargetActor>
  | IAuthorizationPolicyAttachedConstraintRoles<TargetActor>;
