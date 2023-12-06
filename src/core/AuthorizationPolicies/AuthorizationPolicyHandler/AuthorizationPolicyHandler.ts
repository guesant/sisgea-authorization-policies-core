import {
  IAuthorizationPolicy,
  IAuthorizationPolicyAttachedConstraint,
  IAuthorizationPolicyBuildContext,
  IAuthorizationPolicyBuildContextApply,
  IAuthorizationPolicyConstraint,
} from '../../../domain';
import {
  createAttachedConstraintForAuthedUsuario,
  createAttachedConstraintForEveryone,
  createAttachedConstraintForRoles,
} from './AuthorizationPolicyHandlerUtils';

export class AuthorizationPolicyHandler {
  static async buildAttachedConstraints<TargetActor = unknown>(authorizationPolicy: IAuthorizationPolicy) {
    const attachedConstraints = new Set<IAuthorizationPolicyAttachedConstraint<TargetActor>>();

    const ctx: IAuthorizationPolicyBuildContext<TargetActor> = {
      apply(constraint: IAuthorizationPolicyConstraint<TargetActor>) {
        return <IAuthorizationPolicyBuildContextApply>{
          for_everyone() {
            attachedConstraints.add(createAttachedConstraintForEveryone(authorizationPolicy, constraint));
          },

          for_roles(roles: string[] | string) {
            attachedConstraints.add(createAttachedConstraintForRoles(authorizationPolicy, constraint, roles));
          },

          for_authed_user() {
            attachedConstraints.add(createAttachedConstraintForAuthedUsuario(authorizationPolicy, constraint));
          },
        };
      },
    };

    await authorizationPolicy.build(ctx);

    return attachedConstraints;
  }
}
